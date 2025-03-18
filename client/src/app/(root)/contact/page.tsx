/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useCreateContact } from "@/hooks/contact/user-contact";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Messages } from "@/constants/messages";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Phone number must be 7-15 digits")
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate, isPending } = useCreateContact();
  const { id: userId, email } = useSelector((state: RootState) => state.user);
  const token = Cookies.get("accessToken");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: email ?? "",
      subject: "",
      message: "",
      phone: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!userId || !token) {
      toast.error(Messages.needToLogin.success);
      return;
    }

    // Format data for API call
    const contactData = {
      name: values.name,
      email: values.email,
      phone: values.phone || "",
      message: `${values.subject}: ${values.message}`,
      userId,
    };

    mutate(contactData, {
      onSuccess: () => {
        // Show success message
        setIsSubmitted(true);
        toast.success("Message sent successfully!");
        form.reset();
      },
      onError: (error) => {
        console.error("Form submission failed:", error);
        toast.error("Failed to send the message. Please try again.");
      },
    });
  };

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-muted-foreground text-lg">
            Have questions about our programs? Need more information? We're here
            to help you on your educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-xl shadow-lg border border-border p-8"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your message has been received. We'll get back to you as soon
                  as possible.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-2">
                  Send us a message
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll respond as soon as possible.
                </p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="How can we help you?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1234567890"
                                type="tel"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please describe your inquiry in detail..."
                              className="min-h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full md:w-auto flex items-center gap-2"
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Send Message"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Map/Image */}
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2070&auto=format&fit=crop"
                alt="SEI Institute Campus"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white font-semibold flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                SEI Institute Main Campus
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium">Our Location</h4>
                    <p className="text-muted-foreground">
                      123 Education Avenue, Academic District
                      <br />
                      Knowledge City, 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium">Phone Number</h4>
                    <p className="text-muted-foreground">
                      (123) 456-7890
                      <br />
                      (098) 765-4321
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium">Email Address</h4>
                    <p className="text-muted-foreground">
                      info@seiinstitute.edu
                      <br />
                      admissions@seiinstitute.edu
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium">Working Hours</h4>
                    <p className="text-muted-foreground">
                      Monday-Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ teaser */}
            <div className="bg-primary/5 rounded-xl p-6">
              <h3 className="text-lg font-medium mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-muted-foreground mb-4">
                Find quick answers to common questions.
              </p>
              <Button variant="outline" className="group">
                View FAQs
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
