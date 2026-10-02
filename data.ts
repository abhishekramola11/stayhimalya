/*
  ============================================================
  STAY HIMALAYA — WEBSITE CONTENT
  Edit this file to add, change or remove homestays & destinations.
  - To ADD a stay: copy one { ... } block inside STAYS, paste it,
    give it a new unique id and change the text.
  - To REMOVE a stay: delete its whole { ... }, line.
  - photo = the Unsplash photo id (the part after "photo-" in the URL).
  ============================================================
*/
export const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export type Stay = {
  id: number
  name: string
  place: string
  state: 'Himachal' | 'Uttarakhand'
  photo: string
  price: number
  rating: number
  reviews: number
  wifi: number
  alt: string
  tags: string[]
  host: string
}

export const STAYS: Stay[] = [
  { id: 1, name: 'Deodar Loft', place: 'Old Manali', state: 'Himachal', photo: '1597167231350-d057a45dc868', price: 2400, rating: 4.92, reviews: 214, wifi: 100, alt: '2,050 m', tags: ['Workation', 'Snow view', 'Power backup'], host: 'Tenzin' },
  { id: 2, name: 'Meadow House', place: 'Chopta', state: 'Uttarakhand', photo: '1722067488346-c9bb68d4c1c1', price: 1800, rating: 4.88, reviews: 132, wifi: 50, alt: '2,680 m', tags: ['Workation', 'Trek base'], host: 'Kamla Devi' },
  { id: 3, name: 'Slate Roof Cottage', place: 'Munsiyari', state: 'Uttarakhand', photo: '1717054493682-ffe9e25fd82f', price: 2100, rating: 4.95, reviews: 98, wifi: 75, alt: '2,200 m', tags: ['Workation', 'Panchachuli view'], host: 'Harish' },
  { id: 4, name: 'Snowline Homestay', place: 'Kalpa, Kinnaur', state: 'Himachal', photo: '1620500450675-03f07b244f73', price: 2800, rating: 4.9, reviews: 176, wifi: 40, alt: '2,960 m', tags: ['Snow view', 'Apple orchard'], host: 'Dorje' },
  { id: 5, name: 'Valley Window Studio', place: 'Dharamkot', state: 'Himachal', photo: '1599493622108-f9471f8e9043', price: 1600, rating: 4.86, reviews: 301, wifi: 150, alt: '2,100 m', tags: ['Workation', 'Cafe nearby', 'Power backup'], host: 'Ritika' },
  { id: 6, name: 'Bugyal Farmhouse', place: 'Khirsu', state: 'Uttarakhand', photo: '1588305665522-1c6af1f69b09', price: 1500, rating: 4.83, reviews: 87, wifi: 60, alt: '1,700 m', tags: ['Workation', 'Farm meals', 'Pet friendly'], host: 'Bhagwati' },
]

export const FILTERS = ['All', 'Workation', 'Snow view', 'Power backup', 'Pet friendly', 'Trek base']

export const DESTINATIONS = [
  { name: 'Manali & Old Manali', state: 'HP', stays: 142, photo: '1712388430474-ace0c16051e2' },
  { name: 'Munsiyari', state: 'UK', stays: 38, photo: '1717054493651-0d5cf9add593' },
  { name: 'Kasol & Parvati', state: 'HP', stays: 76, photo: '1609920658906-8223bd289001' },
  { name: 'Chopta & Ukhimath', state: 'UK', stays: 41, photo: '1590388038591-70c84d11c645' },
  { name: 'Tirthan Valley', state: 'HP', stays: 54, photo: '1656437717503-971f67b6af21' },
]

