# MoodDiary Product Requirements Document (PRD)

## 1. Project Overview

**MoodDiary** is a simple and intuitive diary service that allows users to write journal entries and automatically analyzes the emotions in those entries, displaying them visually. Using GPT technology, it analyzes the content of users' diaries and enables them to grasp the mood at a glance through colors and icons based on the emotions detected.

## 2. User Flow

1. **Writing a Diary Entry**

    - Click the **'Write New Entry'** button on the main screen.
    - Title and content input fields are provided, and the user writes their diary entry.
    - After completing the entry, press the **'Save'** button.

2. **Emotion Analysis**

    - When the diary is saved, the content is analyzed for emotions using the **Google Gemini API**.
    - The analyzed emotions are stored in local storage or state management.

3. **Viewing Diary List**

    - Users can view a list of diary entries sorted by date.
    - Each entry displays a color background and icon according to the analyzed emotion.

4. **Viewing Diary Details**

    - When selecting an entry from the list, users can view the detailed content.
    - The emotion analysis results are also displayed on the detail page.

## 3. Core Features

### A. Diary Creation and Management

-   **Diary Creation**: Write a new diary entry by inputting a title and content.
-   **Diary Editing and Deletion**: Edit or delete previously written entries.
-   **Diary List View**: Provide a list of diary entries sorted by date.

### B. Emotion Analysis

-   **Gemini API Integration**: Use Google's Gemini API to analyze emotions in diary content.
-   **Emotion Classification**: Classify analyzed emotions into predefined emotional states.
-   **Local Backup Analysis**: Provide basic emotion classification through keyword-based local analysis when API calls fail.

### C. Visual Display

-   **Color and Icon Display Based on Emotional State**

    Emotional states are mapped to colors and icons as follows:

    | Emotional State | Color Code       | Icon                                           |
    | --------------- | ---------------- | ---------------------------------------------- |
    | **Happy**       | `#FFD700` Gold   | `Smile` icon (Using Lucide Icons' `Smile`)     |
    | **Sad**         | `#1E90FF` Blue   | `Frown` icon (Using Lucide Icons' `Frown`)     |
    | **Angry**       | `#FF4500` Orange | `Angry` icon (Using Lucide Icons' `Angry`)     |
    | **Neutral**     | `#C0C0C0` Silver | `Meh` icon (Using Lucide Icons' `Meh`)         |
    | **Excited**     | `#7FFF00` Lime   | `Surprise` icon (Using Lucide Icons' `Surprise`) |

-   **Icon Library Usage**

    -   Use **Lucide Icons** to apply icons.

-   **Application in Diary List and Detail Pages**

    -   In the list view, each diary entry displays a background color and icon according to the emotion.
    -   The detail page also shows the color and icon of the corresponding emotion, allowing users to easily grasp the mood of the diary.

### D. Theme Settings

-   **Dark Mode Support**: Users can choose between light mode and dark mode.
-   **Theme Toggle Button**: Provide a theme switching button in the top navigation bar.
-   **Theme Saving**: The selected theme is saved in local storage and persists even after page refresh.
-   **System Settings Detection**: Automatically apply the user's system theme setting upon initial access.

### E. Multilingual Support

-   **Language Switching**: Provide a toggle switch to switch between English and Korean.
-   **UI Translation**: All UI elements such as buttons, labels, and messages are displayed in the selected language.
-   **Multilingual Emotion Analysis**: Emotion analysis is available in both English and Korean.
-   **Language Setting Persistence**: The selected language setting is saved in local storage and persists even after page refresh.
-   **Default Language**: The default language is set to English, and users can switch to Korean if desired.

## 4. Technology Stack

### Required Technology Stack

-   **Next.js App Router**: Server-side rendering and routing management
-   **ShadCN UI**: UI component library
-   **TailwindCSS**: Styling framework

### Additional Technology Stack

-   **TypeScript**: Ensuring stability through static type checking
-   **React Hooks and Context API**: State management and theme/language management
-   **Google Gemini API**: Using the Gemini model for emotion analysis
-   **Local Storage**: Local storage of diary data, theme settings, and language settings
-   **Axios or Fetch API**: HTTP client for API calls
-   **Lucide Icons**: Library for icon usage
    -   Compatible with ShadCN UI and provides various icons.

## 5. Additional Improvements After MVP Feature Development

-   **Sign-up and Login Functionality**: Add user authentication (email and password-based)
-   **Database Integration**: Permanent data storage using Prisma and PostgreSQL
-   **Additional Language Support**: Expand to include more languages such as Chinese, Japanese, etc.
-   **Emotion Statistics**: Provide monthly or yearly emotion trend graphs
-   **Social Features**: Ability to share diaries with other users or leave comments
-   **Notification Feature**: Set reminders for diary writing
-   **Customization**: Theme changing and icon customization features for each user
-   **Offline Mode Improvement**: Support for writing and viewing diaries without an internet connection
