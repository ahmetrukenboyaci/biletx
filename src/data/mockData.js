export const mockEvents = [
  {
    id: 1,
    title: "Rock Festivali 2026",
    description: "Yılın en büyük rock festivali! Yerli ve yabancı birçok sanatçı aynı sahneyi paylaşacak.",
    image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=450&fit=crop",
    event_date: "2026-07-15T19:00:00",
    venue: {
      id: 1,
      name: "İstanbul Arena",
      address: "Huzur Mah. Maslak Ayazağa Cad. No:4 Sarıyer/İstanbul"
    },
    categories: [
      { id: 1, name: "Genel Giriş", price: 250 },
      { id: 2, name: "Protokol", price: 500 },
      { id: 3, name: "VIP", price: 750 }
    ]
  },
  {
    id: 2,
    title: "Klasik Müzik Konseri",
    description: "İstanbul Devlet Senfoni Orkestrası ile unutulmaz bir akşam.",
    image_url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=450&fit=crop",
    event_date: "2026-06-20T20:00:00",
    venue: {
      id: 2,
      name: "Cemal Reşit Rey Konser Salonu",
      address: "Harbiye Mah. Darülbedayi Cad. Şişli/İstanbul"
    },
    categories: [
      { id: 4, name: "Balkon", price: 150 },
      { id: 5, name: "Salon", price: 300 }
    ]
  },
  {
    id: 3,
    title: "Stand-Up Gösterisi",
    description: "Türkiye'nin en sevilen stand-up sanatçıları bir arada!",
    image_url: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=450&fit=crop",
    event_date: "2026-05-10T21:00:00",
    venue: {
      id: 3,
      name: "Zorlu PSM",
      address: "Levazım Mah. Koru Sok. No:2 Beşiktaş/İstanbul"
    },
    categories: [
      { id: 6, name: "Genel Giriş", price: 180 },
      { id: 7, name: "Premium", price: 350 }
    ]
  },
  {
    id: 4,
    title: "Caz Festivali",
    description: "Dünyaca ünlü caz sanatçıları İstanbul'da!",
    image_url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=450&fit=crop",
    event_date: "2026-08-05T20:30:00",
    venue: {
      id: 4,
      name: "Babylon",
      address: "Şehbender Sok. No:3 Asmalımescit, Beyoğlu/İstanbul"
    },
    categories: [
      { id: 8, name: "Ayakta", price: 200 },
      { id: 9, name: "Masa", price: 400 }
    ]
  }
]

export const generateSeatPlan = (eventId, categoryId) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const seatsPerRow = 15
  const seats = []
  let seatId = 1

  rows.forEach(row => {
    for (let number = 1; number <= seatsPerRow; number++) {
      seats.push({
        id: seatId++,
        row: row,
        number: number,
        isBooked: Math.random() > 0.7
      })
    }
  })

  return seats
}

export const mockPaymentResponse = {
  code: 201,
  status: "success",
  message: "Biletiniz başarıyla oluşturuldu."
}
