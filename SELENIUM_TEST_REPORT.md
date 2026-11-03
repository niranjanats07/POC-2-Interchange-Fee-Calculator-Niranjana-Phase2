# Selenium E2E Test Report — Phase 2

**Project:** Real Rails Batch 8 — PoC #2 Interchange Fee Calculator  
**Application:** Interchange Fee Intelligence  
**Execution Date:** November 3, 2026  
**Automation:** Selenium WebDriver 4  
**Language:** Python  
**Browser:** Google Chrome  
**Environment:** Render

## 1. Application URLs

| Component | URL |
|---|---|
| Frontend | https://poc-2-interchange-fee-frontend.onrender.com |
| Backend | https://poc-2-interchange-fee-backend-v2.onrender.com/ |
| Frontend API | https://poc-2-interchange-fee-frontend.onrender.com/api/calculate |

## 2. Test Execution Summary

**Overall Result: PASS**

| Metric | Result |
|---|---:|
| Passed checks | 12 |
| Failed checks | 0 |
| Browser | Google Chrome |
| Mobile viewport | 390px |

## 3. Detailed Test Results

| No. | Test Case | Result |
|---:|---|---|
| 1 | Dashboard page load | PASS |
| 2 | Frontend-to-backend API handshake | PASS |
| 3 | Initial fee calculation | PASS |
| 4 | Recharts visualization rendering | PASS |
| 5 | Desktop screenshot capture | PASS |
| 6 | Transaction amount interaction | PASS |
| 7 | Debit Card interaction | PASS |
| 8 | Intelligence Panel opens | PASS |
| 9 | Intelligence Panel closes | PASS |
| 10 | Project information and developer signature | PASS |
| 11 | Responsive mobile layout | PASS |
| 12 | Mobile screenshot capture | PASS |

## 4. Live API Verification

A POST request was executed against the deployed Render frontend API proxy.

**Request parameters:**

- Transaction amount: ₹1,000
- Card type: Credit Card
- MCC: Retail
- Channel: Online
- Geography: India
- Interchange rate: 1.8%
- Processor fee: 0.3%

**Actual response:**

| Response field | Result |
|---|---:|
| Data mode | Synthetic |
| Interchange rate | 2.0% |
| Interchange fee | ₹20.00 |
| Processor cost | ₹3.00 |
| Network cost | ₹1.00 |
| Total fee | ₹24.00 |
| Net amount | ₹976.00 |
| Effective fee rate | 2.4% |
| HTTP status | 200 |

**API Verification: PASS**

## 5. Screenshot Evidence

The following evidence files were generated and opened for inspection:

- `test-results/screenshots/discussion4-desktop.png`
- `test-results/screenshots/discussion4-mobile.png`

## 6. Test Configuration and Files

- `tests/test_discussion4_selenium.py`
- `requirements-test.txt`
- `pytest.ini`
- `test-results/reports/Test_Report.txt`

## 7. Known Limitations

1. The reported Selenium execution validates the Render deployment.
2. Azure Container Apps deployment has not yet been verified.
3. Selenium testing against an Azure frontend URL remains pending.
4. Render test results do not establish Azure deployment certification.

## 8. Final Status

| Area | Status |
|---|---|
| Render frontend | PASS |
| Render backend | PASS |
| API calculation | PASS |
| Selenium quality gate | PASS — 12 checks reported |
| Screenshot evidence | Generated |
| Azure deployment | PENDING |
| Azure Selenium validation | PENDING |

**Current Status: Render testing completed; Azure validation pending.**

**Submission note:** This report documents the Render testing evidence. The complete Azure quality gate should only be marked certified after successful testing against the deployed Azure application.

---

*Developed as part of the Infocreon Real Rails Batch 8 internship project.*