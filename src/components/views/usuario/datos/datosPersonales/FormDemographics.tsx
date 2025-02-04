'use client'
import React from 'react'

import { FaBirthdayCake, FaVenusMars, FaLanguage } from "react-icons/fa"
import Select from "react-select"
import { Input } from "@nano"

interface FormDemographicsProps {
    handleSelectChange: any,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormDemographics: React.FC<FormDemographicsProps> = ({ handleSelectChange, handleChange }) => {
    return (
        <>
            <div className="input-container">
                <Input
                    icon={<FaBirthdayCake />}
                    key="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    placeholder="cumpleaños"
                    onChange={handleChange}
                />
            </div>
            {/* <div className="select-container">

                <Select
                    key="gender"
                    name="gender"
                    options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' },

                    ]}
                    onChange={handleSelectChange('gender')}
                    placeholder="Genero"
                />
            </div> */}
            <div className="select-container">
                <Select
                    key="etnia"
                    name="etnia"
                    options={[
                        { value: 'latino', label: 'Latino' },
                        { value: 'caucasian', label: 'Caucasico' },
                        { value: 'african', label: 'Africano' },
                        { value: 'asian', label: 'Asiatico' },
                        { value: 'hispanic', label: 'Hispano' },
                        { value: 'mixed', label: 'Mixed' },
                    ]}
                    onChange={handleSelectChange('etnia')}
                    placeholder="Etnia"
                />
            </div>
            <div className="select-container">

                <Select
                    key="idiomas"
                    name="idiomas"
                    options={[
                        { value: 'english', label: 'English' },
                        { value: 'spanish', label: 'Spanish' },
                        { value: 'french', label: 'French' },
                        { value: 'german', label: 'German' },
                        { value: 'other', label: 'Other' },
                    ]}
                    onChange={handleSelectChange('idiomas')}
                    placeholder="Lenguage"
                />
            </div>
        </>
    );
}

export default FormDemographics;