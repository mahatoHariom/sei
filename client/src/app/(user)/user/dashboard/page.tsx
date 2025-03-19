"use client";
import { useGetProfile } from "@/hooks/users/use-get-profile-hooks";
import { setUserDetail } from "@/store/slices/user-detail-slice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const { fullName } = useSelector((state: RootState) => state.user);
  const { data, isLoading } = useGetProfile(userId);

  React.useEffect(() => {
    if (data) {
      dispatch(setUserDetail(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {fullName}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your courses and progress
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
