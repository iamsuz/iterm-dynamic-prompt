// @ts-nocheck

import React, { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import * as Select from "@radix-ui/react-select";
import ReactSelect from "@radix-ui/react-select";
import { Check, Copy } from "lucide-react";

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
}

// Suggestions
const separatorOptions = [
	{ label: "➜", value: "➜" },
	{ label: "$", value: "$" },
	{ label: "→", value: "→" },
	{ label: "❯", value: "❯" },
	{ label: "λ", value: "λ" },
];

const colorOptions = [
	{ label: "Green (#00ff00)", value: "#00ff00" },
	{ label: "Red (#ff0000)", value: "#ff0000" },
	{ label: "Blue (#0000ff)", value: "#0000ff" },
	{ label: "Orange (#ff9900)", value: "#ff9900" },
	{ label: "Purple (#9932cc)", value: "#9932cc" },
];

const AutoSuggestion: React.FC = () => {
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
	});

	const [copied, setCopied] = useState<boolean>(false);

	const updateSetting = (
		key: keyof PromptSettings,
		value: string | boolean
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

	const generatePrompt = (): string => {
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

	const copyToClipboard = async (): Promise<void> => {
		const prompt = generatePrompt();
		await navigator.clipboard.writeText(prompt);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="p-4 max-w-4xl mx-auto">
			<div className="mb-6">
				<h2 className="text-xl font-bold">iTerm Prompt Generator</h2>

				<div className="space-y-6">
					{/* Separator Selection with Auto-Suggestions */}
					<div>
						<label>Separator Symbol</label>
						<ReactSelect
							options={separatorOptions}
							value={separatorOptions.find(
								(option) => option.value === settings.separator
							)}
							onChange={(option) =>
								updateSetting("separator", option?.value || "➜")
							}
							isClearable
							placeholder="Select a separator or type custom..."
						/>
					</div>

					{/* Username Color with Suggestions */}
					<div>
						<label>Username Color</label>
						<ReactSelect
							options={colorOptions}
							value={colorOptions.find(
								(option) => option.value === settings.usernameColor
							)}
							onChange={(option) =>
								updateSetting("usernameColor", option?.value || "#00ff00")
							}
							isClearable
							placeholder="Select a color or type custom..."
						/>
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

export default AutoSuggestion;
