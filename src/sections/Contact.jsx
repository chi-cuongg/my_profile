import React, { useState } from 'react';
import styles from './Contact.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle'); // idle, rolling, grabbed, flying, sent

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('rolling');

        // Sequence:
        // 1. Roll into Scroll (0.8s)
        // 2. Owl Lands on Scroll (0.5s)
        // 3. Fly away (1.5s)

        setTimeout(() => {
            setFormStatus('grabbed'); // Owl is on the scroll

            setTimeout(() => {
                setFormStatus('flying'); // Fly away together

                setTimeout(() => {
                    setFormStatus('sent');
                }, 1500);
            }, 600);
        }, 800);
    };

    return (
        <section id="contact" className={styles.contact}>
            <AnimatePresence mode="wait">
                {formStatus !== 'sent' ? (
                    <motion.div
                        key="form"
                        className={`${styles.parchment} ${formStatus === 'rolling' || formStatus === 'grabbed' || formStatus === 'flying' ? styles.scrollMode : ''}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        // Rolling Animation
                        animate={
                            formStatus === 'rolling' || formStatus === 'grabbed' || formStatus === 'flying' ? {
                                height: 80, // Height of a scroll tube
                                width: 400, // Slightly narrower
                                borderRadius: '40px', // Round edges
                                background: 'linear-gradient(to bottom, #e6d2b5 0%, #d4af37 20%, #e6d2b5 40%, #c0a060 100%)', // Cylinder effect
                                boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
                                // overflow: 'hidden', // REMOVED: Caused owl to be clipped
                                transition: { duration: 0.8, ease: "easeInOut" }
                            } : {}
                        }
                        // Fly Right Animation (Undulating)
                        exit={formStatus === 'flying' ? {
                            x: 2000,
                            y: [0, -50, 0, -50], // Undulating path
                            rotate: [0, 5, 0, -5],
                            opacity: 0,
                            transition: { duration: 1.5, ease: "easeInOut" }
                        } : {}}
                    >
                        {/* Decorative Wax Seal - Disappears or creates ribbon effect in scroll mode */}
                        <motion.div
                            className={styles.seal}
                            animate={
                                formStatus === 'rolling' || formStatus === 'grabbed' || formStatus === 'flying' ? {
                                    opacity: 0, // Hide normal seal, using background gradient/ribbon instead
                                    transition: { duration: 0.3 }
                                } : { opacity: 1 }
                            }
                        >DP</motion.div>

                        {/* Owl Decoration */}
                        <motion.div
                            className={styles.owlContainer}
                            animate={
                                (formStatus === 'grabbed' || formStatus === 'flying') ? {
                                    x: -200, // Center of scroll
                                    y: 0,    // Sitting ON TOP of the scroll (relative to parent which is now short)
                                    scale: 1.2,
                                    zIndex: 100,
                                    transition: { duration: 0.5, ease: "circOut" }
                                } : {
                                    y: [0, -5, 0],
                                    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                                }
                            }
                        >
                            <span style={{ fontSize: '4rem', filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.5))', display: 'block' }}>🦉</span>
                        </motion.div>

                        {/* Form Content - Fades out */}
                        <motion.div
                            animate={formStatus !== 'idle' ? { opacity: 0, transition: { duration: 0.3 } } : {}}
                        >
                            <h2 className={styles.title}>Owl Post</h2>
                            {/* ... form inputs ... */}
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Name</label>
                                    <input type="text" required className={styles.input} placeholder="Harry Potter" disabled={formStatus !== 'idle'} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Message</label>
                                    <textarea required rows="4" className={styles.textarea} placeholder="I solemnly swear..." disabled={formStatus !== 'idle'} />
                                </div>
                                <button type="submit" className={styles.submitBtn} disabled={formStatus !== 'idle'}>
                                    Send Owl ✉️
                                </button>
                            </form>
                        </motion.div>

                        {/* Red Ribbon (Visible only when rolled) */}
                        {formStatus !== 'idle' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.2 }}
                                style={{
                                    position: 'absolute',
                                    top: 0, left: '50%', transform: 'translateX(-50%)',
                                    width: '20px', height: '100%',
                                    background: 'darkred',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                                }}
                            />
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles.successMessage}
                    >
                        <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            style={{ fontSize: '2rem', marginBottom: '1rem', color: '#FFD700' }}
                        >
                            ✨ Delivered! ✨
                        </motion.div>
                        <p style={{ fontFamily: 'Cinzel', fontSize: '1.2rem', color: '#c0c0c0' }}>
                            Your message has been delivered to <strong style={{ color: '#FFD700' }}>Dev Potter</strong>.
                        </p>
                        <button
                            onClick={() => setFormStatus('idle')}
                            style={{
                                marginTop: '2rem',
                                background: 'transparent',
                                border: '1px solid #FFD700',
                                color: '#FFD700',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontFamily: 'Cinzel'
                            }}
                        >
                            Send Another Owl
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;
