import React, { FormEvent, useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';

import styles from '../../styles/User.module.css';
import { doLogin } from '../api/user';
import { useRouter } from 'next/router';
import { checkValidUser } from '../../utils/auth';
import LoadingOverlay from '../../components/LoadingOverlay';
import { userLoginRequest } from '../../types/user';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Login() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const reqData = {
      userId: e.currentTarget.userId.value,
      password: e.currentTarget.password.value,
    } as userLoginRequest;

    doLogin(reqData, router, setError).finally(() => setLoading(false));
  };

  const initLogin = async () => {
    const validUser = await checkValidUser(router, true);
    if (validUser) return;
    setLoading(false);
  };

  const handleResetPassword = () => {
    router.push('/user/forgot-password');
  };

  useEffect(() => {
    setLoading(false);
    initLogin();
  }, []);

  return (
    <div className={styles.user}>
      <main className={montserrat.className}>
        <div className={styles.panel}>
          <LoadingOverlay isLoading={isLoading} />
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
              <form method="POST" action="/user/login" onSubmit={handleLogin}>
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
                <div className={styles.forgot_password_container}><p onClick={handleResetPassword}><u>Forgot your password?</u></p></div>
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
