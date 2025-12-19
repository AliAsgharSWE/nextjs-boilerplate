# Next.js Boilerplate

A modern, production-ready Next.js 16 boilerplate with TypeScript, Tailwind CSS, form validation, email handling, and a well-organized project structure following best practices.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38bdf8)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.2.3-61dafb)](https://react.dev/)

## 🚀 Features

- **Next.js 16** with App Router architecture
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **React Hook Form** with **Zod** validation
- **Nodemailer** for email handling
- **Honeypot** spam protection
- **Husky** Git hooks (pre-commit & pre-push)
- **Prettier** for code formatting
- **ESLint** for code linting
- **Container-Component** pattern for clean architecture
- **Server & Client Components** optimization
- **SEO-friendly** with metadata support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **Yarn** (recommended) or npm/pnpm
- **Git**

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AliAsgharSWE/nextjs-boilerplate.git
   cd nextjs-boilerplate
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and fill in your configuration:

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
   ```

   > **Note:** For Gmail, you'll need to generate an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

4. **Initialize Husky** (Git hooks)

   ```bash
   yarn prepare
   ```

## 🏃 Running the Project

### Development Mode

Start the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will auto-reload when you make changes to the code.

### Production Build

Build the application for production:

```bash
yarn build
# or
npm run build
```

Start the production server:

```bash
yarn start
# or
npm start
```

## 📁 Project Structure

```
nextjs-boilerplate/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── contact/
│   │   └── page.tsx             # Contact page
│   ├── api/                     # API routes
│   │   └── contact/
│   │       └── route.ts        # Contact form API
│   └── globals.css              # Global styles
│
├── src/
│   ├── components/              # React components
│   │   ├── common/             # Shared components
│   │   │   ├── button/
│   │   │   ├── form/
│   │   │   ├── hero/
│   │   │   └── layouts/
│   │   ├── home/                # Home page components
│   │   ├── about/               # About page components
│   │   ├── contact/             # Contact page components
│   │   └── navigation/          # Header/Footer
│   │
│   ├── containers/              # Page-level containers
│   │   ├── home/
│   │   │   ├── index.tsx       # Home container
│   │   │   ├── data.ts         # Home page data
│   │   │   └── types.ts        # TypeScript types
│   │   ├── about/
│   │   └── contact/
│   │
│   ├── constants/               # Application constants
│   │   ├── routes.ts           # Route definitions
│   │   ├── env.ts              # Environment variables
│   │   └── colorValues.ts      # Color constants
│   │
│   ├── schemas/                # Zod validation schemas
│   │   ├── ContactUsFormSchema.ts
│   │   └── RequestQuoteFormSchema.ts
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useResponsive.ts
│   │   ├── useAccordion.ts
│   │   ├── useAutoSlide.ts
│   │   └── useScroll.ts
│   │
│   ├── scripts/                # Client-side scripts
│   │   ├── analytics-client.tsx
│   │   ├── LayoutScripts.tsx
│   │   └── LayoutScriptsWrapper.tsx
│   │
│   └── utils/                   # Utility functions
│       ├── helpers.ts
│       └── verifyRecaptcha.ts
│
├── public/                      # Static assets
│   ├── home/                   # Home page images
│   ├── about/                  # About page images
│   ├── icon/                   # Icons
│   ├── logo/                   # Logo files
│   └── guides/                 # PDF guides
│
├── .husky/                     # Git hooks
│   ├── pre-commit              # Format code before commit
│   └── pre-push                # Build before push
│
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎯 How to Build a New Page

Follow these steps to create a new page:

1. **Add route definition** in `src/constants/routes.ts`:

   ```typescript
   export const routes = {
     // ... existing routes
     NEW_PAGE: {
       title: "New Page",
       path: "/new-page",
       metaTitle: "New Page - Next.js Boilerplate",
       description: "Description of the new page",
     },
   } as const;
   ```

2. **Create route file** `app/new-page/page.tsx`:

   ```typescript
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

3. **Create container** in `src/containers/new-page/`:
   - `index.tsx` - Container component
   - `data.ts` - Page data
   - `types.ts` - TypeScript types

4. **Create components** in `src/components/new-page/` (if needed)

5. **Add to navigation** in `src/components/navigation/config.ts`

For detailed instructions, see [Nextjs-Boilerplate.md](./Nextjs-Boilerplate.md).

## 📜 Available Scripts

| Script         | Description                |
| -------------- | -------------------------- |
| `yarn dev`     | Start development server   |
| `yarn build`   | Build for production       |
| `yarn start`   | Start production server    |
| `yarn lint`    | Run ESLint                 |
| `yarn format`  | Format code with Prettier  |
| `yarn prepare` | Initialize Husky Git hooks |

## 🔧 Configuration

### Environment Variables

All environment variables are accessed through `src/constants/env.ts`. Required variables:

- `DOMAIN` - Your application domain
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `APPLICATION_FROM_ADDRESS` - Email sender address
- `APPLICATION_TO_ADDRESS` - Email recipient address

### Git Hooks

- **Pre-commit**: Automatically formats code with Prettier
- **Pre-push**: Runs build to ensure code compiles before pushing

## 📧 Contact Form

The contact form includes:

- **Zod validation** for form fields
- **Honeypot protection** against spam
- **Nodemailer integration** for sending emails
- **React Hook Form** for form management

The form sends emails to both the admin and the user (confirmation email).

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy on Other Platforms

1. Build the application: `yarn build`
2. Start the production server: `yarn start`
3. Set environment variables on your hosting platform

## 📚 Documentation

For detailed documentation about:

- Project architecture
- Data flow
- Component patterns
- API routes
- And more...

See [Nextjs-Boilerplate.md](./Nextjs-Boilerplate.md)

## 🛡️ Code Quality

This project includes:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for Git hooks
- **Strict TypeScript** configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

## ⭐ Support

If you find this boilerplate helpful, please consider giving it a star on GitHub!

---

**Built with ❤️ using Next.js 16**
