# MoodDiary 기술 명세서 (Technical Specification)

## 1. 프로젝트 개요

MoodDiary는 사용자가 일기를 작성하고 감정을 분석하는 웹 애플리케이션입니다. Next.js와 React를 기반으로 구축되었으며, 사용자 인터페이스는 ShadCN UI 컴포넌트와 TailwindCSS를 사용하여 구현되었습니다. 감정 분석은 Google Gemini API를 활용하며, 데이터는 로컬 스토리지에 저장됩니다.

## 2. 기술 스택

### 프론트엔드
- **Next.js 14**: App Router를 사용한 서버 컴포넌트 및 클라이언트 컴포넌트 구현
- **React 18**: 컴포넌트 기반 UI 구현
- **TypeScript**: 타입 안전성 확보
- **TailwindCSS**: 유틸리티 기반 CSS 스타일링
- **ShadCN UI**: 재사용 가능한 UI 컴포넌트 라이브러리
- **Lucide Icons**: 아이콘 라이브러리

### 백엔드 및 API
- **Next.js API Routes**: 서버리스 API 엔드포인트
- **Next.js Server Actions**: 서버 사이드 데이터 처리
- **Google Gemini API**: 텍스트 기반 감정 분석
- **Local Storage**: 클라이언트 사이드 데이터 저장

### 개발 도구
- **pnpm**: 패키지 관리자
- **ESLint**: 코드 품질 관리
- **TypeScript**: 정적 타입 검사

## 3. 프로젝트 구조

```
/
├── app/                    # Next.js App Router 디렉토리
│   ├── actions/            # Server Actions
│   ├── api/                # API Routes
│   ├── diary/              # 일기 관련 페이지
│   │   ├── [id]/           # 일기 상세 페이지
│   │   └── new/            # 새 일기 작성 페이지
│   ├── globals.css         # 전역 스타일
│   ├── layout.tsx          # 루트 레이아웃
│   ├── not-found.tsx       # 404 페이지
│   └── page.tsx            # 홈페이지
├── components/             # 재사용 가능한 컴포넌트
│   ├── ui/                 # ShadCN UI 컴포넌트
│   ├── DiaryCard.tsx       # 일기 카드 컴포넌트
│   ├── DiaryForm.tsx       # 일기 작성 폼 컴포넌트
│   ├── DeleteDiaryButton.tsx # 일기 삭제 버튼 컴포넌트
│   ├── EmotionIcon.tsx     # 감정 아이콘 컴포넌트
│   ├── language-toggle.tsx # 언어 전환 토글 컴포넌트
│   ├── navbar.tsx          # 네비게이션 바 컴포넌트
│   └── theme-toggle.tsx    # 테마 전환 토글 컴포넌트
├── lib/                    # 유틸리티 및 공통 기능
│   ├── diary.ts            # 일기 CRUD 기능
│   ├── gemini.ts           # Google Gemini API 연동
│   ├── language-provider.tsx # 다국어 지원 컨텍스트
│   ├── local-emotion.ts    # 로컬 감정 분석 기능
│   ├── theme-provider.tsx  # 테마 관리 컨텍스트
│   ├── translations.ts     # 다국어 번역 데이터
│   ├── types.ts            # 타입 정의
│   └── utils.ts            # 유틸리티 함수
└── docs/                   # 문서
```

## 4. 주요 기능 구현

### 4.1 일기 관리 시스템

#### 데이터 모델
```typescript
// lib/types.ts
export type Emotion = "happy" | "sad" | "angry" | "neutral" | "excited";

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO 문자열 형식
  emotion?: Emotion; // 감정 분석 결과
}
```

#### 데이터 저장 및 관리
일기 데이터는 브라우저의 로컬 스토리지에 저장됩니다. `lib/diary.ts` 파일에서 CRUD(Create, Read, Update, Delete) 작업을 처리합니다:

