import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface IconifyProps {
  name: string;
  className?: string;
}

const Iconify: React.FC<IconifyProps> = ({ name, className }) => (
  <Icon icon={name} className={cn("h-6 w-6", className)} />
);

export default Iconify;
