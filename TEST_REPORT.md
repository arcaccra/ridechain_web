# Test Report — Web and Mobile dApp UIs

Last updated: 2025-11-25

Purpose

- Concise actionable test coverage for RideChain web (React) and mobile dApp (Flutter), plus Cardano smart contract and Decentralised Identity (DID) integration points.

Scope (summary)

- Web UI (React + Vite) — MVP implemented: user/driver/ride management, tables, dashboard, maps (plotting, clustering, current-user pulse).
- Mobile dApp (Flutter) — MVP implemented: feature parity adapted for mobile; uses google_maps_flutter/flutter_map, geolocator, permission_handler as needed.
- Blockchain — MVP includes basic Cardano smart contract (Plutus) integration and simple address-based flows for core ride/payment actions.
- Identity — MVP includes DID-based onboarding and verifiable credential checks for driver activation.

Environments (key additions)

- Flutter SDK + Dart; Android Studio / Xcode; emulators and device farms.
- Cardano local/dev:
  - cardano-node (stable), cardano-wallet, cardano-cli for localnet/testnet.
  - Plutus tools/runtime as required by on-chain contract testing (use emulator or testnet).
  - No direct wallet connectors (e.g., Nami, Eternl) used; system operates via address-based interactions and manual/scripted transaction handling.
- DID tooling:
  - DID methods/libraries used by the project (e.g., did:key / did:web / DID SDKs), verifiable credential libraries, and a test issuer/Verifier service (or mocks).
- CI: GitHub Actions + device farm steps for Flutter and cardano-cli based contract test runners.

Test Summary (condensed)

- Critical scenarios: navigation, auth (DID/Credentials), map interactions, Cardano contract flows (create/accept ride, payment), clustering & performance.
- Status overview: keep high-level statuses in each scenario block.

Core test scenarios (condensed & status)

1. Layout & navigation (L-01 / NAV-01)

- Status: Completed — main content scrolls independently, sidebar bottom items and active nav highlight verified.

2. Maps & User plotting (MAP-01)

- Status: Completed — markers, pulsing current user, clustering and center-on-me verified on web and Flutter. Fallback list view implemented.

3. Mobile interactions (MOB-01)

- Status: Completed — touch targets, platform navigation patterns, widget & integration tests in place for core flows.

4. Geolocation permission flows (SEC-01)

- Status: Completed — permission_handler + geolocator integrated; platform config (Info.plist/AndroidManifest) added; denial flows present.

CARD-01 — Cardano Smart Contract integration (summary)

- Status: Implemented (Simple Wallet Integration).
- Architecture:
  - User provides existing wallet address (no new wallet creation).
  - Transaction hash is captured and stored to unlock UTxO for the driver later.
- What was validated: Address submission, transaction hash capture, and basic flow verification.
- Production next steps (high priority):
  - Full CI integration: run contract emulator/unit tests.
  - Monitoring: transaction indexing and alerting for failed txs, and privacy mapping for on-chain addresses.

DID-01 — Decentralised Identity & Verifiable Credentials (summary)

- Status: Implemented (Backend-driven one-time setup).
- Architecture:
  - Process runs once when user adds wallet.
  - Backend script (Blockfrost API + PyCardano) initiates a self-transaction of 1 ADA.
  - ID Hash is stored on-chain as metadata using the 674 public label for DIDs.
- What was validated: Backend script execution, metadata storage on testnet, and correct label usage.
- Production next steps (high priority):
  - Harden credential storage and key management (secure enclave / platform keystore).
  - Implement revocation monitoring and live status checks in production.
  - Establish trust registry / issuer governance.

Performance & Security highlights (short)

- Map stress testing and server-side clustering considered; region-based loading used in Flutter for large sets.
- Location data limited to project backends; Cardano addresses mapped to internal IDs where appropriate.
- Immediate production actions: security audit (app + smart contracts), DID governance, and penetration testing.

Acceptance criteria (met)

- Layout & navigation stable.
- Maps plot users, clusters, pulses, and center-on-me works.
- Flutter app handles permissions gracefully.
- Cardano: transactions initiated via address/script flow; contract state changes observable on-chain.
- DID: credential issuance and proof presentation validated; revocation checks implemented in staging.

Recommended next steps (priority)

1. Run security & Plutus audits; remediate findings.
2. Finalize mobile address integration flows.
3. Implement DID trust/issuer governance and revocation monitoring in production.
4. Add CI steps for contract emulator tests and mocked transaction flows.
5. Production monitoring & observability for on-chain activity and DID operations.
