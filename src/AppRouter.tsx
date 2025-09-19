import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import HomePage from "@/pages/HomePage";
import ChartsPage from "@/pages/ChartsPage";
import AnalysisPage from "@/pages/AnalysisPage";
import SettingsPage from "@/pages/SettingsPage";
import { lightTheme, darkTheme } from "@/components/styled/App.styled";

const AppRouter: React.FC = () => {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <Router>
      <Navigation theme={currentTheme} />
      <Routes>
        <Route path="/" element={<HomePage theme={currentTheme} />} />
        <Route path="/charts" element={<ChartsPage theme={currentTheme} />} />
        <Route path="/analysis" element={<AnalysisPage theme={currentTheme} />} />
        <Route path="/settings" element={<SettingsPage theme={currentTheme} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
