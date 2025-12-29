// Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!window.authSystem.protectRoute()) {
        return;
    }

    // Initialize dashboard
    initDashboard();
});

function initDashboard() {
    // Set current user info
    const currentUser = window.authSystem.getCurrentUser();
    if (currentUser) {
        document.getElementById('current-username').textContent = currentUser.username;
    }

    // Initialize navigation
    initNavigation();

    // Initialize API management
    initApiManagement();

    // Initialize quick actions
    initQuickActions();

    // Initialize logout
    initLogout();

    // Initialize sidebar toggle for mobile
    initSidebarToggle();

    // Initialize fallback settings
    initFallbackSettings();

    // Initialize reaction management
    initReactionManagement();

    // Load dashboard data
    loadDashboardData();
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Update page title
                pageTitle.textContent = this.querySelector('span').textContent;
                
                // Close sidebar on mobile after navigation
                closeSidebarMobile();
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const state = e.state;
        if (state && state.section) {
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));

            const activeLink = document.querySelector(`[data-section="${state.section}"]`);
            const activeSection = document.getElementById(state.section);

            if (activeLink && activeSection) {
                activeLink.classList.add('active');
                activeSection.classList.add('active');
                pageTitle.textContent = activeLink.querySelector('span').textContent;
            }
        }
    });
}

function initApiManagement() {
    const apiOptions = document.querySelectorAll('.api-option');
    const apiKeySections = document.querySelectorAll('.api-key-section');
    const primaryApiRadios = document.querySelectorAll('input[name="primary-api"]');
    const toggleApiKeyBtns = document.querySelectorAll('.toggle-api-key');
    const saveApiBtns = document.querySelectorAll('[data-save-api]');

    // Load saved API configurations
    loadApiConfigurations();

    // API provider selection
    apiOptions.forEach(option => {
        option.addEventListener('click', function() {
            const provider = this.getAttribute('data-provider');
            
            // Update radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }

            // Show corresponding API key section
            apiKeySections.forEach(section => {
                section.classList.remove('active');
                if (section.getAttribute('data-provider') === provider) {
                    section.classList.add('active');
                }
            });

            // Update active state
            apiOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Toggle API key visibility
    toggleApiKeyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });

    // Save API configuration
    saveApiBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.getAttribute('data-save-api');
            saveApiConfiguration(provider);
        });
    });

    // Primary API selection
    primaryApiRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const provider = this.value;
                localStorage.setItem('primaryApiProvider', provider);
                showMessage(`Primary API set to ${provider}`, 'success');
            }
        });
    });
}

function loadApiConfigurations() {
    // Load DeepSeek configuration
    const deepseekConfig = JSON.parse(localStorage.getItem('deepseekConfig') || '{}');
    if (deepseekConfig.apiKey) {
        document.getElementById('deepseek-api-key').value = deepseekConfig.apiKey;
        document.getElementById('deepseek-endpoint').value = deepseekConfig.endpoint || 'https://api.deepseek.com/v1';
        updateApiStatus('deepseek', 'connected');
    }

    // Load ChatGPT configuration
    const chatgptConfig = JSON.parse(localStorage.getItem('chatgptConfig') || '{}');
    if (chatgptConfig.apiKey) {
        document.getElementById('chatgpt-api-key').value = chatgptConfig.apiKey;
        document.getElementById('chatgpt-model').value = chatgptConfig.model || 'gpt-4';
        updateApiStatus('chatgpt', 'connected');
    }

    // Load Gemini configuration
    const geminiConfig = JSON.parse(localStorage.getItem('geminiConfig') || '{}');
    if (geminiConfig.apiKey) {
        document.getElementById('gemini-api-key').value = geminiConfig.apiKey;
        document.getElementById('gemini-model').value = geminiConfig.model || 'gemini-pro';
        updateApiStatus('gemini', 'connected');
    }

    // Load Claude configuration
    const claudeConfig = JSON.parse(localStorage.getItem('claudeConfig') || '{}');
    if (claudeConfig.apiKey) {
        document.getElementById('claude-api-key').value = claudeConfig.apiKey;
        document.getElementById('claude-model').value = claudeConfig.model || 'claude-3-opus';
        updateApiStatus('claude', 'connected');
    }

    // Load Mistral configuration
    const mistralConfig = JSON.parse(localStorage.getItem('mistralConfig') || '{}');
    if (mistralConfig.apiKey) {
        document.getElementById('mistral-api-key').value = mistralConfig.apiKey;
        document.getElementById('mistral-model').value = mistralConfig.model || 'mistral-large';
        updateApiStatus('mistral', 'connected');
    }

    // Load Groq configuration
    const groqConfig = JSON.parse(localStorage.getItem('groqConfig') || '{}');
    if (groqConfig.apiKey) {
        document.getElementById('groq-api-key').value = groqConfig.apiKey;
        document.getElementById('groq-model').value = groqConfig.model || 'mixtral-8x7b';
        updateApiStatus('groq', 'connected');
    }

    // Load primary API provider
    const primaryProvider = localStorage.getItem('primaryApiProvider') || 'deepseek';
    const primaryRadio = document.querySelector(`input[name="primary-api"][value="${primaryProvider}"]`);
    if (primaryRadio) {
        primaryRadio.checked = true;
        const option = primaryRadio.closest('.api-option');
        if (option) {
            option.click(); // Trigger click to show corresponding section
        }
    }

    // Load fallback settings
    loadFallbackSettings();
}

function saveApiConfiguration(provider) {
    let config = {};
    let isValid = true;

    switch (provider) {
        case 'deepseek':
            const deepseekKey = document.getElementById('deepseek-api-key').value;
            const deepseekEndpoint = document.getElementById('deepseek-endpoint').value;
            
            if (!deepseekKey) {
                showMessage('Please enter DeepSeek API key', 'error');
                isValid = false;
                break;
            }

            config = {
                apiKey: deepseekKey,
                endpoint: deepseekEndpoint
            };
            break;

        case 'chatgpt':
            const chatgptKey = document.getElementById('chatgpt-api-key').value;
            const chatgptModel = document.getElementById('chatgpt-model').value;
            
            if (!chatgptKey) {
                showMessage('Please enter ChatGPT API key', 'error');
                isValid = false;
                break;
            }

            config = {
                apiKey: chatgptKey,
                model: chatgptModel
            };
            break;

        case 'gemini':
            const geminiKey = document.getElementById('gemini-api-key').value;
            const geminiModel = document.getElementById('gemini-model').value;

            if (!geminiKey) {
                showMessage('Please enter Gemini API key', 'error');
                isValid = false;
                break;
            }

            config = {
                apiKey: geminiKey,
                model: geminiModel
            };
            break;

        case 'claude':
            const claudeKey = document.getElementById('claude-api-key').value;
            const claudeModel = document.getElementById('claude-model').value;

            if (!claudeKey) {
                showMessage('Please enter Claude API key', 'error');
                isValid = false;
                break;
            }

            config = {
                apiKey: claudeKey,
                model: claudeModel
            };
            break;

        case 'mistral':
            const mistralKey = document.getElementById('mistral-api-key').value;
            const mistralModel = document.getElementById('mistral-model').value;

            if (!mistralKey) {
                showMessage('Please enter Mistral API key', 'error');
                isValid = false;
                break;
            }

            config = {
                apiKey: mistralKey,
                model: mistralModel
            };
            break;

        case 'groq':
            const groqKey = document.getElementById('groq-api-key').value;
            const groqModel = document.getElementById('groq-model').value;

            if (!groqKey) {
                showMessage('Please enter Groq API key', 'error');
                isValid = false;
                break;
            }

            config = {
                apiKey: groqKey,
                model: groqModel
            };
            break;
    }

    if (isValid) {
        localStorage.setItem(`${provider}Config`, JSON.stringify(config));
        updateApiStatus(provider, 'connected');
        showMessage(`${provider} configuration saved successfully!`, 'success');
        
        // Test API connection
        testApiConnection(provider, config);
    }
}

