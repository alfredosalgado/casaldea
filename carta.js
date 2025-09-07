// Menu data from menu.txt
const menuData = {
    hamburguesas: [
        {
            name: "Única",
            price: "$6.000",
            description: "Inspirado en la mejor burger del mundo 2025. 180g Burger, Queso Cheddar, BBQ de Mama, Chicharron, Cebolla Caramelizada, Salsa Queso Cheddar.",
            image: "burger-hero.jpg"
        },
        {
            name: "Casaldea",
            price: "$8.500",
            description: "180g Burger, Queso Cheddar, Lechuga Orgánica, Tomate Limachino, Cebolla Relish, Pickles, Mayo Secreta de Casa.",
            image: "burger-hero.jpg"
        },
        {
            name: "Satisfacción",
            price: "$8.500",
            description: "2x100g Burger, Doble Queso Cheddar, Doble Chicharron, Mayo Ahumada.",
            image: "burger-hero.jpg"
        },
        {
            name: "Estilo Animal",
            price: "$8.500",
            description: "180g Burger, Doble Queso Cheddar, Pernil, Cebolla Caramelizada.",
            image: "burger-hero.jpg"
        },
        {
            name: "La Madre de Stifler",
            price: "$8.500",
            description: "2x100g Burger, Doble Queso Cheddar, BBQ de Mama, Chicharron, Pickles.",
            image: "burger-hero.jpg"
        },
        {
            name: "Perdedor",
            price: "$8.500",
            description: "180g Burger, Queso Cheddar, Cebolla Caramelizada, Salsa Coreana Gochujang. (Ligeramente picante)",
            image: "burger-hero.jpg"
        },
        {
            name: "Milf",
            price: "$11.500",
            description: "(Solo 3 unidades diarias, consulta disponibilidad) 180g Burger, Queso Cheddar, Cecinabushi, Mantequilla Ahumada, Salsa de Yema de Huevo.",
            image: "burger-hero.jpg"
        },
        {
            name: "Cheese",
            price: "$5.000",
            description: "180g Burger, Doble Queso Cheddar.",
            image: "burger-hero.jpg"
        },
        {
            name: "Opción Vegetariana",
            price: "$5.000",
            description: "Tomate Asado, Aros de Cebolla Asada, Queso Cheddar, Lechuga Orgánica, Cebolla Caramelizada, Pickles, BBQ de Mama, Mayo Ahumada.",
            image: "burger-hero.jpg"
        },
        {
            name: "Burger Clásica",
            price: "$8.000",
            description: "180g Burger, Queso Cheddar, Lechuga, Tomate, Mayo Ahumada.",
            image: "burger-hero.jpg"
        }
    ],
    acompañamientos: [
        {
            name: "Papas Fritas Rústicas",
            price: "$5.000",
            description: "Papas cortadas cada mañana, fritas hasta el punto perfecto.",
            image: "burger-hero.jpg"
        },
        {
            name: "Papas Fritas Rústicas con Salsa Cheddar",
            price: "$6.000",
            description: "Nuestras papas rústicas acompañadas de nuestra deliciosa salsa cheddar.",
            image: "burger-hero.jpg"
        },
        {
            name: "Papas Fritas Rústicas Supremas Casaldea",
            price: "$8.500",
            description: "Papas Fritas, Salsa de Queso Cheddar, Tocino Souffle Crocante, Salsa de Tocino y Cilantro Decorativo.",
            image: "burger-hero.jpg"
        },
        {
            name: "Chorrillanas Casaldea",
            price: "$12.000",
            description: "Papas Fritas, Pernil, Longanizas de Chillán, Cebolla Caramelizada, 2 Huevos a la Plancha.",
            image: "burger-hero.jpg"
        },
        {
            name: "Costillar a lo Pobre",
            price: "$14.000",
            description: "Costillas de Cerdo Ahumadas Cortadas Individualmente y Cocinadas a la Parrilla. Decoradas con BBQ de Mama y Sésamo.",
            image: "burger-hero.jpg"
        }
    ],
    dulces: [
        {
            name: "Cheesecake de Frambuesa",
            price: "$5.000",
            description: "Delicioso cheesecake con un toque de frambuesa fresca.",
            image: "burger-hero.jpg"
        },
        {
            name: "Cheesecake Maracuyá",
            price: "$5.000",
            description: "Cheesecake cremoso con el sabor tropical del maracuyá.",
            image: "burger-hero.jpg"
        },
        {
            name: "Pie de Limón",
            price: "$5.000",
            description: "Clásico pie de limón con merengue perfectamente dorado.",
            image: "burger-hero.jpg"
        }
    ]
};

// Global variables
let currentCategory = 'hamburguesas';
let currentView = 'grid';
let expandedCard = null;

// Initialize the menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    setupEventListeners();
    setupScrollBehavior();
});

const initializeMenu = () => {
    // Check for URL hash to determine initial category
    let hash = window.location.hash.substring(1); // Remove the #
    
    // Decode URL component to handle special characters like ñ
    if (hash) {
        hash = decodeURIComponent(hash);
    }
    
    if (hash && menuData[hash]) {
        currentCategory = hash;
    }
    
    renderMenuItems(currentCategory);
    
    // Update active tab and section if category was changed from hash
    if (hash && menuData[hash]) {
        switchCategory(currentCategory);
    }
};

