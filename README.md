# Tugas-Akhir-Grafkom

# README.md

# Simulasi Navigasi Objek pada Peta Spasial Perkotaan

## Deskripsi

Aplikasi ini merupakan simulasi navigasi kendaraan berbasis web menggunakan Leaflet dan OpenStreetMap. Pengguna dapat memilih titik awal dan tujuan pada peta, kemudian sistem akan menghasilkan rute perjalanan secara otomatis menggunakan layanan OSRM (Open Source Routing Machine).

Kendaraan divisualisasikan sebagai marker yang bergerak mengikuti rute hasil perhitungan. Sistem juga menampilkan jalur yang telah dilalui dan jalur yang masih tersisa selama simulasi berlangsung.

---

## Fitur

### Penentuan Titik Awal dan Tujuan

Pengguna dapat menentukan:

* Titik awal perjalanan (Start)
* Titik tujuan perjalanan (Tujuan)

dengan cara mengklik lokasi pada peta.

---

### Perhitungan Rute Otomatis

Rute dihitung menggunakan:

* OpenStreetMap
* Leaflet Routing Machine
* OSRM Routing Service

Rute yang dihasilkan mengikuti jaringan jalan nyata.

---

### Simulasi Pergerakan Kendaraan

Fitur simulasi meliputi:

* Start simulasi
* Pause simulasi
* Reset simulasi
* Animasi kendaraan mengikuti rute
* Interpolasi koordinat untuk pergerakan yang halus

---

### Visualisasi Jalur

Sistem menampilkan dua jenis jalur:

#### Jalur Belum Dilalui

Ditampilkan dengan:

* Warna merah
* Garis utuh

#### Jalur Sudah Dilalui

Ditampilkan dengan:

* Warna biru
* Garis putus-putus

---

### Reset Marker

Marker Start dan Tujuan dapat dihapus melalui tombol reset atau dengan mengklik marker yang bersangkutan.

---

### Random Lokasi

Fitur Random Lokasi memungkinkan pengguna berpindah ke berbagai kota dunia secara acak tanpa perlu melakukan pencarian manual.

Daftar lokasi mencakup:

* Jakarta
* Surabaya
* Bali
* Singapura
* Tokyo
* London
* New York
* Paris
* Berlin
* Sydney
* Los Angeles
* Chicago
* San Francisco
* Moskow
* Mumbai
* New Delhi
* São Paulo
* Shanghai
* Beijing
* Bangkok

---

## Struktur Tampilan

### Header

Menampilkan judul aplikasi:

```text
Simulasi Navigasi Objek pada Peta Spasial Perkotaan Berbasis
Interpolasi Koordinat dan Perhitungan Geospasial 2D
```

serta instruksi penggunaan.

---

### Tombol Kontrol

| Tombol           | Fungsi                            |
| ---------------- | --------------------------------- |
| ▶ Start          | Memulai simulasi                  |
| ⏸ Pause          | Menghentikan simulasi sementara   |
| 🔄 Reset         | Mengulang simulasi dari awal      |
| 🧹 Reset Markers | Menghapus seluruh marker dan rute |
| 🌍 Random Lokasi | Memindahkan peta ke lokasi acak   |

---

## Alur Penggunaan

### 1. Pilih Titik Awal

Klik lokasi pertama pada peta.

Marker Start akan muncul.

### 2. Pilih Titik Tujuan

Klik lokasi kedua pada peta.

Marker Tujuan akan muncul.

### 3. Perhitungan Rute

Sistem akan:

* Menghubungi layanan OSRM
* Menghasilkan rute tercepat
* Menampilkan jalur pada peta

### 4. Jalankan Simulasi

Klik tombol:

```text
▶ Start
```

Kendaraan akan bergerak mengikuti rute.

### 5. Hentikan Sementara

Klik:

```text
⏸ Pause
```

untuk menghentikan animasi tanpa menghilangkan progres.

### 6. Lanjutkan Simulasi

Klik kembali:

```text
▶ Start
```

untuk melanjutkan perjalanan.

### 7. Reset Simulasi

Klik:

```text
🔄 Reset
```

untuk mengembalikan kendaraan ke titik awal.

### 8. Bersihkan Peta

Klik:

```text
🧹 Reset Markers
```

untuk menghapus seluruh data simulasi.

---

## Library yang Digunakan

### Leaflet

Digunakan untuk menampilkan peta interaktif.

```html
https://unpkg.com/leaflet@1.9.4
```

### Leaflet Routing Machine

Digunakan untuk perhitungan rute.

```html
https://unpkg.com/leaflet-routing-machine
```

### OpenStreetMap

Sebagai penyedia tile peta.

### OSRM

Digunakan sebagai layanan routing.

```text
https://router.project-osrm.org
```

---

## File Proyek

```text
project/
│
├── index.html
├── routing.js
├── style.css
├── logo.png
└── README.md
```

### index.html

Mengelola:

* Tampilan halaman
* Peta Leaflet
* Marker Start dan Tujuan
* Routing OSRM
* Tombol kontrol

### routing.js

Mengelola:

* Animasi kendaraan
* Interpolasi koordinat
* Perhitungan jarak
* Perhitungan waktu tempuh
* Algoritma A*

### style.css

Mengatur:

* Layout halaman
* Tampilan tombol
* Tampilan peta
* Tipografi

### logo.png

Ikon halaman web.

---

## Teknologi

* HTML5
* CSS3
* JavaScript ES6
* Leaflet.js
* OpenStreetMap
* Leaflet Routing Machine
* OSRM Routing Service

---

## Pengembangan Selanjutnya

Fitur yang dapat ditambahkan:

* Rotasi kendaraan mengikuti arah jalan.
* Kontrol kecepatan simulasi.
* Statistik perjalanan real-time.
* Multi kendaraan.
* Simulasi lalu lintas.
* Integrasi algoritma A* penuh tanpa OSRM.
* Penyimpanan rute ke database.
* Visualisasi node dan graph jalan.

---

## Lisensi

Proyek ini dibuat untuk kebutuhan pembelajaran simulasi navigasi kendaraan, interpolasi koordinat, perhitungan geospasial dua dimensi, serta implementasi algoritma pencarian jalur pada sistem informasi geografis berbasis web.
