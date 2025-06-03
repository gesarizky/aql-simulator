# 🧪 AQL Sampling Plan Simulator

AQL (Acceptable Quality Limit) Sampling Plan Simulator adalah REST API sederhana berbasis Node.js + Express yang mensimulasikan hasil inspeksi berdasarkan ukuran lot, level inspeksi, dan nilai AQL. Sistem ini menggunakan tabel sampling standar dan mengembalikan jumlah sampel yang diperlukan, batas penerimaan (`acceptanceNumber`), dan batas penolakan (`rejectionNumber`).

## 📦 Fitur

* Hitung jumlah sampel yang diperlukan berdasarkan ukuran lot, level inspeksi, dan nilai AQL.
* Mendukung Seluruh level inspeksi.
* Menggunakan tabel standar sampling code & plan.
* Respons JSON mudah dibaca.

---

## 🚀 Instalasi

1. **Clone repositori ini**

   ```bash
   git clone https://github.com/gesarizky/aql-simulator.git
   cd aql-simulator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Jalankan server**

   ```bash
   npm run start
   ```

   Server akan berjalan di `http://localhost:3000`.

---

## 📡 Endpoint API

### `POST /simulate-aql`

Simulasikan sampling plan berdasarkan input.

#### 🧾 Request Body

```json
{
  "lotSize": 2000,
  "inspectionLevel": "II",
  "aql": "4"
}
```

* `lotSize` (Number): Ukuran lot yang ingin diinspeksi.
* `inspectionLevel` (String): Kode level inspeksi.
* `aql` (Number): Nilai AQL yang digunakan (contoh: 0.65, 1.0, 2.5, dll).

#### ✅ Response Sukses

```json
{
  "lotSize": 2000,
  "inspectionLevel": "II",
  "aql": 4,
  "sampleSizeCode": "K",
  "sampleSize": 125,
  "acceptanceNumber": 10,
  "rejectionNumber": 11
}
```

#### ⚠️ Response Error

```json
{
  "error": "lotSize, inspectionLevel, and aql are required"
}
```

---

## 📁 Struktur Proyek

```
├── index.js                 // File utama server Express
├── sampleCodeTable.js      // Tabel ukuran lot vs kode sampling
├── samplingPlanTable.js    // Tabel kode sampling vs AQL plan
└── README.md               // Dokumentasi proyek
```

---

## 🔧 Catatan Tambahan

* Tabel sampling dapat diperluas sesuai kebutuhan Anda.
* Validasi data input belum sepenuhnya kuat — gunakan middleware tambahan seperti `Joi` atau `express-validator` untuk produksi.

---
