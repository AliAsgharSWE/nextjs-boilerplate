"use client";

import { FC } from "react";
import Hero from "@/src/components/common/hero";
import ContactSection from "@/src/components/contact/ContactSection";
import { contactPageData } from "@/src/containers/contact/data";
import { ContactFormData } from "@/src/schemas/ContactUsFormSchema";

const Contact: FC = () => {
  const handleSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit form");
      }

      const result = await response.json();
      alert("Form submitted successfully!");
      console.log("Form submitted:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <Hero {...contactPageData.hero} />
      <ContactSection onSubmit={handleSubmit} />
    </div>
  );
};

export default Contact;

