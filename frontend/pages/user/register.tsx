import React, { FormEvent, useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import { doRegister } from '../api/user';
import { useRouter } from 'next/router';

import styles from '../../styles/User.module.css';
import LoadingOverlay from '../../components/LoadingOverlay';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
const montserrat = Montserrat({ subsets: ['latin'] });
const monsterratBold = Montserrat({ weight: '700', subsets: ['latin'] });

export default function Register() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [password, setPassword] = React.useState('');
  const [error, setError] = useState<string | null>(null);

  // Extract token from query params
  const token = router.query.token as string;

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const reqData = {
      email: e.currentTarget.email.value,
      zid: e.currentTarget.zid.value,
      firstName: e.currentTarget.fname.value,
      lastName: e.currentTarget.lname.value,
      password: e.currentTarget.password.value,
    };

    doRegister(reqData, router, setError, token).finally(() => setLoading(false));
  };

  const initRegister = async () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    initRegister();
  }, []);

  return (
    <div className={styles.user}>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`} />
      <main className={montserrat.className}>
        <div className={styles.panel}>
          <LoadingOverlay isLoading={isLoading} />
          <div className={styles.left}>
            <div className={styles.content}>
              <h1>Create an account</h1>
              <div className={styles.auth}>
                {/* guide: https://mattermost.com/blog/add-google-and-github-login-to-next-js-app-with-nextauth/ */}
                {/* <button
                  className={montserrat.className}
                  onClick={() => signIn('google')}
                >
                  <img src="/google.svg" alt="google logo" />
                  Sign up with Google
                </button> */}
              </div>
              {/* <div className={styles.dividerLabel}>
                <hr />
                OR
                <hr />
              </div> */}
              <form method="POST" action="/user/register" onSubmit={handleRegister}>
                <div>
                  <label>Email</label>
                  <input
                    required
                    className={montserrat.className}
                    type="text"
                    id="email"
                    name="email"
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
                      id="fname"
                      name="fname"
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
                      id="lname"
                      name="lname"
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
                    id="zid"
                    name="zid"
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
                      setPassword((e.target as HTMLTextAreaElement).value);
                    }}
                  />
                </div>
                <div>
                  <label>Confirm password</label>
                  <input
                    required
                    className={montserrat.className}
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Confirm your password"
                    pattern={password}
                    title="Must match password"
                  />
                </div>
                <hr />
                {error && <p className={styles.error}>{error}</p>}
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
        <img className={styles.decor1} src="/login/bottom-left.svg" alt="bottom left vector" />
        <img className={styles.decor2} src="/login/top-right.svg" alt="top right vector" />
      </div>
    </div>
  );
}
