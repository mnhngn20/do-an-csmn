import React from 'react';
import Input from '../../UI/Input/Input';

import classes from './SignUp.module.css';

const SignUp = (props) => {
    return (
        <div className={classes.SignUp}>

            <form className={classes.Form}>
                <h1>Create an account</h1>
                <Input type="text" title="Name"/>
                <Input type="text" title="Email" />
                <Input type="password" title="Password"/>
                <Input type="password" title="Confirm Password"/>
            </form>
        </div>
    )
}

export default SignUp;