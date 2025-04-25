"use client";
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation';

import "./_btnSubmitBasic.scss"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { RECAPTCHA_KEY } from "@env";
import { notify, A } from "@nano"

import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION, LOGIN_USER_MUTATION } from '@query';

interface BtnSubmitBasicProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  disable?: boolean;
  formData: any;
  endpoint: string;
  push?: string
}

const BtnSubmitBasic: React.FC<BtnSubmitBasicProps> = ({
  children,
  className = "",
  id = "",
  formData,
  endpoint,
  push = "/"
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [loginUser] = useMutation(LOGIN_USER_MUTATION);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    let token = localStorage.getItem("token");
    let recaptcha = "";

    if (RECAPTCHA_KEY && executeRecaptcha) {
      token = await executeRecaptcha("submit");
    }
    const data = {
      name: formData.current.name,
      lastName: formData.current.lastName,
      email: formData.current.email,
      password: formData.current.password,
      token,
      recaptcha
    };

    try {
      let response;
      let responseData;

      if (endpoint === "register") {
        if (data.password.length < 8 || data.password.length > 16) {
          notify({ type: "error", message: "La contraseña debe tener al menos 8 caracteres" });
          return;
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s])[A-Za-z0-9\S]{8,16}$/;
        if (!passwordRegex.test(data.password)) {
          notify({ type: "error", message: "La contraseña debe ser alfanumérica" });
          return;
        }

        if (data.password !== formData.current.confirmPassword) {
          notify({ type: "error", message: "Las contraseñas no coinciden" });
          return;
        }

        response = await createUser({ variables: { input: data } })
        responseData = response.data.createUser
      }

      if (endpoint === "login") {
        response = await loginUser({ variables: { input: data } })
        responseData = response.data.loginUser

        if (localStorage.getItem("primeraVez") === "primeraVez") {

          router.push("/usuario/datos/img-perfil");

        } else {
          router.push("/usuario");
        }


      }



      if (responseData.message !== "Usuario creado exitosamente" &&
        responseData.message !== "Inicio de sesión exitoso") {
        notify({ type: responseData.type, message: responseData.message });

        return;
      }

      notify({ type: responseData.type, message: responseData.message });

      localStorage.setItem("token", responseData.token);

      if (endpoint === "register") {
        localStorage.setItem("primeraVez", "primeraVez");
        router.push("/usuario/datos/img-perfil");
      }

    } catch (error) {
      notify({ type: "error", message: "Error al crear el usuario" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={`btn-submit-basic ${className}`} id={id}>
        <button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            handleSubmit();
          }}>
          {children}
        </button>
      </div>
      <A href={push} id={endpoint + "next"} style={{ display: "none" }}></A>
    </>
  );
};

export default BtnSubmitBasic;