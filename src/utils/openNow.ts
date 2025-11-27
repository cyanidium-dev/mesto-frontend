import { Business } from "@/types/business";
import { Event } from "@/types/event";

/**
 * Check if a business is currently open based on its working hours
 * @param business - The business to check
 * @returns true if the business is currently open, false otherwise
 */
export function isBusinessOpenNow(business: Business): boolean {
    if (!business.workingHours || business.workingHours.length === 0) {
        // If no working hours are set, consider it always open
        return true;
    }

    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

    // workingHours is an array of 7 items (one for each day of the week)
    // Index 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const todayHours = business.workingHours[currentDay];

    if (!todayHours || !todayHours.start || !todayHours.end) {
        // If no hours set for today, consider it closed
        return false;
    }

    // Parse start and end times (format: "HH:mm")
    const [startHour, startMinute] = todayHours.start.split(":").map(Number);
    const [endHour, endMinute] = todayHours.end.split(":").map(Number);

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    // Handle cases where end time is before start time (e.g., 22:00 - 02:00)
    if (endTime < startTime) {
        // Business is open if current time is after start OR before end
        return currentTime >= startTime || currentTime <= endTime;
    }

    // Normal case: start time < end time
    return currentTime >= startTime && currentTime <= endTime;
}

/**
 * Check if an event is currently happening
 * @param event - The event to check
 * @returns true if the event is currently happening, false otherwise
 */
export function isEventOpenNow(event: Event): boolean {
    const now = new Date();
    const currentTime = now.getTime();

    // Parse start date and time
    const startDate = new Date(event.startDate);
    const [startHour, startMinute] = event.startTime.split(":").map(Number);
    startDate.setHours(startHour, startMinute, 0, 0);

    // If event has end date and time, check if current time is within range
    if (event.endDate && event.endTime) {
        const endDate = new Date(event.endDate);
        const [endHour, endMinute] = event.endTime.split(":").map(Number);
        endDate.setHours(endHour, endMinute, 0, 0);
        return currentTime >= startDate.getTime() && currentTime <= endDate.getTime();
    }

    // If only start date/time is set, check if event has started
    // For events without end time, consider them "open" if they've started
    // and haven't ended (or if they're happening today)
    if (currentTime >= startDate.getTime()) {
        // If it's a repetitive event or no end date, consider it open if it started
        if (event.isRepetitive) {
            // For repetitive events, check if it's happening today
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const eventDay = new Date(startDate);
            eventDay.setHours(0, 0, 0, 0);
            return today.getTime() === eventDay.getTime();
        }
        // For non-repetitive events without end time, consider them open for the day
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDay = new Date(startDate);
        eventDay.setHours(0, 0, 0, 0);
        return today.getTime() === eventDay.getTime() && currentTime >= startDate.getTime();
    }

    return false;
}

/**
 * Check if a business or event is currently open
 * @param item - The business or event to check
 * @returns true if the item is currently open, false otherwise
 */
export function isItemOpenNow(item: Business | Event): boolean {
    if ("workingHours" in item) {
        return isBusinessOpenNow(item as Business);
    } else {
        return isEventOpenNow(item as Event);
    }
}

