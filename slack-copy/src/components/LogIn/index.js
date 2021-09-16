import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button } from "reactstrap"


export default function SignUp() {
    return (
        <div>
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
            </InputGroup >
            <Button color="secondary" block>Submit</Button>
        </div>
    )
}