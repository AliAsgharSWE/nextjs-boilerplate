import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { env } from "@/src/constants/env";
import { contactFormSchema } from "@/src/schemas/ContactUsFormSchema";

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();

    // Check honeypot field (spam protection)
    if (userData.middleName && userData.middleName.length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Validate form data
    const validationResult = contactFormSchema.safeParse(userData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Configure Nodemailer transporter
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
      return NextResponse.json(
        { error: "Email configuration is missing" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT || 587,
      secure: env.SMTP_SECURE || false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    // Prepare email content
    const emailContent = `
      New Contact Form Submission:
      
      First Name: ${formData.firstName}
      Last Name: ${formData.lastName}
      Email: ${formData.email}
      Company Name: ${formData.companyName}
      Service Type: ${formData.serviceType.join(", ")}
      Message: ${formData.message}
    `;

    // Send email to admin
    if (env.APPLICATION_TO_ADDRESS) {
      await transporter.sendMail({
        from: env.APPLICATION_FROM_ADDRESS || env.SMTP_USER,
        to: env.APPLICATION_TO_ADDRESS,
        subject: "New Contact Form Submission",
        text: emailContent,
      });
    }

    // Send confirmation email to user
    if (formData.email) {
      await transporter.sendMail({
        from: env.APPLICATION_FROM_ADDRESS || env.SMTP_USER,
        to: formData.email,
        subject: "Thank you for contacting us",
        text: "We have received your message and will get back to you soon.",
      });
    }

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
