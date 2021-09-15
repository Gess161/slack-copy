import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import styles from "./style.module.css"

export default function SignUp() {
    return (
        <div className={styles.container}>
            <FormGroup>
                <Label for="Login">Login</Label>
                <Input placeholder="Enter login here" />
            </FormGroup>
            <FormGroup>
                <Label for="Password">Password</Label>
                <Input placeholder="Enter password here" />
            </FormGroup>
            <Button>Submit</Button>
        </div>
    );
}
