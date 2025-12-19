"use client";

import { FC } from "react";
import Link from "next/link";
import { routes } from "@/src/constants/routes";
import { navItems } from "./config";

const Header: FC = () => {

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={routes.HOME.path} className="text-2xl font-bold">
            Logo
          </Link>
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

