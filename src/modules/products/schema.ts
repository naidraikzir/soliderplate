import { object, string, number, type InferOutput } from 'valibot'

export const productSchema = object({
  id: number(),
  title: string(),
  description: string(),
  price: number(),
  thumbnail: string(),
})

export type TProduct = InferOutput<typeof productSchema>
