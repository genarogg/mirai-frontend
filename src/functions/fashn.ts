interface PredictionOptions {
  image: string
  // Add other options as needed
}

interface APIResponse {
  id: string
  status: string
  // Add other response fields as needed
}

const API_KEY = "fa-N7mprfPDpW5n-l07KVTteshNrivQHraX6fygk"
const API_URL = "https://api.fashn.ai/v1"

export async function runPrediction(options: PredictionOptions): Promise<APIResponse> {
  const response = await fetch(`${API_URL}/run`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  })

  if (!response.ok) {
    throw new Error("Failed to start prediction")
  }

  return response.json()
}

export async function getPredictionStatus(id: string): Promise<APIResponse> {
  const response = await fetch(`${API_URL}/status/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to get prediction status")
  }

  return response.json()
}

