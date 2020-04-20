import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Router from "./components/router";
import auth from './services/authService';
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const userData = await auth.getCurrentUser();
      setUser(userData);
    }
    getUser();
  }, [])

  return (
    <div className="App">
      <Navbar user={user}/>
      <Router />
    </div>
  );
}

export default App;
