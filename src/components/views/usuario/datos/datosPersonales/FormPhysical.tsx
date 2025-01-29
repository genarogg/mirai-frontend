'use client'
import React from 'react'

import Select from "react-select"
import { Input } from "@nano"

import { FaRulerVertical, FaWeight, FaTshirt } from "react-icons/fa"

interface FormPhysicalProps {
    handleSelectChange: any,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

const FormPhysical: React.FC<FormPhysicalProps> = ({ handleSelectChange, handleChange }) => {
    return (
        <>
            <div className="select-container">

                <Select
                    key="sexo"
                    name="sexo"
                    options={[
                        { value: 'male', label: 'Masculino' },
                        { value: 'female', label: 'Femenino' },
                    ]}
                    onChange={handleSelectChange('sexo')}
                    placeholder="Sexo"
                />
            </div>
            <div className="input-container">
                <Input
                    icon={<FaRulerVertical />}
                    key="altura"
                    name="altura"
                    type="number"
                    placeholder="altura (cm)"
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <Input
                    icon={<FaWeight />}
                    key="peso"
                    name="peso"
                    type="number"
                    placeholder="peso (kg)"
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <Input
                    icon={<FaTshirt />}
                    key="tallaDeRopa"
                    name="tallaDeRopa"
                    type="text"
                    placeholder="Talla"
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default FormPhysical;