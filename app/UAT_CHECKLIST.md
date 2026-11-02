# UAT Checklist

## Project Information

- Project: Real Rails Batch 8
- PoC: #2 — Interchange Fee Calculator
- Application: Interchange Fee Calculator
- Data Mode: Demo / Synthetic Data
- Developer / Architect: Niranjana T Suresh

---

## UAT Objective

Verify that the Interchange Fee Calculator:

- accepts the required payment scenario inputs
- calculates fees correctly
- updates results when filters change
- handles edge cases without errors
- provides the required explanation and insight panels
- supports assumptions export
- provides downloadable sample data
- remains usable after browser refresh
- works across different screen widths
- clearly identifies synthetic/demo assumptions

---

## Test Cases

| Test Case | Expected Result | Status |
|---|---|---|
| Default calculator scenario | Credit Card / Retail / Online / India with ₹1,000 produces Interchange ₹20.00, Processor ₹3.00, Network ₹1.00, Total ₹24.00, Net ₹976.00 and Effective Fee 2.40% | PASS |
| Card Type filter | Changing Credit Card to Debit Card updates the calculation correctly | PASS |
| MCC filter | Changing the Merchant Category updates the interchange calculation | PASS |
| Payment Channel filter | Changing Online to Mobile updates the calculation correctly | PASS |
| Geography filter | Changing geography updates the applicable synthetic adjustment | PASS |
| Transaction amount | Changing transaction amount updates all calculated fees and net amount | PASS |
| Zero transaction amount | ₹0 produces ₹0.00 for fees and net amount without NaN or Infinity | PASS |
| ₹1 transaction amount | Small transaction amount calculates correctly without NaN or Infinity | PASS |
| Combined scenario workflow | Changing multiple scenario selectors updates the results, breakdown, waterfall and scenario information consistently | PASS |
| Blended fee estimate | Blended fee estimate updates with the active scenario | PASS |
| Fee breakdown | Interchange, Network and Processor components are displayed separately | PASS |
| Payment Rail Waterfall | Processor, Network and Issuer/rail participants are displayed with the synthetic-data disclaimer | PASS |
| Who Controls the Rail panel | Rail participants and their roles are clearly explained | PASS |
| Why this matters panel | Provides context about why payment fee differences matter | PASS |
| Card Type tooltip | Tooltip appears when hovering the Card Type information icon | PASS |
| MCC tooltip | Tooltip appears when hovering the MCC information icon | PASS |
| Payment Channel tooltip | Tooltip appears when hovering the Payment Channel information icon | PASS |
| Geography tooltip | Tooltip appears when hovering the Geography information icon | PASS |
| Export Assumptions | Clicking Export Assumptions downloads a JSON file containing the active scenario assumptions | PASS |
| Sample data download | Clicking Download Sample Data downloads the provided synthetic CSV dataset | PASS |
| Browser refresh | Refreshing the page loads the calculator correctly with the default scenario | PASS |
| Responsive layout | Calculator remains usable when the browser window is narrowed | PASS |
| Loading state | No asynchronous loading state is required because calculations are performed locally | N/A |
| Navigation | Single-page calculator does not require separate navigation | N/A |
| Backend/API handshake | No separate backend/API service is used; calculations are performed locally in the frontend | N/A |
| Empty/live external data | No live external dataset is required; the calculator uses clearly labelled synthetic assumptions | N/A |

---

## Detailed Validation

### 1. Default Scenario

Input:

- Transaction Amount: ₹1,000
- Card Type: Credit Card
- MCC: Retail
- Channel: Online
- Geography: India

Expected result:

- Interchange Fee: ₹20.00
- Processor Cost: ₹3.00
- Network Cost: ₹1.00
- Total Fee: ₹24.00
- Net Amount: ₹976.00
- Effective Fee: 2.40%

Status: PASS

---

### 2. Card Type Test

Change:

- Credit Card → Debit Card

Expected result:

- Interchange Fee: ₹16.00
- Processor Cost: ₹3.00
- Network Cost: ₹1.00
- Total Fee: ₹20.00
- Net Amount: ₹980.00
- Effective Fee: 2.00%

Status: PASS

---

### 3. MCC Test

Scenario:

- Card Type: Debit Card
- MCC: Travel
- Channel: Online
- Geography: India
- Transaction Amount: ₹1,000

Expected result:

- Interchange Fee: ₹20.00
- Processor Cost: ₹3.00
- Network Cost: ₹1.00
- Total Fee: ₹24.00
- Net Amount: ₹976.00
- Effective Fee: 2.40%

Status: PASS

---

### 4. Payment Channel Test

