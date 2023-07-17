import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function Footer() {
  return (
    <>
      <div className={styles.divider}>
        <div className={styles.flex}>
          <Image
            src="/WIT-logo-white.png"
            alt="UNSWWIT Logo"
            className={styles.footerLogo}
            width={50}
            height={50}
            priority
          />
          <p>© UNSW Women in Technology 2023</p>
        </div>
        <div className={styles.footerIcons}>
          <Tooltip title="Instagram" arrow>
            <IconButton>
              <div>
                <SocialIcon
                  url="https://www.instagram.com/wit.unsw/?hl=en"
                  network="instagram"
                  bgColor="#F48B01"
                />
              </div>
            </IconButton>
          </Tooltip>
          <Tooltip title="Facebook" arrow>
            <IconButton>
              <div>
                <SocialIcon
                  url="https://www.facebook.com/unsw.wit"
                  network="facebook"
                  bgColor="#F48B01"
                />
              </div>
            </IconButton>
          </Tooltip>
          <Tooltip title="Discord" arrow>
            <IconButton>
              <div>
                <SocialIcon
                  url="https://discord.gg/XDr9qmtQ"
                  network="discord"
                  bgColor="#F48B01"
                />
              </div>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
