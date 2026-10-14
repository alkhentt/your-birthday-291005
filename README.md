# 💌 Kejutan Ulang Tahun

Kejutan ulang tahun interaktif untuk HP. Tampilannya seperti notifikasi di lock screen yang berlanjut jadi chat, lengkap dengan game di dalamnya. Murni file statis (HTML, CSS, JS), tanpa build.

## Alur
1. Lock screen dengan notifikasi pesan, geser ke atas untuk membuka
2. Chat dengan efek mengetik, lalu voice note Happy Birthday
3. Tiup lilin beneran lewat mic (ada tombol "Ketuk saja")
4. Pesan dari hati
5. Game: tempelkan jari di hati, gosok kartu, cari pasangan kartu, roda hadiah
6. Foto kenangan yang bisa digeser (opsional)
7. Pertanyaan "Masih sayang aku nggak?" dan layar penutup dengan kembang api

Tips: ketuk dua kali pada bubble chat untuk memberi reaksi ❤️.

## Isi folder
```
index.html    halaman utama (jangan diganti namanya)
style.css     tampilan
app.js        logika
config.js     SEMUA teks dan pengaturan, edit di sini
vercel.json   setelan Vercel
assets/       favicon + tempat video, avatar, dan foto
```

## 1. Isi data
Buka `config.js`, ubah `nama`, `dari`, `sejak` (tanggal jadian, format `2024-02-14`), dan semua teks pesan.

## 2. Aset (opsional)
Taruh di folder `assets/` dengan nama persis:
- `video.mp4`: video background (MP4 H.264, vertikal, 20-40 detik, di bawah 25 MB)
- `avatar.jpg`: foto profilmu di header chat
- `foto1.jpg`, `foto2.jpg`, dst: foto kenangan, lalu daftarkan di bagian `foto` pada `config.js`

Tanpa aset pun tetap jalan: latar jadi gradasi aurora dan avatar jadi inisial.

## 3. Upload ke GitHub
1. Buka github.com, klik **New repository**, beri nama, klik **Create repository**.
2. Klik **uploading an existing file**.
3. Drag semua isi folder ini (`index.html`, `style.css`, `app.js`, `config.js`, `vercel.json`, folder `assets`) ke halaman tersebut.
4. Klik **Commit changes**.

## 4. Deploy ke Vercel
1. Buka vercel.com dan login pakai GitHub.
2. **Add New → Project**, pilih repo tadi, klik **Import**.
3. **Framework Preset: Other**, lalu klik **Deploy**.
4. Link `https://nama-project.vercel.app` siap dikirim ke pacarmu.

Edit `config.js` di GitHub kapan saja dan Vercel otomatis deploy ulang.

## Catatan
- Tiup lilin lewat mic butuh HTTPS (otomatis aman di Vercel). Kalau mic ditolak, pakai tombol "Ketuk saja".
- Override lewat link: `?nama=Putri&dari=Budi&sejak=2024-02-14`.
- Cek video dari galeri tanpa upload: tambahkan `?edit=1`, lalu tekan tombol 🎞️ di pojok kanan atas.
