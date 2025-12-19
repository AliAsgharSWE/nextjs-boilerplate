export const env = {
  DOMAIN: process.env.DOMAIN || process.env.VERCEL_URL || "http://localhost:3000",
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
  SMTP_SECURE: process.env.SMTP_SECURE === "true",
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  APPLICATION_FROM_ADDRESS: process.env.APPLICATION_FROM_ADDRESS,
  APPLICATION_TO_ADDRESS: process.env.APPLICATION_TO_ADDRESS,
} as const;

