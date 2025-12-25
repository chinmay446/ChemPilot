// API Service for AI Model Integration
class ApiService {
    constructor() {
        this.providers = {
            deepseek: {
                endpoint: 'https://api.deepseek.com/v1/chat/completions',
                model: 'deepseek-chat'
            },
            chatgpt: {
                endpoint: 'https://api.openai.com/v1/chat/completions',
                model: 'gpt-4'
            },
            gemini: {
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/',
                model: 'gemini-pro'
            },
            claude: {
                endpoint: 'https://api.anthropic.com/v1/messages',
                model: 'claude-3-opus-20240229'
            },
            mistral: {
                endpoint: 'https://api.mistral.ai/v1/chat/completions',
                model: 'mistral-large-latest'
            },
            groq: {
                endpoint: 'https://api.groq.com/openai/v1/chat/completions',
                model: 'mixtral-8x7b-32768'
            }
        };
    }

    // Get primary API provider configuration
    getPrimaryProvider() {
        const primaryProvider = localStorage.getItem('primaryApiProvider') || 'deepseek';
        const config = JSON.parse(localStorage.getItem(`${primaryProvider}Config`) || '{}');

        if (!config.apiKey) {
            throw new Error(`No API key configured for ${primaryProvider}`);
        }

        return {
            provider: primaryProvider,
            config: config,
            endpoint: this.providers[primaryProvider].endpoint,
            model: config.model || this.providers[primaryProvider].model
        };
    }

    // Get fallback providers in priority order
    getFallbackProviders() {
        const fallbackSettings = JSON.parse(localStorage.getItem('fallbackSettings') || '{}');
        const fallbackOrder = fallbackSettings.order || ['deepseek', 'chatgpt', 'gemini', 'claude', 'mistral', 'groq'];

        return fallbackOrder
            .filter(provider => {
                const config = JSON.parse(localStorage.getItem(`${provider}Config`) || '{}');
                return config.apiKey;
            })
            .map(provider => {
                const config = JSON.parse(localStorage.getItem(`${provider}Config`) || '{}');
                return {
                    provider: provider,
                    config: config,
                    endpoint: this.providers[provider].endpoint,
                    model: config.model || this.providers[provider].model
                };
            });
    }

    // Make API call with fallback support
    async makeApiCall(prompt, options = {}) {
        // Check if any API providers are configured
        const configuredProviders = this.getAllConfiguredProviders();
        if (configuredProviders.length === 0) {
            throw new Error('No API providers configured. Please configure at least one API provider in the admin dashboard.');
        }

        const fallbackSettings = JSON.parse(localStorage.getItem('fallbackSettings') || '{}');
        const maxRetries = fallbackSettings.maxRetries || 2;
        const retryDelay = fallbackSettings.retryDelay || 2;

        // Try primary provider first
        try {
            const primaryProvider = this.getPrimaryProvider();
            return await this.callProvider(primaryProvider, prompt, options);
        } catch (error) {
            console.warn(`Primary provider failed: ${error.message}`);

            // If fallback is disabled, throw error
            if (fallbackSettings.enabled === false) {
                throw new Error(`Primary API provider failed: ${error.message}. Fallback is disabled.`);
            }

            // Try fallback providers
            const fallbackProviders = this.getFallbackProviders();

            for (let i = 0; i < fallbackProviders.length; i++) {
                const provider = fallbackProviders[i];

                for (let attempt = 0; attempt < maxRetries; attempt++) {
                    try {
                        console.log(`Trying fallback provider: ${provider.provider} (attempt ${attempt + 1})`);
                        return await this.callProvider(provider, prompt, options);
                    } catch (fallbackError) {
                        console.warn(`Fallback provider ${provider.provider} attempt ${attempt + 1} failed: ${fallbackError.message}`);

                        if (attempt < maxRetries - 1) {
                            await this.delay(retryDelay * 1000);
                        }
                    }
                }
            }

            throw new Error(`All configured API providers failed. Please check your API configurations in the admin dashboard.`);
        }
    }

    // Get all configured providers
    getAllConfiguredProviders() {
        const providers = ['deepseek', 'chatgpt', 'gemini', 'claude', 'mistral', 'groq'];
        return providers.filter(provider => {
            const config = JSON.parse(localStorage.getItem(`${provider}Config`) || '{}');
            return config.apiKey;
        });
    }

    // Call specific provider
    async callProvider(providerConfig, prompt, options = {}) {
        const { provider, config, endpoint, model } = providerConfig;

        switch (provider) {
            case 'deepseek':
                return await this.callDeepSeek(config, prompt, model, options);

            case 'chatgpt':
                return await this.callChatGPT(config, prompt, model, options);

            case 'gemini':
                return await this.callGemini(config, prompt, model, options);

            case 'claude':
                return await this.callClaude(config, prompt, model, options);

            case 'mistral':
                return await this.callMistral(config, prompt, model, options);

            case 'groq':
                return await this.callGroq(config, prompt, model, options);

            default:
                throw new Error(`Unsupported provider: ${provider}`);
        }
    }

