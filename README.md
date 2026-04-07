# E-Kampus Mini

E-Kampus Mini adalah aplikasi kampus berbasis Expo dan React Native yang disusun untuk memenuhi praktikum navigasi mobile. Implementasi saat ini telah menyesuaikan kode aktual pada proyek, dengan struktur navigasi `Drawer -> Bottom Tab -> Native Stack`, komponen top bar kustom, badge nilai dinamis, dan fitur penggantian foto profil mahasiswa.

## 1. Tujuan Implementasi

Tujuan aplikasi ini adalah:

- menerapkan nested navigator sesuai spesifikasi praktikum
- menampilkan data akademik mahasiswa dalam beberapa layar utama
- menjaga konsistensi navigasi melalui drawer, tab, stack, dan top bar kustom
- mengadaptasi referensi desain `stitch` ke lingkungan Expo SDK 55

## 2. Referensi Visual

Referensi visual yang digunakan berasal dari paket desain `stitch` dan telah disalin ke dalam repositori agar dapat ditinjau langsung tanpa bergantung pada path lokal.

Referensi yang tersedia di repo:

- [Daftar Mata Kuliah - HTML](./docs/references/daftar_mata_kuliah/code.html)
- [Daftar Mata Kuliah - Screenshot](./docs/references/daftar_mata_kuliah/screen.png)
- [Jadwal Kuliah Mingguan - HTML](./docs/references/jadwal_kuliah_mingguan/code.html)
- [Jadwal Kuliah Mingguan - Screenshot](./docs/references/jadwal_kuliah_mingguan/screen.png)
- [Profil Mahasiswa - HTML](./docs/references/profil_mahasiswa/code.html)
- [Profil Mahasiswa - Screenshot](./docs/references/profil_mahasiswa/screen.png)
- [Scholar Metric - Design Notes](./docs/references/scholar_metric/DESIGN.md)

Adaptasi desain yang diterapkan pada aplikasi:

- palet navy-gold sebagai warna utama
- hero section editorial dengan sudut membulat
- drawer berisi kartu identitas mahasiswa
- bottom tab membulat dengan badge notifikasi
- kartu mata kuliah dan jadwal dengan permukaan tonal bertingkat

## 3. Stack Teknologi dan Konfigurasi

### 3.1 Runtime Dependency

Berdasarkan [package.json](./package.json), dependency runtime yang digunakan adalah:

- `expo` `^55.0.11`
- `expo-status-bar` `~55.0.5`
- `expo-font` `~55.0.6`
- `expo-image-picker` `~55.0.17`
- `react` `19.2.0`
- `react-native` `0.83.4`
- `react-dom` `19.2.0`
- `react-native-web` `^0.21.0`
- `@expo/vector-icons` `^15.0.3`
- `@react-navigation/native` `^7.2.2`
- `@react-navigation/drawer` `^7.9.8`
- `@react-navigation/bottom-tabs` `^7.15.9`
- `@react-navigation/native-stack` `^7.14.10`
- `react-native-gesture-handler` `~2.30.0`
- `react-native-reanimated` `4.2.1`
- `react-native-worklets` `0.7.2`
- `react-native-safe-area-context` `~5.6.0`
- `react-native-screens` `~4.23.0`

### 3.2 Development Dependency

Dependency pengembangan yang digunakan:

- `typescript` `~5.9.2`
- `@types/react` `~19.2.10`
- `babel-preset-expo` `^55.0.15`

### 3.3 Konfigurasi Proyek

Konfigurasi utama proyek berdasarkan file yang ada:

- [index.ts](./index.ts): mendaftarkan `App` sebagai root component dengan `registerRootComponent`
- [app.json](./app.json): orientasi `portrait`, `userInterfaceStyle` `light`, `predictiveBackGestureEnabled` dinonaktifkan pada Android, serta plugin `expo-font`
- [babel.config.js](./babel.config.js): memakai `babel-preset-expo` dan plugin `react-native-reanimated/plugin`
- [tsconfig.json](./tsconfig.json): `strict: true` dan mengecualikan folder `dist` serta `node_modules`

### 3.4 Dependency yang Dirampingkan

Dependency yang dihapus dari implementasi sebelumnya:

- `@react-navigation/stack`

Alasan perampingan:

- `@react-navigation/native-stack` lebih sesuai untuk alur daftar ke detail
- mengurangi risiko error asset header pada Expo 55
- lebih ringan untuk struktur stack yang sederhana

