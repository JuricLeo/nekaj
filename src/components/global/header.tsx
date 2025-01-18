"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const header = () => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Projects",
      href: "/projects",
    },
  ];

  return (
    <header className="sticky bg-background top-0 left-0 py-6 w-full flex justify-between items-center border-b">
      <div className="flex gap-12 items-center">
        <Image src="/logo-kuna.svg" alt="logo" width={60} height={60} />
        <div className="flex gap-12">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "uppercase font-thin",
                pathname === route.href && "font-bold",
              )}>
              {route.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
};

export default header;
