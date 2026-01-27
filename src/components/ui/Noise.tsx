export default function Noise() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.06]">
      <div className="w-full h-full bg-[url('/noise.jpg')] animate-noise" />
    </div>
  );
}
