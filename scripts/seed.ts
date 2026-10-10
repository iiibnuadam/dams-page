import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { SectionSchemas } from "../src/lib/zod-schemas";
import bcrypt from "bcrypt";

// Load environment variables from .env.local first (preferred for secrets), then .env
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local or .env");
  process.exit(1);
}

const initialData = {
  "nav": {
    "about": {
      "en": "About",
      "id": "Tentang"
    },
    "contact": {
      "en": "Contact",
      "id": "Kontak"
    },
    "education": {
      "en": "Education",
      "id": "Pendidikan"
    },
    "experience": {
      "en": "Experience",
      "id": "Pengalaman"
    },
    "projects": {
      "en": "Projects",
      "id": "Proyek"
    },
    "logo": {
      "light": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/logo-dark.png",
      "dark": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/logo-light.png"
    }
  },
  "hero": {
    "contact": {
      "en": "Contact Me",
      "id": "Hubungi Saya"
    },
    "cta": {
      "en": "View My Work",
      "id": "Lihat Karya Saya"
    },
    "description": {
      "en": "Hi there! Adam's here. I'm a creative Front-End Developer with over 5 years of experience crafting sleek websites and apps in fast-paced, collaborative settings. My expertise lies in Vue.js and Typescript, complemented by a dash of React.js.",
      "id": "Halo! Saya Adam. Saya seorang Front-End Developer kreatif dengan pengalaman lebih dari 5 tahun dalam membuat website dan aplikasi yang elegan. Keahlian saya terletak pada Vue.js dan Typescript, dilengkapi dengan sedikit sentuhan React.js."
    },
    "name": {
      "en": "Ibnu Adam",
      "id": "Ibnu Adam"
    },
    "title": {
      "en": "Creative Front-End Developer",
      "id": "Creative Front-End Developer"
    },
    "tags": [
      "Frontend Developer",
      "Core Developer"
    ],
    "skills": [
      "Vue.js",
      "React.js",
      "TypeScript",
      "Micro-Frontends",
      "Go",
      "Java",
      "Docker",
      "Tailwind CSS",
      "Next.js",
      "Node.js"
    ],
    "status": {
      "variant": "available"
    },
    "image": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/Gemini_Generated_Image_l2igrul2igrul2ig.png"
  },
  "workExperience": {
    "experiences": [
      {
        "en": {
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/pgd%20logo.jpeg",
          "company": "PT. Pegadaian",
          "position": "Core Developer",
          "location": "Jakarta",
          "type": "Fulltime - Onsite",
          "period": "Aug 2024 - Present",
          "duration": "1+ Year",
          "description": [
            "Develop and maintain mission-critical internal enterprise platforms (SPRINT & Pegadaian Kita) using Vue 3, TypeScript, and micro-frontend architecture (Module Federation).",
            "Collaborate on core banking, transactional workflows, and operational service integrations using Vue, Go, and Java.",
            "Implement Progressive Web App (PWA) solutions to guarantee reliable performance and offline-readiness across nationwide branch offices."
          ],
          "skills": [
            "Micro-Frontends",
            "Vue 3",
            "TypeScript",
            "Go",
            "Java",
            "Module Federation",
            "PWA"
          ]
        },
        "id": {
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/pgd%20logo.jpeg",
          "company": "PT. Pegadaian",
          "position": "Core Developer",
          "location": "Jakarta",
          "type": "Fulltime - Onsite",
          "period": "Agu 2024 - Sekarang",
          "duration": "1+ Tahun",
          "description": [
            "Mengembangkan dan memelihara aplikasi internal enterprise berskala nasional (SPRINT & Pegadaian Kita) menggunakan Vue 3, TypeScript, dan arsitektur micro-frontend (Module Federation).",
            "Berkolaborasi dalam integrasi sistem operasional inti, pemrosesan transaksi, dan layanan bisnis enterprise menggunakan Vue, Go, dan Java.",
            "Mengimplementasikan kapabilitas Progressive Web App (PWA) guna memastikan keandalan akses operasional cabang di seluruh Indonesia."
          ],
          "skills": [
            "Micro-Frontends",
            "Vue 3",
            "TypeScript",
            "Go",
            "Java",
            "Module Federation",
            "PWA"
          ]
        },
        "_ui_id": "exp-0-1791649132864"
      },
      {
        "en": {
          "company": "Universitas Nahdlatul Ulama Yogyakarta",
          "position": "Frontend Developer",
          "location": "Yogyakarta",
          "type": "Contract - Hybrid",
          "period": "Jul 2024 - Present",
          "duration": "1+ Year",
          "description": [
            "Engineered internal university platforms, academic information systems (SIAKAD), and PBM (Teaching & Learning Process) modules tailored to UNU Yogyakarta institutional workflows.",
            "Developed the official university web portal (unu-jogja.ac.id) with high-performance SSR using Nuxt 3, Vue 3, and Tailwind CSS.",
            "Built the Program Orang Tua Asuh philanthropy web platform (ota.unu-jogja.ac.id) for donor sponsorship and scholarship management.",
            "Structured reusable, accessible UI component libraries and integrated RESTful APIs with university academic data services."
          ],
          "skills": [
            "Nuxt 3",
            "Vue.js",
            "TypeScript",
            "Tailwind CSS",
            "REST APIs",
            "SSR",
            "Academic Systems"
          ]
        },
        "id": {
          "company": "Universitas Nahdlatul Ulama Yogyakarta",
          "position": "Frontend Developer",
          "location": "Yogyakarta",
          "type": "Kontrak - Hybrid",
          "period": "Jul 2024 - Sekarang",
          "duration": "1+ Tahun",
          "description": [
            "Mengembangkan aplikasi internal kampus, sistem informasi akademik (SIAKAD), dan modul PBM (Proses Belajar Mengajar) sesuai kebutuhan operasional Universitas Nahdlatul Ulama Yogyakarta.",
            "Membangun portal web resmi universitas (unu-jogja.ac.id) berkinerja tinggi dengan arsitektur SSR menggunakan Nuxt 3, Vue 3, dan Tailwind CSS.",
            "Mengembangkan platform filantropi Program Orang Tua Asuh (ota.unu-jogja.ac.id) untuk pengelolaan sponsorship dan beasiswa mahasiswa.",
            "Menyusun arsitektur komponen UI yang modular dan aksesibel serta mengintegrasikan REST API dengan layanan data akademik kampus."
          ],
          "skills": [
            "Nuxt 3",
            "Vue.js",
            "TypeScript",
            "Tailwind CSS",
            "REST APIs",
            "SSR",
            "Academic Systems"
          ]
        },
        "_ui_id": "exp-1-1791649132864"
      },
      {
        "en": {
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/GITS%20Indonesia%20Logo.jpeg",
          "company": "PT. GITS Indonesia",
          "position": "Frontend Developer",
          "location": "Bandung",
          "type": "Fulltime - Remote",
          "period": "Dec 2021 - Jun 2024",
          "duration": "3 Years",
          "description": [
            "Spearheaded development of multiple enterprise client products from scratch using Nuxt 3, Vue 3, and TypeScript.",
            "Engineered cloud infrastructure dashboards, e-commerce platforms, web merchant tools, and real-time collaboration applications, increasing user engagement by 20%.",
            "Architected Morpheme UI, an enterprise design system standardizing accessible UI tokens and components across multi-squad teams.",
            "Optimized Core Web Vitals and technical SEO, achieving a 30% increase in Lighthouse page speed scores.",
            "Integrated WebSocket channels for real-time reactivity and headless Strapi CMS for decoupled content delivery.",
            "Maintained high code quality and test coverage using Jest, following Scrum sprint cycles and Git Flow."
          ],
          "skills": [
            "Nuxt.js",
            "Vue.js",
            "TypeScript",
            "Pinia",
            "Morpheme UI",
            "WebSockets",
            "Strapi",
            "Jest"
          ]
        },
        "id": {
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/GITS%20Indonesia%20Logo.jpeg",
          "company": "PT. GITS Indonesia",
          "position": "Frontend Developer",
          "location": "Bandung",
          "type": "Fulltime - Remote",
          "period": "Des 2021 - Jun 2024",
          "duration": "3 Tahun",
          "description": [
            "Memimpin pengembangan berbagai produk enterprise dari awal menggunakan Nuxt 3, Vue 3, dan TypeScript.",
            "Membangun dashboard layanan cloud, platform e-commerce, sistem merchant, dan aplikasi kolaborasi real-time, meningkatkan keterlibatan pengguna sebesar 20%.",
            "Merancang sistem desain enterprise Morpheme UI guna menstandarisasi komponen UI dan meningkatkan efisiensi delivery tim lintas divisi.",
            "Mengoptimalkan performa Core Web Vitals dan SEO teknis, menghasilkan peningkatan skor kecepatan halaman sebesar 30%.",
            "Mengintegrasikan WebSockets untuk komunikasi real-time serta headless CMS Strapi untuk pengelolaan data yang fleksibel.",
            "Menjaga kualitas kode dan pengujian unit dengan Jest, mengikuti alur kerja Scrum dan Git Flow."
          ],
          "skills": [
            "Nuxt.js",
            "Vue.js",
            "TypeScript",
            "Pinia",
            "Morpheme UI",
            "WebSockets",
            "Strapi",
            "Jest"
          ]
        },
        "_ui_id": "exp-2-1791649132864"
      },
      {
        "en": {
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/telkom%20logo.jpeg",
          "company": "PT. Telkom Indonesia Squad Digital Amoeba",
          "position": "Frontend Developer",
          "location": "Bandung",
          "type": "Contract - Remote",
          "period": "Sep 2021 - Feb 2022",
          "duration": "6 Months",
          "description": [
            "Developed internal digital incubation products from scratch using React.js and TypeScript, increasing squad delivery productivity by 20%.",
            "Architected scalable state management using Redux and Redux Thunk for complex transactional workflows.",
            "Constructed reusable UI component libraries, cutting subsequent feature turnaround time by 30%.",
            "Delivered pixel-perfect implementations translated from high-fidelity Figma specifications with responsive layout fidelity.",
            "Collaborated within agile Scrum sprints to deliver continuous product iterations on schedule."
          ],
          "skills": [
            "React.js",
            "TypeScript",
            "Redux",
            "Redux Thunk",
            "REST APIs",
            "Scrum"
          ]
        },
        "id": {
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/telkom%20logo.jpeg",
          "company": "PT. Telkom Indonesia Squad Digital Amoeba",
          "position": "Frontend Developer",
          "location": "Bandung",
          "type": "Kontrak - Remote",
          "period": "Sep 2021 - Feb 2022",
          "duration": "6 Bulan",
          "description": [
            "Mengembangkan produk inkubasi digital internal dari awal menggunakan React.js dan TypeScript, meningkatkan produktivitas tim sebesar 20%.",
            "Menerapkan arsitektur state management yang terstruktur menggunakan Redux dan Redux Thunk untuk alur transaksi kompleks.",
            "Membangun pustaka komponen antarmuka yang dapat digunakan kembali, memangkas waktu pengerjaan fitur baru sebesar 30%.",
            "Mewujudkan slicing UI pixel-perfect dari spesifikasi desain Figma dengan ketepatan tata letak responsif.",
            "Berkolaborasi dalam sprint agile Scrum untuk pengiriman iterasi produk secara tepat waktu."
          ],
          "skills": [
            "React.js",
            "TypeScript",
            "Redux",
            "Redux Thunk",
            "REST APIs",
            "Scrum"
          ]
        },
        "_ui_id": "exp-3-1791649132864"
      },
      {
        "en": {
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/Qatros%20Logo.jpeg",
          "company": "PT. Qatros Teknologi Indonesia",
          "position": "Frontend Developer",
          "location": "Yogyakarta",
          "type": "Fulltime - Hybrid",
          "period": "Aug 2020 - Sep 2021",
          "duration": "1 Year 2 Months",
          "description": [
            "Developed enterprise client platforms and internal tooling from scratch using Vue.js and Nuxt.js.",
            "Structured reusable component architectures applying atomic design principles across diverse viewports.",
            "Engineered asynchronous state pipelines using Vuex, ensuring fluid user interaction and reliable data fetching.",
            "Converted Figma UI/UX prototypes into accessible, responsive web interfaces under agile Scrum methodology."
          ],
          "skills": [
            "Vue.js",
            "Nuxt.js",
            "Vuex",
            "JavaScript",
            "Atomic Design",
            "REST APIs"
          ]
        },
        "id": {
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/Qatros%20Logo.jpeg",
          "company": "PT. Qatros Teknologi Indonesia",
          "position": "Frontend Developer",
          "location": "Yogyakarta",
          "type": "Fulltime - Hybrid",
          "period": "Agu 2020 - Sep 2021",
          "duration": "1 Tahun 2 Bulan",
          "description": [
            "Mengembangkan platform klien enterprise dan perangkat internal dari awal menggunakan Vue.js dan Nuxt.js.",
            "Menyusun arsitektur komponen reusable menerapkan prinsip desain atomik di berbagai ukuran layar.",
            "Mengelola alur data dan state asinkron menggunakan Vuex untuk memastikan interaksi antarmuka yang mulus dan andal.",
            "Mewujudkan prototipe UI/UX Figma menjadi antarmuka web yang responsif dan aksesibel dalam metodologi kerja Scrum."
          ],
          "skills": [
            "Vue.js",
            "Nuxt.js",
            "Vuex",
            "JavaScript",
            "Atomic Design",
            "REST APIs"
          ]
        },
        "_ui_id": "exp-4-1791649132864"
      }
    ],
    "title": {
      "en": "Work Experience",
      "id": "Pengalaman Kerja"
    }
  },
  "educationAndAwards": {
    "awards": [
      {
        "en": {
          "title": "Mahasiswa Berprestasi 2021",
          "issuer": "Universitas Negeri Yogyakarta",
          "date": "Apr 2021",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "gold"
        },
        "id": {
          "title": "Mahasiswa Berprestasi 2021",
          "issuer": "Universitas Negeri Yogyakarta",
          "date": "Apr 2021",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "gold"
        }
      },
      {
        "en": {
          "title": "Awardee Bank Indonesia Scholarship",
          "issuer": "Bank Indonesia",
          "date": "Feb 2021",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "gold"
        },
        "id": {
          "title": "Penerima Beasiswa Bank Indonesia",
          "issuer": "Bank Indonesia",
          "date": "Feb 2021",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "gold"
        }
      },
      {
        "en": {
          "title": "3rd Winner of Software Development – Techcomfest",
          "issuer": "Politeknik Negeri Semarang",
          "date": "Jan 2021",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "bronze"
        },
        "id": {
          "title": "Juara 3 Pengembangan Perangkat Lunak – Techcomfest",
          "issuer": "Politeknik Negeri Semarang",
          "date": "Jan 2021",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "bronze"
        }
      },
      {
        "en": {
          "title": "Mahasiswa Berprestasi 2020",
          "issuer": "Universitas Negeri Yogyakarta",
          "date": "Nov 2020",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "gold"
        },
        "id": {
          "title": "Mahasiswa Berprestasi 2020",
          "issuer": "Universitas Negeri Yogyakarta",
          "date": "Nov 2020",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "gold"
        }
      },
      {
        "en": {
          "title": "Gemastik 13 – Finalist of Software Development",
          "issuer": "Kemendikbud",
          "date": "Sep 2020",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "star"
        },
        "id": {
          "title": "Gemastik 13 – Finalis Pengembangan Perangkat Lunak",
          "issuer": "Kemendikbud",
          "date": "Sep 2020",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "star"
        }
      },
      {
        "en": {
          "title": "Gemastik 12 – Finalist of User Experience",
          "issuer": "Kemenristekdikti",
          "date": "Sep 2019",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "star"
        },
        "id": {
          "title": "Gemastik 12 – Finalis Pengalaman Pengguna (UX)",
          "issuer": "Kemenristekdikti",
          "date": "Sep 2019",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "star"
        }
      },
      {
        "en": {
          "title": "Team Favorite – Software Development UNITY",
          "issuer": "Universitas Negeri Yogyakarta",
          "date": "Mar 2019",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "star"
        },
        "id": {
          "title": "Tim Terfavorit – Pengembangan Perangkat Lunak UNITY",
          "issuer": "Universitas Negeri Yogyakarta",
          "date": "Mar 2019",
          "associatedWith": "Universitas Negeri Yogyakarta",
          "type": "star"
        }
      }
    ],
    "awardsTitle": {
      "en": "Awards",
      "id": "Penghargaan"
    },
    "education": [
      {
        "en": {
          "institution": "Universitas Negeri Yogyakarta",
          "degree": "Undergraduate of Education of Informatics Engineering",
          "period": "2018 - 2023",
          "description": [
            "Concentration: Software engineering, Information Systems Management",
            "GPA: 3.79",
            "Relevant courses: Software engineering, Introduction to Information Technology, Information Systems Management"
          ]
        },
        "id": {
          "institution": "Universitas Negeri Yogyakarta",
          "degree": "S1 Pendidikan Teknik Informatika",
          "period": "2018 - 2023",
          "description": [
            "Konsentrasi: Rekayasa Perangkat Lunak, Manajemen Sistem Informasi",
            "IPK: 3.79",
            "Mata kuliah relevan: Rekayasa Perangkat Lunak, Pengantar Teknologi Informasi, Manajemen Sistem Informasi"
          ]
        }
      }
    ],
    "educationTitle": {
      "en": "Education",
      "id": "Pendidikan"
    },
    "organizations": [
      {
        "en": {
          "role": "Media Kreatif",
          "organization": "GenBI DIY",
          "period": "Feb 2021 – Dec 2022",
          "associatedWith": "GenBI DIY"
        },
        "id": {
          "role": "Media Kreatif",
          "organization": "GenBI DIY",
          "period": "Feb 2021 – Des 2022",
          "associatedWith": "GenBI DIY"
        }
      },
      {
        "en": {
          "role": "Koordinator Fakultas",
          "organization": "GenBI DIY Komisariat UNY",
          "period": "Feb 2020 – Dec 2020",
          "associatedWith": "Universitas Negeri Yogyakarta"
        },
        "id": {
          "role": "Koordinator Fakultas",
          "organization": "GenBI DIY Komisariat UNY",
          "period": "Feb 2020 – Des 2020",
          "associatedWith": "Universitas Negeri Yogyakarta"
        }
      },
      {
        "en": {
          "role": "Wakil Ketua",
          "organization": "HIMANIKA FT UNY",
          "period": "Feb 2020 – Dec 2020",
          "associatedWith": "Universitas Negeri Yogyakarta"
        },
        "id": {
          "role": "Wakil Ketua",
          "organization": "HIMANIKA FT UNY",
          "period": "Feb 2020 – Des 2020",
          "associatedWith": "Universitas Negeri Yogyakarta"
        }
      }
    ],
    "organizationsTitle": {
      "en": "Organizations",
      "id": "Organisasi"
    },
    "title": {
      "en": "Education & Achievements",
      "id": "Pendidikan & Prestasi"
    }
  },
  "projects": {
    "items": [
      {
        "en": {
          "title": "BimbelKu",
          "description": "Modern operational management platform for tutoring centers. Powered by Go and PostgreSQL, automates camera attendance, private & regular schedules, multi-scheme tuition fees, tutor honorariums, and instant WhatsApp invoicing.",
          "technologies": [
            "Go",
            "PostgreSQL",
            "React",
            "TypeScript",
            "Tailwind CSS"
          ],
          "link": "https://bimbelku.web.id"
        },
        "id": {
          "title": "BimbelKu",
          "description": "Platform manajemen operasional bimbingan belajar modern. Didukung arsitektur backend Go dan PostgreSQL, mengotomasi presensi foto kamera, jadwal kelas, 3 skema tagihan SPP, honor tentor, hingga invoice WhatsApp instan.",
          "technologies": [
            "Go",
            "PostgreSQL",
            "React",
            "TypeScript",
            "Tailwind CSS"
          ],
          "link": "https://bimbelku.web.id"
        }
      },
      {
        "en": {
          "title": "SPRINT Pegadaian",
          "description": "Integrated micro-frontend operational and branch administration platform for PT. Pegadaian, powering core business workflows, transaction processing, and automated branch service management nationwide.",
          "technologies": [
            "Micro-Frontends",
            "Module Federation",
            "Vue 3",
            "TypeScript",
            "PWA"
          ],
          "link": "https://sprint.pegadaian.co.id/"
        },
        "id": {
          "title": "SPRINT Pegadaian",
          "description": "Platform operasional dan administrasi cabang berbasis microfrontend di PT. Pegadaian untuk alur kerja transaksi, manajemen operasional, serta otomasi layanan kantor cabang seluruh Indonesia.",
          "technologies": [
            "Micro-Frontends",
            "Module Federation",
            "Vue 3",
            "TypeScript",
            "PWA"
          ],
          "link": "https://sprint.pegadaian.co.id/"
        }
      },
      {
        "en": {
          "title": "Pegadaian Kita",
          "description": "Enterprise micro-frontend ecosystem portal for PT. Pegadaian employees, unifying Single Sign-On (SSO), operational tools, internal collaboration, and corporate resources in one hub.",
          "technologies": [
            "Micro-Frontends",
            "Module Federation",
            "Vue.js",
            "TypeScript",
            "REST API"
          ],
          "link": "https://kita.pegadaian.co.id/"
        },
        "id": {
          "title": "Pegadaian Kita",
          "description": "Portal ekosistem internal enterprise PT. Pegadaian berbasis microfrontend, menyatukan Single Sign-On (SSO), modul operasional multi-squad, dan pusat layanan terpadu insan Pegadaian.",
          "technologies": [
            "Micro-Frontends",
            "Module Federation",
            "Vue.js",
            "TypeScript",
            "REST API"
          ],
          "link": "https://kita.pegadaian.co.id/"
        }
      },
      {
        "en": {
          "title": "UNU Yogyakarta Web Portal",
          "description": "Official web portal of Nahdlatul Ulama University of Yogyakarta delivering academic programs, faculty directories, and admissions with high-performance SSR.",
          "technologies": [
            "Nuxt 3",
            "Vue 3",
            "TypeScript",
            "Tailwind CSS",
            "SSR"
          ],
          "link": "https://www.unu-jogja.ac.id/"
        },
        "id": {
          "title": "UNU Yogyakarta Web Portal",
          "description": "Portal web resmi Universitas Nahdlatul Ulama Yogyakarta yang menyajikan informasi akademik, direktori fakultas, program unggulan, dan penerimaan mahasiswa baru dengan performa tinggi.",
          "technologies": [
            "Nuxt 3",
            "Vue 3",
            "TypeScript",
            "Tailwind CSS",
            "SSR"
          ],
          "link": "https://www.unu-jogja.ac.id/"
        }
      },
      {
        "en": {
          "title": "Program Orang Tua Asuh UNU Jogja",
          "description": "Philanthropy and student sponsorship platform connecting donors with high-potential students from underprivileged families at UNU Yogyakarta.",
          "technologies": [
            "Nuxt 3",
            "Vue 3",
            "TypeScript",
            "Tailwind CSS",
            "REST API"
          ],
          "link": "https://ota.unu-jogja.ac.id/"
        },
        "id": {
          "title": "Program Orang Tua Asuh UNU Jogja",
          "description": "Platform filantropi dan sponsorship program Orang Tua Asuh UNU Yogyakarta untuk menghubungkan donatur dengan mahasiswa berprestasi dari keluarga prasejahtera.",
          "technologies": [
            "Nuxt 3",
            "Vue 3",
            "TypeScript",
            "Tailwind CSS",
            "REST API"
          ],
          "link": "https://ota.unu-jogja.ac.id/"
        }
      },
      {
        "en": {
          "title": "My Pertamina PDS",
          "description": "Pertamina Delivery Service offers fast and efficient fuel delivery for personal and commercial use.",
          "technologies": [
            "Vue.js",
            "Nuxt.js",
            "TypeScript"
          ],
          "link": "https://pds.mypertamina.id/"
        },
        "id": {
          "title": "My Pertamina PDS",
          "description": "Pertamina Delivery Service menawarkan pengiriman bahan bakar yang cepat dan efisien untuk penggunaan pribadi dan komersial.",
          "technologies": [
            "Vue.js",
            "Nuxt.js",
            "TypeScript"
          ],
          "link": "https://pds.mypertamina.id/"
        }
      },
      {
        "en": {
          "title": "Lintasarta Cloudeka",
          "description": "Lintasarta Cloud Services offers solutions for web/application hosting securely, easily and affordably.",
          "technologies": [
            "Vue.js",
            "Nuxt.js",
            "Cloud Services"
          ],
          "link": "https://www.cloudeka.id/"
        },
        "id": {
          "title": "Lintasarta Cloudeka",
          "description": "Lintasarta Cloud Services menawarkan solusi hosting web/aplikasi yang aman, mudah, dan terjangkau.",
          "technologies": [
            "Vue.js",
            "Nuxt.js",
            "Cloud Services"
          ],
          "link": "https://www.cloudeka.id/"
        }
      }
    ],
    "liveDemo": {
      "en": "Live Demo",
      "id": "Demo Langsung"
    },
    "moreComingSoon": {
      "en": "More coming soon...",
      "id": "Akan segera hadir..."
    },
    "subtitle": {
      "en": "Mission-critical web applications, enterprise platforms, and scalable design systems built for scale and reliability.",
      "id": "Platform web produksi, sistem enterprise, dan arsitektur frontend skala besar. Pilih proyek untuk melihat arsitektur & live demo."
    },
    "title": {
      "en": "Featured Projects",
      "id": "Proyek Unggulan"
    },
    "viewProject": {
      "en": "View Project",
      "id": "Lihat Proyek"
    }
  },
  "contact": {
    "cta": {
      "en": "Say Hello",
      "id": "Katakan Halo"
    },
    "description": {
      "en": "Have a project in mind or just want to say hi? Feel free to reach out!",
      "id": "Punya ide proyek atau hanya ingin menyapa? Jangan ragu untuk menghubungi saya!"
    },
    "email": "halo@ibnuadam.tech",
    "github": {
      "en": "https://github.com/iiibnuadam",
      "id": "https://github.com/iiibnuadam"
    },
    "linkedin": {
      "en": "https://www.linkedin.com/in/iiibnuadam/",
      "id": "https://www.linkedin.com/in/iiibnuadam/"
    },
    "title": {
      "en": "Get In Touch",
      "id": "Hubungi Saya"
    },
    "twitter": {
      "en": "https://twitter.com",
      "id": "https://twitter.com"
    },
    "socials": [
      {
        "platform": "github",
        "url": "https://github.com/iiibnuadam",
        "_ui_id": "2eccf97b-b40e-4bd2-9095-a0b0e45731f3"
      },
      {
        "platform": "linkedin",
        "url": "https://www.linkedin.com/in/iiibnuadam/",
        "_ui_id": "462cb15a-04bb-406b-840a-b1db75cac0e6"
      }
    ]
  },
  "footer": {
    "rights": {
      "en": "All rights reserved.",
      "id": "Hak cipta dilindungi undang-undang."
    }
  }
};

async function seed() {
  const client = new MongoClient(MONGODB_URI!);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();

    for (const [key, data] of Object.entries(initialData)) {
      const collectionName = key.charAt(0).toUpperCase() + key.slice(1);
      
      // Validate data against schema
      const schema = SectionSchemas[key as keyof typeof SectionSchemas];
      const validationResult = schema.safeParse(data);
      
      if (!validationResult.success) {
        console.error(`Validation failed for ${key}:`, validationResult.error.format());
        continue;
      }

      await db.collection(collectionName).updateOne(
        {},
        { $set: data },
        { upsert: true }
      );
      console.log(`Seeded ${collectionName}`);
    }

    // Seed Admin User
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    const adminUser = {
      username: ADMIN_USER,
      password: hashedPassword,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").updateOne(
      { username: ADMIN_USER },
      { $set: adminUser },
      { upsert: true }
    );
    console.log(`Seeded User: ${ADMIN_USER}`);

    console.log("Seeding completed");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await client.close();
  }
}

seed();
