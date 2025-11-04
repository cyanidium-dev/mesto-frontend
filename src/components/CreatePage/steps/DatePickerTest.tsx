"use client";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, Input, Button, ScrollShadow } from "@heroui/react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

export default function DateTimePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hour, setHour] = useState(11);
  const [minute, setMinute] = useState(30);
  const [ampm, setAmPm] = useState<"AM" | "PM">("AM");

  const handleConfirm = () => {
    const date = new Date(selectedDate);
    const finalHour = ampm === "PM" ? (hour % 12) + 12 : hour % 12;
    date.setHours(finalHour, minute, 0);
    setSelectedDate(date);
  };

  const formattedDate = selectedDate
    ? `${format(selectedDate, "MMM d, yyyy")} – ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${ampm}`
    : "";

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Input
          isReadOnly
          label="Select Date & Time"
          value={formattedDate}
          placeholder="Pick date & time"
          className="cursor-pointer"
        />
      </PopoverTrigger>

      <PopoverContent className="p-4 bg-white rounded-2xl shadow-xl w-[300px]">
        <div className="text-center font-medium mb-2">
          {format(selectedDate, "MMMM yyyy")}
        </div>

        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(d) => d && setSelectedDate(d)}
          className="!mx-auto !text-gray-800"
        />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Time</p>
          <div className="flex justify-center items-center gap-2">
            {/* Scrollable Hours */}
            <ScrollShadow className="h-24 w-12 overflow-y-scroll text-center snap-y snap-mandatory">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <div
                  key={h}
                  onClick={() => setHour(h)}
                  className={`py-1 cursor-pointer snap-center transition-colors ${
                    hour === h ? "text-primary font-semibold" : "text-gray-500"
                  }`}
                >
                  {h}
                </div>
              ))}
            </ScrollShadow>

            {/* Separator */}
            <span className="text-lg font-medium text-gray-600">:</span>

            {/* Scrollable Minutes */}
            <ScrollShadow className="h-24 w-12 overflow-y-scroll text-center snap-y snap-mandatory">
              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                <div
                  key={m}
                  onClick={() => setMinute(m)}
                  className={`py-1 cursor-pointer snap-center transition-colors ${
                    minute === m ? "text-primary font-semibold" : "text-gray-500"
                  }`}
                >
                  {String(m).padStart(2, "0")}
                </div>
              ))}
            </ScrollShadow>

            {/* AM / PM Toggle */}
            <div className="flex flex-col gap-1 ml-2">
              {["AM", "PM"].map((val) => (
                <Button
                  key={val}
                  size="sm"
                  radius="sm"
                  color={ampm === val ? "primary" : "default"}
                  variant={ampm === val ? "solid" : "flat"}
                  onPress={() => setAmPm(val as "AM" | "PM")}
                  className="px-2 py-1 text-xs"
                >
                  {val}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onPress={handleConfirm}
          color="primary"
          className="w-full mt-4"
        >
          Confirm
        </Button>
      </PopoverContent>
    </Popover>
  );
}
