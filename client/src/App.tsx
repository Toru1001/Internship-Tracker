import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "./pages/account/login";
import SignUpPage from "./pages/account/signup";
import TasksPage from "./pages/interns/tasks";
import { useState, useEffect } from "react";
import FeedbacksPage from "./pages/interns/feedbacks_page";
import LogsPage from "./pages/supervisor/logs_page";
import AssignPage from "./pages/admin/assign_page";
import InternsPage from "./pages/supervisor/interns_page";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("sessionToken"); 
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Layout>
          <Routes>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/feedbacks" element={<FeedbacksPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/interns" element={<InternsPage />} />
            <Route path="/assign" element={<AssignPage />} />
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
