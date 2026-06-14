# Matrix Estate — Real Estate Management System

### 👤 Student Credentials
* **Student Name:** M Zeeshan Raza
* **Roll Number:** F24BDOCS1M01304
* **Course Title:** Web Technologies (SP26)
* **Academic Program:** BSCS 4th Semester
* **Class Section:** 1M

---

## 📝 Project Overview
**Matrix Estate** is a lightweight, responsive client-side Real Estate Management Platform engineered entirely using vanilla web technologies. The application architecture decouples user exploration from administrative asset control through a dual-panel web interface layout:

1. **User Portal (`index.html`):** A client-facing marketplace designed for prospective property buyers to browse, search, and dynamically filter real-time real estate opportunities.
2. **Admin Portal (`admin.html`):** A dedicated, visually isolated dashboard layout that grants property managers full CRUD management over the live housing catalog and provides data analytic summaries.

The application relies strictly on plain JavaScript for asynchronous data exchange (`fetch` + `async/await`) against a mock JSON REST backend engine—intentionally avoiding third-party frontend frameworks to demonstrate core underlying language proficiencies.

---

## 🛠️ Core Engineering Features

### 1. User Marketplace Panel (`index.html`)
* **Asynchronous Data Render:** Requests and structures the live housing catalog via an optimized HTTP `GET` pipeline.
* **Real-time Categorical Filtering:** Enables customers to seamlessly restrict the interface to show only specific accommodation layouts (e.g., *Apartments* or *Villas*).
* **Robust State Communication:** Seamlessly displays clear, intuitive interface loading microcopy while fetching resources, and outputs an isolated error warning container if the local database engine becomes unreachable.

### 2. Administrative Control Portal (`admin.html`)
* **Distinct Visual Layout Hierarchy:** Styled using an administrative color system (Red-dominant scheme) to prevent overlapping layout confusion with the guest-facing index page.
* **Real-time Analytics Engine:** Evaluates mathematical arrays on-the-fly to display 3 critical operational statistics: *Total Active Listings*, *Average Property Valuation*, and *Total Villa Density*.
* **Full Data CRUD Lifecycle Execution:**
  * **Create (POST):** Employs a custom-validated form featuring 5 unique inputs (*Title, Type, Price, Location, and Image URL*) to append records directly into the dataset.
  * **Read (GET):** Generates a comprehensive management table pulling internal property metadata records.
  * **Update (PUT):** Loads targeted row variables directly back into the primary input form fields for immediate data adjustment and updates.
  * **Delete (DELETE):** Safely purges an item array completely from the backend database following explicit approval via a standard system confirmation pop-up barrier.

---

## 🎨 Technology Architecture Stack
* **Markup Presentation:** Semantic, accessible HTML5 structures using strict separation layouts (`<nav>`, `<main>`, `<section>`, `<form>`, and properly mapped `<label>` controls).
* **Styling Layer:** Styled via Bootstrap 5 layout primitives and responsive grid typography delivered entirely over a high-speed CDN connection.
* **Logic Layer:** Clean Vanilla JavaScript (ECMAScript 6+) utilizing native asynchronous data flows.
* **Backend Database Engine:** Localized Mock REST API configuration operating smoothly over Node's JSON Server infrastructure.

---

## ⚙️ Direct Setup & Operational Instructions

### 📋 Technical System Requirements
Ensure that your computer has **Node.js** installed on it to utilize the node package executor (`npx`) command structure.

### 🚀 Booting the Application Locally
Follow these exact steps to launch the system interface for grading evaluation:

1. **Extract Project Assets:** Unzip `WebProject_F24BDOCS1M01304.zip` into an accessible folder space on your operating machine.
2. **Access Root Terminal:** Open a clean Command Prompt or Terminal instance pointed exactly inside your extracted project root folder.
3. **Initialize the Database Engine:** Start your local mock database micro-service on Port 3000 by copying and executing the command below:
   ```bash
   npx json-server --watch db.json --port 3000