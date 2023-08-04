/** @format */

import "./App.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Welcome from "./Welcome";
import FinalForm from "./FinalForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupForm />} />
                <Route path="/final" element={<FinalForm/>}/>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;
