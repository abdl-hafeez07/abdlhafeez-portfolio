export default function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tight">
      {title}
    </h2>
  );
}
