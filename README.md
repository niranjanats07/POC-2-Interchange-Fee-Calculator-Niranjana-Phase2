# INFOCREON INTERNSHIP

# Interchange Fee Intelligence

### POC-2 | Payment Fee Calculator

*Payment Rail Analytics, Cost Estimation & Scenario Analysis*

A web-based payment fee estimation application designed to demonstrate how transaction characteristics influence payment processing costs. The application provides an interactive dashboard for exploring synthetic interchange, processor, and network fee calculations.

**Application:** Interchange Fee Intelligence  
**Data Mode:** Synthetic / Demonstration

---

## 1. Project Overview

The Interchange Fee Calculator demonstrates payment fee estimation through configurable transaction scenarios.

Users can modify transaction characteristics and explore their impact on:

- Interchange fees
- Processor costs
- Network costs
- Total transaction fees
- Merchant net amount
- Effective fee percentage

All calculations use synthetic assumptions and are intended for demonstration purposes.

## 2. Key Features

- Interactive transaction scenario builder
- Configurable card types and merchant categories
- Payment channel and geographical selections
- Dynamic fee calculations
- Payment participant flow visualization
- Fee distribution charts and dashboard metrics
- Intelligence Panel for payment participant information
- Project information modal and developer signature
- JSON assumptions export
- Sample CSV data download
- Responsive desktop and mobile layouts
- Automated Selenium end-to-end testing

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Visualization | Recharts |
| Backend | Python, FastAPI, Pydantic |
| API Server | Uvicorn |
| Automation Testing | Selenium WebDriver 4, Python, Pytest |
| Browser | Google Chrome |
| Containerization | Docker, Docker Compose |
| Cloud Hosting | Render |
| Additional Deployment Target | Microsoft Azure Container Apps (Pending) |

## 4. Application Architecture

```text
User
  |
  v
Next.js Frontend
  |
  v
API Proxy
/api/calculate
  |
  v
FastAPI Backend
  |
  v
Synthetic Fee Calculation
  |
  v
JSON Response
  |
  v
Dashboard Visualization
```

The frontend communicates with the FastAPI backend through a Next.js API proxy. This separates the user interface from the calculation service.

## 5. Local Setup

### Prerequisites

- Node.js and npm
- Python 3
- Docker Desktop and Docker Compose
- Google Chrome (for Selenium testing)

### Frontend

Run from the repository root:

```powershell
npm install
npm run dev
```

### Backend

