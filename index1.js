const properties = [
    {
        id: 1,
        title: "Modern Apartment",
        price: 250000,
        location: "New Delhi",
        type: "apartment",
        description: "A modern apartment located in the heart of downtown with great amenities.",
        image: "img/1.jpg",
    },
    {
        id: 2,
        title: "Cozy Family House",
        price: 450000,
        location: "Bangalore",
        type: "house",
        description: "A spacious family home with a backyard in a quiet neighborhood.",
        image: "img/2.jpg",
    },
    {
        id: 3,
        title: "Luxury Villa with Ocean View",
        price: 650000,
        location: "Hyderabad",
        type: "villa",
        description: "Luxury villa offering stunning ocean views and high-end features.",
        image: "img/3.jpg"
    },
    {
        id: 4,
        title: "Stylish Apartment in the City",
        price: 550000,
        location: "Chennai",
        type: "apartment",
        description: "Stylish apartment with a rooftop view of the city.",
        image: "img/4.jpg",
    },
    {
        id: 5,
        title: "Simple Family House in the City",
        price: 550000,
        location: "Tirupati",
        type: "house",
        description: "Simple House For a Family.",
        image: "img/5.jpg",
    },
    {
        id: 6,
        title: "Stylish Apartment in the City",
        price: 550000,
        location: "Anantapur",
        type: "apartment",
        description: "Stylish apartment with all facilities.",
        image: "img/6.jpg",
    },
];

function renderProperties(filteredProperties) {
    const propertyList = document.getElementById("property-list");
    propertyList.innerHTML = '';

    filteredProperties.forEach(property => {
        const card = document.createElement("div");
        card.classList.add("property-card");

        card.innerHTML = `
            <img src="${property.image}" alt="${property.title}">
            <div class="card-body">
                <h5>${property.title}</h5>
                <p>${property.location}</p>
                <p><strong>Price:</strong> Rs.${property.price.toLocaleString('en-IN')}</p>
                <button onclick="showPropertyDetails(${property.id})">View Details</button>
            </div>
        `;
        propertyList.appendChild(card);
    });
}

function filterProperties() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase();
    const propertyType = document.getElementById("propertyType").value;
    const locationFilter = document.getElementById("locationFilter").value;
    const priceRange = document.getElementById("priceRange").value;

    const filtered = properties.filter(property => {
        return (
            (property.title.toLowerCase().includes(searchQuery) || property.location.toLowerCase().includes(searchQuery)) &&
            (!propertyType || property.type === propertyType) &&
            (!locationFilter || property.location === locationFilter) &&
            property.price <= priceRange
        );
    });

    renderProperties(filtered);
}

function showPropertyDetails(id) {
    const property = properties.find(p => p.id === id);
    if (property) {
        document.getElementById("modalTitle").innerText = property.title;
        document.getElementById("modalPrice").innerText = property.price.toLocaleString('en-IN');
        document.getElementById("modalLocation").innerText = property.location;
        document.getElementById("modalDescription").innerText = property.description;
        document.getElementById("modalImage").src = property.image;

        document.getElementById("propertyModal").style.display = "block";
    }
}

document.querySelector(".close").onclick = function () {
    document.getElementById("propertyModal").style.display = "none";
}

document.getElementById("priceRange").oninput = function () {
    document.getElementById("priceRangeText").innerText = `Price: Rs.${this.value}`;
    filterProperties();
};

document.getElementById("searchBar").addEventListener("input", filterProperties);
document.getElementById("propertyType").addEventListener("change", filterProperties);
document.getElementById("locationFilter").addEventListener("change", filterProperties);

renderProperties(properties);
