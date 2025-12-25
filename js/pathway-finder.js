// Pathway Finder Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the pathway finder
    initPathwayFinder();
});

function initPathwayFinder() {
    // Elements
    const searchInput = document.getElementById('pathway-search');
    const categoryFilter = document.getElementById('category-filter');
    const searchBtn = document.getElementById('search-btn');
    const browseAllBtn = document.getElementById('browse-all-btn');
    const resultsSection = document.getElementById('results-section');
    const noResultsSection = document.getElementById('no-results');
    const pathwaysGrid = document.getElementById('pathways-grid');
    const resultsCount = document.getElementById('results-count');
    const reactionModal = document.getElementById('reaction-modal');
    const modalClose = document.getElementById('modal-close');

    // State
    let currentPage = 1;
    const itemsPerPage = 12;
    let currentReactions = [];
    let filteredReactions = [];

    // Initialize event listeners
    initializeEventListeners();

    // Load initial data
    loadAllReactions();

    function initializeEventListeners() {
        // Search functionality
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Category filter
        categoryFilter.addEventListener('change', performSearch);

        // Browse all button
        if (browseAllBtn) {
            browseAllBtn.addEventListener('click', function() {
                searchInput.value = '';
                categoryFilter.value = '';
                performSearch();
            });
        }

        // Modal close
        if (modalClose) {
            modalClose.addEventListener('click', closeReactionModal);
        }

        // Close modal when clicking outside
        if (reactionModal) {
            reactionModal.addEventListener('click', function(e) {
                if (e.target === reactionModal) {
                    closeReactionModal();
                }
            });
        }
    }

    function loadAllReactions() {
        try {
            currentReactions = window.reactionDatabase.getAllReactions();
            filteredReactions = [...currentReactions];
            displayResults(filteredReactions);
        } catch (error) {
            console.error('Error loading reactions:', error);
            showNoResults();
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;

        // Filter reactions
        filteredReactions = currentReactions.filter(reaction => {
            // Category filter
            if (category && reaction.category !== category) {
                return false;
            }

            // Search term filter
            if (searchTerm) {
                const searchableText = [
                    reaction.name,
                    ...(reaction.reactants || []),
                    ...(reaction.products || []),
                    ...(reaction.reagents || []),
                    reaction.category
                ].join(' ').toLowerCase();

                return searchableText.includes(searchTerm);
            }

            return true;
        });

        currentPage = 1;
        displayResults(filteredReactions);
    }

    function displayResults(reactions) {
        if (reactions.length === 0) {
            showNoResults();
            return;
        }

        // Update results count
        resultsCount.textContent = `${reactions.length} pathway${reactions.length !== 1 ? 's' : ''} found`;

        // Calculate pagination
        const totalPages = Math.ceil(reactions.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageReactions = reactions.slice(startIndex, endIndex);

        // Clear previous results
        pathwaysGrid.innerHTML = '';

        // Display reactions
        pageReactions.forEach(reaction => {
            const pathwayCard = createPathwayCard(reaction);
            pathwaysGrid.appendChild(pathwayCard);
        });

        // Update pagination
        updatePagination(totalPages);

        // Show results section
        resultsSection.style.display = 'block';
        noResultsSection.style.display = 'none';
    }

    function createPathwayCard(reaction) {
        const card = document.createElement('div');
        card.className = 'pathway-card';
        card.setAttribute('data-reaction-id', reaction.id);

        // Format reaction equation
        const reactantsText = (reaction.reactants || []).join(' + ');
        const productsText = (reaction.products || []).join(' + ');
        const equation = `${reactantsText} → ${productsText}`;

        card.innerHTML = `
            <div class="pathway-header">
                <h3 class="pathway-name">${reaction.name}</h3>
                <span class="pathway-category">${reaction.category}</span>
            </div>
            <div class="pathway-equation">${equation}</div>
            <div class="pathway-details">
                <div class="pathway-meta">
                    <span class="difficulty-badge difficulty-${reaction.difficulty?.toLowerCase() || 'intermediate'}">
                        ${reaction.difficulty || 'Intermediate'}
                    </span>
                    <span class="yield-info">Yield: ${reaction.metrics?.yield || 'N/A'}%</span>
                </div>
                <div class="pathway-actions">
                    <button class="btn btn-outline btn-small view-details-btn" data-id="${reaction.id}">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        `;

        // Add event listener for view details
        const viewBtn = card.querySelector('.view-details-btn');
        viewBtn.addEventListener('click', () => showReactionDetails(reaction.id));

        return card;
    }

    function updatePagination(totalPages) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        if (totalPages <= 1) return;

        // Previous button
        if (currentPage > 1) {
            const prevBtn = createPaginationButton('Previous', currentPage - 1);
            pagination.appendChild(prevBtn);
        }

        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = createPaginationButton(i.toString(), i);
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pagination.appendChild(pageBtn);
        }

        // Next button
        if (currentPage < totalPages) {
            const nextBtn = createPaginationButton('Next', currentPage + 1);
            pagination.appendChild(nextBtn);
        }
    }

    function createPaginationButton(text, page) {
        const button = document.createElement('button');
        button.className = 'pagination-btn';
        button.textContent = text;
        button.addEventListener('click', () => {
            currentPage = page;
            displayResults(filteredReactions);
        });
        return button;
    }

    function showReactionDetails(reactionId) {
        const reaction = window.reactionDatabase.getReactionById(reactionId);
        if (!reaction) return;

        const detailContainer = document.getElementById('reaction-detail');
        detailContainer.innerHTML = createReactionDetailHTML(reaction);

        reactionModal.classList.add('active');
    }

    function createReactionDetailHTML(reaction) {
        // Format reaction equation
        const reactantsHTML = (reaction.reactants || []).map(r => `<span class="molecule">${r}</span>`).join(' + ');
        const productsHTML = (reaction.products || []).map(p => `<span class="molecule">${p}</span>`).join(' + ');

        let html = `
            <div class="reaction-overview">
                <h3>${reaction.name}</h3>
                <div class="reaction-equation-large">
                    <div class="reactants">${reactantsHTML}</div>
                    <div class="arrow">→</div>
                    <div class="products">${productsHTML}</div>
                </div>
                <div class="reaction-meta">
                    <span class="category">${reaction.category}</span>
                    <span class="difficulty difficulty-${reaction.difficulty?.toLowerCase() || 'intermediate'}">${reaction.difficulty || 'Intermediate'}</span>
                </div>
            </div>

            <div class="reaction-sections">
        `;

        // Reagents
        if (reaction.reagents && reaction.reagents.length > 0) {
            html += `
                <div class="detail-section">
                    <h4>Reagents & Catalysts</h4>
                    <div class="reagents-list">
                        ${reaction.reagents.map(r => `<span class="reagent-tag">${r}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        // Conditions
        if (reaction.conditions) {
            html += `
                <div class="detail-section">
                    <h4>Reaction Conditions</h4>
                    <div class="conditions-grid">
                        ${reaction.conditions.temperature ? `<div class="condition">Temperature: ${reaction.conditions.temperature}${reaction.conditions.temperatureUnit || '°C'}</div>` : ''}
                        ${reaction.conditions.pressure ? `<div class="condition">Pressure: ${reaction.conditions.pressure} ${reaction.conditions.pressureUnit || 'atm'}</div>` : ''}
                        ${reaction.conditions.time ? `<div class="condition">Time: ${reaction.conditions.time} ${reaction.conditions.timeUnit || 'hours'}</div>` : ''}
                        ${reaction.conditions.solvent ? `<div class="condition">Solvent: ${reaction.conditions.solvent}</div>` : ''}
                    </div>
                </div>
            `;
        }

        // Metrics
        if (reaction.metrics) {
            html += `
                <div class="detail-section">
                    <h4>Reaction Metrics</h4>
                    <div class="metrics-grid">
                        ${reaction.metrics.yield ? `<div class="metric"><span class="metric-value">${reaction.metrics.yield}%</span><span class="metric-label">Yield</span></div>` : ''}
                        ${reaction.metrics.atomEconomy ? `<div class="metric"><span class="metric-value">${reaction.metrics.atomEconomy}%</span><span class="metric-label">Atom Economy</span></div>` : ''}
                    </div>
                </div>
            `;
        }

        // Mechanism - Display each step exactly as entered
        if (reaction.mechanism && reaction.mechanism.length > 0) {
            html += `
                <div class="detail-section">
                    <h4>Reaction Mechanism</h4>
                    <div class="mechanism-steps">
                        ${reaction.mechanism.map((step, index) => `
                            <div class="mechanism-step">
                                <div class="step-number">${index + 1}</div>
                                <div class="step-content">${step}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Alternate Pathways - Display each pathway exactly as entered
        if (reaction.alternatePathways && reaction.alternatePathways.length > 0) {
            html += `
                <div class="detail-section">
                    <h4>Alternate Pathways</h4>
                    <div class="alternate-pathways">
                        ${reaction.alternatePathways.map((pathway, index) => `
                            <div class="pathway-item">
                                <h5>Pathway ${index + 1}</h5>
                                ${pathway.method ? `<div class="pathway-method"><strong>Method:</strong> ${pathway.method}</div>` : ''}
                                ${pathway.reagents ? `<div class="pathway-reagents"><strong>Reagents:</strong> ${pathway.reagents}</div>` : ''}
                                ${pathway.advantages ? `<div class="pathway-advantages"><strong>Advantages:</strong> ${pathway.advantages}</div>` : ''}
                                ${pathway.disadvantages ? `<div class="pathway-disadvantages"><strong>Disadvantages:</strong> ${pathway.disadvantages}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        html += `
            </div>
        `;

        return html;
    }

    function closeReactionModal() {
        reactionModal.classList.remove('active');
    }

    function showNoResults() {
        resultsSection.style.display = 'none';
        noResultsSection.style.display = 'block';
    }
}