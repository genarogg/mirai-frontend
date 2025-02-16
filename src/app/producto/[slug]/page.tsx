// app/product/[slug]/page.tsx
import React from 'react';
import SingleProduct from '@components/views/singleProduct/SingleProduct'
import ProductDetails from './productos/ProductDetails';
import Layout from '@components/layout/public/Layout'
import HeaderGhost from '@components/layout/public/header/HeaderGhost'
import { URL_STRIPI_GQL, URL_STRIPI } from "@env"

const PRODUCT_QUERY = `
 query ($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
    titulo
      base_price
    discount_percentage
    description
    codigo
    prenda
    img_main {
      url
      
    }
    img_secundary {
      url
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

  const query = JSON.stringify({
    query: PRODUCT_QUERY,
    variables: { slug: params.slug },
  })


  // Realizamos la consulta a Strapi (asegúrate de tener la URL en una variable de entorno)
  const res = await fetch(URL_STRIPI_GQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: query

  })

  if (!res.ok) {
    console.log(res)
    throw new Error('Error al obtener los datos del producto');

  }

  const { data } = await res.json();

  const product = data.products[0];

  console.log("product", product)

  const imgs: any = [
    URL_STRIPI + product.img_main.url,
    URL_STRIPI + product.img_secundary.url,
    ...product.imgs.map((img: any) => URL_STRIPI +  img.url)
  ];

  function transformTallas(tallas: { color: string, talla: string }[]) {
    const sizes = tallas.map(t => t.talla);
    const colors = tallas.map(t => t.color.split('_')[0]);
    return { sizes, colors };
  }

  const { sizes, colors } = transformTallas(product.tallas);

  console.log()

  const ultimateDataStatica = {
    id: "1",
    name: product.titulo,
    price: product.base_price,
    originalPrice: product.base_price + (product.base_price * product.discount_percentage / 100),
    description: product.description[0].children[0].text,
    images: imgs,
    sizes,
    colors,
    prenda: product.prenda,
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
    sku: `${product.codigo} - ${product.prenda}`,
    category: product.categorias.map((c: any) => c.nombre),
    tags: product.etiquetas.map((e: any) => e.etiqueta),
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


  if (!ultimateDataStatica) {
    // Opcional: Puedes renderizar una página 404 personalizada
    return <p>Producto no encontrado</p>;
  }



  return (
    <Layout>
      <HeaderGhost />
      <ProductDetails product={ultimateDataStatica} />
    </Layout>
  )
}
