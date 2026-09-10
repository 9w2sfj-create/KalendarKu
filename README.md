# Kalendar KU by Cikgu Saffuan

Kalendar dinding interaktif Malaysia, 2026–2099.

## Versi empat bahasa

- Antara muka dan arahan permainan: Bahasa Melayu, English, 中文 dan தமிழ்.
- Pilihan bahasa paparan menukar bahasa audio; pilihan audio boleh diubah secara berasingan.
- Klik teks nama hari, bulan, cuti atau catatan untuk mendengar. Klik nombor untuk bacaan tarikh penuh. Klik ruang kosong kotak untuk membesarkannya.
- Semua rakaman BM menggunakan suara lelaki Microsoft ms-MY-OsmanNeural. Mandarin: zh-CN-XiaoxiaoNeural; Tamil Malaysia: ta-MY-KaniNeural. Rakaman disertakan dalam folder assets/audio.
- Catatan peribadi atau teks baharu yang belum mempunyai rakaman menggunakan suara peranti. Kualiti, suara dan jantina bacaan ini bergantung pada suara yang dipasang; aplikasi mengutamakan suara BM lelaki jika tersedia. Catatan tidak diterjemah atau dihantar ke perkhidmatan suara.

## Bentuk kalendar dinding

Semua bulan menggunakan lima lajur tarikh dan tujuh baris yang sama besar. Tarikh minggu keenam dipindahkan ke ruang kosong pada lajur pertama, seperti kalendar bercetak rujukan. Contohnya, 31 Mei 2026 berada di atas pada lajur pertama. Nombor minggu sebenar masih dikira daripada tarikh; penjelasan guru menerangkan susunan ini.

## Kalendar tambahan dan ketepatan

- Islam: tarikh Islamic Civil melalui Intl, **anggaran**, bukan pengesahan takwim JAKIM.
- Cina: kalendar lunisolar Cina melalui Intl apabila disokong pelayar.
- Tamil/India: kalendar suria Tamil, **bukan kalendar kebangsaan India Saka**. Jadual permulaan bulan 2026–2099 dikira menggunakan kedudukan Matahari sidereal Lahiri dan waktu matahari terbenam di Kuala Lumpur (3.139 N, 101.6869 E). Peralihan sebelum matahari terbenam memulakan bulan pada hari itu; jika selepas, hari berikutnya. Tarikh mungkin berbeza sehari daripada panchangam tempatan. Data ini untuk paparan pembelajaran dan tidak menggantikan pengumuman agama rasmi.
- Pengiraan Tamil dibuat di luar aplikasi dengan Swiss Ephemeris/Moshier; aplikasi hanya membawa jadual tarikh permulaan bulan, tanpa pustaka ephemeris.

Rujukan kaedah:
- https://navapanchangam.com/methodology.html
- https://www.astro.com/swisseph/swephprg.htm
- https://ignca.gov.in/Asi_data/34958.pdf

Cuti umum: data asas dan penyedia Malaysia Holiday API; cuti masa hadapan tertakluk kepada pengumuman rasmi. Tarikh Islam/Tamil tambahan tidak mengubah tarikh cuti yang telah disahkan.

## GitHub Pages

Versi v16: **59 fail keseluruhan**, termasuk 9 pakej audio `.bin` yang menyimpan semua 2,504 rakaman MP3 tanpa mengubah kandungan atau kualitinya. Setiap pakej tidak melebihi 4 MiB. Aplikasi mengambil rakaman yang dipilih daripada pakej; hanya pakej diperlukan dimuat turun dan sehingga tiga pakej disimpan sementara dalam memori. Bunyi selak kekal sebagai WAV.

1. Ekstrak ZIP terlebih dahulu; jangan muat naik ZIP itu sendiri.
2. Di akar repositori GitHub, pilih **Add file → Upload files**.
3. Seret semua kandungan folder ini, termasuk folder **assets**, ke ruang muat naik. Pastikan `index.html` berada di akar repositori, bukan di dalam satu lagi folder.
4. Pilih **Commit changes**. Untuk Pages: Settings → Pages → Deploy from a branch → main → / (root).

Sertakan `.nojekyll` jika kelihatan (Cmd+Shift+. dalam Finder memaparkan fail tersembunyi). Folder audio versi lama yang sudah berada di GitHub tidak lagi digunakan; tidak perlu muat naik 2,504 MP3 itu semula. Uji melalui pelayan HTTP atau GitHub Pages, bukan membuka index.html melalui file://.

Catatan disimpan dalam localStorage pada pelayar/peranti dan asal laman yang sama. Membuka laman pada alamat lain tidak memindahkan catatan secara automatik.