const setupEventListeners = () => {
    // Category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            switchCategory(category);
        });
    });

    // View toggle buttons
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.currentTarget.dataset.view;
            switchView(view);
        });
    });
};

const switchCategory = (category) => {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    // Update active section
    document.querySelectorAll('.category-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(category).classList.add('active');

    currentCategory = category;
    expandedCard = null; // Reset expanded card when switching categories
    renderMenuItems(category);
    
    // Apply current view state after rendering
    const gridView = document.getElementById(`${category}-grid`);
    const listView = document.getElementById(`${category}-list`);
    
    if (currentView === 'grid') {
        gridView.classList.remove('hidden');
        listView.classList.add('hidden');
    } else {
        gridView.classList.add('hidden');
        listView.classList.remove('hidden');
    }
};

const switchView = (view) => {
    // Update active toggle button
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');

    // Show/hide grid and list views
    const gridView = document.getElementById(`${currentCategory}-grid`);
    const listView = document.getElementById(`${currentCategory}-list`);

    if (view === 'grid') {
        gridView.classList.remove('hidden');
        listView.classList.add('hidden');
    } else {
        gridView.classList.add('hidden');
        listView.classList.remove('hidden');
    }

    currentView = view;
    expandedCard = null; // Reset expanded card when switching views
    renderMenuItems(currentCategory);
};

const renderMenuItems = (category) => {
    const items = menuData[category];
    const gridContainer = document.getElementById(`${category}-grid`);
    const listContainer = document.getElementById(`${category}-list`);

    // Clear containers
    gridContainer.innerHTML = '';
    listContainer.innerHTML = '';

    // Render grid view
    items.forEach((item, index) => {
        const cardElement = createCardElement(item, index, category);
        gridContainer.appendChild(cardElement);
    });

    // Render list view
    items.forEach((item, index) => {
        const listElement = createListElement(item, index);
        listContainer.appendChild(listElement);
    });
};

const createCardElement = (item, index, category) => {
    const card = document.createElement('div');
    card.className = `menu-card ${expandedCard === `${category}-${index}` ? 'expanded' : ''}`;
    card.dataset.cardId = `${category}-${index}`;

    const isExpanded = expandedCard === `${category}-${index}`;
    const isMobile = window.innerWidth <= 768;

    card.innerHTML = `
        <div class="card-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="card-content">
            <div class="card-header">
                <h3 class="card-title">${item.name}</h3>
                <span class="card-price">${item.price}</span>
                ${isMobile ? `<button class="expand-btn" onclick="toggleCard('${category}-${index}')">
                    <i class="fas ${isExpanded ? 'fa-minus' : 'fa-plus'}"></i>
                </button>` : ''}
            </div>
            <div class="card-description ${isMobile && !isExpanded ? 'hidden' : ''}">
                <p>${item.description}</p>
            </div>
        </div>
    `;

    return card;
};

const createListElement = (item, index) => {
    const listItem = document.createElement('div');
    listItem.className = 'menu-list-item';

    listItem.innerHTML = `
        <div class="list-item-content">
            <div class="list-item-info">
                <h3 class="list-item-title">${item.name}</h3>
                <p class="list-item-description">${item.description}</p>
            </div>
            <div class="list-item-price">${item.price}</div>
        </div>
        <div class="list-item-divider"></div>
    `;

    return listItem;
};

const toggleCard = (cardId) => {
    if (expandedCard === cardId) {
        expandedCard = null;
    } else {
        expandedCard = cardId;
    }
    renderMenuItems(currentCategory);
};

// Handle window resize
window.addEventListener('resize', () => {
    renderMenuItems(currentCategory);
});

// Scroll behavior for navbar hide/show
const setupScrollBehavior = () => {
    let lastScrollTop = 0;
    let isScrolling = false;
    const navbar = document.querySelector('.navbar');
    const mobileHeader = document.querySelector('.mobile-header-section');
    const stickyControls = document.querySelector('.sticky-controls');
    
    const handleScroll = () => {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = scrollTop - lastScrollTop;
            
            // Solo actuar si el scroll es significativo (más de 5px)
            if (Math.abs(scrollDelta) > 5) {
                if (scrollDelta > 0 && scrollTop > 100) {
                    // Scrolling down - hide navbar
                    if (navbar) navbar.classList.add('navbar-hidden');
                    if (mobileHeader) mobileHeader.classList.add('navbar-hidden');
                    if (stickyControls) stickyControls.classList.add('navbar-hidden');
                } else if (scrollDelta < 0) {
                    // Scrolling up - show navbar
                    if (navbar) navbar.classList.remove('navbar-hidden');
                    if (mobileHeader) mobileHeader.classList.remove('navbar-hidden');
                    if (stickyControls) stickyControls.classList.remove('navbar-hidden');
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }
            
            isScrolling = false;
        });
    };
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
};

// Mobile menu functionality is already handled by script.js
// No need to redeclare it here