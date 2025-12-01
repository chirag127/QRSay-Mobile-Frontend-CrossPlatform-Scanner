# 🛡️ Security Policy for QRSay User Mobile Frontend

This document outlines the security policies, reporting procedures, and commitment to maintaining a resilient and trustworthy application for the QRSay ecosystem. Security is paramount, adhering strictly to the **Zero Trust** and **Fail Fast** principles.

---

## 1. Commitment to Security

As the Apex Technical Authority, we treat security as a first-class citizen. We adhere to **OWASP Top 10 (2025)** recommendations rigorously, especially concerning client-side data handling, API interaction, and supply chain integrity.

**Core Principles Enforced:**

1.  **Input Validation:** All data originating from the user or external APIs is sanitized and validated immediately upon receipt (CQS Command validation).
2.  **Principle of Least Privilege:** The mobile application components only possess the permissions strictly necessary for their function.
3.  **Ephemeral Secrets:** Sensitive configuration and credentials are never stored insecurely on the device.

## 2. Supported Versions

We maintain active security support for the last **three major releases** of the application.

| Version Range | Support Status | Fix Commitment | Notes |
| :--- | :--- | :--- | :--- |
| **v3.x.x - Current** | Active | Immediate Patch Release | Full resources allocated. |
| **v2.x.x** | Maintenance | High Priority Patch | Critical vulnerabilities addressed within 72 hours. |
| **v1.x.x** | Security Only | Standard Priority | Only addresses critical RCE/Data Leakage vulnerabilities. |
| **< v1.0.0** | End-of-Life | None | Users must upgrade. |

## 3. Reporting a Vulnerability (VDP)

If you discover a security vulnerability, please follow the **Responsible Disclosure** protocol. **DO NOT** disclose publicly until coordination with the development team is complete.

### A. Contact Information

Report all security findings via email to the dedicated security channel:

📧 **Security Contact:** `security@qrsay.io`

### B. Required Information for Disclosure

To expedite triage and resolution, please include the following details in your report:

1.  **Vulnerability Type:** (e.g., XSS, Insecure Data Storage, API Misconfiguration).
2.  **Affected Component:** Specify the screen, feature, or API endpoint involved.
3.  **Proof of Concept (PoC):** Detailed, step-by-step reproduction instructions. Video or screenshot evidence is highly encouraged.
4.  **CVSS Score (Optional):** Your estimated severity rating.

### C. Disclosure Timeline

We commit to the following response and remediation timeline:

1.  **Initial Triage:** Acknowledgement within **24 hours**.
2.  **Confirmation & Fix Planning:** Within **72 hours**.
3.  **Patch Release:** Critical (CVSS 9.0+) vulnerabilities will receive a patch release within **7 business days**.

## 4. Automated Security Scans (DevSecOps)

Our CI/CD pipeline (`.github/workflows/ci.yml`) integrates automated security checks on every pull request:

*   **Dependency Auditing:** Using modern SCA tools to check for known CVEs in dependencies (React Native ecosystem).
*   **Static Analysis (SAST):** Biome linting rules are configured to catch common JavaScript/TypeScript security anti-patterns.
*   **SBOM Generation:** A Software Bill of Materials (SBOM) is generated for every production artifact to ensure transparency regarding transitive dependencies.

## 5. Cryptography Standards

*   **Data-in-Transit:** All external network communication mandates **TLS 1.3** or higher.
*   **Data-at-Rest:** Sensitive user data stored locally (if absolutely necessary) must utilize platform-native secure storage (e.g., Keychain on iOS, Keystore on Android), managed via secure Expo modules. **No plain text secrets.**

---

*Thank you for helping us maintain the integrity and trust placed in the QRSay ecosystem.*