const API_URL = "http://localhost:3000/properties";

const tableBody = document.getElementById("adminTableBody");
const propertyForm = document.getElementById("propertyForm");
const propertyIdInput = document.getElementById("propertyId");
const titleInput = document.getElementById("title");
const typeInput = document.getElementById("type");
const priceInput = document.getElementById("price");
const locationInput = document.getElementById("location");
const imageInput = document.getElementById("image");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");

async function fetchAdminData() {
    try {
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error();
        const data = await response.json();
        calculateStats(data);
        renderAdminTable(data);
    } catch (err) { console.error("Error loading data", err); }
}

function calculateStats(data) {
    document.getElementById("statTotal").innerText = data.length;
    
    const avg = data.length ? data.reduce((sum, item) => sum + Number(item.price), 0) / data.length : 0;
    document.getElementById("statAvg").innerText = `$${Math.round(avg).toLocaleString()}`;
    
    const villas = data.filter(item => item.type === "Villa").length;
    document.getElementById("statVillas").innerText = villas;
}

function renderAdminTable(data) {
    tableBody.innerHTML = "";
    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${item.title}</strong></td>
            <td>${item.type}</td>
            <td>$${Number(item.price).toLocaleString()}</td>
            <td>${item.location}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="editItem('${item.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteItem('${item.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Inline Custom Form Validation & POST/PUT
propertyForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevents page reload
    
    // Inline Validation rule check
    if (titleInput.value.trim().length < 5) {
        document.getElementById("titleErr").classList.remove("d-none");
        return;
    } else {
        document.getElementById("titleErr").classList.add("d-none");
    }

    const payload = {
        title: titleInput.value,
        type: typeInput.value,
        price: Number(priceInput.value),
        location: locationInput.value,
        image: imageInput.value
    };

    const id = propertyIdInput.value;
    try {
        if (id) {
            // Update mode: PUT
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } else {
            // Creation mode: POST
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        }
        propertyForm.reset();
        resetFormState();
        fetchAdminData();
    } catch (err) { alert("Action failed."); }
});

// Load item for Editing
window.editItem = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const item = await response.json();
    
    propertyIdInput.value = item.id;
    titleInput.value = item.title;
    typeInput.value = item.type;
    priceInput.value = item.price;
    locationInput.value = item.location;
    imageInput.value = item.image;
    
    formTitle.innerText = "Modify Existing Listing";
    saveBtn.innerText = "Update Changes";
    cancelBtn.classList.remove("d-none");
};

// Delete Action
window.deleteItem = async (id) => {
    if (confirm("Are you certain you want to remove this property listing?")) { // Rubric confirmation check
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchAdminData();
    }
};

cancelBtn.addEventListener("click", () => {
    propertyForm.reset();
    resetFormState();
});

function resetFormState() {
    propertyIdInput.value = "";
    formTitle.innerText = "Add New Property Listing";
    saveBtn.innerText = "Save Listing";
    cancelBtn.classList.add("d-none");
}

document.addEventListener("DOMContentLoaded", fetchAdminData);