import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

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

export default function ProductReviews({ reviews, averageRating }: ProductReviewsProps) {
  const totalReviews = reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => reviews.filter((review) => review.rating === rating).length)

  return (
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
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.user} />
                <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{review.user}</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

