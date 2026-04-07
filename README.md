# E-Kampus Mini

Aplikasi kampus mini berbasis Expo dan React Native untuk memenuhi tugas navigasi praktikum mobile. Implementasi ini menggunakan struktur navigator bertingkat: `Drawer` di luar, `Bottom Tab` di dalam menu Beranda, dan `Stack` di dalam tab Mata Kuliah.

## Ringkasan

Referensi visual diambil dari:

- `C:\Users\user\Downloads\E Campus 2\stitch\stitch\daftar_mata_kuliah`
- `C:\Users\user\Downloads\E Campus 2\stitch\stitch\jadwal_kuliah_mingguan`
- `C:\Users\user\Downloads\E Campus 2\stitch\stitch\profil_mahasiswa`
- `C:\Users\user\Downloads\E Campus 2\stitch\stitch\scholar_metric\DESIGN.md`

Adaptasi yang diterapkan ke Expo:

- palet warna navy-gold
- hero section editorial
- permukaan tonal bertingkat
- drawer dengan kartu profil
- bottom tab membulat
- kartu mata kuliah dan jadwal tanpa visual yang kaku

## Teknologi

- Expo `55.0.11`
- React Native `0.83.4`
- React `19.2.0`
- React Navigation:
  - `@react-navigation/native`
  - `@react-navigation/drawer`
  - `@react-navigation/bottom-tabs`
  - `@react-navigation/stack`
- `react-native-gesture-handler`
- `react-native-reanimated`
- `@expo/vector-icons`

## Cara Menjalankan

```bash
npm install
npx expo start
```

Untuk membersihkan cache:

```bash
npx expo start --clear
```

## Struktur Navigasi

```text
Drawer Navigator
├── Beranda
│   └── Bottom Tab Navigator
│       ├── Mata Kuliah
│       │   └── Stack Navigator
│       │       ├── Daftar Mata Kuliah
│       │       └── Detail Mata Kuliah
│       ├── Nilai
│       └── Profil Mahasiswa
├── Jadwal Kuliah
├── Pengumuman
└── Tentang Kampus
```