```powershell
cd backend
py -m pip install -r requirements.txt
py -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Docker Deployment

Run from the project root:

```powershell
docker compose up --build
```

| Service | Local URL |
|---|---|
| Frontend | http://localhost:3001 |
| Backend | http://localhost:8001/ |

Stop containers:

```powershell
docker compose down
```

## 6. Cloud Deployment — Render

The application is deployed using two independent Docker services.

| Component | Deployment URL |
|---|---|
| Frontend Dashboard | https://poc-2-interchange-fee-frontend.onrender.com |
| Backend Health Check | https://poc-2-interchange-fee-backend-v2.onrender.com/ |
| Backend Calculation API | https://poc-2-interchange-fee-backend-v2.onrender.com/api/calculate |
| Frontend API Proxy | https://poc-2-interchange-fee-frontend.onrender.com/api/calculate |

### Frontend Environment Configuration

```env
API_INTERNAL_URL=https://poc-2-interchange-fee-backend-v2.onrender.com
```

The frontend API proxy forwards calculation requests to the backend service.

## 7. Deployment Verification

The following Render deployment checks have been performed:

- Frontend availability checked.
- Backend health endpoint checked successfully.
- Frontend-to-backend API communication tested using POST requests.
- Calculation endpoint returned HTTP 200.
- Synthetic calculation results verified.

### Sample Calculation — ₹5,000 Transaction

| Metric | Result |
|---|---:|
| Interchange Fee | ₹100.00 |
| Processor Cost | ₹15.00 |
| Network Cost | ₹5.00 |
| **Total Fee** | **₹120.00** |
| Merchant Net Amount | ₹4,880.00 |
| Effective Fee Rate | 2.40% |

### Latest Live API Verification — November 3, 2026

A live POST request was executed against the deployed frontend API proxy.

**Test transaction:** ₹1,000

| Metric | Actual Result |
|---|---:|
| Data Mode | Synthetic |
| Interchange Rate | 2.0% |
| Interchange Fee | ₹20.00 |
| Processor Cost | ₹3.00 |
| Network Cost | ₹1.00 |
| **Total Fee** | **₹24.00** |
| Net Amount | ₹976.00 |
| Effective Fee Rate | 2.40% |
| HTTP Response | 200 |

**Result:** PASS

## 8. Phase 2 — Automated Quality Gate: Selenium E2E Testing

The project includes an automated Selenium WebDriver test suite to validate the deployed application using Google Chrome.

### Test Configuration

| Component | Configuration |
|---|---|
| Automation | Selenium WebDriver 4 |
| Language | Python |
| Browser | Google Chrome |
| Test Framework | Pytest |
| Test Script | `tests/test_discussion4_selenium.py` |
| Dependencies | `requirements-test.txt` |
| Test Configuration | `pytest.ini` |

### Install Testing Dependencies

Run from the repository root:

```powershell
py -m pip install -r requirements-test.txt
```

### Execute Selenium Tests

```powershell
py -m pytest -v tests/test_discussion4_selenium.py
```

The test suite targets the Render frontend by default.

### Automated Test Coverage

The latest reported execution covers:

1. Live dashboard page load.
2. Frontend-to-backend API handshake.
3. Initial fee calculation.
4. Recharts visualization rendering.
5. Desktop screenshot capture.
6. Transaction amount interaction.
7. Debit Card interaction and recalculation.
8. Intelligence Panel open interaction.
9. Intelligence Panel close interaction.
10. Project information modal and developer signature.
11. Responsive mobile layout at a 390px viewport.
12. Mobile screenshot capture.

### Latest Selenium Execution Results

**Execution Date:** November 3, 2026  
**Application Tested:** Render deployment  
**Browser:** Google Chrome  
**Overall Result:** PASS

| Metric | Result |
|---|---:|
| Passed Checks | 12 |
| Failed Checks | 0 |
| API Handshake | HTTP 200 |
| Initial Total Fee | ₹24.00 |
| Amount Interaction | ₹48.00 for ₹2,000 |
| Debit Card Calculation | ₹40.00 |
| Mobile Viewport | 390px |

The results above reflect the latest execution report shared for the Render deployment.

### Evidence Files

| Evidence | Repository Path |
|---|---|
| Selenium Test Script | `tests/test_discussion4_selenium.py` |
| Test Dependencies | `requirements-test.txt` |
| Pytest Configuration | `pytest.ini` |
| Execution Report | `test-results/reports/Test_Report.txt` |
| Desktop Screenshot | `test-results/screenshots/discussion4-desktop.png` |
| Mobile Screenshot | `test-results/screenshots/discussion4-mobile.png` |

### View Test Evidence

Open the desktop screenshot:

```powershell
start .\test-results\screenshots\discussion4-desktop.png
```

Open the mobile screenshot:

```powershell
start .\test-results\screenshots\discussion4-mobile.png
```

Open the execution report:

```powershell
notepad .\test-results\reports\Test_Report.txt
```

## 9. Deployment Status

| Deployment Component | Status |
|---|---|
| Local Docker Setup | Completed |
| Render Frontend | Live |
| Render Backend | Live |
| Render API Integration | Verified |
| Selenium Render Testing | PASS — 12 checks reported |
| Desktop Screenshot Evidence | Generated and opened |
| Mobile Screenshot Evidence | Generated and opened |
| Azure Container Apps | Pending |
| Azure Revision Validation | Pending |
| Azure Selenium Validation | Pending |

### Azure Deployment Note

Render is an additional cloud deployment used for application hosting and automated testing.

The required Microsoft Azure Container Apps deployment and its associated validation activities have not yet been confirmed.

The current Selenium results validate the Render deployment only. They must not be interpreted as Azure deployment certification.

## 10. Limitations

- Uses synthetic payment assumptions.
- Does not retrieve live interchange pricing.
- Does not connect to actual payment processors or banking systems.
- Results are illustrative estimates and not contractual fee calculations.
- Selenium validation currently targets the Render deployment.
- Azure deployment and Azure-specific testing remain pending.

## 11. Project Information

| Field | Details |
|---|---|
| Organization | Infocreon Internship |
| Batch | Real Rails Batch 8 |
| PoC-2 | Interchange Fee Calculator |
| Application | Interchange Fee Intelligence |
| Developer / Architect | Niranjana T Suresh |
| GitHub | https://github.com/nirjanats07 |

---

*Developed as part of the Real Rails Batch 8 internship project.*
