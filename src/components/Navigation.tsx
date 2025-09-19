import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  NavContainer,
  NavContent,
  LogoElement,
  NavLinks, 
  NavLink,
  MobileMenuButton,
  MobileMenu,
  MobileNavLinks,
  MobileNavLink,
} from "@/components/styled/Navigation.styled";
import { useMediaQuery } from "react-responsive";
import type { Theme } from "@/components/styled/App.styled";
import ThemeToggle from "./ThemeToggle";

interface NavigationProps {
  theme: Theme;
}

const Navigation: React.FC<NavigationProps> = ({ theme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 800 });

  const navItems = [
    { path: "/", label: "首页", icon: "🏠" },
    { path: "/charts", label: "图表", icon: "📊" },
    { path: "/analysis", label: "分析", icon: "📈" },
    { path: "/settings", label: "设置", icon: "⚙️" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <NavContainer theme={theme}>
      <NavContent>
        <LogoElement to="/" theme={theme}>
          TradingView
        </LogoElement>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              theme={theme}
              $isActive={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <MobileMenuButton theme={theme} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? "✕" : "☰"}
        </MobileMenuButton>

        {!isMobile && <ThemeToggle />}
      </NavContent>

      <MobileMenu theme={theme} $isOpen={isMobileMenuOpen}>
        <MobileNavLinks>
          {navItems.map((item) => (
            <MobileNavLink
              key={item.path}
              to={item.path}
              theme={theme}
              $isActive={location.pathname === item.path}
              onClick={closeMobileMenu}
            >
              {item.icon} {item.label}
            </MobileNavLink>
          ))}
        </MobileNavLinks>
      </MobileMenu>
    </NavContainer>
  );
};

export default Navigation;