Scenario:

- Card Type: Debit Card
- MCC: Travel
- Channel: Mobile
- Geography: India
- Transaction Amount: ₹1,000

Expected result:

- Interchange Fee: ₹19.00
- Processor Cost: ₹3.00
- Network Cost: ₹1.00
- Total Fee: ₹23.00
- Net Amount: ₹977.00
- Effective Fee: 2.30%

Status: PASS

---

### 5. Geography Test

Geography options were tested across the available selections.

Expected result:

- Selecting a different geography changes the synthetic interchange adjustment.
- Results update without calculation errors.

Status: PASS

---

### 6. Edge Case — Zero Amount

Input:

- Transaction Amount: ₹0

Expected result:

- Interchange Fee: ₹0.00
- Processor Cost: ₹0.00
- Network Cost: ₹0.00
- Total Fee: ₹0.00
- Net Amount: ₹0.00
- Blended Fee: ₹0.00
- Effective Fee: 0.00%
- No NaN or Infinity displayed.

Status: PASS

---

### 7. Edge Case — ₹1 Amount

Input:

- Transaction Amount: ₹1

Expected result:

- Interchange Fee: ₹0.02
- Processor Cost: ₹0.00
- Network Cost: ₹0.00
- Total Fee: ₹0.02
- Net Amount: ₹0.98
- Effective Fee: 2.40%
- No NaN or Infinity displayed.

Status: PASS

---

### 8. Combined Scenario Workflow

Tested scenario:

- Transaction Amount: ₹1,000
- Card Type: Debit Card
- MCC: Restaurant
- Channel: Mobile
- Geography: India

Expected result:

- Interchange Fee: ₹17.00
- Processor Cost: ₹3.00
- Network Cost: ₹1.00
- Total Fee: ₹21.00
- Net Amount: ₹979.00
- Blended Fee: ₹21.00
- Effective Fee: 2.10%

The fee breakdown, payment rail waterfall and scenario information update consistently.

Status: PASS

---

## Tooltip Testing

The following tooltips were manually tested:

1. Card Type — PASS
2. MCC — PASS
3. Payment Channel — PASS
4. Geography — PASS

---

## Export Testing

### Export Assumptions

The Export Assumptions button was tested.

Expected result:

- A JSON file is downloaded.
- The exported assumptions correspond to the active calculator scenario.

Status: PASS

### Download Sample Data

The Download Sample Data button was tested.

Expected result:

- The synthetic CSV sample dataset downloads successfully.

Status: PASS

---

## Browser Refresh Test

The application was refreshed in the browser.

Expected result:

- Application loads successfully.
- Calculator is displayed.
- Default scenario is available.
- No runtime error is shown.

Status: PASS

---

## Responsive Testing

The browser window was narrowed to test the responsive layout.

Expected result:

- Calculator remains visible and usable.
- Inputs remain accessible.
- Results remain readable.
- No major layout break was observed.

Status: PASS

---

## Loading State

The application performs calculations locally and does not depend on an asynchronous external API.

Result:

- Loading state: N/A

---

## Navigation

The application is implemented as a single-page calculator.

Result:

- Separate navigation testing: N/A

---

## Frontend / Backend Handshake

The current PoC does not use a separate backend or API service.

Calculations are performed locally in the Next.js frontend.

Result:

- Frontend-backend handshake: N/A

---

## Data Availability

The calculator does not depend on live external data.

Synthetic assumptions are used for:

- Card Type
- Merchant Category
- Payment Channel
- Geography

The application identifies the data as synthetic/demo data.

Result:

- Live external data availability test: N/A

---

## UAT Summary

| Category | Result |
|---|---|
| Core calculator | PASS |
| Scenario selectors | PASS |
| Fee calculations | PASS |
| Blended fee estimate | PASS |
| Fee breakdown | PASS |
| Payment Rail Waterfall | PASS |
| Who Controls the Rail | PASS |
| Why this matters | PASS |
| Tooltips | PASS |
| Edge cases | PASS |
| Export Assumptions | PASS |
| Download Sample Data | PASS |
| Browser refresh | PASS |
| Responsive layout | PASS |
| Loading state | N/A |
| Navigation | N/A |
| Backend/API handshake | N/A |
| Live external data | N/A |

---

## Final UAT Status

**PASS**

The Interchange Fee Calculator was manually tested across the main calculator workflow, scenario selectors, fee calculations, edge cases, tooltips, export functionality, sample-data download, browser refresh and responsive layout.

The application uses clearly labelled synthetic assumptions for demonstration purposes and does not claim that the synthetic fee adjustments represent live payment-network pricing or settlement economics.