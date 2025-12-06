Jobseeker - Job Listing Platform

A modern, responsive job listing application built with React and Tailwind CSS. This project was developed as a frontend internship task to demonstrate CRUD operations, filtering logic, and high-fidelity UI replication.

Features

Job Management (CRUD):

Create: Add new job postings with details like company logo, salary, and seniority.

Read: View a comprehensive list of jobs with a clean, card-based layout.

Update: Edit existing job details through a modal interface.

Delete: Remove job postings with confirmation safeguards.

Advanced Search & Filtering:

Real-time Search: Filter jobs instantly by job title or company name.

Multi-Category Filters: Filter by Job Type (Engineering, Design, etc.) and Employment Type (Full Time, Contract, etc.).

User Interface:

Responsive Design: Fully adaptive layout that works on mobile, tablet, and desktop.

Modal Forms: Clean, backdrop-blurred modals for adding and editing content.

Image Previews: Instant visual preview when uploading company logos.

Tech Stack

Frontend Framework: React (powered by Vite)

Styling: Tailwind CSS (v3.4)

Icons: Lucide React

State Management: React Hooks (useState, useEffect, useMemo)

Installation & Running Locally

Follow these steps to get the project running on your local machine.

Prerequisites

Node.js (v14 or higher)

npm (Node Package Manager)

Step 1: Clone the Repository

git clone <your-repo-url-here>
cd job-listing-app


Step 2: Install Dependencies

npm install


Step 3: Run the Development Server

npm run dev


Open your browser and navigate to the URL shown in the terminal (usually http://localhost:5173).

Step 4: Build for Production

To create an optimized build for deployment:

npm run build


Project Structure

src/
├── components/
│   ├── JobModal.jsx    # Modal for adding/editing jobs (handles file previews)
│   └── UI.jsx          # Reusable UI atoms (Buttons, Inputs, Selects)
├── data.js             # Mock JSON data for initial application state
├── App.jsx             # Main application logic (State, Filter Logic, Layout)
├── index.css           # Tailwind directives and global styles
└── main.jsx            # Application entry point


Design Decisions

Component Reusability: Common elements like Buttons and Inputs were abstracted into a UI.jsx file to maintain consistency and reduce code duplication.

Tailwind CSS: Used for rapid UI development to strictly adhere to the provided design mockups (spacing, colors, rounded corners).

Mock Data: The app uses a local JSON structure (data.js) to simulate API responses, allowing for immediate interaction without a backend.

