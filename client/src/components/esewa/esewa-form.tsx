/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/lib/axios-instance";
import { generateUniqueId } from "@/lib/generate-id";
import { Button } from "../ui/button";

interface PaymentFormInputs {
  amount: number;
}

const PaymentForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>();

  const onSubmit: SubmitHandler<PaymentFormInputs> = async ({ amount }) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("/auth/payments/initiate", {
        amount,
        productId: generateUniqueId(),
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error("Payment URL not found");
      }
    } catch (error: any) {
      console.error("Error initiating payment:", error);
      setErrorMessage("Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Amount</label>
        <input
          type="number"
          {...register("amount", { required: "Amount is required", min: 1 })}
        />
        {errors.amount && <span>{errors.amount.message}</span>}
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Pay with eSewa"}
      </Button>
    </form>
  );
};

export default PaymentForm;
