"use client";
import { useGetProfile } from "@/hooks/users/use-get-profile-hooks";
import { setUserDetail } from "@/store/slices/user-detail-slice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state:RootState) => state.user.id);
  const { data } = useGetProfile(userId);
  if (data) {
    dispatch(setUserDetail(data));
  }

  return <div>UserDashboard</div>;
};

export default UserDashboard;
