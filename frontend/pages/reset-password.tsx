import React, { useState } from 'react';
import ResetPasswordModal from '../components/ResetPasswordModal';
import { useRouter } from 'next/router';

// Reset password page:
// Ideally, takes in a password and confirm password field (modal) along with a submit button.
// Here, the reset token is assumed to be set after the email is submitted for resetting password.
export default function ResetPasswordPage() {
  const [modalOpen, setModalOpen] = useState(true);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const router = useRouter();

  // Step 1: Send reset email, get token if user exists
  const handleSubmitEmail = async (email: string) => {
    setResetToken('dummy-token');
    return true;
  
  };

  // Step 2: Submit new password and token
  const handleSubmitNewPassword = async (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token: resetToken }),
      });
      if (res.ok) {
        alert('Password reset successful!');
        setModalOpen(false);
        router.push('/user/login');
      } else {
        alert('Password reset failed.');
      }
    } catch (e) {
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