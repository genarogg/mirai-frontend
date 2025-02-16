export type Category = "tops" | "bottoms" | "one-pieces"
export type Mode = "performance" | "balanced" | "quality"
export type Status = "starting" | "in_queue" | "processing" | "completed" | "failed"

export interface APIResponse {
  id: string
  status?: Status
  output?: string[]
  error: string | null
}

export interface PredictionOptions {
  model_image: string
  garment_image: string
  category: Category
  nsfw_filter?: boolean
  cover_feet?: boolean
  adjust_hands?: boolean
  restore_background?: boolean
  restore_clothes?: boolean
  mode?: Mode
  seed?: number
  num_samples?: number
}

