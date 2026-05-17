import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFB]">
      <div className="w-14 h-14 border-4 border-[#1A7A5E] border-t-transparent rounded-full mb-4 animate-spin" />
      <p className="font-bold text-[#1A7A5E] animate-pulse">Memuat Tafsir...</p>
    </div>
  );
}
