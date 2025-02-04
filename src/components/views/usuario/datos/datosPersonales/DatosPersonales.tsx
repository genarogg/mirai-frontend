"use client"

import type React from "react"



import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

import "./sass/MultiStepForm.scss"




import Layout from '@components/layout/public/Layout'
import HeaderGhost from '@components/layout/public/header/HeaderGhost'

import FormInformacionPersonal from "./FormInformacionPersonal"
import FormDemographics from "./FormDemographics"
import FormPhysical from "./FormPhysical"

import { useRouter } from 'next/navigation';

import { notify } from "@nano";



const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const router = useRouter();

    const inputRef = useRef<any>({
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        dateOfBirth: '',
        gender: '',
        etnia: '',
        idiomas: '',
        sexo: '',
        altura: '',
        peso: '',
        tallaDeRopa: '',
        medidas: '',
        caracteristicasFisicas: '',
    });

    const nextStep = () => {
        if (currentStep < formSections.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        inputRef.current = { ...inputRef.current, [name]: value };
    };

    const handleSelectChange = (name: any) => (selectedOption: any) => {
        inputRef.current = { ...inputRef.current, [name]: selectedOption.value };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userProfileData = {
            phoneNumber: inputRef.current.phoneNumber,
            address: inputRef.current.address,
            city: inputRef.current.city,
            state: inputRef.current.state,
            postalCode: inputRef.current.postalCode,
            country: inputRef.current.country,
            dateOfBirth: inputRef.current.dateOfBirth,

            etnia: inputRef.current.etnia,
            idiomas: inputRef.current.idiomas,
            sexo: inputRef.current.sexo,
            altura: inputRef.current.altura,
            peso: inputRef.current.peso,
            tallaDeRopa: inputRef.current.tallaDeRopa,
        };

        console.log(userProfileData);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:4000/user/datos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userProfileData),
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await response.json();

            console.log(data);

            notify({
                type: data.type,
                message: data.message,
            });

            localStorage.removeItem("primeraVez")
            router.push("/usuario");

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const formSections = [
        // Section 1: Personal Information
        <>
            <h2 className="text-2xl mb-4">Información Personal</h2>
            <FormInformacionPersonal handleChange={handleChange} />
        </>
        ,
        // Section 2: Demographics
        <>
            <h2 className="text-2xl mb-4">Demografía</h2>
            <FormDemographics
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
            />
        </>
        ,
        // Section 3: Physical Characteristics
        <>
            <h2 className="text-2xl mb-4">Características Físicas</h2>
            <FormPhysical
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
            />
        </>
        ,
    ];

    return (
        <Layout where="usuario">
            <HeaderGhost />
            <div className="multi-step-form">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
                    >
                        <form className="form-container">
                            {formSections[currentStep]}
                            <div className="button-group">
                                {currentStep > 0 && (
                                    <button type="button" onClick={prevStep} className="btn-prev">
                                        Previous
                                    </button>
                                )}
                                {currentStep < formSections.length - 1 ? (
                                    <button type="button" onClick={nextStep} className="btn-next">
                                        Next
                                    </button>
                                ) : (
                                    <button className="btn-submit" onClick={handleSubmit}>
                                        Submit
                                    </button>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Layout>
    );
};

export default MultiStepForm