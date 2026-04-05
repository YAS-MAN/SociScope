// ============================================
// DATA SOSIOLOGI UNTUK SOCISCOPE
// ============================================

// Tipe data untuk Teori Sosiologi
export interface Theory {
  id: string;
  name: string;
  founder: string;
  year: string;
  scale: 'makro' | 'meso' | 'mikro';
  focus: 'konflik' | 'konsensus' | 'makna' | 'perubahan';
  objects: string[];
  difficulty: 'mudah' | 'sedang' | 'lanjut';
  description: string;
  keyConcepts: string[];
  exampleCase: {
    title: string;
    description: string;
    analysis: string;
  };
}

// Tipe data untuk Konsep Kacamata Sosiologi
export interface Concept {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  indonesiaCase: {
    title: string;
    scenario: string;
    analysis: string;
  };
}

// Tipe data untuk Profesi/Karir
export interface Career {
  id: string;
  title: string;
  icon: string;
  description: string;
  salaryRange: string;
  skills: string[];
  requirements: string[];
}

// ============================================
// DATA: 10 TEORI SOSIOLOGI
// ============================================
export const theories: Theory[] = [
  {
    id: 'struktural-fungsional',
    name: 'Struktural Fungsionalisme',
    founder: 'Emile Durkheim, Talcott Parsons',
    year: '1893-1950an',
    scale: 'makro',
    focus: 'konsensus',
    objects: ['institusi', 'negara', 'budaya'],
    difficulty: 'mudah',
    description: 'Teori yang melihat masyarakat sebagai sistem yang saling terkait, di mana setiap bagian memiliki fungsi untuk menjaga stabilitas keseluruhan. Masyarakat diibaratkan seperti organ tubuh yang saling bekerja sama.',
    keyConcepts: ['Fakta Sosial', 'Solidaritas Sosial', 'Fungsi Manifest', 'Fungsi Laten', 'Homeostasis Sosial'],
    exampleCase: {
      title: 'Sistem Pendidikan di Indonesia',
      description: 'Pendidikan tidak hanya mengajar membaca-menulis, tetapi juga menyatukan berbagai suku bangsa dengan bahasa Indonesia.',
      analysis: 'Fungsi manifest: transfer pengetahuan. Fungsi laten: integrasi nasional dan pembentukan identitas kebangsaan.'
    }
  },
  {
    id: 'konflik-marxis',
    name: 'Teori Konflik Marxis',
    founder: 'Karl Marx, Friedrich Engels',
    year: '1848-1883',
    scale: 'makro',
    focus: 'konflik',
    objects: ['ekonomi', 'negara', 'institusi'],
    difficulty: 'sedang',
    description: 'Teori yang melihat masyarakat sebagai arena pertarungan antar kelas, terutama antara pemilik alat produksi (borjuis) dan pekerja (proletar). Perubahan sosial terjadi melalui revolusi.',
    keyConcepts: ['Materialisme Dialektis', 'Kelas Sosial', 'Alienasi', 'Nilai Lebih', 'Kesadaran Kelas'],
    exampleCase: {
      title: 'Kesenjangan Upah di Sektor Tambang',
      description: 'Pekerja tambang di Papua menerima upah jauh di bawah keuntungan perusahaan multinasional.',
      analysis: 'Konflik antara kepentingan modal (profit) dan tenaga kerja (upah layak). Marx melihat ini sebagai eksploitasi nilai lebih.'
    }
  },
  {
    id: 'konflik-weberian',
    name: 'Teori Konflik Weberian',
    founder: 'Max Weber',
    year: '1904-1920',
    scale: 'makro',
    focus: 'konflik',
    objects: ['institusi', 'budaya', 'negara'],
    difficulty: 'sedang',
    description: 'Weber memperluas analisis konflik di luar ekonomi. Ia melihat dominasi juga berasal dari status sosial dan kekuasaan politik. Konflik bersumber dari tiga sumber: kelas, status, dan partai.',
    keyConcepts: ['Tindakan Sosial', 'Dominasi', 'Birokrasi Ideal', 'Etika Protestan', 'Rasionalisasi'],
    exampleCase: {
      title: 'Monopoli Politik Dinasti di Daerah',
      description: 'Keluarga tertentu mendominasi kursi bupati/walikota selama beberapa generasi di beberapa daerah Indonesia.',
      analysis: 'Kekuasaan politik yang terkonsentrasi menciptakan dominasi berkelanjutan, bukan hanya karena kekayaan tetapi juga jaringan dan legitimasi tradisional.'
    }
  },
  {
    id: 'simbolik-interaksionisme',
    name: 'Interaksionisme Simbolik',
    founder: 'George Herbert Mead, Herbert Blumer',
    year: '1930an-1960an',
    scale: 'mikro',
    focus: 'makna',
    objects: ['individu', 'budaya'],
    difficulty: 'mudah',
    description: 'Teori yang fokus pada bagaimana individu membuat makna melalui interaksi sehari-hari. Manusia dilihat sebagai aktor aktif yang menafsirkan simbol-simbol dalam kehidupan bersama.',
    keyConcepts: ['Makna', 'Self', 'Significant Others', 'Generalized Other', 'Dramaturgi'],
    exampleCase: {
      title: 'Penggunaan Emoji dalam Chat Kerja',
      description: 'Emoji tersenyum 🙂 di chat formal bisa diartikan sopan, sarkasme, atau pasif-agresif tergantung konteks.',
      analysis: 'Makna tidak melekat pada simbol itu sendiri, tetapi dibangun melalui interaksi dan interpretasi bersama.'
    }
  },
  {
    id: 'fenomenologi',
    name: 'Fenomenologi Sosial',
    founder: 'Alfred Schutz, Peter Berger',
    year: '1960an-1970an',
    scale: 'mikro',
    focus: 'makna',
    objects: ['individu', 'budaya'],
    difficulty: 'lanjut',
    description: 'Teori yang menekankan bagaimana orang mengalami dan memaknai dunia sehari-hari. Realitas sosial adalah konstruksi yang diciptakan melalui proses saling memahami.',
    keyConcepts: ['Dunia Kehidupan', 'Relevansi', 'Tipifikasi', 'Sikap Natural', 'Multiple Realities'],
    exampleCase: {
      title: 'Ekspektasi "Anak Pertama" dalam Keluarga Jawa',
      description: 'Anak pertama sering dimaknai sebagai "bapak/ibu kecil" yang harus menjadi teladan dan penanggung jawab adik-adiknya.',
      analysis: 'Posisi kelahiran menjadi "pengetahuan umum" yang membentuk ekspektasi dan perilaku, meski tidak semua anak pertama merasa demikian.'
    }
  },
  {
    id: 'etnometodologi',
    name: 'Etnometodologi',
    founder: 'Harold Garfinkel',
    year: '1967',
    scale: 'mikro',
    focus: 'makna',
    objects: ['individu'],
    difficulty: 'lanjut',
    description: 'Studi tentang metode-metode yang digunakan orang untuk membuat sense dari situasi sosial. Fokus pada praktik-praktik sehari-hari yang biasanya tidak disadari.',
    keyConcepts: ['Breaching Experiment', 'Account', 'Indexicality', 'Reflexivity', 'Ad Hocing'],
    exampleCase: {
      title: 'Cara Orang Indonesia Mengatur Antrian',
      description: 'Di warung kopi, orang sering bertanya "Siapa yang terakhir?" meski tidak ada antrian formal.',
      analysis: 'Ini adalah metode praktis (etnometodologi) untuk mengatur urutan tanpa aturan tertulis, mengandalkan praktik bersama yang dipahami.'
    }
  },
  {
    id: 'pertukaran-rasional',
    name: 'Teori Pertukaran Rasional',
    founder: 'George Homans, Peter Blau',
    year: '1960an-1970an',
    scale: 'mikro',
    focus: 'konsensus',
    objects: ['individu', 'ekonomi'],
    difficulty: 'sedang',
    description: 'Teori yang melihat interaksi sosial sebagai pertukaran sumber daya (materiil maupun non-materiil) yang bertujuan memaksimalkan keuntungan dan meminimalkan kerugian.',
    keyConcepts: ['Profit', 'Investasi', 'Reward', 'Cost', 'Equity'],
    exampleCase: {
      title: 'Relasi "Teman Makan" di Kantor',
      description: 'Karyawan saling mengajak makan siang, membawa oleh-oleh, dengan ekspektasi akan dibalas di lain waktu.',
      analysis: 'Hubungan sosial diatur oleh kalkulus pertukaran: waktu, perhatian, dan sumber daya saling dipertukarkan untuk menjalin ikatan.'
    }
  },
  {
    id: 'feminisme',
    name: 'Teori Feminis',
    founder: 'Simone de Beauvoir, Patricia Hill Collins',
    year: '1949-sekarang',
    scale: 'makro',
    focus: 'konflik',
    objects: ['institusi', 'budaya', 'negara'],
    difficulty: 'sedang',
    description: 'Teori yang menganalisis hubungan kuasa berdasarkan gender. Feminisme menunjukkan bagaimana struktur sosial, budaya, dan politik menciptakan ketidaksetaraan antara laki-laki dan perempuan.',
    keyConcepts: ['Patriarki', 'Interseksionalitas', 'Standar Ganda', 'Gender sebagai Konstruksi Sosial', 'Tubuh sebagai Medan Kuasa'],
    exampleCase: {
      title: 'Beban Ganda Perempuan Pekerja di Indonesia',
      description: 'Perempuan bekerja penuh waktu masih diharapkan mengurus rumah tangga tanpa pembagian kerja yang setara.',
      analysis: 'Patriarki mengonstruksi peran domestik sebagai "kodrat" perempuan, menciptakan eksploitasi ganda (di tempat kerja dan di rumah).'
    }
  },
  {
    id: 'konstruksi-sosial',
    name: 'Konstruksi Sosial dari Realitas',
    founder: 'Peter Berger & Thomas Luckmann',
    year: '1966',
    scale: 'meso',
    focus: 'makna',
    objects: ['individu', 'institusi', 'budaya'],
    difficulty: 'sedang',
    description: 'Teori yang menjelaskan bagaimana pengetahuan dan realitas diciptakan, dipelihara, dan diubah melalui interaksi sosial. Apa yang kita anggap "nyata" adalah hasil proses sosial.',
    keyConcepts: ['Eksternalisasi', 'Objektivasi', 'Internalisasi', 'Legitimasi', 'Institusionalisasi'],
    exampleCase: {
      title: 'Konstruksi "Kelas Menengah" di Indonesia',
      description: 'Kategori "kelas menengah" sering diasosiasikan dengan mobil, rumah tapak, dan gaya hidup tertentu, bukan hanya pendapatan.',
      analysis: 'Kelas bukan fakta objektif melainkan konstruksi sosial yang diberi makna melalui konsumsi, gaya hidup, dan pengakuan sosial.'
    }
  },
  {
    id: 'sistem-dunia',
    name: 'Teori Sistem Dunia',
    founder: 'Immanuel Wallerstein',
    year: '1974',
    scale: 'makro',
    focus: 'perubahan',
    objects: ['negara', 'ekonomi', 'teknologi'],
    difficulty: 'lanjut',
    description: 'Teori yang menganalisis kapitalisme sebagai sistem dunia yang terintegrasi. Dunia dibagi menjadi inti (core), setengah-periferi (semi-periphery), dan periferi (periphery).',
    keyConcepts: ['Core-Periphery', 'Siklus Hegemoni', 'Krisis Sistemik', 'Akumulasi Modal Dunia', 'Krisis Keseimbangan'],
    exampleCase: {
      title: 'Posisi Indonesia dalam Rantai Global Elektronik',
      description: 'Indonesia mengekspor bijih nikel untuk baterai EV ke Korea dan China, sementara produk jadi diimpor kembali dengan harga lebih tinggi.',
      analysis: 'Indonesia berada di posisi periferi (penyedia bahan mentah) dalam sistem dunia elektronik, sementara negara inti menguasai teknologi dan merek.'
    }
  }
];

