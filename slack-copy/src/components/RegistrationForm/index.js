import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import styles from './style.module.css'




export default function RegistrationForm(props) {
    return (
        <div className={styles.form}>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Login</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="login..." />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Password</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="password..." />
            </InputGroup>
        </div>
    )
}