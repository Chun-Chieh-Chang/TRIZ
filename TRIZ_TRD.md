# AI-Assisted TRIZ Engineering & Multi-Domain Solver - Technical Requirement Document (TRD)

**Version**: 2.0.0  
**Date**: 2026-08-14  
**Architecture**: Hybrid Static SPA (GitHub Pages) + Optional FastAPI Backend + Google Gemini AI Cloud Engine

---

## 1. System Overview
The "TRIZ Solver PRO" is a multi-dimensional inventive contradiction resolution engine. It synthesizes classical Altshuller TRIZ logic (Contradiction Matrix, 40 Principles, Separation Principles, ARIZ-85C) and modern cross-domain adaptations (Software, IT Cloud, Business Management) with Google Gemini AI semantic understanding.

## 2. Knowledge Architecture & Data Model

### 2.1 Master Knowledge Base (`data/triz_master_db.json`)
* **39 Engineering Parameters**: Standardized physical & functional attributes.
* **40 Inventive Principles**: Structured with classic engineering, software architecture, and business management practical cases.
* **4 Physical Separation Principles**: Space, Time, Condition, System Scale with heuristic guiding questions.
* **39x39 Contradiction Matrix**: Classical mapping + Heuristic top-4 universal fallback.
* **8 Laws of Technological Evolution**: Evolution patterns & trends.
* **ARIZ-85C Algorithm**: 4 core stages of inventive problem solving.

### 2.2 Dual Engine (Hybrid Architecture)
1. **Gemini AI Engine (`js/ai_service.js`)**:
   * Uses Google Gemini 2.5/1.5 Flash API for deep semantic decomposition of non-engineering & commercial contradictions.
   * Generates tailored, actionable 3-step solutions for the user's specific context.
   * Pure client-side security: API Key stored solely in browser `localStorage`.
2. **Local Master Engine (`js/engine.js`)**:
   * Pure JavaScript implementation capable of 100% offline execution.
   * Fallback routing, matrix lookups, multi-domain search, and Ideality calculation.

## 3. UI/UX & Design System
* Implements **SkillsBuilder Glass Order** (`backdrop-filter: blur(16px)`) and **Color Master Palette** (Slate-900 `#0F172A`, Slate-800 `#1E293B`, Royal Blue `#3B82F6`, Emerald `#10B981`).
* Full responsive support with mobile bottom navigation bar and desktop sidebar.

---
