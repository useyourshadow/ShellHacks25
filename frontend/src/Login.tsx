import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://127.0.0.1:8000/nurses/login", {
      email,
      password,
    });

      const nurse = response.data.nurse;
     localStorage.setItem("nurseId", nurse.id);
      localStorage.setItem("nurseName", nurse.name);     
       toast.success("Login successful");
      navigate("/dashboard"); // redirect to dashboard

    // e.g., store token or navigate
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
     toast.error(error.response?.data?.detail || "Login failed");
    }};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50"><div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559234938-b60fff04894d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
      <motion.div
        className="card w-96 bg-white/80 backdrop-blur-md shadow-xl border border-blue-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="card-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="card-title text-slate-800 justify-center mb-4 text-3xl">
            MindCare Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-600">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered bg-slate-50 text-slate-800 border-slate-300 focus:border-blue-400 focus:ring focus:ring-blue-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-600">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered bg-slate-50 text-slate-800 border-slate-300 focus:border-blue-400 focus:ring focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg border-none"
                type="submit"
              >
                Login
              </motion.button>
            </div>
          </form>
          <motion.p
            className="text-center text-slate-500 mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}