# Jobseeker - Job Listing Platform

A modern, responsive job listing application built with React and
Tailwind CSS. This project was developed as a frontend internship task
to demonstrate CRUD operations, advanced filtering, and high-fidelity UI
replication.

------------------------------------------------------------------------

## Live Demo

https://job-listing-jnxftms2i-pragathii2611s-projects.vercel.app/#

------------------------------------------------------------------------

## Features

### Job Management (CRUD)

-   Create: Post new jobs with details like company logo, salary, and
    seniority.
-   Read: View a card-based list of all available job openings.
-   Update: Edit existing job details via a seamless modal interface.
-   Delete: Remove job postings with confirmation safeguards.

### Search & Filtering

-   Real-time Search: Instantly find jobs by title or company name.
-   Multi-Category Filters: Filter by Job Type (Engineering, Design,
    etc.), Employment Type, and Seniority Level.

### User Interface

-   Responsive Design: Fully adaptive layout for mobile, tablet, and
    desktop.
-   Image Previews: Instant visual feedback when uploading company
    logos.
-   Modular Architecture: Clean separation of concerns with reusable
    components.

------------------------------------------------------------------------

## Tech Stack & Tools

-   Frontend Framework: React (Vite)
-   Styling: Tailwind CSS v3
-   Icons: Lucide React
-   State Management: React Hooks (useState, useEffect, useMemo)
-   Deployment: Vercel

------------------------------------------------------------------------

## Installation & Running Locally

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

git clone https://github.com/pragathii2611/JOB-LISTING-APP.git\
cd JOB-LISTING-APP

### 2. Install Dependencies

npm install

### 3. Start the Development Server

npm run dev

Open your browser and navigate to:\
http://localhost:5173

### 4. Build for Production

To create an optimized production build:

npm run build

------------------------------------------------------------------------

## Project Structure

src/ ├── components/ │ ├── JobCard.jsx \# Individual job item display │
├── JobModal.jsx \# Form for adding/editing jobs │ └── UI.jsx \#
Reusable atoms (Buttons, Inputs) ├── data.js \# Mock JSON data for
initial state ├── App.jsx \# Main application logic & layout └──
main.jsx \# Entry point

------------------------------------------------------------------------

## Design Decisions

-   Tailwind CSS was chosen for its utility-first approach, allowing for
    rapid development and strict adherence to the provided design
    mockups.
-   Mock Data (JSON) is used via data.js to simulate API responses,
    ensuring the application is fully functional without a backend
    dependency.
-   Component Modularity ensures the UI is broken down into small,
    reusable pieces (JobCard, UI.jsx) to improve readability and
    maintainability.

------------------------------------------------------------------------

