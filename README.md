# Real Rails Batch 8 ΓÇö Interchange Fee Calculator

## Project Overview

**Interchange Fee Calculator** is a production-style demonstration built for the **Real Rails Intelligence Library** as part of **Real Rails Batch 8 ΓÇö PoC #2**.

The application helps everyday viewers, founders, SMBs and operators understand how payment-related fees can affect a transaction.

Users can select a payment scenario and see how different synthetic assumptions change the estimated interchange fee, processor cost, network cost, total fee and merchant net amount.

> **Data Mode: Demo / Synthetic Data**
>
> The fee adjustments used by this calculator are synthetic assumptions created for demonstration purposes. They do not represent live card-network pricing, contractual merchant rates or actual network settlement economics.

The dashboard is presented under the application name **Interchange Fee Intelligence**. The project identity remains **Real Rails Batch 8 ΓÇö PoC #2**.

---

## Project Information

| **Field** | **Details** |
|---|---|
| Project | Real Rails Batch 8 |
| PoC | #2 ΓÇö Interchange Fee Calculator |
| Rail | Payments |
| Application Type | Payment fee estimation dashboard |
| Data Mode | Synthetic / Demo |
| Developer / Architect | Niranjana T Suresh |
| Dashboard Name | Interchange Fee Intelligence |

---

## Objective

The goal of this PoC is to create an easy-to-understand payment fee calculator that demonstrates how transaction characteristics can affect estimated payment costs.

The calculator allows users to explore scenarios based on:

- Transaction amount
- Card type
- Merchant Category Code (MCC)
- Payment channel
- Geography
- Interchange rate
- Processor fee

The application then calculates the estimated payment costs and presents the results through a dashboard-style interface.

---

## Core Features

### Calculator Inputs

Users can enter or select:

- Transaction amount
- Base interchange rate
- Processor fee
- Card type
- Merchant category
- Payment channel
- Geography

### Scenario Analysis

The calculator updates its estimated fees when the payment scenario changes.

Supported scenario dimensions include:

**Card types**

- Credit Card
- Debit Card
- Premium Card

**Merchant categories**

- Retail
- Restaurant
- Travel
- Digital Services

**Payment channels**

- Online
- In-store
- Mobile

**Geographies**

- India
- United States
- European Union
- United Kingdom

### Dashboard and Visualization

The dashboard includes:

- Payment transaction participant flow
- Payment cost distribution chart
- Interchange, processor and network fee breakdown
- Scenario builder and active scenario summary
- Transaction amount, total fee, net amount and effective fee rate
- Participant information panel
- Project information modal
- JSON assumptions export
- Sample CSV data download

The right-side Intelligence Panel is available for participant context and inspection.

---

## Results

The dashboard displays:

- Interchange Fee
- Processor Cost
- Network Cost
- Total Fee
- Net Amount
- Effective Fee Percentage

The application also provides a blended fee estimate for the active scenario.

---

## Fee Breakdown

The Fee Breakdown section separates the estimated payment costs into:

1. Interchange
2. Network
3. Processor

This helps users understand how the total estimated fee is composed.

---

## Payment Rail Waterfall

The payment participant flow presents the payment journey through the main participants shown in the demonstration:

- Merchant
- Processor
- Card Network
- Issuer / issuing side

The flow is explicitly presented as a **synthetic demonstration**.

It should not be interpreted as a representation of actual card-network settlement economics.

---

## Who Controls the Rail?

The application includes participant context intended to explain the roles of major payment participants.

This section is intended to help everyday viewers understand that payment transactions involve multiple participants rather than a single fee-setting entity.

---

## Why This Matters

Small percentage differences can affect the amount retained by a merchant from each transaction.

The calculator provides a simple way to explore these differences by changing the payment scenario and observing how the estimated costs change.

---

## Synthetic Data and Assumptions

This PoC uses synthetic assumptions instead of live payment-network pricing data.

