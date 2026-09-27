Taruh file sertifikat kamu di folder ini, lalu samakan nama file & tipe dengan atribut
data-cert dan data-type pada tiap <article class="cert-card"> di index.html.

Contoh:
- sertifikat-1.jpg  -> data-type="image"
- sertifikat-2.png  -> data-type="image"
- sertifikat-3.pdf  -> data-type="pdf"

Untuk thumbnail di kartu (opsional), ganti:
  <div class="cert-thumb"><span class="cert-thumb-icon">📜</span></div>
menjadi:
  <div class="cert-thumb"><img src="assets/certificates/nama-file.jpg" alt="Sertifikat ..."></div

Judul & keterangan sertifikat diedit langsung di teks <h3> dan <span> pada masing-masing kartu.
Mau nambah sertifikat baru? Tinggal copy satu blok <article class="cert-card">...</article> dan ganti isinya.
