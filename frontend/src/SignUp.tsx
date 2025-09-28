import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
       await axios.post("http://127.0.0.1:8000/nurses/register", {
        name,
        email,
        password,
      });

    toast.success("Register successful");

      // redirect to login
      navigate("/login");
    } catch (error: any) {
      console.error("Error during signup:", error);
      alert(error.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?cs=srgb&dl=pexels-olly-3791664.jpg&fm=jpg"
          alt="MindCare background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Signup Card */}
      <motion.div
        className="relative z-10 card w-96 bg-white/80 backdrop-blur-md shadow-xl border border-blue-100"
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
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-600">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered bg-slate-50 text-slate-800 border-slate-300 
                           focus:border-blue-400 focus:ring focus:ring-blue-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-600">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered bg-slate-50 text-slate-800 border-slate-300 
                           focus:border-blue-400 focus:ring focus:ring-blue-200"
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
                className="input input-bordered bg-slate-50 text-slate-800 border-slate-300 
                           focus:border-blue-400 focus:ring focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-600">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered bg-slate-50 text-slate-800 border-slate-300 
                           focus:border-blue-400 focus:ring focus:ring-blue-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg border-none"
                type="submit"
              >
                Sign Up
              </motion.button>
            </div>
          </form>
          <motion.p
            className="text-center text-slate-500 mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