The synthetic adjustments are applied according to:

### Card Type

| **Card Type** | **Adjustment** |
|---|---:|
| Credit Card | 0.0% |
| Debit Card | -0.4% |
| Premium Card | +0.8% |

### Merchant Category

| **Merchant Category** | **Adjustment** |
|---|---:|
| Retail | +0.0% |
| Restaurant | +0.2% |
| Travel | +0.4% |
| Digital Services | +0.3% |

### Payment Channel

| **Channel** | **Adjustment** |
|---|---:|
| Online | +0.2% |
| In-store | +0.0% |
| Mobile | +0.1% |

### Geography

| **Geography** | **Adjustment** |
|---|---:|
| India | +0.0% |
| United States | +0.3% |
| European Union | -0.2% |
| United Kingdom | -0.1% |

The base network fee used in the demonstration is:

- Network Fee Rate: 0.1%

These values are **synthetic demonstration assumptions** and should not be treated as real-world pricing benchmarks.

---

## Reference Sources

The project requirement identifies the following sources for payment and market context:

- CFPB
- BIS CPMI / Red Book
- ECB Data Portal

These sources are intended as research and contextual references for the payment-rail topic.

The current calculator does **not** claim that its synthetic fee adjustments are directly sourced from these institutions.

Where live or event-level public data is unavailable or unsuitable for the calculator, the PoC uses clearly labelled synthetic/mock data.

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Recharts
- CSS

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

The frontend provides the dashboard and scenario controls. The FastAPI backend exposes the calculation endpoint used to process scenario inputs and return the estimated fee breakdown.

---

## Architecture

The current implementation uses a Next.js frontend and a separate Python FastAPI backend.

```text
User Input
    |
    v
Next.js Scenario Builder
    |
    v
API Request
POST /api/calculate
    |
    v
Python FastAPI Backend
    |
    v
Synthetic Fee Adjustments
    |
    v
Fee Calculation
    |
    v
API Response
    |
    v
Results Dashboard
    |
    +--> Fee Breakdown
    |
    +--> Payment Participant Flow
    |
    +--> Charts and Scenario Metrics
    |
    +--> JSON Export / Sample CSV
```

### Backend API

**Health Check**

```http
GET http://127.0.0.1:8000/
```

**Calculation Endpoint**

```http
POST http://127.0.0.1:8000/api/calculate
```

The calculation endpoint accepts scenario inputs and returns values including the adjusted interchange rate, interchange fee, processor cost, network cost, total fee, net amount and effective fee rate.

The backend health endpoint and calculation endpoint were tested during project verification.

A sample Γé╣1,000 scenario returned:

| **Result** | **Value** |
|---|---:|
| Interchange Fee | Γé╣20.00 |
| Processor Cost | Γé╣3.00 |
| Network Cost | Γé╣1.00 |
| Total Fee | Γé╣24.00 |
| Net Amount | Γé╣976.00 |
| Effective Fee Rate | 2.40% |

---

## Example Fee Calculation

For a transaction amount of Γé╣1,000:

| **Component** | **Amount** |
|---|---:|
| Interchange | Γé╣20.00 |
| Processor | Γé╣3.00 |
| Network | Γé╣1.00 |
| **Total Fee** | **Γé╣24.00** |
| Net Amount | Γé╣976.00 |
| Effective Fee Rate | 2.40% |

These values are synthetic demonstration assumptions.

---

## Installation and Setup

### Prerequisites

- Node.js and npm
- Python 3
- pip

### Frontend Setup

From the project root directory, install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

### Backend Setup

Open a separate terminal and run:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Check backend availability at:

```text
http://127.0.0.1:8000/
```

Run the frontend and backend in separate terminals during local development.

---

## Project Structure

