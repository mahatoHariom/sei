// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// // import EsewaPaymentButton from "./EsewaPaymentButton"; // Assuming it's in the same directory

// interface PaymentFormInputs {
//   amount: number;
//   productId: string;
// }

// const PaymentForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<PaymentFormInputs>();

//   const onSubmit: SubmitHandler<PaymentFormInputs> = (data) => {
//     // Implement submission or state updates if needed
//     console.log("Payment data submitted:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Amount</label>
//         <input
//           type="number"
//           {...register("amount", { required: "Amount is required", min: 1 })}
//         />
//         {errors.amount && <span>{errors.amount.message}</span>}
//       </div>

//       <div>
//         <label>Product ID</label>
//         <input
//           type="text"
//           {...register("productId", { required: "Product ID is required" })}
//         />
//         {errors.productId && <span>{errors.productId.message}</span>}
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PaymentForm;
