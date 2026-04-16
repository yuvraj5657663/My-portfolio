export function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[#888] text-[12px] font-medium">
          © {new Date().getFullYear()} Yuvraj Kumar — Scalable Experiences Designer
        </div>
        <div className="flex items-center gap-4 text-[12px] font-medium text-[#888]">
          <span className="text-white font-semibold">GitHub</span>
          <span className="text-white font-semibold">LinkedIn</span>
          <span className="text-white font-semibold">yuvrajkumar4588@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
