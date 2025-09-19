import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f8f9fa'};
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#e1e1e1'};
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#333' : '#e9ecef'};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ToggleSwitch = styled.div<{ $isDark: boolean }>`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${props => props.$isDark ? '#4a9eff' : '#ccc'};
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.$isDark ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ToggleLabel = styled.span<{ $isDark: boolean }>`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.$isDark ? '#fff' : '#333'};
  transition: color 0.3s ease;
`;

const IconContainer = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 14px;
  color: ${props => props.$isDark ? '#ffd700' : '#ffa500'};
  transition: all 0.3s ease;
`;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ToggleContainer theme={theme} onClick={toggleTheme}>
      <IconContainer $isDark={isDark}>
        {isDark ? '🌙' : '☀️'}
      </IconContainer>
      <ToggleLabel $isDark={isDark}>
        {isDark ? '黑夜模式' : '白天模式'}
      </ToggleLabel>
      <ToggleSwitch $isDark={isDark} />
    </ToggleContainer>
  );
};

export default ThemeToggle;
