import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";

// Enable Next.js 16 instant navigation optimization by setting false
export const unstable_instant = false;

interface TafsirItem {
  ayat: number;
  teks: string;
}

interface TafsirData {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  tafsir: TafsirItem[];
  suratSelanjutnya: { nomor: number; namaLatin: string } | null | false;
  suratSebelumnya: { nomor: number; namaLatin: string } | null | false;
}

const BOOK_META: Record<string, { label: string; color: string; bg: string }> = {
  "ibnu-katsir": {
    label: "Tafsir Ibnu Katsir",
    color: "#1A7A5E",
    bg: "primary-gradient",
  },
  jalalain: {
    label: "Tafsir Jalalain",
    color: "#F76B1C",
    bg: "bg-[#F76B1C]",
  },
};

// Fetch Tafsir data directly on the server with 24-hour cache
async function getTafsir(id: string): Promise<TafsirData | null> {
  if (!id) return null;
  try {
    const res = await fetch(`https://equran.id/api/v2/tafsir/${id}`, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Failed to fetch Tafsir on the server:", error);
    return null;
  }
}

export default async function TafsirDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const data = await getTafsir(id);
  const bookMeta = BOOK_META[slug] ?? BOOK_META["ibnu-katsir"];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
        <div className="text-center bg-card p-12 rounded-[32px] soft-shadow max-w-md mx-4 border border-border transition-colors duration-300">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-2xl font-bold mb-2 text-foreground">Tafsir Tidak Ditemukan</h1>
          <p className="text-foreground/50 mb-6">Gagal memuat data. Cek koneksi internet kamu atau coba lagi.</p>
          <Link
            href={`/tafsir/${slug}`}
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all"
          >
            <ArrowLeft size={18} /> Kembali ke Indeks
          </Link>
        </div>
      </div>
    );
  }

  const isOrange = slug === "jalalain";

  return (
    <main className="min-h-screen bg-background pb-24 transition-colors duration-300">
      {/* Header */}
      <div
        className={`${bookMeta.bg} pt-20 pb-28 px-6 relative overflow-hidden`}
        style={isOrange ? { background: "#F76B1C" } : undefined}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, white 0%, transparent 60%), radial-gradient(circle at 80% 20%, white 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto relative z-10">
          <Link
            href={`/tafsir/${slug}`}
            className="inline-flex items-center gap-2 text-white/70 font-bold mb-8 hover:text-white transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Indeks
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/20">
                {bookMeta.label} • Surah {data.nomor}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{data.namaLatin}</h1>
              <p className="text-white/70 text-lg">
                {data.arti} • {data.jumlahAyat} Ayat • {data.tempatTurun}
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <BookOpenCheck size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:max-w-4xl -mt-14 relative z-20">
        {/* Info banner */}
        <div className="bg-card rounded-[28px] p-4 soft-shadow border border-border mb-8 flex items-center gap-3 transition-colors duration-300">
          <Info size={20} className="text-primary shrink-0" />
          <p className="text-sm text-foreground/70 leading-relaxed">
            Tafsir ini bersumber dari Kemenag RI — standar tafsir resmi yang shahih dan moderat.
          </p>
        </div>

        {/* Tafsir verses */}
        <div className="flex flex-col gap-6">
          {data.tafsir.map((item, index) => (
            <div
              key={item.ayat}
              style={{ animationDelay: `${index < 5 ? index * 0.05 : 0}s` }}
              className="bg-card rounded-[28px] p-6 md:p-8 soft-shadow border border-border hover:border-primary/40 transition-all animate-fade-in-up opacity-0 duration-300"
            >
              {/* Verse number badge */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-lg shrink-0 ${
                    !isOrange ? "bg-primary" : ""
                  }`}
                  style={isOrange ? { background: "#F76B1C" } : {}}
                >
                  {item.ayat}
                </div>
                <div className="h-px flex-1 bg-secondary border-t border-border" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  Ayat {item.ayat}
                </span>
              </div>

              {/* Tafsir text */}
              <div className="text-foreground/90 leading-[1.9] text-base md:text-[17px] text-justify">
                {item.teks.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-10 flex items-center justify-between gap-4">
          {data.suratSebelumnya ? (
            <Link
              href={`/tafsir/${slug}/${data.suratSebelumnya.nomor}`}
              className="flex-1 bg-card p-5 md:p-6 rounded-[28px] soft-shadow border border-border flex items-center gap-4 hover:border-primary/30 transition-all group duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                <ChevronLeft size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Sebelumnya</p>
                <p className="font-bold text-foreground text-sm truncate">{data.suratSebelumnya.namaLatin}</p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {data.suratSelanjutnya ? (
            <Link
              href={`/tafsir/${slug}/${data.suratSelanjutnya.nomor}`}
              className="flex-1 bg-card p-5 md:p-6 rounded-[28px] soft-shadow border border-border flex items-center justify-between gap-4 hover:border-primary/30 transition-all group duration-300"
            >
              <div className="min-w-0 text-right">
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Selanjutnya</p>
                <p className="font-bold text-foreground text-sm truncate">{data.suratSelanjutnya.namaLatin}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                <ChevronRight size={22} />
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </main>
  );
}
