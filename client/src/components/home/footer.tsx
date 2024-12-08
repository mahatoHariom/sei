/* eslint-disable @next/next/no-img-element */
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-8 border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h1 className="font-bold text-lg">SEI INSTITUTE</h1>
            <p className="text-muted-foreground text-sm">
              SEI Institute is a leader in providing quality education and
              innovative solutions.
            </p>
          </div>

          <div>
            <h3 className="text-primary font-semibold mb-3">Quick Links</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <a href="#" className="hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Admissions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary text-muted-foreground">
                {/* Facebook Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.5 0h-21C.675 0 0 .675 0 1.5v21c0 .825.675 1.5 1.5 1.5h11.25V15.5h-3v-3.5h3V9.25c0-3.3 2.017-5.1 4.96-5.1 1.41 0 2.63.1 2.98.15v3.46H18.9c-1.52 0-1.92.9-1.92 1.87v2.35h3.79L20.25 15.5h-3v8.5h4.5c.825 0 1.5-.675 1.5-1.5v-21c0-.825-.675-1.5-1.5-1.5z" />
                </svg>
              </a>
              <a href="#" className="hover:text-primary text-muted-foreground">
                {/* Twitter Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.4 4.8c-.8.4-1.6.6-2.5.8 1-.6 1.6-1.5 2-2.7-.8.5-1.8.9-2.8 1.1-.8-.9-2-1.4-3.3-1.4-2.7 0-5 2.3-5 5 0 .4 0 .8.1 1.2-4.1-.2-7.6-2.1-10-5-.4.6-.6 1.4-.6 2.1 0 1.5.8 2.9 1.9 3.6-.7 0-1.4-.2-2-.5v.1c0 2.1 1.5 3.8 3.4 4.2-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 2 2.5 3.5 4.6 3.5-1.8 1.4-4 2.3-6.4 2.3-.4 0-.8 0-1.2-.1 2.3 1.5 5.1 2.5 8 2.5 9.5 0 14.8-7.8 14.8-14.5 0-.2 0-.4 0-.6 1-1 1.8-1.5 2.4-2.8z" />
                </svg>
              </a>
              <a href="#" className="hover:text-primary text-muted-foreground">
                {/* Instagram Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 2.9c-1.1 0-2 .9-2 2s.9 2 2 2c1.1 0 2-.9 2-2s-.9-2-2-2zm-3.5 0h-9c-1.7 0-3.5.8-3.5 2.5v11c0 1.7 1.8 2.5 3.5 2.5h9c1.7 0 3.5-.8 3.5-2.5v-11c0-1.7-1.8-2.5-3.5-2.5zM12 16.5c-1.7 0-3-1.4-3-3s1.3-3 3-3 3 1.4 3 3-1.3 3-3 3zm5-5.5h-3v3h3v-3z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-primary font-semibold mb-3">Contact Us</h3>
            <p className="text-muted-foreground text-sm">
              123 Education St., Learning City, Edu State 45678
            </p>
            <p className="text-muted-foreground text-sm">
              Email: contact@sei-institute.com
            </p>
            <p className="text-muted-foreground text-sm">
              Phone: +123-456-7890
            </p>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-4 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SEI Institute. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
