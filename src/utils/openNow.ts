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

    const timeRegex = /^\d{1,2}:\d{2}$/;
    if (!timeRegex.test(todayHours.start) || !timeRegex.test(todayHours.end)) {
        return false;
    }

    const startParts = todayHours.start.split(":");
    const endParts = todayHours.end.split(":");
    
    if (startParts.length !== 2 || endParts.length !== 2) {
        return false;
    }

    const startHour = Number(startParts[0]);
    const startMinute = Number(startParts[1]);
    const endHour = Number(endParts[0]);
    const endMinute = Number(endParts[1]);

    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
        return false;
    }

    if (startHour < 0 || startHour > 23 || startMinute < 0 || startMinute > 59 ||
        endHour < 0 || endHour > 23 || endMinute < 0 || endMinute > 59) {
        return false;
    }

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

    const timeRegex = /^\d{1,2}:\d{2}$/;
    if (!timeRegex.test(event.startTime)) {
        return false;
    }

    const now = new Date();
    const currentTime = now.getTime();

    const startDate = event.startDate instanceof Date 
        ? new Date(event.startDate.getTime())
        : new Date(event.startDate);
    
    if (isNaN(startDate.getTime())) {
        return false;
    }

    const startParts = event.startTime.split(":");
    if (startParts.length !== 2) {
        return false;
    }

    const startHour = Number(startParts[0]);
    const startMinute = Number(startParts[1]);

    if (isNaN(startHour) || isNaN(startMinute)) {
        return false;
    }

    if (startHour < 0 || startHour > 23 || startMinute < 0 || startMinute > 59) {
        return false;
    }

    startDate.setHours(startHour, startMinute, 0, 0);

    if (event.endDate && event.endTime) {
        if (!timeRegex.test(event.endTime)) {
            return false;
        }

        const endDate = event.endDate instanceof Date
            ? new Date(event.endDate.getTime())
            : new Date(event.endDate);
        
        if (isNaN(endDate.getTime())) {
            return false;
        }

        const endParts = event.endTime.split(":");
        if (endParts.length !== 2) {
            return false;
        }

        const endHour = Number(endParts[0]);
        const endMinute = Number(endParts[1]);

        if (isNaN(endHour) || isNaN(endMinute)) {
            return false;
        }

        if (endHour < 0 || endHour > 23 || endMinute < 0 || endMinute > 59) {
            return false;
        }

        endDate.setHours(endHour, endMinute, 0, 0);
        
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        
        if (isNaN(startTime) || isNaN(endTime)) {
            return false;
        }

        return (
            currentTime >= startTime &&
            currentTime <= endTime
        );
    }

    if (event.isRepetitive) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDay = new Date(startDate);
        eventDay.setHours(0, 0, 0, 0);
        
        const todayTime = today.getTime();
        const eventDayTime = eventDay.getTime();
        const startTime = startDate.getTime();
        
        if (isNaN(todayTime) || isNaN(eventDayTime) || isNaN(startTime)) {
            return false;
        }

        if (todayTime === eventDayTime) {
            return currentTime >= startTime;
        }
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDay = new Date(startDate);
    eventDay.setHours(0, 0, 0, 0);
    
    const todayTime = today.getTime();
    const eventDayTime = eventDay.getTime();
    const startTime = startDate.getTime();
    
    if (isNaN(todayTime) || isNaN(eventDayTime) || isNaN(startTime)) {
        return false;
    }
    
    if (todayTime !== eventDayTime) {
        return false;
    }

    return currentTime >= startTime;
}

export function isItemOpenNow(item: Business | Event): boolean {
    if ("workingHours" in item) {
        return isBusinessOpenNow(item as Business);
    } else {
        return isEventOpenNow(item as Event);
    }
}
