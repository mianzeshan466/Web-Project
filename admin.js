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

// Fetch Data for Admin Dashboard View
async function fetchAdminData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Could not retrieve admin data");
        const data = await response.json();
        
        calculateStats(data);
        renderAdminTable(data);
    } catch (err) {
        console.error(err);
    }
}

// Reactive Dashboard Calculations
function calculateStats(data) {
    document.getElementById("statTotal").innerText = data.length;
    
    const avg = data.length ? data.reduce((sum, item) => sum + Number(item.price), 0) / data.length : 0;
    document.getElementById("statAvg").innerText = `$${Math.round(avg).toLocaleString()}`;
    
    const villas = data.filter(item => item.type === "Villa").length;
    document.getElementById("statVillas").innerText = villas;
}

// Beautiful Tabular Dashboard Display
function renderAdminTable(data) {
    tableBody.innerHTML = "";
    
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No items available in the server catalog.</td></tr>`;
        return;
    }

    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.style.transition = "background-color 0.2s";
        tr.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <img src="${item.image}" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
                    <div>
                        <span class="fw-bold d-block text-dark">${item.title}</span>
                        <span class="text-muted small">ID: #${item.id}</span>
                    </div>
                </div>
            </td>
            <td><span class="badge ${item.type === 'Villa' ? 'bg-danger' : 'bg-primary'}">${item.type}</span></td>
            <td><span class="fw-bold text-dark">$${Number(item.price).toLocaleString()}</span></td>
            <td><i class="bi bi-geo-alt text-muted"></i> ${item.location}</td>
            <td>
                <button class="btn btn-sm btn-warning text-white me-1 px-3 shadow-sm" onclick="editItem('${item.id}')">Edit</button>
                <button class="btn btn-sm btn-danger px-3 shadow-sm" onclick="deleteItem('${item.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Form Interception & CRUD Submission Handler
propertyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Custom Form Validation Rule Check
    if (titleInput.value.trim().length < 5) {
        document.getElementById("titleErr").classList.remove("d-none");
        titleInput.classList.add("is-invalid");
        return;
    } else {
        document.getElementById("titleErr").classList.add("d-none");
        titleInput.classList.remove("is-invalid");
    }

    // Set Button Loading State Reactively
    const originalBtnText = saveBtn.innerText;
    saveBtn.innerText = "Processing Transaction...";
    saveBtn.disabled = true;

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
            // Update Flow (PUT)
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if(!res.ok) throw new Error();
        } else {
            // Creation Flow (POST)
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if(!res.ok) throw new Error();
        }
        
        propertyForm.reset();
        resetFormState();
        await fetchAdminData();
    } catch (err) {
        alert("The server operational execution faulted.");
    } finally {
        saveBtn.innerText = originalBtnText;
        saveBtn.disabled = false;
    }
});

// Reactively Populate Fields For Editing
window.editItem = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error();
        const item = await response.json();
        
        propertyIdInput.value = item.id;
        titleInput.value = item.title;
        typeInput.value = item.type;
        priceInput.value = item.price;
        locationInput.value = item.location;
        imageInput.value = item.image;
        
        // Transform the form visual theme dynamically to notify user they are in edit mode
        formTitle.innerHTML = `<span class="text-warning">Modify Asset Data (ID: #${item.id})</span>`;
        saveBtn.innerText = "Commit Changes";
        saveBtn.className = "btn btn-warning text-white mt-3";
        cancelBtn.classList.remove("d-none");
        
        // Scroll smoothly to form container
        propertyForm.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
        alert("Could not load item details.");
    }
};

// Complete Asset Removal (DELETE)
window.deleteItem = async (id) => {
    if (confirm("Are you absolutely sure you want to drop this asset listing permanently from Matrix Estate?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if(!response.ok) throw new Error();
            await fetchAdminData();
        } catch (err) {
            alert("Removal action dropped by server engine.");
        }
    }
};

cancelBtn.addEventListener("click", () => {
    propertyForm.reset();
    resetFormState();
});

function resetFormState() {
    propertyIdInput.value = "";
    formTitle.innerText = "Add New Property to Matrix Estate";
    saveBtn.innerText = "Save Listing";
    saveBtn.className = "btn btn-primary mt-3";
    cancelBtn.classList.add("d-none");
}

document.addEventListener("DOMContentLoaded", fetchAdminData);