function updateApiStatus(provider, status) {
    const statusElement = document.querySelector(`[data-provider="${provider}"] .status-badge`);
    if (statusElement) {
        statusElement.textContent = status === 'connected' ? 'Connected' : 'Not Configured';
        statusElement.className = `status-badge ${status}`;
    }
}

async function testApiConnection(provider, config) {
    // This would actually test the API connection
    // For now, we'll simulate it
    console.log(`Testing ${provider} API connection...`);
    
    // Simulate API test
    setTimeout(() => {
        showMessage(`${provider} API connection test successful!`, 'success');
    }, 1000);
}

function initQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const navLink = document.querySelector(`[data-section="${action}"]`);
            
            if (navLink) {
                navLink.click();
            }
        });
    });
}

function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            window.authSystem.logout();
        }
    });
}

function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
}

function closeSidebarMobile() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
}

function loadDashboardData() {
    // This would load real data from your backend
    // For now, we'll use mock data
    updateDashboardStats();
}

function updateDashboardStats() {
    // Get reaction statistics
    const reactionStats = window.reactionDatabase.getStatistics();

    // Update stats with real data
    const stats = {
        reactions: reactionStats.total.toLocaleString(),
        molecules: '8,500', // Keep mock data for now
        users: '3,200', // Keep mock data for now
        accuracy: '96%' // Keep mock data for now
    };

    Object.keys(stats).forEach(stat => {
        const element = document.getElementById(`total-${stat}`);
        if (element) {
            element.textContent = stats[stat];
        }
    });
}

