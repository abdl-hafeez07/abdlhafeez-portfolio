"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const education = [
  {
    school: "Rajagiri College of Social Sciences",
    location: "Kochi, Kerala",
    degree: "M.Sc. Computer Science",
    specialization: "Data Analytics",
    period: "2025 – 2027",
    status: "Pursuing",
  },
  {
    school: "St Aloysius College (Autonomous)",
    location: "Mangalore, Karnataka",
    degree: "Bachelor of Computer Applications",
    specialization: "BCA",
    period: "Graduated: 2025",
    status: "Completed",
  },
  {
    school: "Thanbeehul Islam Higher Secondary School",
    location: "Kasaragod, Kerala",
    degree: "Higher Secondary (12th Grade)",
    specialization: "Computer Science",
    period: "Graduated",
    status: "Completed",
  },
  {
    school: "Thanbeehul Islam Higher Secondary School",
    location: "Kasaragod, Kerala",
    degree: "High School (10th Grade)",
    specialization: "General Education",
    period: "Graduated",
    status: "Completed",
  },
];

export default function Education() {
  return (
    <section className="px-8 py-32 bg-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal>
          <SectionHeading title="Education" />
        </Reveal>

        <div className="mt-20 grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <Reveal key={index} delay={index * 0.2} className="h-full">
              <div
                className="group relative h-full bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Hover Highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="inline-flex flex-col">
                        <span className="text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                          0{index + 1}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/10 uppercase tracking-widest">
                        {edu.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-blue-200 transition-colors">
                      {edu.school}
                    </h3>
                    <p className="text-white/50 text-sm mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      {edu.location}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <p className="text-xl text-white font-medium">
                      {edu.degree}
                    </p>
                    {edu.specialization !== edu.degree && (
                      <p className="text-blue-400 text-sm mt-1 mb-3">
                        {edu.specialization}
                      </p>
                    )}
                    <p className="text-white/40 text-sm mt-4 font-mono">
                      {edu.period}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
