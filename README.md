# Todo

## Overview

This project is a task management application built with React for the frontend and Node.js with MongoDB for the backend. The application allows users to manage their todos, track progress, and view recent activities.

## Features

- **Add, Edit, Delete Todos**: Users can add new todos, edit existing ones, and delete them.
- **Toggle Completion**: Mark todos as completed or uncompleted.
- **Focus Mode**: Filter and display only uncompleted todos to help users concentrate on pending tasks.
- **Timer**: Each todo has a timer that shows the elapsed time since its creation and pauses when the todo is completed.
- **Dashboard**: Displays user profile information and task progress, including the number of completed and total tasks.
- **Recent Activities**: View recent activities categorized into completed and uncompleted todos.

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the components.
- **React Icons**: For using icons in the application.
- **Axios**: For making HTTP requests to the backend.

### Backend

- **Node.js**: For building the server-side application.
- **Express.js**: For handling HTTP requests and routing.
- **MongoDB**: For storing todo data.
- **Mongoose**: For interacting with MongoDB.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

### Steps

#### 1. Clone the repository:

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app

GitHub Copilot
Sure, here's the complete README.md file with the full content:

```

#### 2. Install dependencies:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

#### 3. Set up environment variables:
Create a .env file in the server directory and add the following:


```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
#### 4. Run the application:

```bash
# Start the backend server
cd server
npm start

# Start the frontend development server
cd ../client
npm start
```

#### 5. Open the application:
Open your browser and navigate to http://localhost:3000.

### Project Structure

## Frontend

Todos.jsx: Manages the list of todos, allowing users to add, update, delete, and toggle the completion status of todos.
TodoItem.jsx: Represents a single todo item with functionalities to edit, delete, and toggle completion.
Sidebar.jsx: Provides navigation and additional functionalities like focus mode.
Dashboard.jsx: Displays an overview of the user's profile and task progress.
Timer.jsx: A reusable component that shows the elapsed time since the todo was created and pauses when the todo is completed.

### Backend
dashboard.controller.js: Handles requests related to the dashboard functionalities, such as fetching the count of completed todos, total todos, and recent activities.

## Usage
### Adding a Todo
#### Enter the todo text in the input field.
Click the "Add Todo" button.
The new todo will be displayed in the list with a timer showing the elapsed time since its creation.
#### Focus Mode
Click the "Focus Mode" button in the sidebar.
The list will filter to display only uncompleted todos, helping you concentrate on pending tasks.
#### Dashboard
View your profile information and task progress.
The dashboard shows the number of completed and total tasks, providing an overview of your activities and achievements.
Contributing

### Contributing
Contributions are welcome! Please follow these steps:

#### Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
#### Open a pull request.