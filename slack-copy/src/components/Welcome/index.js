import React from "react";
import styles from './style.module.css'
import RegistrationForm from "../RegistrationForm";
import NavBar from "../NavBar";

import { Button } from "reactstrap"


export default function Welcome() {
    return (
        <div className={styles.welcome}>
            <NavBar />
            <h2>Welcome to Hlack!</h2>
            <p>Please sign up or create new account</p>
            <RegistrationForm />
            <Button color="secondary" size="lg" block> Submit</Button>
        </div>
    )
}