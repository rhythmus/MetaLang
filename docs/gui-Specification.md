
## MetaLang Authoring GUI Specification: Functional & Technical Requirements

## 0. Document Control

0.1 Purpose of the GUI specification  
0.2 Scope (what this GUI does and does not do)  
0.3 Relationship to MetaLang Core Specification  
0.4 Normative terminology (MUST, SHOULD, MAY)  
0.5 Target user groups  
0.6 Versioning strategy for GUI releases

### 0.7 Rationale: GUI for Governance and Contribution

The MetaLang project addresses terminological fragmentation through a centralized, ontology-driven approach. However, the technical complexity of direct monorepo interaction poses a barrier to linguistic experts and lexicographers. The **MetaLang GUI** is specified as a standalone tool to bridge this gap, offering a user-friendly interface for GUID management, domain curation, and mapping visualization. It serves as the primary gateway for decentralized governance and community-driven terminology expansion.

## 1. Product Overview

1.1 Mission of the GUI  
1.2 Problem statement (repo complexity, non-dev contributors)  
1.3 Target personas

- Lexicographer
- Dictionary editor
- Language teacher
- Plugin maintainer
- Governance reviewer
- Power contributor (developer)

1.4 Modes of operation

- Hosted web application
- Local monorepo execution  

1.5 High-level system architecture

- GUI
- Core library
- Validation engine
- GitHub API integration (future phase)

## 2. Architectural Overview

2.1 System architecture diagram  
2.2 Data flow

- Load seed
- Load plugins
- Edit state
- Validation
- Patch export  

2.3 Separation of concerns

- Presentation layer
- State layer
- Validation layer
- Persistence/export layer  

2.4 Technology constraints (browser-only, no server dependency initially)

## 3. User Interface Architecture

3.1 Global layout structure

- Top bar
- Sidebar
- Workspace panel
- Inspector panel

3.2 Navigation model  
3.3 State management model (immutable change sets)  
3.4 Routing architecture

## 4. Core Functional Modules

### 4.1 Concepts Module

4.1.1 Concepts browser grid  
4.1.2 Filtering and sorting  
4.1.3 Multi-select bulk editing  
4.1.4 Concept creation workflow  
4.1.5 Concept editing inspector  
4.1.6 Parent/child hierarchy editing  
4.1.7 Deprecation workflow  
4.1.8 External reference editing  
4.1.9 Provenance annotation

Acceptance criteria:

- No concept saved without domain
- No cycle introduced
- ID immutability enforced

### 4.2 Graph Editor Module

4.2.1 DAG visualization  
4.2.2 Tree/outline view  
4.2.3 Multi-parent display  
4.2.4 Drag-to-parent interaction  
4.2.5 Graph validation overlay

Acceptance criteria:

- Cycles detected immediately
- Parent change requires confirmation
- Root domain nodes protected

### 4.3 Tag System / Plugin Module

4.3.1 Plugin registry view  
4.3.2 Plugin descriptor editor  
4.3.3 Mapping grid  
4.3.4 Multi-concept mapping support  
4.3.5 Ambiguity handling UI  
4.3.6 Bulk mapping suggestions  
4.3.7 Unmapped tag detection

Acceptance criteria:

- No mapping to unknown canonical ID
- Plugin schema validated live

### 4.4 External References Module

4.4.1 Coverage dashboard  
4.4.2 Missing reference detection  
4.4.3 Wikidata linking workflow  
4.4.4 UD/UniMorph linking workflow  
4.4.5 ISO/CLDR reference linkage

Acceptance criteria:

- externalRefs validated against expected formats
- No invalid QIDs or ISO codes saved

### 4.5 Validation & Integrity Module

4.5.1 Schema validation  
4.5.2 Graph validation  
4.5.3 Domain constraint validation  
4.5.4 Duplicate detection  
4.5.5 Orphan detection  
4.5.6 Conflict report view

Acceptance criteria:

- Save/export blocked if critical errors
- Warnings displayed for non-blocking issues

### 4.6 Patch & Export Module

4.6.1 Change tracking model  
4.6.2 JSON patch generation  
4.6.3 Diff visualization  
4.6.4 Seed file regeneration  
4.6.5 Plugin manifest regeneration  
4.6.6 Download bundle export

Acceptance criteria:

- Export deterministic
- Patch replayable via CLI

## 5. GitHub Integration Module (Future Phase)

5.1 Authentication model

- OAuth vs GitHub App

5.2 Permission model (least privilege)  
5.3 Fork management workflow  
5.4 Branch creation  
5.5 File update via GitHub API  
5.6 Pull request creation  
5.7 PR metadata (title, description, provenance)  
5.8 Conflict detection

Acceptance criteria:

- No credentials stored insecurely
- PR contains correct commit attribution
- User identity matches GitHub profile

## 6. Local Monorepo Mode

6.1 Running GUI via `pnpm dev`  
6.2 File-based editing instead of patch mode  
6.3 Integration with system git  
6.4 Dev-only features (debug panels, schema inspector)

Acceptance criteria:

- Local mode writes directly to `/data`
- No divergence from hosted build logic

## 7. Data Safety and Governance Constraints

7.1 ID immutability enforcement  
7.2 Domain modification restrictions  
7.3 Parent change approval rules  
7.4 Deprecation safeguards  
7.5 Conflict resolution UI  
7.6 Review queue integration

Acceptance criteria:

- No breaking ontology change without governance path

## 8. Performance Requirements

8.1 Large dataset handling (1000+ concepts)  
8.2 Lazy loading and virtualization  
8.3 Graph rendering performance  
8.4 Deterministic patch generation

Acceptance criteria:

- Concept grid responsive under 5,000 rows
- Graph renders <200ms for typical domain subtree

## 9. Accessibility & Internationalization

9.1 UI i18n support  
9.2 Keyboard navigation  
9.3 Screen reader compatibility  
9.4 Locale-aware label editing

Acceptance criteria:

- WCAG AA compliance target
- Locale fallback rules respected

## 10. Security Considerations

10.1 No direct write to production branch  
10.2 Safe handling of auth tokens  
10.3 CORS considerations  
10.4 Client-side data isolation  
10.5 Supply-chain risk mitigation

Acceptance criteria:

- Static build contains no embedded secrets

## 11. Build & Deployment

11.1 Build pipeline  
11.2 Static hosting strategy  
11.3 Version alignment with core  
11.4 Release tagging  
11.5 CDN caching considerations

## 12. Testing Strategy

12.1 Unit tests for state transitions  
12.2 Integration tests for patch export  
12.3 Validation test suite  
12.4 End-to-end tests (concept add → export → CLI apply)  
12.5 Regression tests for governance constraints

## 13. Roadmap & Phasing

13.1 Phase 1 — MVP

- Concepts grid
- Plugin grid
- Validation dashboard
- Patch export

13.2 Phase 2 — Graph editor  
13.3 Phase 3 — GitHub integration  
13.4 Phase 4 — Advanced ingestion tooling  
13.5 Phase 5 — Multi-user governance features

## 14. Appendices

A. UI Component Inventory  
B. State Machine Diagrams  
C. Patch Format Specification  
D. Example PR Lifecycle  
E. Permission Model for GitHub Integration
