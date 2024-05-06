import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ListEntries from "./pages/ListEntries"
import EditEntry from "./pages/EditEntry"
import CreateEntry from "./pages/CreateEntry"


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/list-entries" element={<ListEntries />} />
                <Route path="/edit-entry/:id" element={<EditEntry />} />
                <Route path="/create-entry" element={<CreateEntry />} />
            </Routes>
        </Router>
    );
}

export default App;