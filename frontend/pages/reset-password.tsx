import React, { useEffect, useState } from 'react';
import ResetPasswordModal from '../components/ResetPasswordModal';
import { useRouter } from 'next/router';
import { apiUrl } from '../data/constants';

// Reset password page:
// Ideally, takes in a password and confirm password field (modal) along with a submit button.
// Here, the reset token is assumed to be set after the email is submitted for resetting password.
export default function ResetPasswordPage() {
  const [modalOpen, setModalOpen] = useState(true);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const token = router.query.token as string;
      const email = router.query.email as string;

      if (!token) {
        alert('No reset token found in URL');
      } else {
        setResetToken(token);
      }

      if (email) {
        setEmail(email);
      } else {
        alert('No email found in URL');
      }
    }
  }, [router.isReady, router.query]);

  // // Step 1: Send reset email, get token if user exists
  // const handleSubmitEmail = async (email: string) => {
  //   setResetToken('dummy-token');
  //   return true;

  // };

  // Step 2: Submit new password and token
  const handleSubmitNewPassword = async (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/user/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token: resetToken, email }),
      });
      if (res.ok) {
        alert('Password reset successful!');
        setModalOpen(false);
        router.push('/user/login');
      } else {
        alert('Password reset failed.');
      }
    } catch (e) {
      console.error('Reset failed:', e);
      alert('Password reset failed.');
    }
  };

  return (
    <div>
      <ResetPasswordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitNewPassword={handleSubmitNewPassword}
        // onSubmitEmail={handleSubmitEmail}
      />
    </div>
  );
}
