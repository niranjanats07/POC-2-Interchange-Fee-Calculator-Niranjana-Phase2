# Visualization Audit Report (VAR)

## Project Information

- Project: Real Rails Batch 8
- PoC: #2 — Interchange Fee Calculator
- Application Type: Payment cost estimation dashboard
- Data Mode: Demo / Synthetic Data
- Developer / Architect: Niranjana T Suresh

---

## VAR Audit

| Audit Area | Status | Finding |
|---|---|---|
| Requirement Match | PASS | Calculator inputs, scenario analysis, blended fee estimate, fee breakdown, waterfall, filters, tooltips, export assumptions and sample-data download are implemented. |
| Product Storytelling | PASS | The interface flows from payment scenario to calculated fees, breakdown, rail participants and context. |
| Synthetic Data Disclosure | PASS | The application clearly identifies the assumptions as synthetic demonstration data. |
| Interaction Quality | PASS | Card type, MCC, channel, geography and calculation inputs update the results. |
| Tooltip Coverage | PASS | Tooltips are available for the main scenario selectors. |
| Visual Identity | PASS | The dashboard uses the required dark visual system and the main dashboard background is set to the strict #030712 reference. |
| Data Mapping | PASS | CFPB, BIS CPMI / Red Book and ECB Data Portal are documented as reference/context sources. The calculator clearly separates those sources from its synthetic demonstration assumptions and does not present synthetic rates as directly sourced institutional data. |
| Documentation | PASS | The README documents the project objective, features, architecture, synthetic assumptions, reference sources, UAT, limitations, setup and validation workflow. |
| UAT Documentation | PASS | The UAT checklist documents the implemented calculator scenarios, edge cases, tooltips, Export Assumptions, Sample Data, responsive behaviour and other applicable checks. |
---

## Requirement Match

The application currently includes:

- Transaction amount
- Card type
- Merchant Category (MCC)
- Payment channel
- Geography
- Interchange rate
- Processor fee
- Blended fee estimate
- Fee breakdown
- Payment Rail Waterfall
- Who Controls the Rail?
- Why this matters
- Export Assumptions
- Download Sample Data

These features match the main requirements for the Interchange Fee Calculator.

---

## Visual Review

### PASS

- Dark dashboard interface
- Consistent green accent system
- Clear calculator and results separation
- Strong visual hierarchy
- Important financial outputs are highlighted
- Sections are clearly grouped
- Scenario information is easy to understand
- The main dashboard background uses the strict #030712 reference required by the Real Rails protocol.

The visual identity requirement is satisfied.

---

## Data Review

The calculator uses synthetic adjustments based on:

- Card Type
- Merchant Category
- Payment Channel
- Geography

The application clearly identifies the assumptions as synthetic.

The downloadable sample dataset is also marked as synthetic.

The reference sources from the project requirement should be documented separately as research/context sources and should not be presented as the source of the synthetic calculator rates.

---

## Functional Storytelling

The application follows this workflow:

1. Select payment scenario
2. Enter transaction and fee assumptions
3. Calculate payment costs
4. View blended fee estimate
5. View fee breakdown
6. View payment rail waterfall
7. Understand rail participants
8. Read why the metric matters
9. Export assumptions or download sample data

This provides a clear calculator-to-insight workflow.

---

## Improvements Before Final Submission

The main VAR improvements have been completed:

1. Visual identity aligned with the strict #030712 background requirement.
2. Reference sources documented as research/context sources.
3. Synthetic calculator assumptions clearly separated from institutional reference sources.
4. Project-specific README documentation completed.
5. UAT checklist updated with the implemented calculator features, including Export Assumptions and Sample Data.
6. Final UAT and project documentation reviewed.

---

## Final VAR Status

**PASS**

The core calculator workflow, interaction design, visual identity, synthetic-data disclosure, source documentation and project documentation are complete. The application is ready for final UAT and submission review.