export type TPaginated<K extends string, T> = Record<K, T[]> & {
  total: number
  skip: number
  limit: number
}