## 4. Cara Menjalankan

Perintah dasar untuk menjalankan proyek:

```bash
npm install
npx expo start
```

Perintah shortcut yang tersedia:

```bash
npm run android
npm run ios
npm run web
```

Untuk membersihkan cache Metro:

```bash
npx expo start --clear
```

## 5. Struktur Navigasi Aplikasi

Struktur navigasi aktual pada kode adalah sebagai berikut:

```text
NavigationContainer
`-- Drawer Navigator
    |-- Beranda
    |   `-- Bottom Tab Navigator
    |       |-- Mata Kuliah
    |       |   `-- Native Stack Navigator
    |       |       |-- CourseList
    |       |       `-- CourseDetail
    |       |-- Nilai
    |       `-- Profil Mahasiswa
    |-- Jadwal Kuliah
    |-- Pengumuman
    `-- Tentang Kampus
```

Dokumentasi arsitektur yang lebih teknis tersedia pada [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## 6. Implementasi Berdasarkan Struktur Kode

Bagian ini disusun setelah meninjau ulang `App.tsx` secara menyeluruh agar isi laporan sesuai dengan kode aktual.

### 6.1 Root Application

Fungsi `App` berperan sebagai root komposisi aplikasi dan melakukan hal berikut:

- membungkus aplikasi dengan `ProfileAvatarContext.Provider`
- menyimpan state `avatarUri` untuk avatar mahasiswa yang dapat berubah
- memasang `NavigationContainer` dengan `theme` kustom
- menampilkan `StatusBar` dengan gaya gelap
- menginisialisasi `Drawer.Navigator` sebagai navigator utama

### 6.2 Drawer Navigator

`Drawer.Navigator` memuat empat menu utama:

- `Beranda`
- `Jadwal Kuliah`
- `Pengumuman`
- `Tentang Kampus`

Semua `Drawer.Screen` menggunakan `headerShown: false` karena tampilan header digantikan oleh komponen `ScreenTopBar` kustom.

Selain itu, drawer memakai `drawerContent` kustom melalui fungsi `CampusDrawerContent`, sehingga sidebar tidak lagi menggunakan tampilan default React Navigation.

### 6.3 Bottom Tab Navigator pada Beranda

Fungsi `HomeTabs` menginisialisasi `Bottom Tab Navigator` yang terdiri atas:

- `MataKuliah`
- `Nilai`
- `ProfilMahasiswa`

Karakteristik implementasi pada kode:

- seluruh tab menyembunyikan header bawaan
- ikon tab dipilih dinamis sesuai route aktif
- warna aktif tab menggunakan `COLORS.primaryContainer`
- badge tab `Nilai` memakai state `unreadGradeCount`
- badge di-reset ke `0` saat tab `Nilai` menerima event `focus`

### 6.4 Native Stack pada Tab Mata Kuliah

Fungsi `CourseStackNavigator` membentuk alur drill-down dari daftar menuju detail:

- `CourseList`
- `CourseDetail`

Stack yang digunakan adalah `createNativeStackNavigator`. Header native tetap dinonaktifkan pada kedua screen karena aplikasi memakai top bar kustom untuk menjaga tata letak tetap konsisten.

### 6.5 Custom Drawer Content

Fungsi `CampusDrawerContent` memanfaatkan `useProfileAvatar()` sehingga foto yang diganti di halaman profil langsung tercermin pada sidebar.

Konten drawer meliputi:

- avatar mahasiswa
- nama mahasiswa
- program studi
- NIM
- daftar menu drawer
- footer informasi semester

### 6.6 Halaman Mata Kuliah

Fungsi `CourseListScreen` menampilkan:

- `ScreenTopBar`
- `HeroBanner`
- `QuickNavigateCard`
- daftar mata kuliah dari konstanta `COURSES`

Perilaku penting:

- navigasi ke detail dilakukan dengan `navigation.navigate('CourseDetail', { course })`
- daftar mata kuliah adaptif terhadap lebar layar
- saat lebar layar `>= 700`, daftar berubah menjadi grid dua kolom melalui `useWindowDimensions()`

### 6.7 Quick Navigation Card

Fungsi `QuickNavigateCard` merupakan implementasi bonus `useNavigation()`. Komponen ini tidak menerima prop `navigation`, tetapi tetap dapat membuka `CourseDetail` dengan mengambil item pertama pada `COURSES`.

### 6.8 Halaman Detail Mata Kuliah

Fungsi `CourseDetailScreen` menerima parameter `course` dari route dan menampilkan:

- nama mata kuliah
- kode mata kuliah
- jumlah SKS
- dosen pengampu
- jadwal
- ruangan
- deskripsi singkat

Selain itu, fungsi ini memakai `useLayoutEffect()` dan `navigation.setOptions({ title: course.name })` untuk mengubah judul screen secara dinamis sesuai mata kuliah yang dipilih.

### 6.9 Halaman Nilai

Fungsi `GradesScreen` menampilkan:

- top bar layar nilai
- hero ringkasan performa akademik
- kartu IP semester
- daftar nilai semua mata kuliah berdasarkan konstanta `COURSES`

Sumber badge notifikasi tab `Nilai` berasal dari `GRADE_NOTIFICATION_COUNT`, yaitu jumlah mata kuliah yang memiliki properti `isNew: true`.

### 6.10 Halaman Profil Mahasiswa

Fungsi `ProfileScreen` menampilkan:

- avatar mahasiswa
- tombol kamera untuk memilih foto
- tombol `Ganti foto`
- nama dan program studi
- IPK kumulatif
- status akademik
- semester
- SKS lulus
- fakultas
- detail data diri lengkap

Fitur penggantian foto dilakukan dengan:

- `ImagePicker.requestMediaLibraryPermissionsAsync()`
- `ImagePicker.launchImageLibraryAsync()`
- pembaruan state `avatarUri` pada context

### 6.11 Halaman Jadwal Kuliah

Fungsi `ScheduleScreen` menyajikan jadwal mingguan dalam `ScrollView` horizontal. Data disusun menjadi lima kolom harian:

- Senin
- Selasa
- Rabu
- Kamis
- Jumat

Setiap kartu jadwal menampilkan jam, nama mata kuliah, ruangan, dan dosen.

### 6.12 Halaman Pengumuman

Fungsi `AnnouncementsScreen` memuat tiga item pengumuman lokal:

- batas pengisian KRS
- kuliah tamu
- pemeliharaan sistem

### 6.13 Halaman Tentang Kampus

Fungsi `AboutCampusScreen` menampilkan profil singkat institusi:

- nama kampus
- alamat
- visi
- misi

### 6.14 Komponen Navigasi Bersama

Fungsi `ScreenTopBar` merupakan komponen kunci pada implementasi saat ini.

Tanggung jawabnya:

- menampilkan judul layar dan eyebrow
- membuka drawer dari tombol `menu` di kiri atas
- menampilkan tombol `back` di kanan atas pada layar yang membutuhkan histori kembali
- menampilkan avatar profil pada layar non-detail
- memanfaatkan `useSafeAreaInsets()` agar jarak terhadap status bar tetap aman

Cara kerja pembukaan drawer:

- komponen menelusuri parent navigator
- saat menemukan objek navigation yang memiliki `openDrawer()`, komponen memanggil fungsi tersebut
- pendekatan ini memungkinkan sidebar diakses dari semua layar, termasuk screen yang berada di dalam tab dan stack

### 6.15 Komponen Presentasi Ulang Pakai

Komponen bantu yang dipakai lintas layar:

- `HeroBanner`
- `SectionTitle`
- `MetricCard`
- `DetailRow`

## 7. Pemetaan Spesifikasi Wajib

### 1. Drawer berisi Beranda, Jadwal Kuliah, Pengumuman, dan Tentang Kampus

Sudah diimplementasikan melalui `Drawer.Navigator` dan empat `Drawer.Screen` pada `App`.

### 2. Tab Beranda berisi Mata Kuliah, Nilai, dan Profil Mahasiswa

Sudah diimplementasikan melalui `Tab.Navigator` pada fungsi `HomeTabs`.

### 3. Tab Mata Kuliah menggunakan Stack dari daftar MK ke detail MK

Sudah diimplementasikan melalui `CourseStackNavigator` dengan dua screen:

- `CourseList`
- `CourseDetail`

Halaman detail menampilkan:

- nama mata kuliah
- jumlah SKS
- dosen
- jadwal
- ruangan
- deskripsi singkat

### 4. Halaman Profil Mahasiswa menampilkan data diri lengkap

Sudah diimplementasikan pada `ProfileScreen`, dengan data yang ditampilkan meliputi:

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

### 5. Halaman Jadwal Kuliah menampilkan tabel jadwal mingguan

Sudah diimplementasikan pada `ScheduleScreen` dalam bentuk kolom harian dari Senin sampai Jumat. Setiap kolom menampilkan jam kuliah, mata kuliah, ruangan, dan dosen.

## 8. Tantangan Bonus

### 1. `useNavigation()`

Sudah diterapkan pada `QuickNavigateCard`.

### 2. `navigation.setOptions()`

Sudah diterapkan pada `CourseDetailScreen` melalui `useLayoutEffect()`.

### 3. `tabBarBadge`

Sudah diterapkan pada tab `Nilai` dengan badge dinamis yang akan hilang setelah tab dibuka.

### 4. Navigasi drawer dapat diakses dari semua layar

Sudah diterapkan melalui `ScreenTopBar` dan traversal parent navigation.

### 5. Ganti foto profil mahasiswa

Sudah diterapkan pada `ProfileScreen` menggunakan `expo-image-picker` dan `ProfileAvatarContext`.

## 9. Ringkasan Arsitektur

Arsitektur inti aplikasi tidak berubah, yaitu tetap menggunakan tiga lapisan navigator:

- `Drawer Navigator` sebagai navigasi global
- `Bottom Tab Navigator` sebagai area fitur utama pada Beranda
- `Native Stack Navigator` sebagai alur daftar ke detail pada tab Mata Kuliah

Namun, implementasi pada versi saat ini mengalami penyempurnaan sebagai berikut:

- stack lama diganti menjadi `native-stack`
- header bawaan navigator diganti dengan top bar kustom
- drawer dapat dibuka dari semua layar
- state avatar dipusatkan melalui context
- badge nilai menjadi stateful dan tidak lagi statis

## 10. Troubleshooting Expo 55

### 10.1 Error `NativeWorklets... installTurboModule`

Penyebab utama error ini adalah mismatch antara layer native dan JavaScript pada stack Reanimated.

Kondisi yang pernah memicu error:

- `react-native-reanimated@4.2.1` sudah terpasang
- `react-native-worklets` sebagai peer dependency belum tersedia

Perbaikan yang diterapkan:

- menambahkan `react-native-worklets`
- menambahkan `expo-font`
- merapikan konfigurasi pada `app.json`
- mengecualikan `dist` pada `tsconfig.json`

### 10.2 Error `back-icon@3x.png could not be found`

Masalah ini diatasi dengan mengganti `@react-navigation/stack` ke `@react-navigation/native-stack`, sehingga jalur asset header berbasis JavaScript tidak lagi dipakai.

### 10.3 Warning `Project is incompatible with this version of Expo Go`

Warning ini berarti versi Expo Go di perangkat lebih lama daripada SDK proyek.

Solusi:

- perbarui Expo Go ke versi terbaru
- jalankan ulang aplikasi dengan `npx expo start --clear`
- jika menggunakan development build, lakukan rebuild native app

### 10.4 Warning `SafeAreaView has been deprecated`

Pada proyek ini, safe area telah dipindahkan ke `react-native-safe-area-context`, sehingga warning tersebut sudah diatasi pada implementasi.

### 10.5 Warning `InteractionManager has been deprecated`

Warning ini berasal dari dependency internal pada mode development dan tidak memblokir jalannya aplikasi.

### 10.6 Warning `[Reanimated] Reduced motion setting is enabled`

Warning ini muncul saat perangkat mengaktifkan reduced motion. Efeknya hanya pada sebagian animasi di mode development.

### 10.7 Langkah aman setelah update dependency

Gunakan langkah berikut:

```bash
npm install
npx expo start --clear
```

Lalu pastikan:

- Expo Go sudah versi terbaru
- Expo Go ditutup penuh lalu dibuka kembali
- development build dibangun ulang bila dependency native berubah

## 11. Verifikasi

Pemeriksaan yang relevan untuk proyek ini:

```bash
npx expo install --check
npx expo-doctor
npx tsc --noEmit
```

## 12. File Penting

- [App.tsx](./App.tsx): implementasi utama screen, navigator, context, data, dan style
- [index.ts](./index.ts): registrasi root component
- [app.json](./app.json): konfigurasi Expo
- [babel.config.js](./babel.config.js): konfigurasi Babel dan plugin Reanimated
- [tsconfig.json](./tsconfig.json): konfigurasi TypeScript
- [package.json](./package.json): daftar dependency dan script proyek
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md): dokumentasi arsitektur teknis
