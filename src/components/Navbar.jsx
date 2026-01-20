import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'Great Hall', href: '#hero' },
        { name: 'Common Room', href: '#about' }, // Inferred for 'About'
        { name: 'Library', href: '#skills' },
        { name: 'Room of Requirement', href: '#projects' },
        { name: 'Owl Post', href: '#contact' },
    ];

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <a href="#hero" className={styles.logo}>
                    <span>⚡</span> Dev<span className={styles.logoAccent}>Potter</span>
                </a>

                {/* Secret Spell Reveal */}
                <div className={styles.spellText}>
                    I solemnly swear that I am up to no good...
                </div>

                <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={styles.navLink}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className={styles.hamburger} onClick={toggleMenu}>
                    <span className={`${styles.bar} ${isOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.bar} ${isOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.bar} ${isOpen ? styles.open : ''}`}></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
