import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Languages,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

function Home() {
  const { t, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="SchemeSetu home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-sm transition group-hover:scale-105">
              IN
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                SchemeSetu
              </h1>

              <p className="text-[11px] text-slate-500 sm:text-xs">
                {t.nav.tagline}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              {t.nav.home}
            </Link>

            <Link
              to="/find"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              {t.nav.findSchemes}
            </Link>

            <a
              href="#about"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              {t.nav.about}
            </a>
          </nav>

          <button
            onClick={toggleLanguage}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            {t.nav.switchLanguage}
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800">
          {/* Decorative background elements */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 sm:py-20 md:grid-cols-2 md:items-center md:py-24 lg:gap-20">
            {/* Hero content */}
            <div className="text-white">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 shadow-sm backdrop-blur">
                <ShieldCheck size={17} />
                {t.hero.badge}
              </div>

              <h2 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                {t.hero.title}

                <span className="mt-2 block text-blue-200">
                  {t.hero.titleHighlight}
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
                {t.hero.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/find"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 shadow-xl transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  {t.hero.findButton}
                  <ArrowRight size={19} />
                </Link>

                <Link
                  to="/find"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition duration-200 hover:bg-white/10"
                >
                  {t.hero.exploreButton}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  {t.hero.tamilEnglish}
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  {t.hero.personalized}
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  {t.hero.free}
                </span>
              </div>
            </div>

            {/* MATCHER PREVIEW */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-white/10 blur-xl" />

              <div className="relative rounded-[1.75rem] border border-white/20 bg-white p-5 shadow-2xl sm:p-7">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                      <Sparkles size={16} />
                      {t.matcher.label}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                      {t.matcher.title}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Search size={21} />
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {t.matcher.age}
                    </label>

                    <input
                      type="number"
                      placeholder={t.matcher.agePlaceholder}
                      disabled
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {t.matcher.state}
                    </label>

                    <select
                      disabled
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
                    >
                      <option>{t.matcher.statePlaceholder}</option>
                    </select>
                  </div>

                  <Link
                    to="/find"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    {t.matcher.checkButton}
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
                  <ShieldCheck size={14} className="text-blue-500" />
                  {t.matcher.privacy}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-blue-600">{t.features.label}</p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {t.features.title}
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              {t.features.description}
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
            <FeatureCard
              icon={<Search size={23} />}
              title={t.features.findTitle}
              description={t.features.findDescription}
            />

            <FeatureCard
              icon={<FileText size={23} />}
              title={t.features.documentsTitle}
              description={t.features.documentsDescription}
            />

            <FeatureCard
              icon={<Languages size={23} />}
              title={t.features.languageTitle}
              description={t.features.languageDescription}
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="about" className="border-y border-slate-200 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="text-center">
              <p className="font-semibold text-blue-600">{t.process.label}</p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {t.process.title}
              </h2>
            </div>

            <div className="relative mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
              <Step
                number="01"
                title={t.process.step1Title}
                description={t.process.step1Description}
              />

              <Step
                number="02"
                title={t.process.step2Title}
                description={t.process.step2Description}
              />

              <Step
                number="03"
                title={t.process.step3Title}
                description={t.process.step3Description}
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-semibold">SchemeSetu</span>

            <span className="ml-2 text-slate-400">
              {t.footer.tagline}
            </span>
          </div>

          <p className="text-slate-400">{t.footer.note}</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-200 group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-tight">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-200 hover:border-blue-200 hover:bg-blue-50/40 sm:p-7">
      <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-blue-600 px-2 text-sm font-bold text-white">
        {number}
      </span>

      <h3 className="mt-4 text-xl font-bold tracking-tight">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default Home;