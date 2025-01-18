"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { useEffect } from "react";
import useLanguageStore from "@/store/useLangStore";
import { useState } from "react";

const languageOptions = [
  { label: "🇭🇷", value: "hr" },
  { label: "🇺🇸", value: "en" },
];

const header = () => {
  const pathname = usePathname();
  const t = useLanguageStore((state) => state.t);

  const routes = [
    {
      label: t("header.Hero"),
      href: "/",
    },
    {
      label: t("header.About"),
      href: "/about",
    },
    {
      label: t("header.Projects"),
      href: "/projects",
    },
  ];

  const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage);
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const storedLanguage = localStorage.getItem("selectedLanguage");
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      }
      setInitialized(true);
    }
  }, [initialized, setSelectedLanguage]);

  const handleLanguageChange = (value: string) => {
    localStorage.setItem("selectedLanguage", value);
    window.location.reload();
    setSelectedLanguage(value);
  };

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
      <div className="ml-auto flex items-center gap-4">
        <ModeToggle />
        <Separator orientation="vertical" className="h-6" />
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-20 h-12" isLang>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <span className="text-xl">{option.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default header;
