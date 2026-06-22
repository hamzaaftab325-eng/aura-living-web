export default function Loading() {
  return (
    <div className="min-h-screen surface-cream flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-[#F0EBDC] border-t-[#C9A84C] animate-spin" />
        <p className="text-overline text-[#8A8275]">Loading…</p>
      </div>
    </div>
  );
}
