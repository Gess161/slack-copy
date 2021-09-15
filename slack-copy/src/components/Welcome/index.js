import React from "react";
import styles from './style.module.css'

export default function Welcome() {
    return (
        <div className={styles.welcome}>
            <h2>Welcome to Hlack!</h2>
            <p>Please log in or create new account</p>
        </div>
    )
}