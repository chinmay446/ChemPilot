// Reaction Predictor Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the reaction predictor
    initReactionPredictor();
});

function initReactionPredictor() {
    // Reaction Input Elements
    const addReactantBtn = document.getElementById('add-reactant');
    const addReagentBtn = document.getElementById('add-reagent');
    const reactantsContainer = document.getElementById('reactants-container');
    const reagentsContainer = document.getElementById('reagents-container');
    
    // Conditions
    const solventSelect = document.getElementById('solvent');
    const customSolventInput = document.getElementById('custom-solvent');
    
    // Chemical Keyboard
    const keyboardButtons = document.querySelectorAll('.keyboard-btn');
    const compoundButtons = document.querySelectorAll('.compound-btn');
    
    // Auto Detection
    const detectReactionTypeBtn = document.getElementById('detect-reaction-type');
    const reactionTypeElement = document.getElementById('reaction-type');
    const detectionConfidence = document.getElementById('detection-confidence');
    const reactionTypeTags = document.querySelectorAll('.reaction-type-tag');
    
    // Prediction Controls
    const predictReactionBtn = document.getElementById('predict-reaction');
    const clearAllBtn = document.getElementById('clear-all');
    const editReactionBtn = document.getElementById('edit-reaction');
    const deleteReactionBtn = document.getElementById('delete-reaction');
    
    // Results Section
    const resultsSection = document.getElementById('results-section');
    const overallConfidence = document.getElementById('overall-confidence');
    
    // State
    let activeInputElement = null;
    
    // Initialize
    initializeEventListeners();
    addDefaultInputs();
    checkApiConfiguration();
    
    function initializeEventListeners() {
        // Add/Remove Inputs
        addReactantBtn.addEventListener('click', () => addInput('reactant'));
        addReagentBtn.addEventListener('click', () => addInput('reagent'));
        
        // Conditions
        solventSelect.addEventListener('change', handleSolventChange);
        
        // Chemical Keyboard
        keyboardButtons.forEach(btn => {
            btn.addEventListener('click', handleKeyboardButtonClick);
        });
        
        compoundButtons.forEach(btn => {
            btn.addEventListener('click', handleCompoundButtonClick);
        });
        
        // Reaction type tags (for manual selection if needed)
        reactionTypeTags.forEach(tag => {
            tag.addEventListener('click', handleReactionTypeTagClick);
        });
        
        // Prediction Controls
        predictReactionBtn.addEventListener('click', predictReaction);
        clearAllBtn.addEventListener('click', clearAllInputs);
        editReactionBtn.addEventListener('click', editCurrentReaction);
        deleteReactionBtn.addEventListener('click', deleteCurrentReaction);
        
        // Set active input when focusing on any chemical input
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('chemical-input')) {
                activeInputElement = e.target;
            }
        });
    }
    
    function addDefaultInputs() {
        // Add one reactant and one reagent by default
        addInput('reactant');
        addInput('reagent');
    }
    
    
    function addInput(type) {
        const container = type === 'reactant' ? reactantsContainer : reagentsContainer;
        const inputId = `${type}-${Date.now()}`;
        
        const inputHtml = `
            <div class="${type}-input">
                <div class="input-group">
                    <label for="${inputId}">${type === 'reactant' ? 'Reactant' : 'Reagent'} Formula</label>
                    <input type="text" id="${inputId}" class="chemical-input" placeholder="e.g., H₂O, CH₄, C₂H₅OH">
                </div>
                <button class="remove-btn" type="button">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = inputHtml;
        const newInput = tempDiv.firstElementChild;
        
        // Add event listener to remove button
        const removeBtn = newInput.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            // Don't remove if it's the last input
            if (container.children.length > 1) {
                container.removeChild(newInput);
            } else {
                alert(`At least one ${type} is required`);
            }
        });
        
        // Add event listener to the input for keyboard focus
        const chemicalInput = newInput.querySelector('.chemical-input');
        chemicalInput.addEventListener('focus', function() {
            activeInputElement = this;
        });
        
        container.appendChild(newInput);
    }
    
    function handleSolventChange() {
        if (solventSelect.value === 'other') {
            customSolventInput.style.display = 'block';
        } else {
            customSolventInput.style.display = 'none';
        }
    }
    
    function handleKeyboardButtonClick(e) {
        if (!activeInputElement) {
            // If no input is focused, focus on the first reactant input
            const firstInput = document.querySelector('.chemical-input');
            if (firstInput) {
                firstInput.focus();
                activeInputElement = firstInput;
            } else {
                return;
            }
        }
        
        const button = e.currentTarget;
        const char = button.getAttribute('data-char');
        const action = button.getAttribute('data-action');
        
        if (action === 'backspace') {
            // Remove last character
            activeInputElement.value = activeInputElement.value.slice(0, -1);
        } else if (action === 'clear') {
            // Clear the input
            activeInputElement.value = '';
        } else {
            // Add the character
            activeInputElement.value += char;
        }
        
        // Trigger input event to update any listeners
        activeInputElement.dispatchEvent(new Event('input'));
    }
    
    function handleCompoundButtonClick(e) {
        if (!activeInputElement) {
            // If no input is focused, focus on the first reactant input
            const firstInput = document.querySelector('.chemical-input');
            if (firstInput) {
                firstInput.focus();
                activeInputElement = firstInput;
            } else {
                return;
            }
        }
        
        const formula = e.currentTarget.getAttribute('data-formula');
        activeInputElement.value = formula;
        
        // Trigger input event
        activeInputElement.dispatchEvent(new Event('input'));
    }
    
    
    function handleReactionTypeTagClick(e) {
        const tag = e.currentTarget;
        const type = tag.getAttribute('data-type');
        
        // Toggle active state
        reactionTypeTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        
        // Update reaction type
        reactionTypeElement.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        detectionConfidence.textContent = 'Manually selected';
    }
    
    async function predictReaction() {
        // Get input values
        const reactants = Array.from(document.querySelectorAll('.reactant-input .chemical-input'))
            .map(input => input.value.trim())
            .filter(value => value !== '');

        const reagents = Array.from(document.querySelectorAll('.reagent-input .chemical-input'))
            .map(input => input.value.trim())
            .filter(value => value !== '');

        if (reactants.length === 0) {
            alert('Please enter at least one reactant');
            return;
        }

        // Show loading state
        predictReactionBtn.disabled = true;
        predictReactionBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching Database...';

        try {
            // Search for matching reactions in the local database
            const matchingReactions = findMatchingReactions(reactants, reagents);

            if (matchingReactions.length === 0) {
                // No exact match found, try partial matching
                const partialMatches = findPartialMatchingReactions(reactants);

                if (partialMatches.length > 0) {
                    // Display partial matches as suggestions
                    displayPartialMatchResults(partialMatches, reactants);
                } else {
                    // No matches found
                    displayNoResultsFound(reactants);
                }
            } else {
                // Found exact or close matches - display all matching reactions
                displayMultipleReactionResults(matchingReactions, reactants, reagents);
            }

            // Show results section
            resultsSection.style.display = 'block';

            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error('Prediction error:', error);
            alert('Database search failed: ' + error.message);
        } finally {
            // Reset button
            predictReactionBtn.disabled = false;
            predictReactionBtn.innerHTML = '<i class="fas fa-brain"></i> Predict Reaction';
        }
    }

    function findMatchingReactions(reactants, reagents) {
        const allReactions = window.reactionDatabase.getAllReactions();
        const matches = [];

        allReactions.forEach(reaction => {
            // Check if reactants match (allowing for different order)
            const reactantMatch = checkReactantMatch(reactants, reaction.reactants);

            // Check if reagents match (optional, but if provided should match)
            const reagentMatch = reagents.length === 0 ||
                checkReagentMatch(reagents, reaction.reagents || []);

            if (reactantMatch && reagentMatch) {
                matches.push(reaction);
            }
        });

        return matches;
    }

    function checkReactantMatch(inputReactants, dbReactants) {
        if (inputReactants.length !== dbReactants.length) {
            return false;
        }

        // Create sorted copies for comparison
        const sortedInput = [...inputReactants].sort();
        const sortedDb = [...dbReactants].sort();

        return sortedInput.every((reactant, index) =>
            reactant.toLowerCase() === sortedDb[index].toLowerCase()
        );
    }

    function checkReagentMatch(inputReagents, dbReagents) {
        // Allow partial reagent matching
        return inputReagents.every(inputReagent =>
            dbReagents.some(dbReagent =>
                dbReagent.toLowerCase().includes(inputReagent.toLowerCase()) ||
                inputReagent.toLowerCase().includes(dbReagent.toLowerCase())
            )
        );
    }

    function findPartialMatchingReactions(reactants) {
        const allReactions = window.reactionDatabase.getAllReactions();
        const matches = [];

        allReactions.forEach(reaction => {
            // Check if any input reactant appears in the reaction
            const hasMatchingReactant = reactants.some(inputReactant =>
                reaction.reactants.some(dbReactant =>
                    dbReactant.toLowerCase().includes(inputReactant.toLowerCase()) ||
                    inputReactant.toLowerCase().includes(dbReactant.toLowerCase())
                )
            );

            if (hasMatchingReactant) {
                matches.push(reaction);
            }
        });

        // Return top 3 matches
        return matches.slice(0, 3);
    }

    function displayReactionResults(reaction, inputReactants, inputReagents) {
        // Format reaction data for display
        const results = {
            reactants: reaction.reactants,
            products: reaction.products,
            reagents: reaction.reagents || [],
            confidence: '100%', // Exact match from database
            reactionName: reaction.name,
            metrics: {
                atomEconomy: reaction.metrics?.atomEconomy || 'N/A',
                predictedYield: reaction.metrics?.yield || 'N/A',
                reactionTime: reaction.conditions?.time || 'N/A',
                energyBarrier: 'N/A' // Not stored in current schema
            },
            mechanism: reaction.mechanism || [],
            optimalConditions: {
                temperature: `${reaction.conditions?.temperature || 'N/A'} ${reaction.conditions?.temperatureUnit || ''}`,
                solvent: reaction.conditions?.solvent || 'N/A',
                pressure: `${reaction.conditions?.pressure || 'N/A'} atm`,
                time: `${reaction.conditions?.time || 'N/A'} ${reaction.conditions?.timeUnit || 'hours'}`
            },
            alternativePathways: reaction.alternatePathways || []
        };

        displayResults(results);
    }

    function displayMultipleReactionResults(matchingReactions, inputReactants, inputReagents) {
        // Update overall confidence
        const confidenceValue = overallConfidence.querySelector('.confidence-value');
        confidenceValue.textContent = `${matchingReactions.length} Match${matchingReactions.length > 1 ? 'es' : ''} Found`;

        // Clear previous results
        document.getElementById('reactants-side').innerHTML = '';
        document.getElementById('products-side').innerHTML = '';

        // Display input reactants
        const reactantsSide = document.getElementById('reactants-side');
        inputReactants.forEach((reactant, index) => {
            const formulaElement = document.createElement('div');
            formulaElement.className = 'molecule-formula';
            formulaElement.textContent = reactant;
            reactantsSide.appendChild(formulaElement);

            if (index < inputReactants.length - 1) {
                const plus = document.createElement('span');
                plus.textContent = ' + ';
                plus.style.fontSize = '1.5rem';
                reactantsSide.appendChild(plus);
            }
        });

        // Display products from first reaction in main equation
        const productsSide = document.getElementById('products-side');
        if (matchingReactions.length > 0) {
            const firstReaction = matchingReactions[0];
            firstReaction.products.forEach((product, index) => {
                const formulaElement = document.createElement('div');
                formulaElement.className = 'molecule-formula';
                formulaElement.textContent = product;
                productsSide.appendChild(formulaElement);

                if (index < firstReaction.products.length - 1) {
                    const plus = document.createElement('span');
                    plus.textContent = ' + ';
                    plus.style.fontSize = '1.5rem';
                    productsSide.appendChild(plus);
                }
            });
        }

        // Display all matching reactions
        const mechanismSteps = document.getElementById('mechanism-steps');
        mechanismSteps.innerHTML = `<h3>Matching Reactions (${matchingReactions.length})</h3>`;

        matchingReactions.forEach((reaction, index) => {
            const reactionCard = document.createElement('div');
            reactionCard.className = 'reaction-card';
            reactionCard.innerHTML = `
                <div class="reaction-header">
                    <h4>${reaction.name}</h4>
                    <span class="reaction-category">${reaction.category}</span>
                </div>
                <div class="reaction-equation">
                    ${reaction.reactants.join(' + ')} → ${reaction.products.join(' + ')}
                </div>
                <div class="reaction-details">
                    <div class="reaction-metrics">
                        <span>Yield: ${reaction.metrics?.yield || 'N/A'}%</span>
                        <span>Time: ${reaction.conditions?.time || 'N/A'} ${reaction.conditions?.timeUnit || 'hours'}</span>
                        <span>Temp: ${reaction.conditions?.temperature || 'N/A'}°${reaction.conditions?.temperatureUnit || 'C'}</span>
                    </div>
                    <div class="reaction-mechanism">
                        <h5>Mechanism:</h5>
                        <ol>
                            ${reaction.mechanism.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    ${reaction.alternatePathways && reaction.alternatePathways.length > 0 ? `
                    <div class="reaction-alternatives">
                        <h5>Alternative Pathways:</h5>
                        <ul>
                            ${reaction.alternatePathways.map(pathway => `<li>${pathway.method}: ${pathway.reagents.join(', ')}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
            `;
            mechanismSteps.appendChild(reactionCard);
        });

        // Populate metrics and conditions from first reaction
        if (matchingReactions.length > 0) {
            const firstReaction = matchingReactions[0];
            document.getElementById('atom-economy').textContent = firstReaction.metrics?.atomEconomy || 'N/A';
            document.getElementById('predicted-yield').textContent = firstReaction.metrics?.yield || 'N/A';
            document.getElementById('reaction-time').textContent = firstReaction.conditions?.time || 'N/A';
            document.getElementById('energy-barrier').textContent = 'N/A';

            // Populate optimal conditions
            const optimalConditions = document.getElementById('optimal-conditions');
            optimalConditions.innerHTML = '';
            const conditions = {
                temperature: `${firstReaction.conditions?.temperature || 'N/A'} ${firstReaction.conditions?.temperatureUnit || ''}`,
                solvent: firstReaction.conditions?.solvent || 'N/A',
                pressure: `${firstReaction.conditions?.pressure || 'N/A'} atm`,
                time: `${firstReaction.conditions?.time || 'N/A'} ${firstReaction.conditions?.timeUnit || 'hours'}`
            };
            Object.entries(conditions).forEach(([key, value]) => {
                const conditionElement = document.createElement('div');
                conditionElement.className = 'condition-item';
                conditionElement.innerHTML = `
                    <div class="condition-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                    <div class="condition-value">${value}</div>
                `;
                optimalConditions.appendChild(conditionElement);
            });

            // Populate alternative pathways
            const alternativePathways = document.getElementById('alternative-pathways');
            alternativePathways.innerHTML = '';
            if (firstReaction.alternatePathways && firstReaction.alternatePathways.length > 0) {
                firstReaction.alternatePathways.forEach(pathway => {
                    const pathwayElement = document.createElement('div');
                    pathwayElement.className = 'pathway';
                    pathwayElement.innerHTML = `
                        <div class="pathway-header">
                            <div class="pathway-name">${pathway.name || pathway.method}</div>
                            <div class="pathway-confidence">${pathway.confidence || 'N/A'}% confidence</div>
                        </div>
                        <div class="pathway-equation">${pathway.reagents ? pathway.method + ': ' + pathway.reagents.join(', ') : pathway.equation || 'N/A'}</div>
                        <div class="pathway-conditions">${pathway.conditions || 'N/A'}</div>
                    `;
                    alternativePathways.appendChild(pathwayElement);
                });
            } else {
                alternativePathways.innerHTML = '<p>No alternative pathways available</p>';
            }
        } else {
            // Clear other sections if no reactions
            document.getElementById('atom-economy').textContent = 'N/A';
            document.getElementById('predicted-yield').textContent = 'N/A';
            document.getElementById('reaction-time').textContent = 'N/A';
            document.getElementById('energy-barrier').textContent = 'N/A';
            document.getElementById('optimal-conditions').innerHTML = '';
            document.getElementById('alternative-pathways').innerHTML = '';
        }
    }

    function displayPartialMatchResults(partialMatches, inputReactants) {
        // Update overall confidence
        const confidenceValue = overallConfidence.querySelector('.confidence-value');
        confidenceValue.textContent = 'Partial Match';

        // Clear previous results
        document.getElementById('reactants-side').innerHTML = '';
        document.getElementById('products-side').innerHTML = '';

        // Display input reactants
        const reactantsSide = document.getElementById('reactants-side');
        inputReactants.forEach((reactant, index) => {
            const formulaElement = document.createElement('div');
            formulaElement.className = 'molecule-formula';
            formulaElement.textContent = reactant;
            reactantsSide.appendChild(formulaElement);

            if (index < inputReactants.length - 1) {
                const plus = document.createElement('span');
                plus.textContent = ' + ';
                plus.style.fontSize = '1.5rem';
                reactantsSide.appendChild(plus);
            }
        });

        // Display suggested reactions
        const mechanismSteps = document.getElementById('mechanism-steps');
        mechanismSteps.innerHTML = '<h3>Suggested Reactions</h3>';

        partialMatches.forEach((reaction, index) => {
            const suggestionElement = document.createElement('div');
            suggestionElement.className = 'suggested-reaction';
            suggestionElement.innerHTML = `
                <div class="suggestion-header">
                    <h4>${reaction.name}</h4>
                    <span class="suggestion-category">${reaction.category}</span>
                </div>
                <div class="suggestion-equation">
                    ${reaction.reactants.join(' + ')} → ${reaction.products.join(' + ')}
                </div>
                <div class="suggestion-details">
                    <span>Yield: ${reaction.metrics?.yield || 'N/A'}%</span>
                    <span>Time: ${reaction.conditions?.time || 'N/A'} ${reaction.conditions?.timeUnit || 'hours'}</span>
                </div>
            `;
            mechanismSteps.appendChild(suggestionElement);
        });

        // Clear other sections
        document.getElementById('atom-economy').textContent = 'N/A';
        document.getElementById('predicted-yield').textContent = 'N/A';
        document.getElementById('reaction-time').textContent = 'N/A';
        document.getElementById('energy-barrier').textContent = 'N/A';

        document.getElementById('optimal-conditions').innerHTML = '';
        document.getElementById('alternative-pathways').innerHTML = '';

        // Molecular visualization removed as per requirements
    }

    function displayNoResultsFound(inputReactants) {
        // Show the popup modal
        showChatAIModal();

        // Update overall confidence
        const confidenceValue = overallConfidence.querySelector('.confidence-value');
        confidenceValue.textContent = 'No Match Found';

        // Clear previous results
        document.getElementById('reactants-side').innerHTML = '';
        document.getElementById('products-side').innerHTML = '';

        // Display input reactants
        const reactantsSide = document.getElementById('reactants-side');
        inputReactants.forEach((reactant, index) => {
            const formulaElement = document.createElement('div');
            formulaElement.className = 'molecule-formula';
            formulaElement.textContent = reactant;
            reactantsSide.appendChild(formulaElement);

            if (index < inputReactants.length - 1) {
                const plus = document.createElement('span');
                plus.textContent = ' + ';
                plus.style.fontSize = '1.5rem';
                reactantsSide.appendChild(plus);
            }
        });

        // Display no results message
        const mechanismSteps = document.getElementById('mechanism-steps');
        mechanismSteps.innerHTML = `
            <div class="no-results">
                <h3>No Matching Reactions Found</h3>
                <p>The entered reactants were not found in our database.</p>
                <p>Suggestions:</p>
                <ul>
                    <li>Check the spelling of your reactant formulas</li>
                    <li>Try different reactant combinations</li>
                    <li>Contact an administrator to add this reaction to the database</li>
                </ul>
            </div>
        `;

        // Clear other sections
        document.getElementById('atom-economy').textContent = 'N/A';
        document.getElementById('predicted-yield').textContent = 'N/A';
        document.getElementById('reaction-time').textContent = 'N/A';
        document.getElementById('energy-barrier').textContent = 'N/A';

        document.getElementById('optimal-conditions').innerHTML = '';
        document.getElementById('alternative-pathways').innerHTML = '';

        // Molecular visualization removed as per requirements
    }
    
    
    function displayResults(results) {
        // Update overall confidence
        const confidenceValue = overallConfidence.querySelector('.confidence-value');
        confidenceValue.textContent = `${results.confidence}%`;
        
        // Display reaction equation
        displayReactionEquation(results.reactants, results.products);
        
        // Display metrics
        displayMetrics(results.metrics);
        
        // Display mechanism
        displayMechanism(results.mechanism);
        
        // Display optimal conditions
        displayOptimalConditions(results.optimalConditions);
        
        // Display alternative pathways
        displayAlternativePathways(results.alternativePathways);
    }
    
    function displayReactionEquation(reactants, products) {
        const reactantsSide = document.getElementById('reactants-side');
        const productsSide = document.getElementById('products-side');
        
        // Clear previous content
        reactantsSide.innerHTML = '';
        productsSide.innerHTML = '';
        
        // Add reactants
        reactants.forEach(reactant => {
            const formulaElement = document.createElement('div');
            formulaElement.className = 'molecule-formula';
            formulaElement.textContent = reactant;
            reactantsSide.appendChild(formulaElement);
            
            // Add plus sign if not the last reactant
            if (reactant !== reactants[reactants.length - 1]) {
                const plus = document.createElement('span');
                plus.textContent = ' + ';
                plus.style.fontSize = '1.5rem';
                reactantsSide.appendChild(plus);
            }
        });
        
        // Add products
        products.forEach(product => {
            const formulaElement = document.createElement('div');
            formulaElement.className = 'molecule-formula';
            formulaElement.textContent = product;
            productsSide.appendChild(formulaElement);
            
            // Add plus sign if not the last product
            if (product !== products[products.length - 1]) {
                const plus = document.createElement('span');
                plus.textContent = ' + ';
                plus.style.fontSize = '1.5rem';
                productsSide.appendChild(plus);
            }
        });
    }
    
    function displayMetrics(metrics) {
        document.getElementById('atom-economy').textContent = `${metrics.atomEconomy}%`;
        document.getElementById('predicted-yield').textContent = `${metrics.predictedYield}%`;
        document.getElementById('reaction-time').textContent = `${metrics.reactionTime}h`;
        document.getElementById('energy-barrier').textContent = `${metrics.energyBarrier} kJ/mol`;
    }
    
    function displayMechanism(mechanism) {
        const mechanismSteps = document.getElementById('mechanism-steps');
        mechanismSteps.innerHTML = '';

        if (!mechanism || mechanism.length === 0) {
            mechanismSteps.innerHTML = '<p>No mechanism data available.</p>';
            return;
        }

        mechanism.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'mechanism-step';

            // Handle both string array format and object format
            if (typeof step === 'string') {
                // Simple string format from database
                stepElement.innerHTML = `
                    <div class="step-number">${index + 1}</div>
                    <div class="step-content">
                        <div class="step-description">${step}</div>
                    </div>
                `;
            } else if (typeof step === 'object' && step.description) {
                // Structured object format
                stepElement.innerHTML = `
                    <div class="step-number">${step.step || (index + 1)}</div>
                    <div class="step-content">
                        <div class="step-description">${step.description}</div>
                        ${step.equation ? `<div class="step-equation">${step.equation}</div>` : ''}
                    </div>
                `;
            }

            mechanismSteps.appendChild(stepElement);
        });
    }
    
    function displayOptimalConditions(conditions) {
        const optimalConditions = document.getElementById('optimal-conditions');
        optimalConditions.innerHTML = '';
        
        Object.entries(conditions).forEach(([key, value]) => {
            const conditionElement = document.createElement('div');
            conditionElement.className = 'condition-item';
            conditionElement.innerHTML = `
                <div class="condition-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                <div class="condition-value">${value}</div>
            `;
            optimalConditions.appendChild(conditionElement);
        });
    }
    
    function displayAlternativePathways(pathways) {
        const alternativePathways = document.getElementById('alternative-pathways');
        alternativePathways.innerHTML = '';
        
        pathways.forEach(pathway => {
            const pathwayElement = document.createElement('div');
            pathwayElement.className = 'pathway';
            pathwayElement.innerHTML = `
                <div class="pathway-header">
                    <div class="pathway-name">${pathway.name}</div>
                    <div class="pathway-confidence">${pathway.confidence}% confidence</div>
                </div>
                <div class="pathway-equation">${pathway.equation}</div>
                <div class="pathway-conditions">${pathway.conditions}</div>
            `;
            alternativePathways.appendChild(pathwayElement);
        });
    }
    
    
    function createReactionPredictionPrompt(reactants, reagents, temperature, temperatureUnit, solvent, customSolvent, pressure, time) {
        const solventText = solvent === 'other' ? customSolvent : solvent;

        return `You are a chemistry expert AI. Analyze the following chemical reaction and provide a detailed prediction.

REACTANTS: ${reactants.join(', ')}
REAGENTS: ${reagents.join(', ')}
CONDITIONS:
- Temperature: ${temperature} ${temperatureUnit}
- Solvent: ${solventText}
- Pressure: ${pressure} atm
- Time: ${time} hours

Please provide a comprehensive analysis including:

1. REACTION TYPE: Determine the type of reaction (e.g., substitution, addition, elimination, oxidation, reduction, etc.)

2. PRODUCTS: Predict the main products of this reaction. List them clearly.

3. MECHANISM: Provide a step-by-step reaction mechanism with detailed explanation for each step.

4. METRICS:
   - Atom Economy (%)
   - Predicted Yield (%)
   - Reaction Time (hours)
   - Energy Barrier (kJ/mol)

5. OPTIMAL CONDITIONS: Suggest the best conditions for this reaction.

6. ALTERNATIVE PATHWAYS: Suggest 1-2 alternative reaction pathways if applicable.

Format your response clearly with headers for each section. Be scientifically accurate and provide detailed explanations.`;
    }

    function clearAllInputs() {
        // Clear reactants (keep one)
        const reactantInputs = document.querySelectorAll('.reactant-input');
        reactantInputs.forEach((input, index) => {
            if (index > 0) {
                input.remove();
            } else {
                input.querySelector('.chemical-input').value = '';
            }
        });
        
        // Clear reagents (keep one)
        const reagentInputs = document.querySelectorAll('.reagent-input');
        reagentInputs.forEach((input, index) => {
            if (index > 0) {
                input.remove();
            } else {
                input.querySelector('.chemical-input').value = '';
            }
        });
        
        // Clear conditions
        document.getElementById('temperature').value = '';
        document.getElementById('solvent').selectedIndex = 0;
        document.getElementById('custom-solvent').value = '';
        document.getElementById('custom-solvent').style.display = 'none';
        document.getElementById('pressure').value = '1';
        document.getElementById('time').value = '1';
        
        // Clear reaction type
        reactionTypeElement.textContent = 'Not Detected';
        detectionConfidence.textContent = '';
        reactionTypeTags.forEach(tag => tag.classList.remove('active'));
        
        // Hide results
        resultsSection.style.display = 'none';
    }

    function editCurrentReaction() {
        // Scroll to the input section to allow editing
        const inputSection = document.querySelector('.input-section');
        if (inputSection) {
            inputSection.scrollIntoView({ behavior: 'smooth' });
            // Focus on the first reactant input
            const firstInput = document.querySelector('.chemical-input');
            if (firstInput) {
                firstInput.focus();
            }
        }
    }

    function deleteCurrentReaction() {
        if (confirm('Are you sure you want to delete this reaction? All current inputs and results will be cleared.')) {
            clearAllInputs();
            resultsSection.style.display = 'none';
        }
    }

    function checkApiConfiguration() {
        // No longer using AI APIs - using local database instead
        // Hide the API notice since it's not relevant
        const apiNotice = document.getElementById('api-notice');
        if (apiNotice) {
            apiNotice.style.display = 'none';
        }
    }

    // Modal functions
    function showChatAIModal() {
        const modal = document.getElementById('chat-ai-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    function hideChatAIModal() {
        const modal = document.getElementById('chat-ai-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Modal event listeners
    const chatWithAIBtn = document.getElementById('chat-with-ai');
    const cancelModalBtn = document.getElementById('cancel-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('chat-ai-modal');

    if (chatWithAIBtn) {
        chatWithAIBtn.addEventListener('click', function() {
            // Redirect to support.html
            window.location.href = 'support.html';
        });
    }

    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', hideChatAIModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideChatAIModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideChatAIModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideChatAIModal();
        }
    });
}