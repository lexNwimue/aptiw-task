import "./App.css";
// import Navbar from "./components/Navbar";
// import Form from "./components/Form";
// import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import IndexPage from "./components/IndexPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;