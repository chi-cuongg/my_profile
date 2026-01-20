import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, href, variant = 'primary', className = '' }) => {
    const combinedClassName = `${styles.btn} ${styles[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={combinedClassName}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={combinedClassName}>
            {children}
        </button>
    );
};

export default Button;
