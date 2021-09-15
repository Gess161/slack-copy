import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button } from "reactstrap"
import styles from './style.module.css'


export default function SignUp() {
    return (
        <div className={styles.container}>
            <InputGroup className={styles.inputGroup}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Login</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="login..." />
            </InputGroup>
            <InputGroup className={styles.inputGroup}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Password</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="password..." />
            </InputGroup >
            <Button color="secondary" block>Submit</Button>
        </div>
    )
}