import React, { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Modal } from '@mui/material';
import styles from '../styles/User.module.css';

const montserrat = Montserrat({ subsets: ['latin'] });

interface ResetPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitNewPassword: (password: string, confirmPassword: string) => Promise<void>;
}

// Password comments:
// 1. Check if passwords match (rest of them should be handled in backend)
export default function ResetPasswordModal({
  open,
  onClose,
  onSubmitNewPassword,
}: ResetPasswordModalProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (password !== confirm) {
      setPasswordError('Passwords do not match.');
      return;
    }
    setLoading(true);
    await onSubmitNewPassword(password, confirm);
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.user}>
        <main className={montserrat.className}>
          <div className={styles.panel}>
            <div className={styles.left}>
              <div className={styles.content}>
                <h1>Reset Password</h1>
                <form onSubmit={handlePasswordSubmit} className={styles.form}>
                  <div>
                    <label>New Password</label>
                    <input
                      required
                      className={montserrat.className}
                      type="password"
                      id="new-password"
                      name="new-password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label>Confirm New Password</label>
                    <input
                      required
                      className={montserrat.className}
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      placeholder="Confirm new password"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <hr />
                  {passwordError && <p className={styles.error}>{passwordError}</p>}
                  <button
                    className={montserrat.className}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
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
          <img className={styles.decor1} src="/login/bottom-left.svg" alt="bottom left vector" />
          <img className={styles.decor2} src="/login/top-right.svg" alt="top right vector" />
        </div>
      </div>
    </Modal>
  );
}