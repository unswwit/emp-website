import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';

import styles from '../../styles/User.module.css';
import { doLogin } from '../api/user';
import { useRouter } from 'next/router';
import { checkValidUser } from '../../utils/auth';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkValidUser(router, true);
  }, []);

  return (
    <div className={styles.user}>
      <main className={montserrat.className}>
        <div className={styles.panel}>
          <div className={styles.left}>
            <div className={styles.content}>
              <h1>Sign in</h1>
              <div className={styles.auth}>
                {/* guide: https://mattermost.com/blog/add-google-and-github-login-to-next-js-app-with-nextauth/ */}
                {/* <button
                  className={montserrat.className}
                  onClick={() => signIn('google')}
                >
                  <img src="/google.svg" alt="google logo" />
                  Sign in with Google
                </button> */}
              </div>
              {/* <div className={styles.dividerLabel}>
                <hr />
                OR
                <hr />
              </div> */}
              <form
                method="POST"
                action="/user/login"
                onSubmit={(e) => {
                  doLogin(e, router, setError);
                }}
              >
                <div>
                  <label>Email or zID</label>
                  <input
                    required
                    className={montserrat.className}
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder="Enter your email or zID"
                    pattern="[a-zA-Z0-9_\.]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$|^z[0-9]{7}$"
                    title="name@example.com or z1234567"
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    required
                    className={montserrat.className}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </div>
                <hr />
                {error && <p className={styles.error}>{error}</p>}
                <button className={montserrat.className} type="submit">
                  Log in
                </button>
              </form>
              <p>Reach out to our Sponsorship team to get unique registration link.</p>
              {/* <p>
                Haven't registered yet?{' '}
                <a href="/user/register" className={monsterratBold.className}>
                  Sign up
                </a>
              </p> */}
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
