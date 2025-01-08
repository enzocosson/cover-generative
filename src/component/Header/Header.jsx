// src/components/Header.jsx
import React from 'react';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <a to="/"><img src="/images/logo.png" alt="" /></a>
      <div className={styles.connexion}>
        <a to="/login" className={styles.login}>Connexion</a>
        <a to="/register" className={styles.signup}>Inscription</a>
      </div>
    </header>
  );
}

export default Header;
