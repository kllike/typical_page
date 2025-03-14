import { useState, useEffect, useReducer } from 'react';
import './Login.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }
    return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === 'USER_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: '', isValid: false };
};

const Login = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: false,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: false,
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFormIsValid(emailState.isValid && passwordState.isValid);
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [emailState.isValid, passwordState.isValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
    };

    const emailValidateHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const passwordValidateHandler = () => {
        dispatchPassword({ type: 'USER_BLUR' });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            props.onLogin(emailState.value, passwordState.value);
        }
    };

    return (
        <Card className="login">
            <form onSubmit={submitHandler}>
                <div className={`control ${emailState.isValid === false ? 'invalid' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={emailValidateHandler}
                    />
                </div>
                <div className={`control ${passwordState.isValid === false ? 'invalid' : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={passwordValidateHandler}
                    />
                </div>
                <div className="actions">
                    <Button type="submit" disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