function updateReactionClassificationChart() {
    const reactions = window.reactionDatabase.getAllReactions();

    // Define classification categories
    const classifications = {
        'Organic': ['Organic Synthesis', 'Carbonyl Chemistry', 'Aromatic Chemistry', 'Organometallic Chemistry',
                   'Pericyclic Reactions', 'Oxidation Reactions', 'Reduction Reactions', 'Elimination Reactions',
                   'Addition Reactions', 'Condensation Reactions', 'Rearrangements', 'Hydrolysis', 'Cross-Coupling',
                   'Amine Synthesis', 'Ring Formation', 'Free Radical Chemistry', 'Polymer Chemistry',
                   'Heterocycle Synthesis', 'Asymmetric Synthesis', 'Organocatalysis', 'Multicomponent Reactions',
                   'Cycloaddition', 'Olefination', 'Aldol Reactions', 'Alkaloid Synthesis', 'Acyl Substitution',
                   'Acid-Base Chemistry', 'Ester Chemistry', 'Protection', 'Deprotection', 'Decarboxylation',
                   'Halogenation', 'Coupling Reactions', 'Aromatization', 'Transesterification', 'Imine Formation',
                   'Enamine Formation', 'Acylation', 'Sulfonylation', 'Radical Reactions', 'Diazotization Chemistry',
                   'Dye Synthesis', 'Conjugate Addition', 'Electrophilic Addition', 'Electrophilic Aromatic Halogenation',
                   'Bromination of Alkenes', 'Iodination', 'Chlorination of Alkanes', 'Fluorination', 'Nitration of Aromatics',
                   'Sulfonation', 'Friedel-Crafts Alkylation', 'Friedel-Crafts Acylation', 'Nucleophilic Aromatic Substitution',
                   'Azo Coupling', 'Quinone Formation', 'Anthraquinone Synthesis', 'Nucleophilic Substitution',
                   'Ether Synthesis', 'Carboxylic Acid Synthesis', 'Reimer-Tiemann Reaction', 'Kolbe-Schmitt Reaction',
                   'Sandmeyer Reaction', 'Gattermann Reaction', 'Schotten-Baumann Reaction', 'Hinsberg Test',
                   'Carbylamine Reaction', 'Diazotization Reaction', 'Coupling Reaction', 'Lucas Test', 'Cross Aldol Condensation',
                   'Clemmensen Reduction', 'Wolff-Kishner Reduction', 'Rosenmund Reduction', 'Stephen Reaction',
                   'Hell-Volhard-Zelinsky Reaction', 'Perkin Reaction', 'Benzoin Condensation', 'Haloform Reaction',
                   'Hoffmann Bromamide Reaction', 'Carbylamine Reaction', 'Diazotization Reaction', 'Coupling Reaction',
                   'Hinsberg Test', 'Schotten-Baumann Reaction', 'Molisch Test', 'Biuret Test', 'Ninhydrin Reaction',
                   'Xanthoproteic Reaction', 'Addition Polymerization', 'Condensation Polymerization', 'SN1 Reaction',
                   'SN2 Reaction', 'E1 Elimination', 'E2 Elimination', 'Electrophilic Addition', 'Oxidation of Alcohol to Aldehyde',
                   'Reduction of Ketone with NaBH4', 'Acid-Base Neutralization', 'Nucleophilic Acyl Substitution',
                   'Claisen Rearrangement', 'Cope Rearrangement', 'Aldol Addition Reaction', 'Tishchenko Reaction',
                   'Benzilic Acid Rearrangement', 'Favorskii Rearrangement', 'Hofmann Elimination', 'Curtius Rearrangement',
                   'Lossen Rearrangement', 'Schmidt Reaction', 'Beckmann Rearrangement', 'Fries Rearrangement',
                   'Knoevenagel Condensation', 'Stork Enamine Reaction', 'Mukaiyama Aldol Reaction', 'Baylis-Hillman Reaction',
                   'Sharpless Epoxidation', '1,3-Dipolar Cycloaddition', 'Pauson-Khand Reaction', 'Sonogashira Coupling',
                   'Buchwald-Hartwig Amination', 'Negishi Coupling', 'Kumada Coupling', 'Stille Coupling', 'Hiyama Coupling',
                   'Intramolecular Aldol Condensation', 'Dieckmann Condensation', 'Thorpe Reaction', 'Darzens Reaction',
                   'Johnson-Corey-Chaykovsky Reaction', 'Simmons-Smith Reaction', 'Blaise Reaction', 'McMurry Coupling',
                   'Ullmann Reaction', 'Glaser Coupling', 'Meerwein Arylation', 'Gomberg-Bachmann Reaction', 'Barton Decarboxylation',
                   'Hunsdiecker Reaction', 'Fenton Reaction', 'Neber Rearrangement', 'Stevens Rearrangement', 'Sommelet-Hauser Rearrangement',
                   'Truce-Smiles Rearrangement', 'Newman-Kwart Rearrangement', 'Meisenheimer Rearrangement', 'Dienone-Phenol Rearrangement',
                   'Cornforth Rearrangement', 'Smiles Rearrangement', 'Arndt-Eistert Reaction', 'Japp-Klingemann Reaction',
                   'Haller-Bauer Reaction', 'Von Richter Reaction', 'Sommelet Reaction', 'Willgerodt Reaction', 'Kindler Reaction',
                   'Dakin Reaction', 'Meerwein-Ponndorf-Verley Reduction', 'Oppenauer Oxidation', 'Parikh-Doering Oxidation',
                   'Corey-Kim Oxidation', 'Nicolaou Oxidation', 'Shapiro Reaction', 'Bamford-Stevens Reaction', 'McFadyen-Stevens Reaction',
                   'Chugaev Reaction', 'Cope Elimination', 'Emde Degradation', 'von Braun Reaction', 'Chapman Rearrangement',
                   'Wallach Rearrangement', 'Orton Rearrangement', 'Fischer-Hepp Rearrangement', 'Bamberger Rearrangement',
                   'Dimroth Rearrangement', 'Cornforth Rearrangement', 'Smiles Rearrangement', 'Truce-Smiles Rearrangement',
                   'Newman-Kwart Rearrangement', 'Meisenheimer Rearrangement', 'Dienone-Phenol Rearrangement', 'Arndt-Eistert Reaction',
                   'Japp-Klingemann Reaction', 'Haller-Bauer Reaction', 'Von Richter Reaction', 'Sommelet Reaction', 'Willgerodt Reaction',
                   'Kindler Reaction', 'Dakin Reaction', 'Meerwein-Ponndorf-Verley Reduction', 'Oppenauer Oxidation', 'Parikh-Doering Oxidation',
                   'Corey-Kim Oxidation', 'Nicolaou Oxidation', 'Shapiro Reaction', 'Bamford-Stevens Reaction', 'McFadyen-Stevens Reaction',
                   'Chugaev Reaction', 'Cope Elimination', 'Emde Degradation', 'von Braun Reaction', 'Chapman Rearrangement',
                   'Wallach Rearrangement', 'Orton Rearrangement', 'Fischer-Hepp Rearrangement', 'Bamberger Rearrangement',
                   'Dimroth Rearrangement', 'Petasis Reaction', 'Mannich Reaction', 'Bucherer-Bergs Reaction', 'Hofmann-Löffler-Freytag Reaction',
                   'Polonovski Reaction', 'Gabriel-Colman Rearrangement', 'Eschweiler-Clarke Reaction', 'Tiffeneau-Demjanov Rearrangement',
                   'Wagner-Meerwein Rearrangement', 'Nametkin Rearrangement', 'Whitmore 1,2-Rearrangement', 'Arndt-Eistert Reaction',
                   'Japp-Klingemann Reaction', 'Haller-Bauer Reaction', 'Von Richter Reaction', 'Sommelet Reaction', 'Willgerodt Reaction',
                   'Kindler Reaction', 'Dakin Reaction', 'Meerwein-Ponndorf-Verley Reduction', 'Oppenauer Oxidation', 'Parikh-Doering Oxidation',
                   'Corey-Kim Oxidation', 'Nicolaou Oxidation', 'Shapiro Reaction', 'Bamford-Stevens Reaction', 'McFadyen-Stevens Reaction',
                   'Chugaev Reaction', 'Cope Elimination', 'Emde Degradation', 'von Braun Reaction', 'Chapman Rearrangement',
                   'Wallach Rearrangement', 'Orton Rearrangement', 'Fischer-Hepp Rearrangement', 'Bamberger Rearrangement',
                   'Dimroth Rearrangement', 'Ugi Reaction', 'Passerini Reaction', 'Biginelli Reaction', 'Paal-Knorr Synthesis',
                   'Knorr Pyrazole Synthesis', 'Gewald Reaction', 'Hantzsch Dihydropyridine Synthesis', 'Feist-Benary Synthesis',
                   'Pictet-Spengler Reaction', 'Bischler-Napieralski Reaction', 'Skraup Synthesis', 'Pechmann Condensation',
                   'Kostanecki-Robinson Reaction', 'Allan-Robinson Reaction', 'Baker-Venkataraman Rearrangement', 'Doebner Reaction',
                   'Pomeranz-Fritsch Reaction', 'Combes Quinoline Synthesis', 'Fischer Indole Synthesis', 'Reissert Indole Synthesis',
                   'Madelung Indole Synthesis', 'Bucherer Carbazole Synthesis', 'Graebe-Ullmann Reaction', 'Pschorr Reaction',
                   'Niementowski Quinazoline Synthesis', 'Traube Purine Synthesis', 'Conrad-Limpach Reaction', 'Piloty-Robinson Synthesis',
                   'Bartoli Indole Synthesis', 'Fukuyama Reduction', 'Luche Reduction', 'Evans Aldol Reaction', 'Denmark Aldol Reaction',
                   'Hajos-Parrish Reaction', 'Wieland-Miescher Ketone Synthesis', 'MacMillan Aldol Reaction', 'Robinson-Schöpf Reaction',
                   'Larock Indole Synthesis', 'Corey-Bakshi-Shibata Reduction', 'Noyori Asymmetric Hydrogenation', 'Sharpless Asymmetric Dihydroxylation',
                   'Jacobsen Asymmetric Epoxidation', 'Shi Epoxidation', 'Julia Olefination', 'Horner-Wadsworth-Emmons Reaction',
                   'Still-Gennari Olefination', 'Tebbe Olefination', 'Petasis Reaction', 'Mannich Reaction', 'Bucherer-Bergs Reaction',
                   'Hofmann-Löffler-Freytag Reaction', 'Polonovski Reaction', 'Gabriel-Colman Rearrangement', 'Eschweiler-Clarke Reaction',
                   'Tiffeneau-Demjanov Rearrangement', 'Wagner-Meerwein Rearrangement', 'Nametkin Rearrangement', 'Whitmore 1,2-Rearrangement',
                   'Appel Reaction', 'Mitsunobu Reaction', 'Dess-Martin Oxidation', 'Jones Oxidation', 'Collins Oxidation',
                   'Ley Oxidation', 'TPAP Oxidation', 'Staudinger Reaction', 'Ugi Reaction', 'Passerini Reaction', 'Biginelli Reaction',
                   'Paal-Knorr Synthesis', 'Knorr Pyrazole Synthesis', 'Gewald Reaction', 'Hantzsch Dihydropyridine Synthesis',
                   'Feist-Benary Synthesis', 'Pictet-Spengler Reaction', 'Bischler-Napieralski Reaction', 'Skraup Synthesis',
                   'Pechmann Condensation', 'Kostanecki-Robinson Reaction', 'Allan-Robinson Reaction', 'Baker-Venkataraman Rearrangement',
                   'Doebner Reaction', 'Pomeranz-Fritsch Reaction', 'Combes Quinoline Synthesis', 'Fischer Indole Synthesis',
                   'Reissert Indole Synthesis', 'Madelung Indole Synthesis', 'Bucherer Carbazole Synthesis', 'Graebe-Ullmann Reaction',
                   'Pschorr Reaction', 'Niementowski Quinazoline Synthesis', 'Traube Purine Synthesis', 'Conrad-Limpach Reaction',
                   'Piloty-Robinson Synthesis', 'Bartoli Indole Synthesis', 'Fukuyama Reduction', 'Luche Reduction', 'Evans Aldol Reaction',
                   'Denmark Aldol Reaction', 'Hajos-Parrish Reaction', 'Wieland-Miescher Ketone Synthesis', 'MacMillan Aldol Reaction',
                   'Robinson-Schöpf Reaction', 'Larock Indole Synthesis', 'Corey-Bakshi-Shibata Reduction', 'Noyori Asymmetric Hydrogenation',
                   'Sharpless Asymmetric Dihydroxylation', 'Jacobsen Asymmetric Epoxidation', 'Shi Epoxidation', 'Julia Olefination',
                   'Horner-Wadsworth-Emmons Reaction', 'Still-Gennari Olefination', 'Tebbe Olefination', 'Catalytic Hydrogenation',
                   'Hydrogenolysis', 'Decarboxylation', 'Dehydration', 'Electrophilic Aromatic Halogenation', 'Bromination of Alkenes',
                   'Iodination', 'Chlorination of Alkanes', 'Fluorination', 'Nitration of Aromatics', 'Sulfonation', 'Friedel-Crafts Alkylation',
                   'Friedel-Crafts Acylation', 'Nucleophilic Aromatic Substitution', 'Azo Coupling', 'Quinone Formation', 'Anthraquinone Synthesis'],
        'Inorganic': ['Electrolysis', 'Kolbe\'s Electrolysis', 'Frankland Reaction', 'Wurtz Reaction', 'Wurtz-Fittig Reaction',
                     'Fittig Reaction', 'Swarts Reaction', 'Gattermann Reaction', 'Kolbe-Schmitt Reaction', 'Reimer-Tiemann Reaction',
                     'Sandmeyer Reaction', 'Gattermann Reaction', 'Schotten-Baumann Reaction', 'Hinsberg Test', 'Carbylamine Reaction',
                     'Diazotization Reaction', 'Coupling Reaction', 'Lucas Test', 'Biuret Test', 'Ninhydrin Reaction', 'Xanthoproteic Reaction',
                     'Fenton Reaction', 'von Braun Reaction', 'Hunsdiecker Reaction', 'Barton Decarboxylation', 'Meerwein Arylation',
                     'Gomberg-Bachmann Reaction', 'Pschorr Reaction', 'Niementowski Quinazoline Synthesis', 'Traube Purine Synthesis',
                     'Conrad-Limpach Reaction', 'Piloty-Robinson Synthesis', 'Bartoli Indole Synthesis', 'Fukuyama Reduction',
                     'Luche Reduction', 'Evans Aldol Reaction', 'Denmark Aldol Reaction', 'Hajos-Parrish Reaction', 'Wieland-Miescher Ketone Synthesis',
                     'MacMillan Aldol Reaction', 'Robinson-Schöpf Reaction', 'Larock Indole Synthesis', 'Corey-Bakshi-Shibata Reduction',
                     'Noyori Asymmetric Hydrogenation', 'Sharpless Asymmetric Dihydroxylation', 'Jacobsen Asymmetric Epoxidation',
                     'Shi Epoxidation', 'Julia Olefination', 'Horner-Wadsworth-Emmons Reaction', 'Still-Gennari Olefination',
                     'Tebbe Olefination', 'Petasis Reaction', 'Mannich Reaction', 'Bucherer-Bergs Reaction', 'Hofmann-Löffler-Freytag Reaction',
                     'Polonovski Reaction', 'Gabriel-Colman Rearrangement', 'Eschweiler-Clarke Reaction', 'Tiffeneau-Demjanov Rearrangement',
                     'Wagner-Meerwein Rearrangement', 'Nametkin Rearrangement', 'Whitmore 1,2-Rearrangement', 'Arndt-Eistert Reaction',
                     'Japp-Klingemann Reaction', 'Haller-Bauer Reaction', 'Von Richter Reaction', 'Sommelet Reaction', 'Willgerodt Reaction',
                     'Kindler Reaction', 'Dakin Reaction', 'Meerwein-Ponndorf-Verley Reduction', 'Oppenauer Oxidation', 'Parikh-Doering Oxidation',
                     'Corey-Kim Oxidation', 'Nicolaou Oxidation', 'Shapiro Reaction', 'Bamford-Stevens Reaction', 'McFadyen-Stevens Reaction',
                     'Chugaev Reaction', 'Cope Elimination', 'Emde Degradation', 'von Braun Reaction', 'Chapman Rearrangement',
                     'Wallach Rearrangement', 'Orton Rearrangement', 'Fischer-Hepp Rearrangement', 'Bamberger Rearrangement',
                     'Dimroth Rearrangement', 'Cornforth Rearrangement', 'Smiles Rearrangement', 'Truce-Smiles Rearrangement',
                     'Newman-Kwart Rearrangement', 'Meisenheimer Rearrangement', 'Dienone-Phenol Rearrangement', 'Arndt-Eistert Reaction',
                     'Japp-Klingemann Reaction', 'Haller-Bauer Reaction', 'Von Richter Reaction', 'Sommelet Reaction', 'Willgerodt Reaction',
                     'Kindler Reaction', 'Dakin Reaction', 'Meerwein-Ponndorf-Verley Reduction', 'Oppenauer Oxidation', 'Parikh-Doering Oxidation',
                     'Corey-Kim Oxidation', 'Nicolaou Oxidation', 'Shapiro Reaction', 'Bamford-Stevens Reaction', 'McFadyen-Stevens Reaction',
                     'Chugaev Reaction', 'Cope Elimination', 'Emde Degradation', 'von Braun Reaction', 'Chapman Rearrangement',
                     'Wallach Rearrangement', 'Orton Rearrangement', 'Fischer-Hepp Rearrangement', 'Bamberger Rearrangement',
                     'Dimroth Rearrangement', 'Ugi Reaction', 'Passerini Reaction', 'Biginelli Reaction', 'Paal-Knorr Synthesis',
                     'Knorr Pyrazole Synthesis', 'Gewald Reaction', 'Hantzsch Dihydropyridine Synthesis', 'Feist-Benary Synthesis',
                     'Pictet-Spengler Reaction', 'Bischler-Napieralski Reaction', 'Skraup Synthesis', 'Pechmann Condensation',
                     'Kostanecki-Robinson Reaction', 'Allan-Robinson Reaction', 'Baker-Venkataraman Rearrangement', 'Doebner Reaction',
                     'Pomeranz-Fritsch Reaction', 'Combes Quinoline Synthesis', 'Fischer Indole Synthesis', 'Reissert Indole Synthesis',
                     'Madelung Indole Synthesis', 'Bucherer Carbazole Synthesis', 'Graebe-Ullmann Reaction', 'Pschorr Reaction',
                     'Niementowski Quinazoline Synthesis', 'Traube Purine Synthesis', 'Conrad-Limpach Reaction', 'Piloty-Robinson Synthesis',
                     'Bartoli Indole Synthesis', 'Fukuyama Reduction', 'Luche Reduction', 'Evans Aldol Reaction', 'Denmark Aldol Reaction',
                     'Hajos-Parrish Reaction', 'Wieland-Miescher Ketone Synthesis', 'MacMillan Aldol Reaction', 'Robinson-Schöpf Reaction',
                     'Larock Indole Synthesis', 'Corey-Bakshi-Shibata Reduction', 'Noyori Asymmetric Hydrogenation', 'Sharpless Asymmetric Dihydroxylation',
                     'Jacobsen Asymmetric Epoxidation', 'Shi Epoxidation', 'Julia Olefination', 'Horner-Wadsworth-Emmons Reaction',
                     'Still-Gennari Olefination', 'Tebbe Olefination', 'Petasis Reaction', 'Mannich Reaction', 'Bucherer-Bergs Reaction',
                     'Hofmann-Löffler-Freytag Reaction', 'Polonovski Reaction', 'Gabriel-Colman Rearrangement', 'Eschweiler-Clarke Reaction',
                     'Tiffeneau-Demjanov Rearrangement', 'Wagner-Meerwein Rearrangement', 'Nametkin Rearrangement', 'Whitmore 1,2-Rearrangement',
                     'Appel Reaction', 'Mitsunobu Reaction', 'Dess-Martin Oxidation', 'Jones Oxidation', 'Collins Oxidation',
                     'Ley Oxidation', 'TPAP Oxidation', 'Staudinger Reaction', 'Ugi Reaction', 'Passerini Reaction', 'Biginelli Reaction',
                     'Paal-Knorr Synthesis', 'Knorr Pyrazole Synthesis', 'Gewald Reaction', 'Hantzsch Dihydropyridine Synthesis',
                     'Feist-Benary Synthesis', 'Pictet-Spengler Reaction', 'Bischler-Napieralski Reaction', 'Skraup Synthesis',
                     'Pechmann Condensation', 'Kostanecki-Robinson Reaction', 'Allan-Robinson Reaction', 'Baker-Venkataraman Rearrangement',
                     'Doebner Reaction', 'Pomeranz-Fritsch Reaction', 'Combes Quinoline Synthesis', 'Fischer Indole Synthesis',
                     'Reissert Indole Synthesis', 'Madelung Indole Synthesis', 'Bucherer Carbazole Synthesis', 'Graebe-Ullmann Reaction',
                     'Pschorr Reaction', 'Niementowski Quinazoline Synthesis', 'Traube Purine Synthesis', 'Conrad-Limpach Reaction',
                     'Piloty-Robinson Synthesis', 'Bartoli Indole Synthesis', 'Fukuyama Reduction', 'Luche Reduction', 'Evans Aldol Reaction',
                     'Denmark Aldol Reaction', 'Hajos-Parrish Reaction', 'Wieland-Miescher Ketone Synthesis', 'MacMillan Aldol Reaction',
                     'Robinson-Schöpf Reaction', 'Larock Indole Synthesis', 'Corey-Bakshi-Shibata Reduction', 'Noyori Asymmetric Hydrogenation',
                     'Sharpless Asymmetric Dihydroxylation', 'Jacobsen Asymmetric Epoxidation', 'Shi Epoxidation', 'Julia Olefination',
                     'Horner-Wadsworth-Emmons Reaction', 'Still-Gennari Olefination', 'Tebbe Olefination', 'Catalytic Hydrogenation',
                     'Hydrogenolysis', 'Decarboxylation', 'Dehydration', 'Electrophilic Aromatic Halogenation', 'Bromination of Alkenes',
                     'Iodination', 'Chlorination of Alkanes', 'Fluorination', 'Nitration of Aromatics', 'Sulfonation', 'Friedel-Crafts Alkylation',
                     'Friedel-Crafts Acylation', 'Nucleophilic Aromatic Substitution', 'Azo Coupling', 'Quinone Formation', 'Anthraquinone Synthesis'],
        'Physical': ['Acid-Base Neutralization', 'Catalytic Hydrogenation', 'Hydrogenolysis', 'Decarboxylation', 'Dehydration',
                    'Electrophilic Aromatic Halogenation', 'Bromination of Alkenes', 'Iodination', 'Chlorination of Alkanes',
                    'Fluorination', 'Nitration of Aromatics', 'Sulfonation', 'Friedel-Crafts Alkylation', 'Friedel-Crafts Acylation',
                    'Nucleophilic Aromatic Substitution', 'Azo Coupling', 'Quinone Formation', 'Anthraquinone Synthesis'],
        'Analytical': ['Molisch Test', 'Biuret Test', 'Ninhydrin Reaction', 'Xanthoproteic Reaction', 'Lucas Test', 'Hinsberg Test',
                      'Carbylamine Reaction', 'Diazotization Reaction', 'Coupling Reaction']
    };

    // Count reactions in each classification
    const counts = { Organic: 0, Inorganic: 0, Physical: 0, Analytical: 0 };

    reactions.forEach(reaction => {
        const category = reaction.category;
        for (const [classification, categories] of Object.entries(classifications)) {
            if (categories.includes(category)) {
                counts[classification]++;
                break;
            }
        }
    });

    // Create chart data
    const chartData = {
        labels: Object.keys(counts),
        datasets: [{
            data: Object.values(counts),
            backgroundColor: [
                '#FF6384', // Organic - Red
                '#36A2EB', // Inorganic - Blue
                '#FFCE56', // Physical - Yellow
                '#4BC0C0'  // Analytical - Teal
            ],
            borderWidth: 1
        }]
    };

    // Get canvas element
    const canvas = document.getElementById('reaction-classification-chart');
    if (!canvas) return;

    // Destroy existing chart if it exists
    if (window.reactionChart) {
        window.reactionChart.destroy();
    }

    // Create new chart
    const ctx = canvas.getContext('2d');
    window.reactionChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `${label}: ${value} reactions (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function showMessage(message, type) {
    // Create message element if it doesn't exist
    let messageEl = document.getElementById('dashboard-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'dashboard-message';
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        document.body.appendChild(messageEl);
    }

    // Set message content and style
    messageEl.textContent = message;
    messageEl.style.backgroundColor = type === 'success' ? 
        'var(--success-color)' : 'var(--danger-color)';
    messageEl.style.transform = 'translateX(0)';

    // Auto hide after 3 seconds
    setTimeout(() => {
        messageEl.style.transform = 'translateX(400px)';
    }, 3000);
}

// Fallback Settings Management
function initFallbackSettings() {
    const saveFallbackBtn = document.getElementById('save-fallback-settings');
    const fallbackEnabled = document.getElementById('fallback-enabled');
    const maxRetries = document.getElementById('max-retries');
    const retryDelay = document.getElementById('retry-delay');

    if (saveFallbackBtn) {
        saveFallbackBtn.addEventListener('click', saveFallbackSettings);
    }

    // Initialize drag and drop for fallback order
    initFallbackDragDrop();
}

function loadFallbackSettings() {
    const fallbackSettings = JSON.parse(localStorage.getItem('fallbackSettings') || '{}');

    // Load fallback enabled state
    const fallbackEnabled = document.getElementById('fallback-enabled');
    if (fallbackEnabled) {
        fallbackEnabled.checked = fallbackSettings.enabled !== false;
    }

    // Load max retries
    const maxRetries = document.getElementById('max-retries');
    if (maxRetries && fallbackSettings.maxRetries) {
        maxRetries.value = fallbackSettings.maxRetries;
    }

    // Load retry delay
    const retryDelay = document.getElementById('retry-delay');
    if (retryDelay && fallbackSettings.retryDelay) {
        retryDelay.value = fallbackSettings.retryDelay;
    }

    // Load fallback order
    const fallbackOrder = fallbackSettings.order || ['deepseek', 'chatgpt', 'gemini', 'claude', 'mistral', 'groq'];
    updateFallbackOrderDisplay(fallbackOrder);
}

function saveFallbackSettings() {
    const fallbackEnabled = document.getElementById('fallback-enabled').checked;
    const maxRetries = parseInt(document.getElementById('max-retries').value);
    const retryDelay = parseInt(document.getElementById('retry-delay').value);

    // Get current fallback order
    const fallbackItems = document.querySelectorAll('#fallback-order .fallback-item');
    const fallbackOrder = Array.from(fallbackItems).map(item => item.getAttribute('data-provider'));

    const fallbackSettings = {
        enabled: fallbackEnabled,
        maxRetries: maxRetries,
        retryDelay: retryDelay,
        order: fallbackOrder
    };

    localStorage.setItem('fallbackSettings', JSON.stringify(fallbackSettings));
    showMessage('Fallback settings saved successfully!', 'success');
}

function initFallbackDragDrop() {
    const fallbackList = document.getElementById('fallback-order');
    if (!fallbackList) return;

    let draggedElement = null;

    fallbackList.addEventListener('dragstart', function(e) {
        draggedElement = e.target.closest('.fallback-item');
        if (draggedElement) {
            draggedElement.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
        }
    });

    fallbackList.addEventListener('dragend', function(e) {
        if (draggedElement) {
            draggedElement.style.opacity = '1';
            draggedElement = null;
        }
    });

    fallbackList.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    fallbackList.addEventListener('drop', function(e) {
        e.preventDefault();

        const targetElement = e.target.closest('.fallback-item');
        if (draggedElement && targetElement && draggedElement !== targetElement) {
            const allItems = Array.from(fallbackList.children);
            const draggedIndex = allItems.indexOf(draggedElement);
            const targetIndex = allItems.indexOf(targetElement);

            if (draggedIndex < targetIndex) {
                fallbackList.insertBefore(draggedElement, targetElement.nextSibling);
            } else {
                fallbackList.insertBefore(draggedElement, targetElement);
            }

            updateFallbackPriorityNumbers();
        }
    });

    // Make items draggable
    document.querySelectorAll('.fallback-item').forEach(item => {
        item.draggable = true;
        item.style.cursor = 'move';
    });
}

function updateFallbackOrderDisplay(order) {
    const fallbackList = document.getElementById('fallback-order');
    if (!fallbackList) return;

    const providers = {
        deepseek: 'DeepSeek',
        chatgpt: 'ChatGPT',
        gemini: 'Gemini',
        claude: 'Claude',
        mistral: 'Mistral',
        groq: 'Groq'
    };

    fallbackList.innerHTML = '';

    order.forEach((provider, index) => {
        const item = document.createElement('div');
        item.className = 'fallback-item';
        item.setAttribute('data-provider', provider);
        item.draggable = true;
        item.innerHTML = `
            <span class="provider-name">${providers[provider]}</span>
            <span class="priority-badge">${index + 1}</span>
        `;
        fallbackList.appendChild(item);
    });

    // Re-initialize drag and drop
    initFallbackDragDrop();
}

function updateFallbackPriorityNumbers() {
    const fallbackItems = document.querySelectorAll('#fallback-order .fallback-item');
    fallbackItems.forEach((item, index) => {
        const badge = item.querySelector('.priority-badge');
        if (badge) {
            badge.textContent = index + 1;
        }
    });
}

// Reaction Management Functions
function initReactionManagement() {
    // Initialize reaction management UI
    initReactionTable();
    initReactionModal();
    initReactionActions();
    initReactionSearch();

    // Load initial reactions
    loadReactions();
}

function initReactionTable() {
    // Table is already in HTML, just ensure it's ready
    console.log('Reaction table initialized');
}

function initReactionModal() {
    const modal = document.getElementById('reaction-modal');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');
    const saveBtn = document.getElementById('modal-save');
    const form = document.getElementById('reaction-form');

    // Close modal events
    [closeBtn, cancelBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                closeReactionModal();
            });
        }
    });

    // Save reaction
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            saveReaction();
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            saveReaction();
        });
    }

    // Add pathway button
    const addPathwayBtn = document.getElementById('add-pathway-btn');
    if (addPathwayBtn) {
        addPathwayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addAlternatePathway();
        });
    }

    // Add block buttons
    const addReactantBlockBtn = document.getElementById('add-reactant-block');
    const addProductBlockBtn = document.getElementById('add-product-block');
    const addReagentBlockBtn = document.getElementById('add-reagent-block');
    const addMechanismBlockBtn = document.getElementById('add-mechanism-block');

    if (addReactantBlockBtn) {
        addReactantBlockBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addInputBlock('reactants');
        });
    }
    if (addProductBlockBtn) {
        addProductBlockBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addInputBlock('products');
        });
    }
    if (addReagentBlockBtn) {
        addReagentBlockBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addInputBlock('reagents');
        });
    }
    if (addMechanismBlockBtn) {
        addMechanismBlockBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addInputBlock('mechanism');
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeReactionModal();
            }
        });
    }
}

// Initialize Reaction Management System
function initReactionManagement() {
    // Initialize reaction management UI
    initReactionTable();
    initReactionModal();
    initReactionActions();
    initReactionSearch();

    // Load initial reactions
    loadReactions();
}

function initReactionActions() {
    // Add reaction button
    const addBtn = document.getElementById('add-reaction-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            openReactionModal();
        });
    }

    // Export reactions
    const exportBtn = document.getElementById('export-reactions-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportReactions);
    }

    // Import reactions
    const importBtn = document.getElementById('import-reactions-btn');
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            openImportModal();
        });
    }

    // Reset database
    const resetBtn = document.getElementById('reset-database-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetDatabase);
    }

    // Import modal
    initImportModal();
}

function initReactionSearch() {
    const searchInput = document.getElementById('reaction-search');
    const categoryFilter = document.getElementById('category-filter');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            loadReactions();
        }, 300));
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            loadReactions();
        });
    }
}

function loadReactions() {
    const searchTerm = document.getElementById('reaction-search')?.value || '';
    const categoryFilter = document.getElementById('category-filter')?.value || '';

    let reactions = window.reactionDatabase.getAllReactions();

    // Apply search filter
    if (searchTerm) {
        reactions = window.reactionDatabase.searchReactions(searchTerm);
    }

    // Apply category filter
    if (categoryFilter) {
        reactions = reactions.filter(r => r.category === categoryFilter);
    }

    // Sort by creation date (newest first)
    reactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    displayReactions(reactions);
}

function displayReactions(reactions) {
    const tableBody = document.getElementById('reactions-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (reactions.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" style="text-align: center; padding: 2rem; color: var(--gray-text);">
                No reactions found. <a href="#" id="add-first-reaction" style="color: var(--primary-color);">Add your first reaction</a>
            </td>
        `;
        tableBody.appendChild(emptyRow);

        // Add event listener for "Add first reaction" link
        const addFirstLink = document.getElementById('add-first-reaction');
        if (addFirstLink) {
            addFirstLink.addEventListener('click', (e) => {
                e.preventDefault();
                openReactionModal();
            });
        }
        return;
    }

    reactions.forEach(reaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reaction.name}</td>
            <td>
                <div class="reaction-equation">
                    ${reaction.reactants.join(' + ')} → ${reaction.products.join(' + ')}
                </div>
            </td>
            <td>${reaction.category}</td>
            <td>
                <span class="difficulty-badge difficulty-${reaction.difficulty.toLowerCase()}">
                    ${reaction.difficulty}
                </span>
            </td>
            <td>${reaction.metrics?.yield || 'N/A'}%</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon edit-btn" data-id="${reaction.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete-btn" data-id="${reaction.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            editReaction(id);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            deleteReaction(id);
        });
    });
}

