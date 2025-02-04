import { gql } from '@apollo/client';

const GET_USER_QUERY = gql`
  query ($token: String!) {
    getUser(token: $token) {
      message
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
`;

export default GET_USER_QUERY;