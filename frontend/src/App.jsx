import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [user, setUser] = useState(null);

  // ✅ Restore login state on reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      // ensure the user object contains the token so children can access it as user.token
      const parsed = JSON.parse(storedUser);
      parsed.token = token;
      setUser(parsed);
      setCurrentView("dashboard");
    }
  }, []);

  const handleLogin = (userData, token) => {
    // attach token to user object for convenience
    const userWithToken = { ...userData, token };
    setUser(userWithToken);
    setCurrentView("dashboard");

    // ✅ Save to localStorage for persistence
    localStorage.setItem("user", JSON.stringify(userWithToken));
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("login");

    // ✅ Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      {currentView === "login" && (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentView("signup")}
        />
      )}
      {currentView === "signup" && (
        <Signup
          onSignup={handleLogin}
          onSwitchToLogin={() => setCurrentView("login")}
        />
      )}
      {currentView === "dashboard" && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
