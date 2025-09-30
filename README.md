ReMind 🧠💊

A Voice-AI powered dashboard to support dementia & Parkinson’s care through precise medication reminders.

🚀 About the Project

Caring for loved ones with Dementia and Parkinson’s is overwhelming for families and caregivers.
One of the biggest challenges in Parkinson’s care is managing medications like Levodopa/Carbidopa (Sinemet), which must be taken 3–5 times daily at precise intervals.

Without support, this creates major risks:

Patients may forget doses or double-dose, causing serious safety issues.

Family caregivers feel constant stress when away.

Professional caregivers juggle multiple patients without centralized tracking.

ReMind was built to solve this. Using Voice AI agents, our app demonstrates how medication reminders reduce missed or duplicate doses, keeping patients safe while easing caregiver stress.

🧩 Features

✅ Multiple daily voice reminders with confirmations

✅ Caregiver dashboard to track patient schedules

✅ Secure Postgres backend for storing reminders & adherence

✅ Responsive frontend with React + Tailwind

✅ Real-time AI voice integration via VAPI API

🛠️ How We Built It

Frontend

React + TypeScript + Vite

Tailwind CSS + DaisyUI for accessibility & responsiveness

Backend

FastAPI (Python) + Uvicorn

dotenv for environment configs

Voice AI

VAPI API for live reminders, confirmations & alerts

Database

Postgres for secure storage of schedules & caregiver data

Hosting / Dev

Frontend: Vercel

Backend: Docker

📚 What We Learned

Integrating Voice AI agents for high-frequency, time-critical reminders

Building with FastAPI + React and syncing frontend + backend reliably

Handling Node dependency mismatches (pikaday, react-hook-form) and Python build issues (pyaudio/portaudio)

Designing safety-first backend logic to prevent duplicate reminders or double dosing

Scaling dashboards for both families and caregiving facilities

⚡ Challenges We Faced

⏰ Timing precision — demoing Parkinson’s-level frequency reliably

🐛 Dependency headaches — mismatched Node + Python builds

🔄 Syncing UI → backend → voice reminders

🛡️ Safety — preventing duplicate alerts and bad data states

📊 Scalability — making the dashboard useful for both families and facilities

🔮 What’s Next

☁️ Full cloud deployment with caregiver accounts

⌚ Wearable integrations for symptom tracking

🌍 Multilingual voice agents

🏥 Partnerships with healthcare providers for clinical validation