- **getAllDiaries()**: 모든 일기 조회
- **getDiaryById(id)**: ID로 특정 일기 조회
- **saveDiary(diary)**: 새 일기 저장
- **updateDiary(diary)**: 기존 일기 업데이트
- **deleteDiary(id)**: 일기 삭제

### 4.2 감정 분석 시스템

감정 분석은 두 가지 방식으로 구현되어 있습니다:

1. **Google Gemini API 기반 분석**:
   - `app/api/emotion-analysis/route.ts`에서 API 엔드포인트 구현
   - 일기 내용을 분석하여 5가지 감정 중 하나로 분류 (happy, sad, angry, neutral, excited)
   - 한국어와 영어 모두 지원

2. **로컬 키워드 기반 분석**:
   - `lib/local-emotion.ts`에서 구현
   - API 호출 실패 시 폴백(fallback) 메커니즘으로 작동
   - 키워드 매칭을 통한 기본적인 감정 분석 제공

### 4.3 다국어 지원 시스템

다국어 지원은 React Context API를 사용하여 구현되었습니다:

1. **언어 컨텍스트**:
   - `lib/language-provider.tsx`에서 언어 상태 관리
   - 현재 한국어(ko)와 영어(en) 지원
   - 선택된 언어는 로컬 스토리지에 저장되어 페이지 새로고침 후에도 유지

2. **번역 시스템**:
   - `lib/translations.ts`에서 번역 데이터 및 함수 제공
   - 키 기반 번역 시스템으로 모든 UI 텍스트 관리
   - 감정 이름 번역을 위한 별도의 매핑 제공

3. **언어 전환 UI**:
   - `components/language-toggle.tsx`에서 토글 스위치 구현
   - 사용자가 쉽게 언어를 전환할 수 있는 인터페이스 제공

### 4.4 테마 시스템

다크 모드와 라이트 모드를 지원하는 테마 시스템이 구현되어 있습니다:

1. **테마 컨텍스트**:
   - `lib/theme-provider.tsx`에서 테마 상태 관리
   - 시스템 설정 감지 및 사용자 선택 저장
   - 로컬 스토리지를 통한 테마 설정 유지

2. **테마 전환 UI**:
   - `components/theme-toggle.tsx`에서 토글 버튼 구현
   - 직관적인 아이콘으로 현재 테마 상태 표시

### 4.5 UI 컴포넌트 시스템

UI는 ShadCN UI 컴포넌트 라이브러리와 TailwindCSS를 기반으로 구현되었습니다:

1. **레이아웃 구조**:
   - `app/layout.tsx`에서 전체 앱 레이아웃 정의
   - 테마 및 언어 컨텍스트 프로바이더 설정

2. **네비게이션**:
   - `components/navbar.tsx`에서 상단 네비게이션 바 구현
   - 앱 제목, 테마 토글, 언어 토글 포함

3. **일기 관련 컴포넌트**:
   - `components/DiaryCard.tsx`: 일기 목록에 표시되는 카드 컴포넌트
   - `components/DiaryForm.tsx`: 일기 작성 및 수정 폼
   - `components/DeleteDiaryButton.tsx`: 일기 삭제 확인 대화상자

4. **감정 시각화**:
   - `components/EmotionIcon.tsx`: 감정에 따른 아이콘 표시
   - 감정별 색상 및 아이콘 매핑

## 5. API 구조

### 5.1 Next.js API Routes

```
/api/emotion-analysis
```
- **Method**: POST
- **Body**: { content: string, language: "ko" | "en" }
- **Response**: { emotion: Emotion }
- **Description**: 일기 내용을 분석하여 감정을 반환합니다.

### 5.2 Next.js Server Actions

```typescript
// app/actions/diary.ts
export async function analyzeEmotion(content: string, language: "ko" | "en" = "en"): Promise<Emotion>
export async function saveDiaryWithEmotion(diary: {...}, language: "ko" | "en" = "en"): Promise<{ success: boolean; diary?: DiaryEntry; error?: string }>
```

