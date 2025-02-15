import ProductDetails from "./ProductDetails"

export default function ProductPage({ params }: { params: { id: string } }) {
  // En una aplicación real, aquí se obtendría el producto basado en el ID
  const product = {
    id: params.id,
    name: "Camiseta de Algodón Premium",
    price: 29.99,
    originalPrice: 39.99,
    description: "Camiseta de algodón 100% orgánico, perfecta para el uso diario. Suave al tacto y duradera.",
    images: [
      "/placeholder.svg?height=600&width=400",
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

  return <ProductDetails product={product} />
}

