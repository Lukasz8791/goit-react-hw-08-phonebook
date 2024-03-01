import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link className={styles.a} to="/register">
            Registration
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.a} to="/login">
            Log in
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.a} to="/contacts">
            Contacts
          </Link>
        </li>
        <li className={styles.li}>
          <UserMenu />
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