// ============================================
// DATA: 4 KONSEP KACAMATA SOSIOLOGI
// ============================================
export const concepts: Concept[] = [
  {
    id: 'imajinasi-sosiologis',
    name: 'Imajinasi Sosiologis',
    subtitle: 'C. Wright Mills (1959)',
    description: 'Kemampuan untuk melihat hubungan antara pengalaman pribadi (masalah pribadi) dengan struktur sosial yang lebih besar (isu publik). Imajinasi sosiologis memungkinkan kita memahami sejarah dalam diri kita dan diri kita dalam sejarah.',
    keyPoints: [
      'Masalah Pribadi vs Isu Publik',
      'Biografi dan Sejarah bertemu',
      'Melihat pola di balik individualitas',
      'Kritik terhadap common sense'
    ],
    indonesiaCase: {
      title: 'PHK Massal di Sektor Teknologi 2023-2024',
      scenario: 'Andi, software engineer di Jakarta, di-PHK tiba-tiba. Ia merasa gagal dan tidak berbakat.',
      analysis: 'Dengan imajinasi sosiologis, PHK Andi bukan kegagalan pribadi melainkan isu struktural: investor global menarik modal, startup unicorn mengalami koreksi pasar, dan kebijakan ekonomi makro mempengaruhi sektor teknologi. Masalah pribadi Andi adalah manifestasi dari transformasi ekonomi global.'
    }
  },
  {
    id: 'struktur-agen',
    name: 'Struktur vs Agen',
    subtitle: 'Anthony Giddens - Teori Strukturasi',
    description: 'Debat klasik sosiologi: sejauh mana struktur sosial (aturan, norma, institusi) membatasi atau memungkinkan tindakan individu (agen)? Giddens menawarkan sintesis: struktur dan agen saling memproduksi.',
    keyPoints: [
      'Struktur membatasi TAPI juga memungkinkan',
      'Agen memiliki "pengetahuan praktis"',
      'Reproduksi dan transformasi struktur',
      'Dialektika kontrol dan kebebasan'
    ],
    indonesiaCase: {
      title: 'Perempuan Memakai Jilbab di Sekolah Negeri',
      scenario: 'Sebuah SMA negeri di Jawa Barat mewajibkan jilbab bagi siswi Muslim, meski aturan pusat melarang.',
      analysis: 'Struktur (kebijakan sekolah, tekanan sosial) membatasi pilihan siswi. Namun siswi juga punya agensi: menerima, menolak, atau menegosiasi (misal: memakai jilbab tipis, mengajukan keberatan). Struktur tidak sepenuhnya menentukan; ada ruang untuk tindakan kreatif.'
    }
  },
  {
    id: 'interseksionalitas',
    name: 'Interseksionalitas',
    subtitle: 'Kimberlé Crenshaw (1989)',
    description: 'Kerangka analisis yang melihat bagaimana berbagai identitas sosial (gender, ras, kelas, agama, disabilitas) saling bersilangan dan menciptakan pengalaman unik yang tidak bisa dipahami hanya dari satu kategori saja.',
    keyPoints: [
      'Identitas tidak berdiri sendiri',
      'Marginalitas ganda/triple',
      'Sistem opresi saling terkait',
      'Pentingnya perspektif dari bawah'
    ],
    indonesiaCase: {
      title: 'Pekerja Rumah Tangga Migran Perempuan',
      scenario: 'Siti, perempuan asal NTT, bekerja sebagai PRT di Jakarta. Ia menghadapi eksploitasi upah, pelecehan, dan diskriminasi etnis.',
      analysis: 'Siti tidak hanya menghadapi masalah gender (seksisme) atau kelas (eksploitasi pekerja) atau etnis (diskriminasi terhadap orang timur) secara terpisah. Ia menghadapi interseksi ketiga: perempuan + miskin + dari timur = kerentanan ganda yang unik. Kebijakan perlindungan harus memahami persilangan ini.'
    }
  },
  {
    id: 'konstruksi-sosial',
    name: 'Konstruksi Sosial',
    subtitle: 'Peter Berger & Thomas Luckmann',
    description: 'Pengetahuan tentang realitas tidak datang secara alami melainkan diciptakan, dipelihara, dan diubah melalui interaksi sosial. Apa yang kita anggap "fakta" atau "normal" adalah hasil kesepakatan sosial yang bisa berubah.',
    keyPoints: [
      'Realitas adalah produk sosial',
      'Habitualisasi dan institusionalisasi',
      'Legitimasi melalui ideologi',
      'Realitas bisa "didekonstruksi"'
    ],
    indonesiaCase: {
      title: 'Perubahan Makna "Nikah Siri" di Indonesia',
      scenario: 'Pernikahan tanpa catatan sipil (nikah siri) dulu dianggap tidak sah secara hukum, kini di beberapa komunitas dianggap sah secara agama meski tidak negara.',
      analysis: 'Status "nikah siri" bukan fakta objektif melainkan konstruksi yang berubah. Negara mengkonstruksinya sebagai "tidak sah", agama sebagai "sah", dan masyarakat mengonstruksinya berbeda-beda. Maknanya bergantung pada siapa yang berbicara dan dalam konteks apa.'
    }
  }
];

