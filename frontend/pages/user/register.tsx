import React from 'react';
import { Montserrat } from '@next/font/google';
import { signIn } from 'next-auth/react';
import Script from 'next/script';
import styles from '../../styles/User.module.css';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
const montserrat = Montserrat({ subsets: ['latin'] });
const monsterratBold = Montserrat({ weight: '700', subsets: ['latin'] });

export default function register() {
  const [password, setPassword] = React.useState('');

  return (
    <div className={styles.user}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
      />
      <main className={montserrat.className}>
        <div className={styles.panel}>
          <div className={styles.left}>
            <div className={styles.content}>
              <h1>Create an account</h1>
              <div className={styles.auth}>
                {/* guide: https://mattermost.com/blog/add-google-and-github-login-to-next-js-app-with-nextauth/ */}
                <button
                  className={montserrat.className}
                  onClick={() => signIn('google')}
                >
                  <img src="/google.svg" alt="google logo" />
                  Sign up with Google
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
                    required
                    className={montserrat.className}
                    type="text"
                    id="id"
                    name="id"
                    placeholder="Enter your preferred email"
                    pattern="[a-zA-Z0-9_\.]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$"
                    title="name@example.com"
                  />
                </div>
                <div className={styles.multipleFields}>
                  <div>
                    <label>First name</label>
                    <input
                      required
                      className={montserrat.className}
                      type="text"
                      id="id"
                      name="id"
                      placeholder="Enter your first name"
                      pattern="[a-zA-Z]{2,}"
                      title="Alphabets only and at least 2 characters"
                    />
                  </div>
                  <div>
                    <label>Last name</label>
                    <input
                      required
                      className={montserrat.className}
                      type="text"
                      id="id"
                      name="id"
                      placeholder="Enter your last name"
                      pattern="[a-zA-Z]{2,}"
                      title="Alphabets only and at least 2 characters"
                    />
                  </div>
                </div>
                <div>
                  <label>zID</label>
                  <input
                    required
                    className={montserrat.className}
                    type="text"
                    id="id"
                    name="id"
                    placeholder="Enter your zID"
                    pattern="^z[0-9]{7}$"
                    title="z1234567"
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
                    onInput={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Confirm password</label>
                  <input
                    required
                    className={montserrat.className}
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm your password"
                    pattern={password}
                    title="Must match password"
                  />
                </div>
                <hr />
                <button className={montserrat.className} type="submit">
                  Continue
                </button>
              </form>
              <p>
                Already have an account?{' '}
                <a href="/user/login" className={monsterratBold.className}>
                  Log in
                </a>
              </p>
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
