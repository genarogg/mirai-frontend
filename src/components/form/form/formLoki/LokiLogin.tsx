"use client";

import React, { useState } from 'react'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { RECAPTCHA_KEY } from "@env";

import ResetPassWord from './faces/ResetPassWord';
import Login from './faces/Login';
import Register from './faces/Register';

import "./faces/sass/_styleGeneral.scss"

interface LokiLoginProps { }

const LokiLogin: React.FC<LokiLoginProps> = () => {
    const [formState, setFormState] = useState("initial");

    const cardState = (css: string) => {
        setFormState(css);
    };

    return (
        <div className={`container-form-loki ${formState}`} id='containerFormLoki'>
            <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
                <ResetPassWord cardState={setFormState} />
                <Login cardState={cardState} />
                <Register cardState={setFormState} />
            </GoogleReCaptchaProvider>
        </div>
    );
}

export default LokiLogin;