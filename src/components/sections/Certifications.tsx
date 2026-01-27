"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const certifications = [
  {
    title: "Applied Data Science with Python – Level 2",
    issuer: "IBM",
    platform: "Coursera / IBM",
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    link: "https://www.credly.com/badges/18131304-af42-44b9-9804-4f460980179c/public_url",
  },
  {
    title: "Discover Data Analysis",
    issuer: "Microsoft Learn",
    platform: "Microsoft",
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-400/20",
    link: "https://learn.microsoft.com/en-us/users/abdulhafeez-8857/achievements/print/4g6lqtak",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    platform: "Forage",
    color: "from-green-400 to-emerald-600",
    shadow: "shadow-green-400/20",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_68e9fd0d62069f649c5d7e08_1760169097402_completion_certificate.pdf",
  },
  {
    title: "Introduction to MS Excel",
    issuer: "Simplilearn",
    platform: "Microsoft SkillUp",
    color: "from-orange-400 to-red-500",
    link: "https://simpli-web.app.link/e/53BcK7edmXb",
  },
  {
    title: "Data Fundamentals",
    issuer: "IBM",
    platform: "Credly",
    color: "from-indigo-500 to-purple-500",
    shadow: "shadow-indigo-500/20",
    link: "https://www.credly.com/badges/759467b2-28bc-474f-a2a5-db8c44795c09/linked_in_profile",
  },
];

export default function Certifications() {
  return (
    <section className="px-4 md:px-8 py-20 md:py-32 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionHeading title="Certifications" />
        </Reveal>

        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {certifications.map((cert, index) => (
            <Reveal key={index} delay={index * 0.15} className="h-full">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-[1px] rounded-2xl bg-gradient-to-br ${cert.color} h-full opacity-80 hover:opacity-100 transition-opacity duration-500 block`}
              >
                <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${cert.color}" />

                <div className="relative h-full bg-black rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />

                  <div className="relative z-10">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 md:mb-4 bg-white/5 text-white/80 border border-white/10 group-hover:bg-white/10 transition-colors`}>
                      {cert.issuer}
                    </span>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                      {cert.title}
                    </h3>

                    <div className="w-12 h-1 bg-gradient-to-r from-white/20 to-transparent rounded-full mt-3 md:mt-4 group-hover:w-full transition-all duration-700 ease-out" />
                  </div>

                  <div className="relative z-10 mt-6 md:mt-8 flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-white/40 font-mono">
                      {cert.platform}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
