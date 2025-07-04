# Tasktical

Tasktical is a standalone, offline-first task planning application built with Electron and SQLite. It is designed to provide an efficient, modular, and user-friendly interface for managing tasks, workspaces, and tables—all stored locally for maximum privacy and offline availability.

---

## Table of Contents

- [Tasktical](#tasktical)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Development](#development)
    - [Technologies](#technologies)
  - [Architecture Overview](#architecture-overview)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- **Modular Sidebar Navigation**  
  Intuitive sidebar allows managing favorites, workspaces, and tables. The sidebar is collapsible and remembers user preferences.

- **Multiple Workspaces**  
  Create and switch between multiple workspaces, each having its own dedicated SQLite database file, keeping your data organized and separated.

- **Dynamic Table Management**  
  Within each workspace, create tables to organize your tasks or notes by categories, with customizable forms.

- **Modal Form UI**  
  Smooth modal dialogs for creating new workspaces and tables, with contextual forms adapted to the data being entered.

- **Custom Icon Picker**  
  Choose from categorized FontAwesome icon sets to visually distinguish workspaces.

- **State Persistence**  
  The app remembers sidebar state (open/closed), recent selections, and workspace settings locally, providing a consistent experience on restart.

- **Electron IPC Communication**  
  Uses Electron’s inter-process communication (IPC) for secure and efficient communication between the frontend (renderer) and backend (main process).

- **Offline-First & Local Storage**  
  Entirely offline and local—no cloud required. Your data stays on your device with no external dependencies.

---

## Getting Started

To get started with Tasktical, clone the repository and install dependencies. The app runs on Electron and requires Node.js.

### Prerequisites

- Node.js (v16 or higher recommended)  
- npm (comes with Node.js)  

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/tasktical.git
   cd tasktical

2. Install dependencies:
    ```bash
    npm install

3. Start the application:
    ```bash
    npm start

---

## Usage

- **Sidebar Navigation**
  Use the sidebar to toggle between Favorites, Workspaces, and Tables. The sidebar can be collapsed or expanded, and your choice is saved.

- **Creating Workspaces**
  Click the “Add Workspace” button to open a modal form. Enter a name, select an icon, and create a new workspace, which will be saved as its own SQLite database file.

- **Managing Tables**
  Within a workspace, add tables to organize your tasks. Each table can have different categories and settings.

- **Switching Workspaces**
  Click on any workspace in the sidebar to switch. Your current workspace context is saved automatically.

---

## Configuration

Tasktical stores workspace data as SQLite database files in a user-defined directory. By default, these files are stored in:
- "C:\Users\[user]\AppData\Roaming\tasktical\database"

---

## Development

### Technologies
- Electron — For building the desktop app shell
- better-sqlite3 — Fast, synchronous SQLite3 bindings for Node.js
- FontAwesome — Icon sets for workspace identification
- IPC (Inter-Process Communication) — For secure communication between frontend and backend

---

## Architecture Overview
Tasktical follows a modular architecture:

- **Main Process**
  Controls app lifecycle, handles database access, and manages IPC events.

- **Renderer Process**
  Provides the user interface, handles user interactions, and sends/receives messages via IPC.

- **Database Layer**
  Each workspace corresponds to a separate SQLite file, accessed via better-sqlite3 for performance and simplicity.

--- 

## Contributing
Contributions are very welcome! Feel free to:
- Open issues for bug reports or feature requests
- Submit pull requests with improvements or fixes
- Discuss ideas and improvements via issues or project boards
Please follow the code style and write clear commit messages.

---

## License
This project is licensed under the MIT License © 2025 by Andreas R..

---

Thank you for using Tasktical! For questions or support, open an issue or contact the maintainer.
