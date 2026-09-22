function addMissing(missingInformation, field) {
  if (!missingInformation.includes(field)) {
    missingInformation.push(field);
  }
}

function addCheck(checks, field, label, status, message) {
  checks.push({
    field,
    label,
    status,
    message,
  });
}

export function checkEligibility(user, scheme) {
  const rules = scheme.eligibility || {};

  const checks = [];
  const reasons = [];
  const missingInformation = [];

  // =========================================================
  // AGE
  // =========================================================

  if (rules.minAge !== undefined) {
    if (user.age === "" || user.age === undefined) {
      addMissing(missingInformation, "age");

      addCheck(
        checks,
        "age",
        "Age",
        "missing",
        "Age information is required."
      );
    } else if (Number(user.age) < rules.minAge) {
      addCheck(
        checks,
        "age",
        "Age",
        "failed",
        `Your age is ${user.age}. Minimum age is ${rules.minAge}.`
      );
    } else {
      addCheck(
        checks,
        "age",
        "Age",
        "passed",
        `${user.age} years — meets the minimum age of ${rules.minAge}.`
      );
    }
  }

  if (rules.maxAge !== undefined) {
    if (user.age === "" || user.age === undefined) {
      addMissing(missingInformation, "age");

      const alreadyChecked = checks.some(
        (check) =>
          check.field === "age" &&
          check.status === "missing"
      );

      if (!alreadyChecked) {
        addCheck(
          checks,
          "age",
          "Age",
          "missing",
          "Age information is required."
        );
      }
    } else if (Number(user.age) > rules.maxAge) {
      addCheck(
        checks,
        "age",
        "Age",
        "failed",
        `Your age is ${user.age}. Maximum age is ${rules.maxAge}.`
      );
    } else if (
      !checks.some(
        (check) =>
          check.field === "age" &&
          check.status === "passed"
      )
    ) {
      addCheck(
        checks,
        "age",
        "Age",
        "passed",
        `${user.age} years — within the allowed age range.`
      );
    }
  }

  // =========================================================
  // OCCUPATION
  // =========================================================

  if (rules.occupation?.length) {
    if (!user.occupation) {
      addMissing(missingInformation, "occupation");

      addCheck(
        checks,
        "occupation",
        "Occupation",
        "missing",
        "Occupation information is required."
      );
    } else if (
      !rules.occupation.includes(user.occupation)
    ) {
      addCheck(
        checks,
        "occupation",
        "Occupation",
        "failed",
        "Your occupation does not match this scheme's required occupation category."
      );
    } else {
      addCheck(
        checks,
        "occupation",
        "Occupation",
        "passed",
        "Your occupation matches the scheme's target occupation."
      );
    }
  }

  // =========================================================
  // SELF-EMPLOYMENT
  // =========================================================

  if (rules.requiresSelfEmployed) {
    if (!user.occupation) {
      addMissing(missingInformation, "occupation");

      const alreadyChecked = checks.some(
        (check) =>
          check.field === "occupation" &&
          check.status === "missing"
      );

      if (!alreadyChecked) {
        addCheck(
          checks,
          "occupation",
          "Occupation",
          "missing",
          "Occupation information is required."
        );
      }
    } else if (
      !["selfEmployed", "business"].includes(
        user.occupation
      )
    ) {
      addCheck(
        checks,
        "occupation",
        "Occupation",
        "failed",
        "This scheme requires self-employment or an applicable business activity."
      );
    } else {
      addCheck(
        checks,
        "occupation",
        "Occupation",
        "passed",
        "Your occupation is compatible with the self-employment requirement."
      );
    }
  }

  // =========================================================
  // SOCIAL CATEGORY
  // =========================================================

  if (rules.categories?.length) {
    if (!user.category) {
      addMissing(missingInformation, "category");

      addCheck(
        checks,
        "category",
        "Social Category",
        "missing",
        "Social category information is required."
      );
    } else if (
      !rules.categories.includes(user.category)
    ) {
      addCheck(
        checks,
        "category",
        "Social Category",
        "failed",
        "Your social category is not included in this scheme's target categories."
      );
    } else {
      addCheck(
        checks,
        "category",
        "Social Category",
        "passed",
        "Your social category is included in the scheme's target groups."
      );
    }
  }

  // =========================================================
  // INCOME
  // =========================================================

  if (rules.maxIncome !== undefined) {
    if (
      user.income === "" ||
      user.income === undefined
    ) {
      addMissing(missingInformation, "income");

      addCheck(
        checks,
        "income",
        "Annual Income",
        "missing",
        "Income information is required."
      );
    } else if (Number(user.income) >= rules.maxIncome) {
      addCheck(
        checks,
        "income",
        "Annual Income",
        "failed",
        `Annual household income must be below ₹${rules.maxIncome.toLocaleString(
          "en-IN"
        )}.`
      );
    } else {
      addCheck(
        checks,
        "income",
        "Annual Income",
        "passed",
        `₹${Number(user.income).toLocaleString(
          "en-IN"
        )} — below the ₹${rules.maxIncome.toLocaleString(
          "en-IN"
        )} limit.`
      );
    }
  }

  if (rules.minIncome !== undefined) {
    if (
      user.income === "" ||
      user.income === undefined
    ) {
      addMissing(missingInformation, "income");

      const alreadyChecked = checks.some(
        (check) =>
          check.field === "income" &&
          check.status === "missing"
      );

      if (!alreadyChecked) {
        addCheck(
          checks,
          "income",
          "Annual Income",
          "missing",
          "Income information is required."
        );
      }
    } else if (Number(user.income) < rules.minIncome) {
      addCheck(
        checks,
        "income",
        "Annual Income",
        "failed",
        `Annual household income must be at least ₹${rules.minIncome.toLocaleString(
          "en-IN"
        )}.`
      );
    } else {
      const alreadyChecked = checks.some(
        (check) =>
          check.field === "income" &&
          check.status === "passed"
      );

      if (!alreadyChecked) {
        addCheck(
          checks,
          "income",
          "Annual Income",
          "passed",
          `₹${Number(user.income).toLocaleString(
            "en-IN"
          )} — meets the income requirement.`
        );
      }
    }
  }

  // =========================================================
  // CONDITIONAL INCOME RULES
  // =========================================================

  if (rules.conditionalIncomeRules?.length) {
    if (!user.category) {
      addMissing(missingInformation, "category");

      addCheck(
        checks,
        "category",
        "Social Category",
        "missing",
        "Category is required to determine the applicable income rule."
      );
    } else {
      const matchingIncomeRule =
        rules.conditionalIncomeRules.find((rule) =>
          rule.categories.includes(user.category)
        );

      if (matchingIncomeRule) {
        if (
          user.income === "" ||
          user.income === undefined
        ) {
          addMissing(missingInformation, "income");

          addCheck(
            checks,
            "income",
            "Annual Income",
            "missing",
            "Income is required for this category."
          );
        } else if (
          Number(user.income) >=
          matchingIncomeRule.maxIncome
        ) {
          addCheck(
            checks,
            "income",
            "Annual Income",
            "failed",
            `For your category, annual household income must be below ₹${matchingIncomeRule.maxIncome.toLocaleString(
              "en-IN"
            )}.`
          );
        } else {
          addCheck(
            checks,
            "income",
            "Annual Income",
            "passed",
            `₹${Number(user.income).toLocaleString(
              "en-IN"
            )} — below the ₹${matchingIncomeRule.maxIncome.toLocaleString(
              "en-IN"
            )} limit for your category.`
          );
        }
      }
    }
  }

  // =========================================================
  // AGRICULTURAL LAND
  // =========================================================

  if (rules.requiresLandholding) {
    if (
      user.hasLandholding === undefined ||
      user.hasLandholding === ""
    ) {
      addMissing(
        missingInformation,
        "landholding"
      );

      addCheck(
        checks,
        "landholding",
        "Agricultural Land",
        "missing",
        "Landholding information is required."
      );
    } else if (!user.hasLandholding) {
      addCheck(
        checks,
        "landholding",
        "Agricultural Land",
        "failed",
        "This scheme requires eligible landholding farmer status."
      );
    } else {
      addCheck(
        checks,
        "landholding",
        "Agricultural Land",
        "passed",
        "You reported eligible agricultural landholding."
      );
    }
  }

  // =========================================================
  // LAND AREA
  // =========================================================

  if (rules.maxLandHectares !== undefined) {
    if (
      user.landHectares === "" ||
      user.landHectares === undefined
    ) {
      addMissing(
        missingInformation,
        "landHectares"
      );

      addCheck(
        checks,
        "landHectares",
        "Land Area",
        "missing",
        "Land area information is required."
      );
    } else if (
      Number(user.landHectares) >
      rules.maxLandHectares
    ) {
      addCheck(
        checks,
        "landHectares",
        "Land Area",
        "failed",
        `Landholding must not exceed ${rules.maxLandHectares} hectares for this rule.`
      );
    } else {
      addCheck(
        checks,
        "landHectares",
        "Land Area",
        "passed",
        `${user.landHectares} hectares — within the ${rules.maxLandHectares}-hectare limit.`
      );
    }
  }

  // =========================================================
  // STREET VENDOR DOCUMENT
  // =========================================================

  if (rules.requiresVendorDocument) {
    if (
      user.vendorDocument === undefined ||
      user.vendorDocument === ""
    ) {
      addMissing(
        missingInformation,
        "vendorDocument"
      );

      addCheck(
        checks,
        "vendorDocument",
        "Vendor Document",
        "missing",
        "Vendor identification information is required."
      );
    } else if (!user.vendorDocument) {
      addCheck(
        checks,
        "vendorDocument",
        "Vendor Document",
        "failed",
        "A Certificate of Vending, identity document, or applicable Letter of Recommendation is required."
      );
    } else {
      addCheck(
        checks,
        "vendorDocument",
        "Vendor Document",
        "passed",
        "Required vendor identification information is available."
      );
    }
  }

  // =========================================================
  // TRADITIONAL TRADE
  // =========================================================

  if (rules.requiresTraditionalTrade) {
    if (!user.traditionalTrade) {
      addMissing(
        missingInformation,
        "traditionalTrade"
      );

      addCheck(
        checks,
        "traditionalTrade",
        "Traditional Trade",
        "missing",
        "Traditional trade information is required."
      );
    } else if (
      !rules.traditionalTrades?.includes(
        user.traditionalTrade
      )
    ) {
      addCheck(
        checks,
        "traditionalTrade",
        "Traditional Trade",
        "failed",
        "Your selected trade is not included in the PM Vishwakarma trade list."
      );
    } else {
      addCheck(
        checks,
        "traditionalTrade",
        "Traditional Trade",
        "passed",
        "Your selected trade is included in the PM Vishwakarma trade list."
      );
    }
  }

  // =========================================================
  // GOVERNMENT EMPLOYEE
  // =========================================================

  if (rules.requiresGovernmentEmployeeCheck) {
    if (
      user.governmentEmployee === undefined ||
      user.governmentEmployee === ""
    ) {
      addMissing(
        missingInformation,
        "governmentEmployee"
      );

      addCheck(
        checks,
        "governmentEmployee",
        "Government Employment",
        "missing",
        "Government employment information is required."
      );
    } else if (
      user.governmentEmployee === "yes"
    ) {
      addCheck(
        checks,
        "governmentEmployee",
        "Government Employment",
        "failed",
        "Government employees are not eligible under this PM Vishwakarma rule."
      );
    } else {
      addCheck(
        checks,
        "governmentEmployee",
        "Government Employment",
        "passed",
        "You reported that you are not a government employee."
      );
    }
  }

  // =========================================================
  // RECENT SIMILAR LOAN
  // =========================================================

  if (rules.requiresRecentSimilarLoanCheck) {
    if (
      user.recentSimilarLoan === undefined ||
      user.recentSimilarLoan === ""
    ) {
      addMissing(
        missingInformation,
        "recentSimilarLoan"
      );

      addCheck(
        checks,
        "recentSimilarLoan",
        "Recent Similar Government Loan",
        "missing",
        "Recent similar loan information is required."
      );
    } else if (
      user.recentSimilarLoan === "yes"
    ) {
      addCheck(
        checks,
        "recentSimilarLoan",
        "Recent Similar Government Loan",
        "failed",
        "A similar government credit-based loan in the previous five years can affect PM Vishwakarma eligibility."
      );
    } else {
      addCheck(
        checks,
        "recentSimilarLoan",
        "Recent Similar Government Loan",
        "passed",
        "You reported no similar government loan in the previous five years."
      );
    }
  }

  // =========================================================
  // GENDER
  // =========================================================

  if (rules.gender?.length) {
    if (!user.gender) {
      addMissing(
        missingInformation,
        "gender"
      );

      addCheck(
        checks,
        "gender",
        "Gender",
        "missing",
        "Gender information is required."
      );
    } else if (
      !rules.gender.includes(user.gender)
    ) {
      addCheck(
        checks,
        "gender",
        "Gender",
        "failed",
        "Your gender does not match this scheme's current requirement."
      );
    } else {
      addCheck(
        checks,
        "gender",
        "Gender",
        "passed",
        "Your gender matches the scheme's current requirement."
      );
    }
  }

  // =========================================================
  // LPG CONNECTION
  // =========================================================

  if (rules.requiresNoLpgConnection) {
    if (
      user.hasLpgConnection === undefined ||
      user.hasLpgConnection === ""
    ) {
      addMissing(
        missingInformation,
        "hasLpgConnection"
      );

      addCheck(
        checks,
        "hasLpgConnection",
        "Existing LPG Connection",
        "missing",
        "Existing LPG connection information is required."
      );
    } else if (
      user.hasLpgConnection === "yes"
    ) {
      addCheck(
        checks,
        "hasLpgConnection",
        "Existing LPG Connection",
        "failed",
        "PMUY requires that there is no existing LPG connection in the household."
      );
    } else {
      addCheck(
        checks,
        "hasLpgConnection",
        "Existing LPG Connection",
        "passed",
        "You reported that your household does not already have an LPG connection."
      );
    }
  }

  // =========================================================
  // POOR HOUSEHOLD
  // =========================================================

  if (rules.requiresPoorHousehold) {
    if (
      user.poorHousehold === undefined ||
      user.poorHousehold === ""
    ) {
      addMissing(
        missingInformation,
        "poorHousehold"
      );

      addCheck(
        checks,
        "poorHousehold",
        "Poor Household Eligibility",
        "missing",
        "Poor-household/deprivation eligibility information is required."
      );
    } else if (
      user.poorHousehold === "no"
    ) {
      addCheck(
        checks,
        "poorHousehold",
        "Poor Household Eligibility",
        "failed",
        "PMUY requires the applicant to belong to a qualifying poor household."
      );
    } else {
      addCheck(
        checks,
        "poorHousehold",
        "Poor Household Eligibility",
        "passed",
        "You reported that your household meets the applicable poor-household/deprivation requirement."
      );
    }
  }

  // =========================================================
  // FINAL RESULT
  // =========================================================

  const hasFailedCheck = checks.some(
    (check) => check.status === "failed"
  );

  if (hasFailedCheck) {
    const failedMessages = checks
      .filter((check) => check.status === "failed")
      .map((check) => check.message);

    return {
      eligible: false,
      needsMoreInformation:
        missingInformation.length > 0,
      reasons: failedMessages,
      checks,
      missingInformation,
    };
  }

  if (missingInformation.length > 0) {
    return {
      eligible: false,
      needsMoreInformation: true,
      reasons: [],
      checks,
      missingInformation,
    };
  }

  reasons.push(
    "Your provided information matches the basic rules stored for this scheme."
  );

  return {
    eligible: true,
    needsMoreInformation: false,
    reasons,
    checks,
    missingInformation: [],
  };
}

// =========================================================
// FIND ELIGIBLE SCHEMES
// =========================================================

export function findEligibleSchemes(user, schemes) {
  return schemes
    .map((scheme) => ({
      scheme,
      result: checkEligibility(user, scheme),
    }))
    .filter((item) => item.result.eligible);
}

// =========================================================
// EVALUATE ALL SCHEMES
// =========================================================

export function evaluateAllSchemes(user, schemes) {
  return schemes.map((scheme) => ({
    scheme,
    result: checkEligibility(user, scheme),
  }));
}