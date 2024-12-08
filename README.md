# iTerm Prompt Generator

This project allows you to customize your terminal prompt in iTerm (or any Zsh-compatible terminal) by selecting various elements like the username, hostname, current directory, Git branch, time, and separator. You can also select colors for each element and choose a custom time format.

Once you're done customizing the prompt, you can easily copy the generated prompt code and apply it to your terminal.

## Features

- Show/Hide elements: Username, Hostname, Current Directory, Git Branch, Time
- Customize colors for each element (Username, Hostname, Directory, Git, Time)
- Select Time format: Hour, Minute, Second, Day, Month, Year
- Customize prompt separator
- Preview the prompt in real-time
- Copy the generated prompt to clipboard

## How to Use

1. Customize Your Prompt:

- Toggle the visibility of elements (Username, Hostname, Time, Git Branch, Current Directory) by switching the corresponding switches.
- Pick colors for each element using the color pickers.
- Choose a separator (e.g., ➜, $, →, ❯).
- Select the time format by checking the relevant boxes (e.g., Hour, Minute, Second, Day, Month, Year). This controls how the time will appear in your prompt.

2. Preview Your Prompt:

- As you make changes, you'll see a real-time preview of how the prompt will look in your terminal.

3. Copy the Prompt:

- Once you're happy with your customization, click on the "Copy Prompt" button.
- This will copy the entire prompt string to your clipboard.

## How to Apply the Prompt in Zsh

1. Edit Your .zshrc File: The .zshrc file is the configuration file for Zsh, and it's where you define your prompt and other configurations.

- Open your .zshrc file in a text editor. You can use nano, vim, or any editor you're comfortable with. Here's an example using nano:

```shell
nano ~/.zshrc
```

2. Update the Prompt Variable:

- In your .zshrc file, look for the line that defines the PS1 prompt. This is usually where your terminal prompt is set.

- Replace the existing PS1 line with the generated prompt from the iTerm Prompt Generator. Paste the copied string like this:

```bash
export PS1="PASTE-YOUR-COPIED-PROMPT-HERE"
```

Example:

```bash
export PS1="%(#.%F{red}➜%f.%F{green}%~%f.%F{yellow}%(!.#.$)%f)"
```

Note: Make sure you remove any conflicting PS1 definitions in the file before adding the new one.

Apply the Changes:

After saving the file, apply the changes by running the following command in your terminal:

```bash
source ~/.zshrc
```

Enjoy Your Custom Prompt!

Once you've sourced your .zshrc, your prompt will be updated with the new style and settings.

## Example Prompt

Here’s an example of a prompt you might generate:

```bash
[user@macbook ~/projects] ➜
```

Where user is the username, macbook is the hostname, ~/projects is the current directory, and ➜ is the separator.

Troubleshooting
Prompt doesn't update after applying the changes:

Make sure that you have correctly pasted the prompt string in the PS1 variable in your .zshrc file.
Ensure there are no conflicting PS1 definitions in the .zshrc file.
Colors are not showing correctly:

Verify that your terminal supports 24-bit colors (true color). Some older versions of iTerm or other terminal apps may not support it.
Changes aren't taking effect after running source ~/.zshrc:

Try restarting your terminal session or running exec zsh to reload the shell completely.

License
This project is licensed under the MIT License - see the LICENSE file for details.
