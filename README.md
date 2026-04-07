# E-Kampus Mini

Aplikasi kampus mini berbasis Expo dan React Native untuk memenuhi tugas navigasi praktikum mobile. Implementasi ini menggunakan struktur navigator bertingkat: `Drawer` di luar, `Bottom Tab` di dalam menu Beranda, dan `Stack` di dalam tab Mata Kuliah.

## Ringkasan

Referensi visual yang digunakan pada pengembangan aplikasi berasal dari paket desain `stitch` dan telah disalin ke dalam repositori ini agar dapat ditinjau langsung tanpa bergantung pada path lokal.

Referensi yang disertakan dalam repo:

- [Daftar Mata Kuliah - HTML](./docs/references/daftar_mata_kuliah/code.html)
- [Daftar Mata Kuliah - Screenshot](./docs/references/daftar_mata_kuliah/screen.png)
- [Jadwal Kuliah Mingguan - HTML](./docs/references/jadwal_kuliah_mingguan/code.html)
- [Jadwal Kuliah Mingguan - Screenshot](./docs/references/jadwal_kuliah_mingguan/screen.png)
- [Profil Mahasiswa - HTML](./docs/references/profil_mahasiswa/code.html)
- [Profil Mahasiswa - Screenshot](./docs/references/profil_mahasiswa/screen.png)
- [Scholar Metric - Design Notes](./docs/references/scholar_metric/DESIGN.md)

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
  - `@react-navigation/native-stack`
- `react-native-gesture-handler`
- `react-native-reanimated`
- `@expo/vector-icons`
- `expo-image-picker`

## Audit Dependency

Dependency inti yang dipakai aplikasi:

- `expo`: runtime dan tooling utama Expo SDK 55
- `@react-navigation/native`: fondasi navigasi
- `@react-navigation/drawer`: sidebar / drawer utama
- `@react-navigation/bottom-tabs`: tab pada halaman Beranda
- `@react-navigation/native-stack`: stack untuk daftar dan detail mata kuliah
- `react-native-gesture-handler`: gesture drawer dan navigasi
- `react-native-screens`: optimasi screen native
- `react-native-safe-area-context`: safe area yang sesuai dan tidak deprecated
- `react-native-reanimated`: dependensi transitif untuk drawer dan animasi navigator
- `react-native-worklets`: peer dependency yang dibutuhkan Reanimated di Expo 55
- `expo-font`: peer dependency untuk `@expo/vector-icons`
- `expo-image-picker`: memilih foto profil dari galeri perangkat

Dependency yang dirampingkan:

- `@react-navigation/stack` dihapus

Alasannya:

- `@react-navigation/native-stack` lebih ringan untuk kebutuhan stack sederhana
- mengurangi jalur asset header JS dari `@react-navigation/stack`
- lebih cocok dengan stack native pada Expo SDK 55

## Cara Menjalankan

```bash
npm install
npx expo start
```

Untuk membersihkan cache:

```bash
npx expo start --clear
```

## Pembaruan Terbaru

- tombol sidebar tersedia di semua layar melalui tombol `menu` di kiri atas
- tombol `back` muncul di kanan atas pada layar detail yang memiliki alur kembali
- badge tab `Nilai` kini dinamis, mengikuti jumlah pembaruan nilai baru
- badge `Nilai` otomatis hilang setelah tab `Nilai` dibuka
- foto profil mahasiswa bisa diganti dari galeri dan tersinkron ke top bar, sidebar, dan halaman profil

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

### 1. Implementasi Drawer Navigator

Aplikasi telah mengimplementasikan `Drawer.Navigator` sebagai navigasi utama. Menu yang tersedia terdiri atas `Beranda`, `Jadwal Kuliah`, `Pengumuman`, dan `Tentang Kampus`. Implementasi ini berada pada [App.tsx](./App.tsx).

### 2. Implementasi Bottom Tab pada Halaman Beranda

Halaman `Beranda` telah memuat `Bottom Tab Navigator` dengan tiga tab utama, yaitu `Mata Kuliah`, `Nilai`, dan `Profil Mahasiswa`. Struktur ini diterapkan pada `Tab.Navigator` di [App.tsx](./App.tsx).

