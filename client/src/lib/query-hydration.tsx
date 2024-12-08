// // import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import React from "react";
// import queryClient from "./query-client";
// // import { apiKeys } from "@/constants/apiKeys";
// // import { getProfile } from "@/services/users";
// export default async function Hydration({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // await Promise.all([
//   //   queryClient.prefetchQuery({
//   //     queryKey: [apiKeys.getProfile],
//   //     queryFn: getProfile,
//   //   }),
//   // ]);

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       {children}
//     </HydrationBoundary>
//   );
// }
