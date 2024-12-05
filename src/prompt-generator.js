import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const PromptGenerator = () => {
	const [settings, setSettings] = useState({
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
	});

	const updateSetting = (key, value) => {
		setSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const generatePrompt = () => {
		let prompt = 'PS1="';

		if (settings.showTime) {
			prompt += `%{\\e[38;2;${hexToRgb(settings.timeColor)}m%}[\\T]%{\\e[0m%} `;
		}

		if (settings.showUsername) {
			prompt += `%{\\e[38;2;${hexToRgb(
				settings.usernameColor
			)}m%}\\u%{\\e[0m%}`;
		}

		if (settings.showHostname) {
			prompt += `%{\\e[38;2;${hexToRgb(
				settings.hostnameColor
			)}m%}@\\h%{\\e[0m%} `;
		}

		if (settings.showCurrentDir) {
			prompt += `%{\\e[38;2;${hexToRgb(settings.dirColor)}m%}\\w%{\\e[0m%} `;
		}

		if (settings.showGitBranch) {
			prompt += `%{\\e[38;2;${hexToRgb(
				settings.gitColor
			)}m%}\\$(git branch 2>/dev/null | grep '^*' | colrm 1 2)%{\\e[0m%} `;
		}

		prompt += `${settings.separator} "`;

		return prompt;
	};

	const hexToRgb = (hex) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? `${parseInt(result[1], 16)};${parseInt(result[2], 16)};${parseInt(
					result[3],
					16
			  )}`
			: "255;255;255";
	};

	return (
		<div className="p-4 max-w-4xl mx-auto">
			<Card className="mb-6">
				<CardHeader>
					<CardTitle>iTerm Prompt Generator</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Elements</Label>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<Label htmlFor="username">Username</Label>
										<Switch
											id="username"
											checked={settings.showUsername}
											onCheckedChange={(checked) =>
												updateSetting("showUsername", checked)
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Label htmlFor="hostname">Hostname</Label>
										<Switch
											id="hostname"
											checked={settings.showHostname}
											onCheckedChange={(checked) =>
												updateSetting("showHostname", checked)
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Label htmlFor="currentDir">Current Directory</Label>
										<Switch
											id="currentDir"
											checked={settings.showCurrentDir}
											onCheckedChange={(checked) =>
												updateSetting("showCurrentDir", checked)
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Label htmlFor="gitBranch">Git Branch</Label>
										<Switch
											id="gitBranch"
											checked={settings.showGitBranch}
											onCheckedChange={(checked) =>
												updateSetting("showGitBranch", checked)
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Label htmlFor="time">Time</Label>
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
								<Label>Colors</Label>
								<div className="space-y-4">
									{settings.showUsername && (
										<div className="flex items-center gap-2">
											<Label className="min-w-24">Username Color</Label>
											<Input
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
											<Label className="min-w-24">Hostname Color</Label>
											<Input
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
											<Label className="min-w-24">Directory Color</Label>
											<Input
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
											<Label className="min-w-24">Git Branch Color</Label>
											<Input
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
										<div className="flex items-center gap-2">
											<Label className="min-w-24">Time Color</Label>
											<Input
												type="color"
												value={settings.timeColor}
												onChange={(e) =>
													updateSetting("timeColor", e.target.value)
												}
												className="w-20 h-8 p-1"
											/>
										</div>
									)}
								</div>
							</div>
						</div>

						<div>
							<Label>Separator Symbol</Label>
							<Select
								value={settings.separator}
								onValueChange={(value) => updateSetting("separator", value)}
							>
								<SelectTrigger>
									<SelectValue>{settings.separator}</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="➜">➜</SelectItem>
									<SelectItem value="$">$</SelectItem>
									<SelectItem value="→">→</SelectItem>
									<SelectItem value="❯">❯</SelectItem>
									<SelectItem value="λ">λ</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="mt-6">
							<Label>Generated Prompt Command</Label>
							<div className="mt-2 p-4 bg-gray-100 rounded-lg overflow-x-auto">
								<code className="text-sm">{generatePrompt()}</code>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="bg-gray-900 p-4 rounded-lg">
				<div className="flex items-center space-x-2">
					{settings.showTime && (
						<span style={{ color: settings.timeColor }}>[12:34]</span>
					)}
					{settings.showUsername && (
						<span style={{ color: settings.usernameColor }}>user</span>
					)}
					{settings.showHostname && (
						<>
							<span style={{ color: settings.hostnameColor }}>@macbook</span>
						</>
					)}
					{settings.showCurrentDir && (
						<span style={{ color: settings.dirColor }}>~/projects</span>
					)}
					{settings.showGitBranch && (
						<span style={{ color: settings.gitColor }}>(main)</span>
					)}
					<span className="text-white">{settings.separator}</span>
				</div>
			</div>
		</div>
	);
};

export default PromptGenerator;