### 3. Implementasi Stack pada Tab Mata Kuliah

Tab `Mata Kuliah` telah menggunakan `Stack Navigator` untuk mendukung alur berpindah dari daftar mata kuliah menuju halaman detail. Implementasi ini berada pada `CourseStack.Navigator`.

Halaman detail mata kuliah menampilkan informasi berikut:

- nama mata kuliah
- jumlah SKS
- dosen pengampu
- jadwal perkuliahan
- ruangan
- deskripsi singkat

### 4. Implementasi Halaman Profil Mahasiswa

Halaman `Profil Mahasiswa` telah menampilkan data diri mahasiswa secara lengkap melalui `ProfileScreen`. Informasi yang ditampilkan meliputi:

- nama
- NIM
- program studi
- fakultas
- email kampus
- nomor HP
- alamat
- semester
- status akademik
- jumlah SKS lulus
- IPK

### 5. Implementasi Halaman Jadwal Kuliah Mingguan

Halaman `Jadwal Kuliah` telah menampilkan jadwal mingguan melalui `ScheduleScreen`. Jadwal disusun dalam bentuk kolom harian untuk:

- Senin
- Selasa
- Rabu
- Kamis
- Jumat

Pada setiap kolom, informasi yang ditampilkan mencakup jam kuliah, nama mata kuliah, ruangan, dan dosen.

## Tantangan Bonus

### 1. `useNavigation()`

Sudah diterapkan pada komponen `QuickNavigateCard`. Komponen ini tidak menerima `navigation` prop langsung, tetapi tetap bisa membuka detail MK melalui hook `useNavigation()`.

### 2. `navigation.setOptions()`

Sudah diterapkan pada `CourseDetailScreen` melalui `useLayoutEffect()` untuk mengubah judul header secara dinamis mengikuti nama mata kuliah yang sedang dibuka.

### 3. Badge notifikasi tab

Sudah diterapkan pada tab `Nilai` menggunakan badge dinamis berbasis data nilai baru. Badge akan otomatis hilang setelah tab `Nilai` dibuka.

### 4. Navigasi konsisten di semua layar

Sudah diterapkan melalui top bar custom:

- tombol `menu` di kiri atas membuka sidebar dari semua layar
- tombol `back` muncul di kanan atas pada layar detail

### 5. Ganti foto profil mahasiswa

Sudah diterapkan pada `ProfileScreen` menggunakan `expo-image-picker`.

Perilakunya:

- pengguna dapat memilih foto dari galeri
- foto baru langsung dipakai pada halaman profil
- avatar pada top bar ikut berubah
- avatar pada drawer ikut berubah

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
- [package.json](./package.json): daftar dependency aplikasi
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md): dokumentasi arsitektur mendalam

## Verifikasi

Pemeriksaan yang sudah dijalankan:

```bash
npx expo install --check
npx tsc --noEmit
```

Keduanya berhasil.

## Troubleshooting Expo 55

### Error `back-icon@3x.png could not be found`

Masalah ini sudah ditangani pada repo ini dengan mengganti `@react-navigation/stack` ke `@react-navigation/native-stack`.

Alasan teknis:

- `@react-navigation/stack` memakai header stack berbasis JavaScript
- pada kombinasi Metro dan Expo 55, jalur asset header dari `@react-navigation/elements` dapat memicu error resolusi asset
- `native-stack` lebih ringan dan lebih stabil untuk kebutuhan daftar ke detail pada aplikasi ini

### Warning `Project is incompatible with this version of Expo Go`

Ini bukan bug kode aplikasi. Artinya versi Expo Go pada perangkat Anda lebih lama daripada SDK proyek.

Solusi:

- update Expo Go ke versi terbaru dari Play Store
- lalu jalankan ulang `npx expo start --clear`

### Warning `SafeAreaView has been deprecated`

Sudah diperbaiki di kode aplikasi dengan memakai `SafeAreaView` dari `react-native-safe-area-context`.

### Warning `InteractionManager has been deprecated`

Warning ini berasal dari dependency internal yang berjalan pada development mode. Selama bundling dan navigasi aplikasi normal, warning ini tidak memblokir aplikasi.
