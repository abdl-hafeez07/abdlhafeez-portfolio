export default function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight leading-tight">
      {title}
    </h2>
  );
}
