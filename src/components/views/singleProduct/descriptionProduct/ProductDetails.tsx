"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Shirt } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import ProductReviews from "../resenaYcomentarios/ProductReviews"
import ProductComments from "../resenaYcomentarios/ProductComments"
import VirtualTryOnModal from "./VirtualTryOnModal"

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
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
  const [currentImage, setCurrentImage] = useState(0)
  const [showFitRecommendation, setShowFitRecommendation] = useState(false)
  const [isVirtualTryOnOpen, setIsVirtualTryOnOpen] = useState(false)

  // Función para obtener el color de fondo basado en el color seleccionado
  const getBackgroundColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      Blanco: "bg-white",
      Negro: "bg-black",
      Azul: "bg-blue-500",
      Rojo: "bg-red-500",
      // Añade más colores según sea necesario
    }
    return colorMap[color] || "bg-gray-500" // Color por defecto si no se encuentra
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[currentImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative w-20 h-20 rounded-md overflow-hidden ${
                  index === currentImage ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-500">{product.sku}</p>
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
            <p className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
            <Badge variant="secondary">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</Badge>
          </div>
          <p className="text-gray-600">{product.description}</p>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Talla</h3>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
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
                <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div key={color}>
                      <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${color}`}
                        className={`flex items-center justify-center rounded-md border-2 border-muted ${getBackgroundColor(color)} px-3 py-2 hover:opacity-80 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary`}
                      >
                        <span className={color.toLowerCase() === "blanco" ? "text-black" : "text-white"}>{color}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowFitRecommendation(!showFitRecommendation)}
            >
              ¿Cómo me quedaría?
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setIsVirtualTryOnOpen(true)}>
              <Shirt className="mr-2 h-4 w-4" />
              Probarme la prenda
            </Button>
          </div>

          {showFitRecommendation && (
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </CardContent>
            </Card>
          )}

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductReviews reviews={product.reviews} averageRating={product.averageRating} />
        <ProductComments comments={product.comments} />
      </div>
      <VirtualTryOnModal
        isOpen={isVirtualTryOnOpen}
        onClose={() => setIsVirtualTryOnOpen(false)}
        productName={product.name}
        productImage={product.images[0]}
      />
    </div>
  )
}

