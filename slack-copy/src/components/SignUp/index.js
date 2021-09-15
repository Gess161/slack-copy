import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import styles from "./style.module.css"

export default function SignUp() {
    return (
        <div className={styles.container}>
            <h2>Registration form</h2>
            <p>In order to join our flawless Hlack community, you need to follow 3 simple steps:</p>
            <FormGroup>
                <Label for="Login">Step 1: Create your unique login </Label>
                <Input placeholder="Enter login here" />
            </FormGroup>
            <FormGroup>
                <Label for="Password">Step 2: Create your secret password</Label>
                <Input placeholder="Enter password here" />
            </FormGroup>
            <Button>Step 3: Click Me</Button>
        </div>
    );
}
