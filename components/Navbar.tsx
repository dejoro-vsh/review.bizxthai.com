"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Flame, Trophy, Laptop, Home as HomeIcon, Heart, Dumbbell } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const categories = [
    { name: "ไอที & แกดเจ็ต", href: "/category/it-gadgets", icon: <Laptop className="w-4 h-4 mr-2" /> },
    { name: "เครื่องใช้ในบ้าน", href: "/category/home-appliances", icon: <HomeIcon className="w-4 h-4 mr-2" /> },
    { name: "สุขภาพ & ความงาม", href: "/category/health-beauty", icon: <Heart className="w-4 h-4 mr-2" /> },
    { name: "กีฬา & ไลฟ์สไตล์", href: "/category/sports-lifestyle", icon: <Dumbbell className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-md mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight text-primary">
              biz<span className="text-emerald-500">x</span>thai <span className="text-foreground">reviews</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
              หน้าแรก
            </Link>
            
            <div className="group relative cursor-pointer">
              <span className="flex items-center hover:text-primary transition-colors">
                หมวดหมู่
              </span>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md bg-card border border-border shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 flex flex-col gap-1">
                {categories.map((cat) => (
                  <Link key={cat.name} href={cat.href} className="flex items-center px-3 py-2 text-sm rounded-sm hover:bg-muted hover:text-primary transition-colors">
                    {cat.icon}
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/hot-deals" className="hover:text-primary transition-colors flex items-center">
               ดีลเด็ด
            </Link>
            <Link href="/top-10" className="hover:text-primary transition-colors flex items-center">
               จัดอันดับ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border flex flex-col space-y-4">
            <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary px-2" onClick={toggleMenu}>
              <Home className="w-4 h-4 mr-3" /> หน้าแรก
            </Link>
            <div className="px-2">
              <span className="text-sm font-medium text-foreground mb-2 block">หมวดหมู่</span>
              <div className="flex flex-col space-y-2 pl-4 border-l border-border ml-2">
                {categories.map((cat) => (
                  <Link key={cat.name} href={cat.href} className="flex items-center text-sm text-muted-foreground hover:text-primary" onClick={toggleMenu}>
                    {cat.icon}
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/hot-deals" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary px-2" onClick={toggleMenu}>
              <Flame className="w-4 h-4 mr-3" /> ดีลเด็ด
            </Link>
            <Link href="/top-10" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary px-2" onClick={toggleMenu}>
              <Trophy className="w-4 h-4 mr-3" /> จัดอันดับ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
