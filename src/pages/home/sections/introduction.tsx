import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaRegEnvelope } from "react-icons/fa6";

import { profile } from "@/data/profile";

export default function IntroductionSection() {
  return (
    <div className="space-y-24">
      <Hero />
      <About />
    </div>
  );
}

function Hero() {
  return (
    <div
      className="rounded-3xl px-4 sm:px-8 py-8"
      style={{
        background:
          "radial-gradient(900px 380px at 85% -10%, color-mix(in srgb, var(--primary) 16%, transparent), transparent 70%)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-12 items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <p className="text-primary font-semibold tracking-wide mb-2">
            {profile.greeting}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {profile.name}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mt-5">
            {profile.subtitle}
          </p>
          <p
            className="text-base sm:text-lg mt-4 max-w-xl mx-auto md:mx-0"
            dangerouslySetInnerHTML={{ __html: profile.tagline }}
          />

          <div className="flex flex-wrap gap-3 mt-7 justify-center md:justify-start">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/publications">See publications</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6 border-primary text-primary hover:text-primary"
            >
              <a href="/pdf/CV_Samadi.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </Button>
          </div>

          <TooltipProvider delayDuration={100}>
            <ul className="flex flex-wrap gap-2.5 mt-6 justify-center md:justify-start">
              <li>
                <SocialButton
                  href={`mailto:${profile.email}`}
                  label="Email"
                  external={false}
                >
                  <FaRegEnvelope className="w-4.5 h-4.5" />
                </SocialButton>
              </li>
              {profile.links
                .filter((item) => !/CV/i.test(item.name))
                .map((item) => (
                  <li key={item.name}>
                    <SocialButton href={item.url} label={item.name}>
                      <item.icon className="w-4.5 h-4.5" />
                    </SocialButton>
                  </li>
                ))}
            </ul>
          </TooltipProvider>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <img
            src={profile.profileImage}
            alt={`Portrait of ${profile.name}`}
            className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover border-8 border-card shadow-xl ring-2 ring-primary"
          />
        </div>
      </div>
    </div>
  );
}

function SocialButton({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          aria-label={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="grid place-items-center w-10 h-10 rounded-full bg-muted text-muted-foreground border transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function About() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-semibold relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-[3px] after:rounded after:bg-primary">
        About
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10">
        <div
          className="prose dark:prose-invert max-w-none text-base/7"
          dangerouslySetInnerHTML={{ __html: profile.biography }}
          aria-label="Biography"
        />

        <dl className="grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-3 text-[0.95rem] content-start">
          {profile.facts.map((fact) => (
            <div key={fact.label} className="contents">
              <dt className="font-semibold text-primary">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          <dt className="font-semibold text-primary">Keywords</dt>
          <dd className="flex flex-wrap gap-1.5">
            {profile.keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
              >
                {keyword}
              </span>
            ))}
          </dd>
        </dl>
      </div>
    </section>
  );
}
