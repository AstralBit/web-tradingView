import styled from "styled-components";
import type { Theme } from "./App.styled";
import { Link } from "react-router-dom";

export const NavContainer = styled.nav<{ theme: Theme }>`
  background: ${props => props.theme.colors.surface};
  box-shadow: 0 2px 8px ${props => props.theme.colors.shadow};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`;

export const NavContent = styled.div`
  /* max-width: 1280px; */
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

export const LogoElement = styled(Link)<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)<{ theme: Theme; $isActive: boolean }>`
  text-decoration: none;
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.textSecondary};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.background};
  }

  ${props => props.$isActive && `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: ${props.theme.colors.primary};
      border-radius: 1px;
    }
  `}
`;

export const MobileMenuButton = styled.button<{ theme: Theme }>`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div<{ theme: Theme; $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 4px 8px ${props => props.theme.colors.shadow};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  gap: 0.5rem;
`;

export const MobileNavLink = styled(Link)<{ theme: Theme; $isActive: boolean }>`
  text-decoration: none;
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.textSecondary};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.background};
  }
`;