- **analyzeEmotion**: 일기 내용을 분석하여 감정을 반환합니다.
- **saveDiaryWithEmotion**: 일기를 저장하고 감정 분석을 수행합니다.

## 6. 데이터 흐름

1. **일기 작성 흐름**:
   - 사용자가 일기 작성 폼에 제목과 내용 입력
   - 저장 버튼 클릭 시 `saveDiaryWithEmotion` Server Action 호출
   - Server Action에서 `analyzeEmotion` 함수를 통해 감정 분석
   - 분석된 감정과 함께 일기 데이터를 로컬 스토리지에 저장
   - 홈페이지로 리디렉션

2. **일기 조회 흐름**:
   - 홈페이지에서 `getAllDiaries` 함수를 통해 모든 일기 로드
   - 각 일기는 `DiaryCard` 컴포넌트로 렌더링
   - 카드 클릭 시 해당 일기의 상세 페이지로 이동
   - 상세 페이지에서 `getDiaryById` 함수를 통해 특정 일기 로드

3. **언어 전환 흐름**:
   - 사용자가 언어 토글 스위치 클릭
   - `LanguageContext`의 `setLanguage` 함수 호출
   - 새 언어 설정이 로컬 스토리지에 저장
   - 컨텍스트 업데이트로 인해 모든 번역 텍스트가 새 언어로 변경

## 7. 확장성 및 유지보수

### 7.1 새로운 언어 추가 방법

1. `lib/translations.ts`의 `Language` 타입에 새 언어 코드 추가
2. 모든 번역 키에 새 언어의 번역 추가
3. `emotionTranslations`에 새 언어의 감정 번역 추가
4. 언어 선택 UI 업데이트 (현재는 토글이므로 드롭다운으로 변경 필요)

### 7.2 새로운 감정 추가 방법

1. `lib/types.ts`의 `Emotion` 타입에 새 감정 추가
2. `lib/translations.ts`의 `emotionTranslations`에 새 감정 번역 추가
3. `components/EmotionIcon.tsx`에 새 감정의 아이콘 및 색상 매핑 추가
4. `lib/local-emotion.ts`의 `EMOTION_KEYWORDS`에 새 감정 키워드 추가
5. API 프롬프트 업데이트하여 새 감정 인식하도록 수정

## 8. 성능 최적화

1. **컴포넌트 최적화**:
   - React.memo 및 useMemo/useCallback을 통한 불필요한 리렌더링 방지
   - 상태 관리의 세분화로 필요한 부분만 업데이트

2. **데이터 로딩 최적화**:
   - 로컬 스토리지 접근 최소화
   - 필요한 데이터만 로드하는 선택적 쿼리

3. **API 호출 최적화**:
   - 로컬 감정 분석 폴백 메커니즘으로 API 의존성 감소
   - 필요한 경우에만 API 호출

## 9. 보안 고려사항

1. **API 키 보호**:
   - 환경 변수를 통한 API 키 관리
   - 서버 사이드에서만 API 키 접근

2. **데이터 보호**:
   - 로컬 스토리지 데이터는 클라이언트 측에만 저장
   - 민감한 정보는 저장하지 않음

## 10. 향후 개선 방향

1. **데이터베이스 통합**:
   - 로컬 스토리지에서 실제 데이터베이스로 마이그레이션
   - Prisma와 PostgreSQL 등을 활용한 데이터 영구 저장

2. **사용자 인증**:
   - 회원가입 및 로그인 기능 추가
   - 사용자별 데이터 분리

3. **추가 기능**:
   - 감정 통계 및 분석 대시보드
   - 일기 공유 및 소셜 기능
   - 알림 및 리마인더 기능

4. **성능 개선**:
   - 이미지 및 미디어 최적화
   - 코드 스플리팅 및 지연 로딩
   - 서버 사이드 렌더링 최적화 