// ============================================
// DATA: 8 PROFESI LULUSAN SOSIOLOGI
// ============================================
export const careers: Career[] = [
  {
    id: 'peneliti-sosial',
    title: 'Peneliti Sosial',
    icon: 'Microscope',
    description: 'Merancang dan melaksanakan penelitian untuk memahami perilaku, sikap, dan tren sosial. Bekerja di lembaga riset, universitas, atau konsultan.',
    salaryRange: 'Rp 6-25 juta/bulan',
    skills: ['Metode Penelitian', 'Statistik', 'Wawancara Mendalam', 'Analisis Data', 'Penulisan Akademik'],
    requirements: ['S1/S2 Sosiologi', 'Pengalaman riset', 'Publikasi (untuk akademik)']
  },
  {
    id: 'analis-kebijakan',
    title: 'Analis Kebijakan Publik',
    icon: 'Landmark',
    description: 'Menganalisis dampak sosial dari kebijakan pemerintah, merekomendasikan solusi berbasis data untuk masalah kemiskinan, pendidikan, kesehatan, dan lainnya.',
    salaryRange: 'Rp 8-30 juta/bulan',
    skills: ['Analisis Kebijakan', 'Advokasi', 'Stakeholder Management', 'Evaluasi Program', 'Penulisan Laporan'],
    requirements: ['S1/S2 Sosiologi/Kebijakan Publik', 'Pemahaman birokrasi', 'Jaringan dengan pemerintah']
  },
  {
    id: 'hr-manager',
    title: 'HR & Talent Manager',
    icon: 'Users',
    description: 'Mengelola sumber daya manusia dengan memahami dinamika kelompok, budaya organisasi, dan perilaku pekerja. Fokus pada engagement dan pengembangan talenta.',
    salaryRange: 'Rp 10-40 juta/bulan',
    skills: ['People Analytics', 'Organizational Culture', 'Conflict Resolution', 'Talent Development', 'Employee Engagement'],
    requirements: ['S1 Sosiologi/Psikologi', 'Sertifikasi HR (diutamakan)', 'Pengalaman 3-5 tahun']
  },
  {
    id: 'konsultan-perubahan',
    title: 'Konsultan Perubahan Sosial',
    icon: 'RefreshCw',
    description: 'Membantu organisasi atau komunitas mengelola transisi dan transformasi sosial. Bekerja di NGO, CSR korporasi, atau konsultan independen.',
    salaryRange: 'Rp 8-35 juta/bulan',
    skills: ['Community Engagement', 'Program Design', 'Monitoring & Evaluation', 'Facilitation', 'Cultural Sensitivity'],
    requirements: ['S1/S2 Sosiologi/Development Studies', 'Pengalaman lapangan', 'Jaringan komunitas']
  },
  {
    id: 'community-organizer',
    title: 'Community Organizer',
    icon: 'Megaphone',
    description: 'Memobilisasi dan memberdayakan komunitas untuk mengatasi masalah bersama. Bekerja di organisasi masyarakat sipil, serikat pekerja, atau gerakan sosial.',
    salaryRange: 'Rp 5-20 juta/bulan',
    skills: ['Mobilisasi Massa', 'Advokasi', 'Negotiation', 'Public Speaking', 'Network Building'],
    requirements: ['S1 Sosiologi/Ilmu Sosial', 'Pengalaman organisasi', 'Komitmen pada isu sosial']
  },
  {
    id: 'ux-researcher',
    title: 'UX Researcher',
    icon: 'Smartphone',
    description: 'Mempelajari perilaku pengguna produk digital melalui riset kualitatif dan kuantitatif. Menjembatani kebutuhan user dengan desain teknologi.',
    salaryRange: 'Rp 10-45 juta/bulan',
    skills: ['User Interview', 'Usability Testing', 'Journey Mapping', 'A/B Testing', 'Design Thinking'],
    requirements: ['S1 Sosiologi/Psikologi/Desain', 'Portofolio riset', 'Pemahaman teknologi digital']
  },
  {
    id: 'data-social-good',
    title: 'Data for Social Good',
    icon: 'BarChart3',
    description: 'Menggunakan data science untuk memecahkan masalah sosial seperti kemiskinan, ketidaksetaraan, dan akses layanan. Bekerja di nonprofit, think tank, atau startup sosial.',
    salaryRange: 'Rp 12-40 juta/bulan',
    skills: ['Data Analysis (Python/R)', 'Data Visualization', 'SQL', 'Machine Learning (dasar)', 'Storytelling dengan Data'],
    requirements: ['S1 Sosiologi/Statistik/Ilmu Komputer', 'Kursus data science', 'Portofolio proyek data']
  },
  {
    id: 'social-listener',
    title: 'Corporate Social Listener',
    icon: 'MessageCircle',
    description: 'Memantau dan menganalisis percakapan di media sosial untuk memahami sentimen publik, tren budaya, dan isu-isu yang memengaruhi reputasi brand.',
    salaryRange: 'Rp 7-25 juta/bulan',
    skills: ['Social Media Analytics', 'Sentiment Analysis', 'Crisis Management', 'Trend Forecasting', 'Cross-cultural Analysis'],
    requirements: ['S1 Sosiologi/Komunikasi', 'Pemahaman platform sosial media', 'Tools: Brandwatch, Sprinklr, dll']
  }
];

