import React, { useEffect, useMemo, useRef, useCallback } from "react";

import "./styles.css";

interface TimePickerItem {
    value: number | string;
    label: string;
}

interface WheelPickerProps {
    hourValue: number;
    onHourChange: (hour: number) => void;
    minuteValue: number;
    onMinuteChange: (minute: number) => void;
    ampmValue?: "AM" | "PM";
    onAmpmChange?: (ampm: "AM" | "PM") => void;
    timeFormat?: "12h" | "24h";
    containerHeight?: number;
    itemHeight?: number;
}

const WheelPickerComponent = ({
    hourValue,
    onHourChange: handleHourChange,
    minuteValue,
    onMinuteChange: handleMinuteChange,
    ampmValue,
    onAmpmChange: handleAmpmChange,
    timeFormat = "24h",
    containerHeight = 210,
    itemHeight = 32,
}: WheelPickerProps) => {
    const hourItemsContRef = useRef<HTMLUListElement>(null);
    const minuteItemsContRef = useRef<HTMLUListElement>(null);
    const ampmItemsContRef = useRef<HTMLUListElement>(null);
    const isScrolling = useRef<NodeJS.Timeout | null>(null);
    const hourRefs = useRef<(HTMLLIElement | null)[]>([]);
    const minuteRefs = useRef<(HTMLLIElement | null)[]>([]);
    const ampmRefs = useRef<(HTMLLIElement | null)[]>([]);

    // Touch handling refs
    const touchStartY = useRef<number>(0);
    const touchCurrentY = useRef<number>(0);
    const isDragging = useRef<boolean>(false);
    const activeWheel = useRef<"hour" | "minute" | "ampm" | null>(null);
    const scrollVelocity = useRef<number>(0);
    const lastScrollTime = useRef<number>(0);

    // Wheel animation tracking
    const isWheelAnimating = useRef<boolean>(false);
    const wheelAnimationFrames = useRef<Map<string, number>>(new Map());
    const isProgrammaticScroll = useRef<Set<string>>(new Set());
    const isInitializing = useRef<Set<string>>(new Set());

    // Generate hour items based on time format
    const hourItems = useMemo(() => {
        if (timeFormat === "12h") {
            return Array.from({ length: 12 }, (_, index) => ({
                value: index + 1,
                label: String(index + 1),
            }));
        } else {
            return Array.from({ length: 24 }, (_, index) => ({
                value: index,
                label: String(index).padStart(2, "0"),
            }));
        }
    }, [timeFormat]);

    // Generate minute items (0-59)
    const minuteItems = useMemo(
        () =>
            Array.from({ length: 60 }, (_, index) => ({
                value: index,
                label: String(index).padStart(2, "0"),
            })),
        []
    );

    // AM/PM items
    const ampmItems = useMemo(
        () => [
            { value: "AM" as const, label: "AM" },
            { value: "PM" as const, label: "PM" },
        ],
        []
    );

    const hourItemsMap = useMemo(
        () =>
            hourItems.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map<number, number>()
            ),
        [hourItems]
    );
    const currentHourValue = useRef(hourItemsMap.get(hourValue) ?? 0);

    const minuteItemsMap = useMemo(
        () =>
            minuteItems.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map<number, number>()
            ),
        [minuteItems]
    );
    const currentMinuteValue = useRef(minuteItemsMap.get(minuteValue) ?? 0);

    const ampmItemsMap = useMemo(
        () =>
            ampmItems.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map<"AM" | "PM", number>()
            ),
        [ampmItems]
    );
    const currentAmpmValue = useRef(
        ampmValue ? ampmItemsMap.get(ampmValue) ?? 0 : 0
    );

    const visibleItemsCount = Math.floor(containerHeight / itemHeight);
    const offset = Math.round((visibleItemsCount + 1) / 2) + 1;
    const maxScrollOffset = (containerHeight - itemHeight) / 2;

    const rerenderElements = useCallback(
        (
            refs: React.MutableRefObject<(HTMLLIElement | null)[]>,
            items: TimePickerItem[],
            selectedElement: number,
            scrollTop: number,
            transformOrigin: "center" | "left" | "right" = "center"
        ) => {
            if (refs.current) {
                // Calculate visible range based on scroll position
                // Expand the range to ensure all visible items are rendered
                const visibleStart = Math.floor(scrollTop / itemHeight);
                const visibleEnd = Math.ceil(
                    (scrollTop + containerHeight) / itemHeight
                );
                const firstItemIndex = Math.max(
                    Math.min(selectedElement - offset, visibleStart - 2),
                    0
                );
                const lastItemIndex = Math.min(
                    Math.max(selectedElement + offset, visibleEnd + 2),
                    items.length
                );

                refs.current
                    .slice(firstItemIndex, lastItemIndex)
                    .forEach((item, index) => {
                        if (!item) return;
                        const realIndex = index + firstItemIndex;
                        const scrollOffset = Math.min(
                            Math.abs(
                                scrollTop -
                                    realIndex * itemHeight -
                                    itemHeight / 2
                            ),
                            maxScrollOffset
                        );
                        const sin = scrollOffset / maxScrollOffset;
                        const cos = Math.sqrt(1 - sin ** 2);
                        const [div] = item.getElementsByTagName("div");
                        if (div) {
                            div.style.transform = `rotateX(${Math.asin(
                                sin
                            )}rad) scale(${cos})`;
                            div.style.transformOrigin = transformOrigin;
                            // Ensure item is visible
                            div.style.opacity = cos > 0.1 ? "1" : "0.3";
                        }
                    });
            }
        },
        [itemHeight, offset, maxScrollOffset, containerHeight]
    );

    // Touch event handlers - using native listeners to avoid passive listener issues
    const createTouchHandlers = useCallback(
        (wheelType: "hour" | "minute" | "ampm") => {
            const handleTouchStart = (e: TouchEvent) => {
                const touch = e.touches[0];
                if (!touch) return;

                touchStartY.current = touch.clientY;
                touchCurrentY.current = touch.clientY;
                isDragging.current = true;
                activeWheel.current = wheelType;
                scrollVelocity.current = 0;
                lastScrollTime.current = Date.now();
            };

            const handleTouchMove = (e: TouchEvent) => {
                if (!isDragging.current || activeWheel.current !== wheelType)
                    return;

                const touch = e.touches[0];
                if (!touch) return;

                e.preventDefault();
                e.stopPropagation();

                const deltaY = touchCurrentY.current - touch.clientY;
                touchCurrentY.current = touch.clientY;

                const now = Date.now();
                const timeDelta = now - lastScrollTime.current;
                if (timeDelta > 0) {
                    // Calculate velocity in pixels per second
                    const velocityPxPerMs = Math.abs(deltaY) / timeDelta;
                    scrollVelocity.current =
                        deltaY > 0
                            ? velocityPxPerMs * 1000 // Convert to px/s
                            : -velocityPxPerMs * 1000;
                }
                lastScrollTime.current = now;

                let container: HTMLUListElement | null = null;
                let items: TimePickerItem[] = [];
                let refs: React.MutableRefObject<
                    (HTMLLIElement | null)[]
                > | null = null;
                let transformOrigin: "center" | "left" | "right" = "center";

                if (wheelType === "hour") {
                    container = hourItemsContRef.current;
                    items = hourItems;
                    refs = hourRefs;
                    transformOrigin = "center";
                } else if (wheelType === "minute") {
                    container = minuteItemsContRef.current;
                    items = minuteItems;
                    refs = minuteRefs;
                    transformOrigin = "left";
                } else if (wheelType === "ampm") {
                    container = ampmItemsContRef.current;
                    items = ampmItems;
                    refs = ampmRefs;
                    transformOrigin = "left";
                }

                if (container && refs && items.length > 0) {
                    const currentScroll = container.scrollTop;
                    const newScrollTop = currentScroll + deltaY;
                    const maxScroll =
                        container.scrollHeight - container.clientHeight;
                    container.scrollTop = Math.max(
                        0,
                        Math.min(newScrollTop, maxScroll)
                    );

                    // Update visual elements during touch move
                    const scrollTop = container.scrollTop;
                    const selectedElement = Math.min(
                        Math.max(Math.round(scrollTop / itemHeight), 0),
                        items.length - 1
                    );
                    rerenderElements(
                        refs,
                        items,
                        selectedElement,
                        scrollTop,
                        transformOrigin
                    );
                }
            };

            const handleTouchEnd = () => {
                if (!isDragging.current || activeWheel.current !== wheelType)
                    return;

                const wheelTypeRef = activeWheel.current;
                isDragging.current = false;
                const velocity = scrollVelocity.current;

                // Reset velocity to prevent continuous scrolling
                scrollVelocity.current = 0;

                let container: HTMLUListElement | null = null;
                let items: TimePickerItem[] = [];

                if (wheelTypeRef === "hour") {
                    container = hourItemsContRef.current;
                    items = hourItems;
                } else if (wheelTypeRef === "minute") {
                    container = minuteItemsContRef.current;
                    items = minuteItems;
                } else if (wheelTypeRef === "ampm") {
                    container = ampmItemsContRef.current;
                    items = ampmItems;
                }

                if (container && items.length > 0) {
                    const currentScroll = container.scrollTop;
                    const maxScroll =
                        container.scrollHeight - container.clientHeight;

                    // Apply momentum scrolling with damping
                    // Convert velocity (px/s) to momentum distance
                    // Use a damping factor and duration estimate
                    const dampingFactor = 0.8; // Decay factor
                    const estimatedDuration = 500; // ms
                    const momentumDistance =
                        (velocity / 1000) * estimatedDuration * dampingFactor;

                    // Limit momentum to prevent excessive scrolling
                    const momentum = Math.max(
                        -maxScroll * 0.5,
                        Math.min(momentumDistance, maxScroll * 0.5)
                    );

                    // Calculate target scroll position
                    const targetScroll = Math.max(
                        0,
                        Math.min(currentScroll + momentum, maxScroll)
                    );

                    // If momentum is very small, just snap to nearest item
                    if (Math.abs(momentum) < 5) {
                        if (!container) return;
                        const scrollTop = container.scrollTop;
                        const selectedElement = Math.min(
                            Math.max(Math.round(scrollTop / itemHeight), 0),
                            items.length - 1
                        );
                        const targetScrollTop = selectedElement * itemHeight;

                        // Smooth snap
                        let snapScroll = container.scrollTop;
                        const snapAnimate = () => {
                            if (!container) return;
                            const remaining = targetScrollTop - snapScroll;
                            if (Math.abs(remaining) > 0.5) {
                                snapScroll += remaining * 0.2;
                                container.scrollTop = snapScroll;
                                requestAnimationFrame(snapAnimate);
                            } else {
                                container.scrollTop = targetScrollTop;

                                // Call the appropriate change handler
                                if (wheelTypeRef === "hour") {
                                    handleHourChange(
                                        items[selectedElement].value as number
                                    );
                                } else if (wheelTypeRef === "minute") {
                                    handleMinuteChange(
                                        items[selectedElement].value as number
                                    );
                                } else if (
                                    wheelTypeRef === "ampm" &&
                                    handleAmpmChange
                                ) {
                                    handleAmpmChange(
                                        items[selectedElement].value as
                                            | "AM"
                                            | "PM"
                                    );
                                }
                            }
                        };
                        requestAnimationFrame(snapAnimate);
                    } else {
                        // Apply momentum with animation
                        let animatingScroll = currentScroll;
                        const startTime = performance.now();
                        // Calculate duration based on momentum (more momentum = longer animation)
                        const duration = Math.min(
                            800,
                            Math.max(300, Math.abs(momentum) * 2)
                        );

                        // Get refs for visual updates
                        let refs: React.MutableRefObject<
                            (HTMLLIElement | null)[]
                        >;
                        let transformOrigin: "center" | "left" | "right" =
                            "left";
                        if (wheelTypeRef === "hour") {
                            refs = hourRefs;
                            transformOrigin = "center";
                        } else if (wheelTypeRef === "minute") {
                            refs = minuteRefs;
                            transformOrigin = "left";
                        } else {
                            refs = ampmRefs;
                            transformOrigin = "left";
                        }

                        const animate = () => {
                            if (!container) return;
                            const elapsed = performance.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);

                            // Easing function (ease-out cubic)
                            const easeOut = 1 - Math.pow(1 - progress, 3);
                            const distance = targetScroll - currentScroll;
                            animatingScroll =
                                currentScroll + distance * easeOut;

                            container.scrollTop = Math.max(
                                0,
                                Math.min(animatingScroll, maxScroll)
                            );

                            // Update visual elements during momentum animation
                            const scrollTop = container.scrollTop;
                            const selectedElement = Math.min(
                                Math.max(Math.round(scrollTop / itemHeight), 0),
                                items.length - 1
                            );
                            rerenderElements(
                                refs,
                                items,
                                selectedElement,
                                scrollTop,
                                transformOrigin
                            );

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                if (!container) return;
                                // Snap to nearest item after momentum
                                const scrollTop = container.scrollTop;
                                const selectedElement = Math.min(
                                    Math.max(
                                        Math.round(scrollTop / itemHeight),
                                        0
                                    ),
                                    items.length - 1
                                );
                                const targetScrollTop =
                                    selectedElement * itemHeight;

                                // Smooth snap
                                let snapScroll = container.scrollTop;
                                const snapAnimate = () => {
                                    if (!container) return;
                                    const remaining =
                                        targetScrollTop - snapScroll;
                                    if (Math.abs(remaining) > 0.5) {
                                        snapScroll += remaining * 0.2;
                                        container.scrollTop = snapScroll;
                                        requestAnimationFrame(snapAnimate);
                                    } else {
                                        container.scrollTop = targetScrollTop;

                                        // Call the appropriate change handler
                                        if (wheelTypeRef === "hour") {
                                            handleHourChange(
                                                items[selectedElement]
                                                    .value as number
                                            );
                                        } else if (wheelTypeRef === "minute") {
                                            handleMinuteChange(
                                                items[selectedElement]
                                                    .value as number
                                            );
                                        } else if (
                                            wheelTypeRef === "ampm" &&
                                            handleAmpmChange
                                        ) {
                                            handleAmpmChange(
                                                items[selectedElement].value as
                                                    | "AM"
                                                    | "PM"
                                            );
                                        }
                                    }
                                };
                                requestAnimationFrame(snapAnimate);
                            }
                        };
                        requestAnimationFrame(animate);
                    }
                }

                activeWheel.current = null;
            };

            return { handleTouchStart, handleTouchMove, handleTouchEnd };
        },
        [
            hourItems,
            minuteItems,
            ampmItems,
            itemHeight,
            handleHourChange,
            handleMinuteChange,
            handleAmpmChange,
            rerenderElements,
        ]
    );

    // Set up native touch event listeners for hour wheel
    useEffect(() => {
        const container = hourItemsContRef.current;
        if (!container) return;

        const { handleTouchStart, handleTouchMove, handleTouchEnd } =
            createTouchHandlers("hour");

        container.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        container.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        container.addEventListener("touchend", handleTouchEnd, {
            passive: true,
        });
        container.addEventListener("touchcancel", handleTouchEnd, {
            passive: true,
        });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
            container.removeEventListener("touchcancel", handleTouchEnd);
        };
    }, [createTouchHandlers]);

    // Set up native touch event listeners for minute wheel
    useEffect(() => {
        const container = minuteItemsContRef.current;
        if (!container) return;

        const { handleTouchStart, handleTouchMove, handleTouchEnd } =
            createTouchHandlers("minute");

        container.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        container.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        container.addEventListener("touchend", handleTouchEnd, {
            passive: true,
        });
        container.addEventListener("touchcancel", handleTouchEnd, {
            passive: true,
        });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
            container.removeEventListener("touchcancel", handleTouchEnd);
        };
    }, [createTouchHandlers]);

    // Set up native touch event listeners for ampm wheel
    useEffect(() => {
        if (timeFormat !== "12h") return;
        const container = ampmItemsContRef.current;
        if (!container) return;

        const { handleTouchStart, handleTouchMove, handleTouchEnd } =
            createTouchHandlers("ampm");

        container.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        container.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        container.addEventListener("touchend", handleTouchEnd, {
            passive: true,
        });
        container.addEventListener("touchcancel", handleTouchEnd, {
            passive: true,
        });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
            container.removeEventListener("touchcancel", handleTouchEnd);
        };
    }, [timeFormat, createTouchHandlers]);

    // Wheel event handler for desktop mouse wheel (item-by-item scrolling)
    const createWheelHandler = useCallback(
        (
            wheelType: "hour" | "minute" | "ampm",
            items: TimePickerItem[],
            refs: React.MutableRefObject<(HTMLLIElement | null)[]>,
            containerRef: React.MutableRefObject<HTMLUListElement | null>,
            currentIndexRef: React.MutableRefObject<number>,
            onChange: (value: number | "AM" | "PM") => void
        ) => {
            return (e: WheelEvent) => {
                if (isDragging.current || isWheelAnimating.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                const container = containerRef.current;
                if (!container) return;

                const deltaY = e.deltaY;
                // Calculate how many items to scroll based on deltaY
                // Scale factor: each item is itemHeight pixels, so divide deltaY by itemHeight
                const itemsToScroll = Math.round(deltaY / itemHeight);
                const scrollDirection = deltaY > 0 ? 1 : -1;

                // If delta is small, scroll by at least 1 item
                const scrollAmount =
                    Math.abs(itemsToScroll) > 0
                        ? itemsToScroll
                        : scrollDirection;

                let newIndex = currentIndexRef.current + scrollAmount;
                newIndex = Math.max(0, Math.min(newIndex, items.length - 1));

                if (newIndex !== currentIndexRef.current) {
                    // Cancel any existing animation for this wheel
                    const existingFrameId =
                        wheelAnimationFrames.current.get(wheelType);
                    if (existingFrameId) {
                        cancelAnimationFrame(existingFrameId);
                    }

                    isWheelAnimating.current = true;
                    isProgrammaticScroll.current.add(wheelType);
                    currentIndexRef.current = newIndex;
                    const targetScrollTop = newIndex * itemHeight;

                    // Smooth scroll to item using scrollTo for better control
                    const startScroll = container.scrollTop;
                    const distance = targetScrollTop - startScroll;
                    const startTime = performance.now();
                    const duration = 200; // 200ms animation

                    let animationId: number | null = null;
                    let isAnimating = true;

                    const animate = (currentTime: number) => {
                        if (!isAnimating) return;

                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Easing function (ease-out)
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentScroll = startScroll + distance * easeOut;

                        // Keep programmatic scroll flag during entire animation
                        isProgrammaticScroll.current.add(wheelType);
                        container.scrollTop = currentScroll;

                        // Update visual elements during animation
                        rerenderElements(
                            refs,
                            items,
                            newIndex,
                            currentScroll,
                            wheelType === "hour" ? "center" : "left"
                        );

                        if (progress < 1) {
                            animationId = requestAnimationFrame(animate);
                            wheelAnimationFrames.current.set(
                                wheelType,
                                animationId
                            );
                        } else {
                            // Final position
                            container.scrollTop = targetScrollTop;

                            rerenderElements(
                                refs,
                                items,
                                newIndex,
                                targetScrollTop,
                                wheelType === "hour" ? "center" : "left"
                            );

                            onChange(
                                items[newIndex].value as number | "AM" | "PM"
                            );

                            // Clear flags after a delay to ensure scroll events are processed
                            setTimeout(() => {
                                isProgrammaticScroll.current.delete(wheelType);
                                wheelAnimationFrames.current.delete(wheelType);
                                isAnimating = false;

                                // Check if all wheels are done animating
                                if (wheelAnimationFrames.current.size === 0) {
                                    isWheelAnimating.current = false;
                                }
                            }, 150);
                        }
                    };

                    animationId = requestAnimationFrame(animate);
                    wheelAnimationFrames.current.set(wheelType, animationId);
                }
            };
        },
        [itemHeight, rerenderElements]
    );

    // Scroll handlers
    useEffect(() => {
        let isAnimating = false;

        function handleHourScroll(event: Event) {
            // Ignore scroll events during wheel animation, programmatic scroll, initialization, or dragging
            if (
                isWheelAnimating.current ||
                isProgrammaticScroll.current.has("hour") ||
                isInitializing.current.has("hour") ||
                isDragging.current
            ) {
                return;
            }

            if (!isAnimating) {
                isAnimating = true;

                requestAnimationFrame(() => {
                    const target = event.target as HTMLUListElement;
                    const scrollTop = Math.max(target.scrollTop, 0);
                    const selectedElement = Math.min(
                        Math.max(Math.round(scrollTop / itemHeight), 0),
                        hourItems.length - 1
                    );

                    if (isScrolling.current) {
                        clearTimeout(isScrolling.current);
                    }

                    // Always rerender to ensure all visible items are updated
                    rerenderElements(
                        hourRefs,
                        hourItems,
                        selectedElement,
                        scrollTop,
                        "center"
                    );

                    currentHourValue.current = selectedElement;
                    isScrolling.current = setTimeout(() => {
                        handleHourChange(
                            hourItems[selectedElement].value as number
                        );
                    }, 20);

                    isAnimating = false;
                });
            }
        }

        const container = hourItemsContRef.current;
        if (!container) return;

        const handleWheel = createWheelHandler(
            "hour",
            hourItems,
            hourRefs,
            hourItemsContRef,
            currentHourValue,
            value => handleHourChange(value as number)
        );

        // Mark as initializing to ignore scroll events during setup
        isInitializing.current.add("hour");
        isProgrammaticScroll.current.add("hour");

        container.addEventListener("scroll", handleHourScroll);
        container.addEventListener("wheel", handleWheel, { passive: false });

        // Set initial scroll position without triggering events
        const initialScrollTop = currentHourValue.current * itemHeight;
        container.scrollTop = initialScrollTop;

        rerenderElements(
            hourRefs,
            hourItems,
            currentHourValue.current,
            initialScrollTop,
            "center"
        );

        // Clear initialization flag after a short delay
        setTimeout(() => {
            isInitializing.current.delete("hour");
            isProgrammaticScroll.current.delete("hour");
        }, 100);

        return () => {
            container.removeEventListener("scroll", handleHourScroll);
            container.removeEventListener("wheel", handleWheel);
        };
    }, [
        hourItems,
        handleHourChange,
        itemHeight,
        rerenderElements,
        createWheelHandler,
    ]);

    useEffect(() => {
        let isAnimating = false;

        function handleMinuteScroll(event: Event) {
            // Ignore scroll events during wheel animation, programmatic scroll, initialization, or dragging
            if (
                isWheelAnimating.current ||
                isProgrammaticScroll.current.has("minute") ||
                isInitializing.current.has("minute") ||
                isDragging.current
            ) {
                return;
            }

            if (!isAnimating) {
                isAnimating = true;

                requestAnimationFrame(() => {
                    const target = event.target as HTMLUListElement;
                    const scrollTop = Math.max(target.scrollTop, 0);
                    const selectedElement = Math.min(
                        Math.max(Math.round(scrollTop / itemHeight), 0),
                        minuteItems.length - 1
                    );

                    if (isScrolling.current) {
                        clearTimeout(isScrolling.current);
                    }
                    rerenderElements(
                        minuteRefs,
                        minuteItems,
                        selectedElement,
                        scrollTop,
                        "left"
                    );

                    currentMinuteValue.current = selectedElement;
                    isScrolling.current = setTimeout(() => {
                        handleMinuteChange(
                            minuteItems[selectedElement].value as number
                        );
                    }, 20);

                    isAnimating = false;
                });
            }
        }

        const container = minuteItemsContRef.current;
        if (!container) return;

        const handleWheel = createWheelHandler(
            "minute",
            minuteItems,
            minuteRefs,
            minuteItemsContRef,
            currentMinuteValue,
            value => handleMinuteChange(value as number)
        );

        // Mark as initializing to ignore scroll events during setup
        isInitializing.current.add("minute");
        isProgrammaticScroll.current.add("minute");

        container.addEventListener("scroll", handleMinuteScroll);
        container.addEventListener("wheel", handleWheel, { passive: false });

        // Set initial scroll position without triggering events
        const initialScrollTop = currentMinuteValue.current * itemHeight;
        container.scrollTop = initialScrollTop;

        rerenderElements(
            minuteRefs,
            minuteItems,
            currentMinuteValue.current,
            initialScrollTop,
            "left"
        );

        // Clear initialization flag after a short delay
        setTimeout(() => {
            isInitializing.current.delete("minute");
            isProgrammaticScroll.current.delete("minute");
        }, 100);

        return () => {
            container.removeEventListener("scroll", handleMinuteScroll);
            container.removeEventListener("wheel", handleWheel);
        };
    }, [
        minuteItems,
        handleMinuteChange,
        itemHeight,
        rerenderElements,
        createWheelHandler,
    ]);

    useEffect(() => {
        if (timeFormat !== "12h" || !handleAmpmChange) return;

        let isAnimating = false;

        function handleAmpmScroll(event: Event) {
            // Ignore scroll events during wheel animation, programmatic scroll, initialization, or dragging
            if (
                isWheelAnimating.current ||
                isProgrammaticScroll.current.has("ampm") ||
                isInitializing.current.has("ampm") ||
                isDragging.current
            ) {
                return;
            }

            if (!isAnimating) {
                isAnimating = true;

                requestAnimationFrame(() => {
                    const target = event.target as HTMLUListElement;
                    const scrollTop = Math.max(target.scrollTop, 0);
                    const selectedElement = Math.min(
                        Math.max(Math.round(scrollTop / itemHeight), 0),
                        ampmItems.length - 1
                    );

                    if (isScrolling.current) {
                        clearTimeout(isScrolling.current);
                    }
                    rerenderElements(
                        ampmRefs,
                        ampmItems,
                        selectedElement,
                        scrollTop,
                        "left"
                    );

                    currentAmpmValue.current = selectedElement;
                    if (handleAmpmChange) {
                        isScrolling.current = setTimeout(() => {
                            handleAmpmChange(
                                ampmItems[selectedElement].value as "AM" | "PM"
                            );
                        }, 20);
                    }

                    isAnimating = false;
                });
            }
        }

        const container = ampmItemsContRef.current;
        if (!container) return;

        const handleWheel = createWheelHandler(
            "ampm",
            ampmItems,
            ampmRefs,
            ampmItemsContRef,
            currentAmpmValue,
            value => handleAmpmChange?.(value as "AM" | "PM")
        );

        // Mark as initializing to ignore scroll events during setup
        isInitializing.current.add("ampm");
        isProgrammaticScroll.current.add("ampm");

        container.addEventListener("scroll", handleAmpmScroll);
        container.addEventListener("wheel", handleWheel, { passive: false });

        // Set initial scroll position without triggering events
        const initialScrollTop = currentAmpmValue.current * itemHeight;
        container.scrollTop = initialScrollTop;

        rerenderElements(
            ampmRefs,
            ampmItems,
            currentAmpmValue.current,
            initialScrollTop,
            "left"
        );

        // Clear initialization flag after a short delay
        setTimeout(() => {
            isInitializing.current.delete("ampm");
            isProgrammaticScroll.current.delete("ampm");
        }, 100);

        return () => {
            container.removeEventListener("scroll", handleAmpmScroll);
            container.removeEventListener("wheel", handleWheel);
        };
    }, [
        timeFormat,
        ampmItems,
        handleAmpmChange,
        itemHeight,
        rerenderElements,
        createWheelHandler,
    ]);

    // Update hour value
    useEffect(() => {
        const index = hourItemsMap.get(hourValue);
        if (index !== undefined && index !== currentHourValue.current) {
            currentHourValue.current = index;
            hourRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
            rerenderElements(
                hourRefs,
                hourItems,
                currentHourValue.current,
                hourItemsContRef.current?.scrollTop ?? 0,
                "center"
            );
        }
    }, [hourValue, hourItemsMap, hourItems, rerenderElements]);

    // Update minute value
    useEffect(() => {
        const index = minuteItemsMap.get(minuteValue);
        if (index !== undefined && index !== currentMinuteValue.current) {
            currentMinuteValue.current = index;
            minuteRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
            rerenderElements(
                minuteRefs,
                minuteItems,
                currentMinuteValue.current,
                minuteItemsContRef.current?.scrollTop ?? 0,
                "left"
            );
        }
    }, [minuteValue, minuteItemsMap, minuteItems, rerenderElements]);

    // Update AM/PM value
    useEffect(() => {
        if (timeFormat !== "12h" || !ampmValue) return;
        const index = ampmItemsMap.get(ampmValue);
        if (index !== undefined && index !== currentAmpmValue.current) {
            currentAmpmValue.current = index;
            ampmRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
            rerenderElements(
                ampmRefs,
                ampmItems,
                currentAmpmValue.current,
                ampmItemsContRef.current?.scrollTop ?? 0,
                "left"
            );
        }
    }, [ampmValue, timeFormat, ampmItemsMap, ampmItems, rerenderElements]);

    return (
        <div
            className="wheel-picker-container"
            style={{
                height: `${containerHeight}px`,
            }}
        >
            <ul className="wheel-picker-items" ref={hourItemsContRef}>
                {hourItems.map((item, index) => (
                    <li
                        className="wheel-picker-item"
                        key={item.value}
                        ref={node => {
                            hourRefs.current[index] = node;
                        }}
                        style={{
                            height: `${itemHeight}px`,
                            lineHeight: `${itemHeight}px`,
                        }}
                    >
                        <div>{item.label}</div>
                    </li>
                ))}
            </ul>
            <ul className="wheel-picker-items" ref={minuteItemsContRef}>
                {minuteItems.map((item, index) => (
                    <li
                        className="wheel-picker-item"
                        key={item.value}
                        ref={node => {
                            minuteRefs.current[index] = node;
                        }}
                        style={{
                            height: `${itemHeight}px`,
                            lineHeight: `${itemHeight}px`,
                        }}
                    >
                        <div>{item.label}</div>
                    </li>
                ))}
            </ul>
            {timeFormat === "12h" && (
                <ul className="wheel-picker-items" ref={ampmItemsContRef}>
                    {ampmItems.map((item, index) => (
                        <li
                            className="wheel-picker-item"
                            key={item.value}
                            ref={node => {
                                ampmRefs.current[index] = node;
                            }}
                            style={{
                                height: `${itemHeight}px`,
                                lineHeight: `${itemHeight}px`,
                            }}
                        >
                            <div>{item.label}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export const WheelPicker = React.memo(WheelPickerComponent);
