import React from 'react';
import { Montserrat } from '@next/font/google';
import { signIn } from 'next-auth/react';
import styles from '../../styles/User.module.css';

const montserrat = Montserrat({ subsets: ['latin'] });
const monsterratBold = Montserrat({ weight: '700', subsets: ['latin'] });

export default function login() {
  return (
    <div className={styles.user}>
      <main className={montserrat.className}>
        <div className={styles.panel}>
          <div className={styles.left}>
            <div className={styles.content}>
              <h1>Sign in</h1>
              <div className={styles.auth}>
                {/* guide: https://mattermost.com/blog/add-google-and-github-login-to-next-js-app-with-nextauth/ */}
                <button
                  className={montserrat.className}
                  onClick={() => signIn('google')}
                >
                  <img src="/google.svg" alt="google logo" />
                  Sign in with Google
                </button>
              </div>
              <div className={styles.dividerLabel}>
                <hr />
                OR
                <hr />
              </div>
              <form method="POST">
                <div>
                  <label>Email</label>
                  <input
                    className={montserrat.className}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    className={montserrat.className}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </div>
                <hr />
                <button className={montserrat.className} type="submit">
                  Log in
                </button>
              </form>
              <p>
                Haven't registered yet?{' '}
                {/* <a href="/user/register" className={monsterratBold.className}> */}
                <a href="#" className={monsterratBold.className}>
                  Sign up
                </a>
              </p>
            </div>
          </div>
          <div className={styles.right}>
            <img src="/login-image.png" alt="woman engineers" />
          </div>
        </div>
      </main>
    </div>
  );
}
