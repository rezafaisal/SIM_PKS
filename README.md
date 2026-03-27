# Sistem Informasi Manajemen Perjanjian Kerjasama Perguruan Tinggi

Sistem Informasi Manajemen Perjanjian Kerjasama Perguruan Tinggi adalah aplikasi berbasis web yang dirancang untuk membantu pengelolaan data kerja sama institusi secara terpusat, terstruktur, dan terukur. Sistem ini mendukung proses pencatatan mitra, pengelolaan fakultas dan program studi, monitoring status kerja sama, dokumentasi implementasi, serta visualisasi statistik kerja sama dalam bentuk grafik.

Aplikasi ini dibangun dengan arsitektur **separated frontend-backend**, menggunakan **CodeIgniter 4** sebagai backend API dan **React + TypeScript** sebagai frontend modern. Sistem juga mengimplementasikan **JWT Authentication** untuk keamanan akses dan **Chart.js** untuk kebutuhan dashboard visualisasi data. :contentReference[oaicite:1]{index=1}

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

---

## Daftar Endpoint API

Berikut ringkasan endpoint backend yang tersedia pada sistem. Hampir seluruh endpoint dilindungi autentikasi JWT Bearer Token, kecuali beberapa endpoint publik seperti `contact`. :contentReference[oaicite:2]{index=2}

### Auth
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| POST | `/login` | Login dan mendapatkan token JWT |
| GET | `/me` | Mendapatkan data user berdasarkan token |

### User
| Method | Endpoint |
|--------|----------|
| GET | `/user` |
| GET | `/user/:id` |
| POST | `/user` |
| PUT | `/user/:id` |
| DELETE | `/user/:id` |

### Roles
| Method | Endpoint |
|--------|----------|
| GET | `/roles` |
| POST | `/roles` |
| PUT | `/roles/:id` |
| DELETE | `/roles/:id` |

### Pages
| Method | Endpoint |
|--------|----------|
| GET | `/pages` |
| POST | `/pages` |
| PUT | `/pages/:id` |
| DELETE | `/pages/:id` |

### Contact
| Method | Endpoint |
|--------|----------|
| GET | `/contact` |
| POST | `/contact` |
| PUT | `/contact/:id` |
| DELETE | `/contact/:id` |
| PUT | `/contact/status/:id` |

### Dean
| Method | Endpoint |
|--------|----------|
| GET | `/dean` |
| POST | `/dean` |
| PUT | `/dean/:id` |
| DELETE | `/dean/:id` |
| PUT | `/dean/status/:id` |

### Faculty
| Method | Endpoint |
|--------|----------|
| GET | `/faculty` |
| GET | `/faculty/show/:id` |
| GET | `/faculty/all` |
| POST | `/faculty` |
| PUT | `/faculty/:id` |
| DELETE | `/faculty/:id` |
| PUT | `/faculty/status/:id` |

### Prodi
| Method | Endpoint |
|--------|----------|
| GET | `/prodi` |
| POST | `/prodi` |
| PUT | `/prodi/:id` |
| DELETE | `/prodi` |

### Organization
| Method | Endpoint |
|--------|----------|
| GET | `/organization` |
| GET | `/organization/level` |
| POST | `/organization` |
| PUT | `/organization/:id` |
| DELETE | `/organization/:id` |

### Dosen
| Method | Endpoint |
|--------|----------|
| GET | `/dosen` |
| POST | `/dosen` |
| PUT | `/dosen/:id` |
| DELETE | `/dosen/:id` |

### Cooperation
| Method | Endpoint |
|--------|----------|
| GET | `/cooperation` |
| GET | `/cooperation/all` |
| GET | `/cooperation/:id` |
| GET | `/cooperation/filter` |
| GET | `/cooperation/justprodi` |
| GET | `/cooperation/justprodi/:prodiId` |
| GET | `/cooperation/graphmonth/:year/:region` |
| GET | `/cooperation/graphyear/:year/:region` |
| POST | `/cooperation` |
| PUT | `/cooperation/:id` |
| DELETE | `/cooperation/:id` |

### Implementation
| Method | Endpoint |
|--------|----------|
| GET | `/implementation` |
| GET | `/implementation/all` |
| GET | `/implementation/:id` |
| GET | `/implementation/graphmonth` |
| POST | `/implementation/:cooperationId` |
| POST | `/implementation/:id/:num` |
| DELETE | `/implementation/:id` |

### Type
| Method | Endpoint |
|--------|----------|
| GET | `/type` |
| POST | `/type` |
| PUT | `/type/:id` |
| DELETE | `/type/:id` |

### Documentation
| Method | Endpoint |
|--------|----------|
| GET | `/documentation` |
| GET | `/documentation/all` |
| POST | `/documentation/:cooperationId` |
| POST | `/documentation/:id/:num` |
| DELETE | `/documentation/:id` |

---

## Keamanan Sistem

Sistem menggunakan **JWT (JSON Web Token)** sebagai mekanisme autentikasi. Setelah login berhasil, pengguna akan mendapatkan token yang digunakan untuk mengakses endpoint yang bersifat protected.

Contoh header autentikasi:

```http
Authorization: Bearer <your_token>
