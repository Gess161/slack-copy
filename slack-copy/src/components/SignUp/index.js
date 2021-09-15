import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import styles from "./style.module.css"

export default function SignUp() {
    return (
        <div className={styles.container}>
            <h2>Registration form</h2>
            <p>In order to join our flawless Hlack community, you need to follow 3 simple steps: </p>
            <form action="/reg" method="POST">
            <FormGroup >
                <Label for="Login">Step 1: Create your unique login </Label>
                <Input type="text" name="login" placeholder="Enter login here" />
            </FormGroup>
            <FormGroup method="POST">
                <Label for="Password">Step 2: Create your secret password</Label>
                <Input type="text" name="password" placeholder="Enter password here" />
            </FormGroup>
            <Button type="submit">Step 3: Click Me</Button>
            </form>
        </div>
    );
}
