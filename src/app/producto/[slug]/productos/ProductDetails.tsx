"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShoppingCart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import ProductReviews from "./ProductReviews"
import VirtualTryOnModal from "./VirtualTryOnModal"
import AIGarmentModal from "./AIGarmentModal"
import ComoMeQuedaria from "../comoMeQuedaria"

import { URL_BACKEND } from "@env"

import SingleProductCard from '@components/views/singleProduct/singleProductCard/SingleProductCard'

interface Product {
  id: string
  name: string
  price: number
  slug: string
  originalPrice: number
  prenda: string
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  details: {
    material: string
    fit: string
    transparency: string
    elasticidad: string
    forro: string
    grosor: string
  }
  care: string[]
  measurements: {
    [size: string]: {
      busto: string
      largo: string
      hombro: string
    }
  }
  sku: string
  category: string
  tags: string[]
  reviews: Review[]
  averageRating: number
  comments: Comment[]
}

interface Review {
  id: number
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
}

interface Comment {
  id: number
  user: string
  avatar: string
  date: string
  content: string
}

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [showFitRecommendation, setShowFitRecommendation] = useState(false)
  const [isVirtualTryOnOpen, setIsVirtualTryOnOpen] = useState(false)
  const [isAIGarmentModalOpen, setIsAIGarmentModalOpen] = useState(false)
  const [base64Image, setBase64Image] = useState<string | null>(null)

  // Estados para la imagen del usuario proveniente del backend
  const [userImg, setUserImg] = useState<string | null>(null)
  const [userLoading, setUserLoading] = useState<boolean>(true)
  const [userError, setUserError] = useState<any>(null)

  // Convertir la imagen del producto a base64 (si es necesario)

  const convertToBase64 = async (url: string) => {
    console.log(url)
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }


  

  useEffect(() => {
  

    console.log(userImg)

    convertToBase64(product.images[0]).then(setBase64Image)
  }, [product.images])

 
  const fetchUserImage = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token no encontrado')
      }

      const response = await fetch(`${URL_BACKEND}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            query GetUser($token: String!) {
              getUser(token: $token) {
                data {
                  imgBase64
                }
              }
            }
          `,
          variables: { token },
        }),
      })

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`)
      }

      const json = await response.json()
      if (json.errors) {
        throw new Error(json.errors[0].message)
      }

      const userImg2 = json.data.getUser.data.imgBase64

      console.log(userImg2)
      setUserImg(userImg2)

    } catch (err: any) {
      console.error(err)
      setUserError(err)
    } finally {
      setUserLoading(false)
    }
  }

  useEffect(() => {
    fetchUserImage()
  }, [product.images])
  // Función para obtener el color de fondo según el color seleccionado
  const getBackgroundColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      Negro: "bg-[#000000]",
      "Gris muy oscuro": "bg-[#1a1a1a]",
      "Gris oscuro": "bg-[#2f2f2f]",
      Gris: "bg-[#808080]",
      "Gris claro": "bg-[#d3d3d3]",
      Blanco: "bg-[#ffffff]",
      "Rojo oscuro": "bg-[#8b0000]",
      Rojo: "bg-[#ff0000]",
      "Rojo claro": "bg-[#ff6666]",
      Salmón: "bg-[#ffa07a]",
      Fucsia: "bg-[#ff0080]",
      Rosa: "bg-[#ff00ff]",
      "Rosa claro": "bg-[#ffc0cb]",
      Magenta: "bg-[#ff00ff]",
      "Naranja oscuro": "bg-[#ff8c00]",
      Naranja: "bg-[#ffa500]",
      Amarillo: "bg-[#ffff00]",
      "Amarillo claro": "bg-[#ffff80]",
      Dorado: "bg-[#ffd700]",
      Beige: "bg-[#f5f5dc]",
      Crema: "bg-[#fffdd0]",
      "Marrón oscuro": "bg-[#654321]",
      Marrón: "bg-[#8b4513]",
      "Marrón claro": "bg-[#cd853f]",
      Cobre: "bg-[#b87333]",
      Caqui: "bg-[#c3b091]",
      "Verde oscuro": "bg-[#006400]",
      Verde: "bg-[#008000]",
      "Verde claro": "bg-[#90ee90]",
      "Verde lima": "bg-[#00ff00]",
      "Verde menta": "bg-[#98ff98]",
      "Verde esmeralda": "bg-[#50c878]",
      "Verde oliva": "bg-[#808000]",
      "Verde musgo": "bg-[#8a9a5b]",
      Cian: "bg-[#00ffff]",
      Turquesa: "bg-[#40e0d0]",
      Celeste: "bg-[#87ceeb]",
      "Azul claro": "bg-[#add8e6]",
      Azul: "bg-[#0000ff]",
      "Azul marino": "bg-[#000080]",
      "Azul oscuro": "bg-[#00008b]",
      "Azul índigo": "bg-[#4b0082]",
      "Azul pizarra": "bg-[#6a5acd]",
      Violeta: "bg-[#ee82ee]",
      Púrpura: "bg-[#800080]",
      "Morado oscuro": "bg-[#9400d3]",
      Lila: "bg-[#c8a2c8]",
      Lavanda: "bg-[#e6e6fa]",
      Granate: "bg-[#800000]",
      Plateado: "bg-[#c0c0c0]",
    }
    return colorMap[color] || "bg-gray-500"
  }

  const addToCart = () => {
    const item = {
      id: product.id,
      color: selectedColor,
      name: product.name,
      size: selectedSize,
      price: product.price,
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    cart.push(item)
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  const handleTryOnGarment = () => {
    console.log(userImg)

    //convierte userImg a base 64




    if (!userImg) {
      console.error("La foto del usuario no está disponible.")
      return
    }
    setIsAIGarmentModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <SingleProductCard product={product} />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-500">{product.sku}</p>
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-lg text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
            {product.price < product.originalPrice && (
              <Badge variant="secondary">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          <p className="text-gray-600">{product.description}</p>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Talla</h3>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover px-3 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Color</h3>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-2"
                >
                  {product.colors.map((color) => (
                    <div key={color}>
                      <RadioGroupItem
                        value={color}
                        id={`color-${color}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className={`flex items-center justify-center rounded-md border-2 border-muted ${getBackgroundColor(
                          color
                        )} px-3 py-2 hover:opacity-80 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary`}
                      >
                        <span className={color.toLowerCase() === "blanco" ? "text-black" : "text-white"}>
                          {color}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <ComoMeQuedaria
            showFitRecommendation={showFitRecommendation}
            setShowFitRecommendation={setShowFitRecommendation}
            handleTryOnGarment={handleTryOnGarment}
            slug={product.slug}
          />
          <Button className="w-full" onClick={addToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
          </Button>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="care">Cuidados</TabsTrigger>
              <TabsTrigger value="size">Tallas</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <h3 className="font-semibold">Especificaciones:</h3>
              <Table>
                <TableBody>
                  {Object.entries(product.details).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium capitalize">{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div>
                <h3 className="font-semibold mb-2">Etiquetas:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="care">
              <h3 className="font-semibold mb-2">Instrucciones de cuidado:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.care.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="size">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Talla</TableHead>
                    <TableHead>Busto</TableHead>
                    <TableHead>Largo</TableHead>
                    <TableHead>Hombro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(product.measurements).map(([size, measurements]) => (
                    <TableRow key={size}>
                      <TableCell className="font-medium">{size}</TableCell>
                      <TableCell>{measurements.busto}</TableCell>
                      <TableCell>{measurements.largo}</TableCell>
                      <TableCell>{measurements.hombro}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="mt-12">
        <ProductReviews reviews={product.reviews} averageRating={product.averageRating} />
      </div>
      <VirtualTryOnModal
        isOpen={isVirtualTryOnOpen}
        onClose={() => setIsVirtualTryOnOpen(false)}
        productName={product.name}
        productImage={base64Image}
      />
      {/*
        Se eliminó la sección de subida manual de foto ya que la imagen del usuario
        se obtiene directamente del backend.
      */}
      <AIGarmentModal
        isOpen={isAIGarmentModalOpen}
        onClose={() => setIsAIGarmentModalOpen(false)}
        userImage={userImg}
        productImage={base64Image}
        productName={product.name}
        prenda={product.prenda}
      />
    </div>
  )
}
