# 🚀 Quick Start Guide

## Langkah Cepat untuk Mulai

### 1️⃣ Edit Data Anda (5 menit)

Buka file `src/app/page.tsx` dan edit objek `portfolioData`:

```typescript
const portfolioData = {
  hero: {
    name: "NAMA ANDA", // ← Ganti ini
    title: "POSISI/TITLE ANDA", // ← Ganti ini
    description: "DESKRIPSI SINGKAT", // ← Ganti ini
  },
  about: {
    bio: "CERITAKAN TENTANG ANDA", // ← Ganti ini
    skills: [
      "Skill 1", // ← Ganti dengan skill Anda
      "Skill 2",
      "Skill 3",
      // tambahkan lebih banyak...
    ],
  },
  projects: [
    {
      title: "NAMA PROJECT", // ← Ganti dengan project Anda
      description: "DESKRIPSI PROJECT",
      technologies: ["Tech1", "Tech2"],
      link: "https://demo.com", // ← Link demo (opsional)
      github: "https://github.com/...", // ← Link GitHub
    },
    // Tambahkan lebih banyak project...
  ],
  contact: {
    email: "EMAIL@ANDA.COM", // ← Email Anda
    github: "https://github.com/...", // ← GitHub Anda
    linkedin: "https://linkedin.com/...", // ← LinkedIn Anda (opsional)
    twitter: "https://twitter.com/...", // ← Twitter Anda (opsional)
  },
};
```

### 2️⃣ Edit SEO Metadata (2 menit)

Buka `src/app/layout.tsx` dan update metadata:

```typescript
export const metadata: Metadata = {
  title: "NAMA ANDA — Portofolio",
  description: "DESKRIPSI SINGKAT TENTANG ANDA",
  openGraph: {
    title: "NAMA ANDA — Portofolio",
    description: "DESKRIPSI SINGKAT",
    type: "website",
  },
};
```

### 3️⃣ Test di Browser

Development server sudah running di:
👉 **http://localhost:3000**

Refresh browser dan lihat perubahan Anda!

## ⚡ Command Penting

```bash
# Development (sudah running)
pnpm dev

# Build untuk production
pnpm build

# Test production build
pnpm start

# Lint code
pnpm lint
```

## 🎨 Kustomisasi Lanjutan

### Mengubah Warna Tema

Edit `src/app/globals.css`, cari section `:root` dan `.dark`:

```css
:root {
  --background: oklch(1 0 0); /* Background terang */
  --foreground: oklch(0.145 0 0); /* Text terang */
  --primary: oklch(0.205 0 0); /* Warna utama */
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0); /* Background gelap */
  --foreground: oklch(0.985 0 0); /* Text gelap */
  /* ... */
}
```

### Menambah Komponen shadcn/ui

```bash
# Lihat daftar komponen
pnpm dlx shadcn@latest add

# Contoh: tambah badge
pnpm dlx shadcn@latest add badge

# Contoh: tambah dialog
pnpm dlx shadcn@latest add dialog
```

### Menambah Section Baru

1. Buat file baru di `src/components/NamaSection.tsx`
2. Import dan tambahkan di `src/app/page.tsx`:

```tsx
import NamaSection from "@/components/NamaSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero {...portfolioData.hero} />
        <About {...portfolioData.about} />
        <NamaSection /> {/* ← Section baru */}
        <Projects projects={portfolioData.projects} />
        <Contact contact={portfolioData.contact} />
      </main>
      <Footer />
    </>
  );
}
```

## 📱 Test Checklist

Sebelum deploy, pastikan:

- [ ] ✅ Data sudah diganti (nama, email, projects, dll)
- [ ] ✅ Test di mobile view (Chrome DevTools → Toggle device toolbar)
- [ ] ✅ Test dark mode (System Preferences atau DevTools)
- [ ] ✅ Klik semua navigation links (pastikan smooth scroll)
- [ ] ✅ Test semua external links (GitHub, demo, social media)
- [ ] ✅ Tidak ada error di console (F12 → Console)
- [ ] ✅ `pnpm build` berhasil tanpa error

## 🚢 Deploy ke Vercel (5 menit)

### Cara Termudah:

1. Push code ke GitHub:

   ```bash
   git add .
   git commit -m "feat: setup portfolio landing page"
   git push origin main
   ```

2. Buka https://vercel.com
3. Klik "New Project"
4. Import repository GitHub Anda
5. Klik "Deploy" (Vercel otomatis detect Next.js)
6. ✅ Done! Your site is live

### Via CLI:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

## 🎯 Hasil Akhir

Anda sekarang punya:

- ✅ Landing page portfolio responsive
- ✅ Dark mode support
- ✅ Smooth scroll navigation
- ✅ SEO-friendly
- ✅ Mobile-first design
- ✅ Fast (Next.js 16 dengan Turbopack)
- ✅ Menggunakan Tailwind CSS + shadcn/ui
- ✅ TypeScript untuk type safety

## 💡 Tips Pro

1. **Tambah Google Analytics** (opsional):
   - Tambahkan GA script di `src/app/layout.tsx`
2. **Custom Domain** (setelah deploy):
   - Di Vercel dashboard → Settings → Domains
3. **Tambah Blog** (next step):
   - Install `@next/mdx` atau gunakan CMS seperti Contentful
4. **Performance**:
   - Compress images di `public/` (gunakan https://tinypng.com)
   - Tambahkan `next/image` untuk semua gambar

## 🆘 Butuh Bantuan?

- **Dokumentasi lengkap**: Baca `README.md`
- **Setup summary**: Baca `SETUP_SUMMARY.md`
- **Copilot rules**: Baca `.copilot/rules`
- **Next.js docs**: https://nextjs.org/docs
- **Tailwind docs**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

---

✨ **Selamat! Landing page portofolio Anda siap untuk dunia!** ✨
