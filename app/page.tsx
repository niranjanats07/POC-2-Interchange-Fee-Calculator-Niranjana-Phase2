
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RailId = "merchant" | "processor" | "network" | "issuer";

type ApiResult = {
  data_mode: string;
  transaction_amount: number;
  interchange_rate: number;
  processor_fee: number;
  network_fee_rate: number;
  interchange_fee: number;
  processor_cost: number;
  network_cost: number;
  total_fee: number;
  net_amount: number;
  effective_fee_rate: number;
};

const participants: {
  id: RailId;
  name: string;
  role: string;
  description: string;
  control: string;
}[] = [
  {
    id: "merchant",
    name: "Merchant",
    role: "Payment origin",
    description:
      "Accepts the card payment and receives the transaction proceeds after applicable payment costs.",
    control:
      "The merchant controls the customer-facing transaction amount and payment acceptance decision.",
  },
  {
    id: "processor",
    name: "Processor",
    role: "Transaction processing",
    description:
      "Provides payment-processing services that help route and process the transaction.",
    control:
      "The processor influences processing costs, routing services and operational payment infrastructure.",
  },
  {
    id: "network",
    name: "Card Network",
    role: "Network infrastructure",
    description:
      "Provides the network infrastructure and rules used to communicate and process card transactions.",
    control:
      "The network establishes operating rules and provides the infrastructure connecting participants.",
  },
  {
    id: "issuer",
    name: "Issuer",
    role: "Card issuing side",
    description:
      "The financial institution that issues the payment card to the cardholder.",
    control:
      "The issuer manages the cardholder relationship and participates in authorization and settlement flows.",
  },
];

const cardAdjustments: Record<string, number> = {
  "Credit Card": 0,
  "Debit Card": -0.4,
  "Premium Card": 0.8,
};

const mccAdjustments: Record<string, number> = {
  Retail: 0,
  Restaurant: 0.2,
  Travel: 0.4,
  "Digital Services": 0.3,
};

const channelAdjustments: Record<string, number> = {
  Online: 0.2,
  "In-store": 0,
  Mobile: 0.1,
};

const geographyAdjustments: Record<string, number> = {
  India: 0,
  "United States": 0.3,
  "European Union": -0.2,
  "United Kingdom": -0.1,
};

