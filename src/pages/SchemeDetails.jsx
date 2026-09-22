import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  FileText,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { schemes } from "../data/schemes";
import { checkEligibility } from "../utils/eligibilityEngine";

function CheckItem({ check }) {
  const config = {
    passed: {
      icon: <CheckCircle2 size={18} />,
      wrapper: "border-green-200 bg-green-50",
      iconColor: "text-green-600",
      titleColor: "text-green-800",
      messageColor: "text-green-700",
    },

    failed: {
      icon: <XCircle size={18} />,
      wrapper: "border-red-200 bg-red-50",
      iconColor: "text-red-600",
      titleColor: "text-red-800",
      messageColor: "text-red-700",
    },

    missing: {
      icon: <AlertCircle size={18} />,
      wrapper: "border-amber-200 bg-amber-50",
      iconColor: "text-amber-600",
      titleColor: "text-amber-800",
      messageColor: "text-amber-700",
    },
  };

  const current = config[check.status] || config.missing;

  return (
    <div
      className={`rounded-xl border p-4 ${current.wrapper}`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${current.iconColor}`}>
          {current.icon}
        </div>

        <div>
          <h3
            className={`text-sm font-bold ${current.titleColor}`}
          >
            {check.label}
          </h3>

          <p
            className={`mt-1 text-sm leading-6 ${current.messageColor}`}
          >
            {check.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SchemeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const isTamil = language === "ta";

  const scheme = schemes.find(
    (item) => item.id === id
  );

  const profile = useMemo(() => {
    try {
      const saved = localStorage.getItem(
        "schemesetu-profile"
      );

      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, []);

  const eligibilityResult = useMemo(() => {
    if (!profile || !scheme) {
      return null;
    }

    return checkEligibility(profile, scheme);
  }, [profile, scheme]);

  if (!scheme) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              {isTamil
                ? "திட்டம் கிடைக்கவில்லை"
                : "Scheme not found"}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {isTamil
                ? "இந்த திட்டம் SchemeSetu தரவுகளில் இல்லை."
                : "This scheme could not be found in the SchemeSetu database."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/results")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <ArrowLeft size={18} />

              {isTamil
                ? "முடிவுகளுக்குத் திரும்பு"
                : "Back to Results"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  const name = isTamil
    ? scheme.name.ta
    : scheme.name.en;

  const description = isTamil
    ? scheme.shortDescription.ta
    : scheme.shortDescription.en;

  const benefit = isTamil
    ? scheme.benefit.ta
    : scheme.benefit.en;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/results")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />

            {isTamil
              ? "முடிவுகளுக்குத் திரும்பு"
              : "Back to Results"}
          </button>

          <div className="font-bold text-blue-700">
            SchemeSetu
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg">
          <div className="p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
              <ShieldCheck size={15} />

              {isTamil
                ? "அரசு திட்ட தகவல்"
                : "Government Scheme Information"}
            </div>

            <h1 className="max-w-3xl text-3xl font-bold sm:text-4xl">
              {name}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                {isTamil
                  ? "அதிகாரப்பூர்வ தளம்"
                  : "Official Website"}

                <ExternalLink size={17} />
              </a>

              <Link
                to="/results"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                {isTamil
                  ? "முடிவுகளுக்குத் திரும்பு"
                  : "Back to Results"}

                <ArrowLeft size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            {/* BENEFIT */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <CheckCircle2 size={21} />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {isTamil
                    ? "திட்டத்தின் நன்மை"
                    : "Scheme Benefit"}
                </h2>
              </div>

              <div className="rounded-xl bg-green-50 p-5">
                <p className="text-sm leading-7 text-green-900">
                  {benefit}
                </p>
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <FileText size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {isTamil
                      ? "தேவையான ஆவணங்கள்"
                      : "Common Documents"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {isTamil
                      ? "விண்ணப்பிக்கும் முன் தேவையான ஆவணங்களை சரிபார்க்கவும்."
                      : "Check the applicable documents before applying."}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {scheme.documents?.map(
                  (document, index) => (
                    <div
                      key={`${document}-${index}`}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <span className="text-sm text-slate-700">
                        {document}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* ELIGIBILITY CHECKS */}
            {eligibilityResult && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                      <ShieldCheck size={21} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {isTamil
                          ? "உங்கள் தகுதி சரிபார்ப்பு"
                          : "Your Eligibility Checks"}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {isTamil
                          ? "நீங்கள் வழங்கிய தகவல்களின் அடிப்படையில்."
                          : "Based on the information you provided."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {eligibilityResult.checks.map(
                    (check, index) => (
                      <CheckItem
                        key={`${check.field}-${index}`}
                        check={check}
                      />
                    )
                  )}
                </div>

                {eligibilityResult.eligible && (
                  <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        size={22}
                        className="mt-0.5 shrink-0 text-green-600"
                      />

                      <div>
                        <h3 className="font-bold text-green-900">
                          {isTamil
                            ? "அடிப்படை தகுதி பொருந்துகிறது"
                            : "Basic eligibility matches"}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-green-800">
                          {isTamil
                            ? "உங்கள் பதில்கள் இந்த திட்டத்திற்காக சேமிக்கப்பட்ட அடிப்படை விதிகளுடன் பொருந்துகின்றன."
                            : "Your answers match the basic rules currently stored for this scheme."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!eligibilityResult.eligible &&
                  eligibilityResult.needsMoreInformation && (
                    <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          size={22}
                          className="mt-0.5 shrink-0 text-amber-600"
                        />

                        <div>
                          <h3 className="font-bold text-amber-900">
                            {isTamil
                              ? "கூடுதல் தகவல் தேவை"
                              : "More information is required"}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-amber-800">
                            {isTamil
                              ? "இந்த திட்டத்திற்கான அனைத்து விதிகளையும் மதிப்பிட தேவையான தகவல் இன்னும் இல்லை."
                              : "Some information required to evaluate this scheme is still missing."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {!eligibilityResult.eligible &&
                  !eligibilityResult.needsMoreInformation && (
                    <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5">
                      <div className="flex items-start gap-3">
                        <XCircle
                          size={22}
                          className="mt-0.5 shrink-0 text-red-600"
                        />

                        <div>
                          <h3 className="font-bold text-red-900">
                            {isTamil
                              ? "தற்போதைய பதில்களுடன் பொருந்தவில்லை"
                              : "Does not match your current answers"}
                          </h3>

                          <div className="mt-2 space-y-1">
                            {eligibilityResult.reasons.map(
                              (reason, index) => (
                                <p
                                  key={index}
                                  className="text-sm leading-6 text-red-800"
                                >
                                  • {reason}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">
            {/* SOURCE */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                {isTamil
                  ? "ஆதார தகவல்"
                  : "Source Information"}
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    {isTamil ? "ஆதாரம்" : "Source"}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {scheme.sourceName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    {isTamil
                      ? "கடைசியாக சரிபார்க்கப்பட்டது"
                      : "Last Verified"}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {scheme.lastVerified}
                  </p>
                </div>
              </div>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {isTamil
                  ? "அதிகாரப்பூர்வ தளத்திற்குச் செல்ல"
                  : "Visit Official Website"}

                <ExternalLink size={17} />
              </a>
            </section>

            {/* DISCLAIMER */}
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={21}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <div>
                  <h2 className="font-bold text-amber-900">
                    {isTamil
                      ? "முக்கிய குறிப்பு"
                      : "Important Note"}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    {isTamil
                      ? "SchemeSetu வழங்கும் முடிவு ஆரம்ப நிலை பொருத்தம் மட்டுமே. இறுதி தகுதி மற்றும் ஆவண தேவைகளை அதிகாரப்பூர்வ அரசு தளத்தில் உறுதி செய்யவும்."
                      : "SchemeSetu provides an initial match only. Confirm final eligibility and documentation requirements on the official government website."}
                  </p>
                </div>
              </div>
            </section>

            {/* ACTION */}
            <Link
              to="/find"
              className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-700 transition hover:bg-blue-100"
            >
              <div>
                <p className="font-bold">
                  {isTamil
                    ? "பதில்களை மாற்ற வேண்டுமா?"
                    : "Want to change your answers?"}
                </p>

                <p className="mt-1 text-xs text-blue-600">
                  {isTamil
                    ? "கேள்வித்தாளுக்குத் திரும்பவும்"
                    : "Return to the questionnaire"}
                </p>
              </div>

              <ArrowRight size={20} />
            </Link>
          </aside>
        </div>

        {/* BOTTOM */}
        <div className="mt-8 text-center">
          <Link
            to="/results"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={17} />

            {isTamil
              ? "அனைத்து முடிவுகளையும் பார்க்க"
              : "View all results"}
          </Link>
        </div>
      </div>
    </main>
  );
}