# Interchange Fee Calculator
###  | PoC-2| interchange-Fee-Calculator| Application | Interchange Fee Intelligence |

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
- JSON assumptions export
- Sample CSV data download

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Visualization | Recharts |
| Backend | Python, FastAPI, Pydantic |
| API Server | Uvicorn |
| Containerization | Docker, Docker Compose |
| Cloud Hosting | Render |

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

**Prerequisites**
- Node.js and npm
- Python 3
- Docker Desktop and Docker Compose

**Frontend**

```bash
npm install
npm run dev
```

**Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**Docker Deployment**

Run from the project root:

```bash
docker compose up --build
```

| Service | Local URL |
|---|---|
| Frontend | http://localhost:3001 |
| Backend | http://localhost:8001/ |

Stop containers:

```bash
docker compose down
```

## 6. Cloud Deployment – Render

The application is deployed using two independent Docker services.

| Component | Deployment URL |
|---|---|
| Frontend Dashboard | https://poc-2-interchange-fee-frontend.onrender.com |
| Backend Health Check | https://poc-2-interchange-fee-backend-v2.onrender.com/ |
| Backend Calculation API | https://poc-2-interchange-fee-backend-v2.onrender.com/api/calculate |
| Frontend API Proxy | https://poc-2-interchange-fee-frontend.onrender.com/api/calculate |

**Frontend environment configuration**

```env
API_INTERNAL_URL=https://poc-2-interchange-fee-backend-v2.onrender.com
```

The frontend API proxy forwards calculation requests to the backend service.

## 7. Deployment Verification

The following Render deployment checks have been completed:

- Frontend availability verified with HTTP 200.
- Backend health endpoint verified.
- Frontend-to-backend API communication tested successfully.
- Calculation endpoint tested using POST requests.

**Sample calculation – ₹5,000 transaction**

| Metric | Result |
|---|---:|
| Interchange Fee | ₹100.00 |
| Processor Cost | ₹15.00 |
| Network Cost | ₹5.00 |
| Total Fee | ₹120.00 |
| Merchant Net Amount | ₹4,880.00 |
| Effective Fee Rate | 2.40% |

## 8. Deployment Status

| Deployment Component | Status |
|---|---|
| Local Docker Setup | Completed |
| Render Frontend | Live |
| Render Backend | Live |
| API Integration | Verified |
| Azure Container Apps | Pending |
| Azure Revision Validation | Pending |

**Azure deployment note:** Render is an additional cloud deployment. The required Microsoft Azure Container Apps deployment and its associated validation activities remain outstanding.

## 9. Limitations

- Uses synthetic payment assumptions.
- Does not retrieve live interchange pricing.
- Does not connect to actual payment processors or banking systems.
- Results are illustrative estimates and not contractual fee calculations.

## 10. Project Information

| Field | Details |
|---|---|
| Organization | Infocreon Internship |
| PoC-2 | Interchange Fee Calculator |
| Application | Interchange Fee Intelligence |
| Developer / Architect | Niranjana T Suresh |
| GitHub | [niranjanats07](https://github.com/niranjanats07) |

---

*Developed as part of the Real Rails Batch 8 internship project.*
