# Test Report — Web and Mobile dApp UIs

Last updated: 2025-11-25

Purpose
- Concise actionable test coverage for RideChain web (React) and mobile dApp (Flutter), plus Cardano smart contract and Decentralised Identity (DID) integration points.

Scope (summary)
- Web UI (React + Vite) — MVP implemented: user/driver/ride management, tables, dashboard, maps (plotting, clustering, current-user pulse).
- Mobile dApp (Flutter) — MVP implemented: feature parity adapted for mobile; uses google_maps_flutter/flutter_map, geolocator, permission_handler as needed.
- Blockchain — MVP includes basic Cardano smart contract (Plutus) integration and CIP-30 wallet flows for core ride/payment actions.
- Identity — MVP includes DID-based onboarding and verifiable credential checks for driver activation.

Environments (key additions)
- Flutter SDK + Dart; Android Studio / Xcode; emulators and device farms.
- Cardano local/dev:
  - cardano-node (stable), cardano-wallet, cardano-cli for localnet/testnet.
  - Plutus tools/runtime as required by on-chain contract testing (use emulator or testnet).
  - Wallet connectors supporting CIP-30 (Nami, Eternl) for browser; mobile wallet SDKs for Flutter where available.
- DID tooling:
  - DID methods/libraries used by the project (e.g., did:key / did:web / DID SDKs), verifiable credential libraries, and a test issuer/Verifier service (or mocks).
- CI: GitHub Actions + device farm steps for Flutter and cardano-cli based contract test runners.

Test Summary (condensed)
- Critical scenarios: navigation, auth (DID/Credentials), map interactions, Cardano contract flows (create/accept ride, payment), clustering & performance.
- Status overview: keep high-level statuses in each scenario block.

Core test scenarios (condensed & status)

1) Layout & navigation (L-01 / NAV-01)
- Status: Completed — main content scrolls independently, sidebar bottom items and active nav highlight verified.

2) Maps & User plotting (MAP-01)
- Status: Completed — markers, pulsing current user, clustering and center-on-me verified on web and Flutter. Fallback list view implemented.

3) Mobile interactions (MOB-01)
- Status: Completed — touch targets, platform navigation patterns, widget & integration tests in place for core flows.

4) Geolocation permission flows (SEC-01)
- Status: Completed — permission_handler + geolocator integrated; platform config (Info.plist/AndroidManifest) added; denial flows present.

CARD-01 — Cardano Smart Contract integration (summary)
- Status: Basic integration completed in MVP.
- What was validated: contract deploy on testnet/emulator, CIP-30 wallet sign flow, tx broadcast and confirmation observed, UI shows pending/confirmed states and tx hashes.
- Production next steps (high priority):
  - Plutus contract audit and gas/cost optimisation.
  - Expand wallet support (additional browser wallets, mobile deep-link/SDK flows).
  - Full CI integration: run contract emulator/unit tests, automated tx-sign mocks for CI.
  - Monitoring: transaction indexing, alerting for failed txs, and privacy mapping for on-chain addresses.

DID-01 — Decentralised Identity & Verifiable Credentials (summary)
- Status: Basic DID/VC flows implemented in MVP.
- What was validated: VC issuance in test harness, DID-based login and proof presentation for protected actions, revocation testcases covered in staging.
- Production next steps (high priority):
  - Harden credential storage and key management (secure enclave / platform keystore).
  - Implement revocation monitoring and live status checks in production.
  - Establish trust registry / issuer governance and run interoperability tests with common wallets.
  - Add CI harness for VC issuance/verification mocks.

Performance & Security highlights (short)
- Map stress testing and server-side clustering considered; region-based loading used in Flutter for large sets.
- Location data limited to project backends; Cardano addresses mapped to internal IDs where appropriate.
- Immediate production actions: security audit (app + smart contracts), DID governance, and penetration testing.

Acceptance criteria (met)
- Layout & navigation stable.
- Maps plot users, clusters, pulses, and center-on-me works.
- Flutter app handles permissions gracefully.
- Cardano: transactions signable via wallet; contract state changes observable on-chain.
- DID: credential issuance and proof presentation validated; revocation checks implemented in staging.

Recommended next steps (priority)
1. Run security & Plutus audits; remediate findings.
2. Expand wallet compatibility and finalize mobile wallet integration flows.
3. Implement DID trust/issuer governance and revocation monitoring in production.
4. Add CI steps for contract emulator tests and mocked wallet sign flows.
5. Production monitoring & observability for on-chain activity and DID operations.

