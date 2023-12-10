"use client";
import React from "react";
import dayjs from "dayjs";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export default function Calendar() {

	function getDateInYear(year = dayjs().year(), month = dayjs().month()) {
		const startDate = dayjs().year(year).month(month).date(1).startOf('years');
		const endDate = dayjs().year(year).month(month).date(1).endOf("years");
        console.log(startDate, endDate);
		const datesArray = [];

		for (let currentDay = startDate.clone(); currentDay.isBefore(endDate) || currentDay.isSame(endDate); currentDay = currentDay.add(1, 'day')) {
            datesArray.push(currentDay.format("YYYY-MM-DD"));
        }
		return datesArray;
	}

	const getColor = (value: number) => {
		if (value === 0) {
			return "bg-gray-100";
		} else if (value < 5) {
			return "bg-green-100";
		} else if (value < 10) {
			return "bg-green-300";
		} else {
			return "bg-green-500";
		}
	};
	const hour = 10;

	return (
		<div className="bg-secondary rounded-lg p-6 text-center space-y-4">
			<h1 className="text-4xl font-bold">Crisis Map</h1>
			<div className="flex flex-wrap gap-2 justify-center rounded-md">
			{getDateInYear().map((value, index) => {
				return (
					<HoverCard key={index}>
						<HoverCardTrigger>
							<div
								className={cn(
									"h-5 w-5  rounded-sm cursor-pointer",
									getColor(hour || 0)
								)}
							></div>
						</HoverCardTrigger>
						<HoverCardContent>
							{hour || 0} hours on {value}
						</HoverCardContent>
					</HoverCard>
				);
			})}
			</div>
		</div>
	);
}