// ============================================
// DATA: KASUS INTERAKTIF UNTUK KACAMATA SOSIOLOGI
// ============================================
export interface InteractiveCase {
  id: string;
  title: string;
  description: string;
  context: string;
  questions: {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
      concept: string;
      analysis: string;
    }[];
  }[];
}

export const interactiveCases: InteractiveCase[] = [
  {
    id: 'demo-umkm',
    title: 'Demo UMKM di Jakarta',
    description: 'Ribuan pedagang kaki lima (PKL) berdemo menolak penggusuran di kawasan elite Jakarta.',
    context: 'Pemerintah berencana menata kawasan Sudirman-Thamrin untuk menciptakan "kota global". PKL yang berjualan di trotoar selama puluhan tahun akan direlokasi ke lokasi jauh dari keramaian.',
    questions: [
      {
        id: 'q1',
        text: 'Bagaimana kamu menganalisis konflik ini?',
        options: [
          {
            id: 'a',
            text: 'Ini pertarungan kelas: pemilik modal vs pekerja informal',
            concept: 'Teori Konflik Marxis',
            analysis: 'Kamu melihat adanya konflik kepentingan antara kelas pemilik modal (pengembang, korporasi) yang ingin menguasai ruang publik untuk profit, dengan pekerja informal (PKL) yang bergantung pada akses ke pusat ekonomi. Penggusuran adalah bentuk ekspropriasi ruang hidup rakyat kecil.'
          },
          {
            id: 'b',
            text: 'Ini masalah fungsi ruang publik yang perlu dikelola',
            concept: 'Struktural Fungsionalisme',
            analysis: 'Kamu melihat masyarakat membutuhkan ketertiban dan estetika kota untuk menarik investasi. PKL dan pejalan kaki adalah dua bagian yang perlu diatur agar fungsi kota berjalan optimal. Relokasi adalah upaya menciptakan keseimbangan fungsional.'
          },
          {
            id: 'c',
            text: 'Ini tentang makna "kota" yang berbeda bagi aktor berbeda',
            concept: 'Interaksionisme Simbolik',
            analysis: 'Kamu melihat "trotoar Sudirman" memiliki makna berbeda: bagi PKL itu adalah tempat mencari nafkah dan identitas, bagi pemerintah itu adalah simbol modernitas, bagi pejalan kaki itu adalah kenyamanan. Konflik terjadi karena makna-makna ini bertabrakan.'
          },
          {
            id: 'd',
            text: 'Ini menunjukkan interseksi kemiskinan, informalitas, dan urbanisasi',
            concept: 'Interseksionalitas',
            analysis: 'Kamu melihat PKL bukan hanya "pelaku ekonomi informal" melainkan subjek yang mengalami interseksi: mereka miskin (kelas), tidak punya akses ke formal employment (struktur ekonomi), dan terpinggirkan dalam perencanaan kota (urban). Kerentanan mereka adalah hasil persilangan faktor ini.'
          }
        ]
      }
    ]
  },
  {
    id: 'viral-tiktok',
    title: 'Viral TikTok: "Saya Capek Jadi Orang Miskin"',
    description: 'Seorang pemuda mengeluhkan kesulitan hidup di media sosial dan viral, mendapat simpati sekaligus kritik.',
    context: 'Video seorang pemuda yang mengatakan "Saya capek jadi orang miskin, tiap hari mikirin uang" viral di TikTok. Banyak yang relate, tapi ada juga yang mengkritiknya sebagai "tidak bersyukur" atau "playing victim".',
    questions: [
      {
        id: 'q1',
        text: 'Bagaimana kamu memahami fenomena viral ini?',
        options: [
          {
            id: 'a',
            text: 'Ini ekspresi alienasi pekerja di era kapitalisme digital',
            concept: 'Teori Konflik Marxis',
            analysis: 'Kamu melihat konten ini sebagai ekspresi alienasi: pemuda itu merasa terpisah dari hasil kerjanya, dari proses produksi, dan dari sesama manusia. Media sosial menjadi outlet frustrasi kelas pekerja yang terus-menerus dieksploitasi.'
          },
          {
            id: 'b',
            text: 'Ini performa kesedihan dalam ekonomi perhatian',
            concept: 'Interaksionisme Simbolik / Dramaturgi',
            analysis: 'Kamu melihat ini sebagai "drama" yang dimainkan di depan layar. Pemuda itu membangun karakter "korban sistem" untuk mendapatkan empati (likes, shares, followers). Emosi menjadi komoditas dalam ekonomi perhatian digital.'
          },
          {
            id: 'c',
            text: 'Ini menunjukkan bagaimana kemiskinan dikonstruksi sebagai aib',
            concept: 'Konstruksi Sosial',
            analysis: 'Kamu melihat "kemiskinan" tidak hanya kekurangan materi melainkan status yang diberi makna negatif. Reaksi "tidak bersyukur" menunjukkan ideologi meritokrasi: miskin adalah salah sendiri. Pemuda itu mencoba mendekonstruksi makna ini dengan mengungkapkan penderitaan.'
          },
          {
            id: 'd',
            text: 'Ini masalah pribadi yang menjadi isu publik',
            concept: 'Imajinasi Sosiologis',
            analysis: 'Kamu menggunakan imajinasi sosiologis Mills: frustrasi pribadi pemuda itu (masalah pribadi) adalah manifestasi dari struktur ekonomi (PHK massal, inflasi, kesenjangan upah). Yang viral bukan hanya videonya melainkan pengalaman bersama jutaan orang dalam situasi serupa.'
          }
        ]
      }
    ]
  },
  {
    id: 'poligami-artis',
    title: 'Kontroversi Poligami Artis',
    description: 'Seorang artis terkenal mempoligami istrinya dan mendapat reaksi beragam dari publik.',
    context: 'Artis A mengumumkan poligami di media sosial. Ada yang mendukung dengan dalih "sunnah", ada yang mengkritik ketidakadilan terhadap istri pertama, dan ada yang melihatnya sebagai privasi pribadi.',
    questions: [
      {
        id: 'q1',
        text: 'Bagaimana kamu menganalisis reaksi publik ini?',
        options: [
          {
            id: 'a',
            text: 'Ini pertarungan legitimasi antara agama, negara, dan feminisme',
            concept: 'Teori Konflik Weberian',
            analysis: 'Kamu melihat tiga basis dominasi bertarung: dominasi tradisional (agama/kebiasaan) yang melegitimasi poligami, dominasi rasional-legal (hukum negara) yang membatasinya, dan dominasi karismatik (feminisme) yang mengkritik ketidakadilan gender.'
          },
          {
            id: 'b',
            text: 'Ini menunjukkan standar ganda dalam moralitas seksual',
            concept: 'Teori Feminis',
            analysis: 'Kamu melihat poligami diterima untuk laki-laki (dilihat sebagai "sanggama") sementara perempuan yang serupa dikriminalisasi (zina). Ini adalah patriarki dalam aksi: mengontrol seksualitas perempuan sambil memberi kebebasan pada laki-laki.'
          },
          {
            id: 'c',
            text: 'Ini tentang negosiasi makna "pernikahan" dalam masyarakat plural',
            concept: 'Konstruksi Sosial',
            analysis: 'Kamu melihat "pernikahan" tidak punya makna tunggal. Bagi kelompok konservatif, itu adalah institusi agama. Bagi feminis, itu adalah kontrak sosial yang harus setara. Bagi liberal, itu adalah urusan pribadi. Konflik adalah perang makna tentang apa yang dianggap "normal".'
          },
          {
            id: 'd',
            text: 'Ini performa status dan diferensiasi kelas',
            concept: 'Teori Pertukaran Rasional',
            analysis: 'Kamu melihat poligami artis sebagai pertukaran sumber daya: kekayaan dan ketenaran ditukar dengan akses ke tubuh perempuan lebih muda. Artis itu memaksimalkan "profit" sosial (maskulinitas, status) dengan "biaya" ekonomi (nafkah) dan sosial (kritik publik).'
          }
        ]
      }
    ]
  }
];

