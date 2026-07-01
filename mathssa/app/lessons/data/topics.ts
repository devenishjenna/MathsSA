export interface Topic {
  id: number
  section: string
  name: string
  slug: string
  isDone: boolean
}

export const grade10Topics: Topic[] = [
  { id: 1, name: 'What is a function?', slug: 'what-is-a-function', section: 'Functions', isDone: true },
  { id: 2, name: 'Straight line graphs', slug: 'straight-line-graphs', section: 'Functions', isDone: false },
  { id: 3, name: 'Parabolas', slug: 'parabolas', section: 'Functions', isDone: false },
  { id: 4, name: 'Hyperbolas', slug: 'hyperbolas', section: 'Functions', isDone: false },
  { id: 5, name: 'Exponential graphs', slug: 'exponential-graphs', section: 'Functions', isDone: false }
]