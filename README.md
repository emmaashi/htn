# Hack the North 2025 Frontend Challenge

A **scalable and user-friendly event listing platform** for Hack the North, built using **Next.js, TypeScript, GraphQL, Tailwind CSS, and Shadcn UI**. This web app allows users to **browse, search, and filter hackathon events**, with role-based access control for **public and private events**.
---

### ✅ **Authentication & Role-Based Access**
- **Hacker login:** Access both **public** and **private** events.
- **Guest mode:** Can only view **public** events.
- **Login persistence:** Uses **React Context** to store authentication state across pages.

### 📅 **Event Management**
- **Event Cards:** Styled using **Shadcn UI**, color-coded based on event type.
- **Real-Time Search & Filtering:** Easily find events using a **search bar** and **category filters**.
- **Sorting:** Events are **sorted by start time by default**, with options to reorder.

---
## **Getting Started**
```sh
git clone https://github.com/emmaashi/htn-frontend.git
cd htn-frontend
npm install
npm run dev
The app will be available at http://localhost:3000