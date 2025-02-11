GitHub Activity CLI

roadmapshUrl: https://roadmap.sh/projects/github-user-activity

Description

GitHub Activity CLI is a command-line application that allows you to fetch and display a GitHub user's recent activity.

Installation

Make sure you have Node.js installed on your system.

Download or clone this repository.

Navigate to the project directory.

Usage

Run the command:

node index.js <username>

Where <username> is the GitHub username whose activity you want to view.

Example output:

- Pushed 3 commits to user/repo-name
- Starred user/repo-name
- Opened a new issue in user/repo-name

Features

Fetches a GitHub user's recent activity using the official API.

Displays the 5 most recent events, including PushEvent, IssuesEvent, WatchEvent.

Handles network errors and JSON formatting issues.

Notes

A valid username must be specified.

The application uses only built-in Node.js modules (no external dependencies).

License

This project is licensed under the MIT license.