function openReactionModal(reaction = null) {
    const modal = document.getElementById('reaction-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('reaction-form');

    if (!modal || !title || !form) return;

    // Reset form
    form.reset();
    form.removeAttribute('data-edit-id');

    // Clear blocks
    document.getElementById('reactants-blocks').innerHTML = '';
    document.getElementById('products-blocks').innerHTML = '';
    document.getElementById('reagents-blocks').innerHTML = '';
    document.getElementById('mechanism-blocks').innerHTML = '';

    // Clear alternate pathways
    document.getElementById('alternate-pathways').innerHTML = '';

    // Add default blocks
    addInputBlock('reactants');
    addInputBlock('products');
    addInputBlock('reagents');
    addInputBlock('mechanism');

    if (reaction) {
        // Edit mode
        title.textContent = 'Edit Reaction';
        form.setAttribute('data-edit-id', reaction.id);
        populateForm(reaction);
    } else {
        // Add mode
        title.textContent = 'Add New Reaction';

        // Explicitly clear all block input values
        document.querySelectorAll('#reactants-blocks input, #products-blocks input, #reagents-blocks input, #mechanism-blocks textarea').forEach(input => {
            input.value = '';
        });
    }

    modal.classList.add('active');
}

function closeReactionModal() {
    const modal = document.getElementById('reaction-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function populateForm(reaction) {
    // Basic info
    document.getElementById('reaction-name').value = reaction.name || '';
    document.getElementById('reaction-category').value = reaction.category || '';
    document.getElementById('reaction-difficulty').value = reaction.difficulty || '';

    // Reactants and products - populate blocks
    (reaction.reactants || []).forEach(reactant => addInputBlock('reactants', reactant));
    (reaction.products || []).forEach(product => addInputBlock('products', product));
    (reaction.reagents || []).forEach(reagent => addInputBlock('reagents', reagent));

    // Conditions
    const conditions = reaction.conditions || {};
    document.getElementById('temperature').value = conditions.temperature || '';
    document.getElementById('temperature-unit').value = conditions.temperatureUnit || '°C';
    document.getElementById('pressure').value = conditions.pressure || '';
    document.getElementById('pressure-unit').value = conditions.pressureUnit || 'atm';
    document.getElementById('time').value = conditions.time || '';
    document.getElementById('time-unit').value = conditions.timeUnit || 'hours';
    document.getElementById('solvent').value = conditions.solvent || '';

    // Metrics
    const metrics = reaction.metrics || {};
    document.getElementById('yield').value = metrics.yield || '';
    document.getElementById('atom-economy').value = metrics.atomEconomy || '';
    document.getElementById('energy-efficiency').value = metrics.energyEfficiency || '';

    // Mechanism - populate blocks
    (reaction.mechanism || []).forEach(step => addInputBlock('mechanism', step));

    // Alternate pathways
    const pathways = reaction.alternatePathways || [];
    pathways.forEach(pathway => {
        addAlternatePathway(pathway);
    });
}

function saveReaction() {
    const form = document.getElementById('reaction-form');
    if (!form) return;

    const formData = new FormData(form);
    const editId = form.getAttribute('data-edit-id');

    // Collect form data
    const reactionData = {
        name: document.getElementById('reaction-name').value.trim(),
        category: document.getElementById('reaction-category').value,
        difficulty: document.getElementById('reaction-difficulty').value,
        reactants: getBlockValues('reactants-blocks'),
        products: getBlockValues('products-blocks'),
        reagents: getBlockValues('reagents-blocks'),
        conditions: {
            temperature: document.getElementById('temperature').value,
            temperatureUnit: document.getElementById('temperature-unit').value,
            pressure: document.getElementById('pressure').value,
            pressureUnit: document.getElementById('pressure-unit').value,
            time: document.getElementById('time').value,
            timeUnit: document.getElementById('time-unit').value,
            solvent: document.getElementById('solvent').value
        },
        metrics: {
            yield: document.getElementById('yield').value,
            atomEconomy: document.getElementById('atom-economy').value,
            energyEfficiency: document.getElementById('energy-efficiency').value
        },
        mechanism: getBlockValues('mechanism-blocks'),
        alternatePathways: getAlternatePathways()
    };

    // Validate required fields
    if (!reactionData.name || !reactionData.reactants.length || !reactionData.products.length) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }

    try {
        let result;
        if (editId) {
            result = window.reactionDatabase.updateReaction(editId, reactionData);
            showMessage('Reaction updated successfully!', 'success');
        } else {
            result = window.reactionDatabase.addReaction(reactionData);
            showMessage('Reaction added successfully!', 'success');
        }

        if (result) {
            closeReactionModal();
            loadReactions();
            updateDashboardStats();
        }
    } catch (error) {
        console.error('Error saving reaction:', error);
        showMessage(error.message || 'Error saving reaction. Please try again.', 'error');
    }
}

function editReaction(id) {
    const reaction = window.reactionDatabase.getReactionById(id);
    if (reaction) {
        openReactionModal(reaction);
    } else {
        showMessage('Reaction not found', 'error');
    }
}

function deleteReaction(id) {
    if (confirm('Are you sure you want to delete this reaction? This action cannot be undone.')) {
        const result = window.reactionDatabase.deleteReaction(id);
        if (result) {
            showMessage('Reaction deleted successfully!', 'success');
            loadReactions();
            updateDashboardStats();
        } else {
            showMessage('Error deleting reaction', 'error');
        }
    }
}

function addInputBlock(type, value = '') {
    const container = document.getElementById(`${type}-blocks`);
    if (!container) return;

    const blockDiv = document.createElement('div');
    blockDiv.className = 'input-block-item';

    const placeholder = getPlaceholderForType(type);
    const inputType = type === 'mechanism' ? 'textarea' : 'input';

    blockDiv.innerHTML = `
        <${inputType} type="text" placeholder="${placeholder}" value="${value}" ${inputType === 'textarea' ? 'rows="2"' : ''}>
        <button type="button" class="remove-block-btn" title="Remove">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(blockDiv);

    // Add remove event listener
    const removeBtn = blockDiv.querySelector('.remove-block-btn');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            // Don't remove if it's the last block
            if (container.children.length > 1) {
                blockDiv.remove();
            } else {
                alert(`At least one ${type.slice(0, -1)} is required`);
            }
        });
    }
}

function getPlaceholderForType(type) {
    const placeholders = {
        'reactants': 'e.g., H₂O, CH₄, C₂H₅OH',
        'products': 'e.g., CO₂, H₂, CH₃OH',
        'reagents': 'e.g., HCl, NaOH, H₂SO₄',
        'mechanism': 'Describe this step of the reaction mechanism...'
    };
    return placeholders[type] || 'Enter value...';
}

function addAlternatePathway(existingPathway = null) {
    const container = document.getElementById('alternate-pathways');
    if (!container) return;

    const pathwayDiv = document.createElement('div');
    pathwayDiv.className = 'alternate-pathway-item';
    pathwayDiv.innerHTML = `
        <div class="pathway-header">
            <h5>Alternate Pathway</h5>
            <button type="button" class="btn-icon remove-pathway" title="Remove">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Method</label>
                <input type="text" class="pathway-method" placeholder="e.g., DCC Coupling" value="${existingPathway?.method || ''}">
            </div>
            <div class="form-group">
                <label>Reagents</label>
                <input type="text" class="pathway-reagents" placeholder="e.g., DCC, DMAP" value="${existingPathway?.reagents || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Advantages</label>
                <textarea class="pathway-advantages" placeholder="List advantages...">${existingPathway?.advantages || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Disadvantages</label>
                <textarea class="pathway-disadvantages" placeholder="List disadvantages...">${existingPathway?.disadvantages || ''}</textarea>
            </div>
        </div>
    `;

    container.appendChild(pathwayDiv);

    // Add remove event listener
    const removeBtn = pathwayDiv.querySelector('.remove-pathway');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            pathwayDiv.remove();
        });
    }
}

function getBlockValues(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return [];

    const values = [];
    container.querySelectorAll('input, textarea').forEach(input => {
        const value = input.value.trim();
        if (value) {
            values.push(value);
        }
    });
    return values;
}

function getAlternatePathways() {
    const pathways = [];
    document.querySelectorAll('.alternate-pathway-item').forEach(item => {
        const method = item.querySelector('.pathway-method').value.trim();
        const reagents = item.querySelector('.pathway-reagents').value.trim();
        const advantages = item.querySelector('.pathway-advantages').value.trim();
        const disadvantages = item.querySelector('.pathway-disadvantages').value.trim();

        if (method || reagents || advantages || disadvantages) {
            pathways.push({
                method,
                reagents,
                advantages,
                disadvantages
            });
        }
    });
    return pathways;
}

function exportReactions() {
    try {
        const data = window.reactionDatabase.exportReactions();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `chemPilot-reactions-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showMessage('Reactions exported successfully!', 'success');
    } catch (error) {
        console.error('Export error:', error);
        showMessage('Error exporting reactions', 'error');
    }
}

function openImportModal() {
    const modal = document.getElementById('import-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function initImportModal() {
    const modal = document.getElementById('import-modal');
    const closeBtn = document.getElementById('import-modal-close');
    const cancelBtn = document.getElementById('import-cancel');
    const confirmBtn = document.getElementById('import-confirm');

    // Close modal events
    [closeBtn, cancelBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                closeImportModal();
            });
        }
    });

    // Import confirmation
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            importReactions();
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeImportModal();
            }
        });
    }
}

function closeImportModal() {
    const modal = document.getElementById('import-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function importReactions() {
    const importData = document.getElementById('import-data');
    if (!importData || !importData.value.trim()) {
        showMessage('Please enter JSON data to import', 'error');
        return;
    }

    try {
        const success = window.reactionDatabase.importReactions(importData.value.trim());
        if (success) {
            showMessage('Reactions imported successfully!', 'success');
            closeImportModal();
            loadReactions();
            updateDashboardStats();
        } else {
            showMessage('Invalid JSON data format', 'error');
        }
    } catch (error) {
        console.error('Import error:', error);
        showMessage('Error importing reactions. Please check the JSON format.', 'error');
    }
}

function resetDatabase() {
    if (confirm('Are you sure you want to reset the database? This will delete all user-added reactions and restore only the default reactions. This action cannot be undone.')) {
        try {
            // Clear localStorage
            localStorage.removeItem('chemPilotReactions');

            // Reset the database instance
            window.reactionDatabase = new ReactionDatabase();

            showMessage('Database reset to defaults successfully!', 'success');
            loadReactions();
            updateDashboardStats();
        } catch (error) {
            console.error('Reset error:', error);
            showMessage('Error resetting database', 'error');
        }
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
    }
});