// ============================================
// DATA: CHATBOT TEO RESPONSES
// ============================================
export interface ChatResponse {
  keywords: string[];
  response: string;
}

export const teoResponses: ChatResponse[] = [
  {
    keywords: ['halo', 'hi', 'hello', 'hai'],
    response: 'Halo! Saya Teo, asisten sosiologi virtualmu. Ada yang bisa saya bantu tentang sosiologi hari ini?'
  },
  {
    keywords: ['apa itu sosiologi', 'definisi sosiologi', 'sosiologi adalah'],
    response: 'Sosiologi adalah ilmu yang mempelajari masyarakat, pola interaksi sosial, dan hubungan antara individu dengan struktur sosial. Sosiologi membantu kita memahami mengapa masyarakat berfungsi seperti yang kita lihat, dan bagaimana perubahan sosial terjadi.'
  },
  {
    keywords: ['teori', 'theory'],
    response: 'Sosiologi memiliki banyak teori! Yang utama ada: Struktural Fungsionalisme (Durkheim), Teori Konflik (Marx, Weber), Interaksionisme Simbolik (Mead, Blumer), dan Konstruksi Sosial (Berger & Luckmann). Mau tahu lebih lanjut tentang teori tertentu?'
  },
  {
    keywords: ['karir', 'kerja', 'pekerjaan', 'profesi', 'lulusan'],
    response: 'Lulusan sosiologi bisa bekerja sebagai: Peneliti Sosial, Analis Kebijakan, HR Manager, UX Researcher, Community Organizer, Data Analyst, Konsultan CSR, dan masih banyak lagi. Kunci suksesnya adalah menggabungkan pemahaman sosial dengan skill teknis seperti data analysis atau digital marketing.'
  },
  {
    keywords: ['kacamata sosiologi', 'perspektif', 'cara berpikir'],
    response: 'Kacamata sosiologi meliputi: Imajinasi Sosiologis (Mills), Struktur vs Agen (Giddens), Interseksionalitas (Crenshaw), dan Konstruksi Sosial (Berger & Luckmann). Masing-masing memberi lensa berbeda untuk melihat fenomena sosial.'
  },
  {
    keywords: ['marx', 'konflik', 'kapitalisme', 'kelas'],
    response: 'Karl Marx melihat masyarakat sebagai arena pertarungan antar kelas. Pemilik alat produksi (borjuis) mengeksploitasi pekerja (proletar). Konsep kuncinya: alienasi, nilai lebih, dan kesadaran kelas. Perubahan sosial terjadi melalui revolusi.'
  },
  {
    keywords: ['durkheim', 'fungsionalisme', 'fakta sosial'],
    response: 'Emile Durkheim melihat masyarakat sebagai organisme yang setiap bagiannya punya fungsi. Konsep kuncinya: fakta sosial (eksternal dan memaksa), solidaritas mekanik (masyarakat tradisional) dan organik (masyarakat modern), serta anomie (kekacauan norma).'
  },
  {
    keywords: ['weber', 'tindakan sosial', 'dominasi', 'birokrasi'],
    response: 'Max Weber fokus pada tindakan sosial yang bermakna dan rasionalitas. Konsep kuncinya: tipe dominasi (tradisional, karismatik, rasional-legal), birokrasi ideal, etika protestan dan semangat kapitalisme, serta verstehen (pemahaman subjektif).'
  },
  {
    keywords: ['interaksionisme', 'simbolik', 'mead', 'blumer'],
    response: 'Interaksionisme Simbolik melihat individu membuat makna melalui interaksi. Konsep kuncinya: self (diri sebagai objek dan subjek), significant others, generalized other, dan dramaturgi (Goffman) - kehidupan sosial sebagai panggung teater.'
  },
  {
    keywords: ['imajinasi sosiologis', 'mills', 'masalah pribadi', 'isu publik'],
    response: 'C. Wright Mills mengajarkan kita menghubungkan masalah pribadi dengan isu publik. Contoh: PHK bukan hanya kegagalan individu (masalah pribadi), tetapi juga transformasi ekonomi (isu publik). Imajinasi sosiologis memungkinkan kita melihat pola di balik individualitas.'
  },
  {
    keywords: ['interseksionalitas', 'crenshaw', 'identitas'],
    response: 'Interseksionalitas (Kimberlé Crenshaw) melihat bagaimana identitas (gender, ras, kelas, agama) saling bersilang. Seorang perempuan kulit hitam miskin mengalami opresi yang berbeda dari perempuan kulit putih miskin atau laki-laki kulit hitam miskin. Identitas tidak berdiri sendiri.'
  },
  {
    keywords: ['konstruksi sosial', 'berger', 'luckmann', 'realitas'],
    response: 'Berger & Luckmann menunjukkan bahwa realitas adalah konstruksi sosial. Pengetahuan tentang dunia diciptakan melalui interaksi, dipelihara oleh institusi, dan diinternalisasi oleh individu. Apa yang kita anggap "fakta" atau "normal" bisa berubah.'
  },
  {
    keywords: ['metode penelitian', 'kualitatif', 'kuantitatif'],
    response: 'Penelitian sosiologi menggunakan metode kualitatif (wawancara mendalam, observasi partisipan, studi kasus) dan kuantitatif (survei, statistik, analisis data besar). Pilihan metode tergantung pada pertanyaan penelitian dan paradigma teoretis.'
  },
  {
    keywords: ['fenomena indonesia', 'kasus indonesia', 'contoh'],
    response: 'Fenomena Indonesia yang menarik dianalisis sosiologis: urbanisasi dan gentrifikasi, polarisasi politik di media sosial, transformasi kelas menengah, relasi agama dan negara, migrasi dan diaspora, serta dampak digitalisasi pada masyarakat adat.'
  },
  {
    keywords: ['terima kasih', 'thanks', 'makasih'],
    response: 'Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain tentang sosiologi, silakan tanyakan. Selamat belajar!'
  }
];

export const defaultTeoResponse = 'Menarik pertanyaannya! Saya belum punya jawaban spesifik untuk itu, tapi saya bisa membantu dengan topik: teori sosiologi (Marx, Durkheim, Weber), kacamata sosiologi, karir lulusan, atau metode penelitian. Mau tahu tentang apa?'
