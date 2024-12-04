import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserIdProvider } from "./services/UserIDContext";
import Login from "./pages/form/Login";
import SignUp from "./pages/form/SignUp";

function App() {
    return (
        <UserIdProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router> 
        </UserIdProvider>
        
    );
}

export default App;
