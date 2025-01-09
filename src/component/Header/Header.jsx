// src/components/Header.jsx
import React, { useEffect, useRef } from "react";
import styles from './Header.module.scss';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



function Header() {


const logo = useRef(null)
const login = useRef(null)
const signup = useRef(null)

  useEffect(() => {
    if (logo.current) {
      gsap.fromTo(
        [logo.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1,
          ease: "power2.inOut",
        }
      );
    };
    if (login.current) {
      gsap.fromTo(
        [login.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1.1,
          ease: "power2.inOut",
        }
      );
    };
    if (signup.current) {
      gsap.fromTo(
        [signup.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1.2,
          ease: "power2.inOut",
        }
      );
    };
  
  }, []);





  return (
    <header className={styles.header}>
      <a ref={logo} className="logo" to="/"><img src="/images/logo.png" alt="" /></a>
      <div className={`${styles.connexion} connexion`}>
        <a ref={login} to="/login" className={`${styles.login} login`}>Connexion</a>
        <a ref={signup}  to="/register" className={`${styles.signup} signup`}>Inscription</a>
      </div>
    </header>
  );
}

export default Header;