const money = (value: number) =>
  `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function Home() {
  const [selectedRail, setSelectedRail] =
    useState<RailId>("issuer");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [transactionAmount, setTransactionAmount] =
    useState(1000);
  const [interchangeRate, setInterchangeRate] =
    useState(1.8);
  const [processorFee, setProcessorFee] =
    useState(0.3);
  const [cardType, setCardType] =
    useState("Credit Card");
  const [mcc, setMcc] = useState("Retail");
  const [channel, setChannel] = useState("Online");
  const [geography, setGeography] = useState("India");

  const [apiResult, setApiResult] =
    useState<ApiResult | null>(null);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(true);

  const adjustedInterchangeRate = useMemo(
    () =>
      interchangeRate +
      cardAdjustments[cardType] +
      mccAdjustments[mcc] +
      channelAdjustments[channel] +
      geographyAdjustments[geography],
    [interchangeRate, cardType, mcc, channel, geography]
  );

  useEffect(() => {
    let cancelled = false;

    const calculateWithBackend = async () => {
      setLoading(true);
      setApiError(false);

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/calculate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              transaction_amount: transactionAmount,
              card_type: cardType,
              mcc,
              channel,
              geography,

              // Send the BASE rate only.
              // FastAPI applies the scenario adjustments.
              interchange_rate: interchangeRate,

              processor_fee: processorFee,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Backend calculation failed");
        }

        const data: ApiResult = await response.json();

        if (!cancelled) {
          setApiResult(data);
          setApiError(false);
        }
      } catch (error) {
        console.error("Backend calculation error:", error);
        if (!cancelled) {
          setApiError(true);
          setApiResult(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    calculateWithBackend();

    return () => {
      cancelled = true;
    };
  }, [
    transactionAmount,
    cardType,
    mcc,
    channel,
    geography,
    interchangeRate,
    processorFee,
  ]);

  const interchangeFee = apiResult?.interchange_fee ?? 0;
  const processorCost = apiResult?.processor_cost ?? 0;
  const networkCost = apiResult?.network_cost ?? 0;
  const totalFee = apiResult?.total_fee ?? 0;

  const netAmount =
    apiResult?.net_amount ?? transactionAmount;

  const effectiveFee = apiResult?.effective_fee_rate ?? 0;

  const backendInterchangeRate =
    apiResult?.interchange_rate ?? adjustedInterchangeRate;

  const networkRate = apiResult?.network_fee_rate ?? 0.1;

  const selectedParticipant =
    participants.find((item) => item.id === selectedRail) ??
    participants[0];

  const costDistributionData = [
    { name: "Interchange", amount: interchangeFee },
    { name: "Processor", amount: processorCost },
    { name: "Network", amount: networkCost },
  ];

  const selectParticipant = (id: RailId) => {
    setSelectedRail(id);
    setDrawerOpen(true);
  };

  const exportAssumptions = () => {
    const assumptions = {
      project: "Infocreon Internship",
      poc: "#2 - Interchange Fee Calculator",
      dataMode: apiResult?.data_mode ?? "Synthetic",
      transactionAmount,
      cardType,
      mcc,
      channel,
      geography,
      interchangeRate,
      adjustedInterchangeRate: backendInterchangeRate,
      processorFee,
      networkFeeRate: networkRate,
      interchangeFee,
      processorCost,
      networkCost,
      totalFee,
      netAmount,
      effectiveFeeRate: effectiveFee,
    };

    const blob = new Blob(
      [JSON.stringify(assumptions, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "interchange-fee-assumptions.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-mark">IF</div>
            <div>
              <p className="eyebrow">INFOCREON INTERNSHIP</p>
              <h1>Interchange Fee Intelligence</h1>
              <p className="brand-subtitle">
                Payment rail analytics and scenario intelligence
              </p>
            </div>
          </div>

          <div className="header-actions">
            <div className="status-pill">
              <span className="status-dot" />
              DEMO / SYNTHETIC DATA
            </div>
            <button
              className="icon-button"
              type="button"
              aria-label="Project information"
              onClick={() => setInfoOpen(true)}
            >
              i
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">
              PAYMENT INTELLIGENCE / OVERVIEW
            </p>
            <h2>Understand every layer of a transaction.</h2>
            <p className="muted">
              Explore how payment costs move across the payment rail.
              Adjust the scenario to inspect estimated fee changes.
            </p>
          </div>
          <div className="live-card">
            <span className="live-indicator" />
            <span>
              {loading ? "CALCULATING" : "SCENARIO READY"}
            </span>
          </div>
        </section>

        {apiError && (
          <div className="notice notice-warning">
            <strong>Backend unavailable.</strong> Start your FastAPI
            server to display calculated fees. Your scenario inputs
            remain available.
          </div>
        )}

        <section className="dashboard-grid">
          <div className="main-column">
            <section className="panel hero-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">01 / PAYMENT RAIL</p>
                  <h2>Transaction flow</h2>
                  <p className="muted">
                    Follow the participants in a card transaction.
                    Select a participant to open its intelligence panel.
                  </p>
                </div>
                <div className="amount-highlight">
                  <span>TRANSACTION AMOUNT</span>
                  <strong>{money(transactionAmount)}</strong>
                </div>
              </div>

              <div className="flow-label-row">
                <span>PAYMENT PARTICIPANTS</span>
                <span>SELECT A NODE ↗</span>
              </div>

              <div className="rail-flow">
                <div className="rail-line" />
                {participants.map((participant, index) => {
                  const active = selectedRail === participant.id;

                  return (
                    <button
                      type="button"
                      key={participant.id}
                      className={`rail-node ${
                        active ? "rail-node-active" : ""
                      }`}
                      onClick={() =>
                        selectParticipant(participant.id)
                      }
                    >
                      <span className="rail-node-number">
                        0{index + 1}
                      </span>
                      <span className="rail-node-name">
                        {participant.name}
                      </span>
                      <span className="rail-node-role">
                        {participant.role}
                      </span>
                      <span className="rail-node-action">
                        {active ? "SELECTED" : "INSPECT ↗"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="metric-grid">
                <VisualizationMetric
                  label="Interchange"
                  value={money(interchangeFee)}
                  percentage={
                    totalFee > 0
                      ? (interchangeFee / totalFee) * 100
                      : 0
                  }
                />
                <VisualizationMetric
                  label="Processor"
                  value={money(processorCost)}
                  percentage={
                    totalFee > 0
                      ? (processorCost / totalFee) * 100
                      : 0
                  }
                />
                <VisualizationMetric
                  label="Network"
                  value={money(networkCost)}
                  percentage={
                    totalFee > 0
                      ? (networkCost / totalFee) * 100
                      : 0
                  }
                />
              </div>

              <div className="total-strip">
                <div>
                  <span className="eyebrow">
                    TOTAL ESTIMATED PAYMENT COST
                  </span>
                  <p>Combined fee across the selected scenario</p>
                </div>
                <strong>{money(totalFee)}</strong>
              </div>
            </section>

            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">02 / ANALYTICS</p>
                  <h2>Payment cost distribution</h2>
                  <p className="muted">
                    Compare the estimated contribution of each fee component.
                  </p>
                </div>
                <span className="chart-tag">SCENARIO OUTPUT</span>
              </div>

              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={costDistributionData}
                    margin={{
                      top: 15,
                      right: 12,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      stroke="#27243A"
                      strokeDasharray="3 5"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#A5A0B8", fontSize: 12 }}
                      axisLine={{ stroke: "#343047" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#A5A0B8", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                      cursor={{
                        fill: "rgba(167,139,250,0.06)",
                      }}
                      contentStyle={{
                        background: "#151326",
                        border: "1px solid #39324F",
                        borderRadius: "12px",
                        color: "#F5F3FF",
                      }}
                      formatter={(value) => [
                        money(Number(value)),
                        "Estimated cost",
                      ]}
                    />
                    <Bar
                      dataKey="amount"
                      fill="#A78BFA"
                      radius={[7, 7, 0, 0]}
                      maxBarSize={72}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="result-grid">
              <ResultCard
                label="Transaction amount"
                value={money(transactionAmount)}
              />
              <ResultCard
                label="Total fee"
                value={money(totalFee)}
                highlight
              />
              <ResultCard
                label="Net amount"
                value={money(netAmount)}
              />
              <ResultCard
                label="Effective rate"
                value={`${effectiveFee.toFixed(2)}%`}
              />
            </section>

            <section className="panel">
              <p className="eyebrow">03 / COST LOGIC</p>
              <h2>How the estimate is formed</h2>
              <p className="muted">
                The active scenario is sent to the calculation backend.
                The returned values are shown below when the service is
                available.
              </p>

              <div className="logic-grid">
                <LogicCard
                  number="01"
                  title="Interchange"
                  formula="Transaction × adjusted interchange rate"
                  detail={`${money(transactionAmount)} × ${backendInterchangeRate.toFixed(2)}% = ${money(interchangeFee)}`}
                />
                <LogicCard
                  number="02"
                  title="Processor"
                  formula="Transaction × processor fee"
                  detail={`${money(transactionAmount)} × ${processorFee.toFixed(2)}% = ${money(processorCost)}`}
                />
                <LogicCard
                  number="03"
                  title="Network"
                  formula="Transaction × network rate"
                  detail={`${money(transactionAmount)} × ${networkRate.toFixed(2)}% = ${money(networkCost)}`}
                />
              </div>
            </section>

            <section className="notice">
              <div className="notice-icon">i</div>
              <div>
                <strong>Synthetic calculation model</strong>
                <p>
                  Fee values in this demonstration are synthetic
                  assumptions. They illustrate payment-cost mechanics
                  and should not be treated as live network pricing or
                  contractual merchant rates.
                </p>
              </div>
            </section>
          </div>

          <aside className="side-column">
            <section className="panel controls-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">04 / CONTROLS</p>
                  <h2>Scenario builder</h2>
                </div>
                <span className="control-symbol">⌘</span>
              </div>

              <div className="control-group">
                <NumberField
                  label="Transaction amount"
                  value={transactionAmount}
                  prefix="₹"
                  onChange={setTransactionAmount}
                />
                <SelectField
                  label="Card type"
                  value={cardType}
                  onChange={setCardType}
                  options={[
                    "Credit Card",
                    "Debit Card",
                    "Premium Card",
                  ]}
                />
                <SelectField
                  label="Merchant category"
                  value={mcc}
                  onChange={setMcc}
                  options={[
                    "Retail",
                    "Restaurant",
                    "Travel",
                    "Digital Services",
                  ]}
                />
                <SelectField
                  label="Payment channel"
                  value={channel}
                  onChange={setChannel}
                  options={["Online", "In-store", "Mobile"]}
                />
                <SelectField
                  label="Geography"
                  value={geography}
                  onChange={setGeography}
                  options={[
                    "India",
                    "United States",
                    "European Union",
                    "United Kingdom",
                  ]}
                />
                <NumberField
                  label="Base interchange rate"
                  value={interchangeRate}
                  suffix="%"
                  step={0.1}
                  onChange={setInterchangeRate}
                />
                <NumberField
                  label="Processor fee"
                  value={processorFee}
                  suffix="%"
                  step={0.1}
                  onChange={setProcessorFee}
                />
              </div>

              <div className="scenario-summary">
                <span className="eyebrow">ACTIVE SCENARIO</span>
                <p>{cardType}</p>
                <span>
                  {mcc} · {channel} · {geography}
                </span>
                <div className="scenario-rate">
                  <span>Adjusted interchange</span>
                  <strong>
                    {backendInterchangeRate.toFixed(2)}%
                  </strong>
                </div>
              </div>
            </section>

            <section className="panel data-panel">
              <p className="eyebrow">05 / DATA</p>
              <h2>Scenario exports</h2>
              <p className="muted">
                Save the current assumptions or inspect the supplied
                sample dataset.
              </p>
              <button
                className="primary-button"
                type="button"
                onClick={exportAssumptions}
              >
                Export assumptions <span>↗</span>
              </button>
              <a
                className="secondary-button"
                href="/sample-payment-data.csv"
                download
              >
                Download sample data <span>↓</span>
              </a>
            </section>

            <section className="panel participant-panel">
              <p className="eyebrow">06 / PARTICIPANTS</p>
              <h2>Explore the rail</h2>
              <p className="muted">
                Select a participant to view its institutional context.
              </p>
              {participants.map((participant) => (
                <button
                  className="participant-link"
                  type="button"
                  key={participant.id}
                  onClick={() => selectParticipant(participant.id)}
                >
                  <span>{participant.name}</span>
                  <span>↗</span>
                </button>
              ))}
            </section>
          </aside>
        </section>

        <footer className="footer">
          <span>
            INFOCREON INTERNSHIP · INTERCHANGE FEE CALCULATOR
          </span>
          <span>POC #2 · BATCH 8 · SYNTHETIC DATA DEMONSTRATION</span>
          <span className="developer-signature">
            DEVELOPED BY · NIRANJANA T SURESH
          </span>
        </footer>
      </div>

      {drawerOpen && (
        <div
          className="overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDrawerOpen(false);
            }
          }}
        >
          <aside
            className="intelligence-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Participant intelligence"
          >
            <div className="drawer-heading">
              <div>
                <p className="eyebrow">PAYMENT RAIL INTELLIGENCE</p>
                <h2>{selectedParticipant.name}</h2>
                <p className="muted">
                  {selectedParticipant.role}
                </p>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Close intelligence panel"
                onClick={() => setDrawerOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="drawer-highlight">
              <span className="eyebrow">SELECTED METRIC</span>
              <strong>
                {selectedRail === "issuer"
                  ? money(interchangeFee)
                  : selectedRail === "processor"
                  ? money(processorCost)
                  : selectedRail === "network"
                  ? money(networkCost)
                  : money(netAmount)}
              </strong>
              <p>
                {selectedRail === "issuer"
                  ? "Synthetic interchange allocation to issuing side"
                  : selectedRail === "processor"
                  ? "Synthetic processing cost"
                  : selectedRail === "network"
                  ? "Synthetic network cost"
                  : "Merchant net after estimated costs"}
              </p>
            </div>

            <div className="drawer-section">
              <p className="eyebrow">PARTICIPANT OVERVIEW</p>
              <p>{selectedParticipant.description}</p>
            </div>

            <div className="drawer-section">
              <p className="eyebrow">INSTITUTIONAL ROLE</p>
              <p>{selectedParticipant.control}</p>
            </div>

            <div className="drawer-section">
              <p className="eyebrow">ACTIVE SCENARIO</p>
              <p>
                {cardType} · {mcc} · {channel} · {geography}
              </p>
            </div>

            <button
              className="primary-button drawer-close"
              type="button"
              onClick={() => setDrawerOpen(false)}
            >
              Close intelligence panel
            </button>
          </aside>
        </div>
      )}

      {infoOpen && (
        <div
          className="overlay modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setInfoOpen(false);
            }
          }}
        >
          <section
            className="info-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Project information"
          >
            <div className="drawer-heading">
              <div>
                <p className="eyebrow">PROJECT INFORMATION</p>
                <h2>Interchange Fee Calculator</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Close project information"
                onClick={() => setInfoOpen(false)}
              >
                ×
              </button>
            </div>

            <p className="muted">
              An interactive demonstration of payment-rail fee
              components and scenario-based cost estimates.
            </p>

            <div className="info-list">
              <InfoRow
                label="Organization"
                value="Infocreon Internship"
              />
              <InfoRow
                label="Project"
                value="Interchange Fee Calculator"
              />
              <InfoRow label="Proof of concept" value="#2" />
              <InfoRow label="Batch" value="Batch 8" />
              <InfoRow
                label="Developer"
                value="Niranjana T Suresh"
              />
              <InfoRow
                label="Frontend"
                value="Next.js · React · TypeScript"
              />
              <InfoRow
                label="Visualization"
                value="Recharts · Tailwind CSS"
              />
              <InfoRow
                label="Backend"
                value="FastAPI · Python"
              />
              <InfoRow
                label="Data"
                value="Synthetic demonstration data"
              />
            </div>

            <p className="info-disclaimer">
              This project is an educational demonstration. Its
              synthetic fee assumptions are not live payment-network
              pricing.
            </p>
            <p className="developer-signature">
              DEVELOPED BY · NIRANJANA T SURESH
            </p>
          </section>
        </div>
      )}
    </main>
  );
}

function VisualizationMetric({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  const safePercentage = Math.min(
    100,
    Math.max(0, percentage)
  );

  return (
    <div className="metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${safePercentage}%` }}
        />
      </div>
      <small>{percentage.toFixed(1)}% of total fee</small>
    </div>
  );
}

function ResultCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`result-card ${
        highlight ? "result-highlight" : ""
      }`}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function LogicCard({
  number,
  title,
  formula,
  detail,
}: {
  number: string;
  title: string;
  formula: string;
  detail: string;
}) {
  return (
    <div className="logic-card">
      <span className="logic-number">{number}</span>
      <h3>{title}</h3>
      <p>{formula}</p>
      <small>{detail}</small>
    </div>
  );
}

function NumberField({
  label,
  value,
  prefix,
  suffix,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-shell">
        {prefix && (
          <span className="input-affix">{prefix}</span>
        )}
        <input
          type="number"
          min="0"
          step={step}
          value={value}
          onChange={(event) =>
            onChange(
              Math.max(0, Number(event.target.value))
            )
          }
        />
        {suffix && (
          <span className="input-affix">{suffix}</span>
        )}
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
