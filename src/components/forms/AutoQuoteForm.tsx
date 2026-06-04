import { useMemo, useState } from "react";
import type { Translation } from "../../data/types";
import Field from "./Field";
import FormShell from "./FormShell";
import { useFormSubmit } from "./useFormSubmit";
import { useBreakpoints } from "../../hooks/useMediaQuery";
import { useT } from "../../hooks/useT";

type Props = { t: Translation };

const YEARS = Array.from({ length: 2027 - 1976 + 1 }, (_, i) => String(2027 - i));

const MAKES = [
  "CHEVROLET",
  "DODGE",
  "FORD",
  "GMC",
  "HONDA",
  "HYUNDAI",
  "JEEP",
  "KIA",
  "MAZDA",
  "MERCEDES-BENZ",
  "NISSAN",
  "RAM",
  "SUBARU",
  "TOYOTA",
  "VOLKSWAGEN",
];

const BODY_STYLES = [
  "4-Door Sedan",
  "2-Door Coupe",
  "SUV",
  "Pickup Truck",
  "Hatchback",
  "Convertible",
  "Minivan",
  "Wagon",
];

const CURRENT_CARRIERS = [
  "AAA Automobile Club",
  "Allstate",
  "Farmers",
  "GEICO",
  "Liberty Mutual",
  "Nationwide",
  "Progressive",
  "State Farm",
  "Travelers",
  "USAA",
  "Other",
  "None / First-time buyer",
];

const LIABILITY_LEVELS = [
  "None",
  "$10,000",
  "$25,000",
  "$50,000",
  "$100,000",
  "$250,000",
  "$500,000",
];

const DEDUCTIBLES = ["$0", "$100", "$250", "$500", "$1,000"];

type PlanKey = "state_minimum" | "basic" | "standard" | "preferred";

const PLAN_KEYS: PlanKey[] = ["state_minimum", "basic", "standard", "preferred"];

