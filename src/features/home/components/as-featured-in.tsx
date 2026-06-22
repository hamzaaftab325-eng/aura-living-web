const FEATURES = [
  "Dawn",
  "MAG Weekly",
  "Hello! Pakistan",
  "Mangobaaz",
  "Dawn Images",
  "The Express Tribune",
];

export function AsFeaturedIn() {
  return (
    <section className="bg-[#FAF8F2] border-y border-[#F0EBDC]" aria-label="As featured in">
      <div className="container-page py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <p className="text-overline text-[#5A5A5A] whitespace-nowrap flex-shrink-0">
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10">
            {FEATURES.map((name) => (
              <span
                key={name}
                className="font-display text-lg md:text-xl text-[#8A8275] hover:text-[#8A6B26] transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
