const API_URL = "http://localhost:3000/properties";
const propertyGrid = document.getElementById("propertyGrid");
const typeFilter = document.getElementById("typeFilter");
const searchBar = document.getElementById("searchBar");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");

let allProperties = []; // Local cache to handle super-fast reactive filtering
let debounceTimer;

// Fetch Properties from JSON Server
async function fetchProperties() {
    try {
        showLoading(true);
        errorState.classList.add("d-none");
        
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");

        allProperties = await response.json();
        renderProperties(allProperties);
    } catch (error) {
        errorState.classList.remove("d-none");
    } finally {
        showLoading(false);
    }
}

// Attractive & Reactive HTML Card Builder
function renderProperties(list) {
    propertyGrid.innerHTML = "";
    
    if (list.length === 0) {
        propertyGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-muted fs-4">No properties match your current search or filter criteria.</p>
            </div>`;
        return;
    }
    
    list.forEach(item => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0 dynamic-card position-relative overflow-hidden" style="transition: transform 0.2s, box-shadow 0.2s;">
                <span class="position-absolute top-0 end-0 m-3 badge ${item.type === 'Villa' ? 'bg-danger' : 'bg-primary'}">${item.type}</span>
                <img src="${item.image}" class="card-img-top" alt="${item.title}" style="height: 220px; object-fit: cover;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title text-dark fw-bold mb-1">${item.title}</h5>
                        <p class="text-muted small mb-3"><i class="bi bi-geo-alt"></i> ${item.location}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="fs-5 fw-bold text-success">$${Number(item.price).toLocaleString()}</span>
                        <button class="btn btn-sm btn-outline-dark px-3 rounded-pill">View Details</button>
                    </div>
                </div>
            </div>
        `;
        propertyGrid.appendChild(col);
    });
}

// Reactive Multi-Filter Combining Type Selector & Search Bar
function applyFilters() {
    const typeValue = typeFilter.value;
    const searchValue = searchBar.value.toLowerCase().trim();

    const filtered = allProperties.filter(property => {
        const matchesType = typeValue === "" || property.type === typeValue;
        const matchesSearch = property.title.toLowerCase().includes(searchValue) || 
                              property.location.toLowerCase().includes(searchValue);
        return matchesType && matchesSearch;
    });

    renderProperties(filtered);
}

// Debounce Function for Search Bar (Fulfills Recommended Bonus Feature)
searchBar.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        applyFilters();
    }, 300); // Wait 300ms after user stops typing to update UI reactively
});

// Dropdown change filter listener
typeFilter.addEventListener("change", applyFilters);

// Helper function to manage loading transitions
function showLoading(isLoading) {
    if (isLoading) {
        loadingState.classList.remove("d-none");
        propertyGrid.style.opacity = "0.4";
    } else {
        loadingState.classList.add("d-none");
        propertyGrid.style.opacity = "1";
    }
}

// Entry Point
document.addEventListener("DOMContentLoaded", fetchProperties);