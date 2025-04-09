'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/app/page.module.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage('Something went wrong!');
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
          <h3 className={styles.welcome}>Welcome Back! Let’s Get Things Done</h3>
          <p className={styles.powerful}>Smart tools built to simplify your work and drive results.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-3"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-3"
              onChange={handleChange}
              required
            />
            <Link href="/loginregister/forgotpassword" className={styles.forgot_password}>Forgot Password?</Link>
            <button type="submit" className={styles.login}>Login</button>
            <p className={styles.have}>Don't have an account? <Link href="/loginregister/register" className={styles.have_an}>Signup</Link></p>
          </form>
          <p className={`${styles.have} mt-3 text-center`}>{message}</p>
        </div>
      </div>
    </div>
  );
}
