import { Business } from "@/types/business";
import { Event } from "@/types/event";

export function isBusinessOpenNow(business: Business): boolean {
    if (!business.workingHours || business.workingHours.length === 0) {
        return true;
    }

    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const todayHours = business.workingHours[currentDay];

    if (!todayHours || !todayHours.start || !todayHours.end) {
        return false;
    }

    const [startHour, startMinute] = todayHours.start.split(":").map(Number);
    const [endHour, endMinute] = todayHours.end.split(":").map(Number);

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (endTime < startTime) {
        return currentTime >= startTime || currentTime <= endTime;
    }

    return currentTime >= startTime && currentTime <= endTime;
}

export function isEventOpenNow(event: Event): boolean {
    if (!event.startDate || !event.startTime) {
        return false;
    }

    const now = new Date();
    const currentTime = now.getTime();

    const startDate = new Date(event.startDate);
    const [startHour, startMinute] = event.startTime.split(":").map(Number);
    startDate.setHours(startHour, startMinute, 0, 0);

    if (event.endDate && event.endTime) {
        const endDate = new Date(event.endDate);
        const [endHour, endMinute] = event.endTime.split(":").map(Number);
        endDate.setHours(endHour, endMinute, 0, 0);
        return (
            currentTime >= startDate.getTime() &&
            currentTime <= endDate.getTime()
        );
    }

    if (event.isRepetitive) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDay = new Date(startDate);
        eventDay.setHours(0, 0, 0, 0);
        if (today.getTime() === eventDay.getTime()) {
            return currentTime >= startDate.getTime();
        }
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDay = new Date(startDate);
    eventDay.setHours(0, 0, 0, 0);
    
    if (today.getTime() !== eventDay.getTime()) {
        return false;
    }

    return currentTime >= startDate.getTime();
}

export function isItemOpenNow(item: Business | Event): boolean {
    if ("workingHours" in item) {
        return isBusinessOpenNow(item as Business);
    } else {
        return isEventOpenNow(item as Event);
    }
}
