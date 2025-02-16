"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaEnvelope, FaCalendar, FaMapMarkerAlt, FaPhone, FaRuler, FaWeight, FaTshirt } from "react-icons/fa"
import "./sass/_userAdminPanel.scss"
import Layout from '@components/layout/public/Layout'
import HeaderGhost from '@components/layout/public/header/HeaderGhost'
import { FaEdit } from "react-icons/fa";
import { A, Icon } from "@nano"
import { FaUserShield, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import { FaUser, FaLanguage } from 'react-icons/fa';

interface AnalisisFacial {
    id: number
    colorDePiel: string
    colorDePelo: string
    colorDeOjos: string
    tonoDePiel: string
    subtonoDePiel: string
    estacionDelAno: string
    tipoDeRostro: string
    sistemaFitzpatrick: string
    PantoneSkintone: string
    NARSSkinToneSystem: string
    LOrealColorCode: string
    ColorMeBeautiful: string
    MunsellColorSystem: string
}

interface UserProfile {
    id: number
    phoneNumber: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    dateOfBirth: string
    etnia: string
    idiomas: string
    sexo: string
    altura: string
    peso: string
    tallaDeRopa: string
    edad: number
}

interface UserData {
    id: number
    name: string
    lastName: string
    email: string
    subscription: boolean
    createdAt: string
    updatedAt: string
    role: string
    isActive: boolean
    isVerified: boolean
    profileImage: string
    imgForChange: string
    notificationsEnabled: boolean
    lastLogin: string | null
    totalOrders: number
    preferredLanguage: string
    preferredCurrency: string
    referralCode: string | null
    referrerId: string | null
    AnalisisFacial: AnalisisFacial[]
    userProfile: UserProfile[]
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
}

const UserAdminPanel: React.FC<{ userData: UserData }> = ({ userData }) => {
    return (
        <Layout where="usuario panel">
            <HeaderGhost />
            <div className="admin-panel-container">
                <motion.div className="admin-panel" variants={containerVariants} initial="hidden" animate="visible">
                    <div className="admin-panel-content">
                        {/* <motion.h1 className="admin-panel-title" variants={itemVariants}>
                            User Admin Panel
                        </motion.h1> */}

                        <motion.div className="admin-panel-grid" variants={containerVariants}>
                            <motion.div className="admin-panel-section" variants={itemVariants}>
                                <A href="/usuario/datos/personales">
                                    <h2 className="admin-panel-section-title">
                                        <span>Información del Usuario</span>
                                        <Icon icon={<FaEdit />} />
                                    </h2>

                                </A>
                                <InfoItem icon={<FaUser />} label="Nombre" value={`${userData.name} ${userData.lastName}`} />
                                <InfoItem icon={<FaEnvelope />} label="Correo Electrónico" value={userData.email} />
                                <InfoItem
                                    icon={<FaCalendar />}
                                    label="Fecha de Creación"
                                    value={new Date(Number.parseInt(userData.createdAt)).toLocaleDateString()}
                                />
                                <InfoItem icon={<FaUserShield />} label="Rol" value={userData.role} />
                                <InfoItem icon={userData.isActive ? <FaCheckCircle /> : <FaTimesCircle />} label="Activo" value={userData.isActive ? "Sí" : "No"} />
                                <InfoItem icon={userData.isVerified ? <FaCheckCircle /> : <FaTimesCircle />} label="Verificado" value={userData.isVerified ? "Sí" : "No"} />


                                {/* boton para actualizar esa informcion */}
                                {/* <div className="admin-panel-section-actions">
                                    <A href="/usuario/actualizar-informacion">
                                        <button className="btn btn-primary">
                                            Actualizar Información
                                        </button>
                                    </A>
                                </div> */}
                            </motion.div>

                            <motion.div className="admin-panel-section" variants={itemVariants}>

                                <A href="/usuario/datos/personales">
                                    <h2 className="admin-panel-section-title">
                                        <span>Perfil del Usuario</span>
                                        <Icon icon={<FaEdit />} />
                                    </h2>

                                </A>
                                {userData.userProfile.map((profile) => (
                                    <React.Fragment key={profile.id}>
                                        <InfoItem icon={<FaPhone />} label="Teléfono" value={profile.phoneNumber} />
                                        <InfoItem
                                            icon={<FaMapMarkerAlt />}
                                            label="Dirección"
                                            value={`${profile.address}, ${profile.city}, ${profile.state}, ${profile.country}`}
                                        />
                                        <InfoItem
                                            icon={<FaCalendar />}
                                            label="Fecha de Nacimiento"
                                            value={new Date(Number.parseInt(profile.dateOfBirth)).toLocaleDateString()}
                                        />

                                        <InfoItem icon={<FaUser />} label={"Etnia"} value={profile.etnia} />
                                        <InfoItem icon={<FaLanguage />} label={"Idiomas"} value={profile.idiomas} />
                                        <InfoItem icon={<FaRuler />} label="Altura" value={`${profile.altura} cm`} />
                                        <InfoItem icon={<FaWeight />} label="Peso" value={`${profile.peso} kg`} />
                                        <InfoItem icon={<FaTshirt />} label="Talla de Ropa" value={profile.tallaDeRopa} />

                                        {/* boton para actualizar esa informcion */}
                                        {/* <div className="admin-panel-section-actions">
                                            <A href="/usuario/actualizar-informacion">
                                                <button className="btn btn-primary">
                                                    Actualizar Información
                                                </button>
                                            </A>
                                        </div> */}
                                    </React.Fragment>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div className="admin-panel-section" variants={containerVariants}>
                            <motion.h2 className="admin-panel-section-title" variants={itemVariants}>

                                <A href="/usuario/datos/img-perfil">
                                    <h2 className="admin-panel-section-title">
                                        <span>Análisis Facial</span>
                                        <Icon icon={<FaEdit />} />
                                    </h2>

                                </A>
                            </motion.h2>
                            <motion.div className="facial-analysis-grid" variants={containerVariants}>
                                {userData.AnalisisFacial.map((analysis) => (
                                    <React.Fragment key={analysis.id}>
                                        <InfoItem label="Color de Piel" value={analysis.colorDePiel} />
                                        <InfoItem label="Color de Pelo" value={analysis.colorDePelo} />
                                        <InfoItem label="Color de Ojos" value={analysis.colorDeOjos} />
                                        <InfoItem label="Tono de Piel" value={analysis.tonoDePiel} />
                                        <InfoItem label="Subtono de Piel" value={analysis.subtonoDePiel} />
                                        <InfoItem label="Forma de Rostro" value={analysis.tipoDeRostro} />
                                        <InfoItem label="Fitzpatrick" value={analysis.sistemaFitzpatrick} />
                                        <InfoItem label="Pantone Skintone" value={analysis.PantoneSkintone} />
                                        <InfoItem label="NARS Skin Tone" value={analysis.NARSSkinToneSystem} />
                                        <InfoItem label="L'Oreal Color" value={analysis.LOrealColorCode} />
                                        <InfoItem label="Color Me Beautiful" value={analysis.ColorMeBeautiful} />
                                        <InfoItem label="Munsell Color" value={analysis.MunsellColorSystem} />
                                        {/* boton para actualizar esa informcion */}
                                        {/* <div className="admin-panel-section-actions">
                                    <A href="/usuario/actualizar-informacion">
                                        <button className="btn btn-primary">
                                            Actualizar Información
                                        </button>
                                    </A>
                                </div> */}
                                    </React.Fragment>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}

const InfoItem: React.FC<{ icon?: React.ReactNode; label: string; value: string | number }> = ({
    icon,
    label,
    value,
}) => (
    <motion.div className="info-item" variants={itemVariants}>
        {icon && <span className="info-item-icon">{icon}</span>}
        <span className="info-item-label">{label}:</span>
        <span className="info-item-value">{value}</span>
    </motion.div>
)

export default UserAdminPanel