# Sistem Informasi Manajemen Perjanjian Kerjasama Perguruan Tinggi

Sistem Informasi Manajemen Perjanjian Kerjasama Perguruan Tinggi adalah aplikasi berbasis web yang dirancang untuk membantu pengelolaan data kerja sama institusi secara terpusat, terstruktur, dan terukur. Sistem ini mendukung proses pencatatan mitra, pengelolaan fakultas dan program studi, monitoring status kerja sama, dokumentasi implementasi, serta visualisasi statistik kerja sama dalam bentuk grafik.

Aplikasi ini dibangun dengan arsitektur **separated frontend-backend**, menggunakan **CodeIgniter 4** sebagai backend API dan **React + TypeScript** sebagai frontend modern. Sistem juga mengimplementasikan **JWT Authentication** untuk keamanan akses dan **Chart.js** untuk kebutuhan dashboard visualisasi data. 

---

## Fitur Utama

- Autentikasi pengguna menggunakan JWT
- Manajemen user, role, dan hak akses halaman
- Manajemen data fakultas, program studi, dosen, dekan, dan kontak
- Manajemen data organisasi/mitra kerja sama
- Pengelolaan data perjanjian kerja sama
- Monitoring status kerja sama
- Pencatatan implementasi kerja sama
- Upload dan manajemen dokumentasi kerja sama
- Statistik dan grafik kerja sama per bulan dan per tahun
- Dashboard monitoring berbasis visualisasi data

---

## Teknologi yang Digunakan

### Backend
- **CodeIgniter 4**
- **PHP**
- **JWT Authentication**
- RESTful API

### Frontend
- **React**
- **TypeScript**
- **Chart.js**
- Axios / Fetch API
- React Router
- State Management sesuai kebutuhan proyek

### Lainnya
- JSON Web Token (JWT) untuk otorisasi
- Integrasi grafik untuk dashboard analitik
- Arsitektur client-server terpisah

---

## Arsitektur Sistem

Sistem ini menggunakan pendekatan **frontend-backend terpisah**, di mana:

- **Backend** berfungsi sebagai penyedia REST API
- **Frontend** berfungsi sebagai antarmuka pengguna
- Komunikasi dilakukan melalui HTTP request dengan format JSON
- Endpoint tertentu dilindungi menggunakan **Bearer Token JWT**

---

## Modul Sistem

### 1. Autentikasi
Modul autentikasi digunakan untuk proses login dan validasi identitas pengguna.

- Login pengguna
- Mendapatkan data user berdasarkan token

### 2. Manajemen Pengguna
Modul ini digunakan untuk mengelola akun pengguna sistem.

- Tambah user
- Ubah user
- Hapus user
- Lihat daftar user

### 3. Manajemen Role dan Hak Akses
Digunakan untuk mengatur peran pengguna dan akses terhadap halaman tertentu.

- Kelola role
- Kelola halaman akses
- Kontrol otorisasi berdasarkan role

### 4. Manajemen Data Master
Meliputi data dasar yang digunakan dalam sistem:

- Fakultas
- Program Studi
- Dosen
- Dekan
- Kontak
- Organisasi/Mitra
- Tipe dokumen

### 5. Manajemen Kerja Sama
Modul inti untuk mengelola data perjanjian kerja sama.

- Menambah kerja sama
- Mengubah data kerja sama
- Menghapus kerja sama
- Menampilkan daftar dan detail kerja sama
- Filter status kerja sama
- Menampilkan kerja sama berdasarkan program studi

### 6. Implementasi Kerja Sama
Digunakan untuk mencatat realisasi atau implementasi dari kerja sama yang sudah dibuat.

- Tambah implementasi
- Update implementasi
- Hapus implementasi
- Statistik implementasi

### 7. Dokumentasi
Digunakan untuk menyimpan dokumen pendukung atau bukti pelaksanaan kerja sama.

- Upload dokumentasi
- Update dokumentasi
- Hapus dokumentasi
- Tampilkan daftar dokumentasi

### 8. Dashboard dan Statistik
Sistem menyediakan visualisasi data kerja sama dalam bentuk grafik untuk membantu monitoring dan evaluasi.

- Grafik kerja sama per bulan
- Grafik kerja sama per tahun
- Statistik status kerja sama
- Statistik implementasi

## Tampilan Antarmuka SIM PKS

Berikut adalah beberapa tampilan antarmuka dari **Sistem Informasi Manajemen Perjanjian Kerjasama (SIM PKS)**.

### 1. Halaman Dashboard
Tampilan utama sistem yang menampilkan ringkasan informasi, statistik, dan navigasi utama aplikasi.

![Dashboard SIM PKS](https://raw.githubusercontent.com/rezafaisal/SIM_PKS/main/images/sim_pks_01.png)

---

### 2. Halaman Data Kerjasama
Menampilkan daftar data perjanjian kerja sama yang dapat dikelola oleh pengguna sistem.

![Data Kerjasama SIM PKS](https://raw.githubusercontent.com/rezafaisal/SIM_PKS/main/images/sim_pks_02.png)

---

### 3. Halaman Detail atau Monitoring Kerjasama
Digunakan untuk melihat detail informasi kerja sama serta status pelaksanaan perjanjian.

![Monitoring Kerjasama SIM PKS](https://raw.githubusercontent.com/rezafaisal/SIM_PKS/main/images/sim_pks_03.png)

---

### 4. Halaman Implementasi Kerjasama
Menampilkan data implementasi dari kerja sama yang telah disepakati oleh perguruan tinggi dan mitra.

![Implementasi Kerjasama SIM PKS](https://raw.githubusercontent.com/rezafaisal/SIM_PKS/main/images/sim_pks_04.png)

---

### 5. Halaman Dokumentasi atau Laporan
Digunakan untuk menampilkan dokumentasi pendukung dan laporan terkait kegiatan kerja sama.

![Dokumentasi SIM PKS](https://raw.githubusercontent.com/rezafaisal/SIM_PKS/main/images/sim_pks_05.png)


