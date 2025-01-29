'use client'
import React from 'react'
import { Input } from "@nano"

import { FaPhone, FaAddressCard, FaCity, FaMapMarkerAlt, FaMailBulk, FaGlobe } from "react-icons/fa"

interface FormInformacionPersonalProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInformacionPersonal: React.FC<FormInformacionPersonalProps> = ({ handleChange }) => {
    return (
        <div className="datos-step-1">
            <div className="input-container">
                <Input
                    icon={<FaPhone />}
                    key="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Numero de Telefono"
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <Input
                    icon={<FaAddressCard />}
                    key="address"
                    name="address"
                    type="text"
                    placeholder="Direccion"
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <Input
                    icon={<FaGlobe />}
                    key="country"
                    name="country"
                    type="text"
                    placeholder="Pais"
                    onChange={handleChange}
                />
            </div>

            <div className="input-container">
                <Input
                    icon={<FaMapMarkerAlt />}
                    key="state"
                    name="state"
                    type="text"
                    placeholder="Estado"
                    onChange={handleChange}
                />
            </div>

            <div className="input-container">
                <Input
                    icon={<FaCity />}
                    key="city"
                    name="city"
                    type="text"
                    placeholder="Ciudad"
                    onChange={handleChange}
                />
            </div>

            <div className="input-container">
                <Input
                    icon={<FaMailBulk />}
                    key="postalCode"
                    name="postalCode"
                    type="text"
                    placeholder="Codigo Postal"
                    onChange={handleChange}
                />
            </div>

        </div>
    );
}

export default FormInformacionPersonal;