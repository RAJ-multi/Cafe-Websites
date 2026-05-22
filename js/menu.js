// js/menu.js

document.addEventListener("DOMContentLoaded", () => {

    const menuData = [
        {
            id: 1,
            name: "Classic Espresso",
            category: "coffee",
            price: 4.5,
            img: "../assets/images/coffee-1.jpg",
            desc: "Rich and bold single shot"
        },
        {
            id: 2,
            name: "Caramel Latte",
            category: "coffee",
            price: 5.8,
            img: "../assets/images/CaramelLatte.png",
            desc: "Sweet caramel with silky milk"
        },
        {
            id: 3,
            name: "Avocado Croissant",
            category: "pastries",
            price: 4.2,
            img: "../assets/images/AlmondCroissant.jpg",
            desc: "Buttery & flaky"
        },
        {
            id: 4,
            name: "Chocolate Fudge Cake",
            category: "pastries",
            price: 6.5,
            img: "../assets/images/ArtisanChocolateCake.jpg",
            desc: "Rich dark chocolate"
        },
        {
            id: 5,
            name: "Iced Cold Brew",
            category: "drinks",
            price: 5.0,
            img: "../assets/images/SignatureColdBrew.jpg",
            desc: "Smooth & refreshing"
        },
        {
            id: 6,
            name: "Matcha Latte",
            category: "drinks",
            price: 5.5,
            img: "../assets/images/MatchaLatte.png",
            desc: "Premium Japanese matcha"
        }
    ];

    const menuGrid = document.getElementById("menuGrid");
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    function renderMenuItems(filteredItems) {
        menuGrid.innerHTML = "";

        filteredItems.forEach(item => {
            const div = document.createElement("div");
            div.className = "menu-item";
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <div class="price">$${item.price}</div>
                </div>
                
                <div class="menu-overlay-hover">
                    <div class="menu-actions">
                        <button class="add-wishlist" data-id="${item.id}">♡ Wishlist</button>
                        <button class="buy-now" data-id="${item.id}">Buy Now</button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(div);
        });

        // Add event listeners
        document.querySelectorAll(".add-wishlist").forEach(btn => {
            btn.addEventListener("click", () => addToWishlist(parseInt(btn.dataset.id)));
        });

        document.querySelectorAll(".buy-now").forEach(btn => {
            btn.addEventListener("click", () => buyNow(parseInt(btn.dataset.id)));
        });
    }

    // Add to Wishlist
    function addToWishlist(id) {
        if (!isLoggedIn()) {
            showLoginModal();
            return;
        }

        const item = menuData.find(i => i.id === id);
        if (!wishlist.find(i => i.id === id)) {
            wishlist.push(item);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistUI();
            alert(`${item.name} added to wishlist!`);
        } else {
            alert("Already in wishlist!");
        }
    }

    // Buy Now
    function buyNow(id) {
        if (!isLoggedIn()) {
            showLoginModal();
            return;
        }
        const item = menuData.find(i => i.id === id);
        alert(`Proceeding to checkout for ${item.name} ($${item.price}) - Backend integration ready`);
        // Future: Redirect to checkout
    }

    function isLoggedIn() {
        return localStorage.getItem("nova_logged_in") === "true";
    }

    function showLoginModal() {
        const loginModal = document.getElementById("loginModal");
        if (loginModal) loginModal.classList.add("open");
    }

    // Wishlist Sidebar
    function updateWishlistUI() {
        const countEl = document.getElementById("wishlistCount");
        if (countEl) countEl.textContent = wishlist.length;
    }

    // Filter System
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.dataset.category;
            const filtered = category === "all" ? menuData : menuData.filter(item => item.category === category);
            renderMenuItems(filtered);
        });
    });

    // Initial Render
    renderMenuItems(menuData);
    updateWishlistUI();

});