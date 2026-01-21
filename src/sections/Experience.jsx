import React from 'react';
import styles from './Experience.module.css';
import RevealOnScroll from '../components/RevealOnScroll';
import RibbonTitle from '../components/RibbonTitle';

const Experience = () => {
    const education = [
        {
            school: "Đại học FPT",
            degree: "Kỹ thuật phần mềm",
            period: "10/2023 - Hiện tại",
            gpa: "8.0/10",
            achievements: ["Học bổng 50% Đại học FPT Hà Nội (2023)"]
        },
        {
            school: "THPT Lê Xoay",
            degree: "Khối A00",
            period: "09/2020 - 06/2023",
            gpa: "8.5/10",
            achievements: [
                "Giải ba HSG cấp tỉnh môn Hóa Học (04/2022)",
                "Giải ba KHTN cấp tỉnh (2018)"
            ]
        }
    ];

    const experience = [
        {
            title: "Lập trình viên",
            company: "Dự án CaTour Game",
            period: "05/2024 - 07/2024",
            link: "https://catour.nicepage.io/",
            description: [
                "Phát triển game sử dụng Unity và C#",
                "Làm việc nhóm 6 người",
                "Tham gia thiết kế và lập trình gameplay"
            ]
        }
    ];

    const skills = {
        programming: ["C", "Java", "C#", "Python", "JavaScript"],
        tools: ["Unity", "Git", "VS Code", "Office"],
        soft: ["Làm việc nhóm", "Quản lý thời gian", "Giao tiếp", "Thuyết trình"]
    };

    const certificates = [
        { name: "IELTS 6.0", date: "08/2023" },
        { name: "Bằng tốt nghiệp THPT", date: "2023" }
    ];

    return (
        <section id="experience" className={styles.experience}>
            <div className={styles.container}>
                <RevealOnScroll>
                    <RibbonTitle text="Experience & Education" />
                </RevealOnScroll>

                <div className={styles.grid}>
                    {/* Education Column */}
                    <div className={styles.column}>
                        <RevealOnScroll>
                            <h3 className={styles.columnTitle}>🎓 Học vấn</h3>
                            {education.map((edu, index) => (
                                <div key={index} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h4>{edu.school}</h4>
                                        <span className={styles.period}>{edu.period}</span>
                                    </div>
                                    <p className={styles.degree}>{edu.degree}</p>
                                    <p className={styles.gpa}>GPA: {edu.gpa}</p>
                                    {edu.achievements && (
                                        <ul className={styles.achievements}>
                                            {edu.achievements.map((ach, i) => (
                                                <li key={i}>🏆 {ach}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </RevealOnScroll>
                    </div>

                    {/* Experience Column */}
                    <div className={styles.column}>
                        <RevealOnScroll>
                            <h3 className={styles.columnTitle}>💼 Kinh nghiệm</h3>
                            {experience.map((exp, index) => (
                                <div key={index} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h4>{exp.title}</h4>
                                        <span className={styles.period}>{exp.period}</span>
                                    </div>
                                    <p className={styles.company}>{exp.company}</p>
                                    {exp.link && (
                                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                            🔗 Xem dự án
                                        </a>
                                    )}
                                    <ul className={styles.description}>
                                        {exp.description.map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            <h3 className={styles.columnTitle} style={{ marginTop: '2rem' }}>📜 Chứng chỉ</h3>
                            <div className={styles.certificates}>
                                {certificates.map((cert, index) => (
                                    <div key={index} className={styles.certBadge}>
                                        <span>{cert.name}</span>
                                        <span className={styles.certDate}>{cert.date}</span>
                                    </div>
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* Skills Section */}
                <RevealOnScroll>
                    <div className={styles.skillsSection}>
                        <h3 className={styles.columnTitle}>⚡ Kỹ năng</h3>
                        <div className={styles.skillsGrid}>
                            <div className={styles.skillCategory}>
                                <h4>Lập trình</h4>
                                <div className={styles.skillTags}>
                                    {skills.programming.map((skill, i) => (
                                        <span key={i} className={styles.skillTag}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>Công cụ</h4>
                                <div className={styles.skillTags}>
                                    {skills.tools.map((skill, i) => (
                                        <span key={i} className={styles.skillTag}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>Kỹ năng mềm</h4>
                                <div className={styles.skillTags}>
                                    {skills.soft.map((skill, i) => (
                                        <span key={i} className={styles.skillTag}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Experience;
