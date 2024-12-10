import React, { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from "@/components/ui/select";

import { Check, Copy } from "lucide-react";
// import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import TimeFormatPicker from "./components/ui/TimeFormatPicker";

// Types definition
interface PromptSettings {
	showUsername: boolean;
	showHostname: boolean;
	showCurrentDir: boolean;
	showGitBranch: boolean;
	showTime: boolean;
	showDate: boolean;
	usernameColor: string;
	hostnameColor: string;
	dirColor: string;
	gitColor: string;
	timeColor: string;
	separator: string;
	newLine: boolean;
	bgColor: string;
	timeFormat: string[];
}

const PromptGenerator: React.FC = () => {
	const [settings, setSettings] = useState<PromptSettings>({
		showUsername: true,
		showHostname: true,
		showCurrentDir: true,
		showGitBranch: true,
		showTime: false,
		showDate: false,
		usernameColor: "#00ff00",
		hostnameColor: "#0099ff",
		dirColor: "#ff9900",
		gitColor: "#ff0000",
		timeColor: "#9932cc",
		separator: "➜",
		newLine: false,
		bgColor: "#282727",
		timeFormat: [],
	});

	const [copied, setCopied] = useState<boolean>(false);

	const updateSetting = (
		key: keyof PromptSettings,
		value: string | boolean | string[]
	): void => {
		setSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const hexToRgb = (hex: string): string => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? `${parseInt(result[1], 16)};${parseInt(result[2], 16)};${parseInt(
					result[3],
					16
			  )}`
			: "255;255;255";
	};

	const generateTimeFormat = (): string => {
		console.log("I am in generateTime format");
		let timeFormat = "";
		if (settings.timeFormat.includes("hh")) {
			timeFormat += "%H";
		}
		if (settings.timeFormat.includes("mm")) {
			timeFormat += ":%M";
		}
		if (settings.timeFormat.includes("ss")) {
			timeFormat += ":%S";
		}
		if (settings.timeFormat.includes("yyyy")) {
			timeFormat = "%Y-" + timeFormat;
		}
		if (settings.timeFormat.includes("mm")) {
			timeFormat = timeFormat.replace("%Y-", "");
			timeFormat = "%m-" + timeFormat;
		}
		return timeFormat;
	};

	const formatTime = (format: string[]): string => {
		const now = new Date();
		const options: { [key: string]: string | number } = {
			hh: now.getHours().toString().padStart(2, "0"), // Hours (00-23)
			mm: now.getMinutes().toString().padStart(2, "0"), // Minutes (00-59)
			ss: now.getSeconds().toString().padStart(2, "0"), // Seconds (00-59)
			dd: now.getDate().toString().padStart(2, "0"), // Day (01-31)
			MM: (now.getMonth() + 1).toString().padStart(2, "0"), // Month (01-12)
			yyyy: now.getFullYear().toString(), // Year (YYYY)
		};

		// Join the format components dynamically
		return format.map((part) => options[part] || part).join(":");
	};

	const generatePrompt = (): string => {
		let prompt = 'PROMPT="';

		if (settings.showTime && settings.timeFormat.length > 0) {
			prompt += `%{\\e[38;2;${hexToRgb(
				settings.timeColor
			)}m%}\\$(date "+${generateTimeFormat().toString()}")%{\\e[0m%}`;
		}

		if (settings.showUsername) {
			prompt += `%{\\e[38;2;${hexToRgb(
				settings.usernameColor
			)}m%}\\u%{\\e[0m%}`;
		}

		if (settings.showHostname) {
			prompt += `%{\\e[38;2;${hexToRgb(
				settings.hostnameColor
			)}m%}@\\h%{\\e[0m%}`;
		}

		if (settings.showCurrentDir) {
			prompt += `%{\\e[38;2;${hexToRgb(settings.dirColor)}m%}\\w%{\\e[0m%}`;
		}

		if (settings.showGitBranch) {
			prompt += `%{\\e[38;2;${hexToRgb(
				settings.gitColor
			)}m%}\\$(git branch 2>/dev/null | grep '^*' | colrm 1 2)%{\\e[0m%}`;
		}

		prompt += `${settings.separator}"`;

		return prompt;
	};
	const copyToClipboard = async (): Promise<void> => {
		const prompt = generatePrompt();
		await navigator.clipboard.writeText(prompt);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const [timeFormat, setTimeFormat] = useState<string[]>(["hh", "mm", "ss"]);
	console.log({ timeFormat });
	return (
		<div className="p-4 max-w-4xl mx-auto">
			<div className="mb-6">
				<div>
					<h2 className="text-xl font-bold">iTerm Prompt Generator</h2>
				</div>
				<div>
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<label>Elements</label>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<label htmlFor="username">Username</label>
										<Switch
											id="username"
											checked={settings.showUsername}
											onCheckedChange={(checked) =>
												updateSetting("showUsername", checked)
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<label htmlFor="hostname">Hostname</label>
										<Switch
											id="hostname"
											checked={settings.showHostname}
											onCheckedChange={(checked) =>
												updateSetting("showHostname", checked)
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<label htmlFor="currentDir">Current Directory</label>
										<Switch
											id="currentDir"
											checked={settings.showCurrentDir}
											onCheckedChange={(checked) =>
												updateSetting("showCurrentDir", checked)
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<label htmlFor="gitBranch">Git Branch</label>
										<Switch
											id="gitBranch"
											checked={settings.showGitBranch}
											onCheckedChange={(checked) =>
												updateSetting("showGitBranch", checked)
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<label htmlFor="time">Time</label>
										<Switch
											id="time"
											checked={settings.showTime}
											onCheckedChange={(checked) =>
												updateSetting("showTime", checked)
											}
										/>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<label>Colors</label>
								<div className="space-y-4">
									{settings.showUsername && (
										<div className="flex items-center gap-2">
											<label className="min-w-24">Username Color</label>
											<input
												type="color"
												value={settings.usernameColor}
												onChange={(e) =>
													updateSetting("usernameColor", e.target.value)
												}
												className="w-20 h-8 p-1"
											/>
										</div>
									)}
									{settings.showHostname && (
										<div className="flex items-center gap-2">
											<label className="min-w-24">Hostname Color</label>
											<input
												type="color"
												value={settings.hostnameColor}
												onChange={(e) =>
													updateSetting("hostnameColor", e.target.value)
												}
												className="w-20 h-8 p-1"
											/>
										</div>
									)}
									{settings.showCurrentDir && (
										<div className="flex items-center gap-2">
											<label className="min-w-24">Directory Color</label>
											<input
												type="color"
												value={settings.dirColor}
												onChange={(e) =>
													updateSetting("dirColor", e.target.value)
												}
												className="w-20 h-8 p-1"
											/>
										</div>
									)}
									{settings.showGitBranch && (
										<div className="flex items-center gap-2">
											<label className="min-w-24">Git Branch Color</label>
											<input
												type="color"
												value={settings.gitColor}
												onChange={(e) =>
													updateSetting("gitColor", e.target.value)
												}
												className="w-20 h-8 p-1"
											/>
										</div>
									)}
									{settings.showTime && (
										<div>
											<div className="mt-6">
												<div className="flex items-center justify-between">
													<label htmlFor="time">Time Color</label>
													<input
														type="color"
														value={settings.timeColor}
														onChange={(e) =>
															updateSetting("timeColor", e.target.value)
														}
														className="w-20 h-8 p-1"
													/>
												</div>
											</div>
											<div className="mt-6">
												<TimeFormatPicker
													selectedTimeFormat={settings.timeFormat}
													onTimeFormatChange={(newFormat) => {
														setTimeFormat(newFormat); // Only update the time format in the state
														updateSetting("timeFormat", newFormat); // Update settings.timeFormat directly
													}}
												/>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						<div>
							<Select
								value={settings.separator}
								onValueChange={(value) => updateSetting("separator", value)}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select a Separator">
										Select a Separator {settings.separator}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="➜">➜</SelectItem>
										<SelectItem value="$">$</SelectItem>
										<SelectItem value="→">→</SelectItem>
										<SelectItem value="❯">❯</SelectItem>
										<SelectItem value="λ">λ</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div
						className="p-4 rounded-lg flex flex-col space-y-2"
						style={{ backgroundColor: settings.bgColor }}
					>
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center space-x-2">
								{settings.showTime && (
									<span style={{ color: settings.timeColor }}>
										[{formatTime(settings.timeFormat)}]
									</span>
								)}
								{settings.showUsername && (
									<span style={{ color: settings.usernameColor }}>user</span>
								)}
								{settings.showHostname && (
									<span style={{ color: settings.hostnameColor }}>
										@macbook
									</span>
								)}
								{settings.showCurrentDir && (
									<span style={{ color: settings.dirColor }}>~/projects</span>
								)}
								{settings.showGitBranch && (
									<span style={{ color: settings.gitColor }}>(main)</span>
								)}
								<span className="text-white">{settings.separator}</span>
							</div>

							{/* Color Picker aligned to the right */}
							<input
								type="color"
								value={settings.bgColor}
								onChange={(e) => updateSetting("bgColor", e.target.value)}
								className="w-10 h-10 p-1 rounded-lg border-2 border-gray-500"
							/>
						</div>
					</div>

					<div className="mt-6 flex justify-end">
						<button
							onClick={copyToClipboard}
							className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded"
						>
							{copied ? (
								<>
									<Check className="w-4 h-4" />
									Copied!
								</>
							) : (
								<>
									<Copy className="w-4 h-4" />
									Copy Prompt
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PromptGenerator;
