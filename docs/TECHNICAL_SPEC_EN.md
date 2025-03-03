# MoodDiary Technical Specification

## 1. Project Overview

MoodDiary is a web application that allows users to write diary entries and analyze emotions. It is built on Next.js and React, with a user interface implemented using ShadCN UI components and TailwindCSS. Emotion analysis is performed using the Google Gemini API, and data is stored in local storage.

## 2. Technology Stack

### Frontend
- **Next.js 14**: Server and client components implementation using App Router
- **React 18**: Component-based UI implementation
- **TypeScript**: Type safety assurance
- **TailwindCSS**: Utility-based CSS styling
- **ShadCN UI**: Reusable UI component library
- **Lucide Icons**: Icon library

### Backend & API
- **Next.js API Routes**: Serverless API endpoints
- **Next.js Server Actions**: Server-side data processing
- **Google Gemini API**: Text-based emotion analysis
- **Local Storage**: Client-side data storage

### Development Tools
- **pnpm**: Package manager
- **ESLint**: Code quality management
- **TypeScript**: Static type checking

## 3. Project Structure

```
/
├── app/                    # Next.js App Router directory
│   ├── actions/            # Server Actions
│   ├── api/                # API Routes
│   ├── diary/              # Diary-related pages
│   │   ├── [id]/           # Diary detail page
│   │   └── new/            # New diary creation page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── not-found.tsx       # 404 page
│   └── page.tsx            # Homepage
├── components/             # Reusable components
│   ├── ui/                 # ShadCN UI components
│   ├── DiaryCard.tsx       # Diary card component
│   ├── DiaryForm.tsx       # Diary writing form component
│   ├── DeleteDiaryButton.tsx # Diary deletion button component
│   ├── EmotionIcon.tsx     # Emotion icon component
│   ├── language-toggle.tsx # Language toggle component
│   ├── navbar.tsx          # Navigation bar component
│   └── theme-toggle.tsx    # Theme toggle component
├── lib/                    # Utilities and common functions
│   ├── diary.ts            # Diary CRUD functions
│   ├── gemini.ts           # Google Gemini API integration
│   ├── language-provider.tsx # Multilingual support context
│   ├── local-emotion.ts    # Local emotion analysis functions
│   ├── theme-provider.tsx  # Theme management context
│   ├── translations.ts     # Multilingual translation data
│   ├── types.ts            # Type definitions
│   └── utils.ts            # Utility functions
└── docs/                   # Documentation
```

## 4. Core Feature Implementation

### 4.1 Diary Management System

#### Data Model
```typescript
// lib/types.ts
export type Emotion = "happy" | "sad" | "angry" | "neutral" | "excited";

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO string format
  emotion?: Emotion; // Emotion analysis result
}
```

#### Data Storage and Management
Diary data is stored in the browser's local storage. CRUD (Create, Read, Update, Delete) operations are handled in the `lib/diary.ts` file:

- **getAllDiaries()**: Retrieve all diaries
- **getDiaryById(id)**: Retrieve a specific diary by ID
- **saveDiary(diary)**: Save a new diary
- **updateDiary(diary)**: Update an existing diary
- **deleteDiary(id)**: Delete a diary

### 4.2 Emotion Analysis System

Emotion analysis is implemented in two ways:

1. **Google Gemini API-based Analysis**:
   - API endpoint implemented in `app/api/emotion-analysis/route.ts`
   - Analyzes diary content and classifies it into one of five emotions (happy, sad, angry, neutral, excited)
   - Supports both Korean and English

2. **Local Keyword-based Analysis**:
   - Implemented in `lib/local-emotion.ts`
   - Acts as a fallback mechanism when API calls fail
   - Provides basic emotion analysis through keyword matching

### 4.3 Multilingual Support System

Multilingual support is implemented using React Context API:

1. **Language Context**:
   - Language state management in `lib/language-provider.tsx`
   - Currently supports Korean (ko) and English (en)
   - Selected language is stored in local storage and persists after page refresh

2. **Translation System**:
   - Translation data and functions provided in `lib/translations.ts`
   - Key-based translation system for managing all UI text
   - Separate mapping for emotion name translations

3. **Language Switching UI**:
   - Toggle switch implemented in `components/language-toggle.tsx`
   - Provides an interface for users to easily switch languages

### 4.4 Theme System

A theme system supporting dark and light modes is implemented:

1. **Theme Context**:
   - Theme state management in `lib/theme-provider.tsx`
   - System setting detection and user preference storage
   - Theme settings maintained through local storage

