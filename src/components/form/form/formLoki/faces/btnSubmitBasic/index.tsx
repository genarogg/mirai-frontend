import React, { useState } from 'react'
import "./_btnSubmitBasic.scss"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { RECAPTCHA_KEY, URL_BACKEND } from "@env";

import { notify, A } from "@nano"

interface BtnSubmitBasicProps<T> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  disable?: boolean;
  formData: T;
  endpoint: string;
  push: string
}

const BtnSubmitBasic = <T,>({
  children,
  className = "",
  id = "",
  formData,
  endpoint,
  push = "/"
}: BtnSubmitBasicProps<T>) => {

  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  let token = "";

  const handleSubmit = async () => {

    if (RECAPTCHA_KEY && executeRecaptcha) {
      token = await executeRecaptcha("submit");
    }

    const data = {
      ...formData,
      token,
    }

    fetch(`${URL_BACKEND}/auth${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.error) {
          notify({ type: "error", message: data.message })
          return;
        }

        localStorage.setItem("token", data.token);

        notify({ type: "success", message: data.message })

        //redireccionar el usuario con el api de nextjs
        A({ type: "push", href: push })
      })
      .catch((error) => console.error(error)
      ).finally(() => setLoading(false));
  }

  return (
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
  );
};

export default BtnSubmitBasic;