import React, { useState, useEffect } from "react";

interface TimeFormatPickerProps {
	selectedTimeFormat: string[];
	onTimeFormatChange: (newFormat: string[]) => void;
}

const TimeFormatPicker: React.FC<TimeFormatPickerProps> = ({
	selectedTimeFormat,
	onTimeFormatChange,
}) => {
	const [selectedFormat, setSelectedFormat] =
		useState<string[]>(selectedTimeFormat);
	console.log({ selectedFormat, t: onTimeFormatChange });
	useEffect(() => {
		// Update parent whenever time format changes
		onTimeFormatChange(selectedFormat);
	}, [selectedFormat, onTimeFormatChange]);

	const handleCheckboxChange = (value: string) => {
		setSelectedFormat((prev) => {
			if (prev.includes(value)) {
				return prev.filter((item) => item !== value); // Remove if already selected
			} else {
				return [...prev, value]; // Add if not selected
			}
		});
	};

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Select Time Format</h3>
			<div className="space-y-2">
				<label className="flex items-center">
					<input
						type="checkbox"
						checked={selectedFormat.includes("yyyy")}
						onChange={() => handleCheckboxChange("yyyy")}
					/>
					<span className="ml-2">Year (yyyy)</span>
				</label>

				<label className="flex items-center">
					<input
						type="checkbox"
						checked={selectedFormat.includes("MM")}
						onChange={() => handleCheckboxChange("MM")}
					/>
					<span className="ml-2">Month (MM)</span>
				</label>

				<label className="flex items-center">
					<input
						type="checkbox"
						checked={selectedFormat.includes("dd")}
						onChange={() => handleCheckboxChange("dd")}
					/>
					<span className="ml-2">Day (dd)</span>
				</label>
				<label className="flex items-center">
					<input
						type="checkbox"
						checked={selectedFormat.includes("hh")}
						onChange={() => handleCheckboxChange("hh")}
					/>
					<span className="ml-2">Hour (hh)</span>
				</label>

				<label className="flex items-center">
					<input
						type="checkbox"
						checked={selectedFormat.includes("mm")}
						onChange={() => handleCheckboxChange("mm")}
					/>
					<span className="ml-2">Minute (mm)</span>
				</label>

				<label className="flex items-center">
					<input
						type="checkbox"
						checked={selectedFormat.includes("ss")}
						onChange={() => handleCheckboxChange("ss")}
					/>
					<span className="ml-2">Second (ss)</span>
				</label>
			</div>
		</div>
	);
};

export default TimeFormatPicker;
