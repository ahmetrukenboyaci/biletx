# Event Ticket Selling System

Etkinlik bilet satış sistemi - Vue 3 ile geliştirilmiştir.

## Teknolojiler

- Vue 3 (Composition API)
- Vue Router 4
- Vuex 4
- TailwindCSS 3
- Axios
- Vite

## Kurulum

```bash
pnpm install
```

**.env dosyası oluşturun:**
```bash
VITE_USE_MOCK=true
```

## Geliştirme

```bash
pnpm dev
```

Tarayıcıda `http://localhost:5173/` adresini açın.

## Build

```bash
pnpm build
```

## Mock Data vs Real API

Proje iki modda çalışabilir:

### 1. Mock Data Mode (Önerilen)
API limiti olmadan local mock data ile çalışır.

`.env` dosyasında:
```
VITE_USE_MOCK=true
```

### 2. Real API Mode
Postman mock API kullanır (aylık 1000 call limiti var).

`.env` dosyasında:
```
VITE_USE_MOCK=false
```

## Özellikler

- Etkinlik listeleme
- Etkinlik detay görüntüleme
- Kategori seçimi
- Koltuk seçimi (manuel ve otomatik)
- Zoom özelliği
- Ödeme işlemi
- Form validasyonu
- Responsive tasarım

## API

Base URL: `https://d706d748-0586-4c2b-9d30-288f5d3b0630.mock.pstmn.io`

### Endpoints

- `GET /events` - Etkinlik listesi
- `GET /events/{eventId}` - Etkinlik detayı
- `GET /seat-plans/{eventId}/{eventCategoryId}` - Koltuk planı
- `POST /payment` - Ödeme işlemi
