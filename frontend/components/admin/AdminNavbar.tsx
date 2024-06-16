import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  createStyles,
  Group,
  Burger,
  Drawer,
  ScrollArea,
  Divider,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from '../../styles/Home.module.css';
import { deleteAuthToken } from '../../pages/api/session';
import { checkAuth } from '../../utils/auth';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    fontFamily: 'Montserrat',

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    float: 'right',
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },
}));

const AdminNavbar = () => {
  const { classes, theme } = useStyles();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const router = useRouter();

  const handleLogout = () => {
    deleteAuthToken();
    checkAuth(router);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <div className={styles.burgerWrapper}>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
            color="white"
          />
        </div>

        <Image
          src="/WIT-logo-white.png"
          alt="UNSWWIT Logo"
          className={styles.logo}
          width={50}
          height={50}
          priority
        />

        <strong className={classes.hiddenMobile}>E M P O W E R M E N T</strong>
        <strong className={classes.hiddenDesktop}>E M P</strong>

        <Group className={classes.hiddenMobile}>
          <a href="/admin/home">Dashboard</a>
          <a href="/admin/tools">Tools</a>
        </Group>
      </div>

      <button
        className={`${styles.logoutButton} ${classes.hiddenMobile}`}
        onClick={handleLogout}
      >
        Logout
      </button>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="WIT Empowerment Website"
        className={classes.hiddenDesktop}
        style={{ fontFamily: 'Montserrat' }}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
          <div className="column">
            <a href="/admin/home" className={classes.link}>
              Dashboard
            </a>
          </div>
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Group position="center" grow pb="xl" px="md">
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </Group>
        </ScrollArea>
      </Drawer>
    </nav>
  );
};

export default AdminNavbar;