const LABELS = {
  es: {
    section_personal: "Información personal",
    section_vehicle: "Información del vehículo",
    section_current: "Cobertura actual",
    section_policy: "Póliza y descuentos",
    section_coverages: "Coberturas y deducibles",
    section_review: "Resumen",
    first_name: "Nombre",
    middle_initial: "Inicial del segundo nombre",
    last_name: "Apellido",
    email: "Email",
    phone: "Teléfono",
    contact_method: "Método de contacto preferido",
    best_time: "Mejor horario para contactarte",
    dob: "Fecha de nacimiento",
    year: "Año",
    make: "Marca",
    body_style: "Estilo de carrocería",
    vin: "VIN",
    current_carrier: "Compañía de seguros actual",
    current_liability: "Nivel actual de responsabilidad civil",
    current_expiration: "Vencimiento de póliza actual",
    current_premium: "Prima anual estimada actual",
    policy_start: "Inicio de nueva póliza",
    bundle: "Descuento por agrupar auto y hogar",
    paperless: "¿Quieres recibir todo digital (sin papel)?",
    comp_deductible: "Deducible de cobertura amplia (Comprehensive)",
    coll_deductible: "Deducible de colisión",
    coverage_plan: "Plan de cobertura",
    contact_options: ["Teléfono", "Email", "SMS"],
    best_time_options: [
      "Mañana (9:00–12:00)",
      "Mediodía (12:00–14:00)",
      "Tarde (14:00–18:00)",
      "Noche (18:00–20:00)",
    ],
    yes: "Sí",
    no: "No",
    optional: "opcional",
    consent:
      "Acepto que me contacten por teléfono, email o SMS sobre esta cotización.",
    plans: {
      state_minimum: {
        name: "State Minimum",
        items: [
          "Lesiones corporales: ninguna",
          "Daños a la propiedad: $10,000",
          "Pagos médicos: ninguno",
          "Motorista no asegurado: rechazado",
          "Incluye Personal Injury Protection",
        ],
      },
      basic: {
        name: "Basic",
        items: [
          "Lesiones corporales: $10,000/$20,000",
          "Daños a la propiedad: $10,000",
          "Pagos médicos: ninguno",
          "Motorista no asegurado: rechazado",
          "Incluye Personal Injury Protection",
        ],
      },
      standard: {
        name: "Standard",
        items: [
          "Lesiones corporales: $100,000/$300,000",
          "Daños a la propiedad: $50,000",
          "Pagos médicos: ninguno",
          "Motorista no asegurado: rechazado",
          "Incluye Personal Injury Protection",
          "$25 Towing & Labor",
          "$15 Gastos de transporte",
        ],
      },
      preferred: {
        name: "Preferred",
        items: [
          "Lesiones corporales: $100,000/$300,000",
          "Daños a la propiedad: $100,000",
          "Pagos médicos: ninguno",
          "Motorista no asegurado: $100,000/$300,000",
          "Incluye Personal Injury Protection",
          "$25 Towing & Labor",
          "$15 Gastos de transporte",
        ],
      },
    },
  },
  en: {
    section_personal: "Personal information",
    section_vehicle: "Vehicle information",
    section_current: "Current coverage",
    section_policy: "Policy and discounts",
    section_coverages: "Coverages and deductibles",
    section_review: "Summary",
    first_name: "First name",
    middle_initial: "Middle initial",
    last_name: "Last name",
    email: "Email",
    phone: "Phone",
    contact_method: "Preferred contact method",
    best_time: "Best time to contact",
    dob: "Date of birth",
    year: "Year",
    make: "Make",
    body_style: "Body style",
    vin: "VIN",
    current_carrier: "Current insurance company",
    current_liability: "Current auto liability coverage level",
    current_expiration: "Current policy expiration date",
    current_premium: "Current estimated annual premium",
    policy_start: "Policy start date",
    bundle: "Bundle auto and home discount",
    paperless: "Would you like to go paperless?",
    comp_deductible: "Comprehensive deductible",
    coll_deductible: "Collision deductible",
    coverage_plan: "Coverage plan",
    contact_options: ["Phone", "Email", "SMS"],
    best_time_options: [
      "Morning (9:00–12:00)",
      "Midday (12:00–14:00)",
      "Afternoon (14:00–18:00)",
      "Evening (18:00–20:00)",
    ],
    yes: "Yes",
    no: "No",
    optional: "optional",
    consent:
      "I agree to be contacted by phone, email or SMS about this quote.",
    plans: {
      state_minimum: {
        name: "State Minimum",
        items: [
          "None Bodily Injury",
          "$10,000 Property Damage",
          "None Medical Payments",
          "Rejected Uninsured Motorists",
          "Includes Personal Injury Protection",
        ],
      },
      basic: {
        name: "Basic",
        items: [
          "10,000 / 20,000 Bodily Injury",
          "$10,000 Property Damage",
          "None Medical Payments",
          "Rejected Uninsured Motorists",
          "Includes Personal Injury Protection",
        ],
      },
      standard: {
        name: "Standard",
        items: [
          "100,000 / 300,000 Bodily Injury",
          "$50,000 Property Damage",
          "None Medical Payments",
          "Rejected Uninsured Motorists",
          "Includes Personal Injury Protection",
          "$25 Towing & Labor",
          "$15 Transportation Expense",
        ],
      },
      preferred: {
        name: "Preferred",
        items: [
          "100,000 / 300,000 Bodily Injury",
          "$100,000 Property Damage",
          "None Medical Payments",
          "100,000 / 300,000 Uninsured Motorists",
          "Includes Personal Injury Protection",
          "$25 Towing & Labor",
          "$15 Transportation Expense",
        ],
      },
    },
  },
} as const;

