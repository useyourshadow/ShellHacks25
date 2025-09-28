import { Routes, Route } from "react-router-dom";
import Home from './Home';
import { Login } from './Login';
import { Toaster } from "react-hot-toast";
import { Signup } from "./SignUp";
import Overview from "./components/Overview";
function App() {
  return (
    <div>
      {/* ✅ Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element ={<Signup/>}/>
        <Route path="/dashboard" element={<Overview />} />

      </Routes>
    </div>
  );
}

export default App;
