
Task Management App
Overview
This Task Management App allows users to efficiently manage their tasks by providing a user-friendly interface for adding, organizing, and tracking tasks through different stages. It's built using ReactJS and leverages the React Beautiful DND library for drag-and-drop functionality.

Features
Add Tasks: Users can easily add new tasks by providing a task name, description, and optional due date.

Organize Tasks: Tasks are organized into different stages, such as "Added", "Started", and "Completed". Users can drag and drop tasks between these stages to change their status.

Task Details: Each task displays detailed information including the task name, description, and due date (if provided).
The application also implements error handling and validation as appropriate.

Installation
To run the Task Management App locally, follow these steps:

Clone the repository:

bash
Copy code

git clone <repository-url>
Navigate to the project folder and install dependencies:

bash
Copy code
cd <project-folder>
npm install
Start the development server:

sql
Copy code
npm start
Open your web browser and navigate to http://localhost:3000 to access the application.

Usage
Adding New Tasks:

Enter the task name and description in the input fields.
Optionally, select a due date for the task.
Click the "Add Task" button to add the task to the list.
Managing Tasks:

Drag and drop tasks between different stages to change their status.
Tasks are typically moved from "To Do" to "Started" when work begins, and from "Started" to "Completed" when completed.
Viewing Task Details:

Click on a task to view its detailed information, including the task name, description, and due date.

Technologies Used
ReactJS
React Beautiful DND
Bootstrap (for styling)

Code Structure and Best Practices
The codebase is organized in a modular and maintainable manner. It follows best practices for code organization and project structure, ensuring code readability and maintainability through proper naming conventions, comments (where necessary), and code formatting.



Credits
The Task Management App was developed by Sagar Gawai.




Repository Link
The project repository can be found at https://github.com/Saga15/Task-Management.git