Dokumentasi arsitektur lengkap ada di [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Pemetaan Spesifikasi Wajib

### 14. Drawer berisi Beranda, Jadwal Kuliah, Pengumuman, Tentang Kampus

Sudah diimplementasikan pada `Drawer.Navigator` di [App.tsx](./App.tsx).

### 15. Tab Beranda berisi Mata Kuliah, Nilai, Profil Mahasiswa

Sudah diimplementasikan pada `Tab.Navigator` di [App.tsx](./App.tsx).

### 16. Tab Mata Kuliah menggunakan Stack: daftar MK ke detail MK

Sudah diimplementasikan pada `CourseStack.Navigator`.

Halaman detail menampilkan:

- nama mata kuliah
- jumlah SKS
- dosen
- jadwal
- ruangan
- deskripsi singkat

### 17. Halaman Profil Mahasiswa menampilkan data diri lengkap

Sudah diimplementasikan pada `ProfileScreen` dan menampilkan:

- nama
- NIM
- program studi
- fakultas
- email kampus
- nomor HP
- alamat
- semester
- status akademik
- SKS lulus
- IPK

### 18. Halaman Jadwal Kuliah menampilkan tabel jadwal mingguan

Sudah diimplementasikan pada `ScheduleScreen` dalam bentuk kolom harian:

- Senin
- Selasa
- Rabu
- Kamis
- Jumat

Setiap kolom menampilkan jam, mata kuliah, ruangan, dan dosen.

## Tantangan Bonus

### 1. `useNavigation()`

Sudah diterapkan pada komponen `QuickNavigateCard`. Komponen ini tidak menerima `navigation` prop langsung, tetapi tetap bisa membuka detail MK melalui hook `useNavigation()`.

### 2. `navigation.setOptions()`

Sudah diterapkan pada `CourseDetailScreen` melalui `useLayoutEffect()` untuk mengubah judul header secara dinamis mengikuti nama mata kuliah yang sedang dibuka.

### 3. Badge notifikasi tab

Sudah diterapkan pada tab `Nilai` menggunakan `tabBarBadge: 3`.

## Penjelasan Arsitektur

### Alasan memakai tiga lapisan navigator

- `Drawer` dipakai untuk menu utama berskala aplikasi.
- `Bottom Tab` dipakai untuk memecah area Beranda menjadi fitur akademik utama.
- `Stack` dipakai untuk alur drill-down dari daftar mata kuliah ke detail mata kuliah.

Struktur ini mengikuti kebutuhan UX yang berbeda di tiap level:

- level global
- level fitur utama
- level detail konten

### Pemisahan data dan presentasi

Seluruh data contoh saat ini disimpan sebagai konstanta lokal di `App.tsx`:

- `STUDENT`
- `COURSES`
- `WEEKLY_SCHEDULE`

Pendekatan ini dipilih agar fokus tugas tetap pada navigasi, bukan state management eksternal.

## Pertanyaan Analitis

### 1. Perbedaan `navigation.navigate()` dan `navigation.push()`

`navigation.navigate()` dipakai untuk berpindah ke screen tertentu. Jika screen tujuan sudah ada di stack, React Navigation cenderung memanfaatkan screen yang sudah ada atau memfokuskan route tersebut daripada selalu membuat instance baru.

`navigation.push()` selalu menambahkan screen baru ke puncak stack walaupun screen dengan nama yang sama sudah ada sebelumnya.

Gunakan `push()` ketika:

- Anda perlu membuka screen yang sama berulang kali dengan data berbeda.
- Anda ingin histori stack bertambah walaupun nama screen sama.

Contoh:

- dari detail MK A lalu membuka detail MK B lagi pada screen detail yang sama
- dari detail berita membuka berita lain pada screen detail yang sama

### 2. Mengapa `import 'react-native-gesture-handler'` harus paling atas

Drawer Navigator mengandalkan sistem gesture dari `react-native-gesture-handler`. Import ini harus dieksekusi paling awal agar gesture system terpasang sebelum komponen navigasi diinisialisasi.

Jika tidak diletakkan di baris paling atas:

- drawer bisa gagal bekerja
- swipe gesture bisa error
- aplikasi bisa menampilkan warning atau crash pada inisialisasi navigator

### 3. Mengapa pada nested navigator header Tab perlu `headerShown: false`

Saat `Bottom Tab` diletakkan di dalam `Drawer`, header dari Tab tidak perlu tampil jika header utama sudah dipegang oleh navigator lain atau screen di dalamnya.

Jika `headerShown: false` tidak diset:

- bisa muncul header ganda
- judul layar menjadi bertumpuk
- ruang vertikal konten berkurang
- tampilan terlihat tidak rapi

Pada implementasi ini, `Beranda` di `Drawer` menyembunyikan header untuk container tab agar navigasi internal di Tab dan Stack bisa mengontrol tampilan secara lebih bersih.

### 4. Deskripsi struktur navigasi aplikasi

Struktur navigasi aplikasi terdiri dari tiga lapisan:

1. Lapisan pertama: `Drawer Navigator`
   Berfungsi sebagai navigasi global aplikasi.
2. Lapisan kedua: `Bottom Tab Navigator`
   Berada di dalam menu `Beranda` untuk fitur akademik utama.
3. Lapisan ketiga: `Stack Navigator`
   Berada di dalam tab `Mata Kuliah` untuk alur daftar ke detail.

Alasan memakai tiga lapisan:

- kebutuhan menu global berbeda dengan kebutuhan tab fitur
- alur daftar ke detail paling tepat diwakili stack
- nested navigator membuat struktur aplikasi modular dan mudah dikembangkan

## File Penting

- [App.tsx](./App.tsx): seluruh implementasi navigasi, data contoh, screen, dan style
- [babel.config.js](./babel.config.js): konfigurasi Babel dan plugin Reanimated
- [app.json](./app.json): konfigurasi Expo app
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md): dokumentasi arsitektur mendalam

## Verifikasi

Pemeriksaan yang sudah dijalankan:

```bash
npx expo install --check
npx tsc --noEmit
```

Keduanya berhasil.
