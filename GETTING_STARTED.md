# 🚀 Splito — Getting Started & Onboarding

Welcome to **Splito**! Follow these instructions to set up your local development environment.

---

## 📋 Prerequisites

- **Node.js**: `v20.x` or higher
- **pnpm**: `v9.x` (`npm install -g pnpm`)

---

## ⚡ Quick Start Instructions

1. **Clone the repository**:
   ```bash
   git clone d:/Coding/Projects/Splito/Splitmate
   cd Splitmate
   ```

2. **Set up environment variables**:
   Create `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=https://apiv1.splitmate.page/api/v1
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   ```

4. **Start the development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run Storybook Design System**:
   ```bash
   pnpm storybook
   ```
   Open [http://localhost:6006](http://localhost:6006) in your browser.
