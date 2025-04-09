'use client';
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setMessage("Please accept terms and conditions.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Password and Confirm Password do not match.");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);

      // ✅ Clear form on success
      if (res.ok) {
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
        setAcceptedTerms(false);
      }

    } catch (err) {
      setMessage("Something went wrong. Please try again.");
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
          <h3 className={styles.welcome}>Register new account</h3>
          <p className={styles.powerful}>
            Smart tools built to simplify your work and drive results.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control mb-3"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-3"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-3"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control mb-3"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="terms">
                I accept all terms and conditions
              </label>
            </div>

            <button type="submit" className={styles.login}>Register</button>

            <p className={styles.have}>
              Already have an account?{" "}
              <Link href="/loginregister/login" className={styles.have_an}>Login Now</Link>
            </p>
          </form>

          <p className={`${styles.have} mt-3 text-center`}>{message}</p>
        </div>
      </div>
    </div>
  );
}