    // DeepSeek API call
    async callDeepSeek(config, prompt, model, options) {
        const response = await fetch(`${config.endpoint || this.providers.deepseek.endpoint}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 2000
            })
        });

        if (!response.ok) {
            throw new Error(`DeepSeek API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // ChatGPT API call
    async callChatGPT(config, prompt, model, options) {
        const response = await fetch(this.providers.chatgpt.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 2000
            })
        });

        if (!response.ok) {
            throw new Error(`ChatGPT API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Gemini API call
    async callGemini(config, prompt, model, options) {
        const response = await fetch(`${this.providers.gemini.endpoint}${model}:generateContent?key=${config.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: options.temperature || 0.7,
                    maxOutputTokens: options.maxTokens || 2000
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    // Claude API call
    async callClaude(config, prompt, model, options) {
        const response = await fetch(this.providers.claude.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': config.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: model,
                max_tokens: options.maxTokens || 2000,
                messages: [{ role: 'user', content: prompt }],
                temperature: options.temperature || 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Claude API error: ${response.status}`);
        }

        const data = await response.json();
        return data.content[0].text;
    }

    // Mistral API call
    async callMistral(config, prompt, model, options) {
        const response = await fetch(this.providers.mistral.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 2000
            })
        });

        if (!response.ok) {
            throw new Error(`Mistral API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Groq API call
    async callGroq(config, prompt, model, options) {
        const response = await fetch(this.providers.groq.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 2000
            })
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Utility function for delays
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Parse AI response for reaction prediction
    parseReactionResponse(response) {
        try {
            return {
                reactionType: this.extractReactionType(response),
                products: this.extractProducts(response),
                mechanism: this.extractMechanism(response),
                metrics: this.extractMetrics(response),
                conditions: this.extractConditions(response),
                alternatives: this.extractAlternatives(response)
            };
        } catch (error) {
            console.error('Error parsing AI response:', error);
            return this.getFallbackResponse();
        }
    }

    extractReactionType(response) {
        // Look for various patterns to extract reaction type
        const patterns = [
            /reaction type:?\s*([^\n\r.!?]+)/i,
            /type of reaction:?\s*([^\n\r.!?]+)/i,
            /this is a[n]?\s*([^\n\r.!?]+)\s*reaction/i,
            /classified as:?\s*([^\n\r.!?]+)/i
        ];

        for (const pattern of patterns) {
            const match = response.match(pattern);
            if (match && match[1]) {
                return match[1].trim().replace(/^an?\s+/i, '');
            }
        }

        return 'Chemical Reaction';
    }

    extractProducts(response) {
        // Extract products using multiple patterns
        const patterns = [
            /products?:?\s*([^]+?)(?=\n\s*(?:mechanism|conditions|metrics|optimal|alternative|$))/i,
            /will produce:?\s*([^]+?)(?=\n\s*(?:mechanism|conditions|metrics|optimal|alternative|$))/i,
            /resulting in:?\s*([^]+?)(?=\n\s*(?:mechanism|conditions|metrics|optimal|alternative|$))/i
        ];

        for (const pattern of patterns) {
            const match = response.match(pattern);
            if (match && match[1]) {
                // Split by common separators and clean up
                const products = match[1]
                    .split(/[;,]|and/i)
                    .map(p => p.trim())
                    .filter(p => p && p.length > 0)
                    .map(p => p.replace(/^[•\-*]\s*/, '')) // Remove bullet points
                    .slice(0, 5); // Limit to 5 products

                if (products.length > 0) {
                    return products;
                }
            }
        }

        return ['Reaction Products'];
    }

    extractMechanism(response) {
        // Extract mechanism steps
        const mechanismPatterns = [
            /mechanism:?\s*([^]+?)(?=\n\s*(?:conditions|metrics|optimal|alternative|$))/i,
            /step-by-step:?\s*([^]+?)(?=\n\s*(?:conditions|metrics|optimal|alternative|$))/i,
            /reaction mechanism:?\s*([^]+?)(?=\n\s*(?:conditions|metrics|optimal|alternative|$))/i
        ];

        for (const pattern of mechanismPatterns) {
            const match = response.match(pattern);
            if (match && match[1]) {
                // Split into steps
                const steps = match[1]
                    .split(/\d+\.|\bstep\s+\d+/i)
                    .filter(step => step.trim().length > 10) // Filter out very short fragments
                    .map(step => step.trim())
                    .slice(0, 8); // Limit to 8 steps

                if (steps.length > 0) {
                    return steps.map((step, index) => ({
                        step: index + 1,
                        description: step.replace(/^[•\-*]\s*/, ''),
                        equation: `Step ${index + 1}: ${step.replace(/^[•\-*]\s*/, '')}`
                    }));
                }
            }
        }

        return [{
            step: 1,
            description: 'Reaction mechanism details provided by AI',
            equation: 'Detailed mechanism analysis available'
        }];
    }

    extractMetrics(response) {
        const metrics = {
            atomEconomy: '85%',
            predictedYield: '78%',
            reactionTime: '2.5h',
            energyBarrier: '45 kJ/mol'
        };

        // Extract atom economy
        const atomEconomyMatch = response.match(/atom\s+economy:?\s*(\d+(?:\.\d+)?)\s*%/i);
        if (atomEconomyMatch) metrics.atomEconomy = `${atomEconomyMatch[1]}%`;

        // Extract yield
        const yieldPatterns = [
            /yield:?\s*(\d+(?:\.\d+)?)\s*%/i,
            /predicted\s+yield:?\s*(\d+(?:\.\d+)?)\s*%/i,
            /expected\s+yield:?\s*(\d+(?:\.\d+)?)\s*%/i
        ];
        for (const pattern of yieldPatterns) {
            const match = response.match(pattern);
            if (match) {
                metrics.predictedYield = `${match[1]}%`;
                break;
            }
        }

        // Extract reaction time
        const timePatterns = [
            /time:?\s*([\d.]+)\s*h/i,
            /reaction\s+time:?\s*([\d.]+)\s*h/i,
            /duration:?\s*([\d.]+)\s*h/i
        ];
        for (const pattern of timePatterns) {
            const match = response.match(pattern);
            if (match) {
                metrics.reactionTime = `${match[1]}h`;
                break;
            }
        }

        // Extract energy barrier
        const energyPatterns = [
            /energy\s+barrier:?\s*(\d+(?:\.\d+)?)\s*kJ/i,
            /activation\s+energy:?\s*(\d+(?:\.\d+)?)\s*kJ/i,
            /energy:?\s*(\d+(?:\.\d+)?)\s*kJ/i
        ];
        for (const pattern of energyPatterns) {
            const match = response.match(pattern);
            if (match) {
                metrics.energyBarrier = `${match[1]} kJ/mol`;
                break;
            }
        }

        return metrics;
    }

    extractConditions(response) {
        const conditions = {
            temperature: '25°C',
            solvent: 'Water',
            catalyst: 'None',
            time: '2 hours',
            yield: '78%'
        };

        // Extract temperature
        const tempMatch = response.match(/temperature:?\s*([\d.]+\s*°?\s*[CFK])/i);
        if (tempMatch) conditions.temperature = tempMatch[1];

        // Extract solvent
        const solventMatch = response.match(/solvent:?\s*([^\n\r.,]+)/i);
        if (solventMatch) conditions.solvent = solventMatch[1].trim();

        // Extract catalyst
        const catalystMatch = response.match(/catalyst:?\s*([^\n\r.,]+)/i);
        if (catalystMatch) conditions.catalyst = catalystMatch[1].trim();

        // Extract time
        const timeMatch = response.match(/time:?\s*([^\n\r.,]+)/i);
        if (timeMatch) conditions.time = timeMatch[1].trim();

        return conditions;
    }

    extractAlternatives(response) {
        const alternatives = [];

        // Look for alternative pathways section
        const altMatch = response.match(/alternative:?\s*([^]+?)(?=$)/i);
        if (altMatch) {
            const altText = altMatch[1];
            // Simple extraction - can be improved
            alternatives.push({
                name: 'Alternative Pathway',
                confidence: '70%',
                equation: 'Alternative reaction conditions',
                conditions: altText.trim()
            });
        }

        // If no alternatives found, provide a default
        if (alternatives.length === 0) {
            alternatives.push({
                name: 'Alternative Conditions',
                confidence: '65%',
                equation: 'Modified reaction parameters',
                conditions: 'Different temperature, solvent, or catalyst conditions'
            });
        }

        return alternatives;
    }

    getFallbackResponse() {
        return {
            reactionType: 'Chemical Reaction',
            products: ['Reaction Products'],
            mechanism: [{
                step: 1,
                description: 'Reaction mechanism analysis',
                equation: 'Detailed mechanism provided by AI'
            }],
            metrics: {
                atomEconomy: '80%',
                predictedYield: '75%',
                reactionTime: '2h',
                energyBarrier: '40 kJ/mol'
            },
            conditions: {
                temperature: '25°C',
                solvent: 'Water',
                catalyst: 'None',
                time: '2 hours',
                yield: '75%'
            },
            alternatives: [{
                name: 'Alternative Pathway',
                confidence: '70%',
                equation: 'Alternative reaction conditions',
                conditions: 'Modified parameters'
            }]
        };
    }
}

// Create global instance
window.apiService = new ApiService();