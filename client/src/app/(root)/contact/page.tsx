/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { contactSchema, ContactFormData } from "@/schema/contact-schema";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import { useCreateContact } from "@/hooks/contact/user-contact";
import { RootState } from "@/store/store";

const ContactPage = () => {
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(
    null
  );
  console.log(submittedData);
  const { mutate, isPending } = useCreateContact();
  const { id: userId, email } = useSelector((state: RootState) => state.user);

  const onSubmit = (data: ContactFormData, reset: () => void) => {
    if (!userId) {
      toast.error("User is not logged in");
      return;
    }

    mutate(
      { ...data, userId },
      {
        onSuccess: () => {
          setSubmittedData(data);
          toast.success("Message sent successfully!");
          reset(); // Reset the form after successful submission
        },
        onError: () => {
          toast.error("Failed to send the message. Please try again.");
        },
      }
    );
  };

  return (
    <div className="flex w-full h-screen items-center justify-center ">
      <div className="w-full max-w-5xl p-6 shadow-lg rounded-lg flex flex-col lg:flex-row gap-8 border">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-center lg:text-left mb-4">
            Contact Us
          </h2>
          <p className="text-center lg:text-left mb-6">
            We'd love to hear from you! Please fill out the form below.
          </p>
          <FormWrapper
            defaultValues={{
              name: "",
              email: email ?? "",
              phone: "",
              message: "",
            }}
            validationSchema={contactSchema}
            onSubmit={onSubmit}
          >
            {({ control, isValid }) => (
              <div className="flex flex-col gap-4 w-full">
                <FormFieldWrapper
                  name="name"
                  label="Your Name"
                  placeholder="Enter your name"
                  control={control}
                />
                <FormFieldWrapper
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  control={control}
                />
                <FormFieldWrapper
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  control={control}
                />
                <FormFieldWrapper
                  name="message"
                  label="Message"
                  placeholder="Write your message here..."
                  control={control}
                />
                <Button
                  type="submit"
                  disabled={!isValid || isPending}
                  className="mt-4"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            )}
          </FormWrapper>
        </div>
        <div className="flex-1 flex flex-col gap-6 p-4 border-l">
          <h3 className="text-xl font-semibold">Our Contact Information</h3>
          <p>Feel free to reach out to us using the information below:</p>
          <div>
            <p className="text-gray-800 font-medium">Email:</p>
            <p>contact@company.com</p>
          </div>
          <div>
            <p className="text-gray-800 font-medium">Phone:</p>
            <p>+123 456 7890</p>
          </div>
          <div>
            <p className="text-gray-800 font-medium">Address:</p>
            <p>Sallaghari, Bhaktapur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
