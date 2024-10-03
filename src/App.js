// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CourseSelectionPage from './pages/CourseSelectionPage';
import ProjectSelectionPage from './pages/ProjectSelectionPage';
import PreferenceViewingPage from './pages/PreferenceViewingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/course-selection" element={<CourseSelectionPage />} />
        <Route path="/project-selection" element={<ProjectSelectionPage />} />
        <Route path="/preference-viewing" element={<PreferenceViewingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
