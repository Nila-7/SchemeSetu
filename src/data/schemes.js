export const schemes = [
  // =========================================================
  // 1. PM-KISAN
  // =========================================================
  {
    id: "pm-kisan",

    name: {
      en: "PM-KISAN Samman Nidhi",
      ta: "பிரதமர் கிசான் சம்மான் நிதி",
    },

    shortDescription: {
      en: "Income support scheme for eligible landholding farmer families.",
      ta: "தகுதியுள்ள நிலம் வைத்திருக்கும் விவசாயக் குடும்பங்களுக்கான வருமான ஆதரவு திட்டம்.",
    },

    category: "farmer",

    officialUrl: "https://pmkisan.gov.in/",

    sourceName: "PM-KISAN Official Portal",

    lastVerified: "September 2026",

    documents: [
      "Aadhaar",
      "Land ownership / land records",
      "Bank account details",
    ],

    eligibility: {
      occupation: ["farmer"],
      requiresLandholding: true,
    },

    benefit: {
      en: "₹6,000 per year, subject to scheme rules and exclusions.",
      ta: "திட்ட விதிகள் மற்றும் விலக்குகளுக்கு உட்பட்டு ஆண்டுக்கு ₹6,000.",
    },
  },

  // =========================================================
  // 2. PM KISAN MAAN-DHAN
  // =========================================================
  {
    id: "pm-kisan-maandhan",

    name: {
      en: "Pradhan Mantri Kisan Maan-Dhan Yojana",
      ta: "பிரதமர் கிசான் மான்-தன் யோஜனா",
    },

    shortDescription: {
      en: "Voluntary contributory pension scheme for eligible small and marginal farmers.",
      ta: "தகுதியுள்ள சிறு மற்றும் குறு விவசாயிகளுக்கான பங்களிப்பு ஓய்வூதியத் திட்டம்.",
    },

    category: "farmer",

    officialUrl: "https://pmkisan.gov.in/",

    sourceName: "PM-KISAN Official Portal",

    lastVerified: "September 2026",

    documents: [
      "Aadhaar",
      "Land records",
      "Bank account details",
    ],

    eligibility: {
      occupation: ["farmer"],
      minAge: 18,
      maxAge: 40,
      requiresLandholding: true,
      maxLandHectares: 2,
    },

    benefit: {
      en: "Minimum assured pension of ₹3,000 per month after attaining age 60, subject to scheme conditions.",
      ta: "திட்ட நிபந்தனைகளுக்கு உட்பட்டு 60 வயதிற்குப் பிறகு மாதம் குறைந்தது ₹3,000 ஓய்வூதியம்.",
    },
  },

  // =========================================================
  // 3. PM SVANIDHI
  // =========================================================
  {
    id: "pm-svanidhi",

    name: {
      en: "PM Street Vendor's AtmaNirbhar Nidhi",
      ta: "பிரதமர் தெருவோர விற்பனையாளர்கள் ஆத்மநிர்பர் நிதி",
    },

    shortDescription: {
      en: "Working-capital support scheme for eligible street vendors.",
      ta: "தகுதியுள்ள தெருவோர விற்பனையாளர்களுக்கான செயல்பாட்டு மூலதன ஆதரவு திட்டம்.",
    },

    category: "street-vendor",

    officialUrl: "https://pmsvanidhi.mohua.gov.in/",

    sourceName: "PM SVANidhi Official Portal",

    lastVerified: "September 2026",

    documents: [
      "Aadhaar",
      "Certificate of Vending / Identity Card",
      "Letter of Recommendation, where applicable",
      "Bank account details",
    ],

    eligibility: {
      occupation: ["streetVendor"],
      requiresVendorDocument: true,
    },

    benefit: {
      en: "Working-capital loans through progressive loan tranches, subject to scheme conditions.",
      ta: "திட்ட நிபந்தனைகளுக்கு உட்பட்டு படிப்படியான செயல்பாட்டு மூலதனக் கடன்கள்.",
    },
  },

  // =========================================================
  // 4. PM MUDRA
  // =========================================================
  {
    id: "pm-mudra",

    name: {
      en: "Pradhan Mantri MUDRA Yojana",
      ta: "பிரதமர் முத்ரா யோஜனா",
    },

    shortDescription: {
      en: "Collateral-free institutional credit for eligible micro-enterprises and income-generating businesses.",
      ta: "தகுதியுள்ள குறு நிறுவனங்கள் மற்றும் வருமானம் ஈட்டும் தொழில்களுக்கு பிணையில்லா நிறுவனக் கடன்.",
    },

    category: "business",

    officialUrl:
      "https://financialservices.gov.in/pradhan-mantri-mudra-yojana-pmmy",

    sourceName: "Department of Financial Services",

    lastVerified: "September 2026",

    documents: [
      "Aadhaar / identity proof",
      "Business-related documents",
      "Bank account details",
      "Business plan or supporting documents, as required by the lender",
    ],

    eligibility: {
      occupation: ["business", "selfEmployed"],
    },

    benefit: {
      en: "Collateral-free credit through Shishu, Kishor, Tarun and Tarun Plus categories, subject to current scheme conditions.",
      ta: "தற்போதைய திட்ட நிபந்தனைகளுக்கு உட்பட்டு Shishu, Kishor, Tarun மற்றும் Tarun Plus பிரிவுகளின் மூலம் பிணையில்லா கடன்.",
    },
  },

  // =========================================================
  // 5. PM-DAKSH
  // =========================================================
  {
    id: "pm-daksh",

    name: {
      en: "PM-DAKSH Yojana",
      ta: "பிரதமர் தக்ஷ் யோஜனா",
    },

    shortDescription: {
      en: "Skill development and training support for eligible target groups.",
      ta: "தகுதியுள்ள சமூகப் பிரிவுகளுக்கான திறன் மேம்பாடு மற்றும் பயிற்சி ஆதரவு திட்டம்.",
    },

    category: "skill-development",

    officialUrl: "https://www.myscheme.gov.in/schemes/pm-daksh",

    sourceName: "myScheme — Government of India",

    lastVerified: "September 2026",

    documents: [
      "Aadhaar",
      "Category / community certificate, where applicable",
      "Income certificate, where applicable",
      "Aadhaar-linked bank account",
    ],

    eligibility: {
      minAge: 18,
      maxAge: 45,

      categories: [
        "sc",
        "obc",
        "ews",
        "dnt",
        "safaiMitra",
      ],

      conditionalIncomeRules: [
        {
          categories: ["obc", "ews"],
          maxIncome: 300000,
        },
      ],
    },

    benefit: {
      en: "Skill development, up-skilling and re-skilling opportunities subject to the applicable PM-DAKSH programme.",
      ta: "பொருந்தும் PM-DAKSH திட்டத்திற்கு உட்பட்டு திறன் மேம்பாடு, திறன் உயர்த்தல் மற்றும் மறுதிறன் பயிற்சி வாய்ப்புகள்.",
    },
  },

  // =========================================================
  // 6. PM UJJWALA YOJANA
  // =========================================================
  {
    id: "pm-ujjwala",

    name: {
      en: "Pradhan Mantri Ujjwala Yojana",
      ta: "பிரதமர் உஜ்வாலா யோஜனா",
    },

    shortDescription: {
      en: "LPG connection support for eligible adult women from poor households.",
      ta: "தகுதியுள்ள ஏழை குடும்பங்களைச் சேர்ந்த வயது வந்த பெண்களுக்கு LPG இணைப்பு வழங்கும் திட்டம்.",
    },

    category: "household",

    officialUrl: "https://www.pmuy.gov.in/index.aspx",

    sourceName: "PM Ujjwala Yojana Official Portal",

    lastVerified: "September 2026",

    documents: [
      "Aadhaar",
      "KYC documents",
      "Bank account details",
      "Ration card / family composition document",
      "Aadhaar details of adult family members",
      "Address proof, where applicable",
      "Deprivation declaration",
    ],

    eligibility: {
      minAge: 18,

      gender: ["female"],

      requiresNoLpgConnection: true,

      requiresPoorHousehold: true,
    },

    benefit: {
      en: "Deposit-free LPG connection with applicable PMUY support, subject to current scheme conditions.",
      ta: "தற்போதைய திட்ட நிபந்தனைகளுக்கு உட்பட்டு வைப்புத்தொகையில்லா LPG இணைப்பு மற்றும் பொருந்தும் PMUY ஆதரவு.",
    },
  },

  // =========================================================
  // 7. PM VISHWAKARMA
  // =========================================================
  {
    id: "pm-vishwakarma",

    name: {
      en: "PM Vishwakarma",
      ta: "பிரதமர் விஸ்வகர்மா",
    },

    shortDescription: {
      en: "Support for eligible artisans and craftspeople working in notified traditional trades.",
      ta: "அங்கீகரிக்கப்பட்ட பாரம்பரிய தொழில்களில் ஈடுபடும் தகுதியுள்ள கைவினைஞர்கள் மற்றும் தொழிலாளர்களுக்கான ஆதரவு திட்டம்.",
    },

    category: "artisan",

    officialUrl: "https://pmvishwakarma.gov.in/",

    sourceName: "PM Vishwakarma Official Portal",

    lastVerified: "September 2026",

    documents: [
      "Aadhaar",
      "Mobile number",
      "Bank account details",
      "Ration card / family details, where applicable",
      "Documents requested during scheme registration",
    ],

    eligibility: {
      minAge: 18,

      requiresSelfEmployed: true,

      requiresTraditionalTrade: true,

      traditionalTrades: [
        "carpenter",
        "boatMaker",
        "armourer",
        "blacksmith",
        "hammerToolKitMaker",
        "locksmith",
        "goldsmith",
        "potter",
        "sculptor",
        "cobbler",
        "mason",
        "basketMatBroomMaker",
        "dollToyMaker",
        "barber",
        "garlandMaker",
        "washerman",
        "tailor",
        "fishingNetMaker",
      ],

      requiresGovernmentEmployeeCheck: true,

      requiresRecentSimilarLoanCheck: true,
    },

    benefit: {
      en: "Skill training, toolkit incentive, digital transaction incentives, marketing support and collateral-free enterprise loans, subject to scheme conditions.",
      ta: "திட்ட நிபந்தனைகளுக்கு உட்பட்டு திறன் பயிற்சி, கருவிப்பெட்டி ஊக்கத்தொகை, டிஜிட்டல் பரிவர்த்தனை ஊக்கங்கள், சந்தைப்படுத்தல் ஆதரவு மற்றும் பிணையில்லா தொழில் கடன்கள்.",
    },
  },
];