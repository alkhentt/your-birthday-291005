// =====================================================
//  EDIT DI SINI SAJA. Tidak perlu menyentuh file lain.
// =====================================================
window.CFG = {
  nama: "Sayang",            // nama pacarmu
  dari: "Aku",               // namamu (tampil sebagai pengirim pesan)
  sejak: "",                 // tanggal jadian, contoh "2024-02-14" (kosongkan kalau tidak mau)

  video: "assets/video.mp4", // video background (taruh di folder assets, boleh dihapus)
  avatar: "assets/avatar.jpg", // foto profilmu di chat (opsional)

  kartu: "Kamu adalah hadiah terbaik yang pernah aku punya.", // tulisan di kartu gosok

  // Chat pembuka. {nama} dan {dari} otomatis diganti.
  pesanAwal: [
    "Hai {nama} 👋",
    "Ada yang mau aku kasih nih…",
    "Tapi kamu harus ikutin permainannya dulu ya 😝"
  ],

  // Pesan dari hati, muncul setelah tiup lilin.
  pesanHati: [
    "Maaf ya, hari ini aku nggak bisa ada di sampingmu.",
    "Tapi setiap kali kita telponan sampai larut, jarak ini rasanya nggak ada.",
    "Terima kasih sudah sabar, kuat, dan tetap memilihku. 🤍",
    "Semoga umur barumu penuh bahagia, dan kita cepat ketemu langsung."
  ],

  // Kalimat di layar penutup.
  penutup: "Sejauh apa pun kita, hatiku selalu pulang ke kamu.",

  // Hadiah roda: [emoji, baris 1, baris 2]. Harus tepat 6 item.
  hadiah: [
    ["🍽️", "Dinner berdua", "pas ketemu"],
    ["🎬", "Nonton bareng,", "kamu pilih film"],
    ["🤗", "Peluk 10 menit", "tanpa protes"],
    ["🎶", "Aku nyanyiin", "1 lagu"],
    ["✈️", "Tiket ketemu", "secepatnya"],
    ["💬", "Curhat 1 jam,", "aku dengerin"]
  ],

  // Foto kenangan (opsional). Taruh file di assets/, lalu hapus tanda // di bawah.
  // Kalau kosong, bagian foto otomatis dilewati.
  foto: [
    // { src: "assets/foto1.jpg", teks: "Pertama kali kita ketemu" },
    // { src: "assets/foto2.jpg", teks: "Hari favoritku" },
  ]
};
