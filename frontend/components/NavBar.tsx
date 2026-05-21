import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Burger, Drawer, ScrollArea, Divider, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const navLinks = [
  { label: 'Program', href: '#program' },
  { label: 'Mentors', href: '#mentors' },
  { label: 'Cohort', href: '#cohort' },
  { label: 'Partners', href: '#partners' },
  { label: 'About', href: '#about' },
];

const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    router.push('/user/login');
    closeDrawer();
  };

  const year = new Date().getFullYear();

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.navInner}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={styles.burger}
            color="var(--wit-dark)"
            size="sm"
          />
          <a href="#" className={styles.navLogoLink}>
            <Image
              src="/WIT-logo-black.png"
              alt="WIT logo"
              height={36}
              width={36}
              style={{ objectFit: 'contain' }}
            />
          </a>
        </div>

        {/* Center links */}
        <div className={styles.navCenter}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className={styles.navRight}>
          <button className={styles.loginLink} onClick={handleLogin}>
            Login
          </button>
          <a
            href="https://www.facebook.com/events/545237864225826"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.applyButton}
          >
            Apply {year}
          </a>
        </div>
      </div>

      {/* Mobile drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1rem' }}>
            WIT Empowerment
          </span>
        }
        style={{ fontFamily: 'Montserrat' }}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color="gray.1" />
          <div className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.mobileLink}
                onClick={closeDrawer}
              >
                {link.label}
              </a>
            ))}
          </div>
          <Divider my="sm" color="gray.1" />
          <div className={styles.mobileActions}>
            <button className={styles.loginLink} onClick={handleLogin}>
              Login
            </button>
            <a
              href="https://www.facebook.com/events/545237864225826"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.applyButton}
            >
              Apply {year}
            </a>
          </div>
        </ScrollArea>
      </Drawer>
    </nav>
  );
};

export default Navbar;
