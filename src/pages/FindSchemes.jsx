import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  BriefcaseBusiness,
  IndianRupee,
  FileCheck2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const initialProfile = {
  age: "",
  gender: "",
  occupation: "",
  category: "",
  income: "",
  hasLandholding: "",
  landHectares: "",
  vendorDocument: "",
  poorHousehold: "",
  hasLpgConnection: "",
  traditionalTrade: "",
  governmentEmployee: "",
  recentSimilarLoan: "",
};

const occupations = [
  { value: "farmer", en: "Farmer", ta: "விவசாயி" },
  {
    value: "streetVendor",
    en: "Street Vendor",
    ta: "தெருவோர விற்பனையாளர்",
  },
  {
    value: "business",
    en: "Business Owner",
    ta: "தொழில் உரிமையாளர்",
  },
  {
    value: "selfEmployed",
    en: "Self-Employed",
    ta: "சுயதொழில் செய்பவர்",
  },
  {
    value: "student",
    en: "Student",
    ta: "மாணவர்",
  },
  {
    value: "employee",
    en: "Employee",
    ta: "ஊழியர்",
  },
  {
    value: "other",
    en: "Other",
    ta: "மற்றவை",
  },
];

const categories = [
  { value: "sc", en: "SC", ta: "SC" },
  { value: "st", en: "ST", ta: "ST" },
  { value: "obc", en: "OBC", ta: "OBC" },
  { value: "ews", en: "EWS", ta: "EWS" },
  { value: "dnt", en: "DNT", ta: "DNT" },
  {
    value: "safaiMitra",
    en: "Safai Mitra",
    ta: "சஃபாய் மித்ரா",
  },
  {
    value: "general",
    en: "General",
    ta: "பொது",
  },
];

const traditionalTrades = [
  {
    value: "carpenter",
    en: "Carpenter",
    ta: "தச்சர்",
  },
  {
    value: "boatMaker",
    en: "Boat Maker",
    ta: "படகு தயாரிப்பாளர்",
  },
  {
    value: "armourer",
    en: "Armourer",
    ta: "கவசம் தயாரிப்பாளர்",
  },
  {
    value: "blacksmith",
    en: "Blacksmith",
    ta: "கொல்லர்",
  },
  {
    value: "hammerToolKitMaker",
    en: "Hammer and Tool Kit Maker",
    ta: "சுத்தியல் மற்றும் கருவிப்பெட்டி தயாரிப்பாளர்",
  },
  {
    value: "locksmith",
    en: "Locksmith",
    ta: "பூட்டு தயாரிப்பாளர்",
  },
  {
    value: "goldsmith",
    en: "Goldsmith",
    ta: "தங்க நகைத் தொழிலாளர்",
  },
  {
    value: "potter",
    en: "Potter",
    ta: "குயவர்",
  },
  {
    value: "sculptor",
    en: "Sculptor / Stone Worker",
    ta: "சிற்பி / கல் தொழிலாளர்",
  },
  {
    value: "cobbler",
    en: "Cobbler / Footwear Artisan",
    ta: "காலணி தொழிலாளர்",
  },
  {
    value: "mason",
    en: "Mason",
    ta: "கொத்தனார்",
  },
  {
    value: "basketMatBroomMaker",
    en: "Basket / Mat / Broom Maker",
    ta: "கூடை / பாய் / துடைப்பம் தயாரிப்பாளர்",
  },
  {
    value: "dollToyMaker",
    en: "Doll and Toy Maker",
    ta: "பொம்மை மற்றும் விளையாட்டு பொருள் தயாரிப்பாளர்",
  },
  {
    value: "barber",
    en: "Barber",
    ta: "முடி திருத்துநர்",
  },
  {
    value: "garlandMaker",
    en: "Garland Maker",
    ta: "மாலை தயாரிப்பாளர்",
  },
  {
    value: "washerman",
    en: "Washerman",
    ta: "சலவைத் தொழிலாளர்",
  },
  {
    value: "tailor",
    en: "Tailor",
    ta: "தையல்காரர்",
  },
  {
    value: "fishingNetMaker",
    en: "Fishing Net Maker",
    ta: "மீன்பிடி வலை தயாரிப்பாளர்",
  },
];

