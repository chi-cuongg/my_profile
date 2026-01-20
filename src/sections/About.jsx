import React from 'react';
import styles from './About.module.css';
import profileImg from '../assets/profile.jpg';
import RevealOnScroll from '../components/RevealOnScroll';

import RibbonTitle from '../components/RibbonTitle';
import MarauderFootprints from '../components/MarauderFootprints';

const About = () => {
    const skills = [
        "JavaScript (ES6+)", "React", "Node.js", "TypeScript",
        "HTML5 & CSS3", "Git", "SQL", "Python"
    ];

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--x', `${x}px`);
        e.currentTarget.style.setProperty('--y', `${y}px`);
    };

    return (
        <section id="about" className={styles.about}>
            {/* Removed global container class to allow full width parchment */}
            <div className={styles.paper} onMouseMove={handleMouseMove}>
                <MarauderFootprints />

                <RevealOnScroll>
                    <RibbonTitle text="About Me" />
                </RevealOnScroll>

                <div className={styles.content}>
                    <div className={styles.text}>
                        <RevealOnScroll>
                            <p>
                                My name is Cuong, and I am currently a software engineering student. I have a passion for coding and building useful, innovative applications that solve real-world problems.
                            </p>
                            <p>
                                I'm always eager to learn new technologies and constantly improving my skills to stay up to date in the ever-changing world of software development. Whether working on front-end interfaces or back-end systems, I strive to write clean, efficient, and maintainable code.
                            </p>
                            <p>
                                I'm excited about the future of technology and look forward to growing as a developer through meaningful projects and hands-on experience.
                            </p>
                            <p style={{ fontWeight: 'bold', fontStyle: 'italic', marginTop: '1rem' }}>Here are a few technologies I've been working with recently:</p>
                            <ul className={styles.skillsList}>
                                {skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </RevealOnScroll>
                    </div>
                    <div className={styles.imageWrapper}>
                        <RevealOnScroll>
                            <div className={styles.imgContainer}>
                                <img src={profileImg} alt="Đào Chí Cường" className={styles.profileImg} />
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
