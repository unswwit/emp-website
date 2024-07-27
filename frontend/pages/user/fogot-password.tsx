import React, { FormEvent, useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';

import styles from '../../styles/User.module.css';
import { doForgotPassword } from '../api/user';
// import { useRouter } from 'next/router';
import LoadingOverlay from '../../components/LoadingOverlay';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Forgot_password() {
  // const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleForgotPassword = (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const reqData = {
      email: e.currentTarget.userEmail.value,
    } 

    doForgotPassword(reqData, setMessage, setError).finally(() => setLoading(false));
  };

  const initForgotPassword = async () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    initForgotPassword();
  }, []);

  return (
    <div className={styles.user}>
      <main className={montserrat.className}>
        <div className={styles.panel}>
          <LoadingOverlay isLoading={isLoading} />
          <div className={styles.left}>
            <div className={styles.content}>
              <h1>Reset your password</h1>
              <div className={styles.auth}>
                {/* guide: https://mattermost.com/blog/add-google-and-github-login-to-next-js-app-with-nextauth/ */}
              </div>
              {/* <div className={styles.dividerLabel}>
                <hr />
                OR
                <hr />
              </div> */}
              <form method="POST" action="/user/login" onSubmit={handleForgotPassword}>
                <div>
                  <label>Email</label>
                  <input
                    required
                    className={montserrat.className}
                    type="text"
                    id="userEmail"
                    name="userEmail"
                    placeholder="Enter your email"
                    pattern="[a-zA-Z0-9_\.]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$"
                    title="name@example.com"
                  />
                </div>
                <hr />
                {error && <p className={styles.error}>{error}</p>}
                {message && <p>{message}</p>}
                <button className={montserrat.className} type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className={styles.right}>
            <img src="/login/image.png" alt="woman engineers" />
          </div>
        </div>
      </main>
      <div className={styles.bg}>
        <img className={styles.decor1} src="/login/bottom-left.svg" />
        <img className={styles.decor2} src="/login/top-right.svg" />
      </div>
    </div>
  );
}
