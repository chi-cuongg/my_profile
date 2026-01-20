import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.socials}>
                {/* Icons can be added here later (e.g., FontAwesome or Lucide) */}
                <a href="https://github.com/chi-cuongg" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
            </div>
            <p className={styles.copy}>
                Designed & Built by Đào Chí Cường
            </p>
        </footer>
    );
};

export default Footer;
