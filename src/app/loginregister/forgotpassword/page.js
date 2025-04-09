'use client'
import { useState } from "react";
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/app/page.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
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
          <h3 className={styles.welcome}>Forgot Password</h3>
          <p className={styles.powerful}>Smart tools built to simplify your work and drive results.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" className={styles.login}>Send OTP</button>
          </form>
          <p className={`${styles.have} mt-3 text-center`}>{message}</p>
        </div>
      </div>
    </div>

  );
}