## Grafik, selak helaian dan audio permainan
- Grafik asal Hari Raya, Tahun Baharu Cina, Deepavali dan Krismas pada tarikh berkaitan; bendera pada peristiwa negeri terpilih.
- Butang bulan sebelumnya/seterusnya memainkan animasi selak kertas; tetapan reduced motion dihormati.
- Bunyi lembut berbeza untuk jawapan betul/salah, tertakluk pada kawalan Senyap.
- Klik teks soalan untuk membaca keseluruhan soalan dalam bahasa audio terpilih. Teks soalan dinamik menggunakan suara peranti, seperti catatan peribadi; bahasa/jenis suara bergantung pada peranti.

### Kredit bendera
Fail SVG disertakan tanpa pengubahsuaian, dipaparkan pada skala kecil.
- Penang: Wikimedia Commons contributors (Molecule Extraction, Tcfc2349, HapHaxion; pereka asal tidak diketahui), CC BY-SA 3.0. https://commons.wikimedia.org/wiki/File:Flag_of_Penang_(Malaysia).svg
- Sarawak: Matthew A. Lockhart dan Wikimedia Commons contributors, CC BY-SA 3.0. https://commons.wikimedia.org/wiki/File:Flag_of_Sarawak.svg
- Johor: Wikimedia Commons, CC0. https://commons.wikimedia.org/wiki/File:Flag_of_Johor.svg
- Pahang: Urmas, public domain. https://commons.wikimedia.org/wiki/File:Flag_of_Pahang.svg
- Lesen: https://creativecommons.org/licenses/by-sa/3.0/ dan https://creativecommons.org/publicdomain/zero/1.0/

### Padanan ilustrasi perayaan

Ilustrasi khusus membezakan Kuih Bulan (kuih bulan), Perahu Naga (perahu naga), Gawai (rumah panjang dan padi), Muharam (bulan sabit dan kalendar), Israk Mikraj (masjid waktu malam), Ramadan (kurma dan air), Nuzul al-Quran (al-Quran di atas rehal), Arafah (bukit dan khemah), Aidiladha (biri-biri dan Kaabah), Maulidur Rasul (masjid berkubah hijau), Thaipusam (vel dan bulu merak), serta Kaamatan (bakul hasil tuaian). Ilustrasi ialah simbol pendidikan, bukan logo rasmi.

Grafik masjid dengan ketupat hanya untuk Aidilfitri. Nama yang belum mempunyai padanan khusus tidak diberikan grafik rawak. Sprite tambahan dijana menggunakan ImageGen.

### Bendera tambahan

Fail asal Wikimedia Commons digunakan tanpa mengubah lukisan bendera.
- [Flag of Negeri Sembilan.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Negeri_Sembilan.svg) — Himasaram; Public domain. 
- [Flag of Malacca.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Malacca.svg) — User Mysid on en.wikipedia; Public domain. 
- [Flag of Terengganu.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Terengganu.svg) — Drawn by Mysid.; CC BY-SA 3.0. http://creativecommons.org/licenses/by-sa/3.0/
- [Flag of Sabah.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Sabah.svg) — Mysid; Public domain. 
- [Flag of Perlis.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Perlis.svg) — No machine-readable author provided. Urmas assumed (based on copyright claims).; Public domain. 
- [Flag of Malaysia.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Malaysia.svg) — MapGrid (old version SKopp, Zscout370   and  Ranking Update); Public domain. 
- [Flag of Kedah.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Kedah.svg) — Bukhrin at English Wikipedia; Public domain. 
- [Flag of Kelantan.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Kelantan.svg) — Mysid; CC BY-SA 3.0. http://creativecommons.org/licenses/by-sa/3.0/
- [Flag of Perak.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Perak.svg) — No machine-readable author provided. Urmas assumed (based on copyright claims).; Public domain. 
- [Flag of Selangor.svg](https://commons.wikimedia.org/wiki/File:Flag_of_Selangor.svg) — Mysid; CC BY-SA 3.0. http://creativecommons.org/licenses/by-sa/3.0/

### Bunyi selakan

Bunyi kertas diselak dimainkan bersama navigasi bulan (butang, kekunci anak panah dan leretan). Suis Bunyi mengawal semua audio termasuk selakan. Rakaman sebenar “Page Turn (2)” oleh OwlStorm / Ashe Kirk (Owlish Media), CC0: https://freesound.org/people/OwlStorm/sounds/151221/ . Audio dipendekkan pada hujung senyap, dilaraskan aras dan fade, tanpa menukar pic atau kelajuan. Fail disertakan secara setempat.


### Grafik peristiwa khusus
- `assets/independence-declaration.png`: ilustrasi AI Tunku Abdul Rahman mengumumkan tarikh kemerdekaan, bukan foto sejarah atau logo rasmi. Rujukan peristiwa: https://www.tytmelaka.gov.my/hari-pengisytiharan-tarikh-kemerdekaan/
- `assets/chap-goh-meh.png`: ilustrasi AI tanglung dan limau mandarin untuk Chap Goh Meh. Rujukan: https://www.tourism.gov.my/media/view/chap-goh-meh
