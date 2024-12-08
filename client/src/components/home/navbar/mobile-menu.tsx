"use client";
import React from "react";
import NavLink from "./nav-link";

interface MobileMenuProps {
  links: { href: string; label: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ links }) => {
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
