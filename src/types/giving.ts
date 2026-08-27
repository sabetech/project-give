export type GivingType = 'offering' | 'tithe' | 'pledge'

export type TGiving = {
  id: string
  amount: number
  type: GivingType
  date: string
  description?: string
  user: string
  created: string
  updated: string
  collectionId: string
  collectionName: string
}
