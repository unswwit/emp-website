import React, { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Button, Input } from '@mui/material';
import styles from '../../styles/User.module.css';

import MainContent from '../../components/MainContent';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { handleInviteSubmit } from '../api/admin';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function AdminHome() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInviteSubmit(file, setMessage);
  };

  return (
    <div className={styles.userHome}>
      <main className={montserrat.className}>
        <AdminNavbar />
        <MainContent>
          <div className={styles.section}>
            <h1>Generate Invitation Links</h1>
          </div>
          <div className={styles.form}>
            Please upload a CSV file. Make sure the first row of csv is labeled "email" and
            subsequent rows are emails you want to send registration links to.
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input type="file" onChange={handleFileChange} />
            <Button type="submit" variant="contained" color="primary">
              Send Invitations
            </Button>
          </form>
          {message && <p>{message}</p>}
        </MainContent>
      </main>
    </div>
  );
}
