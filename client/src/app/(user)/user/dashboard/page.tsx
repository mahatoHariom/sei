"use client";
import { useGetProfile } from "@/hooks/users/use-get-profile-hooks";
import React from "react";

const UserDashboard = () => {
  const { data } = useGetProfile();
  console.log(data, "SDfsfsdf");
  return <div>UserDashboard</div>;
};

export default UserDashboard;
