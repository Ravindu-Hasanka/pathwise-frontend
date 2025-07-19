"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/dist/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays
      className={className}     
      styles={{
        caption: { textAlign: "center", fontWeight: "600" },
        nav: { display: "flex", justifyContent: "space-between" },
        head_row: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)" },
        row: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)" },
        cell: { padding: "0.3rem", textAlign: "center" },
      }}
      {...props}
    />
  );
}
export { Calendar };