export default function AutoQuoteForm({ t }: Props) {
  const { lang } = useT();
  const { isMobile } = useBreakpoints();
  const L = LABELS[lang];

  const [step, setStep] = useState(0);

  // Personal
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [dob, setDob] = useState("");

  // Vehicle
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [bodyStyle, setBodyStyle] = useState("");
  const [vin, setVin] = useState("");

  // Current coverage
  const [currentCarrier, setCurrentCarrier] = useState("");
  const [currentLiability, setCurrentLiability] = useState("");
  const [currentExpiration, setCurrentExpiration] = useState("");
  const [currentPremium, setCurrentPremium] = useState("");

  // Policy & discounts
  const [policyStart, setPolicyStart] = useState("");
  const [bundle, setBundle] = useState("");
  const [paperless, setPaperless] = useState("");

  // Coverages
  const [compDeductible, setCompDeductible] = useState("");
  const [collDeductible, setCollDeductible] = useState("");
  const [plan, setPlan] = useState<PlanKey | "">("");

  // Consent
  const [consent, setConsent] = useState(true);

  const { submit, sent, submitting } = useFormSubmit("auto-quote");

  const yesNo = useMemo(() => [L.yes, L.no], [L.yes, L.no]);

  const totalSteps = 6;

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return !!(
          firstName.trim() &&
          lastName.trim() &&
          email.trim() &&
          phone.trim() &&
          contactMethod &&
          dob
        );
      case 1:
        return !!(year && make && bodyStyle && vin.trim());
      case 2:
        return !!(currentCarrier && currentLiability && currentExpiration);
      case 3:
        return !!(policyStart && bundle && paperless);
      case 4:
        return !!(compDeductible && collDeductible && plan);
      case 5:
        return consent;
      default:
        return false;
    }
  }, [
    step,
    firstName,
    lastName,
    email,
    phone,
    contactMethod,
    dob,
    year,
    make,
    bodyStyle,
    vin,
    currentCarrier,
    currentLiability,
    currentExpiration,
    policyStart,
    bundle,
    paperless,
    compDeductible,
    collDeductible,
    plan,
    consent,
  ]);

  const stepLabel = `${t.forms.step} ${String(step + 1).padStart(2, "0")} ${t.forms.of} ${String(totalSteps).padStart(2, "0")}`;
  const submitLabel = step < totalSteps - 1 ? t.forms.next : t.quote.submit;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps - 1) {
      if (stepValid) setStep((s) => s + 1);
      return;
    }
    if (!stepValid) return;
    void submit({
      product: "auto",
      first_name: firstName,
      middle_initial: middleInitial,
      last_name: lastName,
      email,
      phone,
      preferred_contact_method: contactMethod,
      best_time_to_contact: bestTime,
      date_of_birth: dob,
      vehicle_year: year,
      vehicle_make: make,
      body_style: bodyStyle,
      vin,
      current_insurance_company: currentCarrier,
      current_liability_level: currentLiability,
      current_policy_expiration: currentExpiration,
      current_annual_premium: currentPremium,
      policy_start_date: policyStart,
      bundle_auto_home: bundle,
      paperless,
      comprehensive_deductible: compDeductible,
      collision_deductible: collDeductible,
      coverage_plan: plan,
      consent,
    });
  };

  const sectionTitle = [
    L.section_personal,
    L.section_vehicle,
    L.section_current,
    L.section_policy,
    L.section_coverages,
    L.section_review,
  ][step];

  return (
    <FormShell
      badge="FORM · 04 · AUTO"
      onSubmit={onSubmit}
      disabled={!stepValid}
      submitting={submitting}
      submittingLabel={t.forms.submitting}
      sent={sent}
      successTitle={t.forms.success_title}
      successBody={t.forms.success_body}
      submitLabel={submitLabel}
      footerNote={step === totalSteps - 1 ? t.quote.note : stepLabel}
      footerExtra={
        step > 0 ? (
          <button
            type="button"
            className="btn outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            style={{ padding: "10px 16px", fontSize: 12 }}
          >
            ← {t.forms.back}
          </button>
        ) : null
      }
    >
      <div className="grid" style={{ gap: 24 }}>
        <div className="mono" style={{ opacity: 0.6, marginBottom: -8 }}>
          {sectionTitle}
        </div>

        {step === 0 && (
          <>
            <div
              className="grid"
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 2fr",
                gap: 24,
              }}
            >
              <Field
                label={L.first_name}
                value={firstName}
                onChange={setFirstName}
                placeholder="ROBERTO ORLANDO"
                required
                requiredHint={t.forms.required}
              />
              <Field
                label={`${L.middle_initial} (${L.optional})`}
                value={middleInitial}
                onChange={(v) => setMiddleInitial(v.slice(0, 1).toUpperCase())}
                placeholder="O"
              />
              <Field
                label={L.last_name}
                value={lastName}
                onChange={setLastName}
                placeholder="GONZALEZ DE LA PENA"
                required
                requiredHint={t.forms.required}
              />
            </div>
            <div
              className="grid"
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 24,
              }}
            >
              <Field
                label={L.email}
                value={email}
                onChange={setEmail}
                type="email"
                placeholder="trolbertogp96@gmail.com"
                required
                requiredHint={t.forms.required}
              />
              <Field
                label={L.phone}
                value={phone}
                onChange={setPhone}
                type="tel"
                placeholder="(709) 252-5251"
                required
                requiredHint={t.forms.required}
              />
            </div>
            <div
              className="grid"
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 24,
              }}
            >
              <Field
                label={L.contact_method}
                value={contactMethod}
                onChange={setContactMethod}
                type="select"
                options={[...L.contact_options]}
                required
                requiredHint={t.forms.required}
              />
              <Field
                label={`${L.best_time} (${L.optional})`}
                value={bestTime}
                onChange={setBestTime}
                type="select"
                options={[...L.best_time_options]}
              />
            </div>
            <Field
              label={L.dob}
              value={dob}
              onChange={setDob}
              type="date"
              required
              requiredHint={t.forms.required}
            />
          </>
        )}

        {step === 1 && (
          <>
            <div
              className="grid"
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 24,
              }}
            >
              <Field
                label={L.year}
                value={year}
                onChange={setYear}
                type="select"
                options={YEARS}
                required
                requiredHint={t.forms.required}
              />
              <Field
                label={L.make}
                value={make}
                onChange={setMake}
                type="select"
                options={MAKES}
                required
                requiredHint={t.forms.required}
              />
            </div>
            <Field
              label={L.body_style}
              value={bodyStyle}
              onChange={setBodyStyle}
              type="select"
              options={BODY_STYLES}
              required
              requiredHint={t.forms.required}
            />
            <Field
              label={L.vin}
              value={vin}
              onChange={(v) => setVin(v.toUpperCase().slice(0, 17))}
              placeholder="1HGCY2F5XXXXXXXXX"
              required
              requiredHint={t.forms.required}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Field
              label={L.current_carrier}
              value={currentCarrier}
              onChange={setCurrentCarrier}
              type="select"
              options={CURRENT_CARRIERS}
              required
              requiredHint={t.forms.required}
            />
            <div
              className="grid"
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 24,
              }}
            >
              <Field
                label={L.current_liability}
                value={currentLiability}
                onChange={setCurrentLiability}
                type="select"
                options={LIABILITY_LEVELS}
                required
                requiredHint={t.forms.required}
              />
              <Field
                label={L.current_expiration}
                value={currentExpiration}
                onChange={setCurrentExpiration}
                type="date"
                required
                requiredHint={t.forms.required}
              />
            </div>
            <Field
              label={`${L.current_premium} ($) (${L.optional})`}
              value={currentPremium}
              onChange={setCurrentPremium}
              type="number"
              placeholder="12000"
            />
          </>
        )}

        {step === 3 && (
          <>
            <Field
              label={L.policy_start}
              value={policyStart}
              onChange={setPolicyStart}
              type="date"
              required
              requiredHint={t.forms.required}
            />
            <div
              className="grid"
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 24,
              }}
            >
              <Field
                label={L.bundle}
                value={bundle}
                onChange={setBundle}
                type="select"
                options={yesNo}
                required
                requiredHint={t.forms.required}
              />
              <Field
                label={L.paperless}
                value={paperless}
                onChange={setPaperless}
                type="select"
                options={yesNo}
                required
                requiredHint={t.forms.required}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div
              className="grid"
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 24,
              }}
            >
              <Field
                label={L.comp_deductible}
                value={compDeductible}
                onChange={setCompDeductible}
                type="select"
                options={DEDUCTIBLES}
                required
                requiredHint={t.forms.required}
              />
              <Field
                label={L.coll_deductible}
                value={collDeductible}
                onChange={setCollDeductible}
                type="select"
                options={DEDUCTIBLES}
                required
                requiredHint={t.forms.required}
              />
            </div>
            <div>
              <span
                className="mono block"
                style={{ marginBottom: 12, opacity: 0.6 }}
              >
                {L.coverage_plan}
              </span>
              <div className="grid" style={{ gap: 12 }}>
                {PLAN_KEYS.map((key) => {
                  const p = L.plans[key];
                  const active = plan === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPlan(key)}
                      className="text-left"
                      style={{
                        padding: "16px 18px",
                        border: active
                          ? "1px solid var(--color-ink)"
                          : "1px solid var(--color-rule)",
                        background: active
                          ? "var(--color-ink)"
                          : "transparent",
                        color: active
                          ? "var(--color-paper)"
                          : "var(--color-ink)",
                        borderRadius: 4,
                        cursor: "pointer",
                        transition: "all .2s",
                      }}
                    >
                      <div
                        className="flex justify-between items-center"
                        style={{ gap: 12, marginBottom: 8 }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 18,
                            fontWeight: 500,
                          }}
                        >
                          {p.name}
                        </span>
                        <span
                          className="mono"
                          style={{ fontSize: 10, opacity: 0.7 }}
                        >
                          {active ? "✓" : ""}
                        </span>
                      </div>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "grid",
                          gap: 4,
                          fontSize: 13,
                          opacity: active ? 0.9 : 0.75,
                        }}
                      >
                        {p.items.map((it) => (
                          <li key={it}>· {it}</li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <dl
              className="grid"
              style={{
                gap: 12,
                margin: 0,
                paddingBottom: 16,
                borderBottom: "1px solid var(--color-rule)",
              }}
            >
              {(
                [
                  [
                    L.first_name + " / " + L.last_name,
                    `${firstName}${middleInitial ? ` ${middleInitial}.` : ""} ${lastName}`,
                  ],
                  [L.email, email],
                  [L.phone, phone],
                  [L.contact_method, contactMethod],
                  [L.best_time, bestTime || "—"],
                  [L.dob, dob],
                  [L.year + " / " + L.make, `${year} ${make}`],
                  [L.body_style, bodyStyle],
                  [L.vin, vin],
                  [L.current_carrier, currentCarrier],
                  [L.current_liability, currentLiability],
                  [L.current_expiration, currentExpiration],
                  [L.current_premium, currentPremium ? `$${currentPremium}` : "—"],
                  [L.policy_start, policyStart],
                  [L.bundle, bundle],
                  [L.paperless, paperless],
                  [L.comp_deductible, compDeductible],
                  [L.coll_deductible, collDeductible],
                  [L.coverage_plan, plan ? L.plans[plan].name : "—"],
                ] as [string, string][]
              ).map(([k, v], i) => (
                <div
                  key={i}
                  className="flex justify-between"
                  style={{ gap: 12, fontSize: 14, flexWrap: "wrap" }}
                >
                  <dt className="mono" style={{ opacity: 0.55, margin: 0 }}>
                    {k}
                  </dt>
                  <dd
                    className="text-right"
                    style={{
                      margin: 0,
                      color: "var(--color-ink)",
                      fontFamily: "var(--font-display)",
                      fontSize: 16,
                    }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <label
              className="flex items-start cursor-pointer"
              style={{
                gap: 12,
                fontSize: 13,
                color: "var(--color-ink-soft)",
                lineHeight: 1.5,
              }}
            >
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                style={{ marginTop: 3, accentColor: "var(--color-ink)" }}
              />
              <span>{L.consent}</span>
            </label>
          </>
        )}
      </div>
    </FormShell>
  );
}
