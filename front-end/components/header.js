import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  Package,
  ShoppingCart,
  X,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const NavLinks = [
    { href: "/users", icon: Users, label: "Users" },
    { href: "/products", icon: Package, label: "Products" },
    { href: "/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/reviews", icon: ShoppingCart, label: "Reviews" },
  ];

  return (
    <header className=" bg-white w-screen h-screen flex   transition-colors duration-300">
      <nav className=" ">
        {/* Logo Section */}
        <div className="flex justify-center items-center w-screen h-screen gap-16">
       
       
        <div className="flex items-center space-x-2">
          <a
            href="/"
            className="flex items-center text-xl bg-white text-gray-400 font-bold drop-shadow-lm transition border-2 w-24 h-12 rounded-lg justify-center"
          >
            Home
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="/users"
            className="flex items-center text-xl bg-white text-gray-400 font-bold drop-shadow-lm transition border-2 w-24 h-12 rounded-lg justify-center"
          >
            Users
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href="/products"
            className="flex items-center text-xl bg-white text-gray-400 font-bold drop-shadow-lm transition border-2 w-32 h-12 rounded-lg justify-center"
          >
            Products
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href="/orders"
            className="flex items-center text-xl bg-white text-gray-400 font-bold drop-shadow-lm transition border-2 w-24 h-12 rounded-lg justify-center"
          >
            Orders
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href="/reviews"
            className="flex items-center text-xl bg-white text-gray-400 font-bold drop-shadow-lm transition border-2 w-32 h-12 rounded-lg justify-center"
          >
            Reviews
          </a>
        </div>
        </div>


      </nav>

      
    </header>
  );
};

export default Navbar;
