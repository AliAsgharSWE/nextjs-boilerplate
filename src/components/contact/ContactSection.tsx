"use client";

import { FC } from "react";
import ContactForm from "@/src/components/common/form/ContactForm";
import { ContactFormData } from "@/src/schemas/ContactUsFormSchema";

interface ContactSectionProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

const ContactSection: FC<ContactSectionProps> = ({ onSubmit }) => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <ContactForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
