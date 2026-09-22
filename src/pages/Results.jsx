import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  FileText,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { schemes } from "../data/schemes";
import {
  evaluateAllSchemes,
  findEligibleSchemes,
} from "../utils/eligibilityEngine";

function CheckItem({ check }) {
  const statusConfig = {
    passed: {
      icon: <CheckCircle2 size={18} />,
      className: "border-green-200 bg-green-50 text-green-800",
      iconClass: "text-green-600",
    },
    failed: {
      icon: <XCircle size={18} />,
      className: "border-red-200 bg-red-50 text-red-800",
      iconClass: "text-red-600",
    },
    missing: {
      icon: <AlertCircle size={18} />,
      className: "border-amber-200 bg-amber-50 text-amber-800",
      iconClass: "text-amber-600",
    },
  };

  const config = statusConfig[check.status] || statusConfig.missing;

  return (
    <div
      className={`flex gap-3 rounded-lg border p-3 ${config.className}`}
    >
      <div className={`mt-0.5 shrink-0 ${config.iconClass}`}>
        {config.icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold">{check.label}</p>

        <p className="mt-1 text-xs leading-5 opacity-90">
          {check.message}
        </p>
      </div>
    </div>
  );
}

function getCategoryLabel(category, isTamil) {
  const labels = {
    farmer: {
      en: "Farmers",
      ta: "விவசாயிகள்",
    },
    "street-vendor": {
      en: "Street Vendors",
      ta: "தெருவோர விற்பனையாளர்கள்",
    },
    business: {
      en: "Business",
      ta: "தொழில்",
    },
    "skill-development": {
      en: "Skill Development",
      ta: "திறன் மேம்பாடு",
    },
    household: {
      en: "Household",
      ta: "குடும்பம்",
    },
    artisan: {
      en: "Artisans",
      ta: "கைவினைஞர்கள்",
    },
  };

  return labels[category]?.[isTamil ? "ta" : "en"] || category;
}

function SchemeCard({ scheme, result, isTamil, navigate }) {
  const name = isTamil ? scheme.name.ta : scheme.name.en;

  const description = isTamil
    ? scheme.shortDescription.ta
    : scheme.shortDescription.en;

  const benefit = isTamil
    ? scheme.benefit.ta
    : scheme.benefit.en;

  return (
    <article className="overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="border-b border-green-100 bg-green-50 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              <CheckCircle2 size={14} />

              {isTamil
                ? "தகுதி பொருந்துகிறது"
                : "Eligibility matched"}
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {name}
            </h2>

            <span className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500 shadow-sm">
              {getCategoryLabel(scheme.category, isTamil)}
            </span>
          </div>

          <div className="hidden shrink-0 sm:flex">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <p className="text-sm leading-6 text-slate-600">
          {description}
        </p>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-blue-700">
            {isTamil ? "நன்மை" : "Benefit"}
          </p>

          <p className="text-sm font-medium leading-6 text-blue-900">
            {benefit}
          </p>
        </div>

        {scheme.documents?.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FileText size={17} className="text-slate-500" />

              <h3 className="text-sm font-bold text-slate-800">
                {isTamil
                  ? "தேவையான ஆவணங்கள்"
                  : "Common documents"}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {scheme.documents.map((document) => (
                <span
                  key={document}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600"
                >
                  {document}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-3 text-sm font-bold text-slate-800">
            {isTamil
              ? "தகுதி சரிபார்ப்பு"
              : "Eligibility checks"}
          </h3>

          <div className="space-y-2">
            {result.checks.map((check, index) => (
              <CheckItem
                key={`${check.field}-${index}`}
                check={check}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(`/scheme/${scheme.id}`)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {isTamil
              ? "விவரங்களைப் பார்க்க"
              : "View Details"}

            <ArrowRight size={17} />
          </button>

          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {isTamil
              ? "அதிகாரப்பூர்வ தளம்"
              : "Official Website"}

            <ExternalLink size={16} />
          </a>
        </div>

        <p className="text-xs text-slate-400">
          {scheme.sourceName} ·{" "}
          {isTamil ? "சரிபார்க்கப்பட்டது" : "Last verified"}{" "}
          {scheme.lastVerified}
        </p>
      </div>
    </article>
  );
}

function FailedSchemeCard({ scheme, result, isTamil }) {
  const name = isTamil ? scheme.name.ta : scheme.name.en;

  const failedChecks = result.checks.filter(
    (check) => check.status === "failed"
  );

  const missingChecks = result.checks.filter(
    (check) => check.status === "missing"
  );

  return (
    <details className="group rounded-xl border border-slate-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            {result.needsMoreInformation ? (
              <AlertCircle size={18} />
            ) : (
              <XCircle size={18} />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-800">
              {name}
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
              {result.needsMoreInformation
                ? isTamil
                  ? "கூடுதல் தகவல் தேவை"
                  : "More information required"
                : isTamil
                  ? "தற்போதைய பதில்களுடன் பொருந்தவில்லை"
                  : "Does not match your current answers"}
            </p>
          </div>
        </div>

        <ArrowRight
          size={17}
          className="shrink-0 text-slate-400 transition group-open:rotate-90"
        />
      </summary>

      <div className="border-t border-slate-100 px-4 pb-4 pt-3">
        <div className="space-y-2">
          {failedChecks.map((check, index) => (
            <CheckItem
              key={`failed-${check.field}-${index}`}
              check={check}
            />
          ))}

          {missingChecks.map((check, index) => (
            <CheckItem
              key={`missing-${check.field}-${index}`}
              check={check}
            />
          ))}
        </div>
      </div>
    </details>
  );
}

export default function Results() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const isTamil = language === "ta";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const profile = useMemo(() => {
    try {
      const saved = localStorage.getItem("schemesetu-profile");

      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, []);

  const evaluation = useMemo(() => {
    if (!profile) {
      return [];
    }

    return evaluateAllSchemes(profile, schemes);
  }, [profile]);

  const eligibleSchemes = useMemo(() => {
    if (!profile) {
      return [];
    }

    return findEligibleSchemes(profile, schemes);
  }, [profile]);

  const nonEligibleSchemes = useMemo(() => {
    return evaluation.filter(
      (item) => !item.result.eligible
    );
  }, [evaluation]);

  // SEARCH + CATEGORY FILTER
  const filteredEvaluation = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return evaluation.filter(({ scheme }) => {
      const name = isTamil
        ? scheme.name.ta
        : scheme.name.en;

      const description = isTamil
        ? scheme.shortDescription.ta
        : scheme.shortDescription.en;

      const category = scheme.category;

      const matchesSearch =
        !normalizedSearch ||
        name.toLowerCase().includes(normalizedSearch) ||
        description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [
    evaluation,
    searchTerm,
    selectedCategory,
    isTamil,
  ]);

  const filteredEligibleSchemes = useMemo(() => {
    return filteredEvaluation.filter(
      (item) => item.result.eligible
    );
  }, [filteredEvaluation]);

  const filteredNonEligibleSchemes = useMemo(() => {
    return filteredEvaluation.filter(
      (item) => !item.result.eligible
    );
  }, [filteredEvaluation]);

  const categories = useMemo(() => {
    return [...new Set(schemes.map((scheme) => scheme.category))];
  }, []);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const handleStartAgain = () => {
    localStorage.removeItem("schemesetu-profile");
    navigate("/find");
  };

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Search size={26} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              {isTamil
                ? "முதலில் உங்கள் தகவல்களை உள்ளிடுங்கள்"
                : "Let's find your schemes"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {isTamil
                ? "தகுதியான அரசு திட்டங்களை கண்டறிய கேள்வித்தாளை முதலில் முடிக்கவும்."
                : "Complete the questionnaire first so we can find schemes that match your profile."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/find")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {isTamil
                ? "கேள்வித்தாளை தொடங்கு"
                : "Start Questionnaire"}

              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />

            {isTamil ? "முகப்பு" : "Home"}
          </button>

          <div className="font-bold text-blue-700">
            SchemeSetu
          </div>

          <button
            type="button"
            onClick={() => navigate("/find")}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {isTamil ? "பதில்களை மாற்று" : "Edit Answers"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* RESULT SUMMARY */}
        <section className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-blue-100">
                {isTamil
                  ? "உங்கள் SchemeSetu முடிவுகள்"
                  : "Your SchemeSetu results"}
              </p>

              <h1 className="text-3xl font-bold sm:text-4xl">
                {eligibleSchemes.length}{" "}
                {isTamil
                  ? "திட்டங்கள் பொருந்துகின்றன"
                  : eligibleSchemes.length === 1
                    ? "scheme matches"
                    : "schemes match"}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                {isTamil
                  ? "உங்கள் பதில்களின் அடிப்படையில் ஆரம்ப தகுதி பொருத்தம் வழங்கப்பட்டுள்ளது."
                  : "These results are an initial eligibility match based on the information you provided."}
              </p>
            </div>

            <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <span className="text-3xl font-bold">
                {eligibleSchemes.length}
              </span>

              <span className="text-xs text-blue-100">
                {isTamil ? "பொருத்தம்" : "matches"}
              </span>
            </div>
          </div>
        </section>

        {/* SEARCH + FILTER */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <SlidersHorizontal size={18} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {isTamil
                  ? "திட்டங்களை தேடுங்கள்"
                  : "Search & filter schemes"}
              </h2>

              <p className="text-xs text-slate-500">
                {isTamil
                  ? "பெயர் அல்லது பிரிவின் அடிப்படையில் தேடலாம்."
                  : "Find schemes by name or category."}
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
            {/* SEARCH */}
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder={
                  isTamil
                    ? "திட்டத்தின் பெயரை தேடுங்கள்..."
                    : "Search schemes..."
                }
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* CATEGORY */}
            <select
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">
                {isTamil
                  ? "அனைத்து பிரிவுகள்"
                  : "All categories"}
              </option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {getCategoryLabel(category, isTamil)}
                </option>
              ))}
            </select>

            {/* CLEAR */}
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X size={16} />

              {isTamil ? "அழிக்க" : "Clear"}
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              {isTamil
                ? `${filteredEvaluation.length} திட்டங்கள் காட்டப்படுகின்றன`
                : `Showing ${filteredEvaluation.length} of ${evaluation.length} schemes`}
            </span>

            {hasActiveFilters && (
              <span className="font-medium text-blue-600">
                {isTamil
                  ? "வடிகட்டிகள் செயல்பாட்டில்"
                  : "Filters are active"}
              </span>
            )}
          </div>
        </section>

        {/* FILTERED RESULTS */}
        {filteredEvaluation.length === 0 ? (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Search size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-amber-900">
                  {isTamil
                    ? "திட்டங்கள் எதுவும் கிடைக்கவில்லை"
                    : "No schemes found"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  {isTamil
                    ? "வேறு தேடல் சொல் அல்லது வேறு பிரிவை முயற்சிக்கவும்."
                    : "Try a different search term or category."}
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-amber-800 shadow-sm transition hover:bg-amber-100"
                >
                  <RotateCcw size={16} />
                  {isTamil
                    ? "வடிகட்டிகளை அழிக்கவும்"
                    : "Clear filters"}
                </button>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* ELIGIBLE SCHEMES */}
            {filteredEligibleSchemes.length > 0 && (
              <section>
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {isTamil
                      ? "உங்களுக்கு பொருந்தக்கூடிய திட்டங்கள்"
                      : "Schemes you may be eligible for"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {isTamil
                      ? "உங்கள் பதில்களுடன் பொருந்திய திட்டங்கள்."
                      : "Schemes that matched your current answers."}
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {filteredEligibleSchemes.map(
                    ({ scheme, result }) => (
                      <SchemeCard
                        key={scheme.id}
                        scheme={scheme}
                        result={result}
                        isTamil={isTamil}
                        navigate={navigate}
                      />
                    )
                  )}
                </div>
              </section>
            )}

            {/* NO MATCH AFTER FILTER */}
            {filteredEligibleSchemes.length === 0 &&
              hasActiveFilters && (
                <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Search size={22} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-blue-900">
                        {isTamil
                          ? "இந்த வடிகட்டலில் பொருந்தும் தகுதியான திட்டம் இல்லை"
                          : "No eligible scheme matches this filter"}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-blue-800">
                        {isTamil
                          ? "வேறு பிரிவை தேர்வு செய்யலாம் அல்லது அனைத்து திட்டங்களையும் பார்க்க வடிகட்டியை அழிக்கலாம்."
                          : "Try another category or clear the filter to see all evaluated schemes."}
                      </p>
                    </div>
                  </div>
                </section>
              )}

            {/* OTHER EVALUATED SCHEMES */}
            {filteredNonEligibleSchemes.length > 0 && (
              <section className="mt-10">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    {isTamil
                      ? "மற்ற திட்டங்களின் சரிபார்ப்பு"
                      : "Why other schemes didn't match"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {isTamil
                      ? "வெளிப்படைத்தன்மைக்காக ஒவ்வொரு திட்டத்தின் சரிபார்ப்பையும் பார்க்கலாம்."
                      : "For transparency, you can inspect the checks for every other scheme."}
                  </p>
                </div>

                <div className="space-y-3">
                  {filteredNonEligibleSchemes.map(
                    ({ scheme, result }) => (
                      <FailedSchemeCard
                        key={scheme.id}
                        scheme={scheme}
                        result={result}
                        isTamil={isTamil}
                      />
                    )
                  )}
                </div>
              </section>
            )}
          </>
        )}

        {/* DISCLAIMER */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs leading-6 text-slate-500">
            <strong className="text-slate-700">
              {isTamil ? "முக்கிய குறிப்பு: " : "Important: "}
            </strong>

            {isTamil
              ? "SchemeSetu வழங்கும் முடிவுகள் ஆரம்ப நிலை தகுதி பொருத்தம் மட்டுமே. இறுதி தகுதி, ஆவணங்கள் மற்றும் பயன்கள் சம்பந்தப்பட்ட அரசு துறையின் தற்போதைய விதிகளின் அடிப்படையில் உறுதி செய்யப்பட வேண்டும்."
              : "SchemeSetu provides an initial eligibility match only. Final eligibility, documentation requirements and benefits must be confirmed with the relevant government department and the current scheme rules."}
          </p>
        </section>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleStartAgain}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={17} />

            {isTamil ? "மீண்டும் தொடங்கு" : "Start Again"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/find")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {isTamil ? "பதில்களை மாற்று" : "Change Answers"}

            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </main>
  );
}