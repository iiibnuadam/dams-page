# Landing Page Portofolio

Landing page portofolio modern yang dibangun dengan Next.js 16, TypeScript, Tailwind CSS, dan shadcn/ui.

## 🚀 Teknologi

- **Next.js 16** - React framework dengan App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Komponen UI yang dapat disesuaikan (berbasis Radix UI)
- **pnpm** - Package manager

## 📦 Instalasi

```bash
# Clone repository
git clone <repository-url>

# Masuk ke folder proyek
cd cv-landing-page

# Install dependencies
pnpm install
```

## 🛠️ Development

```bash
# Jalankan development server
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📝 Kustomisasi

### 1. Data Portofolio

Edit file `src/app/page.tsx` dan sesuaikan objek `portfolioData`:

```typescript
const portfolioData = {
  hero: {
    name: 'Nama Anda',
    title: 'Frontend Developer & UI/UX Enthusiast',
    description: 'Membangun pengalaman web yang cepat...'
  },
  about: {
    bio: 'Saya adalah seorang developer...',
    skills: ['React', 'Next.js', 'TypeScript', ...]
  },
  projects: [
    {
      title: 'Project Name',
      description: 'Project description',
      technologies: ['Tech1', 'Tech2'],
      link: 'https://demo.com',
      github: 'https://github.com/user/repo'
    }
  ],
  contact: {
    email: 'email@example.com',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username'
  }
}
```

### 2. Styling & Tema

- **Global styles**: `src/app/globals.css`
- **Color scheme**: Edit CSS variables di `src/app/globals.css`
- **Dark mode**: Sudah dikonfigurasi otomatis berdasarkan preferensi sistem

### 3. Menambah Komponen shadcn

```bash
# Lihat daftar komponen available
pnpm dlx shadcn@latest add

# Contoh: menambahkan komponen badge
pnpm dlx shadcn@latest add badge
```

## 📁 Struktur Proyek

```
cv-landing-page/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout & metadata
│   │   └── page.tsx         # Home page dengan data portofolio
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Hero section
│   │   ├── About.tsx        # About section
│   │   ├── Projects.tsx     # Projects showcase
│   │   ├── Contact.tsx      # Contact section
│   │   └── Footer.tsx       # Footer
│   └── lib/
│       └── utils.ts         # Utility functions (cn helper)
├── public/                  # Static assets
├── .copilot/
│   └── rules               # Copilot rules untuk proyek ini
└── package.json
```

## 🎨 Komponen

- **Header**: Navigasi fixed dengan smooth scroll
- **Hero**: Section pembuka dengan nama dan CTA buttons
- **About**: Biografi dan skill tags
- **Projects**: Grid kardu proyek dengan teknologi dan link
- **Contact**: Email dan social media links
- **Footer**: Copyright dan tech stack info

## 🚢 Build & Deploy

```bash
# Build untuk production
pnpm build

# Jalankan production build locally
pnpm start
```

### Deploy ke Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

Atau manual:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

## 📋 Checklist Sebelum Deploy

- [ ] Update semua data placeholder di `src/app/page.tsx`
- [ ] Update metadata SEO di `src/app/layout.tsx`
- [ ] Tambahkan favicon di `public/`
- [ ] Tambahkan Open Graph image di `public/og-image.png`
- [ ] Test responsiveness (mobile, tablet, desktop)
- [ ] Test dark mode
- [ ] Test semua link eksternal
- [ ] Jalankan `pnpm lint` dan perbaiki error
- [ ] Jalankan `pnpm build` dan pastikan tidak ada error

## 📖 Dokumentasi Tambahan

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Copilot Rules](.copilot/rules) - Panduan development untuk AI assistant

## 📄 License

MIT

---

Dibuat dengan ❤️ menggunakan Next.js, TypeScript, Tailwind CSS, dan shadcn/ui
