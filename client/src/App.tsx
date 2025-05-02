// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "./pages/account/login";
import Dashboard from "./pages/dashboard";
import SignUpPage from "./pages/account/signup";
import TasksPage from "./pages/tasks";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
