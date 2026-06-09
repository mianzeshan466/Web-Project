# Matriz Estate — Real Estate Management System

### 👤 Student Credentials
* [cite_start]**Student Name:** M Zeeshan Raza [cite: 94]
* [cite_start]**Roll Number:** F24BDOCS1M01304 [cite: 83, 94]
* [cite_start]**Course Title:** Web Technologies (SP26) [cite: 1, 3]
* [cite_start]**Academic Program:** BSCS 4th Semester [cite: 4]
* [cite_start]**Class Section:** 1M [cite: 4]

---

## 📝 Project Overview
[cite_start]**Matrix Estate** is a lightweight, responsive client-side Real Estate Management Platform engineered entirely using vanilla web technologies[cite: 7, 8, 57]. [cite_start]The application architecture decouples user exploration from administrative asset control through a dual-panel web interface layout[cite: 17, 18]:

1. [cite_start]**User Portal (`index.html`):** A client-facing marketplace designed for prospective property buyers to browse, search, and dynamically filter real-time real estate opportunities[cite: 19, 26, 27, 28].
2. [cite_start]**Admin Portal (`admin.html`):** A dedicated, visually isolated dashboard layout that grants property managers full CRUD management over the live housing catalog and provides data analytic summaries[cite: 19, 33, 34, 35, 36].

[cite_start]The application relies strictly on plain JavaScript for asynchronous data exchange (`fetch` + `async/await`) against a mock JSON REST backend engine—intentionally avoiding third-party frontend frameworks to demonstrate core underlying language proficiencies[cite: 8, 9, 13, 16, 38].

---

## 🛠️ Core Engineering Features

### 1. User Marketplace Panel (`index.html`)
* [cite_start]**Asynchronous Data Render:** Requests and structures the live housing catalog via an optimized HTTP `GET` pipeline[cite: 27, 38].
* [cite_start]**Real-time Categorical Filtering:** Enables customers to seamlessly restrict the interface to show only specific accommodation layouts (e.g., *Apartments* or *Villas*)[cite: 28].
* [cite_start]**Robust State Communication:** Seamlessly displays clear, intuitive interface loading microcopy while fetching resources, and outputs an isolated error warning container if the local database engine becomes unreachable[cite: 32].

### 2. Administrative Control Portal (`admin.html`)
* [cite_start]**Distinct Visual Layout Hierarchy:** Styled using an administrative color system (Red-dominant scheme) to prevent overlapping layout confusion with the guest-facing index page[cite: 36].
* [cite_start]**Real-time Analytics Engine:** Evaluates mathematical arrays on-the-fly to display 3 critical operational statistics: *Total Active Listings*, *Average Property Valuation*, and *Total Villa Density*[cite: 36].
* **Full Data CRUD Lifecycle Execution:**
  * [cite_start]**Create (POST):** Employs a custom-validated form featuring 5 unique inputs (*Title, Type, Price, Location, and Image URL*) to append records directly into the dataset[cite: 29].
  * [cite_start]**Read (GET):** Generates a comprehensive management table pulling internal property metadata records[cite: 34].
  * [cite_start]**Update (PUT):** Loads targeted row variables directly back into the primary input form fields for immediate data adjustment and updates[cite: 35].
  * [cite_start]**Delete (DELETE):** Safely purges an item array completely from the backend database following explicit approval via a standard system confirmation pop-up barrier[cite: 35].

---

## 🎨 Technology Architecture Stack
* [cite_start]**Markup Presentation:** Semantic, accessible HTML5 structures using strict separation layouts (`<nav>`, `<main>`, `<section>`, `<form>`, and properly mapped `<label>` controls)[cite: 13, 40, 42].
* [cite_start]**Styling Layer:** Styled via Bootstrap 5 layout primitives and responsive grid typography delivered entirely over a high-speed CDN connection[cite: 13, 49, 118].
* [cite_start]**Logic Layer:** Clean Vanilla JavaScript (ECMAScript 6+) utilizing native asynchronous data flows[cite: 13, 38].
* [cite_start]**Backend Database Engine:** Localized Mock REST API configuration operating smoothly over Node's JSON Server infrastructure[cite: 13, 22].

---

## ⚙️ Direct Setup & Operational Instructions

### 📋 Technical System Requirements
[cite_start]Ensure that your computer has **Node.js** installed on it to utilize the node package executor (`npx`) command structure[cite: 86].

### 🚀 Booting the Application Locally
[cite_start]Follow these exact steps to launch the system interface for grading evaluation[cite: 67]:

1. [cite_start]**Extract Project Assets:** Unzip `WebProject_F24BDOCS1M01304.zip` into an accessible folder space on your operating machine[cite: 83].
2. [cite_start]**Access Root Terminal:** Open a clean Command Prompt or Terminal instance pointed exactly inside your extracted project root folder[cite: 86].
3. [cite_start]**Initialize the Database Engine:** Start your local mock database micro-service on Port 3000 by copying and executing the command below[cite: 86]:
   ```bash
   npx json-server --watch db.json --port 3000