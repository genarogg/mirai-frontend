"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '../index'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface InputProps {
    className?: string;
    name: string;
    type: 'password' | 'text' | 'email' | 'date' | 'number' | 'tel' | 'url';
    icon?: React.ReactNode;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    max?: number;
    min?: number;
    hasContentState?: boolean;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    className = "",
    icon,
    name,
    id = name,
    type,
    required = true,
    disabled = false,
    min,
    max,
    hasContentState = false,
    placeholder,
    onChange
}) => {

    const togglePasswordVisibility = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    const [isFocused, setIsFocused] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [hasContent, setHasContent] = useState(hasContentState);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (type === 'date' && inputRef.current) {
            inputRef.current.showPicker();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasContent(e.target.value !== "");
        if (onChange) {
            onChange(e);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            setHasContent(inputRef.current.value !== "");
        }
    }, []);

    return (
        <div
            className={`container-input ${className} ${isFocused ? "focus" : ""} ${icon ? "" : "no-icon"}`}
            onClick={handleClick}
        >

            {/* icono */}
            {icon && (
                <label htmlFor={id} className='label-ico'>
                    <Icon icon={icon} />
                </label>
            )}

            {/* input */}
            <input
                ref={inputRef}
                type={inputType}
                name={name}
                id={id}
                required={required}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
                {...(min ? { min } : {})}
                {...(max ? { max } : {})}
            />

            {/* mostrar el password */}
            {type === "password" && (
                <button
                    className="view-pass"
                    type="button"
                    onClick={togglePasswordVisibility}
                >
                    {inputType === "password" ? (
                        <label>
                            <Icon icon={<FaRegEye />} />
                        </label>
                    ) : (
                        <label>
                            <Icon icon={<FaRegEyeSlash />} />
                        </label>
                    )}
                </button>
            )}

            {/* placehorder */}
            <span className={`holder ${hasContent ? "has-content" : ""}`}>
                {placeholder}
            </span>
        </div>
    );
}

export default Input;