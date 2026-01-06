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
      "en": "Hi there! Adam's here. I'm a creative Front-End Developer with over 3 years of experience crafting sleek websites and apps in fast-paced, collaborative settings. My expertise lies in Vue.js and Typescript, complemented by a dash of React.js.",
      "id": "Halo! Saya Adam. Saya seorang Front-End Developer kreatif dengan pengalaman lebih dari 3 tahun dalam membuat website dan aplikasi yang elegan. Keahlian saya terletak pada Vue.js dan Typescript, dilengkapi dengan sedikit sentuhan React.js."
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
          "period": "Aug, 2024 - Present",
          "duration": "1 Year",
          "description": [
            "Develop Internal Application"
          ],
          "skills": [
            "Vue",
            "Go",
            "Java"
          ]
        },
        "id": {
          "position": "Core Developer",
          "company": "PT. Pegadaian",
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/pgd%20logo.jpeg",
          "location": "Jakarta",
          "type": "Fulltime - Onsite",
          "period": "Ags, 2024 - Sekarang",
          "duration": "1 Year",
          "description": [
            "Mengembangkan Aplikasi Internal Perusahaan"
          ],
          "skills": [
            "Vue",
            "Go",
            "Java"
          ]
        },
        "_ui_id": "a15a0a30-3ec2-446b-93e6-b977dd6205b6"
      },
      {
        "en": {
          "position": "Frontend Developer",
          "company": "PT. GITS Indonesia",
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/GITS%20Indonesia%20Logo.jpeg",
          "location": "Bandung",
          "type": "Fulltime - Remote",
          "period": "Dec, 2021 - Jun, 2024",
          "duration": "3 Years",
          "description": [
            "Spearheaded the development of multiple external products from scratch using Nuxt 3 with TypeScript, achieving notable improvements in user satisfaction and app performance.",
            "Developed various applications including web cloud services, e-commerce platforms, web merchant systems, CMS enterprise solutions, landing pages, and chat apps, increasing overall user engagement by 20%.",
            "Integrated web sockets for real-time communication, enhancing app interactivity and user experience.",
            "Optimized SEO and improved web app performance, resulting in a 30% increase in page speed scores.",
            "Developed a comprehensive design system named Morpheme UI, streamlining UI consistency and development efficiency.",
            "Created backend solutions using headless API Strapi, improving data management and scalability.",
            "Performed unit tests using Jest to ensure code quality and reliability, reducing bug incidence by 25%.",
            "Utilized Git for version control with expertise in Git flow and trunk-based development, ensuring smooth and efficient project progress.",
            "Developed applications following Scrum methodologies, ensuring timely delivery and iterative improvements."
          ],
          "skills": [
            "Strapi",
            "Pinia",
            "Vuex",
            "Git",
            "Scrum",
            "TypeScript",
            "Nuxt.js",
            "Vue.js"
          ]
        },
        "id": {
          "position": "Frontend Developer",
          "company": "PT. GITS Indonesia",
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/GITS%20Indonesia%20Logo.jpeg",
          "location": "Bandung",
          "type": "Fulltime - Remote",
          "period": "Des, 2021 - Jun, 2024",
          "duration": "3 Tahun",
          "description": [
            "Memimpin pengembangan beberapa produk eksternal dari awal menggunakan Nuxt 3 dengan TypeScript, mencapai peningkatan signifikan dalam kepuasan pengguna dan kinerja aplikasi.",
            "Mengembangkan berbagai aplikasi termasuk layanan cloud web, platform e-commerce, sistem merchant web, solusi perusahaan CMS, landing page, dan aplikasi obrolan, meningkatkan keterlibatan pengguna secara keseluruhan sebesar 20%.",
            "Mengintegrasikan web socket untuk komunikasi real-time, meningkatkan interaktivitas aplikasi dan pengalaman pengguna.",
            "Mengoptimalkan SEO dan meningkatkan kinerja aplikasi web, menghasilkan peningkatan skor kecepatan halaman sebesar 30%.",
            "Mengembangkan sistem desain komprehensif bernama Morpheme UI, menyederhanakan konsistensi UI dan efisiensi pengembangan.",
            "Membuat solusi backend menggunakan API headless Strapi, meningkatkan manajemen data dan skalabilitas.",
            "Melakukan pengujian unit menggunakan Jest untuk memastikan kualitas dan keandalan kode, mengurangi insiden bug sebesar 25%.",
            "Menggunakan Git untuk kontrol versi dengan keahlian dalam alur Git dan pengembangan berbasis trunk, memastikan kemajuan proyek yang lancar dan efisien.",
            "Mengembangkan aplikasi mengikuti metodologi Scrum, memastikan pengiriman tepat waktu dan perbaikan berulang."
          ],
          "skills": [
            "Strapi",
            "Pinia",
            "Vuex",
            "Git",
            "Scrum",
            "TypeScript",
            "Nuxt.js",
            "Vue.js"
          ]
        },
        "_ui_id": "1adc0408-a9b7-44e4-b73e-591e2ade5130"
      },
      {
        "en": {
          "position": "Frontend Developer",
          "company": "PT. Telkom Indonesia Squad Digital Amoeba",
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/telkom%20logo.jpeg",
          "location": "Bandung",
          "type": "Contract - Remote",
          "period": "Sept, 2021 - Feb, 2022",
          "duration": "6 Months",
          "description": [
            "Developed internal products from scratch using React.js, leading to a 20% increase in internal user productivity.",
            "Utilized Redux with Redux Thunk for state management, ensuring efficient and maintainable code.",
            "Built reusable components, reducing development time for new features by 30%.",
            "Sliced UI from Figma designs, ensuring pixel-perfect implementations and consistent user interfaces.",
            "Developed applications following Scrum methodologies, ensuring efficient project management and delivery."
          ],
          "skills": [
            "Redux",
            "REST APIs",
            "Git",
            "Scrum",
            "Redux Thunk",
            "React.js"
          ]
        },
        "id": {
          "position": "Frontend Developer",
          "company": "PT. Telkom Indonesia Squad Digital Amoeba",
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/telkom%20logo.jpeg",
          "location": "Bandung",
          "type": "Kontrak - Remote",
          "period": "Sept, 2021 - Feb, 2022",
          "duration": "6 Bulan",
          "description": [
            "Mengembangkan produk internal dari awal menggunakan React.js, menghasilkan peningkatan produktivitas pengguna internal sebesar 20%.",
            "Menggunakan Redux dengan Redux Thunk untuk manajemen state, memastikan kode yang efisien dan mudah dipelihara.",
            "Membangun komponen yang dapat digunakan kembali, mengurangi waktu pengembangan untuk fitur baru sebesar 30%.",
            "Melakukan slicing UI dari desain Figma, memastikan implementasi pixel-perfect dan antarmuka pengguna yang konsisten.",
            "Mengembangkan aplikasi mengikuti metodologi Scrum, memastikan manajemen proyek dan pengiriman yang efisien."
          ],
          "skills": [
            "Redux",
            "REST APIs",
            "Git",
            "Scrum",
            "Redux Thunk",
            "React.js"
          ]
        },
        "_ui_id": "b8afea0c-eeeb-407d-8005-49102e5e2337"
      },
      {
        "en": {
          "position": "Frontend Developer",
          "company": "PT. Qatros Teknologi Indonesia",
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/Qatros%20Logo.jpeg",
          "location": "Yogyakarta",
          "type": "Fulltime - Hybrid",
          "period": "Aug, 2020 - Sept, 2021",
          "duration": "1 Year 2 Months",
          "description": [
            "Developed internal and external products from scratch using Vue with Nuxt.js, achieving significant improvements in application performance and user satisfaction.",
            "Used Vuex for state management, ensuring a seamless and responsive user experience.",
            "Built reusable components using atomic design methodology, increasing development efficiency and code reusability.",
            "Sliced UI from Figma designs, delivering high-fidelity user interfaces that aligned with design specifications.",
            "Developed applications following Scrum methodologies, ensuring structured and timely project completion."
          ],
          "skills": [
            "REST APIs",
            "Vuex",
            "Git",
            "Scrum",
            "Nuxt.js",
            "Next.js",
            "React.js",
            "Vue.js",
            "JavaScript"
          ]
        },
        "id": {
          "position": "Frontend Developer",
          "company": "PT. Qatros Teknologi Indonesia",
          "logo": "https://rewa4zk0de09g6ks.public.blob.vercel-storage.com/Qatros%20Logo.jpeg",
          "location": "Yogyakarta",
          "type": "Fulltime - Hybrid",
          "period": "Agust, 2020 - Sept, 2021",
          "duration": "1 Tahun 2 Bulan",
          "description": [
            "Mengembangkan produk internal dan eksternal dari awal menggunakan Vue dengan Nuxt.js, mencapai peningkatan signifikan dalam kinerja aplikasi dan kepuasan pengguna.",
            "Menggunakan Vuex untuk manajemen state, memastikan pengalaman pengguna yang mulus dan responsif.",
            "Membangun komponen yang dapat digunakan kembali menggunakan metodologi desain atomik, meningkatkan efisiensi pengembangan dan penggunaan kembali kode.",
            "Melakukan slicing UI dari desain Figma, memberikan antarmuka pengguna fidelitas tinggi yang selaras dengan spesifikasi desain.",
            "Mengembangkan aplikasi mengikuti metodologi Scrum, memastikan penyelesaian proyek yang terstruktur dan tepat waktu."
          ],
          "skills": [
            "REST APIs",
            "Vuex",
            "Git",
            "Scrum",
            "Nuxt.js",
            "Next.js",
            "React.js",
            "Vue.js",
            "JavaScript"
          ]
        },
        "_ui_id": "36cc0ad8-5a9f-4a69-baa8-212fc190d7c6"
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
      },
      {
        "en": {
          "title": "Majamojo",
          "description": "Gaming industry joint venture between Telkomsel and GoTo driving digital transformation in Southeast Asia.",
          "technologies": [
            "Web CMS",
            "Landing Page"
          ],
          "link": "https://majamojo.com/"
        },
        "id": {
          "title": "Majamojo",
          "description": "Usaha patungan industri game antara Telkomsel dan GoTo yang mendorong transformasi digital di Asia Tenggara.",
          "technologies": [
            "Web CMS",
            "Landing Page"
          ],
          "link": "https://majamojo.com/"
        }
      },
      {
        "en": {
          "title": "Dashboard Sikerja",
          "description": "Employees task tracker system for KEMENDAGRI.",
          "technologies": [
            "Vue.js",
            "Dashboard"
          ],
          "link": "https://sikerja.qatros.com/"
        },
        "id": {
          "title": "Dashboard Sikerja",
          "description": "Sistem pelacak tugas karyawan untuk KEMENDAGRI.",
          "technologies": [
            "Vue.js",
            "Dashboard"
          ],
          "link": "https://sikerja.qatros.com/"
        }
      },
      {
        "en": {
          "title": "GetDebug",
          "description": "A digital platform for manage bug fixing with team.",
          "technologies": [
            "Bug Tracking",
            "Collaboration"
          ],
          "link": "https://getdebug.com/"
        },
        "id": {
          "title": "GetDebug",
          "description": "Platform digital untuk mengelola perbaikan bug dengan tim.",
          "technologies": [
            "Bug Tracking",
            "Collaboration"
          ],
          "link": "https://getdebug.com/"
        }
      },
      {
        "en": {
          "title": "UI SLCM",
          "description": "User interface project aimed at improving the customer's interaction with the system.",
          "technologies": [
            "UI/UX",
            "Figma"
          ]
        },
        "id": {
          "title": "UI SLCM",
          "description": "Proyek antarmuka pengguna yang bertujuan meningkatkan interaksi pelanggan dengan sistem.",
          "technologies": [
            "UI/UX",
            "Figma"
          ]
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
      "en": "A collection of my best work combining creativity and technology. Swipe to see more.",
      "id": "Kumpulan karya terbaik yang menggabungkan kreativitas dan teknologi. Geser untuk melihat lebih banyak."
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
    "email": "ibnuadam.biz@gmail.com",
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
        "url": "https://github.com/iiibnuadam"
      },
      {
        "platform": "linkedin",
        "url": "https://www.linkedin.com/in/iiibnuadam/"
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
