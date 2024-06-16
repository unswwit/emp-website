import React, { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Button, Card, CardContent, Input, Stack, Typography } from '@mui/material';
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
            <h1>Tools</h1>
          </div>
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Stack spacing={3} marginBottom={2}>
                <h2>Generate Invitation Links</h2>
                <p>
                  Please upload a CSV file. Make sure the first row of csv is labeled "email" and
                  subsequent rows are emails you want to send registration links to.
                </p>
              </Stack>
              <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={2}>
                  <Input type="file" onChange={handleFileChange} />
                  <Button type="submit" variant="contained" color="primary">
                    Send Invitations
                  </Button>
                </Stack>
                <Typography color="secondary">{message}</Typography>
              </form>
            </CardContent>
          </Card>
        </MainContent>
      </main>
    </div>
  );
}
