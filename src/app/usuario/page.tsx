"use client"
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_USER_QUERY } from '@query';

import UserAdminPanel from "@components/views/usuario/UserAdminPanel"

const dataInitial = {
  id: 0,
  name: "",
  lastName: "",
  email: "",
  subscription: false,
  createdAt: "",
  updatedAt: "",
  role: "customer",
  isActive: true,
  isVerified: false,
  profileImage: "65631c11e499687c.jpg",
  imgForChange: "18ff1ef34c68357b.webp",
  notificationsEnabled: true,
  lastLogin: null,
  totalOrders: 0,
  preferredLanguage: "es",
  preferredCurrency: "USD",
  referralCode: null,
  referrerId: null,
  AnalisisFacial: [
    {
      id: 1,
      colorDePiel: "blanco",
      colorDePelo: "rubio",
      colorDeOjos: "azul",
      tonoDePiel: "clara",
      subtonoDePiel: "rosado",
      estacionDelAno: "",
      tipoDeRostro: "ovalado",
      sistemaFitzpatrick: "III",
      PantoneSkintone: "233C",
      NARSSkinToneSystem: "I",
      LOrealColorCode: "Ivory",
      ColorMeBeautiful: "Fair",
      MunsellColorSystem: "10YR 8/4",
    },
  ],
  userProfile: [
    {
      id: 1,
      phoneNumber: "0412-7554970",
      address: "8440 NW 66th St.",
      city: "Maracay",
      state: "Aragua",
      postalCode: "2126",
      country: "Venezuela",
      dateOfBirth: "850089600000",
      etnia: "latino",
      idiomas: "spanish",
      sexo: "male",
      altura: "179",
      peso: "85",
      tallaDeRopa: "xl",
      edad: 29,
    },
  ],
}

export default function Home() {
  const [data2, setData] = useState(dataInitial);

  const token = localStorage.getItem('token');

  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { token },
  });

  useEffect(() => {
    if (data) {
      setData(data.getUser.data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <UserAdminPanel userData={data2} />
    </main>
  )
}

