"use client";
import React, { useEffect, useState } from "react";
import UserAdminPanel from "@components/views/usuario/UserAdminPanel";

import Spinner from "@/components/layout/public/spinner/Spinner";

import { URL_BACKEND } from "@env";

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
};

export default function Home() {
  const [data2, setData] = useState(dataInitial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el token desde localStorage dentro del useEffect
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        // Realizar la petición a la API GraphQL (ajusta la URL según corresponda)
        const response = await fetch(URL_BACKEND + "/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Se incluye el token en el header si es necesario
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
              query GetUser($token: String!) {
                getUser(token: $token) {
                  data {
                    id
                    name
                    lastName
                    email
                    subscription
                    createdAt
                    updatedAt
                    role
                    isActive
                    isVerified
                    profileImage
                    imgForChange
                    notificationsEnabled
                    lastLogin
                    totalOrders
                    preferredLanguage
                    preferredCurrency
                    referralCode
                    referrerId
                    AnalisisFacial {
                      id
                      colorDePiel
                      colorDePelo
                      colorDeOjos
                      tonoDePiel
                      subtonoDePiel
                      estacionDelAno
                      tipoDeRostro
                      sistemaFitzpatrick
                      PantoneSkintone
                      NARSSkinToneSystem
                      LOrealColorCode
                      ColorMeBeautiful
                      MunsellColorSystem
                    }
                    userProfile {
                      id
                      phoneNumber
                      address
                      city
                      state
                      postalCode
                      country
                      dateOfBirth
                      etnia
                      idiomas
                      sexo
                      altura
                      peso
                      tallaDeRopa
                      edad
                    }
                  }
                }
              }
            `,
            variables: { token },
          }),
        });

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }

        const json = await response.json();
        if (json.errors) {
          throw new Error(json.errors[0].message);
        }

        setData(json.data.getUser.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />;


  return (
    <main>
      <UserAdminPanel userData={data2} />
    </main>
  );
}