2. **Theme Switching UI**:
   - Toggle button implemented in `components/theme-toggle.tsx`
   - Intuitive icons indicating current theme state

### 4.5 UI Component System

The UI is implemented based on the ShadCN UI component library and TailwindCSS:

1. **Layout Structure**:
   - Overall app layout defined in `app/layout.tsx`
   - Theme and language context providers setup

2. **Navigation**:
   - Top navigation bar implemented in `components/navbar.tsx`
   - Includes app title, theme toggle, and language toggle

3. **Diary-related Components**:
   - `components/DiaryCard.tsx`: Card component displayed in the diary list
   - `components/DiaryForm.tsx`: Form for writing and editing diaries
   - `components/DeleteDiaryButton.tsx`: Confirmation dialog for diary deletion

4. **Emotion Visualization**:
   - `components/EmotionIcon.tsx`: Displays icons according to emotions
   - Color and icon mapping for each emotion

## 5. API Structure

### 5.1 Next.js API Routes

```
/api/emotion-analysis
```
- **Method**: POST
- **Body**: { content: string, language: "ko" | "en" }
- **Response**: { emotion: Emotion }
- **Description**: Analyzes diary content and returns an emotion.

### 5.2 Next.js Server Actions

```typescript
// app/actions/diary.ts
export async function analyzeEmotion(content: string, language: "ko" | "en" = "en"): Promise<Emotion>
export async function saveDiaryWithEmotion(diary: {...}, language: "ko" | "en" = "en"): Promise<{ success: boolean; diary?: DiaryEntry; error?: string }>
```

- **analyzeEmotion**: Analyzes diary content and returns an emotion.
- **saveDiaryWithEmotion**: Saves a diary and performs emotion analysis.

## 6. Data Flow

1. **Diary Writing Flow**:
   - User enters title and content in the diary writing form
   - When the save button is clicked, the `saveDiaryWithEmotion` Server Action is called
   - The Server Action performs emotion analysis through the `analyzeEmotion` function
   - Diary data is saved to local storage along with the analyzed emotion
   - Redirect to homepage

2. **Diary Viewing Flow**:
   - All diaries are loaded through the `getAllDiaries` function on the homepage
   - Each diary is rendered as a `DiaryCard` component
   - Clicking on a card navigates to the detail page for that diary
   - A specific diary is loaded through the `getDiaryById` function on the detail page

3. **Language Switching Flow**:
   - User clicks the language toggle switch
   - The `setLanguage` function in `LanguageContext` is called
   - New language setting is saved to local storage
   - All translated text changes to the new language due to context update

## 7. Extensibility and Maintenance

### 7.1 How to Add a New Language

1. Add a new language code to the `Language` type in `lib/translations.ts`
2. Add translations for the new language to all translation keys
3. Add emotion translations for the new language to `emotionTranslations`
4. Update the language selection UI (currently a toggle, would need to change to a dropdown)

### 7.2 How to Add a New Emotion

1. Add a new emotion to the `Emotion` type in `lib/types.ts`
2. Add translations for the new emotion to `emotionTranslations` in `lib/translations.ts`
3. Add icon and color mapping for the new emotion in `components/EmotionIcon.tsx`
4. Add keywords for the new emotion to `EMOTION_KEYWORDS` in `lib/local-emotion.ts`
5. Update the API prompt to recognize the new emotion

## 8. Performance Optimization

1. **Component Optimization**:
   - Prevent unnecessary re-rendering through React.memo and useMemo/useCallback
   - Granular state management to update only necessary parts

2. **Data Loading Optimization**:
   - Minimize local storage access
   - Selective queries that load only necessary data

3. **API Call Optimization**:
   - Reduced API dependency through local emotion analysis fallback mechanism
   - API calls only when necessary

## 9. Security Considerations

1. **API Key Protection**:
   - API key management through environment variables
   - API key access only on the server side

2. **Data Protection**:
   - Local storage data stored only on the client side
   - No sensitive information stored

## 10. Future Improvement Directions

1. **Database Integration**:
   - Migration from local storage to an actual database
   - Permanent data storage using Prisma and PostgreSQL, etc.

2. **User Authentication**:
   - Addition of registration and login features
   - Separation of data by user

3. **Additional Features**:
   - Emotion statistics and analysis dashboard
   - Diary sharing and social features
   - Notification and reminder features

4. **Performance Improvements**:
   - Image and media optimization
   - Code splitting and lazy loading
   - Server-side rendering optimization 
