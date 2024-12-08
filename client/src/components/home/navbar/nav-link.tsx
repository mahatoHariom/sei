"use client";
import Link, { LinkProps } from "next/link";
import React from "react";

interface NavLinkProps extends LinkProps {
  label: string;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  className,
  ...props
}) => (
  <Link href={href} {...props} className={className}>
    {label}
  </Link>
);

export default NavLink;
