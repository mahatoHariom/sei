// "use client";
// import { Input } from "@/components/ui/input";
// import { EditProfileData, editProfileSchema } from "@/schema/profile";
// import { FormWrapper } from "./global/form-wrapper";
// import { useDispatch } from "react-redux";
// import { closeModal } from "@/store/slices/modalSlice";
// import { ModalFooter } from "./global/modal/modal-footer";
// // import { ModalFooter } from "./modal-footer"; // Import ModalFooter

// export const EditForm = () => {
//   const dispatch = useDispatch();

//   const onSubmit = (data: EditProfileData) => {
//     console.log("Form data:", data);

//     dispatch(closeModal());
//   };

//   return (
//     <FormWrapper
//       defaultValues={{ name: "", username: "" }}
//       validationSchema={editProfileSchema}
//       onSubmit={onSubmit}
//     >
//       {(methods, handleSubmit) => (
//         <>
//           <div className="flex flex-col gap-3">
//             <Input id="name" placeholder="Name" {...methods.register("name")} />
//             <Input
//               id="username"
//               placeholder="Username"
//               {...methods.register("username")}
//             />
//           </div>

//           {/* Pass handleSubmit directly to ModalFooter */}
//           <ModalFooter
//             closeHandler={() => dispatch(closeModal())}
//             onSubmit={handleSubmit}
//           />
//         </>
//       )}
//     </FormWrapper>
//   );
// };
