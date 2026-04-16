import { useState } from 'react';
import { EyeFill, EyeSlashFill, KeyFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function PasswordInputComponent({ value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputGroup className="mb-3 password-input-field">
            <InputGroup.Text id="key-icon">
                <KeyFill size={20} />
            </InputGroup.Text>
            <Form.Control
                placeholder='Password'
                type={showPassword ? "text" : "password"}
                value={value}
                name='password'
                onChange={onChange}
                aria-label="Password"
                aria-describedby="key-icon"
            />
            <InputGroup.Text id="basic-add-on3" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashFill size={20} /> : <EyeFill size={20} />}
            </InputGroup.Text>
        </InputGroup>
    );
}

export default PasswordInputComponent;