import React from 'react';
import styles from './Projects.module.css';
import RevealOnScroll from '../components/RevealOnScroll';

const Projects = () => {
    const projects = [
        {
            title: "Project One",
            description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information of each track.",
            tech: ["React", "Express", "Spotify API", "Styled Components"],
            github: "https://github.com",
            demo: "https://example.com"
        },
        {
            title: "Project Two",
            description: "A nice, dark themed chat app for your friends or community. Built with modern web technologies and real-time features.",
            tech: ["Vue", "Firebase", "Element UI"],
            github: "https://github.com",
            demo: "https://example.com"
        },
        {
            title: "Project Three",
            description: "A content management system allowing users to manage their blog posts easily. It supports markdown, image uploads, and has a clean dashboard.",
            tech: ["Next.js", "MongoDB", "Auth0"],
            github: "https://github.com",
            demo: "https://example.com"
        }
    ];

    return (
        <section id="projects" className={styles.projects}>
            <div className={`container ${styles.container}`}>
                <RevealOnScroll>
                    <h2 className="section-title">Some Things I've Built</h2>
                </RevealOnScroll>

                <div className={styles.projectGrid}>
                    {projects.map((project, index) => (
                        <RevealOnScroll key={index}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.folderIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                    </div>
                                    <div className={styles.externalLinks}>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                        </a>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="External Link">
                                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        </a>
                                    </div>
                                </div>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <div className={styles.projectDescription}>
                                    <p>{project.description}</p>
                                </div>
                                <ul className={styles.projectTechList}>
                                    {project.tech.map((tech, i) => (
                                        <li key={i}>{tech}</li>
                                    ))}
                                </ul>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
