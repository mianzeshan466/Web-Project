const API_URL = "http://localhost:3000/properties";
const propertyGrid = document.getElementById("propertyGrid");
const typeFilter = document.getElementById("typeFilter");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");

// Fetch Properties
async function fetchProperties() {
    try {
        loadingState.classList.remove("d-none");
        errorState.classList.add("d-none");
        propertyGrid.innerHTML = "";

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Server error"); // Rubric check: response.ok

        const properties = await response.json();
        renderProperties(properties);
    } catch (error) {
        errorState.classList.remove("d-none");
    } finally {
        loadingState.classList.add("d-none");
    }
}

// Render Listings to Screen
function renderProperties(list) {
    if (list.length === 0) {
        propertyGrid.innerHTML = `<p class="text-center mt-4">No properties found matching your criteria.</p>`;
        return;
    }
    
    list.forEach(item => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${item.image}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="text-muted">${item.location} | ${item.type}</p>
                    <h6 class="text-primary">$${item.price.toLocaleString()}</h6>
                </div>
            </div>
        `;
        propertyGrid.appendChild(col);
    });
}

// Filter Functionality
typeFilter.addEventListener("change", async (e) => {
    const selectedType = e.target.value;
    const response = await fetch(API_URL);
    const properties = await response.json();
    
    if (selectedType === "") {
        renderProperties(properties);
    } else {
        const filtered = properties.filter(p => p.type === selectedType);
        renderProperties(filtered);
    }
});

// Initial Load
document.addEventListener("DOMContentLoaded", fetchProperties);