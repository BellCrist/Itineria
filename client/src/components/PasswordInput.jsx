import { useState } from 'react';
import { EyeFill, EyeSlashFill, KeyFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '../css/PasswordInput.css';

function PasswordInputComponent({ value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);
    const isEmpty = value.trim() === '';

    return (
        <InputGroup className={`mb-3 password-input-field ${isEmpty ? 'password-empty' : ''}`}>
            <InputGroup.Text id="key-icon">
                <KeyFill size={23} />
            </InputGroup.Text>
            <Form.Control
                placeholder='Password'
                type={showPassword ? "text" : "password"}
                value={value}
                name='password'
                onChange={onChange}
                aria-label="Password"
                aria-describedby="key-icon"
                size='md'
                required
            />
            <InputGroup.Text id="basic-add-on3" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashFill size={21} /> : <EyeFill size={21} />}
            </InputGroup.Text>
        </InputGroup>
    );
}

export default PasswordInputComponent;