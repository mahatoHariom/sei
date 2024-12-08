interface AuthMessages {
  success?: string;
  error?: string;
}

interface Messages {
  login: AuthMessages;
  register: AuthMessages;
  logout: AuthMessages;
  profileComplete: AuthMessages;
  Enrolled: AuthMessages;
}

export const Messages: Messages = {
  login: {
    success: "Login successful! Welcome back.",
    error: "Login failed. Please check your credentials and try again.",
  },
  register: {
    success:
      "Registration successful! Please check your email to verify your account.",
    error: "Registration failed. Please try again later or contact support.",
  },
  logout: {
    success: "Logout successful!",
  },
  profileComplete: {
    success: "Profile verified successfully!",
  },
  Enrolled: {
    success: "Enrolled for the course successfully",
    error: "Something went wrong. Please try again later",
  },
};