function ProgressBar({ step, total }) {
  const percentage = (step / total) * 100;

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">
          Step {step} of {total}
        </span>

        <span className="text-slate-500">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function OptionButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
        selected
          ? "border-blue-600 bg-blue-50 text-blue-700"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
      }`}
    >
      <span className="font-medium">{children}</span>

      {selected && (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
          <Check size={15} />
        </span>
      )}
    </button>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {children}
    </label>
  );
}

function SectionHeader({ icon, title, description }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function FindSchemes() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [step, setStep] = useState(1);

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "schemesetu-profile"
      );

      return saved
        ? { ...initialProfile, ...JSON.parse(saved) }
        : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const totalSteps = 4;

  const isTamil = language === "ta";

  const updateProfile = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const canGoNext = () => {
    if (step === 1) {
      return profile.age !== "" && profile.gender !== "";
    }

    if (step === 2) {
      return (
        profile.occupation !== "" &&
        profile.category !== ""
      );
    }

    if (step === 3) {
      if (profile.income === "") {
        return false;
      }

      if (profile.occupation === "farmer") {
        if (profile.hasLandholding === "") {
          return false;
        }

        if (
          profile.hasLandholding === true &&
          profile.landHectares === ""
        ) {
          return false;
        }
      }

      if (profile.occupation === "streetVendor") {
        if (profile.vendorDocument === "") {
          return false;
        }
      }

      return true;
    }

    if (step === 4) {
      if (profile.gender === "female") {
        if (profile.hasLpgConnection === "") {
          return false;
        }

        if (profile.poorHousehold === "") {
          return false;
        }
      }

      if (
        profile.occupation === "selfEmployed" ||
        profile.occupation === "business"
      ) {
        if (profile.traditionalTrade !== "") {
          if (profile.governmentEmployee === "") {
            return false;
          }

          if (profile.recentSimilarLoan === "") {
            return false;
          }
        }
      }

      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (!canGoNext()) {
      return;
    }

    if (step < totalSteps) {
      setStep((current) => current + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    localStorage.setItem(
      "schemesetu-profile",
      JSON.stringify(profile)
    );

    navigate("/results");
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((current) => current - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />

            {isTamil
              ? "முகப்புக்கு திரும்பு"
              : "Back to Home"}
          </button>

          <div className="font-bold text-blue-700">
            SchemeSetu
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <ProgressBar
          step={step}
          total={totalSteps}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {/* =====================================================
              STEP 1
          ====================================================== */}
          {step === 1 && (
            <div>
              <SectionHeader
                icon={<User size={22} />}
                title={
                  isTamil
                    ? "உங்களைப் பற்றி சொல்லுங்கள்"
                    : "Tell us about yourself"
                }
                description={
                  isTamil
                    ? "உங்கள் வயது மற்றும் பாலினத்தை உள்ளிடுங்கள்."
                    : "Enter your age and gender."
                }
              />

              <div className="space-y-6">
                <div>
                  <FieldLabel>
                    {isTamil ? "வயது" : "Age"}
                  </FieldLabel>

                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={profile.age}
                    onChange={(e) =>
                      updateProfile(
                        "age",
                        e.target.value
                      )
                    }
                    placeholder={
                      isTamil
                        ? "உங்கள் வயது"
                        : "Enter your age"
                    }
                    className="input"
                  />
                </div>

                <div>
                  <FieldLabel>
                    {isTamil
                      ? "பாலினம்"
                      : "Gender"}
                  </FieldLabel>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <OptionButton
                      selected={
                        profile.gender === "female"
                      }
                      onClick={() =>
                        updateProfile(
                          "gender",
                          "female"
                        )
                      }
                    >
                      {isTamil ? "பெண்" : "Female"}
                    </OptionButton>

                    <OptionButton
                      selected={
                        profile.gender === "male"
                      }
                      onClick={() =>
                        updateProfile(
                          "gender",
                          "male"
                        )
                      }
                    >
                      {isTamil ? "ஆண்" : "Male"}
                    </OptionButton>

                    <OptionButton
                      selected={
                        profile.gender === "other"
                      }
                      onClick={() =>
                        updateProfile(
                          "gender",
                          "other"
                        )
                      }
                    >
                      {isTamil
                        ? "மற்றவை"
                        : "Other"}
                    </OptionButton>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              STEP 2
          ====================================================== */}
          {step === 2 && (
            <div>
              <SectionHeader
                icon={<BriefcaseBusiness size={22} />}
                title={
                  isTamil
                    ? "உங்கள் தொழில் மற்றும் பிரிவு"
                    : "Your occupation & category"
                }
                description={
                  isTamil
                    ? "உங்களுக்கு பொருந்தும் விருப்பங்களைத் தேர்ந்தெடுக்கவும்."
                    : "Select the options that best describe you."
                }
              />

              <div className="space-y-7">
                <div>
                  <FieldLabel>
                    {isTamil
                      ? "தொழில்"
                      : "Occupation"}
                  </FieldLabel>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {occupations.map(
                      (occupation) => (
                        <OptionButton
                          key={occupation.value}
                          selected={
                            profile.occupation ===
                            occupation.value
                          }
                          onClick={() =>
                            updateProfile(
                              "occupation",
                              occupation.value
                            )
                          }
                        >
                          {isTamil
                            ? occupation.ta
                            : occupation.en}
                        </OptionButton>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <FieldLabel>
                    {isTamil
                      ? "சமூகப் பிரிவு"
                      : "Social Category"}
                  </FieldLabel>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {categories.map(
                      (category) => (
                        <OptionButton
                          key={category.value}
                          selected={
                            profile.category ===
                            category.value
                          }
                          onClick={() =>
                            updateProfile(
                              "category",
                              category.value
                            )
                          }
                        >
                          {isTamil
                            ? category.ta
                            : category.en}
                        </OptionButton>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              STEP 3
          ====================================================== */}
          {step === 3 && (
            <div>
              <SectionHeader
                icon={<IndianRupee size={22} />}
                title={
                  isTamil
                    ? "நிதி மற்றும் குடும்ப தகவல்"
                    : "Financial & supporting information"
                }
                description={
                  isTamil
                    ? "உங்கள் பொருளாதார நிலை மற்றும் தேவையான தகவல்களை வழங்குங்கள்."
                    : "Provide your income and other information used by the eligibility engine."
                }
              />

              <div className="space-y-7">
                {/* INCOME */}
                <div>
                  <FieldLabel>
                    {isTamil
                      ? "ஆண்டு குடும்ப வருமானம்"
                      : "Annual Household Income"}
                  </FieldLabel>

                  {/* FIXED CURRENCY INPUT */}
                  <div className="flex w-full overflow-hidden rounded-xl border border-slate-300 bg-white transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                    <div className="flex w-14 shrink-0 items-center justify-center border-r border-slate-200 bg-slate-50 text-base font-semibold text-slate-600">
                      ₹
                    </div>

                    <input
                      type="number"
                      min="0"
                      value={profile.income}
                      onChange={(e) =>
                        updateProfile(
                          "income",
                          e.target.value
                        )
                      }
                      placeholder={
                        isTamil
                          ? "எ.கா. 200000"
                          : "e.g. 200000"
                      }
                      className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 outline-none placeholder:text-slate-400 focus:ring-0"
                    />
                  </div>
                </div>

                {/* FARMER */}
                {profile.occupation === "farmer" && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                    <FieldLabel>
                      {isTamil
                        ? "உங்களிடம் விவசாய நிலம் உள்ளதா?"
                        : "Do you have agricultural land?"}
                    </FieldLabel>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <OptionButton
                        selected={
                          profile.hasLandholding === true
                        }
                        onClick={() =>
                          updateProfile(
                            "hasLandholding",
                            true
                          )
                        }
                      >
                        {isTamil ? "ஆம்" : "Yes"}
                      </OptionButton>

                      <OptionButton
                        selected={
                          profile.hasLandholding === false
                        }
                        onClick={() =>
                          updateProfile(
                            "hasLandholding",
                            false
                          )
                        }
                      >
                        {isTamil ? "இல்லை" : "No"}
                      </OptionButton>
                    </div>

                    {profile.hasLandholding ===
                      true && (
                      <div className="mt-5">
                        <FieldLabel>
                          {isTamil
                            ? "நில அளவு (ஹெக்டேர்)"
                            : "Land area (hectares)"}
                        </FieldLabel>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={
                            profile.landHectares
                          }
                          onChange={(e) =>
                            updateProfile(
                              "landHectares",
                              e.target.value
                            )
                          }
                          placeholder={
                            isTamil
                              ? "எ.கா. 1.5"
                              : "e.g. 1.5"
                          }
                          className="input"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* STREET VENDOR */}
                {profile.occupation ===
                  "streetVendor" && (
                  <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
                    <FieldLabel>
                      {isTamil
                        ? "விற்பனையாளர் அடையாள ஆவணம் உள்ளதா?"
                        : "Do you have vendor identification?"}
                    </FieldLabel>

                    <p className="mb-4 text-sm text-slate-600">
                      {isTamil
                        ? "Certificate of Vending, ID Card அல்லது பொருந்தும் Letter of Recommendation போன்றவை."
                        : "For example, a Certificate of Vending, Identity Card or applicable Letter of Recommendation."}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <OptionButton
                        selected={
                          profile.vendorDocument ===
                          "yes"
                        }
                        onClick={() =>
                          updateProfile(
                            "vendorDocument",
                            "yes"
                          )
                        }
                      >
                        {isTamil ? "ஆம்" : "Yes"}
                      </OptionButton>

                      <OptionButton
                        selected={
                          profile.vendorDocument ===
                          "no"
                        }
                        onClick={() =>
                          updateProfile(
                            "vendorDocument",
                            "no"
                          )
                        }
                      >
                        {isTamil ? "இல்லை" : "No"}
                      </OptionButton>
                    </div>
                  </div>
                )}

                {/* GENERAL INFO MESSAGE */}
                {profile.occupation !== "farmer" &&
                  profile.occupation !==
                    "streetVendor" && (
                    <div className="rounded-xl bg-blue-50 p-5 text-sm text-blue-800">
                      {isTamil
                        ? "உங்கள் பதில்களை அடிப்படையாகக் கொண்டு அடுத்த கட்டத்தில் தேவையான கூடுதல் தகவல்கள் கேட்கப்படும்."
                        : "We'll ask for additional scheme-specific information in the next step based on your answers."}
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* =====================================================
              STEP 4
          ====================================================== */}
          {step === 4 && (
            <div>
              <SectionHeader
                icon={<FileCheck2 size={22} />}
                title={
                  isTamil
                    ? "கூடுதல் தகுதி தகவல்கள்"
                    : "Additional eligibility information"
                }
                description={
                  isTamil
                    ? "சில அரசு திட்டங்களுக்கு தேவையான கூடுதல் கேள்விகள்."
                    : "A few additional questions used by specific government schemes."
                }
              />

              <div className="space-y-7">
                {/* UJJWALA */}
                {profile.gender === "female" && (
                  <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
                    <div className="mb-5">
                      <h3 className="font-bold text-purple-900">
                        {isTamil
                          ? "LPG / உஜ்வாலா தகவல்"
                          : "LPG / Ujjwala information"}
                      </h3>

                      <p className="mt-1 text-sm text-purple-800">
                        {isTamil
                          ? "PM Ujjwala போன்ற திட்டங்களுக்காக இந்த தகவல் பயன்படுத்தப்படும்."
                          : "This information is used for schemes such as PM Ujjwala."}
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <FieldLabel>
                          {isTamil
                            ? "உங்கள் குடும்பத்தில் ஏற்கனவே LPG இணைப்பு உள்ளதா?"
                            : "Does your household already have an LPG connection?"}
                        </FieldLabel>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <OptionButton
                            selected={
                              profile.hasLpgConnection ===
                              "yes"
                            }
                            onClick={() =>
                              updateProfile(
                                "hasLpgConnection",
                                "yes"
                              )
                            }
                          >
                            {isTamil
                              ? "ஆம்"
                              : "Yes"}
                          </OptionButton>

                          <OptionButton
                            selected={
                              profile.hasLpgConnection ===
                              "no"
                            }
                            onClick={() =>
                              updateProfile(
                                "hasLpgConnection",
                                "no"
                              )
                            }
                          >
                            {isTamil
                              ? "இல்லை"
                              : "No"}
                          </OptionButton>
                        </div>
                      </div>

                      <div>
                        <FieldLabel>
                          {isTamil
                            ? "உங்கள் குடும்பம் தகுதியான ஏழை குடும்பமாக உள்ளதா?"
                            : "Does your household meet the applicable poor-household eligibility?"}
                        </FieldLabel>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <OptionButton
                            selected={
                              profile.poorHousehold ===
                              "yes"
                            }
                            onClick={() =>
                              updateProfile(
                                "poorHousehold",
                                "yes"
                              )
                            }
                          >
                            {isTamil
                              ? "ஆம்"
                              : "Yes"}
                          </OptionButton>

                          <OptionButton
                            selected={
                              profile.poorHousehold ===
                              "no"
                            }
                            onClick={() =>
                              updateProfile(
                                "poorHousehold",
                                "no"
                              )
                            }
                          >
                            {isTamil
                              ? "இல்லை"
                              : "No"}
                          </OptionButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* VISHWAKARMA */}
                {(profile.occupation ===
                  "selfEmployed" ||
                  profile.occupation ===
                    "business") && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <div className="mb-5">
                      <h3 className="font-bold text-amber-900">
                        {isTamil
                          ? "கைவினைஞர் தகவல்"
                          : "Artisan information"}
                      </h3>

                      <p className="mt-1 text-sm text-amber-800">
                        {isTamil
                          ? "PM Vishwakarma போன்ற பாரம்பரிய தொழில் திட்டங்களுக்காக."
                          : "Used for traditional artisan schemes such as PM Vishwakarma."}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <FieldLabel>
                          {isTamil
                            ? "உங்கள் பாரம்பரிய தொழில் என்ன?"
                            : "What traditional trade do you practice?"}
                        </FieldLabel>

                        <select
                          value={
                            profile.traditionalTrade
                          }
                          onChange={(e) =>
                            updateProfile(
                              "traditionalTrade",
                              e.target.value
                            )
                          }
                          className="input"
                        >
                          <option value="">
                            {isTamil
                              ? "தேர்ந்தெடுக்கவும்"
                              : "Select a trade"}
                          </option>

                          {traditionalTrades.map(
                            (trade) => (
                              <option
                                key={trade.value}
                                value={trade.value}
                              >
                                {isTamil
                                  ? trade.ta
                                  : trade.en}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      {profile.traditionalTrade && (
                        <>
                          <div>
                            <FieldLabel>
                              {isTamil
                                ? "நீங்கள் அரசு ஊழியரா?"
                                : "Are you a government employee?"}
                            </FieldLabel>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <OptionButton
                                selected={
                                  profile.governmentEmployee ===
                                  "yes"
                                }
                                onClick={() =>
                                  updateProfile(
                                    "governmentEmployee",
                                    "yes"
                                  )
                                }
                              >
                                {isTamil
                                  ? "ஆம்"
                                  : "Yes"}
                              </OptionButton>

                              <OptionButton
                                selected={
                                  profile.governmentEmployee ===
                                  "no"
                                }
                                onClick={() =>
                                  updateProfile(
                                    "governmentEmployee",
                                    "no"
                                  )
                                }
                              >
                                {isTamil
                                  ? "இல்லை"
                                  : "No"}
                              </OptionButton>
                            </div>
                          </div>

                          <div>
                            <FieldLabel>
                              {isTamil
                                ? "கடந்த 5 ஆண்டுகளில் இதே போன்ற அரசு கடன் பெற்றுள்ளீர்களா?"
                                : "Have you received a similar government loan in the previous 5 years?"}
                            </FieldLabel>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <OptionButton
                                selected={
                                  profile.recentSimilarLoan ===
                                  "yes"
                                }
                                onClick={() =>
                                  updateProfile(
                                    "recentSimilarLoan",
                                    "yes"
                                  )
                                }
                              >
                                {isTamil
                                  ? "ஆம்"
                                  : "Yes"}
                              </OptionButton>

                              <OptionButton
                                selected={
                                  profile.recentSimilarLoan ===
                                  "no"
                                }
                                onClick={() =>
                                  updateProfile(
                                    "recentSimilarLoan",
                                    "no"
                                  )
                                }
                              >
                                {isTamil
                                  ? "இல்லை"
                                  : "No"}
                              </OptionButton>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* NO EXTRA QUESTIONS */}
                {profile.gender !== "female" &&
                  profile.occupation !==
                    "selfEmployed" &&
                  profile.occupation !==
                    "business" && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Check size={24} />
                      </div>

                      <h3 className="font-bold text-slate-900">
                        {isTamil
                          ? "கூடுதல் தகவல்கள் தேவையில்லை"
                          : "You're all set"}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        {isTamil
                          ? "உங்கள் பதில்களை வைத்து பொருந்தக்கூடிய திட்டங்களை தேடலாம்."
                          : "We have enough information to search for matching schemes."}
                      </p>
                    </div>
                  )}

                {/* PRIVACY NOTE */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
                  <strong className="text-slate-700">
                    {isTamil
                      ? "குறிப்பு: "
                      : "Note: "}
                  </strong>

                  {isTamil
                    ? "இந்த கேள்வித்தாள் உங்கள் பதில்களை அடிப்படையாகக் கொண்டு ஆரம்ப தகுதி பொருத்தத்தை மட்டும் வழங்குகிறது. இறுதி தகுதி சம்பந்தப்பட்ட அரசு விதிகளின் அடிப்படையில் உறுதி செய்யப்பட வேண்டும்."
                    : "This questionnaire provides an initial eligibility match based on your answers. Final eligibility should always be confirmed against the applicable government scheme rules."}
                </div>
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />

              {isTamil ? "பின்செல்" : "Back"}
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition ${
                canGoNext()
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-slate-300"
              }`}
            >
              {step === totalSteps
                ? isTamil
                  ? "திட்டங்களை கண்டறி"
                  : "Find Schemes"
                : isTamil
                  ? "தொடர்க"
                  : "Continue"}

              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}