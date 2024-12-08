"use client";
import { useGetProfile } from "@/hooks/users/use-get-profile-hooks";
import { setUserDetail } from "@/store/slices/user-detail-slice";
import React from "react";
import { useDispatch } from "react-redux";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { data } = useGetProfile();
  if (data) {
    dispatch(setUserDetail(data));
  }

  return <div>UserDashboard</div>;
};

export default UserDashboard;
