'use client'
import { useState } from "react";
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/app/page.module.css'; // Make sure this CSS module exists

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Image
          src="/graphic13-1.svg"
          alt="Login Illustration"
          className={styles.image}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.all_form}>
          <h3 className={styles.welcome}>Reset Password</h3>
          <p className={styles.powerful}>
            Smart tools built to simplify your work and drive results.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="otp"
              className="form-control mb-3"
              placeholder="Enter OTP"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="newPassword"
              className="form-control mb-3"
              placeholder="New Password"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
          <p className="mt-3 text-center">{message}</p>
        </div>
      </div>
    </div>
  );
}
