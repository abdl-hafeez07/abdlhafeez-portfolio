import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section className="px-8 py-32">
      <Reveal>
        <SectionHeading title="About" />
        <p className="mt-12 max-w-3xl text-xl text-white/80 leading-relaxed">
          I’m a BCA graduate and current MSc Computer Science student specializing in Data Analytics.
          I combine technical expertise in Python, Machine Learning, and SQL with creative UI/UX design
          to transform raw data into meaningful insights and build intuitive, data-driven applications.
        </p>
      </Reveal>
    </section>
  );
}
