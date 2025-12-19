# Next.js Boilerplate - Project Flow & Structure Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Data Flow Architecture](#data-flow-architecture)
5. [Page Building Flow](#page-building-flow)
6. [Component System](#component-system)
7. [Container Pattern](#container-pattern)
8. [Constants & Configuration](#constants--configuration)
9. [Schemas & Validation](#schemas--validation)
10. [Hooks System](#hooks-system)
11. [Scripts & Utilities](#scripts--utilities)
12. [API Routes](#api-routes)
13. [How to Build a New Page](#how-to-build-a-new-page)

---

## Project Overview

This is a **Next.js 16** application using the **App Router** architecture. The project follows a container-component pattern with clear separation of concerns for data, presentation, and business logic.

**Key Features:**

- Server-side rendering (SSR) with Next.js App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Form validation with Zod schemas
- Email handling via Nodemailer
- Honeypot spam protection

---

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Email:** Nodemailer
- **Package Manager:** Yarn (or npm/pnpm)

---

## Folder Structure

```
NextJS-Boilerplate/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout (wraps all pages)
│   ├── page.tsx                 # Home page route
│   ├── about/
│   │   └── page.tsx            # About page route
│   ├── contact/
│   │   └── page.tsx            # Contact page route
│   ├── api/                     # API routes
│   │   ├── contact/
│   │   │   └── route.ts        # Contact form API endpoint (uses Nodemailer)
│   ├── globals.scss            # Global styles
│   └── shared-script.tsx       # Shared analytics scripts
│
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── common/            # Shared/common components
│   │   │   ├── layouts/       # Layout components
│   │   │   ├── button/        # Button components
│   │   │   ├── form/          # Form components
│   │   │   └── hero/          # Hero section components
│   │   ├── home/              # Home page specific components
│   │   ├── about/             # About page specific components
│   │   ├── contact/           # Contact page specific components
│   │   └── navigation/       # Header/Footer components
│   │
│   ├── containers/             # Page-level containers (data + logic)
│   │   ├── home/
│   │   │   ├── index.tsx      # Home container component
│   │   │   ├── data.ts        # Home page data
│   │   │   └── types.ts       # TypeScript types
│   │   ├── about/
│   │   │   ├── index.tsx      # About container component
│   │   │   ├── data.ts        # About page data
│   │   │   └── types.ts       # TypeScript types
│   │   └── [other-pages]/     # Other page containers
│   │
│   ├── constants/             # Application constants
│   │   ├── routes.ts          # Route definitions & metadata
│   │   ├── env.ts             # Environment variables
│   │   └── colorValues.ts     # Color constants
│   │
│   ├── schemas/               # Zod validation schemas
│   │   ├── ContactUsFormSchema.ts
│   │   └── RequestQuoteFormSchema.ts
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useResponsive.ts  # Responsive breakpoint hooks
│   │   ├── useAccordion.ts   # Accordion state management
│   │   ├── useAutoSlide.ts   # Carousel auto-slide logic
│   │   └── useScroll.ts      # Scroll event handling
│   │
│   ├── scripts/               # Client-side scripts
│   │   ├── analytics-client.tsx
│   │   ├── LayoutScripts.tsx
│   │   └── LayoutScriptsWrapper.tsx
│   │
│   └── utils/                 # Utility functions
│       ├── helpers.ts        # Helper functions
│       └── verifyRecaptcha.ts # reCAPTCHA verification
│
├── public/                    # Static assets
│   ├── home/                 # Home page images
│   ├── about/                # About page images
│   ├── icon/                 # Icons
│   ├── logo/                 # Logo files
│   └── guides/               # PDF guides
│
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies & scripts
```

---
.env file:
DOMAIN=http://localhost:3000
APPLICATION_FROM_ADDRESS=noreply@example.com
APPLICATION_TO_ADDRESS=contact@example.com

# Nodemailer SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
APPLICATION_FROM_ADDRESS=noreply@example.com
APPLICATION_TO_ADDRESS=contact@example.com

---
---

## Data Flow Architecture

### 1. **Page Request Flow**

```
User Request → app/[page]/page.tsx → src/containers/[page]/index.tsx → Components
```

**Example: Home Page**

1. User visits `/` → `app/page.tsx`
2. `app/page.tsx` exports default from `src/containers/home/index.tsx`
3. Container imports data from `src/containers/home/data.ts`
4. Container renders components from `src/components/home/`
5. Components receive data as props

### 2. **Data Sources**

**Static Data (TypeScript files):**

- Located in `src/containers/[page]/data.ts`
- Contains hardcoded content, images, configurations
- Imported directly into containers

**Dynamic Data:**

- Environment variables in `src/constants/env.ts`
- API routes for form submissions
- External API integrations (optional)

**Environment Variables:**

- Stored in `.env.local` (not in repo)
- Accessed via `src/constants/env.ts`
- Used for API keys, domain, email addresses

### 3. **Form Submission Flow**

```
User fills form → Zod validation → API route (/api/contact) →
Honeypot check → Nodemailer → Email sent
```

**Steps:**

1. Form component uses React Hook Form
2. Schema validation via Zod (`src/schemas/`)
3. POST request to `app/api/contact/route.ts`
4. Honeypot field validation (spam protection)
5. Email sent via Nodemailer
6. Response returned to client

---

## Page Building Flow

### How a Page is Built

**Step 1: Create Route File**

```typescript
// app/about/page.tsx
import { Metadata } from "next";
import { routes } from "@/src/constants/routes";

export const metadata: Metadata = {
  title: routes.ABOUT.metaTitle,
  description: routes.ABOUT.description,
  // ... other metadata
};

export { default } from "@/src/containers/about";
```

**Step 2: Create Container**

```typescript
// src/containers/about/index.tsx
import Hero from '@/src/components/common/hero';
import BriefingSection from '@/src/components/about/BriefingSection';
import { aboutPageData } from '@/src/containers/about/data';

const About = () => {
  return (
    <div className='flex flex-col'>
      <Hero {...aboutPageData.hero} />
      <BriefingSection briefing={aboutPageData.briefing} />
      {/* More sections */}
    </div>
  );
};
export default About;
```

**Step 3: Create Data File**

```typescript
// src/containers/about/data.ts
import { AboutPageDataType } from "./types";

export const aboutPageData: AboutPageDataType = {
  hero: {
    title: "About example",
    // ... other data
  },
  briefing: {
    // ... briefing data
  },
};
```

**Step 4: Create Type Definitions**

```typescript
// src/containers/about/types.ts
export interface AboutPageDataType {
  hero: HeroType;
  briefing: BriefingType;
  // ... other types
}
```

**Step 5: Create Components**

```typescript
// src/components/about/BriefingSection.tsx
interface Props {
  briefing: BriefingType;
}

const BriefingSection: FC<Props> = ({ briefing }) => {
  return (
    <section>
      {/* Component JSX */}
    </section>
  );
};
```

---

## Component System

### Component Organization

**1. Common Components** (`src/components/common/`)

- Reusable across multiple pages
- Examples: `Button`, `Hero`, `Form`, `Layout`

**2. Page-Specific Components** (`src/components/[page]/`)

- Used only on specific pages
- Examples: `src/components/home/`, `src/components/about/`

**3. Component Structure**

```
components/
├── [feature]/
│   ├── index.tsx           # Main component
│   ├── [SubComponent].tsx  # Sub-components
│   └── types.ts            # Component types (if needed)
```

### Component Patterns

**Client Components** (use `'use client'` directive):

- Interactive components (forms, buttons, carousels)
- Components using hooks or browser APIs

**Server Components** (default):

- Static content components
- Components that fetch data server-side

**Example:**

```typescript
"use client"; // Client component

import { FC } from "react";
import { useResponsive } from "@/src/hooks/useResponsive";

const InteractiveComponent: FC<Props> = ({ data }) => {
  const { isMobile } = useResponsive();
  // Component logic
};
```

---

## Container Pattern

### Purpose

Containers are **page-level components** that:

- Import and organize page data
- Compose multiple components together
- Handle page-specific logic
- Keep page routes clean

### Container Structure

```
containers/
└── [page-name]/
    ├── index.tsx      # Main container (exports default)
    ├── data.ts        # Page data (static content)
    └── types.ts       # TypeScript interfaces
```

### Container Example

```typescript
// src/containers/home/index.tsx
import HeroSection from '@/src/components/home/HeroSection';
import { homePageData } from '@/src/containers/home/data';

const Home = () => {
  const { clients } = homePageData;

  return (
    <div className='flex flex-col'>
      <HeroSection clients={clients} />
      {/* More sections */}
    </div>
  );
};
export default Home;
```

### Data Flow in Containers

```
Container → Imports data.ts → Passes data as props → Components render
```

**Benefits:**

- Separation of data and presentation
- Easy to test and maintain
- Reusable components
- Type-safe data flow

---

## Constants & Configuration

### Routes (`src/constants/routes.ts`)

**Purpose:** Centralized route definitions with metadata

```typescript
export const routes = {
  HOME: {
    title: "Home",
    path: "/",
    metaTitle: "Home - Next.js Boilerplate",
    description: "...",
  },
  ABOUT: {
    title: "About",
    path: "/about",
    metaTitle: "About Us - Next.js Boilerplate",
    description: "...",
  },
  // ... more routes
} as const;
```

**Usage:**

- Page metadata in `app/[page]/page.tsx`
- Navigation links in Header/Footer
- Type-safe route references

### Environment Variables (`src/constants/env.ts`)

```typescript
export const env = {
  DOMAIN: process.env.DOMAIN || process.env.VERCEL_URL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  APPLICATION_FROM_ADDRESS: process.env.APPLICATION_FROM_ADDRESS,
  APPLICATION_TO_ADDRESS: process.env.APPLICATION_TO_ADDRESS,
  // ... more env vars
} as const;
```

**Usage:**

- API routes
- CMS connections
- Email configuration

---

## Schemas & Validation

### Location: `src/schemas/`

**Purpose:** Form validation using Zod with honeypot spam protection

### Schema Example

```typescript
// src/schemas/ContactUsFormSchema.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email format"),
  companyName: z.string().min(1, "Company Name is required"),
  serviceType: z
    .array(z.string())
    .min(1, "At least one Service Type is required"),
  message: z.string().min(1, "Message is required"),
  middleName: z.string().max(0).optional(), // Honeypot field (hidden from users, spam protection)
});
```

**Note:** The `middleName` field is a honeypot field - it should be hidden from users using CSS. If this field is filled, it indicates a bot submission and should be rejected on the server side.

### Usage in Forms

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/src/schemas/ContactUsFormSchema";

const form = useForm({
  resolver: zodResolver(contactFormSchema),
});
```

---

## Hooks System

### Location: `src/hooks/`

**Purpose:** Reusable React hooks for common functionality

### Available Hooks

**1. `useResponsive`** - Breakpoint detection

```typescript
const { isMobile, isTablet, isDesktop } = useResponsive();
```

**2. `useAccordion`** - Accordion state management

```typescript
const { isOpen, toggle } = useAccordion();
```

**3. `useAutoSlide`** - Carousel auto-slide

```typescript
const { currentIndex, next, prev } = useAutoSlide(items.length);
```

**4. `useScroll`** - Scroll event handling

```typescript
const { scrollY, scrollDirection } = useScroll();
```

### Creating a New Hook

```typescript
// src/hooks/useCustomHook.ts
import { useState, useEffect } from "react";

export const useCustomHook = () => {
  const [state, setState] = useState();

  useEffect(() => {
    // Hook logic
  }, []);

  return { state };
};
```

---

## Scripts & Utilities

### Scripts (`src/scripts/`)

**Purpose:** Client-side scripts for analytics, tracking, etc.

**Files:**

- `analytics-client.tsx` - Vercel Analytics
- `LayoutScripts.tsx` - Layout-specific scripts
- `LayoutScriptsWrapper.tsx` - Wrapper for Suspense

**Usage in Layout:**

```typescript
// app/layout.tsx
import LayoutScriptsWrapper from '@/src/scripts/LayoutScriptsWrapper';

<Suspense fallback={<></>}>
  <LayoutScriptsWrapper />
</Suspense>
```

### Utilities (`src/utils/`)

**Purpose:** Helper functions used across the application

**Files:**

- `helpers.ts` - General utility functions

---

## API Routes

### Location: `app/api/`

**Purpose:** Server-side API endpoints

### API Route Structure

```
app/api/
└── [endpoint]/
    └── route.ts    # Next.js 13+ App Router API route
```

### Example: Contact Form API

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const userData = await req.json();

  // Check honeypot field (spam protection)
  if (userData.middleName) {
    return NextResponse.json({ error: "Spam detected" }, { status: 400 });
  }

  // Process form data
  // Send emails via Nodemailer
  // Return response
}
```

### API Flow

```
Client Form → POST /api/contact → Validate → Honeypot check →
Send Email via Nodemailer → Return Response
```

---

## How to Build a New Page

### Step-by-Step Guide

**1. Add Route Definition**

```typescript
// src/constants/routes.ts
export const routes = {
  // ... existing routes
  NEW_PAGE: {
    title: "New Page",
    path: "/new-page",
    metaTitle: "New Page Title",
    description: "New page description",
  },
} as const;
```

**2. Create Route File**

```typescript
// app/new-page/page.tsx
import { Metadata } from "next";
import { routes } from "@/src/constants/routes";

export const metadata: Metadata = {
  title: routes.NEW_PAGE.metaTitle,
  description: routes.NEW_PAGE.description,
  alternates: {
    canonical: routes.NEW_PAGE.path,
  },
};

export { default } from "@/src/containers/new-page";
```

**3. Create Container Directory**

```
src/containers/new-page/
├── index.tsx
├── data.ts
└── types.ts
```

**4. Create Types**

```typescript
// src/containers/new-page/types.ts
export interface NewPageDataType {
  hero: {
    title: string;
    description: string;
  };
  // ... more types
}
```

**5. Create Data File**

```typescript
// src/containers/new-page/data.ts
import { NewPageDataType } from "./types";

export const newPageData: NewPageDataType = {
  hero: {
    title: "New Page Title",
    description: "New page description",
  },
  // ... more data
};
```

**6. Create Container Component**

```typescript
// src/containers/new-page/index.tsx
import Hero from '@/src/components/common/hero';
import { newPageData } from './data';

const NewPage = () => {
  return (
    <div className='flex flex-col'>
      <Hero {...newPageData.hero} />
      {/* More sections */}
    </div>
  );
};
export default NewPage;
```

**7. Create Page-Specific Components** (if needed)

```
src/components/new-page/
├── SectionOne.tsx
└── SectionTwo.tsx
```

**8. Use in Navigation** (if needed)

```typescript
// src/components/navigation/config.ts
import { routes } from "@/src/constants/routes";

export const navItems = [
  // ... existing items
  { label: "New Page", path: routes.NEW_PAGE.path },
];
```

---

## Data Flow Summary

### Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER REQUEST                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              app/[page]/page.tsx                            │
│  - Defines metadata (SEO)                                   │
│  - Exports container as default                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         src/containers/[page]/index.tsx                    │
│  - Imports data from data.ts                                │
│  - Composes components                                      │
│  - Passes data as props                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                              │
        ▼                              ▼
┌──────────────────┐        ┌──────────────────┐
│  data.ts         │        │  Components      │
│  - Static data    │        │  - UI rendering  │
│  - Images         │        │  - Props receive  │
│  - Configurations │        │  - User interact │
└──────────────────┘        └──────────────────┘
        │                              │
        └──────────────┬──────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    RENDERED PAGE                            │
└─────────────────────────────────────────────────────────────┘
```

### Form Submission Flow

```
┌─────────────────────────────────────────────────────────────┐
│              FORM COMPONENT                                │
│  - React Hook Form                                         │
│  - Zod validation                                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         POST /api/contact                                   │
│  - Receives form data                                       │
│  - Validates data                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         Honeypot Check                                      │
│  - Validates honeypot field                                 │
│  - Rejects if honeypot is filled                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         Nodemailer                                          │
│  - Sends admin email                                        │
│  - Sends user confirmation email                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         Response to Client                                  │
│  - Success/Error message                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Patterns & Best Practices

### 1. **Separation of Concerns**

- **Containers** = Data + Logic
- **Components** = Presentation
- **Schemas** = Validation
- **Constants** = Configuration

### 2. **Type Safety**

- All data structures have TypeScript types
- Types defined in `types.ts` files
- Props are typed in components

### 3. **Reusability**

- Common components in `src/components/common/`
- Custom hooks for shared logic
- Utility functions in `src/utils/`

### 4. **Performance**

- Server Components by default
- Client Components only when needed (`'use client'`)
- Dynamic imports for heavy components
- Image optimization with Next.js Image component

### 5. **SEO**

- Metadata in each `page.tsx`
- Canonical URLs
- Open Graph tags
- Structured data (if needed)

---

## Environment Setup

### Required Environment Variables

```env
# Domain
DOMAIN=http://localhost:3000

# Email (Nodemailer SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
APPLICATION_FROM_ADDRESS=noreply@example.com
APPLICATION_TO_ADDRESS=contact@example.com

# Contentful CMS (optional)
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_ACCESS_TOKEN=your_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_PREVIEW_SECRET=your_preview_secret
```

---

## Build & Deployment

### Development

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn format       # Format code with Prettier
```

### Production Build

- Next.js optimizes automatically
- Static assets in `public/`
- API routes in `app/api/`
- Server Components rendered on server
- Client Components bundled for browser

---

## Conclusion

This project follows a **container-component pattern** with clear separation of:

- **Data** (containers/data.ts)
- **Logic** (containers/index.tsx)
- **Presentation** (components/)
- **Validation** (schemas/)
- **Configuration** (constants/)

Each page follows the same structure, making it easy to:

- Add new pages
- Maintain existing pages
- Test components
- Scale the application

---

## Quick Reference

| Item          | Location                          | Purpose                  |
| ------------- | --------------------------------- | ------------------------ |
| Page Route    | `app/[page]/page.tsx`             | Next.js route + metadata |
| Container     | `src/containers/[page]/index.tsx` | Page composition         |
| Page Data     | `src/containers/[page]/data.ts`   | Static content           |
| Types         | `src/containers/[page]/types.ts`  | TypeScript interfaces    |
| Components    | `src/components/[feature]/`       | UI components            |
| Routes Config | `src/constants/routes.ts`         | Route definitions        |
| Env Vars      | `src/constants/env.ts`            | Environment variables    |
| Schemas       | `src/schemas/`                    | Form validation          |
| Hooks         | `src/hooks/`                      | Custom React hooks       |
| API Routes    | `app/api/[endpoint]/route.ts`     | Server endpoints         |
| Utilities     | `src/utils/`                      | Helper functions         |

---

Also install and use husky.

"prepare": "husky && husky install"

```
└── 📁.husky
    └── 📁_
        ├── .gitignore
        ├── husky.sh
    ├── pre-commit
    └── pre-push
```

pre-commit:
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running pre-commit: formatting code..."
yarn format
echo "✅ Pre-commit finished."


pre-push:

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running pre-push: building app..."
if ! yarn build; then
  echo "❌ Build failed. Fix errors before pushing."
  exit 1
fi
echo "✅ Build succeeded. Push can proceed."





**Last Updated:** 2025
**Project:** Next.js Boilerplate
**Framework:** Next.js 16 (App Router)
