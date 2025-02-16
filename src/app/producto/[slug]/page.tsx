// app/product/[slug]/page.tsx
import React from 'react';
import SingleProduct from '@components/views/singleProduct/SingleProduct';

import { URL_STRIPI_GQL } from "@env"

const PRODUCT_QUERY = `
 query ($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
    titulo
      base_price
    discount_percentage
    description
    img_main {
      url
      name
    }
    img_secundary {
      url
      name
    }
    imgs {
      url
    }
    slug
    tallas {
      color
      talla
    }
    especificaciones {
      fit
      forro
      grosor
      Materiales
      transparency
    }
    categorias {
      nombre
    }
    etiquetas {
      etiqueta
    }
    }
  }
`;

interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {

  // const query = JSON.stringify({
  //   query: PRODUCT_QUERY,
  //   variables: { slug: params.slug },
  // })


  // // Realizamos la consulta a Strapi (asegúrate de tener la URL en una variable de entorno)
  // const res = await fetch(URL_STRIPI_GQL, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: query

  // })

  // if (!res.ok) {
  //   console.log(res)
  //   throw new Error('Error al obtener los datos del producto');

  // }

  // const { data } = await res.json();

  // const product = data.products[0];

  // const ultimateData = {
  //   product,

  // }


  const ultimateData = {
    id: 2,
    name: "Camiseta de Algodón Premium",
    price: 29.99,
    originalPrice: 39.99,
    description: "Camiseta de algodón 100% orgánico, perfecta para el uso diario. Suave al tacto y duradera.",
    images: [
      "https://thumbs.dreamstime.com/b/hermosa-modelo-de-fitness-posando-con-ropa-deportiva-la-mujer-atl%C3%A9tica-muestra-el-pulgar-arriba-satisfecho-los-resultados-del-161012255.jpg",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blanco", "Negro", "Azul", "Rojo"],
    details: {
      material: "100% Algodón orgánico",
      fit: "Regular",
      transparency: "Ligeramente transparente",
      elasticidad: "Ligeramente elástico",
      forro: "No",
      grosor: "Medio",
    },
    care: [
      "Lavar a máquina a máx. 30ºC",
      "No usar blanqueador",
      "Planchar a temperatura media",
      "No lavar en seco",
      "No usar secadora",
    ],
    measurements: {
      XS: { busto: "84 cm", largo: "64 cm", hombro: "36 cm" },
      S: { busto: "88 cm", largo: "65 cm", hombro: "37 cm" },
      M: { busto: "92 cm", largo: "66 cm", hombro: "38 cm" },
      L: { busto: "96 cm", largo: "67 cm", hombro: "39 cm" },
      XL: { busto: "100 cm", largo: "68 cm", hombro: "40 cm" },
    },
    sku: "TS-001-PR",
    category: "Camisetas",
    tags: ["básico", "casual", "verano"],
    reviews: [
      {
        id: 1,
        user: "María G.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "15 mayo 2023",
        comment: "¡Excelente calidad! La tela es suave y cómoda. Definitivamente compraré más.",
      },
      {
        id: 2,
        user: "Carlos R.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2 junio 2023",
        comment: "Buen producto, pero un poco grande para mi talla habitual. Recomiendo pedir una talla menos.",
      },
      {
        id: 3,
        user: "Laura M.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "20 junio 2023",
        comment: "Me encanta esta camiseta. El color es exactamente como se muestra en la imagen.",
      },
    ],
    averageRating: 4.7,
    comments: [
      {
        id: 1,
        user: "Juan P.",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "10 julio 2023",
        content: "¿Alguien sabe si esta camiseta encoge al lavarla?",
      },
      {
        id: 2,
        user: "Ana S.",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "11 julio 2023",
        content:
          "Yo la he lavado varias veces y no ha encogido. Sigue las instrucciones de lavado y no tendrás problemas.",
      },
      {
        id: 3,
        user: "Pedro L.",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "12 julio 2023",
        content: "¿Tienen planes de sacar más colores? Me encantaría verla en verde.",
      },
    ],
  }


  if (!ultimateData) {
    // Opcional: Puedes renderizar una página 404 personalizada
    return <p>Producto no encontrado</p>;
  }

  // Nota: Es posible que debas adaptar la estructura del objeto "product" 
  // para que coincida con lo que espera tu componente SingleProduct.
  return <SingleProduct product={ultimateData} />;

}
