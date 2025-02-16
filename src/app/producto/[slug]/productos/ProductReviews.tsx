"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Review {
  id: number
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
}

interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
}

const STORAGE_KEY = "product_reviews"
const USER_REVIEWED_KEY = "user_has_reviewed"

export default function ProductReviews({
  reviews: initialReviews,
  averageRating: initialAverageRating,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState<number>(5)
  const [hasUserReviewed, setHasUserReviewed] = useState(false)
  const [averageRating, setAverageRating] = useState(initialAverageRating)

  // Cargar reseñas del localStorage al iniciar
  useEffect(() => {
    const storedReviews = localStorage.getItem(STORAGE_KEY)
    const userReviewed = localStorage.getItem(USER_REVIEWED_KEY)

    if (storedReviews) {
      const parsedReviews = JSON.parse(storedReviews)
      setReviews([...initialReviews, ...parsedReviews])

      // Recalcular el promedio incluyendo las reseñas guardadas
      const totalRating = [...initialReviews, ...parsedReviews].reduce((acc, review) => acc + review.rating, 0)
      const newAverage = totalRating / [...initialReviews, ...parsedReviews].length
      setAverageRating(newAverage)
    } else {
      setReviews(initialReviews)
    }

    if (userReviewed === "true") {
      setHasUserReviewed(true)
    }
  }, [initialReviews])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() && !hasUserReviewed) {
      const review: Review = {
        id: Date.now(),
        user: "Usuario",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: newRating,
        date: new Date().toLocaleDateString(),
        comment: newComment.trim(),
      }

      // Obtener reseñas existentes del localStorage
      const storedReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
      const updatedReviews = [...storedReviews, review]

      // Guardar en localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews))
      localStorage.setItem(USER_REVIEWED_KEY, "true")

      // Actualizar estado
      setReviews([...initialReviews, ...updatedReviews])
      setHasUserReviewed(true)
      setNewComment("")
      setNewRating(5)

      // Recalcular promedio
      const totalRating = [...initialReviews, ...updatedReviews].reduce((acc, review) => acc + review.rating, 0)
      const newAverage = totalRating / [...initialReviews, ...updatedReviews].length
      setAverageRating(newAverage)
    }
  }

  const totalReviews = reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => reviews.filter((review) => review.rating === rating).length)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Reseñas de clientes</h2>
          <div className="flex items-center space-x-2">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">{totalReviews} reseñas</p>
            </div>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="flex items-center">
                <span className="w-12 text-sm text-gray-600">{rating} estrellas</span>
                <Progress value={(ratingCounts[index] / totalReviews) * 100} className="h-2 w-full max-w-[200px]" />
                <span className="w-12 text-sm text-gray-600 text-right">{ratingCounts[index]}</span>
              </div>
            ))}
          </div>
        </div>
        {hasUserReviewed ? (
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-muted-foreground">Ya has publicado una reseña para este producto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <h3 className="font-semibold">Agregar una reseña</h3>
            <div className="space-y-2">
              <Label>Calificación</Label>
              <RadioGroup
                defaultValue="5"
                value={String(newRating)}
                onValueChange={(value) => setNewRating(Number(value))}
                className="flex space-x-2"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-1">
                    <RadioGroupItem value={String(rating)} id={`rating-${rating}`} className="sr-only peer" />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="cursor-pointer peer-data-[state=checked]:text-yellow-400"
                    >
                      <Star className="w-6 h-6 peer-data-[state=checked]:fill-yellow-400" />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Textarea
              placeholder="Escribe tu reseña..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="submit">Publicar reseña</Button>
          </form>
        )}
      </div>
      <div className="space-y-6">
        <h3 className="font-semibold">Todas las reseñas y comentarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Avatar>
                  <AvatarImage src={review.avatar} alt={review.user} />
                  <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.user}</p>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

