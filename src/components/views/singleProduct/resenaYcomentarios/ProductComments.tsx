"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: number
  user: string
  avatar: string
  date: string
  content: string
}

interface ProductCommentsProps {
  comments: Comment[]
}

export default function ProductComments({ comments: initialComments }: ProductCommentsProps) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        user: "Usuario",
        avatar: "/placeholder.svg?height=40&width=40",
        date: new Date().toLocaleDateString(),
        content: newComment.trim(),
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comentarios</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.user} />
              <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{comment.user}</h3>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit">Publicar comentario</Button>
      </form>
    </div>
  )
}