```text
Real-Rails-Interchange-Fee-Calculator/
|
|-- app/
|   |-- page.tsx
|   |-- globals.css
|   |-- layout.tsx
|
|-- backend/
|   |-- main.py
|   |-- requirements.txt
|
|-- public/
|   |-- sample-payment-data.csv
|
|-- package.json
|-- package-lock.json
|-- README.md
```

This is the expected high-level structure. Additional configuration and framework-generated files may also be present.

---

## Testing and Verification

The following checks were performed during development:

- Frontend development server startup
- Backend health endpoint response
- Backend `/api/calculate` endpoint
- Sample Γé╣1,000 fee calculation
- Frontend scenario update and calculation display
- Desktop, tablet and mobile responsive layout checks
- JSON assumptions export
- Sample CSV download

Responsive checks were performed using browser device emulation. They are visual checks and do not replace testing on physical devices.

---

## Limitations

- Uses synthetic demonstration data.
- Does not provide live card-network interchange rates.
- Does not connect to real payment processors or banking systems.
- Calculated fees are illustrative estimates, not contractual merchant charges.
- The payment participant flow is explanatory and should not be interpreted as actual settlement routing or settlement timing.

---

## Internship Information

**Organization:** Infocreon Internship  
**Batch:** 8  
**Project:** Real Rails ΓÇö Interchange Fee Calculator  
**PoC:** #2  
**Dashboard:** Interchange Fee Intelligence  
**Developer / Architect:** Niranjana T Suresh

---

*Developed as an internship proof-of-concept project using synthetic payment data.*


## Phase 2 - Docker Containerization

This Phase 2 setup packages the Next.js frontend and FastAPI backend into separate Docker containers.

### Docker Architecture

- **Frontend:** Next.js standalone production server.
- **Backend:** Python FastAPI service running with Uvicorn.
- **Container networking:** The frontend communicates with the backend using the Docker Compose service name `backend`.
- **Backend health check:** Docker checks the backend root endpoint before starting the frontend.

### Container Ports

| Service | Local URL | Container Port |
|---|---|---:|
| Frontend | http://localhost:3001 | 3000 |
| Backend | http://localhost:8001 | 8000 |

The frontend uses `API_INTERNAL_URL=http://backend:8000` inside the Docker network. This allows the frontend container to reach the backend container without using localhost.

### Prerequisites

- Docker Desktop
- Docker Compose
- Docker Desktop configured to use Linux containers

### Build and Start

Run the following command from the project root:

```powershell
docker compose up --build
```

Open the dashboard:

```text
http://localhost:3001
```

Check backend availability:

```text
http://localhost:8001/
```

### Container Management

Check container status:

```powershell
docker compose ps
```

Restart Phase 2 containers:

```powershell
docker compose restart
```

View recent logs:

```powershell
docker compose logs --tail 50
```

Stop Phase 2 containers:

```powershell
docker compose down
```

These commands operate on the services defined in this repository's Docker Compose project.

### API Verification

The frontend exposes the calculation endpoint:

```text
POST http://localhost:3001/api/calculate
```

The Next.js API route forwards calculation requests to the backend through the internal Docker network.

### Local Container Validation

The following Phase 2 checks have been completed:

- Frontend Docker image built successfully.
- Backend Docker image built successfully.
- Both containers started successfully.
- Backend health check reported healthy.
- Frontend-to-backend API calculation request returned the expected results.
- Dashboard amount-change interaction updated the displayed scenario.
- Both containers restarted successfully.
- API calculation succeeded after the container restart.

A sample synthetic calculation for a transaction amount of 1000 returned:

| Result | Value |
|---|---:|
| Interchange Fee | 20.00 |
| Processor Cost | 3.00 |
| Network Cost | 1.00 |
| Total Fee | 24.00 |
| Net Amount | 976.00 |
| Effective Fee Rate | 2.40% |

### Docker Limitations

- The application uses synthetic demonstration assumptions, not live card-network pricing.
- This Docker setup is intended for local container validation.
- Cloud deployment and production publishing have not been claimed as completed.

