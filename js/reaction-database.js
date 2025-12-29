// Reaction Database Management System
class ReactionDatabase {
    constructor() {
        this.storageKey = 'chemPilotReactions';
        this.reactions = this.loadReactions();
    }

    // Load reactions from localStorage
    loadReactions() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (error) {
            console.error('Error loading reactions from localStorage:', error);
        }
        return this.getDefaultReactions();
    }

    // Save reactions to localStorage
    saveReactions() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.reactions));
        } catch (error) {
            console.error('Error saving reactions:', error);
        }
    }

    // Get default reactions for initial setup
    getDefaultReactions() {
        return [
            {
                id: 'rxn_001',
                name: 'Esterification of Acetic Acid',
                reactants: ['CH3COOH', 'CH3CH2OH'],
                reagents: ['H2SO4'],
                products: ['CH3COOCH2CH3', 'H2O'],
                mechanism: [
                    'Protonation of carboxylic acid oxygen by H2SO4',
                    'Nucleophilic attack by ethanol oxygen on carbonyl carbon',
                    'Proton transfer from oxygen to another oxygen',
                    'Loss of water molecule, forming oxonium ion',
                    'Deprotonation by base, yielding ester'
                ],
                conditions: {
                    temperature: '140',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [
                    {
                        method: 'DCC Coupling',
                        reagents: ['DCC', 'DMAP'],
                        advantages: 'Milder conditions, higher yields for complex molecules',
                        disadvantages: 'Expensive reagents, side products'
                    },
                    {
                        method: 'Acid Chloride Method',
                        reagents: ['SOCl2', 'Pyridine'],
                        advantages: 'Fast reaction, good yields',
                        disadvantages: 'Corrosive reagents'
                    }
                ],
                category: 'Organic Synthesis',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_002',
                name: 'Aldol Condensation',
                reactants: ['CH3CHO', 'CH3CHO'],
                reagents: ['NaOH'],
                products: ['CH3CH=CHCHO'],
                mechanism: [
                    'Base abstracts alpha-hydrogen from first aldehyde',
                    'Enolate ion attacks carbonyl of second aldehyde',
                    'Tetrahedral intermediate forms',
                    'Protonation gives beta-hydroxy aldehyde',
                    'Dehydration under basic conditions gives alpha,beta-unsaturated aldehyde'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '92',
                    energyEfficiency: 'High'
                },
                alternatePathways: [
                    {
                        method: 'Acid-catalyzed',
                        reagents: ['HCl'],
                        advantages: 'Simple reagents',
                        disadvantages: 'Lower selectivity'
                    },
                    {
                        method: 'Base-catalyzed Cross Aldol',
                        reagents: ['NaOH', 'Different aldehydes'],
                        advantages: 'Forms mixed products',
                        disadvantages: 'Requires careful control'
                    },
                    {
                        method: 'Intramolecular Aldol',
                        reagents: ['NaOH', 'Diketone precursor'],
                        advantages: 'Forms rings',
                        disadvantages: 'Limited to specific substrates'
                    }
                ],
                category: 'Carbonyl Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_003',
                name: 'SN2 Reaction: Bromomethane + Hydroxide',
                reactants: ['CH3Br', 'OH-'],
                reagents: [],
                products: ['CH3OH', 'Br-'],
                mechanism: [
                    'Hydroxide ion approaches carbon from opposite side of leaving group',
                    'Transition state forms with partial bonds',
                    'Bromine leaves as bromide ion',
                    'Methanol forms with inverted configuration'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Nucleophilic Substitution',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_004',
                name: 'Grignard Reaction',
                reactants: ['C6H5Br', 'CH3CHO'],
                reagents: ['Mg', 'H3O+'],
                products: ['C6H5CH(OH)CH3'],
                mechanism: [
                    'Magnesium inserts into C-Br bond forming Grignard reagent',
                    'Grignard carbon nucleophilically attacks carbonyl carbon',
                    'Tetrahedral alkoxide intermediate forms',
                    'Protonation gives secondary alcohol'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Diethyl ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organometallic Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_005',
                name: 'Diels-Alder Reaction',
                reactants: ['C4H6', 'C2H2O2'],
                reagents: [],
                products: ['C6H8O2'],
                mechanism: [
                    'Diene and dienophile approach in parallel planes',
                    'New sigma bonds form simultaneously',
                    'Six-membered ring with double bond forms',
                    'Stereospecific cycloaddition occurs'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Pericyclic Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_006',
                name: 'Friedel-Crafts Acylation',
                reactants: ['C6H6', 'CH3COCl'],
                reagents: ['AlCl3'],
                products: ['C6H5COCH3', 'HCl'],
                mechanism: [
                    'Aluminum chloride complexes with acyl chloride',
                    'Acyl cation forms',
                    'Electrophilic aromatic substitution occurs',
                    'Proton elimination restores aromaticity'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dichloromethane',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '82',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_007',
                name: 'Wittig Reaction',
                reactants: ['(C6H5)3P=CH2', 'C6H5CHO'],
                reagents: [],
                products: ['C6H5CH=CH2', '(C6H5)3P=O'],
                mechanism: [
                    'Phosphorus ylide attacks carbonyl carbon',
                    'Tetrahedral intermediate forms',
                    'Oxaphosphetane ring forms',
                    'Alkene and phosphine oxide eliminate'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_008',
                name: 'E2 Elimination',
                reactants: ['CH3CHBrCH2CH3'],
                reagents: ['NaOH'],
                products: ['CH3CH=CHCH3', 'H2O', 'NaBr'],
                mechanism: [
                    'Base abstracts beta-hydrogen',
                    'Leaving group departs simultaneously',
                    'Double bond forms between alpha and beta carbons',
                    'Anti-periplanar transition state required'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '88',
                    atomEconomy: '91',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_009',
                name: 'Oxidation of Alcohol to Ketone',
                reactants: ['(CH3)2CHOH'],
                reagents: ['PCC'],
                products: ['(CH3)2C=O'],
                mechanism: [
                    'Chromium(VI) forms chromate ester',
                    'Beta-elimination occurs',
                    'Carbonyl compound forms',
                    'Chromium(IV) byproduct'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dichloromethane',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [
                    {
                        method: 'Swern Oxidation',
                        reagents: ['DMSO', 'oxalyl chloride', 'Et3N'],
                        advantages: 'Milder conditions, no heavy metals',
                        disadvantages: 'More expensive reagents'
                    }
                ],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_010',
                name: 'Reduction of Nitrobenzene',
                reactants: ['C6H5NO2'],
                reagents: ['Sn', 'HCl'],
                products: ['C6H5NH2'],
                mechanism: [
                    'Nitro group accepts electrons',
                    'Hydroxylamine intermediate forms',
                    'Further reduction gives amine',
                    'Tin complexes removed by acid'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '58',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [
                    {
                        method: 'Catalytic Hydrogenation',
                        reagents: ['H2', 'Pd/C'],
                        advantages: 'Cleaner reaction, higher yields',
                        disadvantages: 'Requires pressure equipment'
                    }
                ],
                category: 'Reduction Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_011',
                name: 'Hydrolysis of Ester',
                reactants: ['CH3COOCH3'],
                reagents: ['NaOH', 'H2O'],
                products: ['CH3COONa', 'CH3OH'],
                mechanism: [
                    'Hydroxide attacks carbonyl carbon',
                    'Tetrahedral intermediate forms',
                    'Alkoxide leaves as methanol',
                    'Carboxylate ion forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Hydrolysis',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_012',
                name: 'Cannizzaro Reaction',
                reactants: ['C6H5CHO', 'C6H5CHO'],
                reagents: ['NaOH'],
                products: ['C6H5COONa', 'C6H5CH2OH'],
                mechanism: [
                    'One aldehyde is oxidized, one is reduced',
                    'Hydride transfer occurs',
                    'Carboxylate and alcohol form',
                    'No external oxidizing agent needed'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [
                    {
                        method: 'Cross Cannizzaro',
                        reagents: ['NaOH', 'Formaldehyde + Aromatic aldehyde'],
                        advantages: 'Selective reduction of aromatic aldehydes',
                        disadvantages: 'Requires specific aldehyde combination'
                    },
                    {
                        method: 'Tishchenko Reaction',
                        reagents: ['Aluminum alkoxide'],
                        advantages: 'Catalytic, forms esters',
                        disadvantages: 'Limited to aldehydes'
                    }
                ],
                category: 'Redox Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_013',
                name: 'Heck Reaction',
                reactants: ['C6H5I', 'CH2=CHCOOCH3'],
                reagents: ['Pd(OAc)2', 'PPh3', 'Et3N'],
                products: ['C6H5CH=CHCOOCH3'],
                mechanism: [
                    'Oxidative addition of aryl halide to Pd(0)',
                    'Alkene coordinates to palladium',
                    'Migratory insertion occurs',
                    'Beta-hydride elimination gives product'
                ],
                conditions: {
                    temperature: '120',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organometallic Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_014',
                name: 'Suzuki Coupling',
                reactants: ['C6H5Br', 'C6H5B(OH)2'],
                reagents: ['Pd(PPh3)4', 'Na2CO3'],
                products: ['C6H5-C6H5'],
                mechanism: [
                    'Oxidative addition of aryl halide',
                    'Transmetalation with organoborane',
                    'Reductive elimination gives biaryl',
                    'Palladium catalyst regenerated'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '85',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_015',
                name: 'Gabriel Synthesis',
                reactants: ['C6H5CH2Br', 'phthalimide'],
                reagents: ['K2CO3'],
                products: ['C6H5CH2NH2'],
                mechanism: [
                    'Nucleophilic substitution on alkyl halide',
                    'Phthalimide anion attacks carbon',
                    'Hydrazinolysis cleaves phthaloyl group',
                    'Primary amine forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '68',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Amine Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_016',
                name: 'Claisen Condensation',
                reactants: ['CH3COOCH3', 'CH3COOCH3'],
                reagents: ['NaOCH3'],
                products: ['CH3COCH2COCH3'],
                mechanism: [
                    'Base abstracts alpha-hydrogen',
                    'Enolate attacks second ester carbonyl',
                    'Tetrahedral intermediate forms',
                    'Elimination gives beta-keto ester'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Diethyl ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '83',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_017',
                name: 'Robinson Annulation',
                reactants: ['cyclohexanone', 'MVK'],
                reagents: ['NaOH'],
                products: ['decalone derivative'],
                mechanism: [
                    'Michael addition of enolate to MVK',
                    'Aldol condensation follows',
                    'Six-membered ring forms',
                    'Bicyclic system results'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Ring Formation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_018',
                name: 'Baeyer-Villiger Oxidation',
                reactants: ['C6H5COCH3'],
                reagents: ['mCPBA'],
                products: ['C6H5COOCH3'],
                mechanism: [
                    'Peracid attacks carbonyl oxygen',
                    'Criegee intermediate forms',
                    'Migration of group occurs',
                    'Ester forms with retention'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dichloromethane',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_019',
                name: 'Strecker Synthesis',
                reactants: ['C6H5CHO', 'NH3', 'HCN'],
                reagents: [],
                products: ['C6H5CH(NH2)COOH'],
                mechanism: [
                    'Imine formation from aldehyde and ammonia',
                    'Cyanide adds to imine carbon',
                    'Aminonitrile forms',
                    'Hydrolysis gives amino acid'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '48',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '100',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Amino Acid Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_020',
                name: 'Pinacol Rearrangement',
                reactants: ['(C6H5)2C(OH)C(OH)(C6H5)2'],
                reagents: ['H2SO4'],
                products: ['(C6H5)3C-C6H5'],
                mechanism: [
                    'Protonation of one hydroxyl group',
                    'Water leaves, carbocation forms',
                    '1,2-methyl shift occurs',
                    'Deprotonation gives ketone'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '92',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_021',
                name: 'Fischer Esterification',
                reactants: ['CH3OH', 'CH3COOH'],
                reagents: ['H2SO4'],
                products: ['CH3COOCH3', 'H2O'],
                mechanism: [
                    'Protonation of carbonyl oxygen',
                    'Nucleophilic attack by alcohol',
                    'Proton transfer occurs',
                    'Water elimination gives ester'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Esterification',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_022',
                name: 'Williamson Ether Synthesis',
                reactants: ['C6H5ONa', 'CH3CH2Br'],
                reagents: [],
                products: ['C6H5OCH2CH3', 'NaBr'],
                mechanism: [
                    'Phenoxide ion attacks alkyl halide',
                    'SN2 displacement occurs',
                    'Ether forms with inversion',
                    'Sodium bromide byproduct'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Ether Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_023',
                name: 'Sandmeyer Reaction',
                reactants: ['C6H5NH2'],
                reagents: ['NaNO2', 'HCl', 'CuCl'],
                products: ['C6H5Cl'],
                mechanism: [
                    'Diazonium salt formation',
                    'Copper(I) chloride catalyzes reaction',
                    'Chlorine radical adds',
                    'Nitrogen gas evolves'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '65',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [
                    {
                        method: 'Gattermann Reaction',
                        reagents: ['CuCl', 'HCl'],
                        advantages: 'Avoids copper(II) salts',
                        disadvantages: 'Lower yields'
                    },
                    {
                        method: 'Balz-Schiemann Reaction',
                        reagents: ['HBF4', 'Heat'],
                        advantages: 'Clean reaction, no heavy metals',
                        disadvantages: 'Requires fluoroboric acid'
                    },
                    {
                        method: 'Direct Halogenation',
                        reagents: ['Br2', 'FeBr3'],
                        advantages: 'Simple, direct method',
                        disadvantages: 'Limited to activated rings'
                    }
                ],
                category: 'Aromatic Substitution',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_024',
                name: 'Michael Addition',
                reactants: ['CH2=CHCOOCH3', 'CH3NO2'],
                reagents: ['NaOCH3'],
                products: ['CH3CH(COOCH3)CH2NO2'],
                mechanism: [
                    'Nucleophile adds to beta-position',
                    'Enolate forms from nitroalkane',
                    'Conjugate addition occurs',
                    'Stabilized carbanion results'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Conjugate Addition',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_025',
                name: 'Reformatsky Reaction',
                reactants: ['C6H5CHO', 'BrCH2COOCH3'],
                reagents: ['Zn'],
                products: ['C6H5CH(OH)CH2COOCH3'],
                mechanism: [
                    'Zinc inserts into C-Br bond',
                    'Reformatsky reagent forms',
                    'Nucleophilic addition to carbonyl',
                    'Beta-hydroxy ester results'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Benzene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '87',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organometallic Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_026',
                name: 'Wurtz Reaction',
                reactants: ['CH3Br', 'CH3Br'],
                reagents: ['Na'],
                products: ['CH3CH3', 'NaBr'],
                mechanism: [
                    'Sodium reduces alkyl halide to alkyl radical',
                    'Two alkyl radicals combine',
                    'Ethane forms as product',
                    'Sodium bromide byproduct'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dry ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '67',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Alkane Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_027',
                name: 'Wurtz-Fittig Reaction',
                reactants: ['C6H5Br', 'CH3Br'],
                reagents: ['Na'],
                products: ['C6H5CH3', 'NaBr'],
                mechanism: [
                    'Sodium forms aryl and alkyl radicals',
                    'Aryl and alkyl radicals combine',
                    'Toluene forms as product',
                    'Cross-coupling occurs'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dry ether',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '71',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Aromatic Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_028',
                name: 'Fittig Reaction',
                reactants: ['C6H5Br', 'C6H5Br'],
                reagents: ['Na'],
                products: ['C6H5C6H5', 'NaBr'],
                mechanism: [
                    'Sodium forms phenyl radicals',
                    'Two phenyl radicals combine',
                    'Biphenyl forms as product',
                    'Symmetrical coupling'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dry ether',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_029',
                name: 'Kolbe\'s Electrolysis',
                reactants: ['CH3COONa', 'CH3COONa'],
                reagents: ['Electricity'],
                products: ['CH3CH3', 'CO2', 'H2'],
                mechanism: [
                    'Carboxylate ions discharge at anode',
                    'Acetate radicals decarboxylate',
                    'Methyl radicals combine',
                    'Ethane forms at anode'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '50',
                    atomEconomy: '45',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Electrolysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_030',
                name: 'Frankland Reaction',
                reactants: ['CH3I', 'CH3I'],
                reagents: ['Zn(Cu)'],
                products: ['(CH3)2Zn', 'ZnI2'],
                mechanism: [
                    'Alkyl halide reacts with zinc-copper couple',
                    'Dialkylzinc forms',
                    'Zinc diiodide byproduct',
                    'Organometallic compound synthesis'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dry ether',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '82',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organometallic Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_031',
                name: 'Finkelstein Reaction',
                reactants: ['CH3Br', 'NaI'],
                reagents: [],
                products: ['CH3I', 'NaBr'],
                mechanism: [
                    'Iodide ion attacks alkyl halide',
                    'SN2 displacement occurs',
                    'Alkyl iodide forms',
                    'Sodium bromide byproduct'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetone',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Nucleophilic Substitution',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_032',
                name: 'Swarts Reaction',
                reactants: ['CH3Br', 'AgF'],
                reagents: [],
                products: ['CH3F', 'AgBr'],
                mechanism: [
                    'Fluoride ion attacks alkyl halide',
                    'SN2 displacement occurs',
                    'Alkyl fluoride forms',
                    'Silver bromide byproduct'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dry ether',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Nucleophilic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_033',
                name: 'Gattermann Reaction',
                reactants: ['C6H5N2+Cl-', 'CuCl/HCl'],
                reagents: [],
                products: ['C6H4Cl', 'N2', 'CuCl2'],
                mechanism: [
                    'Diazonium salt reacts with CuCl',
                    'Chlorine radical forms',
                    'Electrophilic aromatic substitution',
                    'Chlorobenzene forms'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '60',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [
                    {
                        method: 'Sandmeyer Reaction',
                        reagents: ['CuCl'],
                        advantages: 'Higher yields, cleaner reaction',
                        disadvantages: 'Requires copper catalyst'
                    }
                ],
                category: 'Aromatic Substitution',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_034',
                name: 'Kolbe-Schmitt Reaction',
                reactants: ['C6H5ONa', 'CO2'],
                reagents: [],
                products: ['C6H4(OH)COONa'],
                mechanism: [
                    'Phenoxide attacks CO2',
                    'Carboxylate forms',
                    'Ortho attack occurs',
                    'Salicylic acid derivative forms'
                ],
                conditions: {
                    temperature: '120',
                    temperatureUnit: '°C',
                    pressure: '5',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carboxylic Acid Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_035',
                name: 'Reimer-Tiemann Reaction',
                reactants: ['C6H5OH', 'CHCl3'],
                reagents: ['NaOH'],
                products: ['C6H4(OH)CHO'],
                mechanism: [
                    'Dichlorocarbene forms from chloroform',
                    'Carbene attacks phenol ring',
                    'Ortho attack occurs',
                    'Salicylaldehyde forms'
                ],
                conditions: {
                    temperature: '70',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aldehyde Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_036',
                name: 'Lucas Test',
                reactants: ['ROH', 'ZnCl2'],
                reagents: ['HCl'],
                products: ['RCl', 'H2O'],
                mechanism: [
                    'Alcohol protonated',
                    'Chloride attacks carbon',
                    'SN1 or SN2 occurs',
                    'Alkyl chloride forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Concentrated HCl',
                    time: '0.1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Alcohol Tests',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_037',
                name: 'Cross Aldol Condensation',
                reactants: ['CH3CHO', 'C6H5CHO'],
                reagents: ['NaOH'],
                products: ['C6H5CH=CHCHO'],
                mechanism: [
                    'Acetaldehyde enolate attacks benzaldehyde',
                    'Beta-hydroxy aldehyde forms',
                    'Dehydration occurs',
                    'Cinnamaldehyde forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '92',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_038',
                name: 'Clemmensen Reduction',
                reactants: ['C6H5COCH3'],
                reagents: ['Zn(Hg)', 'HCl'],
                products: ['C6H5CH2CH3'],
                mechanism: [
                    'Ketone forms carbanion intermediate',
                    'Zinc amalgam reduces carbonyl',
                    'Alkane forms',
                    'Methylene group results'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [
                    {
                        method: 'Wolff-Kishner Reduction',
                        reagents: ['NH2NH2', 'KOH'],
                        advantages: 'Milder conditions, no heavy metals',
                        disadvantages: 'Strong base required'
                    }
                ],
                category: 'Reduction Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_039',
                name: 'Wolff-Kishner Reduction',
                reactants: ['C6H5COCH3'],
                reagents: ['NH2NH2', 'KOH'],
                products: ['C6H5CH2CH3'],
                mechanism: [
                    'Hydrazone forms from ketone',
                    'Strong base abstracts proton',
                    'Nitrogen gas eliminates',
                    'Carbanion protonated'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Triethylene glycol',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [
                    {
                        method: 'Clemmensen Reduction',
                        reagents: ['Zn(Hg)', 'HCl'],
                        advantages: 'Works with acid-sensitive compounds',
                        disadvantages: 'Harsh conditions'
                    }
                ],
                category: 'Reduction Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_040',
                name: 'Rosenmund Reduction',
                reactants: ['C6H5COCl'],
                reagents: ['H2', 'Pd/BaSO4', 'S'],
                products: ['C6H5CHO'],
                mechanism: [
                    'Acid chloride adsorbs on poisoned catalyst',
                    'Hydrogen adds selectively',
                    'Aldehyde forms',
                    'Over-reduction prevented'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Xylene',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '67',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Reduction Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_041',
                name: 'Stephen Reaction',
                reactants: ['C6H5CN'],
                reagents: ['SnCl2', 'HCl'],
                products: ['C6H5CH=N(OH)'],
                mechanism: [
                    'Nitrile forms iminium salt',
                    'Hydrolysis occurs',
                    'Aldoxime forms',
                    'Further hydrolysis gives aldehyde'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aldehyde Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_042',
                name: 'Hell-Volhard-Zelinsky Reaction',
                reactants: ['CH3CH2COOH'],
                reagents: ['PBr3', 'Br2'],
                products: ['CH3CH(Br)COOH'],
                mechanism: [
                    'Carboxylic acid forms acid bromide',
                    'Enol form alpha-brominated',
                    'Alpha-bromo acid forms',
                    'Further bromination possible'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carboxylic Acid Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_043',
                name: 'Perkin Reaction',
                reactants: ['C6H5CHO', 'CH3COOH'],
                reagents: ['(CH3CO)2O', 'Sodium acetate'],
                products: ['C6H5CH=CHCOOH'],
                mechanism: [
                    'Mixed anhydride forms',
                    'Carbanion attacks aldehyde',
                    'Beta-hydroxy acid forms',
                    'Dehydration gives cinnamic acid'
                ],
                conditions: {
                    temperature: '180',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carboxylic Acid Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_044',
                name: 'Benzoin Condensation',
                reactants: ['C6H5CHO', 'C6H5CHO'],
                reagents: ['CN-', 'Ethanol'],
                products: ['C6H5COCH(OH)C6H5'],
                mechanism: [
                    'Cyanide adds to aldehyde',
                    'Carbanion attacks second aldehyde',
                    'Tetrahedral intermediate forms',
                    'Benzoin eliminates cyanide'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_045',
                name: 'Haloform Reaction',
                reactants: ['CH3COCH3'],
                reagents: ['NaOH', 'I2'],
                products: ['CH3COONa', 'CHI3'],
                mechanism: [
                    'Methyl ketone enolizes',
                    'Iodine adds to enol',
                    'Triiodomethyl ketone forms',
                    'Cleavage gives haloform'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_046',
                name: 'Hoffmann Bromamide Reaction',
                reactants: ['C6H5CONH2'],
                reagents: ['Br2', 'NaOH'],
                products: ['C6H5NH2', 'Na2CO3'],
                mechanism: [
                    'Amide deprotonated',
                    'Bromine adds to nitrogen',
                    'Isocyanate forms',
                    'Hydrolysis gives amine'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '68',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Amine Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_047',
                name: 'Carbylamine Reaction',
                reactants: ['C6H5NH2', 'CHCl3'],
                reagents: ['KOH'],
                products: ['C6H5NC', 'KCl', 'H2O'],
                mechanism: [
                    'Dichlorocarbene forms',
                    'Carbene attacks amine nitrogen',
                    'Isocyanide forms',
                    'Characteristic odor'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '0.5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Amine Tests',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_048',
                name: 'Diazotization Reaction',
                reactants: ['C6H5NH2', 'NaNO2'],
                reagents: ['HCl'],
                products: ['C6H5N2+Cl-'],
                mechanism: [
                    'Amine protonated',
                    'Nitrous acid attacks',
                    'Diazonium salt forms',
                    'Stable at low temperature'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.25',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Diazonium Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_049',
                name: 'Coupling Reaction',
                reactants: ['C6H5N2+Cl-', 'C6H5OH'],
                reagents: ['NaOH'],
                products: ['C6H5-N=N-C6H4-OH'],
                mechanism: [
                    'Diazonium ion electrophilic',
                    'Phenoxide attacks para position',
                    'Azo compound forms',
                    'Colorful dye results'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Dye Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_050',
                name: 'Hinsberg Test',
                reactants: ['C6H5NH2', 'C6H5SO2Cl'],
                reagents: ['NaOH'],
                products: ['C6H5NHSO2C6H5'],
                mechanism: [
                    'Sulfonyl chloride reacts with amine',
                    'Sulfonamide forms',
                    'Solubility determines amine type',
                    'Primary amines give soluble salts'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Amine Tests',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_051',
                name: 'Schotten-Baumann Reaction',
                reactants: ['C6H5COOH', 'C6H5NH2'],
                reagents: ['SOCl2'],
                products: ['C6H5CONHC6H5'],
                mechanism: [
                    'Acid chloride forms first',
                    'Amine attacks carbonyl',
                    'Amide forms',
                    'Water eliminated'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '85',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Amide Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_052',
                name: 'Molisch Test',
                reactants: ['Carbohydrate', 'α-Naphthol'],
                reagents: ['H2SO4'],
                products: ['Purple ring'],
                mechanism: [
                    'Carbohydrate dehydrated',
                    'Furfural derivative forms',
                    'Condenses with naphthol',
                    'Colored complex forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: 'N/A',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Carbohydrate Tests',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_053',
                name: 'Biuret Test',
                reactants: ['Protein', 'CuSO4'],
                reagents: ['NaOH'],
                products: ['Violet complex'],
                mechanism: [
                    'Peptide bonds coordinate copper',
                    'Complex forms with NaOH',
                    'Violet color develops',
                    'Indicates peptide bonds'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: 'N/A',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Protein Tests',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_054',
                name: 'Ninhydrin Reaction',
                reactants: ['Amino acid', 'Ninhydrin'],
                reagents: [],
                products: ['Ruhemann\'s purple'],
                mechanism: [
                    'Amino acid decarboxylated',
                    'Imine forms with ninhydrin',
                    'Ruhemann\'s purple forms',
                    'Characteristic color'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.25',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: 'N/A',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Amino Acid Tests',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_055',
                name: 'Xanthoproteic Reaction',
                reactants: ['Protein', 'HNO3'],
                reagents: [],
                products: ['Yellow precipitate'],
                mechanism: [
                    'Nitration of aromatic rings',
                    'Yellow color develops',
                    'Precipitate forms',
                    'Indicates aromatic amino acids'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: 'N/A',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Protein Tests',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_056',
                name: 'Addition Polymerization',
                reactants: ['CH2=CH2'],
                reagents: ['Initiator'],
                products: ['-(CH2-CH2)-n'],
                mechanism: [
                    'Initiator forms radical',
                    'Radical adds to monomer',
                    'Chain propagation occurs',
                    'Polymer forms'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_057',
                name: 'Condensation Polymerization',
                reactants: ['HOOC-R-COOH', 'HO-R\'-OH'],
                reagents: [],
                products: ['Polymer', 'H2O'],
                mechanism: [
                    'Carboxylic acid and alcohol react',
                    'Ester linkage forms',
                    'Water eliminated',
                    'Polymer chain grows'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '95',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Polymer Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_058',
                name: 'SN1 Reaction: tert-Butyl Chloride Hydrolysis',
                reactants: ['(CH3)3CCl'],
                reagents: ['H2O'],
                products: ['(CH3)3COH', 'HCl'],
                mechanism: [
                    'tert-Butyl chloride loses chloride ion',
                    'Carbocation intermediate forms',
                    'Water attacks carbocation',
                    'tert-Butyl alcohol forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Nucleophilic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_059',
                name: 'E1 Elimination: tert-Butyl Chloride Dehydrohalogenation',
                reactants: ['(CH3)3CCl'],
                reagents: ['NaOH'],
                products: ['(CH3)2C=CH2', 'H2O', 'NaCl'],
                mechanism: [
                    'tert-Butyl chloride loses chloride ion',
                    'Carbocation intermediate forms',
                    'Beta-hydrogen abstracted',
                    'Isobutene forms'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '91',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_060',
                name: 'Electrophilic Addition: Ethene + HBr',
                reactants: ['CH2=CH2'],
                reagents: ['HBr'],
                products: ['CH3CH2Br'],
                mechanism: [
                    'Hydrogen bromide protonates double bond',
                    'Carbocation intermediate forms',
                    'Bromide ion attacks carbocation',
                    'Bromoethane forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '0.5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Addition Reactions',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_061',
                name: 'Electrophilic Addition: Ethyne + HBr',
                reactants: ['HC≡CH'],
                reagents: ['HBr'],
                products: ['CH3-CBr=CH2'],
                mechanism: [
                    'First HBr adds to triple bond',
                    'Vinyl carbocation forms',
                    'Second HBr adds',
                    'Geminal dibromide forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Addition Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_062',
                name: 'Oxidation of Primary Alcohol to Aldehyde',
                reactants: ['CH3CH2OH'],
                reagents: ['PCC'],
                products: ['CH3CHO'],
                mechanism: [
                    'Chromium(VI) forms chromate ester',
                    'Beta-elimination occurs',
                    'Aldehyde forms',
                    'Further oxidation prevented'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dichloromethane',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_063',
                name: 'Reduction of Ketone with NaBH4',
                reactants: ['CH3COCH3'],
                reagents: ['NaBH4'],
                products: ['(CH3)2CHOH'],
                mechanism: [
                    'Hydride from NaBH4 attacks carbonyl',
                    'Tetrahedral alkoxide forms',
                    'Protonation gives alcohol',
                    'Secondary alcohol results'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Reduction Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_064',
                name: 'Acid-Base Neutralization',
                reactants: ['HCl', 'NaOH'],
                reagents: [],
                products: ['NaCl', 'H2O'],
                mechanism: [
                    'Hydrogen ion from acid',
                    'Hydroxide ion from base',
                    'Water and salt form',
                    'Neutralization occurs'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Acid-Base Chemistry',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_065',
                name: 'Nucleophilic Acyl Substitution: Acetyl Chloride + Ammonia',
                reactants: ['CH3COCl'],
                reagents: ['NH3'],
                products: ['CH3CONH2', 'HCl'],
                mechanism: [
                    'Ammonia attacks carbonyl carbon',
                    'Tetrahedral intermediate forms',
                    'Chloride leaves',
                    'Acetamide forms'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Diethyl ether',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '85',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Acyl Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_066',
                name: 'Claisen Rearrangement',
                reactants: ['C6H5OCH2CH=CH2'],
                reagents: [],
                products: ['C6H4(OH)CH2CH=CH2'],
                mechanism: [
                    'Allyl aryl ether heats',
                    'Sigmatropic rearrangement occurs',
                    'Ortho position attacked',
                    'Allyl phenol forms'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_067',
                name: 'Cope Rearrangement',
                reactants: ['CH2=CH-CH2-O-CH2-CH=CH2'],
                reagents: [],
                products: ['Same molecule'],
                mechanism: [
                    '1,5-Diene system',
                    'Sigmatropic rearrangement',
                    'Chair-like transition state',
                    'Isomerization occurs'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_068',
                name: 'Aldol Addition Reaction',
                reactants: ['CH3CHO', 'CH3CHO'],
                reagents: ['NaOH'],
                products: ['CH3CH(OH)CH2CHO'],
                mechanism: [
                    'Base abstracts alpha-hydrogen',
                    'Enolate attacks second aldehyde',
                    'Beta-hydroxy aldehyde forms',
                    'Addition product results'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_069',
                name: 'Tishchenko Reaction',
                reactants: ['C6H5CHO', 'C6H5CHO'],
                reagents: ['Al(OCH3)3'],
                products: ['C6H5COOCH2C6H5'],
                mechanism: [
                    'Aluminum alkoxide catalyzes',
                    'Hydride transfer occurs',
                    'Ester forms from aldehyde',
                    'No external reducing agent'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Benzene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Redox Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_070',
                name: 'Benzilic Acid Rearrangement',
                reactants: ['C6H5COCOC6H5'],
                reagents: ['KOH'],
                products: ['C6H5C(OH)(COOH)C6H5'],
                mechanism: [
                    'Base attacks carbonyl',
                    'Carbanion forms',
                    '1,2-migration occurs',
                    'Alpha-hydroxy acid forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_071',
                name: 'Favorskii Rearrangement',
                reactants: ['C6H5COCH2Br'],
                reagents: ['NaOH'],
                products: ['C6H5CH2COOH'],
                mechanism: [
                    'Base abstracts alpha-hydrogen',
                    'Enolate attacks carbonyl',
                    'Cyclopropanone intermediate',
                    'Ring opens to carboxylate'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_072',
                name: 'Hofmann Elimination',
                reactants: ['C6H5CH2CH2N(CH3)3+'],
                reagents: ['Ag2O', 'H2O'],
                products: ['C6H5CH=CH2', 'HN(CH3)2', 'CH3OH'],
                mechanism: [
                    'Quaternary ammonium hydroxide forms',
                    'Beta-elimination occurs',
                    'Less substituted alkene forms',
                    'Hofmann product results'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '68',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_073',
                name: 'Curtius Rearrangement',
                reactants: ['C6H5CON3'],
                reagents: [],
                products: ['C6H5NCO', 'N2'],
                mechanism: [
                    'Acyl azide loses nitrogen',
                    'Isocyanate forms',
                    'Rearrangement occurs',
                    'R-N=C=O results'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_074',
                name: 'Lossen Rearrangement',
                reactants: ['C6H5CONHOH'],
                reagents: ['NaOH'],
                products: ['C6H5NCO', 'NaCl', 'H2O'],
                mechanism: [
                    'Hydroxamic acid treated with base',
                    'O-acyl derivative forms',
                    'Rearrangement occurs',
                    'Isocyanate forms'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_075',
                name: 'Schmidt Reaction',
                reactants: ['C6H5COOH'],
                reagents: ['HN3', 'H2SO4'],
                products: ['C6H5NH2', 'CO2', 'N2'],
                mechanism: [
                    'Carboxylic acid protonated',
                    'Hydrazoic acid attacks',
                    'Rearrangement occurs',
                    'Amine forms'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Chloroform',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '58',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_076',
                name: 'Beckmann Rearrangement',
                reactants: ['C6H5C(O)NHCH3'],
                reagents: ['PCl5'],
                products: ['C6H5N(CH3)CO'],
                mechanism: [
                    'Oxime O-tosylated or protonated',
                    'Migration of alkyl group',
                    'N-acylamine forms',
                    'Hydrolysis gives amide'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_077',
                name: 'Fries Rearrangement',
                reactants: ['C6H5OCOCH3'],
                reagents: ['AlCl3'],
                products: ['C6H4(OH)COCH3'],
                mechanism: [
                    'Ester complexes with AlCl3',
                    'Acyl group migrates',
                    'Ortho or para hydroxy ketone',
                    'Rearrangement occurs'
                ],
                conditions: {
                    temperature: '140',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_078',
                name: 'Knoevenagel Condensation',
                reactants: ['C6H5CHO', 'CH2(COOH)2'],
                reagents: ['Piperidine'],
                products: ['C6H5CH=C(COOH)2'],
                mechanism: [
                    'Base catalyzes condensation',
                    'Active methylene compound',
                    'Water eliminated',
                    'Alpha,beta-unsaturated compound'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '92',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Condensation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_079',
                name: 'Stork Enamine Reaction',
                reactants: ['Cyclohexanone', 'CH3I'],
                reagents: ['Pyrrolidine', 'NaOCH3'],
                products: ['2-Methylcyclohexanone'],
                mechanism: [
                    'Enamine formed from ketone',
                    'Alkylation occurs',
                    'Hydrolysis gives alkylated ketone',
                    'Regioselective alpha-alkylation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Enamine Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_080',
                name: 'Mukaiyama Aldol Reaction',
                reactants: ['C6H5CHO', 'CH2=C(OCH3)OSi(CH3)3'],
                reagents: ['TiCl4'],
                products: ['C6H5CH(OH)CH2COOCH3'],
                mechanism: [
                    'Silyl enol ether activated',
                    'Nucleophilic addition to aldehyde',
                    'Beta-hydroxy ester forms',
                    'Stereoselective reaction'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dichloromethane',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '87',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aldol Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_081',
                name: 'Baylis-Hillman Reaction',
                reactants: ['C6H5CHO', 'CH2=CHCOOCH3'],
                reagents: ['DABCO'],
                products: ['C6H5CH(OH)CH2CH2COOCH3'],
                mechanism: [
                    'DABCO acts as nucleophilic catalyst',
                    'Michael addition occurs',
                    'Proton transfer and elimination',
                    'Beta-hydroxy alpha-methylene product'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMSO',
                    time: '48',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_082',
                name: 'Sharpless Epoxidation',
                reactants: ['RCH=CHR', 'TBHP'],
                reagents: ['Ti(OiPr)4', 'Diethyl tartrate'],
                products: ['Epoxide'],
                mechanism: [
                    'Titanium-tartrate complex forms',
                    'Hydroperoxide coordinates',
                    'Asymmetric oxygen transfer',
                    'Enantioselective epoxidation'
                ],
                conditions: {
                    temperature: '-20',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dichloromethane',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_083',
                name: '1,3-Dipolar Cycloaddition',
                reactants: ['C6H5CH=CH2', 'C6H5N2+'],
                reagents: [],
                products: ['Triazole derivative'],
                mechanism: [
                    'Azide and alkene react',
                    '1,3-Dipolar cycloaddition',
                    'Five-membered ring forms',
                    'Regio- and stereospecific'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cycloaddition',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_084',
                name: 'Pauson-Khand Reaction',
                reactants: ['C6H5C≡CC6H5', 'Cyclopentene', 'CO'],
                reagents: ['Co2(CO)8'],
                products: ['Bicyclic enone'],
                mechanism: [
                    'Cobalt carbonyl complex forms',
                    'Alkyne and alkene coordinate',
                    'CO inserts',
                    'Cyclization occurs'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cycloaddition',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_085',
                name: 'Sonogashira Coupling',
                reactants: ['C6H5Br', 'HC≡CPh'],
                reagents: ['PdCl2(PPh3)2', 'CuI', 'Et3N'],
                products: ['C6H5C≡CPh'],
                mechanism: [
                    'Oxidative addition of aryl halide',
                    'Transmetalation with copper acetylide',
                    'Reductive elimination',
                    'Alkyne coupling occurs'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_086',
                name: 'Buchwald-Hartwig Amination',
                reactants: ['C6H5Br', 'HN(CH3)2'],
                reagents: ['Pd(OAc)2', 'BINAP', 'NaOtBu'],
                products: ['C6H5N(CH3)2'],
                mechanism: [
                    'Palladium oxidative addition',
                    'Amine coordination',
                    'Base deprotonates amine',
                    'Reductive elimination'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_087',
                name: 'Negishi Coupling',
                reactants: ['C6H5Br', 'C6H5ZnBr'],
                reagents: ['Pd(PPh3)4'],
                products: ['C6H5-C6H5'],
                mechanism: [
                    'Oxidative addition',
                    'Transmetalation with organozinc',
                    'Reductive elimination',
                    'Biaryl forms'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '85',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_088',
                name: 'Kumada Coupling',
                reactants: ['C6H5Br', 'C6H5MgBr'],
                reagents: ['PdCl2(dppf)'],
                products: ['C6H5-C6H5'],
                mechanism: [
                    'Oxidative addition of aryl halide',
                    'Transmetalation with Grignard',
                    'Reductive elimination',
                    'Biaryl coupling'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '85',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_089',
                name: 'Stille Coupling',
                reactants: ['C6H5Br', 'C6H5Sn(CH3)3'],
                reagents: ['Pd(PPh3)4'],
                products: ['C6H5-C6H5'],
                mechanism: [
                    'Oxidative addition',
                    'Transmetalation with organotin',
                    'Reductive elimination',
                    'Carbon-carbon bond forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_090',
                name: 'Hiyama Coupling',
                reactants: ['C6H5Br', 'C6H5SiF3'],
                reagents: ['Pd(PPh3)4', 'KF'],
                products: ['C6H5-C6H5'],
                mechanism: [
                    'Organosilane activated by fluoride',
                    'Oxidative addition',
                    'Transmetalation',
                    'Reductive elimination'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '82',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_091',
                name: 'Intramolecular Aldol Condensation',
                reactants: ['OHC(CH2)4CHO'],
                reagents: ['NaOH'],
                products: ['Cyclohexenone derivative'],
                mechanism: [
                    'Enolate forms',
                    'Intramolecular attack',
                    'Six-membered ring forms',
                    'Dehydration gives enone'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Ring Formation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_092',
                name: 'Dieckmann Condensation',
                reactants: ['CH2(COOCH3)CH2CH2COOEt'],
                reagents: ['NaOEt'],
                products: ['Cyclopentanone derivative'],
                mechanism: [
                    'Base abstracts alpha-hydrogen',
                    'Intramolecular Claisen',
                    'Beta-keto ester forms',
                    'Decarboxylation gives ketone'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '92',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Condensation Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_093',
                name: 'Thorpe Reaction',
                reactants: ['NCCH2CH2CH2CH2CN'],
                reagents: ['NaOEt'],
                products: ['Cyclopentanone derivative'],
                mechanism: [
                    'Nitrile enolate forms',
                    'Intramolecular addition',
                    'Imine intermediate',
                    'Hydrolysis gives ketone'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Ring Formation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_094',
                name: 'Darzens Reaction',
                reactants: ['C6H5CHO', 'ClCH2COOCH3'],
                reagents: ['NaOH'],
                products: ['Glycidic ester'],
                mechanism: [
                    'Alpha-halo ester enolate',
                    'Nucleophilic addition to aldehyde',
                    'Epoxide forms',
                    'Glycidic ester results'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Epoxide Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_095',
                name: 'Johnson-Corey-Chaykovsky Reaction',
                reactants: ['C6H5CHO', 'CH2(SO2Ph)2'],
                reagents: ['NaH'],
                products: ['C6H5CH-CH2'],
                mechanism: [
                    'Sulfonyl anion forms',
                    'Addition to carbonyl',
                    'Epoxide forms',
                    'Elimination gives alkene'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMSO',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefin Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_096',
                name: 'Simmons-Smith Reaction',
                reactants: ['CH2=CH2', 'CH2I2'],
                reagents: ['Zn(Cu)'],
                products: ['Cyclopropane'],
                mechanism: [
                    'Iodomethylzinc iodide forms',
                    'Carbenoid species',
                    'Addition to double bond',
                    'Cyclopropane forms'
                ],
                conditions: {
                    temperature: '40',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cyclopropanation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_097',
                name: 'Blaise Reaction',
                reactants: ['C6H5Br', 'NCCH2COOCH3'],
                reagents: ['Zn'],
                products: ['Beta-keto ester'],
                mechanism: [
                    'Zinc inserts into C-Br',
                    'Reformatsky-type reagent',
                    'Addition to nitrile',
                    'Hydrolysis gives beta-keto ester'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Benzene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '87',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Beta-Keto Ester Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_098',
                name: 'McMurry Coupling',
                reactants: ['C6H5CHO', 'C6H5CHO'],
                reagents: ['TiCl3', 'Zn(Cu)'],
                products: ['C6H5CH=CHC6H5'],
                mechanism: [
                    'Low-valent titanium forms',
                    'Carbonyl coupling occurs',
                    'Pinacol intermediate',
                    'Deoxygenation gives alkene'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carbonyl Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_099',
                name: 'Ullmann Reaction',
                reactants: ['C6H5Br', 'C6H5ONa'],
                reagents: ['Cu'],
                products: ['C6H5-OC6H5'],
                mechanism: [
                    'Copper catalyzes reaction',
                    'Aryl halide and phenoxide',
                    'Oxidative addition',
                    'Reductive elimination'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '85',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Aromatic Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_100',
                name: 'Glaser Coupling',
                reactants: ['C6H5C≡CH', 'C6H5C≡CH'],
                reagents: ['CuCl', 'O2'],
                products: ['C6H5C≡C-C≡CC6H5'],
                mechanism: [
                    'Copper acetylide forms',
                    'Dimerization occurs',
                    'Diynes form',
                    'Oxidative coupling'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Pyridine',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Alkyne Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_101',
                name: 'Meerwein Arylation',
                reactants: ['C6H5N2+Cl-', 'CH2=CHCOOCH3'],
                reagents: ['CuCl2'],
                products: ['C6H5CH2CHClCOOCH3'],
                mechanism: [
                    'Diazonium salt decomposes',
                    'Aryl radical forms',
                    'Addition to alkene',
                    'Chlorine abstraction'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetone',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Radical Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_102',
                name: 'Gomberg-Bachmann Reaction',
                reactants: ['C6H5N2+Cl-', 'C6H6'],
                reagents: ['NaOH'],
                products: ['C6H5-C6H5'],
                mechanism: [
                    'Diazonium salt in basic conditions',
                    'Aryl radical forms',
                    'Homolytic aromatic substitution',
                    'Biaryl forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '50',
                    atomEconomy: '75',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Aromatic Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_103',
                name: 'Barton Decarboxylation',
                reactants: ['RCOOH'],
                reagents: ['Mercuric oxide', 'Iodine'],
                products: ['RH'],
                mechanism: [
                    'Thiohydroxamic ester forms',
                    'Radical decarboxylation',
                    'Alkyl radical abstracts hydrogen',
                    'Alkane forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Benzene',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Decarboxylation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_104',
                name: 'Hunsdiecker Reaction',
                reactants: ['RCOOAg', 'Br2'],
                reagents: [],
                products: ['RBr', 'CO2', 'AgBr'],
                mechanism: [
                    'Silver carboxylate reacts with bromine',
                    'Acyl hypobromite forms',
                    'Homolytic cleavage',
                    'Alkyl bromide forms'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'CCl4',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '58',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Halogenation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_105',
                name: 'Fenton Reaction',
                reactants: ['H2O2', 'Fe2+'],
                reagents: [],
                products: ['•OH', 'OH-', 'Fe3+'],
                mechanism: [
                    'Iron(II) reduces hydrogen peroxide',
                    'Hydroxyl radical forms',
                    'Oxidative species generated',
                    'Free radical reactions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Free Radical Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_106',
                name: 'Neber Rearrangement',
                reactants: ['C6H5C(O)NHN=CHC6H5'],
                reagents: ['HCl'],
                products: ['C6H5C(O)CH2C6H5'],
                mechanism: [
                    'Oxime tosylate protonated',
                    'Nitrogen leaves',
                    'Rearrangement occurs',
                    'Alpha-aminoketone forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_107',
                name: 'Stevens Rearrangement',
                reactants: ['C6H5CH2N(CH3)3+'],
                reagents: ['NaOH'],
                products: ['C6H5CH(N(CH3)2)CH3'],
                mechanism: [
                    'Ylide forms from ammonium salt',
                    '1,2-rearrangement occurs',
                    'Alkyl group migrates',
                    'Tertiary amine forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_108',
                name: 'Sommelet-Hauser Rearrangement',
                reactants: ['C6H5CH2N(CH3)C6H5'],
                reagents: ['NaNH2'],
                products: ['C6H4(CH2C6H5)NCH3'],
                mechanism: [
                    'Benzylic anion forms',
                    'Intramolecular migration',
                    'Ortho position attacked',
                    'Rearranged product'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Liquid ammonia',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_109',
                name: 'Wittig Rearrangement',
                reactants: ['C6H5CH2OCH3'],
                reagents: ['n-BuLi'],
                products: ['C6H5CH(OH)CH3'],
                mechanism: [
                    'Alpha-lithiation occurs',
                    '1,2-rearrangement',
                    'Alkyl group migrates',
                    'Alcohol forms'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_110',
                name: 'Brook Rearrangement',
                reactants: ['(CH3)2C(OH)Si(CH3)3'],
                reagents: ['NaH'],
                products: ['(CH3)2C(O-)Si(CH3)3'],
                mechanism: [
                    'Alkoxide forms',
                    '1,2-migration of silyl group',
                    'Silyl anion equivalent',
                    'Carbon nucleophile'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_111',
                name: 'Ireland-Claisen Rearrangement',
                reactants: ['Allyl ester'],
                reagents: ['LDA', 'TMSCl'],
                products: ['Silyl ketene acetal rearrangement'],
                mechanism: [
                    'Ester enolized and silylated',
                    'Sigmatropic rearrangement',
                    'Silyl ketene acetal forms',
                    'Hydrolysis gives acid'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_112',
                name: 'Rauhut–Currier Reaction',
                reactants: ['CH2=CHCOOCH3', 'CH2=CHCOOCH3'],
                reagents: ['DABCO'],
                products: ['Dimer product'],
                mechanism: [
                    'Nucleophilic catalyst adds',
                    'Michael addition occurs',
                    'Elimination gives product',
                    'Organocatalytic reaction'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMSO',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_113',
                name: 'Kabachnik-Fields Reaction',
                reactants: ['C6H5CHO', 'HN(CH3)2', '(CH3O)2P(O)H'],
                reagents: [],
                products: ['Alpha-aminophosphonate'],
                mechanism: [
                    'Imine forms first',
                    'Phosphite adds',
                    'Three-component reaction',
                    'Alpha-aminophosphonate'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Multicomponent Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_114',
                name: 'Appel Reaction',
                reactants: ['ROH', 'CCl4'],
                reagents: ['PPh3'],
                products: ['RCl', 'CHCl3', 'OPPh3'],
                mechanism: [
                    'Phosphine attacks CCl4',
                    'Chlorophosphonium salt',
                    'Alcohol attacks',
                    'Alkyl chloride forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Halogenation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_115',
                name: 'Mitsunobu Reaction',
                reactants: ['ROH', 'NuH'],
                reagents: ['DEAD', 'PPh3'],
                products: ['R-Nu', 'Ph3P=O'],
                mechanism: [
                    'DEAD and PPh3 form betaine',
                    'Alkoxyphosphonium salt',
                    'Nucleophile attacks',
                    'Inversion of configuration'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Nucleophilic Substitution',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_116',
                name: 'Dess-Martin Oxidation',
                reactants: ['RCH2OH'],
                reagents: ['DMP'],
                products: ['RCHO'],
                mechanism: [
                    'Hypervalent iodine reagent',
                    'Alcohol oxidized',
                    'Aldehyde forms',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '67',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_117',
                name: 'Jones Oxidation',
                reactants: ['RCH2OH'],
                reagents: ['CrO3', 'H2SO4'],
                products: ['RCOOH'],
                mechanism: [
                    'Chromic acid oxidizes',
                    'Aldehyde intermediate',
                    'Further oxidation',
                    'Carboxylic acid forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetone',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_118',
                name: 'Collins Oxidation',
                reactants: ['RCH2OH'],
                reagents: ['CrO3', 'Pyridine'],
                products: ['RCHO'],
                mechanism: [
                    'Chromium trioxide-pyridine complex',
                    'Mild oxidation',
                    'Aldehyde forms',
                    'No over-oxidation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '67',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_119',
                name: 'Ley Oxidation',
                reactants: ['RCH2OH'],
                reagents: ['TPAP', 'NMO'],
                products: ['RCHO'],
                mechanism: [
                    'Tetrapropylammonium perruthenate',
                    'NMO as co-oxidant',
                    'Selective oxidation',
                    'Aldehyde forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_120',
                name: 'TPAP Oxidation',
                reactants: ['RCH2OH'],
                reagents: ['TPAP', 'NMO'],
                products: ['RCHO'],
                mechanism: [
                    'Tetrapropylammonium perruthenate',
                    'Catalytic oxidation',
                    'NMO reoxidizes catalyst',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_121',
                name: 'Staudinger Reaction',
                reactants: ['C6H5N3', 'PPh3'],
                reagents: [],
                products: ['C6H5N=PPh3', 'N2'],
                mechanism: [
                    'Azide and phosphine react',
                    'Triazaphosphole intermediate',
                    'Nitrogen eliminates',
                    'Iminophosphorane forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Azide Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_122',
                name: 'Ugi Reaction',
                reactants: ['C6H5CHO', 'C6H5NH2', 'CH3COOH', 'tBuNC'],
                reagents: [],
                products: ['Alpha-acylamino amide'],
                mechanism: [
                    'Four-component reaction',
                    'Imine forms first',
                    'Isocyanide adds',
                    'Mumm rearrangement',
                    'Acylamino amide'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Multicomponent Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_123',
                name: 'Passerini Reaction',
                reactants: ['C6H5CHO', 'CH3COOH', 'tBuNC'],
                reagents: [],
                products: ['Alpha-acyloxy amide'],
                mechanism: [
                    'Three-component reaction',
                    'Isocyanide adds to carbonyl',
                    'Carboxylic acid adds',
                    'Alpha-acyloxy amide forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Multicomponent Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_124',
                name: 'Biginelli Reaction',
                reactants: ['C6H5CHO', 'CH3COCH2COOCH3', 'Urea'],
                reagents: ['HCl'],
                products: ['Dihydropyrimidinone'],
                mechanism: [
                    'Three-component condensation',
                    'Urea and aldehyde condense',
                    'Beta-keto ester adds',
                    'Cyclization occurs'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Multicomponent Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_125',
                name: 'Paal-Knorr Synthesis',
                reactants: ['CH3COCH2COCH3', 'NH2OH'],
                reagents: ['HCl'],
                products: ['Isoxazole'],
                mechanism: [
                    '1,3-Dicarbonyl compound',
                    'Hydroxylamine adds',
                    'Cyclization occurs',
                    'Five-membered heterocycle'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_126',
                name: 'Knorr Pyrazole Synthesis',
                reactants: ['CH3COCH2COOCH3', 'C6H5NHNH2'],
                reagents: ['NaOH'],
                products: ['Pyrazole'],
                mechanism: [
                    'Beta-keto ester and hydrazine',
                    'Hydrazone forms',
                    'Cyclization occurs',
                    'Pyrazole ring forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_127',
                name: 'Gewald Reaction',
                reactants: ['C6H5CHO', 'NCCH2COOCH3', 'S'],
                reagents: ['Morpholine'],
                products: ['Thiophene derivative'],
                mechanism: [
                    'Knoevenagel condensation',
                    'Sulfur nucleophile adds',
                    'Cyclization occurs',
                    'Thiophene forms'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_128',
                name: 'Hantzsch Dihydropyridine Synthesis',
                reactants: ['C6H5CHO', 'CH3COCH2COOCH3', 'NH3'],
                reagents: [],
                products: ['Dihydropyridine'],
                mechanism: [
                    'Three-component reaction',
                    'Aldehyde, beta-keto ester, ammonia',
                    'Cyclization occurs',
                    'Dihydropyridine forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_129',
                name: 'Feist-Benary Synthesis',
                reactants: ['C6H5CHO', 'CH3COCH2COOCH3'],
                reagents: ['NaOH'],
                products: ['Furan derivative'],
                mechanism: [
                    'Aldehyde and beta-diketone',
                    'Knoevenagel condensation',
                    'Cyclization occurs',
                    'Furan ring forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_130',
                name: 'Pictet-Spengler Reaction',
                reactants: ['C6H5CH2CH2NH2', 'C6H5CHO'],
                reagents: ['HCl'],
                products: ['Tetrahydroisoquinoline'],
                mechanism: [
                    'Imine formation',
                    'Electrophilic aromatic substitution',
                    'Cyclization occurs',
                    'Tetrahydroisoquinoline forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_131',
                name: 'Bischler-Napieralski Reaction',
                reactants: ['C6H5COCH2CH2NHCOCH3'],
                reagents: ['POCl3'],
                products: ['3,4-Dihydroisoquinoline'],
                mechanism: [
                    'Amide cyclodehydration',
                    'Imine formation',
                    'Electrophilic cyclization',
                    'Dihydroisoquinoline forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_132',
                name: 'Skraup Synthesis',
                reactants: ['C6H5NH2', 'Glycerol', 'H2SO4'],
                reagents: ['FeSO4'],
                products: ['Quinoline'],
                mechanism: [
                    'Aniline and glycerol condense',
                    'Cyclization with acid',
                    'Aromatic ring forms',
                    'Quinoline results'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '78',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_133',
                name: 'Pechmann Condensation',
                reactants: ['C6H5OH', 'CH3COCH2COOCH3'],
                reagents: ['H2SO4'],
                products: ['Coumarin'],
                mechanism: [
                    'Phenol and beta-keto ester',
                    'Electrophilic aromatic substitution',
                    'Cyclization occurs',
                    'Coumarin forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_134',
                name: 'Kostanecki-Robinson Reaction',
                reactants: ['C6H5OH', 'CH3COCH2COOCH3'],
                reagents: ['Acetic anhydride'],
                products: ['Flavone'],
                mechanism: [
                    'O-acylation of phenol',
                    'C-acylation occurs',
                    'Cyclization with acid',
                    'Flavone forms'
                ],
                conditions: {
                    temperature: '180',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '75',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_135',
                name: 'Allan-Robinson Reaction',
                reactants: ['C6H5OH', 'CH3COCH2COCl'],
                reagents: ['NaOH'],
                products: ['Flavanone'],
                mechanism: [
                    'Phenoxide attacks acid chloride',
                    'Beta-diketone forms',
                    'Cyclization occurs',
                    'Flavanone results'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_136',
                name: 'Baker-Venkataraman Rearrangement',
                reactants: ['C6H5COCH2COC6H5'],
                reagents: ['NaOH'],
                products: ['Flavanone'],
                mechanism: [
                    'O-acyl migration',
                    'Intramolecular transesterification',
                    'Cyclization occurs',
                    'Flavanone forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Pyridine',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_137',
                name: 'Doebner Reaction',
                reactants: ['C6H5CHO', 'CH3COOH'],
                reagents: ['Pyridine'],
                products: ['C6H5CH=CHCOOH'],
                mechanism: [
                    'Aldehyde and carboxylic acid',
                    'Perkin-type reaction',
                    'Cinnamic acid derivative',
                    'Alpha,beta-unsaturated acid'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Pyridine',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Condensation Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_138',
                name: 'Pomeranz-Fritsch Reaction',
                reactants: ['C6H5NH2', 'CH2O', 'CH3COCH3'],
                reagents: ['HCl'],
                products: ['Isoquinoline'],
                mechanism: [
                    'Aniline, formaldehyde, acetone',
                    'Bis-aminal formation',
                    'Cyclization occurs',
                    'Isoquinoline forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '78',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_139',
                name: 'Combes Quinoline Synthesis',
                reactants: ['C6H5NH2', 'CH3COCH2COCH3'],
                reagents: ['H2SO4'],
                products: ['Quinoline'],
                mechanism: [
                    'Aniline and acetylacetone',
                    'Condensation occurs',
                    'Cyclization with acid',
                    'Quinoline forms'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_140',
                name: 'Fischer Indole Synthesis',
                reactants: ['C6H5NHNH2', 'CH3COCH3'],
                reagents: ['HCl'],
                products: ['Indole'],
                mechanism: [
                    'Phenylhydrazine and ketone',
                    'Hydrazone forms',
                    'Sigmatropic rearrangement',
                    'Indole ring forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_141',
                name: 'Reissert Indole Synthesis',
                reactants: ['Indole', 'CH3COCl'],
                reagents: ['DMF'],
                products: ['3-Acylindole'],
                mechanism: [
                    'Indole and acid chloride',
                    'DMF activates',
                    'Electrophilic substitution',
                    '3-Acylindole forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_142',
                name: 'Madelung Indole Synthesis',
                reactants: ['o-Tolylamide'],
                reagents: ['NaOH'],
                products: ['Indole'],
                mechanism: [
                    'Ortho-methylbenzamide',
                    'Strong base abstracts proton',
                    'Cyclization occurs',
                    'Indole forms'
                ],
                conditions: {
                    temperature: '300',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '50',
                    atomEconomy: '100',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_143',
                name: 'Bucherer Carbazole Synthesis',
                reactants: ['Naphthylamine', 'CH3COCH3'],
                reagents: ['H2SO4'],
                products: ['Carbazole'],
                mechanism: [
                    'Naphthylamine and acetone',
                    'Condensation occurs',
                    'Cyclization with acid',
                    'Carbazole forms'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '85',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_144',
                name: 'Graebe-Ullmann Reaction',
                reactants: ['Carbazole'],
                reagents: ['Cu'],
                products: ['Carbazole'],
                mechanism: [
                    'Diphenylamine derivative',
                    'Cyclization with copper',
                    'Carbazole forms',
                    'High temperature required'
                ],
                conditions: {
                    temperature: '250',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '55',
                    atomEconomy: '100',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_145',
                name: 'Pschorr Reaction',
                reactants: ['Diazonium salt'],
                reagents: ['CuCl2'],
                products: ['Phenanthrene'],
                mechanism: [
                    'Diazonium salt cyclizes',
                    'Radical mechanism',
                    'Phenanthrene forms',
                    'Copper catalyst'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cyclization',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_146',
                name: 'Niementowski Quinazoline Synthesis',
                reactants: ['Anthranilic acid', 'Formamide'],
                reagents: [],
                products: ['Quinazolinone'],
                mechanism: [
                    'Anthranilic acid and formamide',
                    'Condensation occurs',
                    'Cyclization forms',
                    'Quinazolinone results'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Formamide',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_147',
                name: 'Traube Purine Synthesis',
                reactants: ['4-Amino-5-imidazolecarboxamide', 'HCOOH'],
                reagents: ['Heat'],
                products: ['Purine'],
                mechanism: [
                    'Imidazole derivative',
                    'Formic acid adds',
                    'Cyclization occurs',
                    'Purine ring forms'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '85',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_148',
                name: 'Conrad-Limpach Reaction',
                reactants: ['Acetoacetic ester', 'Aromatic amine'],
                reagents: ['HCl'],
                products: ['Quinoline'],
                mechanism: [
                    'Beta-keto ester and amine',
                    'Condensation occurs',
                    'Cyclization with acid',
                    'Quinoline forms'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_149',
                name: 'Piloty-Robinson Synthesis',
                reactants: ['Pyrrole', 'CH2O', 'CH3NO2'],
                reagents: ['NaOH'],
                products: ['Indole'],
                mechanism: [
                    'Pyrrole, formaldehyde, nitromethane',
                    'Condensation occurs',
                    'Cyclization forms',
                    'Indole results'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '55',
                    atomEconomy: '78',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_150',
                name: 'Bartoli Indole Synthesis',
                reactants: ['Nitroarene', 'Vinyl Grignard'],
                reagents: [],
                products: ['Indole'],
                mechanism: [
                    'Nitroarene and vinyl Grignard',
                    'Addition occurs',
                    'Cyclization forms',
                    'Indole results'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_151',
                name: 'Fukuyama Reduction',
                reactants: ['Thioester', 'Pd catalyst'],
                reagents: ['H2', 'Et3SiH'],
                products: ['Aldehyde'],
                mechanism: [
                    'Thioester reduced',
                    'Palladium catalyst',
                    'Triethylsilane as reductant',
                    'Aldehyde forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Reduction Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_152',
                name: 'Luche Reduction',
                reactants: ['Alpha,beta-unsaturated ketone'],
                reagents: ['NaBH4', 'CeCl3'],
                products: ['Allylic alcohol'],
                mechanism: [
                    'Cerium chloride modifies selectivity',
                    'Borohydride reduces carbonyl',
                    '1,2-reduction occurs',
                    'Allylic alcohol forms'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Reduction Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_153',
                name: 'Evans Aldol Reaction',
                reactants: ['Boron enolate', 'Aldehyde'],
                reagents: ['Chiral auxiliary'],
                products: ['Beta-hydroxy carbonyl'],
                mechanism: [
                    'Chiral boron enolate',
                    'Asymmetric addition',
                    'Stereoselective aldol',
                    'High diastereoselectivity'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_154',
                name: 'Denmark Aldol Reaction',
                reactants: ['Silyl enol ether', 'Aldehyde'],
                reagents: ['Chiral Lewis base'],
                products: ['Beta-hydroxy carbonyl'],
                mechanism: [
                    'Chiral phosphoramide catalyst',
                    'Activation of silyl enol ether',
                    'Asymmetric addition',
                    'High enantioselectivity'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_155',
                name: 'Hajos-Parrish Reaction',
                reactants: ['Triketone'],
                reagents: ['Proline'],
                products: ['Bicyclic ketone'],
                mechanism: [
                    'Proline-catalyzed aldol',
                    'Intramolecular reaction',
                    'Enantioselective cyclization',
                    'Wieland-Miescher ketone'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '48',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_156',
                name: 'Wieland-Miescher Ketone Synthesis',
                reactants: ['Hagemann\'s ester'],
                reagents: ['Base'],
                products: ['Bicyclic ketone'],
                mechanism: [
                    'Robinson annulation',
                    'Intramolecular aldol',
                    'Decarboxylation occurs',
                    'Bicyclic system forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Ring Formation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_157',
                name: 'MacMillan Aldol Reaction',
                reactants: ['Enals', 'Aldehydes'],
                reagents: ['Imidazolidinone catalyst'],
                products: ['Beta-hydroxy aldehydes'],
                mechanism: [
                    'Chiral imidazolidinone',
                    'Enamine activation',
                    'Asymmetric aldol',
                    'High enantioselectivity'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_158',
                name: 'Robinson-Schöpf Reaction',
                reactants: ['Succindialdehyde', 'Methylamine', 'Acetonedicarboxylic acid'],
                reagents: ['NaOH'],
                products: ['Tropinone'],
                mechanism: [
                    'Three-component reaction',
                    'Mannich-type condensation',
                    'Cyclization occurs',
                    'Tropane alkaloid forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '78',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Alkaloid Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_159',
                name: 'Larock Indole Synthesis',
                reactants: ['o-Iodoaniline', 'Alkyne'],
                reagents: ['Pd catalyst', 'CuI'],
                products: ['Indole'],
                mechanism: [
                    'Palladium-catalyzed cyclization',
                    'o-Iodoaniline and alkyne',
                    'Annulation occurs',
                    'Indole forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_160',
                name: 'Corey-Bakshi-Shibata Reduction',
                reactants: ['Ketone', 'BH3'],
                reagents: ['CBS catalyst'],
                products: ['Alcohol'],
                mechanism: [
                    'Chiral oxazaborole catalyst',
                    'Borane activation',
                    'Asymmetric reduction',
                    'Enantioselective alcohol'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_161',
                name: 'Noyori Asymmetric Hydrogenation',
                reactants: ['Enamide'],
                reagents: ['Ru-BINAP catalyst', 'H2'],
                products: ['Amino acid precursor'],
                mechanism: [
                    'Ruthenium-BINAP complex',
                    'Asymmetric hydrogenation',
                    'Dynamic kinetic resolution',
                    'High enantioselectivity'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '50',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_162',
                name: 'Sharpless Asymmetric Dihydroxylation',
                reactants: ['Alkene'],
                reagents: ['OsO4', 'Chiral ligand', 'Co-oxidant'],
                products: ['Diols'],
                mechanism: [
                    'Osmium tetroxide with ligand',
                    'Asymmetric dihydroxylation',
                    'Enantioselective addition',
                    'Vicinal diols form'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetone-water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_163',
                name: 'Jacobsen Asymmetric Epoxidation',
                reactants: ['Alkene'],
                reagents: ['Mn-salen catalyst', 'NaOCl'],
                products: ['Epoxide'],
                mechanism: [
                    'Manganese-salen complex',
                    'Asymmetric epoxidation',
                    'Chiral catalyst',
                    'Enantioselective epoxide'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_164',
                name: 'Shi Epoxidation',
                reactants: ['Alkene'],
                reagents: ['Fructose-derived ketone', 'Oxone'],
                products: ['Epoxide'],
                mechanism: [
                    'Ketone catalyst',
                    'Dioxirane formation',
                    'Asymmetric epoxidation',
                    'Enantioselective reaction'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetonitrile-water',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_165',
                name: 'Julia Olefination',
                reactants: ['Sulfone', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Sulfone anion adds to aldehyde',
                    'Beta-elimination occurs',
                    'Alkene forms',
                    'Stereoselective reaction'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_166',
                name: 'Horner-Wadsworth-Emmons Reaction',
                reactants: ['Phosphonate', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Phosphonate anion forms',
                    'Addition to carbonyl',
                    'Elimination occurs',
                    'E/Z selectivity'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '85',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_167',
                name: 'Still-Gennari Olefination',
                reactants: ['Phosphonate', 'Aldehyde'],
                reagents: ['KHMDS'],
                products: ['Z-Alkene'],
                mechanism: [
                    'Bis-trifluoroethyl phosphonate',
                    'Z-selective olefination',
                    'Modified HWE reaction',
                    'High Z-selectivity'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_168',
                name: 'Knowles Hydrogenation',
                reactants: ['Enamide'],
                reagents: ['Rh-DIPAMP catalyst', 'H2'],
                products: ['Amino acid'],
                mechanism: [
                    'Rhodium-DIPAMP complex',
                    'Asymmetric hydrogenation',
                    'Enantioselective reduction',
                    'L-DOPA synthesis'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '3',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_169',
                name: 'Sharpless Asymmetric Aminohydroxylation',
                reactants: ['Alkene'],
                reagents: ['OsO4', 'Chiral ligand', 'Chloramine-T'],
                products: ['Amino alcohols'],
                mechanism: [
                    'Osmium tetroxide with ligand',
                    'Asymmetric aminohydroxylation',
                    'Nitrogen and oxygen addition',
                    'Enantioselective reaction'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water-acetone',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_170',
                name: 'Tebbe Olefination',
                reactants: ['Carbonyl compound'],
                reagents: ['Cp2TiCH2ClAlMe2'],
                products: ['Alkene'],
                mechanism: [
                    'Titanocene methylidene forms',
                    'Wittig-like olefination',
                    'Methylenation occurs',
                    'Terminal alkenes form'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_171',
                name: 'Petasis Reaction',
                reactants: ['Aldehyde', 'Amine', 'Organoboronic acid'],
                reagents: [],
                products: ['Amine'],
                mechanism: [
                    'Three-component reaction',
                    'Imine formation',
                    'Boronic acid adds',
                    'Rearrangement occurs'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Multicomponent Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_172',
                name: 'Mannich Reaction',
                reactants: ['Aldehyde', 'Amine', 'Enolizable carbonyl'],
                reagents: ['Acid'],
                products: ['Beta-amino carbonyl'],
                mechanism: [
                    'Imine formation',
                    'Enol adds to imine',
                    'Beta-amino carbonyl forms',
                    'Three-component reaction'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Multicomponent Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_173',
                name: 'Bucherer-Bergs Reaction',
                reactants: ['Naphthol', 'Ammonia', 'Sodium bisulfite'],
                reagents: [],
                products: ['Naphthylamine'],
                mechanism: [
                    'Hydroxyl group replaced',
                    'Sulfonic acid intermediate',
                    'Ammonolysis occurs',
                    'Amine forms'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '5',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_174',
                name: 'Hofmann-Löffler-Freytag Reaction',
                reactants: ['N-Chloroamine'],
                reagents: ['H2SO4'],
                products: ['Pyrrolidine'],
                mechanism: [
                    'Nitrogen radical forms',
                    '1,5-hydrogen abstraction',
                    'Cyclization occurs',
                    'Chlorination follows'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Radical Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_175',
                name: 'Polonovski Reaction',
                reactants: ['Amine oxide'],
                reagents: ['Acetic anhydride'],
                products: ['Alpha-acetoxy amine'],
                mechanism: [
                    'N-O bond cleavage',
                    'Acetic anhydride traps',
                    'Rearrangement occurs',
                    'Alpha-functionalized amine'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_176',
                name: 'Gabriel-Colman Rearrangement',
                reactants: ['N-Allyl-N-nitrosoamide'],
                reagents: ['Base'],
                products: ['O-Allyl hydroxamic acid'],
                mechanism: [
                    'N-Nitroso compound',
                    'Rearrangement occurs',
                    'O-allyl product forms',
                    'Hydroxamic acid derivative'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_177',
                name: 'Eschweiler-Clarke Reaction',
                reactants: ['Amine', 'Formaldehyde'],
                reagents: ['Formic acid'],
                products: ['Tertiary amine'],
                mechanism: [
                    'Imine formation',
                    'Reduction occurs',
                    'Methylation happens',
                    'Tertiary amine forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Amine Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_178',
                name: 'Tiffeneau-Demjanov Rearrangement',
                reactants: ['Amino alcohol'],
                reagents: ['HNO2'],
                products: ['Aldehyde'],
                mechanism: [
                    'Diazonium salt forms',
                    'Migration occurs',
                    'Ring expansion',
                    'Aldehyde forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_179',
                name: 'Wagner-Meerwein Rearrangement',
                reactants: ['Terpene alcohol'],
                reagents: ['Acid'],
                products: ['Rearranged product'],
                mechanism: [
                    'Carbocation forms',
                    '1,2-alkyl shift',
                    'More stable carbocation',
                    'Rearranged product'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_180',
                name: 'Nametkin Rearrangement',
                reactants: ['Camphene hydrochloride'],
                reagents: ['Heat'],
                products: ['Isobornyl chloride'],
                mechanism: [
                    'Carbocation rearrangement',
                    '1,2-alkyl shift',
                    'Wagner-Meerwein type',
                    'Isobornyl derivative'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_181',
                name: 'Whitmore 1,2-Rearrangement',
                reactants: ['Neopentyl alcohol'],
                reagents: ['H2SO4'],
                products: ['Rearranged products'],
                mechanism: [
                    'Carbocation forms',
                    '1,2-methyl shift',
                    'More stable carbocation',
                    'Rearranged products'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_182',
                name: 'Arndt-Eistert Reaction',
                reactants: ['Carboxylic acid'],
                reagents: ['SOCl2', 'CH2N2', 'Ag2O'],
                products: ['Homologous acid'],
                mechanism: [
                    'Acid chloride forms',
                    'Diazo ketone',
                    'Wolff rearrangement',
                    'Homologous acid'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '75',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_183',
                name: 'Japp-Klingemann Reaction',
                reactants: ['Beta-diketone', 'Diazonium salt'],
                reagents: ['NaOH'],
                products: ['Hydrazone'],
                mechanism: [
                    'Diazonium couples',
                    'Beta-diketone reacts',
                    'Hydrazone forms',
                    'Indole precursor'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Coupling Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_184',
                name: 'Haller-Bauer Reaction',
                reactants: ['Ketone', 'Base'],
                reagents: ['Strong base'],
                products: ['Rearranged product'],
                mechanism: [
                    'Enolate forms',
                    'Cleavage occurs',
                    'Rearrangement',
                    'New carbonyl compound'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_185',
                name: 'Von Richter Reaction',
                reactants: ['Nitrobenzene', 'KCN'],
                reagents: ['NaOH'],
                products: ['Anthranilic acid'],
                mechanism: [
                    'Nucleophilic addition',
                    'Rearrangement occurs',
                    'Carboxylate forms',
                    'Amino acid results'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '50',
                    atomEconomy: '75',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_186',
                name: 'Sommelet Reaction',
                reactants: ['Benzyl halide', 'Hexamine'],
                reagents: ['Acid'],
                products: ['Aldehyde'],
                mechanism: [
                    'Quaternary salt forms',
                    'Hydrolysis occurs',
                    'Aldehyde forms',
                    'Oxidative reaction'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_187',
                name: 'Willgerodt Reaction',
                reactants: ['Aryl alkyl ketone', 'S', 'Morpholine'],
                reagents: [],
                products: ['Thioamide'],
                mechanism: [
                    'Ketone and sulfur react',
                    'Rearrangement occurs',
                    'Thioamide forms',
                    'Willgerodt-Kindler reaction'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_188',
                name: 'Kindler Reaction',
                reactants: ['Aldehyde', 'S', 'Morpholine'],
                reagents: [],
                products: ['Thioamide'],
                mechanism: [
                    'Aldehyde and sulfur react',
                    'Willgerodt-type reaction',
                    'Thioamide forms',
                    'Modified conditions'
                ],
                conditions: {
                    temperature: '120',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Thioamide Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_189',
                name: 'Dakin Reaction',
                reactants: ['Salicylaldehyde'],
                reagents: ['H2O2', 'NaOH'],
                products: ['Catechol'],
                mechanism: [
                    'Peracid forms',
                    'Baeyer-Villiger type',
                    'Hydrolysis occurs',
                    'Catechol forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_190',
                name: 'Meerwein-Ponndorf-Verley Reduction',
                reactants: ['Ketone', 'Aluminum alkoxide'],
                reagents: [],
                products: ['Alcohol'],
                mechanism: [
                    'Hydride transfer',
                    'Aluminum coordinates',
                    'Equilibrium reaction',
                    'Secondary alcohol forms'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Isopropanol',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Reduction Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_191',
                name: 'Oppenauer Oxidation',
                reactants: ['Alcohol', 'Aluminum alkoxide'],
                reagents: ['Ketone'],
                products: ['Carbonyl compound'],
                mechanism: [
                    'Reverse MPV reaction',
                    'Hydride transfer',
                    'Aluminum catalyst',
                    'Oxidation occurs'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_192',
                name: 'Parikh-Doering Oxidation',
                reactants: ['Alcohol'],
                reagents: ['SO3·Pyridine', 'DMSO'],
                products: ['Aldehyde'],
                mechanism: [
                    'Sulfoxide forms',
                    'Elimination occurs',
                    'Aldehyde forms',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_193',
                name: 'Corey-Kim Oxidation',
                reactants: ['Alcohol'],
                reagents: ['NCS', 'DMSO', 'Et3N'],
                products: ['Aldehyde'],
                mechanism: [
                    'Chlorosulfite forms',
                    'Elimination occurs',
                    'Aldehyde forms',
                    'Mild oxidation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_194',
                name: 'Nicolaou Oxidation',
                reactants: ['Alcohol'],
                reagents: ['IBX'],
                products: ['Aldehyde'],
                products: ['Aldehyde'],
                mechanism: [
                    'Hypervalent iodine reagent',
                    'Oxidation occurs',
                    'Aldehyde forms',
                    'Very mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMSO',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '67',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_195',
                name: 'Shapiro Reaction',
                reactants: ['Tosylhydrazone'],
                reagents: ['Strong base'],
                products: ['Alkene'],
                mechanism: [
                    'Diazene forms',
                    'Nitrogen eliminates',
                    'Carbanion forms',
                    'Protonation gives alkene'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_196',
                name: 'Bamford-Stevens Reaction',
                reactants: ['Tosylhydrazone'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Carbene or carbanion forms',
                    'Depending on conditions',
                    'Alkene forms',
                    'Mixture of products'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Glycol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_197',
                name: 'McFadyen-Stevens Reaction',
                reactants: ['Aroyl hydrazide'],
                reagents: ['Base'],
                products: ['Aldehyde'],
                mechanism: [
                    'Acyl anion equivalent',
                    'Decarboxylation occurs',
                    'Aldehyde forms',
                    'Aromatic aldehydes'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Decarboxylation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_198',
                name: 'Chugaev Reaction',
                reactants: ['Allyl xanthate'],
                reagents: ['Heat'],
                products: ['Alkene'],
                mechanism: [
                    'Xanthate decomposes',
                    'Thioketene forms',
                    'Elimination occurs',
                    'Alkene forms'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_199',
                name: 'Cope Elimination',
                reactants: ['N-Oxide'],
                reagents: ['Heat'],
                products: ['Alkene', 'Hydroxylamine'],
                mechanism: [
                    'N-Oxide decomposes',
                    'Syn elimination',
                    'Alkene forms',
                    'Hydroxylamine byproduct'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_200',
                name: 'Emde Degradation',
                reactants: ['Quaternary ammonium salt'],
                reagents: ['Na/Hg'],
                products: ['Tertiary amine'],
                mechanism: [
                    'Radical cleavage',
                    'Sodium amalgam reduces',
                    'Alkyl radical forms',
                    'Tertiary amine results'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Degradations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_201',
                name: 'von Braun Reaction',
                reactants: ['Tertiary amine', 'Cyanogen bromide'],
                reagents: [],
                products: ['Alkyl bromide', 'N-Cyanamide'],
                mechanism: [
                    'Cyanogen bromide attacks',
                    'Immonium salt forms',
                    'Bromide displaces',
                    'Cleavage occurs'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cleavage Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_202',
                name: 'Chapman Rearrangement',
                reactants: ['Aryl imidate'],
                reagents: ['Heat'],
                products: ['N-Aryl amide'],
                mechanism: [
                    'Imidate rearranges',
                    'Aryl migrates',
                    'N-Aryl amide forms',
                    'Thermal reaction'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_203',
                name: 'Wallach Rearrangement',
                reactants: ['Azoxy compound'],
                reagents: ['Acid'],
                products: ['Hydroxyazo compound'],
                mechanism: [
                    'Azoxy rearranges',
                    'Hydroxyl migrates',
                    'Hydroxyazo forms',
                    'Acid-catalyzed'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_204',
                name: 'Orton Rearrangement',
                reactants: ['N-Chloroacetanilide'],
                reagents: ['HCl'],
                products: ['p-Chloroacetanilide'],
                mechanism: [
                    'N-Chloro compound',
                    'Rearrangement occurs',
                    'Para substitution',
                    'p-Chloro product'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_205',
                name: 'Fischer-Hepp Rearrangement',
                reactants: ['N-Nitroso-N-alkylarylamine'],
                reagents: ['HCl'],
                products: ['p-Nitroso compound'],
                mechanism: [
                    'N-Nitroso rearranges',
                    'Alkyl migrates',
                    'p-Nitroso forms',
                    'Acid-catalyzed'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_206',
                name: 'Bamberger Rearrangement',
                reactants: ['Phenylhydroxylamine'],
                reagents: ['Acid'],
                products: ['p-Aminophenol'],
                mechanism: [
                    'Hydroxylamine rearranges',
                    'Para migration',
                    'p-Aminophenol forms',
                    'Acid-catalyzed'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_207',
                name: 'Dimroth Rearrangement',
                reactants: ['Heterocyclic compound'],
                reagents: ['Base'],
                products: ['Rearranged heterocycle'],
                mechanism: [
                    'Ring-chain tautomerism',
                    'Rearrangement occurs',
                    'More stable isomer',
                    'Base-catalyzed'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_208',
                name: 'Cornforth Rearrangement',
                reactants: ['Allyl alcohol'],
                reagents: ['Base'],
                products: ['Rearranged carbonyl'],
                mechanism: [
                    'Enolate forms',
                    'Sigmatropic rearrangement',
                    'Carbonyl migrates',
                    'Thermodynamic product'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMSO',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_209',
                name: 'Smiles Rearrangement',
                reactants: ['Aryl alkyl ether'],
                reagents: ['Base'],
                products: ['Rearranged product'],
                mechanism: [
                    'Nucleophilic aromatic substitution',
                    'Intramolecular attack',
                    'Rearrangement occurs',
                    'Ring substitution'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_210',
                name: 'Truce-Smiles Rearrangement',
                reactants: ['Aryl sulfide'],
                reagents: ['Base'],
                products: ['Rearranged sulfide'],
                mechanism: [
                    'Carbanion attacks ring',
                    'Rearrangement occurs',
                    'Sulfur migrates',
                    'New substitution pattern'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_211',
                name: 'Newman-Kwart Rearrangement',
                reactants: ['O-Aryl thiocarbamate'],
                reagents: ['Heat'],
                products: ['S-Aryl thiocarbamate'],
                mechanism: [
                    'Thiocarbonyl migrates',
                    'Rearrangement occurs',
                    'S-Aryl product forms',
                    'Thermal reaction'
                ],
                conditions: {
                    temperature: '250',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_212',
                name: 'Meisenheimer Rearrangement',
                reactants: ['Quaternary ammonium salt'],
                reagents: ['Heat'],
                products: ['Rearranged amine'],
                mechanism: [
                    'Ylide forms',
                    'Stevens-type rearrangement',
                    'Alkyl migration',
                    'Tertiary amine'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_213',
                name: 'Dienone-Phenol Rearrangement',
                reactants: ['2,4-Cyclohexadienone'],
                reagents: ['Acid'],
                products: ['Phenol'],
                mechanism: [
                    'Protonation occurs',
                    'Rearrangement to phenol',
                    'Aromatic ring forms',
                    'Acid-catalyzed'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_214',
                name: 'Aromatization Reactions',
                reactants: ['Cyclic compound'],
                reagents: ['Oxidant'],
                products: ['Aromatic compound'],
                mechanism: [
                    'Dehydrogenation occurs',
                    'Double bonds form',
                    'Aromatic system',
                    'Oxidative process'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatization',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_215',
                name: 'Transesterification',
                reactants: ['Ester', 'Alcohol'],
                reagents: ['Acid or Base'],
                products: ['New ester', 'Alcohol'],
                mechanism: [
                    'Nucleophilic attack',
                    'Tetrahedral intermediate',
                    'Leaving group departs',
                    'Equilibrium reaction'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Alcohol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Ester Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_216',
                name: 'Saponification',
                reactants: ['Ester', 'Base'],
                reagents: ['NaOH or KOH'],
                products: ['Carboxylate', 'Alcohol'],
                mechanism: [
                    'Hydroxide attacks carbonyl',
                    'Tetrahedral intermediate',
                    'Alkoxide leaves',
                    'Carboxylate forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Hydrolysis',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_217',
                name: 'Acid-Catalyzed Hydrolysis',
                reactants: ['Ester', 'Water'],
                reagents: ['HCl or H2SO4'],
                products: ['Carboxylic acid', 'Alcohol'],
                mechanism: [
                    'Protonation of carbonyl',
                    'Water attacks',
                    'Tetrahedral intermediate',
                    'Protonated alcohol leaves'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Hydrolysis',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_218',
                name: 'Amide Hydrolysis',
                reactants: ['Amide', 'Water'],
                reagents: ['Acid or Base'],
                products: ['Carboxylic acid', 'Amine'],
                mechanism: [
                    'Nucleophilic attack on carbonyl',
                    'Tetrahedral intermediate',
                    'Leaving group departs',
                    'Carboxylic acid and amine'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Hydrolysis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_219',
                name: 'Nitrile Hydrolysis',
                reactants: ['Nitrile', 'Water'],
                reagents: ['Acid or Base'],
                products: ['Carboxylic acid'],
                mechanism: [
                    'Nitrile protonated or deprotonated',
                    'Water adds',
                    'Imidic acid forms',
                    'Further hydrolysis to acid'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Hydrolysis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_220',
                name: 'Imine Formation',
                reactants: ['Aldehyde', 'Amine'],
                reagents: [],
                products: ['Imine', 'Water'],
                mechanism: [
                    'Nucleophilic attack',
                    'Carbinolamine forms',
                    'Dehydration occurs',
                    'Imine results'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Organic solvent',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Condensation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_221',
                name: 'Enamine Formation',
                reactants: ['Carbonyl', 'Secondary amine'],
                reagents: ['Acid catalyst'],
                products: ['Enamine'],
                mechanism: [
                    'Imine forms first',
                    'Tautomerization occurs',
                    'Enamine results',
                    'Conjugated system'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Condensation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_222',
                name: 'Acetylation',
                reactants: ['Alcohol', 'Acetic anhydride'],
                reagents: ['Base'],
                products: ['Ester', 'Acetic acid'],
                mechanism: [
                    'Nucleophilic attack',
                    'Tetrahedral intermediate',
                    'Acetate leaves',
                    'Ester forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '67',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Acylation',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_223',
                name: 'Benzoylation',
                reactants: ['Alcohol', 'Benzoyl chloride'],
                reagents: ['Base'],
                products: ['Ester', 'HCl'],
                mechanism: [
                    'Nucleophilic attack',
                    'Tetrahedral intermediate',
                    'Chloride leaves',
                    'Benzoate ester'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Acylation',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_224',
                name: 'Tosylation',
                reactants: ['Alcohol', 'TsCl'],
                reagents: ['Base'],
                products: ['Tosylate'],
                mechanism: [
                    'Nucleophilic attack',
                    'Chloride leaves',
                    'Tosylate forms',
                    'Good leaving group'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Sulfonylation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_225',
                name: 'Mesylation',
                reactants: ['Alcohol', 'MsCl'],
                reagents: ['Base'],
                products: ['Mesylate'],
                mechanism: [
                    'Nucleophilic attack',
                    'Chloride leaves',
                    'Mesylate forms',
                    'Excellent leaving group'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Sulfonylation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_226',
                name: 'Triflation',
                reactants: ['Alcohol', 'Tf2O'],
                reagents: ['Base'],
                products: ['Triflate'],
                mechanism: [
                    'Nucleophilic attack',
                    'Triflate leaves',
                    'Best leaving group',
                    'For SN1 reactions'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '0.5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Sulfonylation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_227',
                name: 'Silylation',
                reactants: ['Alcohol', 'Silyl chloride'],
                reagents: ['Base'],
                products: ['Silyl ether'],
                mechanism: [
                    'Nucleophilic attack',
                    'Chloride leaves',
                    'Silyl ether forms',
                    'Protecting group'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Protection',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_228',
                name: 'Desilylation',
                reactants: ['Silyl ether'],
                reagents: ['TBAF or Acid'],
                products: ['Alcohol'],
                mechanism: [
                    'Fluoride attacks silicon',
                    'Silyl fluoride forms',
                    'Alcohol freed',
                    'Deprotection occurs'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Deprotection',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_229',
                name: 'Deacetylation',
                reactants: ['Acetate ester'],
                reagents: ['Base or Acid'],
                products: ['Alcohol', 'Acetic acid'],
                mechanism: [
                    'Hydrolysis occurs',
                    'Ester cleaved',
                    'Alcohol and acid',
                    'Standard conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Deprotection',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_230',
                name: 'Debenzoylation',
                reactants: ['Benzoate ester'],
                reagents: ['Base'],
                products: ['Alcohol', 'Benzoic acid'],
                mechanism: [
                    'Base hydrolysis',
                    'Ester saponification',
                    'Alcohol and benzoate',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Deprotection',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_231',
                name: 'Detosylation',
                reactants: ['Tosylate'],
                reagents: ['Reducing agent'],
                products: ['Hydrocarbon'],
                mechanism: [
                    'SN2 displacement',
                    'Tosylate leaves',
                    'Nucleophile attacks',
                    'Product forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '67',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Deprotection',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_232',
                name: 'Demesylation',
                reactants: ['Mesylate'],
                reagents: ['Nucleophile'],
                products: ['Product'],
                mechanism: [
                    'Excellent leaving group',
                    'SN2 reaction',
                    'Nucleophile displaces',
                    'Product forms'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '67',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Deprotection',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_233',
                name: 'Detriflation',
                reactants: ['Triflate'],
                reagents: ['Nucleophile'],
                products: ['Product'],
                mechanism: [
                    'Best leaving group',
                    'Facilitates reactions',
                    'Nucleophile attacks',
                    'Product forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '50',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Deprotection',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_234',
                name: 'Catalytic Hydrogenation',
                reactants: ['Alkene', 'H2'],
                reagents: ['Pd/C or Pt'],
                products: ['Alkane'],
                mechanism: [
                    'Hydrogen adsorbs',
                    'Alkene coordinates',
                    'Syn addition',
                    'Alkane forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Reduction Reactions',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_235',
                name: 'Hydrogenolysis',
                reactants: ['Compound with C-X bond'],
                reagents: ['H2', 'Catalyst'],
                products: ['C-H compound'],
                mechanism: [
                    'Catalyst activates bond',
                    'Hydrogen adds',
                    'C-X cleaved',
                    'C-H forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '50',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Reduction Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_236',
                name: 'Decarboxylation',
                reactants: ['Carboxylic acid'],
                reagents: ['Heat or Catalyst'],
                products: ['Alkane', 'CO2'],
                mechanism: [
                    'Beta-elimination',
                    'Carboxylate leaves',
                    'CO2 evolves',
                    'Alkane forms'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Quinoline',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Decarboxylation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_237',
                name: 'Dehydration',
                reactants: ['Alcohol'],
                reagents: ['Acid or Heat'],
                products: ['Alkene', 'Water'],
                mechanism: [
                    'Protonation occurs',
                    'Water leaves',
                    'Carbocation forms',
                    'Elimination gives alkene'
                ],
                conditions: {
                    temperature: '140',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_238',
                name: 'Electrophilic Aromatic Halogenation',
                reactants: ['Aromatic compound'],
                reagents: ['Halogen', 'Lewis acid'],
                products: ['Haloarene'],
                mechanism: [
                    'Halogen activated',
                    'Electrophilic attack',
                    'Aromatic substitution',
                    'Haloarene forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_239',
                name: 'Bromination of Alkenes',
                reactants: ['Alkene'],
                reagents: ['Br2'],
                products: ['Dibromide'],
                mechanism: [
                    'Bromonium ion forms',
                    'Bromide attacks',
                    'Anti addition',
                    'Dibromide results'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'CCl4',
                    time: '0.5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Addition Reactions',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_240',
                name: 'Iodination',
                reactants: ['Aromatic compound'],
                reagents: ['I2', 'Oxidant'],
                products: ['Iodoarene'],
                mechanism: [
                    'Iodine activated',
                    'Electrophilic substitution',
                    'Iodo group adds',
                    'Reversible reaction'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_241',
                name: 'Chlorination of Alkanes',
                reactants: ['Alkane'],
                reagents: ['Cl2', 'Light'],
                products: ['Chloride'],
                mechanism: [
                    'Radical initiation',
                    'Hydrogen abstraction',
                    'Chlorine radical adds',
                    'Chain reaction'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Radical Reactions',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_242',
                name: 'Fluorination',
                reactants: ['Organic compound'],
                reagents: ['F2 or HF'],
                products: ['Fluorinated compound'],
                mechanism: [
                    'Electrophilic fluorination',
                    'Nucleophilic fluorination',
                    'Depends on reagent',
                    'Fluorine introduces'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Various',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Halogenation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_243',
                name: 'Nitration of Aromatics',
                reactants: ['Aromatic compound'],
                reagents: ['HNO3', 'H2SO4'],
                products: ['Nitroarene'],
                mechanism: [
                    'Nitronium ion forms',
                    'Electrophilic attack',
                    'Nitro group adds',
                    'Meta directing'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_244',
                name: 'Sulfonation',
                reactants: ['Aromatic compound'],
                reagents: ['H2SO4'],
                products: ['Sulfonic acid'],
                mechanism: [
                    'Sulfur trioxide protonated',
                    'Electrophilic attack',
                    'Sulfonic acid forms',
                    'Reversible reaction'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_245',
                name: 'Friedel-Crafts Alkylation',
                reactants: ['Aromatic compound', 'Alkyl halide'],
                reagents: ['AlCl3'],
                products: ['Alkylarene'],
                mechanism: [
                    'Carbocation forms',
                    'Electrophilic attack',
                    'Alkylation occurs',
                    'Rearrangement possible'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_246',
                name: 'Friedel-Crafts Acylation',
                reactants: ['Aromatic compound', 'Acid chloride'],
                reagents: ['AlCl3'],
                products: ['Ketone'],
                mechanism: [
                    'Acyl cation forms',
                    'Electrophilic attack',
                    'Ketone forms',
                    'Ortho-para directing'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_247',
                name: 'Nucleophilic Aromatic Substitution',
                reactants: ['Haloarene'],
                reagents: ['Nucleophile'],
                products: ['Substituted arene'],
                mechanism: [
                    'Nucleophile attacks',
                    'Meisenheimer complex',
                    'Leaving group departs',
                    'Activated rings required'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_248',
                name: 'Azo Coupling',
                reactants: ['Diazonium salt', 'Activated aromatic'],
                reagents: [],
                products: ['Azo compound'],
                mechanism: [
                    'Diazonium electrophile',
                    'Activated ring attacks',
                    'Azo linkage forms',
                    'Colored product'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '0.5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Coupling Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_249',
                name: 'Quinone Formation',
                reactants: ['Hydroquinone'],
                reagents: ['Oxidant'],
                products: ['Quinone'],
                mechanism: [
                    'Two-electron oxidation',
                    'Hydroquinone to quinone',
                    'Reversible reaction',
                    'Biological importance'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_250',
                name: 'Anthraquinone Synthesis',
                reactants: ['Phthalic anhydride', 'Benzene'],
                reagents: ['AlCl3'],
                products: ['Anthraquinone'],
                mechanism: [
                    'Friedel-Crafts acylation',
                    'Cyclization occurs',
                    'Dehydrogenation',
                    'Anthraquinone forms'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Dye Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_251',
                name: 'Indigo Synthesis',
                reactants: ['Indole', 'Chloroacetic acid'],
                reagents: ['Base'],
                products: ['Indigo'],
                mechanism: [
                    'Indole alkylated',
                    'Oxidation occurs',
                    'Dimerization',
                    'Indigo dye forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '78',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Dye Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_252',
                name: 'Phenolphthalein Synthesis',
                reactants: ['Phthalic anhydride', 'Phenol'],
                reagents: ['H2SO4'],
                products: ['Phenolphthalein'],
                mechanism: [
                    'Phenol acylates',
                    'Second phenol adds',
                    'Cyclization occurs',
                    'Lactone forms'
                ],
                conditions: {
                    temperature: '120',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Dye Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_253',
                name: 'Fluorescein Synthesis',
                reactants: ['Phthalic anhydride', 'Resorcinol'],
                reagents: ['ZnCl2'],
                products: ['Fluorescein'],
                mechanism: [
                    'Resorcinol acylates',
                    'Second resorcinol adds',
                    'Cyclization occurs',
                    'Fluorescent dye'
                ],
                conditions: {
                    temperature: '180',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Dye Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_254',
                name: 'Rhodamine Synthesis',
                reactants: ['Phthalic anhydride', 'm-Aminophenol'],
                reagents: ['H2SO4'],
                products: ['Rhodamine'],
                mechanism: [
                    'Aminophenol acylates',
                    'Cyclization occurs',
                    'Further reactions',
                    'Rhodamine dye'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Dye Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_255',
                name: 'Chromone Synthesis',
                reactants: ['o-Hydroxyacetophenone', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Chromone'],
                mechanism: [
                    'Aldol condensation',
                    'Cyclization occurs',
                    'Dehydration',
                    'Chromone forms'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_256',
                name: 'Xanthone Synthesis',
                reactants: ['Salicylic acid', 'Phenol'],
                reagents: ['H2SO4'],
                products: ['Xanthone'],
                mechanism: [
                    'Ester formation',
                    'Friedel-Crafts type',
                    'Cyclization occurs',
                    'Xanthone forms'
                ],
                conditions: {
                    temperature: '140',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_257',
                name: 'Acridine Synthesis',
                reactants: ['Diphenylamine', 'Formaldehyde'],
                reagents: ['ZnCl2'],
                products: ['Acridine'],
                mechanism: [
                    'Mannich-type reaction',
                    'Cyclization occurs',
                    'Dehydrogenation',
                    'Acridine forms'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '85',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_258',
                name: 'Phenazine Synthesis',
                reactants: ['o-Phenylenediamine', 'o-Benzoquinone'],
                reagents: [],
                products: ['Phenazine'],
                mechanism: [
                    'Condensation occurs',
                    'Oxidation follows',
                    'Phenazine forms',
                    'Aromatic system'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_259',
                name: 'Phenothiazine Synthesis',
                reactants: ['Diphenylamine', 'Sulfur'],
                reagents: ['I2'],
                products: ['Phenothiazine'],
                mechanism: [
                    'Sulfur insertion',
                    'Cyclization occurs',
                    'Phenothiazine forms',
                    'Tricyclic system'
                ],
                conditions: {
                    temperature: '180',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_260',
                name: 'Dibenzofuran Synthesis',
                reactants: ['o-Bromophenol'],
                reagents: ['Cu'],
                products: ['Dibenzofuran'],
                mechanism: [
                    'Ullmann-type coupling',
                    'Cyclization occurs',
                    'Dibenzofuran forms',
                    'Oxygen-containing'
                ],
                conditions: {
                    temperature: '250',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '55',
                    atomEconomy: '100',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_261',
                name: 'Dibenzothiophene Synthesis',
                reactants: ['o-Bromophenyl sulfide'],
                reagents: ['Cu'],
                products: ['Dibenzothiophene'],
                mechanism: [
                    'Ullmann coupling',
                    'Sulfur-containing ring',
                    'Cyclization occurs',
                    'Tricyclic system'
                ],
                conditions: {
                    temperature: '250',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '100',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_262',
                name: 'Thianthrene Synthesis',
                reactants: ['Diphenyl sulfide', 'Sulfur'],
                reagents: ['AlCl3'],
                products: ['Thianthrene'],
                mechanism: [
                    'Friedel-Crafts type',
                    'Sulfur insertion',
                    'Cyclization occurs',
                    'Thianthrene forms'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_263',
                name: 'Phenoxazine Synthesis',
                reactants: ['o-Aminophenol', 'o-Benzoquinone'],
                reagents: [],
                products: ['Phenoxazine'],
                mechanism: [
                    'Condensation occurs',
                    'Oxidation follows',
                    'Phenoxazine forms',
                    'Oxygen-nitrogen system'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_264',
                name: 'Thiazole Synthesis',
                reactants: ['Alpha-halo ketone', 'Thiourea'],
                reagents: ['Base'],
                products: ['Thiazole'],
                mechanism: [
                    'Thiourea attacks',
                    'Cyclization occurs',
                    'Dehydration',
                    'Thiazole forms'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_265',
                name: 'Oxazole Synthesis',
                reactants: ['Alpha-acylamino ketone'],
                reagents: ['H2SO4'],
                products: ['Oxazole'],
                mechanism: [
                    'Cyclodehydration',
                    'Protonation occurs',
                    'Water leaves',
                    'Oxazole forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_266',
                name: 'Imidazole Synthesis',
                reactants: ['Alpha-dicarbonyl', 'Ammonia', 'Aldehyde'],
                reagents: [],
                products: ['Imidazole'],
                mechanism: [
                    'Three-component reaction',
                    'Radzisewski reaction',
                    'Cyclization occurs',
                    'Imidazole forms'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_267',
                name: 'Pyrazole Synthesis',
                reactants: ['Beta-diketone', 'Hydrazine'],
                reagents: [],
                products: ['Pyrazole'],
                mechanism: [
                    'Nucleophilic addition',
                    'Cyclization occurs',
                    'Dehydration',
                    'Pyrazole forms'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_268',
                name: '1,2,4-Triazole Synthesis',
                reactants: ['Formic acid', 'Acetic acid', 'Hydrazine'],
                reagents: ['Heat'],
                products: ['1,2,4-Triazole'],
                mechanism: [
                    'Three-component reaction',
                    'Cyclization occurs',
                    'Dehydration',
                    'Triazole forms'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_269',
                name: 'Tetrazole Synthesis',
                reactants: ['Nitrile', 'Sodium azide'],
                reagents: ['ZnBr2'],
                products: ['Tetrazole'],
                mechanism: [
                    'Azide adds to nitrile',
                    'Cyclization occurs',
                    'Tetrazole forms',
                    'Five-membered ring'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_270',
                name: 'Isothiazole Synthesis',
                reactants: ['Beta-keto nitrile', 'H2S'],
                reagents: ['Base'],
                products: ['Isothiazole'],
                mechanism: [
                    'Thiol adds to nitrile',
                    'Cyclization occurs',
                    'Oxidation may follow',
                    'Isothiazole forms'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_271',
                name: 'Benzimidazole Synthesis',
                reactants: ['o-Phenylenediamine', 'Carboxylic acid'],
                reagents: ['HCl'],
                products: ['Benzimidazole'],
                mechanism: [
                    'Amide formation',
                    'Cyclodehydration',
                    'Benzimidazole forms',
                    'Fused system'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_272',
                name: 'Benzoxazole Synthesis',
                reactants: ['o-Aminophenol', 'Carboxylic acid'],
                reagents: ['PPA'],
                products: ['Benzoxazole'],
                mechanism: [
                    'Amide formation',
                    'Cyclodehydration',
                    'Benzoxazole forms',
                    'Oxygen-nitrogen ring'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_273',
                name: 'Benzothiazole Synthesis',
                reactants: ['o-Aminothiophenol', 'Carboxylic acid'],
                reagents: ['PPA'],
                products: ['Benzothiazole'],
                mechanism: [
                    'Amide formation',
                    'Cyclodehydration',
                    'Benzothiazole forms',
                    'Sulfur-nitrogen ring'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_274',
                name: 'Pteridine Synthesis',
                reactants: ['4,5-Diaminopyrimidine', 'Alpha-dicarbonyl'],
                reagents: [],
                products: ['Pteridine'],
                mechanism: [
                    'Condensation occurs',
                    'Cyclization follows',
                    'Pteridine forms',
                    'Fused heterocycle'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_275',
                name: 'Alloxazine Synthesis',
                reactants: ['o-Phenylenediamine', 'Alloxan'],
                reagents: [],
                products: ['Alloxazine'],
                mechanism: [
                    'Condensation occurs',
                    'Cyclization follows',
                    'Alloxazine forms',
                    'Isoalloxazine precursor'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_276',
                name: 'Flavine Synthesis',
                reactants: ['Alloxazine', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Flavine'],
                mechanism: [
                    'Aldehydic oxidation',
                    'Condensation occurs',
                    'Flavine forms',
                    'Vitamin B2 precursor'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_277',
                name: 'Lumazine Synthesis',
                reactants: ['2,4-Dihydroxy-6-methylpyrimidine', 'Guanidine'],
                reagents: ['Heat'],
                products: ['Lumazine'],
                mechanism: [
                    'Condensation occurs',
                    'Cyclization follows',
                    'Lumazine forms',
                    'Pteridine derivative'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '89',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_278',
                name: 'Porphyrin Synthesis',
                reactants: ['Pyrrole', 'Formaldehyde'],
                reagents: ['Acid'],
                products: ['Porphyrin'],
                mechanism: [
                    'Rothemund reaction',
                    'Four pyrroles condense',
                    'Macrocycle forms',
                    'Porphyrin results'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '50',
                    atomEconomy: '89',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Macrocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_279',
                name: 'Chlorophyll Synthesis',
                reactants: ['Porphyrin', 'Phytol', 'Mg2+'],
                reagents: [],
                products: ['Chlorophyll'],
                mechanism: [
                    'Magnesium insertion',
                    'Phytylation occurs',
                    'Chlorophyll forms',
                    'Photosynthetic pigment'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Organic solvent',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Natural Product Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_280',
                name: 'Hemoglobin Synthesis',
                reactants: ['Heme', 'Globulin'],
                reagents: [],
                products: ['Hemoglobin'],
                mechanism: [
                    'Heme binds to protein',
                    'Coordination occurs',
                    'Hemoglobin forms',
                    'Oxygen carrier'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Aqueous',
                    time: 'Continuous',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Biomolecule Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_281',
                name: 'Vitamin B12 Synthesis',
                reactants: ['Cobyric acid', 'Adenosine'],
                reagents: [],
                products: ['Vitamin B12'],
                mechanism: [
                    'Cobyric acid activation',
                    'Adenosylation occurs',
                    'Vitamin B12 forms',
                    'Complex cobalt complex'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Vitamin Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_282',
                name: 'Morphine Synthesis',
                reactants: ['Thebaine', 'Codeine'],
                reagents: ['Reduction'],
                products: ['Morphine'],
                mechanism: [
                    'Demethylation occurs',
                    'Reduction follows',
                    'Morphine forms',
                    'Opioid alkaloid'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Alkaloid Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_283',
                name: 'Quinine Synthesis',
                reactants: ['Quinoline', 'Quinuclidine'],
                reagents: ['Coupling'],
                products: ['Quinine'],
                mechanism: [
                    'Quinoline and quinuclidine',
                    'Coupling occurs',
                    'Quinine forms',
                    'Antimalarial drug'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Alkaloid Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_284',
                name: 'Camphor Synthesis',
                reactants: ['Pinane', 'Oxygen'],
                reagents: ['Catalyst'],
                products: ['Camphor'],
                mechanism: [
                    'Oxidation occurs',
                    'Rearrangement follows',
                    'Camphor forms',
                    'Terpene derivative'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Terpene Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_285',
                name: 'Cholesterol Synthesis',
                reactants: ['Squalene', 'Oxygen'],
                reagents: ['Enzymes'],
                products: ['Cholesterol'],
                mechanism: [
                    'Epoxidation occurs',
                    'Cyclization follows',
                    'Cholesterol forms',
                    'Steroid hormone'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Aqueous',
                    time: 'Enzymatic',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Steroid Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_286',
                name: 'Glucose Synthesis',
                reactants: ['Formaldehyde'],
                reagents: ['Base'],
                products: ['Glucose'],
                mechanism: [
                    'Formose reaction',
                    'Aldol condensations',
                    'Glucose forms',
                    'Carbohydrate synthesis'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '50',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carbohydrate Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_287',
                name: 'Glutamic Acid Synthesis',
                reactants: ['Alpha-ketoglutarate', 'Ammonia'],
                reagents: ['Enzyme'],
                products: ['Glutamic acid'],
                mechanism: [
                    'Transamination occurs',
                    'Ammonia adds',
                    'Glutamic acid forms',
                    'Amino acid synthesis'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Amino Acid Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_288',
                name: 'Solid-Phase Peptide Synthesis',
                reactants: ['Amino acid', 'Resin-bound amino acid'],
                reagents: ['Coupling agent'],
                products: ['Peptide chain'],
                mechanism: [
                    'Amino acid activation',
                    'Coupling to resin',
                    'Deprotection follows',
                    'Peptide elongation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Peptide Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_289',
                name: 'Merrifield Solid-Phase Synthesis',
                reactants: ['Protected amino acid', 'Chloromethyl resin'],
                reagents: ['Base'],
                products: ['Resin-bound amino acid'],
                mechanism: [
                    'Ester formation',
                    'Resin attachment',
                    'Protected amino acid',
                    'Solid support'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Peptide Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_290',
                name: 'DNA Synthesis',
                reactants: ['Nucleoside', 'Phosphoramidite'],
                reagents: ['Activator'],
                products: ['Oligonucleotide'],
                mechanism: [
                    'Phosphoramidite coupling',
                    'Tetrazole activation',
                    'Chain elongation',
                    'DNA strand forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetonitrile',
                    time: '5',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Nucleic Acid Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_291',
                name: 'RNA Synthesis',
                reactants: ['Ribonucleoside', 'Phosphoramidite'],
                reagents: ['Activator'],
                products: ['Oligoribonucleotide'],
                mechanism: [
                    'Similar to DNA synthesis',
                    '2\'-OH protection needed',
                    'Phosphoramidite coupling',
                    'RNA strand forms'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetonitrile',
                    time: '10',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Nucleic Acid Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_292',
                name: 'Lipid Synthesis',
                reactants: ['Glycerol', 'Fatty acids'],
                reagents: ['Enzyme'],
                products: ['Triglyceride'],
                mechanism: [
                    'Acylation occurs',
                    'Glycerol backbone',
                    'Fatty acid attachment',
                    'Triglyceride forms'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Aqueous',
                    time: 'Enzymatic',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Lipid Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_293',
                name: 'Ziegler-Natta Polymerization',
                reactants: ['Ethylene', 'Propylene'],
                reagents: ['TiCl4', 'AlEt3'],
                products: ['Polyethylene', 'Polypropylene'],
                mechanism: [
                    'Coordination catalysis',
                    'Insertion polymerization',
                    'Stereoregular polymers',
                    'High molecular weight'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '10',
                    pressureUnit: 'atm',
                    solvent: 'Hexane',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_294',
                name: 'Metallocene Polymerization',
                reactants: ['Propylene'],
                reagents: ['Zirconocene', 'MAO'],
                products: ['Isotactic polypropylene'],
                mechanism: [
                    'Single-site catalysis',
                    'Chiral metallocene',
                    'Stereospecific polymerization',
                    'High isotacticity'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '5',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_295',
                name: 'Ring-Opening Polymerization',
                reactants: ['Lactide', 'Caprolactone'],
                reagents: ['SnOct2'],
                products: ['PLA', 'PCL'],
                mechanism: [
                    'Cyclic monomer',
                    'Ring opening',
                    'Chain growth',
                    'Polyester forms'
                ],
                conditions: {
                    temperature: '130',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_296',
                name: 'Step-Growth Polymerization',
                reactants: ['Adipic acid', 'Hexamethylenediamine'],
                reagents: [],
                products: ['Nylon 6,6'],
                mechanism: [
                    'Condensation polymerization',
                    'Amide bond formation',
                    'Water elimination',
                    'Polymer chain grows'
                ],
                conditions: {
                    temperature: '280',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_297',
                name: 'Free Radical Polymerization',
                reactants: ['Styrene', 'Methyl methacrylate'],
                reagents: ['AIBN'],
                products: ['Polystyrene', 'PMMA'],
                mechanism: [
                    'Initiator decomposes',
                    'Radical formation',
                    'Chain propagation',
                    'Termination occurs'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_298',
                name: 'Anionic Polymerization',
                reactants: ['Styrene', 'Butadiene'],
                reagents: ['n-BuLi'],
                products: ['Polystyrene', 'Polybutadiene'],
                mechanism: [
                    'Initiator forms carbanion',
                    'Nucleophilic addition',
                    'Living polymerization',
                    'Controlled molecular weight'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_299',
                name: 'Cationic Polymerization',
                reactants: ['Isobutylene', 'Styrene'],
                reagents: ['BF3'],
                products: ['Polyisobutylene', 'Polystyrene'],
                mechanism: [
                    'Lewis acid initiates',
                    'Carbocation forms',
                    'Electrophilic addition',
                    'Chain propagation'
                ],
                conditions: {
                    temperature: '-100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methylene chloride',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_300',
                name: 'Coordination Polymerization',
                reactants: ['Ethylene', 'Propylene'],
                reagents: ['Ziegler-Natta catalyst'],
                products: ['Polyethylene', 'Polypropylene'],
                mechanism: [
                    'Metal alkyl complex',
                    'Monomer coordination',
                    'Insertion polymerization',
                    'Stereoregular polymer'
                ],
                conditions: {
                    temperature: '70',
                    temperatureUnit: '°C',
                    pressure: '5',
                    pressureUnit: 'atm',
                    solvent: 'Hexane',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_301',
                name: 'Emulsion Polymerization',
                reactants: ['Styrene', 'Butadiene'],
                reagents: ['Persulfate', 'Surfactant'],
                products: ['SBR rubber'],
                mechanism: [
                    'Water phase initiation',
                    'Monomer droplets',
                    'Particle formation',
                    'High molecular weight'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_302',
                name: 'Suspension Polymerization',
                reactants: ['Vinyl chloride'],
                reagents: ['Peroxide'],
                products: ['PVC'],
                mechanism: [
                    'Monomer suspended',
                    'Initiator in monomer',
                    'Droplet polymerization',
                    'Powder product'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_303',
                name: 'Solution Polymerization',
                reactants: ['Acrylonitrile'],
                reagents: ['AIBN'],
                products: ['Polyacrylonitrile'],
                mechanism: [
                    'Monomer in solvent',
                    'Homogeneous system',
                    'Radical polymerization',
                    'Solution product'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_304',
                name: 'Bulk Polymerization',
                reactants: ['Methyl methacrylate'],
                reagents: ['Peroxide'],
                products: ['PMMA'],
                mechanism: [
                    'Neat monomer',
                    'No solvent used',
                    'Heat dissipation issue',
                    'High purity polymer'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_305',
                name: 'Plasma Polymerization',
                reactants: ['Organic vapor'],
                reagents: ['Plasma'],
                products: ['Thin polymer film'],
                mechanism: [
                    'Gas phase activation',
                    'Plasma excitation',
                    'Fragment recombination',
                    'Surface deposition'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '0.1',
                    pressureUnit: 'torr',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '95',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_306',
                name: 'Photopolymerization',
                reactants: ['Acrylate monomer'],
                reagents: ['Photoinitiator', 'UV light'],
                products: ['Polymer network'],
                mechanism: [
                    'UV light absorption',
                    'Radical generation',
                    'Chain polymerization',
                    'Cross-linked polymer'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '0.1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_307',
                name: 'Radiation Polymerization',
                reactants: ['Acrylic acid'],
                reagents: ['Gamma rays'],
                products: ['Polyacrylic acid'],
                mechanism: [
                    'High energy radiation',
                    'Radical formation',
                    'Polymerization occurs',
                    'No chemical initiator'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_308',
                name: 'Atom Transfer Radical Polymerization',
                reactants: ['Styrene', 'Methyl acrylate'],
                reagents: ['CuBr', 'PMDETA'],
                products: ['Block copolymer'],
                mechanism: [
                    'Copper catalyst',
                    'Radical equilibrium',
                    'Controlled polymerization',
                    'Low polydispersity'
                ],
                conditions: {
                    temperature: '90',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_309',
                name: 'RAFT Polymerization',
                reactants: ['Acrylamide', 'Styrene'],
                reagents: ['AIBN', 'Dithiobenzoate'],
                products: ['Controlled polymer'],
                mechanism: [
                    'Chain transfer agent',
                    'Reversible addition-fragmentation',
                    'Living radical polymerization',
                    'Controlled molecular weight'
                ],
                conditions: {
                    temperature: '70',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMSO',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_310',
                name: 'NMP Polymerization',
                reactants: ['Styrene'],
                reagents: ['TEMPO', 'BPO'],
                products: ['Polystyrene'],
                mechanism: [
                    'Nitroxide mediator',
                    'Reversible termination',
                    'Living radical polymerization',
                    'Narrow molecular weight'
                ],
                conditions: {
                    temperature: '125',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_311',
                name: 'Ring-Closing Metathesis',
                reactants: ['Diene'],
                reagents: ['Grubbs catalyst'],
                products: ['Cyclic alkene'],
                mechanism: [
                    'Ruthenium carbene catalyst',
                    'Olefin metathesis',
                    'Ring formation',
                    'Ethylene byproduct'
                ],
                conditions: {
                    temperature: '40',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_312',
                name: 'Cross-Metathesis',
                reactants: ['Terminal alkene', 'Terminal alkene'],
                reagents: ['Grubbs catalyst'],
                products: ['Internal alkene'],
                mechanism: [
                    'Two different alkenes',
                    'Metathesis exchange',
                    'New carbon-carbon bond',
                    'Statistical mixture'
                ],
                conditions: {
                    temperature: '40',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_313',
                name: 'Ring-Opening Metathesis Polymerization',
                reactants: ['Norborene', 'Cyclooctene'],
                reagents: ['Grubbs catalyst'],
                products: ['Polynorbornene'],
                mechanism: [
                    'Cyclic alkene monomer',
                    'Ring opening',
                    'Chain propagation',
                    'High molecular weight polymer'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_314',
                name: 'Olefin Metathesis',
                reactants: ['2-Butene', 'Ethylene'],
                reagents: ['Re catalyst'],
                products: ['Propylene'],
                mechanism: [
                    'Alkene exchange',
                    'Metal carbene intermediate',
                    'Carbon-carbon bond formation',
                    'Industrial process'
                ],
                conditions: {
                    temperature: '40',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_315',
                name: 'Enyne Metathesis',
                reactants: ['Enyne compound'],
                reagents: ['Grubbs catalyst'],
                products: ['Dienyne product'],
                mechanism: [
                    'Alkene and alkyne',
                    'Metathesis occurs',
                    '1,3-Diene formation',
                    'Ruthenium catalyst'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_316',
                name: 'Alkyne Metathesis',
                reactants: ['Terminal alkyne'],
                reagents: ['Molybdenum catalyst'],
                products: ['Internal alkyne'],
                mechanism: [
                    'Alkyne exchange',
                    'Metal alkylidyne',
                    'Carbon-carbon triple bond',
                    'High temperature'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_317',
                name: 'Acyclic Diene Metathesis',
                reactants: ['Diene', 'Alkene'],
                reagents: ['Grubbs catalyst'],
                products: ['Triene'],
                mechanism: [
                    'Diene and alkene',
                    'Metathesis polymerization',
                    'Acyclic system',
                    'Complex product mixture'
                ],
                conditions: {
                    temperature: '40',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_318',
                name: 'Click Chemistry',
                reactants: ['Azide', 'Alkyne'],
                reagents: ['CuSO4', 'Sodium ascorbate'],
                products: ['Triazole'],
                mechanism: [
                    'Modular chemistry',
                    'High yield reactions',
                    'Selective coupling',
                    'Bioorthogonal'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Click Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_319',
                name: 'Huisgen Cycloaddition',
                reactants: ['Azide', 'Alkyne'],
                reagents: ['Heat'],
                products: ['Triazole mixture'],
                mechanism: [
                    'Thermal cycloaddition',
                    '1,3-Dipolar addition',
                    'Regioisomers form',
                    'No catalyst needed'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cycloaddition',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_320',
                name: 'Copper-Catalyzed Azide-Alkyne Cycloaddition',
                reactants: ['Azide', 'Terminal alkyne'],
                reagents: ['Cu(I) catalyst'],
                products: ['1,4-Triazole'],
                mechanism: [
                    'Copper acetylide forms',
                    'Azide coordinates',
                    'Regioselective cycloaddition',
                    'Single regioisomer'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Click Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_321',
                name: 'Strain-Promoted Azide-Alkyne Cycloaddition',
                reactants: ['Azide', 'Cyclooctyne'],
                reagents: [],
                products: ['Triazole'],
                mechanism: [
                    'Strained alkyne',
                    'No catalyst needed',
                    'Fast reaction',
                    'Bioorthogonal labeling'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'PBS buffer',
                    time: '0.5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Click Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_322',
                name: 'Thiol-Ene Reaction',
                reactants: ['Thiol', 'Alkene'],
                reagents: ['Photoinitiator', 'UV light'],
                products: ['Thioether'],
                mechanism: [
                    'Radical addition',
                    'Anti-Markovnikov',
                    'Click-type reaction',
                    'Photochemical initiation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Click Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_323',
                name: 'Thiol-Yne Reaction',
                reactants: ['Thiol', 'Alkyne'],
                reagents: ['Photoinitiator', 'UV light'],
                products: ['Dithioether'],
                mechanism: [
                    'Radical addition',
                    'Vinyl radical intermediate',
                    'Second thiol addition',
                    'Geminal dithio compound'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Click Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_324',
                name: 'Inverse Electron Demand Diels-Alder',
                reactants: ['Tetrazine', 'Alkene'],
                reagents: [],
                products: ['Dihydropyridazine'],
                mechanism: [
                    'Electron-poor diene',
                    'Electron-rich dienophile',
                    'Inverse polarity',
                    'Fast reaction'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '0.5',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cycloaddition',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_325',
                name: 'Hetero Diels-Alder Reaction',
                reactants: ['Aldehyde', 'Danishefsky\'s diene'],
                reagents: [],
                products: ['Dihydropyrone'],
                mechanism: [
                    'Carbonyl as dienophile',
                    'Silyloxy diene',
                    'Heteroatoms in system',
                    'Pyrone formation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cycloaddition',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_326',
                name: '[2+2] Cycloaddition',
                reactants: ['Alkene', 'Alkene'],
                reagents: ['UV light'],
                products: ['Cyclobutane'],
                mechanism: [
                    'Photochemical reaction',
                    'Antarafacial addition',
                    'Stereospecific',
                    'Cyclobutane product'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetonitrile',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cycloaddition',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_327',
                name: '[4+2] Cycloaddition',
                reactants: ['Diene', 'Dienophile'],
                reagents: [],
                products: ['Cyclohexene'],
                mechanism: [
                    'Concerted cycloaddition',
                    'Suprafacial addition',
                    'Aromatic transition state',
                    'Stereospecific reaction'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cycloaddition',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_328',
                name: 'Paternò-Büchi Reaction',
                reactants: ['Carbonyl', 'Alkene'],
                reagents: ['UV light'],
                products: ['Oxetane'],
                mechanism: [
                    'Photochemical reaction',
                    'Carbonyl n,π* excited state',
                    'Paternò-Büchi addition',
                    'Oxetane formation'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetonitrile',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Photochemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_329',
                name: 'Stetter Reaction',
                reactants: ['Aldehyde', 'Alpha,beta-unsaturated carbonyl'],
                reagents: ['Thiazolium catalyst'],
                products: ['1,4-Dicarbonyl'],
                mechanism: [
                    'Thiazolium ylide',
                    'Umpolung reactivity',
                    'Michael acceptor addition',
                    '1,4-Dicarbonyl product'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_330',
                name: 'Aza-Baylis-Hillman Reaction',
                reactants: ['Imines', 'Activated alkenes'],
                reagents: ['DABCO'],
                products: ['Aza-MBH adduct'],
                mechanism: [
                    'Nucleophilic catalyst',
                    'Imine activation',
                    'Morita-Baylis-Hillman variant',
                    'Nitrogen-containing product'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMSO',
                    time: '48',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_331',
                name: 'Vinylogous Aldol Reaction',
                reactants: ['Silyloxy diene', 'Aldehyde'],
                reagents: ['Lewis acid'],
                products: ['Delta,epsilon-unsaturated carbonyl'],
                mechanism: [
                    'Extended enolate',
                    'Gamma-position attack',
                    'Vinylogous addition',
                    'Conjugated system'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_332',
                name: 'Mukaiyama Michael Addition',
                reactants: ['Silyl enol ether', 'Alpha,beta-unsaturated carbonyl'],
                reagents: ['TiCl4'],
                products: ['1,5-Dicarbonyl'],
                mechanism: [
                    'Lewis acid activation',
                    'Silyl enol ether addition',
                    'Michael-type reaction',
                    '1,5-Dicarbonyl product'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Michael Addition',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_333',
                name: 'Organocatalytic Michael Addition',
                reactants: ['Nucleophile', 'Michael acceptor'],
                reagents: ['Proline derivative'],
                products: ['Michael adduct'],
                mechanism: [
                    'Chiral organocatalyst',
                    'Enamine or iminium activation',
                    'Asymmetric addition',
                    'Stereoselective reaction'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_334',
                name: 'Asymmetric Michael Addition',
                reactants: ['Nucleophile', 'Michael acceptor'],
                reagents: ['Chiral catalyst'],
                products: ['Chiral Michael adduct'],
                mechanism: [
                    'Chiral metal complex',
                    'Asymmetric catalysis',
                    'Stereocontrol',
                    'Enantioselective addition'
                ],
                conditions: {
                    temperature: '-20',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_335',
                name: 'Vinylcyclopropane Rearrangement',
                reactants: ['Vinylcyclopropane'],
                reagents: ['Heat'],
                products: ['Cyclopentene'],
                mechanism: [
                    'Thermal rearrangement',
                    'Cyclopropane ring opening',
                    'Cyclopentene formation',
                    'Concerted mechanism'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Gas phase',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_336',
                name: 'Oxy-Cope Rearrangement',
                reactants: ['1,5-Dien-3-ol'],
                reagents: ['Heat'],
                products: ['Delta,epsilon-unsaturated carbonyl'],
                mechanism: [
                    'Sigmatropic rearrangement',
                    'Chair-like transition state',
                    'Oxygen substituent',
                    'Carbonyl product'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_337',
                name: 'Aza-Cope Rearrangement',
                reactants: ['1,5-Dien-3-amine'],
                reagents: ['Heat'],
                products: ['Rearranged imine'],
                mechanism: [
                    'Sigmatropic rearrangement',
                    'Nitrogen substituent',
                    'Imine formation',
                    'Aza variant'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_338',
                name: 'Anionic Oxy-Cope Rearrangement',
                reactants: ['Allylic alkoxide'],
                reagents: ['Base'],
                products: ['Rearranged carbonyl'],
                mechanism: [
                    'Alkoxide accelerates',
                    'Lower temperature',
                    'Anionic variant',
                    'Enhanced rate'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_339',
                name: 'Zwitterionic Aza-Claisen Rearrangement',
                reactants: ['Allyl imidate'],
                reagents: ['Heat'],
                products: ['Rearranged amide'],
                mechanism: [
                    'Imidate tautomer',
                    'Zwitterionic intermediate',
                    'Sigmatropic shift',
                    'Amide product'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_340',
                name: 'Thia-Claisen Rearrangement',
                reactants: ['Allyl aryl sulfide'],
                reagents: ['Heat'],
                products: ['Rearranged sulfide'],
                mechanism: [
                    'Sulfur analog',
                    'Sigmatropic rearrangement',
                    'Thia variant',
                    'Sulfur migration'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_341',
                name: 'Aza-Claisen Rearrangement',
                reactants: ['N-Allyl enamine'],
                reagents: ['Heat'],
                products: ['Gamma,delta-unsaturated carbonyl'],
                mechanism: [
                    'Nitrogen analog',
                    'Sigmatropic rearrangement',
                    'Aza variant',
                    'Carbonyl product'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_342',
                name: 'Carroll Rearrangement',
                reactants: ['Allyl acetoacetate'],
                reagents: ['Heat'],
                products: ['Gamma,delta-unsaturated ketone'],
                mechanism: [
                    'Decarboxylative rearrangement',
                    'Sigmatropic shift',
                    'Ketone formation',
                    'Elimination of CO2'
                ],
                conditions: {
                    temperature: '180',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_343',
                name: 'Eschenmoser-Claisen Rearrangement',
                reactants: ['Allyl alpha-thioacetamide'],
                reagents: ['HgCl2'],
                products: ['Gamma,delta-unsaturated thioamide'],
                mechanism: [
                    'Thioamide variant',
                    'Sigmatropic rearrangement',
                    'Mild conditions',
                    'Thioamide product'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_344',
                name: 'Johnson-Claisen Rearrangement',
                reactants: ['Allyl alcohol', 'Triethyl orthoacetate'],
                reagents: ['Acid'],
                products: ['Gamma,delta-unsaturated ester'],
                mechanism: [
                    'Orthoester variant',
                    'Sigmatropic rearrangement',
                    'Ester formation',
                    'Johnson modification'
                ],
                conditions: {
                    temperature: '140',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_345',
                name: 'Orthoester Claisen Rearrangement',
                reactants: ['Allyl orthoester'],
                reagents: ['Heat'],
                products: ['Rearranged ester'],
                mechanism: [
                    'Orthoester rearrangement',
                    'Sigmatropic shift',
                    'Ester product',
                    'Claisen variant'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_346',
                name: 'Allyl Vinyl Ether Claisen Rearrangement',
                reactants: ['Allyl vinyl ether'],
                reagents: ['Heat'],
                products: ['Gamma,delta-unsaturated carbonyl'],
                mechanism: [
                    'Vinyl ether variant',
                    'Sigmatropic rearrangement',
                    'Carbonyl formation',
                    'Classic Claisen'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_347',
                name: 'Silyl Ketene Acetal Claisen Rearrangement',
                reactants: ['Silyl ketene acetal'],
                reagents: ['Heat'],
                products: ['Silylated gamma,delta-unsaturated ester'],
                mechanism: [
                    'Ireland variant',
                    'Silyl stabilization',
                    'Sigmatropic rearrangement',
                    'Ester product'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_348',
                name: '1,3-Sigmatropic Rearrangement',
                reactants: ['Allyl system'],
                reagents: ['Heat'],
                products: ['Rearranged product'],
                mechanism: [
                    'Sigmatropic shift',
                    '1,3-migration',
                    'Suprafacial process',
                    'Stereospecific'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Pericyclic Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_349',
                name: '1,5-Sigmatropic Rearrangement',
                reactants: ['Cyclopentadiene system'],
                reagents: ['Heat'],
                products: ['Rearranged diene'],
                mechanism: [
                    'Sigmatropic shift',
                    '1,5-migration',
                    'Aromatic system',
                    'Rapid equilibrium'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '0.1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Pericyclic Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_350',
                name: 'Electrocyclic Ring Opening',
                reactants: ['Cyclobutene'],
                reagents: ['Heat'],
                products: ['Butadiene'],
                mechanism: [
                    'Conrotatory or disrotatory',
                    'Ring opening',
                    'Conjugated system',
                    'Woodward-Hoffmann rules'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Pericyclic Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_351',
                name: 'Electrocyclic Ring Closing',
                reactants: ['Hexatriene'],
                reagents: ['Heat'],
                products: ['Cyclohexadiene'],
                mechanism: [
                    'Conrotatory or disrotatory',
                    'Ring closing',
                    'Cyclic product',
                    'Stereospecific'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Pericyclic Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_352',
                name: 'Nazarov Cyclization',
                reactants: ['Divinyl ketone'],
                reagents: ['Acid'],
                products: ['Cyclopentenone'],
                mechanism: [
                    'Conjugated system',
                    'Protonation',
                    'Electrocyclic closure',
                    'Cyclopentenone formation'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_353',
                name: 'Oxyallyl Cation Cyclization',
                reactants: ['Alpha,alpha\'-dihaloketone'],
                reagents: ['Base'],
                products: ['Cyclopentanone'],
                mechanism: [
                    'Oxyallyl cation',
                    'Electrophilic cyclization',
                    'Cyclopentanone formation',
                    'Three-carbon synthon'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_354',
                name: 'Bergman Cyclization',
                reactants: ['Enediyne'],
                reagents: ['Heat'],
                products: ['Benzenoid diradical'],
                mechanism: [
                    'Enediyne system',
                    'Cycloaromatization',
                    'Diradical formation',
                    'DNA cleavage'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_355',
                name: 'Myers-Saito Cyclization',
                reactants: ['Enyne allene'],
                reagents: ['Heat'],
                products: ['Benzenoid diradical'],
                mechanism: [
                    'Enyne allene system',
                    'Cycloaromatization',
                    'Diradical formation',
                    'Anticancer activity'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_356',
                name: 'Schmittel Cyclization',
                reactants: ['Triyne'],
                reagents: ['Heat'],
                products: ['Benzene derivative'],
                mechanism: [
                    'Triyne system',
                    'Cyclization',
                    'Aromatic product',
                    'Multiple pathways'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_357',
                name: 'Schreiner Cyclization',
                reactants: ['Enyne'],
                reagents: ['Heat'],
                products: ['Cyclopentene'],
                mechanism: [
                    'Enyne metathesis-like',
                    'Thermal cyclization',
                    'Cyclopentene formation',
                    'No catalyst needed'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_358',
                name: 'Nicholas Reaction',
                reactants: ['Propargylic alcohol', 'Co2(CO)8'],
                reagents: [],
                products: ['Stabilized carbocation'],
                mechanism: [
                    'Cobalt complexation',
                    'Carbocation stabilization',
                    'Electrophilic reactions',
                    'Alkyne protection'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Organometallic Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_359',
                name: 'Petasis Olefination',
                reactants: ['Alpha-halo sulfone', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Sulfone anion',
                    'Addition to aldehyde',
                    'Elimination',
                    'Stereoselective'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_360',
                name: 'Julia-Lythgoe Olefination',
                reactants: ['Beta-keto sulfone', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Sulfone anion',
                    'Aldol-type addition',
                    'Elimination',
                    'E/Z selectivity'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_361',
                name: 'Ando Olefination',
                reactants: ['Epoxide', 'Phosphorus ylide'],
                reagents: [],
                products: ['Allyl alcohol'],
                mechanism: [
                    'Epoxide opening',
                    'Ylide addition',
                    'Wittig-like reaction',
                    'Allyl alcohol formation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_362',
                name: 'Takai Olefination',
                reactants: ['Aldehyde', 'Geminal dibromide'],
                reagents: ['CrCl2'],
                products: ['Alkene'],
                mechanism: [
                    'Chromium(II) reduction',
                    'Geminal dihalide',
                    'Alkene formation',
                    'E/Z mixture'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_363',
                name: 'Lombardo Olefination',
                reactants: ['Aldehyde', 'CHBr3'],
                reagents: ['CrCl2'],
                products: ['Dibromoalkene'],
                mechanism: [
                    'Chromium(II) reagent',
                    'Geminal tribromide',
                    'Dibromoalkene formation',
                    'Corey-Fuchs precursor'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_364',
                name: 'Fukuyama Olefination',
                reactants: ['Thioacetal', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Thioacetal anion',
                    'Addition to aldehyde',
                    'Elimination',
                    'Stereoselective'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_365',
                name: 'Still-Wittig Olefination',
                reactants: ['Phosphine oxide', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Phosphine oxide anion',
                    'Addition-elimination',
                    'Z-selective',
                    'Modified Wittig'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_366',
                name: 'Schlosser Olefination',
                reactants: ['Phosphorus ylide', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Modified Wittig',
                    'Schlosser conditions',
                    'E/Z control',
                    'Stereoselective'
                ],
                conditions: {
                    temperature: '-100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_367',
                name: 'Corey-Winter Olefination',
                reactants: ['1,2-Diol', 'Thiophosgene'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Cyclic thionocarbonate',
                    'Elimination',
                    'Alkene formation',
                    'Syn elimination'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_368',
                name: 'Johnson Olefination',
                reactants: ['Beta-keto sulfoxide', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Sulfoxide anion',
                    'Addition to aldehyde',
                    'Syn elimination',
                    'E/Z control'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_369',
                name: 'Nysted Reagent',
                reactants: ['Aldehyde'],
                reagents: ['Zn', 'CH2Br2'],
                products: ['Alkene'],
                mechanism: [
                    'Geminal dibromide formation',
                    'Zinc reduction',
                    'Alkene formation',
                    'Methylene addition'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_370',
                name: 'Seyferth-Gilbert Homologation',
                reactants: ['Aldehyde', 'Dimethyl diazomethylphosphonate'],
                reagents: ['Base'],
                products: ['Alkyne'],
                mechanism: [
                    'Phosphonate anion',
                    'Addition to aldehyde',
                    'Elimination',
                    'Alkyne formation'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_371',
                name: 'Ohira-Bestmann Reaction',
                reactants: ['Aldehyde', 'Bestmann-Ohira reagent'],
                reagents: ['Base'],
                products: ['Alkyne'],
                mechanism: [
                    'Diazo compound',
                    'Addition-elimination',
                    'Nitrogen loss',
                    'Terminal alkyne'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_372',
                name: 'Corey-Fuchs Reaction',
                reactants: ['Aldehyde', 'CBr4', 'PPh3'],
                reagents: [],
                products: ['Dibromoalkene'],
                mechanism: [
                    'Geminal dibromide',
                    'Double dehydrohalogenation',
                    'Alkyne formation',
                    'Two-step process'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_373',
                name: 'Ramirez Homologation',
                reactants: ['Aldehyde', 'Bis(dimethylamino)phosphine'],
                reagents: [],
                products: ['Alkyne'],
                mechanism: [
                    'Phosphorus ylide equivalent',
                    'Addition to aldehyde',
                    'Elimination',
                    'Alkyne formation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '85',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_374',
                name: 'Bestmann-Ohira Reagent',
                reactants: ['Aldehyde'],
                reagents: ['K2CO3'],
                products: ['Alkyne'],
                mechanism: [
                    'Diazo phosphonate',
                    'Base deprotonation',
                    'Addition-elimination',
                    'Terminal alkyne'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_375',
                name: 'Ramirez Olefination',
                reactants: ['Carbonyl', 'Phosphorus reagent'],
                reagents: [],
                products: ['Alkene'],
                mechanism: [
                    'Phosphorus(III) compound',
                    'Addition to carbonyl',
                    'Elimination',
                    'Alkene formation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_376',
                name: 'Seyferth Reagent',
                reactants: ['Carbonyl'],
                reagents: [],
                products: ['Alkyne'],
                mechanism: [
                    'Diazo compound',
                    'Carbene formation',
                    'Alkyne synthesis',
                    'Homologation'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_377',
                name: 'Ohira Reagent',
                reactants: ['Aldehyde'],
                reagents: ['Base'],
                products: ['Alkyne'],
                mechanism: [
                    'Modified Seyferth-Gilbert',
                    'Diazo phosphonate',
                    'One-pot reaction',
                    'Terminal alkyne'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_378',
                name: 'Fleming-Tamao Oxidation',
                reactants: ['Silyl ether'],
                reagents: ['H2O2', 'KF'],
                products: ['Alcohol'],
                mechanism: [
                    'Silyl group oxidation',
                    'Hypervalent silicon',
                    'Hydrolysis',
                    'Alcohol formation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_379',
                name: 'Brookhart Acid',
                reactants: ['Olefin'],
                reagents: ['Palladium catalyst'],
                products: ['Polymer'],
                mechanism: [
                    'Cationic palladium',
                    'Olefin polymerization',
                    'Living polymerization',
                    'Controlled molecular weight'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_380',
                name: 'Schrock Catalyst',
                reactants: ['Olefin'],
                reagents: ['Molybdenum alkylidene'],
                products: ['Polymer'],
                mechanism: [
                    'High oxidation state',
                    'Olefin metathesis',
                    'Ring-opening polymerization',
                    'Living polymerization'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_381',
                name: 'Hoveyda-Grubbs Catalyst',
                reactants: ['Diene'],
                reagents: ['Ruthenium carbene'],
                products: ['Cycloalkene'],
                mechanism: [
                    'Chelating isopropoxy',
                    'Ring-closing metathesis',
                    'Recyclable catalyst',
                    'High activity'
                ],
                conditions: {
                    temperature: '40',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_382',
                name: 'Nolan Catalyst',
                reactants: ['Olefin'],
                reagents: ['N-heterocyclic carbene ruthenium'],
                products: ['Metathesis product'],
                mechanism: [
                    'NHC ligand',
                    'Ruthenium complex',
                    'Olefin metathesis',
                    'High stability'
                ],
                conditions: {
                    temperature: '40',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_383',
                name: 'Piers Catalyst',
                reactants: ['Silane', 'Olefin'],
                reagents: ['Platinum complex'],
                products: ['Silylated product'],
                mechanism: [
                    'Hydrosilylation catalyst',
                    'Platinum NHC complex',
                    'High activity',
                    'Stereoselective'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Hydrosilylation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_384',
                name: 'Blechert Catalyst',
                reactants: ['Diene'],
                reagents: ['Ruthenium indenylidene'],
                products: ['Cycloalkene'],
                mechanism: [
                    'Indenylidene ligand',
                    'Ring-closing metathesis',
                    'High functional group tolerance',
                    'Stable catalyst'
                ],
                conditions: {
                    temperature: '40',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_385',
                name: 'Grela Catalyst',
                reactants: ['Olefin'],
                reagents: ['Ruthenium complex'],
                products: ['Metathesis product'],
                mechanism: [
                    'Hoveyda-type catalyst',
                    'Modified ligand',
                    'High activity',
                    'Recyclable'
                ],
                conditions: {
                    temperature: '40',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metathesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_386',
                name: 'Shi Asymmetric Epoxidation',
                reactants: ['Alkene'],
                reagents: ['Fructose-derived ketone', 'Oxone'],
                products: ['Epoxide'],
                mechanism: [
                    'Dioxirane formation',
                    'Asymmetric oxidation',
                    'Ketone catalyst',
                    'Enantioselective'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetonitrile-water',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_387',
                name: 'Jacobsen Hydrolytic Kinetic Resolution',
                reactants: ['Epoxide'],
                reagents: ['Co-salen catalyst', 'Water'],
                products: ['Diols'],
                mechanism: [
                    'Cobalt salen complex',
                    'Asymmetric ring opening',
                    'Kinetic resolution',
                    'Enantioselective'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_388',
                name: 'Bolm Asymmetric Epoxidation',
                reactants: ['Alkene'],
                reagents: ['Vanadium catalyst', 'Hydroperoxide'],
                products: ['Epoxide'],
                mechanism: [
                    'Vanadium-salen complex',
                    'Asymmetric epoxidation',
                    'Hydroperoxide oxidant',
                    'Enantioselective'
                ],
                conditions: {
                    temperature: '-20',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_389',
                name: 'Juliá-Colonna Epoxidation',
                reactants: ['Alpha,beta-unsaturated ketone'],
                reagents: ['Polyamino acid', 'H2O2'],
                products: ['Epoxide'],
                mechanism: [
                    'Polyleucine catalyst',
                    'Asymmetric epoxidation',
                    'Triphase system',
                    'High enantioselectivity'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene-water',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_390',
                name: 'Enders SAMP/RAMP Hydrazone',
                reactants: ['Carbonyl', 'SAMP hydrazine'],
                reagents: [],
                products: ['Hydrazone'],
                mechanism: [
                    'Chiral auxiliary',
                    'Asymmetric synthesis',
                    'Alkylation possible',
                    'High diastereoselectivity'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_391',
                name: 'Burk Hydroamination',
                reactants: ['Alkene', 'Amine'],
                reagents: ['Zirconium catalyst'],
                products: ['Amine'],
                mechanism: [
                    'Zirconium complex',
                    'Asymmetric hydroamination',
                    'C-N bond formation',
                    'Enantioselective'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_392',
                name: 'Fu Amination',
                reactants: ['Aryl halide', 'Amine'],
                reagents: ['Palladium catalyst', 'P(tBu)3'],
                products: ['Aryl amine'],
                mechanism: [
                    'Palladium catalysis',
                    'Bulky phosphine ligand',
                    'Amination reaction',
                    'Sterically hindered substrates'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_393',
                name: 'Hartwig Amination',
                reactants: ['Aryl halide', 'Amine'],
                reagents: ['Palladium catalyst', 'Bulky phosphine'],
                products: ['Aryl amine'],
                mechanism: [
                    'Oxidative addition',
                    'Amine coordination',
                    'Reductive elimination',
                    'C-N bond formation'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_394',
                name: 'Trost Allylation',
                reactants: ['Nucleophile', 'Allyl carbonate'],
                reagents: ['Palladium catalyst'],
                products: ['Allylated product'],
                mechanism: [
                    'Palladium pi-allyl complex',
                    'Nucleophilic attack',
                    'Asymmetric catalysis',
                    'High regioselectivity'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Allylation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_395',
                name: 'Tsuji-Trost Reaction',
                reactants: ['Nucleophile', 'Allyl substrate'],
                reagents: ['Palladium catalyst'],
                products: ['Allylated product'],
                mechanism: [
                    'Palladium catalysis',
                    'Allyl leaving group',
                    'Nucleophilic substitution',
                    'Allylic alkylation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Allylation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_396',
                name: 'Beletskaya Amination',
                reactants: ['Aryl halide', 'Amine'],
                reagents: ['Copper catalyst'],
                products: ['Aryl amine'],
                mechanism: [
                    'Copper catalysis',
                    'Ullmann-type reaction',
                    'C-N bond formation',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_397',
                name: 'Mizoroki-Heck Reaction',
                reactants: ['Aryl halide', 'Alkene'],
                reagents: ['Palladium catalyst', 'Base'],
                products: ['Styryl arene'],
                mechanism: [
                    'Oxidative addition',
                    'Alkene insertion',
                    'Beta-hydride elimination',
                    'Alkene arylation'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_398',
                name: 'Eglinton Coupling',
                reactants: ['Terminal alkyne', 'Terminal alkyne'],
                reagents: ['Cu(OAc)2', 'Pyridine'],
                products: ['Diynes'],
                mechanism: [
                    'Copper(II) oxidation',
                    'Glaser-type coupling',
                    'Diyne formation',
                    'Stoichiometric copper'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Alkyne Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_399',
                name: 'Hay Coupling',
                reactants: ['Terminal alkyne', 'Terminal alkyne'],
                reagents: ['CuCl', 'TMEDA', 'O2'],
                products: ['Diynes'],
                mechanism: [
                    'Copper(I) catalysis',
                    'Molecular oxygen',
                    'Catalytic coupling',
                    'Diyne formation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Alkyne Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_400',
                name: 'Cadiot-Chodkiewicz Coupling',
                reactants: ['Terminal alkyne', '1-Bromoalkyne'],
                reagents: ['CuCl', 'Hydroxylamine'],
                products: ['Unsymmetrical diyne'],
                mechanism: [
                    'Copper catalysis',
                    'Mixed coupling',
                    'Bromoalkyne activation',
                    'Unsymmetrical diyne'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol-water',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Alkyne Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_401',
                name: 'Stephens-Castro Coupling',
                reactants: ['Aryl iodide', 'Terminal alkyne'],
                reagents: ['CuI', 'Base'],
                products: ['Aryl alkyne'],
                mechanism: [
                    'Copper catalysis',
                    'Aryl iodide activation',
                    'Alkyne coupling',
                    'Castro modification'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Alkyne Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_402',
                name: 'Fukuyama Coupling',
                reactants: ['Aryl halide', 'Thioester'],
                reagents: ['Palladium catalyst'],
                products: ['Ketone'],
                mechanism: [
                    'Thioester activation',
                    'Palladium catalysis',
                    'Ketone formation',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_403',
                name: 'Liebeskind-Srogl Coupling',
                reactants: ['Aryl thioether', 'Organoborane'],
                reagents: ['Palladium catalyst', 'Copper thiophene carboxylate'],
                products: ['Biaryl'],
                mechanism: [
                    'Thioether activation',
                    'Palladium catalysis',
                    'Copper additive',
                    'Suzuki-type coupling'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_404',
                name: 'Deng Coupling',
                reactants: ['Aryl halide', 'Alkene'],
                reagents: ['Palladium catalyst', 'Base'],
                products: ['Alkene arylation'],
                mechanism: [
                    'Palladium catalysis',
                    'Heck-type reaction',
                    'Internal alkenes',
                    'Stereoselective'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_405',
                name: 'Buchwald-Hartwig Coupling',
                reactants: ['Aryl halide', 'Amine'],
                reagents: ['Palladium catalyst', 'Ligand'],
                products: ['Aryl amine'],
                mechanism: [
                    'Palladium oxidative addition',
                    'Amine coordination',
                    'Reductive elimination',
                    'C-N bond formation'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_406',
                name: 'Chan-Lam Coupling',
                reactants: ['Aryl boronic acid', 'Amine'],
                reagents: ['Copper catalyst', 'Air'],
                products: ['Aryl amine'],
                mechanism: [
                    'Copper catalysis',
                    'Boronic acid activation',
                    'C-N bond formation',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_407',
                name: 'Ullmann Biaryl Synthesis',
                reactants: ['Aryl halide', 'Aryl halide'],
                reagents: ['Copper'],
                products: ['Biaryl'],
                mechanism: [
                    'Copper mediation',
                    'Aryl radical formation',
                    'Coupling reaction',
                    'Harsh conditions'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '50',
                    atomEconomy: '85',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_408',
                name: 'Glycolysis',
                reactants: ['Glucose', 'ATP', 'NAD+'],
                reagents: ['Hexokinase', 'Phosphofructokinase', 'Pyruvate kinase'],
                products: ['Pyruvate', 'ATP', 'NADH'],
                mechanism: [
                    'Phosphorylation of glucose to glucose-6-phosphate',
                    'Isomerization to fructose-6-phosphate',
                    'Second phosphorylation to fructose-1,6-bisphosphate',
                    'Cleavage to DHAP and G3P',
                    'Oxidation and phosphorylation steps',
                    'Final substrate-level phosphorylation'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cytosol',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metabolic Pathways',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_409',
                name: 'Citric Acid Cycle',
                reactants: ['Acetyl-CoA', 'Oxaloacetate', 'NAD+', 'FAD'],
                reagents: ['Citrate synthase', 'Isocitrate dehydrogenase', 'Alpha-ketoglutarate dehydrogenase'],
                products: ['CO2', 'ATP', 'NADH', 'FADH2'],
                mechanism: [
                    'Condensation of acetyl-CoA with oxaloacetate',
                    'Isomerization and dehydration',
                    'Decarboxylation and oxidation steps',
                    'Substrate-level phosphorylation',
                    'Regeneration of oxaloacetate'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Mitochondrial matrix',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metabolic Pathways',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_410',
                name: 'Oxidative Phosphorylation',
                reactants: ['NADH', 'FADH2', 'ADP', 'O2'],
                reagents: ['Complex I-IV', 'ATP synthase'],
                products: ['ATP', 'H2O', 'NAD+', 'FAD'],
                mechanism: [
                    'Electron transfer through complexes',
                    'Proton pumping across membrane',
                    'Proton gradient formation',
                    'ATP synthesis via chemiosmosis',
                    'Water formation from oxygen'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Mitochondrial membrane',
                    time: 'Continuous',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: 'Variable',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Energy Metabolism',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_411',
                name: 'Pentose Phosphate Pathway',
                reactants: ['Glucose-6-phosphate', 'NADP+'],
                reagents: ['Glucose-6-phosphate dehydrogenase', 'Transketolase'],
                products: ['Ribose-5-phosphate', 'NADPH', 'CO2'],
                mechanism: [
                    'Oxidative phase: G6P to ribulose-5-P',
                    'Non-oxidative phase: interconversions',
                    'NADPH production for biosynthesis',
                    'Pentose production for nucleotides'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cytosol',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Metabolic Pathways',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_412',
                name: 'Gluconeogenesis',
                reactants: ['Pyruvate', 'ATP', 'GTP', 'NADH'],
                reagents: ['Pyruvate carboxylase', 'Phosphoenolpyruvate carboxykinase'],
                products: ['Glucose', 'ADP', 'GDP', 'NAD+'],
                mechanism: [
                    'Pyruvate to oxaloacetate',
                    'Phosphoenolpyruvate formation',
                    'Reverse glycolysis steps',
                    'Glucose-6-phosphate to glucose',
                    'Bypassing irreversible glycolysis steps'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cytosol/mitochondria',
                    time: 'Variable',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Metabolic Pathways',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_413',
                name: 'β-Oxidation of Fatty Acids',
                reactants: ['Fatty acyl-CoA', 'FAD', 'NAD+', 'CoA'],
                reagents: ['Acyl-CoA dehydrogenase', 'Enoyl-CoA hydratase'],
                products: ['Acetyl-CoA', 'FADH2', 'NADH'],
                mechanism: [
                    'Dehydrogenation to trans-enoyl-CoA',
                    'Hydration to 3-hydroxyacyl-CoA',
                    'Second dehydrogenation',
                    'Thiolysis to acetyl-CoA',
                    'Repeat cycle for chain shortening'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Mitochondrial matrix',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Lipid Metabolism',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_414',
                name: 'Fatty Acid Synthesis',
                reactants: ['Acetyl-CoA', 'NADPH', 'ATP'],
                reagents: ['Acetyl-CoA carboxylase', 'Fatty acid synthase'],
                products: ['Fatty acid', 'CoA', 'NADP+', 'ADP'],
                mechanism: [
                    'Carboxylation of acetyl-CoA',
                    'Condensation with malonyl-CoA',
                    'Reduction and dehydration cycles',
                    'Elongation to full chain',
                    'Termination and release'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cytosol',
                    time: 'Variable',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Lipid Metabolism',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_415',
                name: 'Peptide Bond Formation',
                reactants: ['Amino acid', 'Amino acid', 'ATP'],
                reagents: ['Ribosome', 'tRNA', 'Aminoacyl-tRNA synthetase'],
                products: ['Dipeptide', 'AMP', 'PPi'],
                mechanism: [
                    'Amino acid activation to aminoacyl-AMP',
                    'Transfer to tRNA',
                    'Peptidyl transferase catalysis',
                    'Nucleophilic attack on carbonyl',
                    'Peptide bond formation'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ribosomal environment',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Protein Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_416',
                name: 'Proteolysis',
                reactants: ['Protein'],
                reagents: ['Protease enzymes'],
                products: ['Amino acids'],
                mechanism: [
                    'Enzyme-substrate complex formation',
                    'Nucleophilic attack on peptide bond',
                    'Tetrahedral intermediate',
                    'Bond cleavage and product release',
                    'Hydrolysis of peptide bonds'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Aqueous',
                    time: 'Variable',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Protein Degradation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_417',
                name: 'Transamination',
                reactants: ['Amino acid', 'Alpha-keto acid'],
                reagents: ['Transaminase', 'PLP'],
                products: ['New amino acid', 'New alpha-keto acid'],
                mechanism: [
                    'PLP forms Schiff base with amino acid',
                    'Proton abstraction',
                    'Electron rearrangement',
                    'New Schiff base formation',
                    'Hydrolysis to products'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cytosol',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Amino Acid Metabolism',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_418',
                name: 'Deamination',
                reactants: ['Amino acid', 'NAD+', 'H2O'],
                reagents: ['Deaminase enzymes'],
                products: ['Alpha-keto acid', 'NH3', 'NADH'],
                mechanism: [
                    'PLP-dependent or oxidative',
                    'Removal of amino group',
                    'Formation of imine intermediate',
                    'Hydrolysis to keto acid and ammonia',
                    'Redox cofactor reduction'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Mitochondria',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Amino Acid Metabolism',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_419',
                name: 'Allosteric Regulation',
                reactants: ['Enzyme', 'Effector molecule'],
                reagents: [],
                products: ['Enzyme-effector complex'],
                mechanism: [
                    'Effector binding to allosteric site',
                    'Conformational change',
                    'Active site modification',
                    'Activity modulation',
                    'Feedback inhibition or activation'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cellular environment',
                    time: 'Instantaneous',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Enzyme Regulation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_420',
                name: 'DNA Replication',
                reactants: ['DNA template', 'dNTPs', 'Primers'],
                reagents: ['DNA polymerase', 'Helicase', 'Primase'],
                products: ['DNA duplex'],
                mechanism: [
                    'Helicase unwinds DNA',
                    'Primase synthesizes RNA primer',
                    'DNA polymerase extends primer',
                    'Leading and lagging strand synthesis',
                    'Ligase joins fragments'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Nucleus',
                    time: 'Variable',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'DNA Metabolism',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_421',
                name: 'Transcription',
                reactants: ['DNA template', 'NTPs'],
                reagents: ['RNA polymerase', 'Transcription factors'],
                products: ['mRNA', 'PPi'],
                mechanism: [
                    'RNA polymerase binding to promoter',
                    'Initiation complex formation',
                    'Elongation along template',
                    'Termination and release',
                    'RNA processing'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Nucleus',
                    time: 'Variable',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Gene Expression',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_422',
                name: 'Translation',
                reactants: ['mRNA', 'Aminoacyl-tRNAs', 'Ribosome'],
                reagents: ['Initiation factors', 'Elongation factors'],
                products: ['Protein', 'tRNAs'],
                mechanism: [
                    'Initiation complex formation',
                    'Codon-anticodon recognition',
                    'Peptide bond formation',
                    'Translocation and elongation',
                    'Termination and release'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cytosol',
                    time: 'Variable',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Protein Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_423',
                name: 'DNA Repair Reactions',
                reactants: ['Damaged DNA', 'Repair enzymes'],
                reagents: ['ATP', 'NAD+'],
                products: ['Repaired DNA'],
                mechanism: [
                    'Damage recognition',
                    'Excision of damaged base',
                    'Gap filling by polymerase',
                    'Ligation of strands',
                    'Various repair pathways'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Nucleus',
                    time: 'Variable',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'DNA Metabolism',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_424',
                name: 'Genetic Recombination',
                reactants: ['DNA strands'],
                reagents: ['Recombinase enzymes'],
                products: ['Recombinant DNA'],
                mechanism: [
                    'Strand exchange',
                    'Holliday junction formation',
                    'Branch migration',
                    'Resolution of junctions',
                    'Genetic material exchange'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Nucleus',
                    time: 'Variable',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Genetic Processes',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_425',
                name: 'Photosynthesis Light Reactions',
                reactants: ['H2O', 'Light energy'],
                reagents: ['Photosystems', 'Electron carriers'],
                products: ['O2', 'ATP', 'NADPH'],
                mechanism: [
                    'Light absorption by chlorophyll',
                    'Electron excitation and transfer',
                    'Water oxidation to oxygen',
                    'Proton gradient formation',
                    'ATP and NADPH synthesis'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Thylakoid membrane',
                    time: 'Continuous',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Photosynthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_426',
                name: 'Calvin Cycle',
                reactants: ['CO2', 'ATP', 'NADPH'],
                reagents: ['Rubisco', 'Other enzymes'],
                products: ['Glucose', 'ADP', 'NADP+'],
                mechanism: [
                    'CO2 fixation by Rubisco',
                    'Reduction phase',
                    'Regeneration of RuBP',
                    'Sugar production',
                    'Carbon assimilation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Chloroplast stroma',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Photosynthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_427',
                name: 'Urea Cycle',
                reactants: ['NH4+', 'HCO3-', 'Aspartate', 'ATP'],
                reagents: ['Enzymes of urea cycle'],
                products: ['Urea', 'Fumarate', 'ADP', 'AMP'],
                mechanism: [
                    'Ammonia and bicarbonate activation',
                    'Carbamoyl phosphate formation',
                    'Citrulline synthesis',
                    'Argininosuccinate formation',
                    'Urea release and regeneration'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Liver mitochondria/cytosol',
                    time: 'Variable',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '85',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Nitrogen Metabolism',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_428',
                name: 'Cholesterol Biosynthesis',
                reactants: ['Acetyl-CoA', 'NADPH'],
                reagents: ['HMG-CoA reductase', 'Squalene synthase'],
                products: ['Cholesterol'],
                mechanism: [
                    'Mevalonate pathway',
                    'Isoprenoid units formation',
                    'Squalene cyclization',
                    'Lanosterol to cholesterol',
                    'Steroid ring system'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Endoplasmic reticulum',
                    time: 'Variable',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Steroid Biosynthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_429',
                name: 'Glycogenesis',
                reactants: ['Glucose-1-phosphate', 'UTP', 'Glycogen primer'],
                reagents: ['Glycogen synthase', 'Branching enzyme'],
                products: ['Glycogen', 'UDP', 'Pi'],
                mechanism: [
                    'Glucose activation to UDP-glucose',
                    'Transfer to glycogen chain',
                    'Alpha-1,4 linkages',
                    'Branching for structure',
                    'Storage polysaccharide'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cytosol',
                    time: 'Variable',
                    timeUnit: 'minutes'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Carbohydrate Metabolism',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_430',
                name: 'Glycogenolysis',
                reactants: ['Glycogen', 'Pi'],
                reagents: ['Glycogen phosphorylase', 'Debranching enzyme'],
                products: ['Glucose-1-phosphate', 'Glucose'],
                mechanism: [
                    'Phosphorolysis of alpha-1,4 bonds',
                    'Glucose-1-phosphate release',
                    'Debranching for alpha-1,6 bonds',
                    'Glucose production',
                    'Energy mobilization'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cytosol',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Carbohydrate Metabolism',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_431',
                name: 'Phosphorylation/Dephosphorylation',
                reactants: ['Protein-OH', 'ATP'],
                reagents: ['Kinase', 'Phosphatase'],
                products: ['Protein-OPO3^2-', 'ADP'],
                mechanism: [
                    'ATP binding to kinase',
                    'Nucleophilic attack by protein',
                    'Phosphoryl transfer',
                    'Signal transduction',
                    'Reversible by phosphatase'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cellular environment',
                    time: 'Variable',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cell Signaling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_432',
                name: 'Second Messenger Reactions',
                reactants: ['ATP', 'GTP', 'Ca2+ channels'],
                reagents: ['Adenylyl cyclase', 'Phospholipase C'],
                products: ['cAMP', 'IP3', 'DAG', 'Ca2+'],
                mechanism: [
                    'Receptor activation',
                    'G-protein signaling',
                    'Enzyme activation',
                    'Second messenger production',
                    'Signal amplification cascade'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Cytoplasm/membrane',
                    time: 'Rapid',
                    timeUnit: 'milliseconds'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cell Signaling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_433',
                name: 'Polyethylene Synthesis',
                reactants: ['Ethylene'],
                reagents: ['Ziegler-Natta catalyst'],
                products: ['Polyethylene'],
                mechanism: [
                    'Ethylene coordination to metal center',
                    'Insertion into metal-carbon bond',
                    'Chain propagation',
                    'Beta-hydride elimination termination',
                    'High molecular weight polymer'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '10',
                    pressureUnit: 'atm',
                    solvent: 'Hexane',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_434',
                name: 'Polypropylene Synthesis',
                reactants: ['Propylene'],
                reagents: ['Ziegler-Natta catalyst'],
                products: ['Polypropylene'],
                mechanism: [
                    'Propylene coordination',
                    'Stereoselective insertion',
                    'Isotactic or syndiotactic control',
                    'Chain growth',
                    'Termination by transfer'
                ],
                conditions: {
                    temperature: '70',
                    temperatureUnit: '°C',
                    pressure: '5',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_435',
                name: 'Polystyrene Synthesis',
                reactants: ['Styrene'],
                reagents: ['AIBN'],
                products: ['Polystyrene'],
                mechanism: [
                    'Initiator decomposition',
                    'Radical formation',
                    'Monomer addition',
                    'Chain propagation',
                    'Termination by combination'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_436',
                name: 'PVC Synthesis',
                reactants: ['Vinyl chloride'],
                reagents: ['Peroxide initiator'],
                products: ['Polyvinyl chloride'],
                mechanism: [
                    'Radical initiation',
                    'Vinyl chloride addition',
                    'Head-to-tail propagation',
                    'Syndiotactic preference',
                    'Termination reactions'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water (suspension)',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_437',
                name: 'Polyacrylonitrile Synthesis',
                reactants: ['Acrylonitrile'],
                reagents: ['AIBN'],
                products: ['Polyacrylonitrile'],
                mechanism: [
                    'Radical polymerization',
                    'Nitrile group influence',
                    'Chain propagation',
                    'High Tg polymer',
                    'Fiber applications'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_438',
                name: 'Polymethyl Methacrylate Synthesis',
                reactants: ['Methyl methacrylate'],
                reagents: ['BPO'],
                products: ['PMMA'],
                mechanism: [
                    'Radical initiation',
                    'Methacrylate polymerization',
                    'Steric hindrance effects',
                    'Transparent polymer',
                    'Termination'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Bulk',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_439',
                name: 'Nylon 6,6 Synthesis',
                reactants: ['Hexamethylenediamine', 'Adipic acid'],
                reagents: [],
                products: ['Nylon 6,6'],
                mechanism: [
                    'Salt formation',
                    'Heating to melt',
                    'Condensation polymerization',
                    'Water elimination',
                    'High molecular weight'
                ],
                conditions: {
                    temperature: '280',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_440',
                name: 'PET Synthesis',
                reactants: ['Ethylene glycol', 'Terephthalic acid'],
                reagents: ['Antimony catalyst'],
                products: ['Polyethylene terephthalate'],
                mechanism: [
                    'Transesterification',
                    'Ester interchange',
                    'Polycondensation',
                    'High temperature process',
                    'Fiber and bottle polymer'
                ],
                conditions: {
                    temperature: '280',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_441',
                name: 'Polycarbonate Synthesis',
                reactants: ['Bisphenol A', 'Phosgene'],
                reagents: ['Base'],
                products: ['Polycarbonate'],
                mechanism: [
                    'Interfacial polymerization',
                    'Phosgene reaction',
                    'Carbonate linkage',
                    'High impact polymer',
                    'Optical clarity'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Dichloromethane/water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_442',
                name: 'Polyurethane Synthesis',
                reactants: ['Diisocyanate', 'Diol'],
                reagents: ['Catalyst'],
                products: ['Polyurethane'],
                mechanism: [
                    'Urea formation',
                    'Chain extension',
                    'Urethane linkages',
                    'Flexible to rigid foams',
                    'Addition polymerization'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_443',
                name: 'Epoxy Resin Synthesis',
                reactants: ['Bisphenol A diglycidyl ether', 'Amine hardener'],
                reagents: [],
                products: ['Cured epoxy'],
                mechanism: [
                    'Epoxide ring opening',
                    'Amine addition',
                    'Cross-linking',
                    'Thermoset formation',
                    'Curing process'
                ],
                conditions: {
                    temperature: '120',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_444',
                name: 'Silicone Polymer Synthesis',
                reactants: ['Dimethyldichlorosilane', 'Water'],
                reagents: ['Base'],
                products: ['Polydimethylsiloxane'],
                mechanism: [
                    'Hydrolysis to silanol',
                    'Condensation polymerization',
                    'Siloxane linkages',
                    'High thermal stability',
                    'Flexible polymer'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_445',
                name: 'Polyethylene Glycol Synthesis',
                reactants: ['Ethylene oxide', 'Water'],
                reagents: ['Base'],
                products: ['PEG'],
                mechanism: [
                    'Ring-opening polymerization',
                    'Hydroxide initiation',
                    'Chain growth',
                    'Termination by water',
                    'Water-soluble polymer'
                ],
                conditions: {
                    temperature: '120',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_446',
                name: 'Polylactic Acid Synthesis',
                reactants: ['Lactide'],
                reagents: ['SnOct2'],
                products: ['PLA'],
                mechanism: [
                    'Ring-opening polymerization',
                    'Tin catalyst',
                    'Ester linkages',
                    'Biodegradable polymer',
                    'Stereocontrol'
                ],
                conditions: {
                    temperature: '130',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_447',
                name: 'Polybutadiene Synthesis',
                reactants: ['Butadiene'],
                reagents: ['n-BuLi'],
                products: ['Polybutadiene'],
                mechanism: [
                    'Anionic polymerization',
                    '1,4-addition preferred',
                    'Living polymerization',
                    'High cis content',
                    'Elastomer'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Hexane',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_448',
                name: 'Polyisoprene Synthesis',
                reactants: ['Isoprene'],
                reagents: ['Ziegler-Natta catalyst'],
                products: ['Polyisoprene'],
                mechanism: [
                    'Coordination polymerization',
                    '1,4-polymerization',
                    'Natural rubber mimic',
                    'Stereoregular polymer',
                    'Elastomeric properties'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_449',
                name: 'Polytetrafluoroethylene Synthesis',
                reactants: ['Tetrafluoroethylene'],
                reagents: ['Peroxide'],
                products: ['PTFE'],
                mechanism: [
                    'Radical polymerization',
                    'High pressure process',
                    'Chain transfer',
                    'High melting polymer',
                    'Non-stick properties'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '20',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_450',
                name: 'Polyacrylamide Synthesis',
                reactants: ['Acrylamide'],
                reagents: ['AIBN'],
                products: ['Polyacrylamide'],
                mechanism: [
                    'Free radical polymerization',
                    'Water-soluble polymer',
                    'High molecular weight',
                    'Gel formation',
                    'Industrial applications'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_451',
                name: 'Styrene-Butadiene Copolymer Synthesis',
                reactants: ['Styrene', 'Butadiene'],
                reagents: ['AIBN'],
                products: ['SBR'],
                mechanism: [
                    'Free radical copolymerization',
                    'Random copolymer',
                    'Elastomeric properties',
                    'Tire applications',
                    'Alternating tendencies'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Emulsion',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_452',
                name: 'Block Copolymer Synthesis',
                reactants: ['Styrene', 'Methyl methacrylate'],
                reagents: ['Living polymerization initiator'],
                products: ['PS-b-PMMA'],
                mechanism: [
                    'Sequential monomer addition',
                    'Living polymerization',
                    'Block formation',
                    'Phase separation',
                    'Self-assembly'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_453',
                name: 'Graft Polymer Synthesis',
                reactants: ['Polyethylene backbone', 'Styrene'],
                reagents: ['Peroxide'],
                products: ['Graft copolymer'],
                mechanism: [
                    'Backbone radical formation',
                    'Monomer grafting',
                    'Branch formation',
                    'Surface modification',
                    'Compatibilization'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_454',
                name: 'Dendrimer Synthesis',
                reactants: ['Core molecule', 'Branching monomers'],
                reagents: ['Coupling agents'],
                products: ['Dendrimer'],
                mechanism: [
                    'Divergent growth',
                    'Layer-by-layer synthesis',
                    'Perfect branching',
                    'Nanoscale architecture',
                    'Controlled molecular weight'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: 'Variable',
                    timeUnit: 'days'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_455',
                name: 'Hyperbranched Polymer Synthesis',
                reactants: ['AB2 monomer'],
                reagents: ['Catalyst'],
                products: ['Hyperbranched polymer'],
                mechanism: [
                    'One-pot synthesis',
                    'Statistical branching',
                    'High functionality',
                    'Defect structures',
                    'Easy synthesis'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_456',
                name: 'Supramolecular Polymer Synthesis',
                reactants: ['Monomeric units'],
                reagents: ['Non-covalent interactions'],
                products: ['Supramolecular polymer'],
                mechanism: [
                    'Hydrogen bonding',
                    'Host-guest complexes',
                    'Self-assembly',
                    'Reversible polymerization',
                    'Dynamic systems'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Organic solvent',
                    time: 'Instantaneous',
                    timeUnit: 'seconds'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_457',
                name: 'Enzymatic Polymerization',
                reactants: ['Sugar nucleotides', 'Primer'],
                reagents: ['Glycosyltransferase'],
                products: ['Polysaccharides'],
                mechanism: [
                    'Enzyme catalysis',
                    'Regioselective coupling',
                    'Stereocontrol',
                    'Natural product synthesis',
                    'High specificity'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Aqueous buffer',
                    time: 'Variable',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '90',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Polymer Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_458',
                name: 'Friedel-Crafts Alkylation',
                reactants: ['Aromatic compound', 'Alkyl halide'],
                reagents: ['AlCl3'],
                products: ['Alkylarene', 'HCl'],
                mechanism: [
                    'Lewis acid complexation',
                    'Carbocation formation',
                    'Electrophilic aromatic substitution',
                    'Rearrangement possible',
                    'Regioselectivity control'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_459',
                name: 'Friedel-Crafts Acylation',
                reactants: ['Aromatic compound', 'Acid chloride'],
                reagents: ['AlCl3'],
                products: ['Ketone', 'HCl'],
                mechanism: [
                    'Acyl cation formation',
                    'Electrophilic attack',
                    'Ortho-para directing',
                    'No polyalkylation',
                    'Synthetic versatility'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_460',
                name: 'Grignard Reaction',
                reactants: ['Alkyl halide', 'Carbonyl compound'],
                reagents: ['Mg', 'Ether'],
                products: ['Alcohol'],
                mechanism: [
                    'Organomagnesium formation',
                    'Nucleophilic addition',
                    'Tetrahedral alkoxide',
                    'Protonation',
                    'Carbon-carbon bond formation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Diethyl ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Organometallic Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_461',
                name: 'Diels-Alder Reaction',
                reactants: ['Diene', 'Dienophile'],
                reagents: [],
                products: ['Cyclohexene'],
                mechanism: [
                    'Concerted cycloaddition',
                    'Suprafacial addition',
                    'Stereospecific reaction',
                    'Aromatic transition state',
                    'Pericyclic reaction'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cycloaddition',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_462',
                name: 'Wittig Reaction',
                reactants: ['Aldehyde', 'Phosphorus ylide'],
                reagents: [],
                products: ['Alkene', 'Triphenylphosphine oxide'],
                mechanism: [
                    'Betaine formation',
                    'Oxaphosphetane intermediate',
                    'Syn elimination',
                    'E/Z selectivity',
                    'Carbonyl olefination'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_463',
                name: 'Aldol Condensation',
                reactants: ['Aldehyde', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alpha,beta-unsaturated carbonyl'],
                mechanism: [
                    'Enolate formation',
                    'Nucleophilic addition',
                    'Dehydration',
                    'Conjugated system',
                    'Thermodynamic product'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '92',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_464',
                name: 'Cannizzaro Reaction',
                reactants: ['Aldehyde', 'Aldehyde'],
                reagents: ['NaOH'],
                products: ['Alcohol', 'Carboxylate'],
                mechanism: [
                    'Hydride transfer',
                    'No alpha-hydrogen required',
                    'Oxidation-reduction',
                    'Disproportionation',
                    'Aromatic aldehydes'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Redox Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_465',
                name: 'Perkin Reaction',
                reactants: ['Aromatic aldehyde', 'Acetic anhydride'],
                reagents: ['Sodium acetate'],
                products: ['Cinnamic acid derivative'],
                mechanism: [
                    'Mixed anhydride formation',
                    'Carbanion addition',
                    'Elimination',
                    'Alpha,beta-unsaturated acid',
                    'Aromatic substitution'
                ],
                conditions: {
                    temperature: '180',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Condensation Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_466',
                name: 'Claisen Condensation',
                reactants: ['Ester', 'Ester'],
                reagents: ['Base'],
                products: ['Beta-keto ester'],
                mechanism: [
                    'Enolate formation',
                    'Acyl substitution',
                    'Tetrahedral intermediate',
                    'Elimination',
                    'Carbon-carbon bond'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '83',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_467',
                name: 'Michael Addition',
                reactants: ['Alpha,beta-unsaturated carbonyl', 'Nucleophile'],
                reagents: [],
                products: ['1,5-Dicarbonyl compound'],
                mechanism: [
                    'Conjugate addition',
                    'Nucleophile attack',
                    'Enolate stabilization',
                    '1,5-Relationship',
                    'Carbon nucleophiles'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Conjugate Addition',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_468',
                name: 'Robinson Annulation',
                reactants: ['Cyclohexanone', 'Methyl vinyl ketone'],
                reagents: ['Base'],
                products: ['Decalone'],
                mechanism: [
                    'Michael addition',
                    'Aldol condensation',
                    'Ring formation',
                    'Bicyclic system',
                    'Steroid synthesis'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Ring Formation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_469',
                name: 'Reformatsky Reaction',
                reactants: ['Alpha-halo ester', 'Aldehyde'],
                reagents: ['Zn'],
                products: ['Beta-hydroxy ester'],
                mechanism: [
                    'Zinc insertion',
                    'Reformatsky reagent',
                    'Nucleophilic addition',
                    'Beta-hydroxy ester',
                    'Carbonyl addition'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Benzene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '87',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organometallic Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_470',
                name: 'Pinacol Rearrangement',
                reactants: ['1,2-Diol'],
                reagents: ['Acid'],
                products: ['Carbonyl compound'],
                mechanism: [
                    'Carbocation formation',
                    '1,2-Methyl shift',
                    'Ring expansion possible',
                    'Carbonyl formation',
                    'Rearrangement reaction'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '92',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_471',
                name: 'Beckmann Rearrangement',
                reactants: ['Oxime'],
                reagents: ['Acid'],
                products: ['Amide'],
                mechanism: [
                    'Protonation of OH',
                    'Migration of group',
                    'Loss of water',
                    'Amide formation',
                    'Lactam synthesis'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_472',
                name: 'Hofmann Rearrangement',
                reactants: ['Amide'],
                reagents: ['Br2', 'NaOH'],
                products: ['Amine'],
                mechanism: [
                    'N-Bromoamide formation',
                    'Rearrangement',
                    'Isocyanate intermediate',
                    'Amine formation',
                    'Chain shortening'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '68',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_473',
                name: 'Curtius Rearrangement',
                reactants: ['Acyl azide'],
                reagents: ['Heat'],
                products: ['Isocyanate'],
                mechanism: [
                    'Loss of nitrogen',
                    'Migration of group',
                    'Isocyanate formation',
                    'Amine synthesis',
                    'Rearrangement'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_474',
                name: 'Schmidt Reaction',
                reactants: ['Carboxylic acid', 'Hydrazoic acid'],
                reagents: ['H2SO4'],
                products: ['Amine'],
                mechanism: [
                    'Acyl azide formation',
                    'Rearrangement',
                    'Loss of nitrogen',
                    'Amine formation',
                    'Ring expansion'
                ],
                conditions: {
                    temperature: '60',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Chloroform',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '58',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_475',
                name: 'Lossen Rearrangement',
                reactants: ['Hydroxamic acid'],
                reagents: ['Base'],
                products: ['Isocyanate'],
                mechanism: [
                    'O-Acylation',
                    'Rearrangement',
                    'Isocyanate formation',
                    'Amine synthesis',
                    'Hydrolysis'
                ],
                conditions: {
                    temperature: '50',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_476',
                name: 'Baeyer-Villiger Oxidation',
                reactants: ['Ketone'],
                reagents: ['Peracid'],
                products: ['Ester'],
                mechanism: [
                    'Nucleophilic addition',
                    'Migration of group',
                    'Loss of carboxylic acid',
                    'Ester formation',
                    'Regioselectivity'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Oxidation Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_477',
                name: 'Sharpless Asymmetric Epoxidation',
                reactants: ['Allyl alcohol'],
                reagents: ['Ti(OiPr)4', 'TBHP', 'Tartrate'],
                products: ['Epoxy alcohol'],
                mechanism: [
                    'Titanium-tartrate complex',
                    'Hydroperoxide activation',
                    'Asymmetric oxygen transfer',
                    'High enantioselectivity',
                    'Kinetic resolution'
                ],
                conditions: {
                    temperature: '-20',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_478',
                name: 'Heck Reaction',
                reactants: ['Aryl halide', 'Alkene'],
                reagents: ['Pd catalyst', 'Base'],
                products: ['Styryl arene'],
                mechanism: [
                    'Oxidative addition',
                    'Alkene coordination',
                    'Migratory insertion',
                    'Beta-hydride elimination',
                    'Reductive elimination'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_479',
                name: 'Suzuki Coupling',
                reactants: ['Aryl halide', 'Aryl boronic acid'],
                reagents: ['Pd catalyst', 'Base'],
                products: ['Biaryl'],
                mechanism: [
                    'Oxidative addition',
                    'Transmetalation',
                    'Reductive elimination',
                    'Carbon-carbon bond',
                    'Tetravalent boron'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '85',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_480',
                name: 'Stille Coupling',
                reactants: ['Aryl halide', 'Aryl stannane'],
                reagents: ['Pd catalyst'],
                products: ['Biaryl'],
                mechanism: [
                    'Oxidative addition',
                    'Transmetalation',
                    'Reductive elimination',
                    'Organotin reagent',
                    'Toxic byproducts'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_481',
                name: 'Sonogashira Coupling',
                reactants: ['Aryl halide', 'Terminal alkyne'],
                reagents: ['Pd catalyst', 'CuI', 'Base'],
                products: ['Aryl alkyne'],
                mechanism: [
                    'Oxidative addition',
                    'Copper acetylide formation',
                    'Transmetalation',
                    'Reductive elimination',
                    'Alkyne coupling'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_482',
                name: 'Buchwald-Hartwig Amination',
                reactants: ['Aryl halide', 'Amine'],
                reagents: ['Pd catalyst', 'Ligand', 'Base'],
                products: ['Aryl amine'],
                mechanism: [
                    'Oxidative addition',
                    'Amine coordination',
                    'Deprotonation',
                    'Reductive elimination',
                    'C-N bond formation'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cross-Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_483',
                name: 'Click Chemistry - CuAAC',
                reactants: ['Azide', 'Terminal alkyne'],
                reagents: ['Cu(I) catalyst'],
                products: ['1,2,3-Triazole'],
                mechanism: [
                    'Copper acetylide formation',
                    'Azide coordination',
                    'Cycloaddition',
                    'Regioselective 1,4-product',
                    'High yield reaction'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Click Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_484',
                name: 'Gabriel Synthesis',
                reactants: ['Alkyl halide', 'Phthalimide'],
                reagents: ['Base'],
                products: ['Primary amine'],
                mechanism: [
                    'Nucleophilic substitution',
                    'Phthaloyl protection',
                    'Hydrazinolysis',
                    'Amine deprotection',
                    'No over-alkylation'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '68',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Amine Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_485',
                name: 'Sandmeyer Reaction',
                reactants: ['Diazonium salt'],
                reagents: ['CuCl', 'HCl'],
                products: ['Aryl chloride'],
                mechanism: [
                    'Diazonium decomposition',
                    'Copper(I) chloride complex',
                    'Chlorine radical transfer',
                    'Nitrogen evolution',
                    'Aryl halide formation'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '65',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_486',
                name: 'Gattermann Reaction',
                reactants: ['Diazonium salt'],
                reagents: ['CuCl', 'HCl'],
                products: ['Aryl chloride'],
                mechanism: [
                    'Similar to Sandmeyer',
                    'Copper(I) catalysis',
                    'Chloride introduction',
                    'Milder conditions',
                    'Alternative method'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '60',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_487',
                name: 'Kolbe Electrolysis',
                reactants: ['Carboxylate salt'],
                reagents: ['Electricity'],
                products: ['Alkane', 'CO2'],
                mechanism: [
                    'Anode oxidation',
                    'Carboxylate radical',
                    'Decarboxylation',
                    'Radical coupling',
                    'Alkane formation'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '50',
                    atomEconomy: '45',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Electrolysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_488',
                name: 'Wurtz Reaction',
                reactants: ['Alkyl halide', 'Alkyl halide'],
                reagents: ['Na'],
                products: ['Alkane'],
                mechanism: [
                    'Sodium reduction',
                    'Alkyl radical formation',
                    'Radical coupling',
                    'Symmetrical alkane',
                    'Limited scope'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '67',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Alkane Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_489',
                name: 'Fittig Reaction',
                reactants: ['Aryl halide', 'Aryl halide'],
                reagents: ['Na'],
                products: ['Biaryl'],
                mechanism: [
                    'Aryl radical formation',
                    'Coupling reaction',
                    'Symmetrical biaryl',
                    'Harsh conditions',
                    'Limited substrates'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatic Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_490',
                name: 'Ullmann Reaction',
                reactants: ['Aryl halide', 'Phenoxide'],
                reagents: ['Cu'],
                products: ['Diphenyl ether'],
                mechanism: [
                    'Copper mediation',
                    'Aryl-oxygen bond formation',
                    'High temperature required',
                    'Limited scope',
                    'Copper bronze'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '85',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Aromatic Coupling',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_491',
                name: 'Finkelstein Reaction',
                reactants: ['Alkyl halide', 'NaI'],
                reagents: [],
                products: ['Alkyl iodide', 'NaCl'],
                mechanism: [
                    'Iodide nucleophile',
                    'SN2 displacement',
                    'Solubility effect',
                    'Acetone solvent',
                    'Halide exchange'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetone',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Nucleophilic Substitution',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_492',
                name: 'Swarts Reaction',
                reactants: ['Alkyl chloride', 'AgF'],
                reagents: [],
                products: ['Alkyl fluoride', 'AgCl'],
                mechanism: [
                    'Fluoride exchange',
                    'Silver fluoride reagent',
                    'Dry conditions',
                    'Alkyl fluorides',
                    'Toxic reagents'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Nucleophilic Substitution',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_493',
                name: 'Williamson Ether Synthesis',
                reactants: ['Alkyl halide', 'Alkoxide'],
                reagents: [],
                products: ['Ether', 'Halide salt'],
                mechanism: [
                    'SN2 reaction',
                    'Alkoxide nucleophile',
                    'Ether formation',
                    'Symmetrical ethers',
                    'Base-sensitive'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Ether Synthesis',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_494',
                name: 'Acetylide Formation',
                reactants: ['Terminal alkyne', 'Base'],
                reagents: ['NaNH2 or n-BuLi'],
                products: ['Acetylide anion'],
                mechanism: [
                    'Acid-base reaction',
                    'Terminal hydrogen removal',
                    'Nucleophilic carbon',
                    'Alkylation possible',
                    'Strong base required'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Alkyne Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_495',
                name: 'Corey-Fuchs Reaction',
                reactants: ['Aldehyde', 'CBr4', 'PPh3'],
                reagents: [],
                products: ['Dibromoalkene'],
                mechanism: [
                    'Phosphorus ylide formation',
                    'Addition to aldehyde',
                    'Elimination',
                    'Geminal dibromide',
                    'Alkyne precursor'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_496',
                name: 'Shapiro Reaction',
                reactants: ['Tosylhydrazone', 'Base'],
                reagents: ['Strong base'],
                products: ['Alkene'],
                mechanism: [
                    'Diazene formation',
                    'Nitrogen elimination',
                    'Carbanion intermediate',
                    'Protonation',
                    'Less substituted alkene'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_497',
                name: 'Bamford-Stevens Reaction',
                reactants: ['Tosylhydrazone', 'Base'],
                reagents: ['Collidine'],
                products: ['Alkene'],
                mechanism: [
                    'Carbene or carbanion',
                    'Depending on conditions',
                    'Alkene formation',
                    'Mixture possible',
                    'Thermal reaction'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Glycol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_498',
                name: 'McMurry Coupling',
                reactants: ['Aldehyde', 'Aldehyde'],
                reagents: ['TiCl3', 'Zn(Cu)'],
                products: ['Alkene'],
                mechanism: [
                    'Low-valent titanium',
                    'Pinacol intermediate',
                    'Deoxygenation',
                    'Alkene formation',
                    'Reductive coupling'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carbonyl Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_499',
                name: 'Julia Olefination',
                reactants: ['Sulfone', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Sulfone anion formation',
                    'Addition to aldehyde',
                    'Elimination',
                    'Stereoselective',
                    'E/Z control'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_500',
                name: 'Peterson Olefination',
                reactants: ['Alpha-silyl alcohol', 'Electrophile'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Beta-elimination',
                    'Silicon beta-effect',
                    'Alkene formation',
                    'Stereoselective',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_501',
                name: 'Tebbe Olefination',
                reactants: ['Carbonyl compound'],
                reagents: ['Cp2TiCH2ClAlMe2'],
                products: ['Alkene'],
                mechanism: [
                    'Titanocene methylidene',
                    'Wittig-like reaction',
                    'Methylenation',
                    'Terminal alkenes',
                    'Schrock-type'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_502',
                name: 'Lombardo Olefination',
                reactants: ['Aldehyde', 'CHBr3'],
                reagents: ['CrCl2'],
                products: ['Dibromoalkene'],
                mechanism: [
                    'Chromium(II) reagent',
                    'Geminal tribromide',
                    'Dibromoalkene formation',
                    'Corey-Fuchs variant',
                    'Alkyne precursor'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_503',
                name: 'Fukuyama Olefination',
                reactants: ['Thioacetal', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Thioacetal anion',
                    'Addition-elimination',
                    'Stereoselective',
                    'Mild conditions',
                    'Functional group tolerant'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_504',
                name: 'Stork Enamine Reaction',
                reactants: ['Enamine', 'Electrophile'],
                reagents: [],
                products: ['Alkylated carbonyl'],
                mechanism: [
                    'Enamine formation',
                    'Nucleophilic addition',
                    'Hydrolysis',
                    'Regioselective alkylation',
                    'Carbonyl protection'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Enamine Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_505',
                name: 'Mukaiyama Aldol Reaction',
                reactants: ['Silyl enol ether', 'Aldehyde'],
                reagents: ['TiCl4'],
                products: ['Beta-hydroxy carbonyl'],
                mechanism: [
                    'Lewis acid activation',
                    'Mukaiyama reagent',
                    'Carbonyl addition',
                    'Stereocontrol possible',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Aldol Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_506',
                name: 'Evans Aldol Reaction',
                reactants: ['Boron enolate', 'Aldehyde'],
                reagents: ['Chiral auxiliary'],
                products: ['Aldol product'],
                mechanism: [
                    'Chiral boron reagent',
                    'Asymmetric induction',
                    'High diastereoselectivity',
                    'Auxiliary removal',
                    'Stereocontrolled synthesis'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_507',
                name: 'MacMillan Aldol Reaction',
                reactants: ['Enal', 'Aldehyde'],
                reagents: ['Imidazolidinone catalyst'],
                products: ['Beta-hydroxy aldehyde'],
                mechanism: [
                    'Organocatalytic activation',
                    'Enamine catalysis',
                    'Asymmetric aldol',
                    'High enantioselectivity',
                    'Secondary amine catalyst'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_508',
                name: 'Hajos-Parrish Reaction',
                reactants: ['Triketone'],
                reagents: ['Proline'],
                products: ['Wieland-Miescher ketone'],
                mechanism: [
                    'Proline catalysis',
                    'Intramolecular aldol',
                    'Enantioselective',
                    'Robinson annulation',
                    'Bicyclic product'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '48',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_509',
                name: 'Mitsunobu Reaction',
                reactants: ['Alcohol', 'Nucleophile'],
                reagents: ['DEAD', 'PPh3'],
                products: ['Inversion product'],
                mechanism: [
                    'Betaine formation',
                    'Alkoxyphosphonium salt',
                    'Nucleophilic attack',
                    'Stereoinversion',
                    'Redox process'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Nucleophilic Substitution',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_510',
                name: 'Appel Reaction',
                reactants: ['Alcohol', 'CCl4'],
                reagents: ['PPh3'],
                products: ['Alkyl chloride'],
                mechanism: [
                    'Phosphine attacks CCl4',
                    'Chlorophosphonium intermediate',
                    'Alcohol attacks',
                    'Chloride displacement',
                    'Mild chlorination'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Halogenation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_511',
                name: 'Staudinger Reaction',
                reactants: ['Azide', 'Phosphine'],
                reagents: [],
                products: ['Iminophosphorane'],
                mechanism: [
                    'Nucleophilic attack',
                    'Triazaphosphole intermediate',
                    'Nitrogen elimination',
                    'Phosphorus-nitrogen bond',
                    'Azide reduction'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Azide Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_512',
                name: 'Ugi Reaction',
                reactants: ['Aldehyde', 'Amine', 'Carboxylic acid', 'Isocyanide'],
                reagents: [],
                products: ['Alpha-acylamino amide'],
                mechanism: [
                    'Four-component reaction',
                    'Imine formation',
                    'Isocyanide addition',
                    'Mumm rearrangement',
                    'Peptide-like product'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Multicomponent Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_513',
                name: 'Passerini Reaction',
                reactants: ['Aldehyde', 'Carboxylic acid', 'Isocyanide'],
                reagents: [],
                products: ['Alpha-acyloxy amide'],
                mechanism: [
                    'Three-component reaction',
                    'Isocyanide addition',
                    'Carboxylic acid addition',
                    'Alpha-acyloxy amide',
                    'No catalyst needed'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Multicomponent Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_514',
                name: 'Biginelli Reaction',
                reactants: ['Aldehyde', 'Beta-keto ester', 'Urea'],
                reagents: ['Acid'],
                products: ['Dihydropyrimidinone'],
                mechanism: [
                    'Three-component condensation',
                    'Acylimine formation',
                    'Enol addition',
                    'Cyclization',
                    'Dehydration'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Multicomponent Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_515',
                name: 'Paal-Knorr Furan Synthesis',
                reactants: ['1,4-Dicarbonyl compound'],
                reagents: ['Acid'],
                products: ['Furan'],
                mechanism: [
                    'Cyclodehydration',
                    'Enol form cyclization',
                    'Water elimination',
                    'Aromatic furan',
                    'Five-membered heterocycle'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_516',
                name: 'Knorr Pyrazole Synthesis',
                reactants: ['Beta-keto ester', 'Hydrazine'],
                reagents: [],
                products: ['Pyrazole'],
                mechanism: [
                    'Hydrazone formation',
                    'Cyclization',
                    'Dehydration',
                    'Aromatic pyrazole',
                    'Nitrogen heterocycle'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_517',
                name: 'Gewald Thiophene Synthesis',
                reactants: ['Aldehyde', 'Nitrile', 'Sulfur'],
                reagents: ['Morpholine'],
                products: ['Thiophene'],
                mechanism: [
                    'Knoevenagel condensation',
                    'Sulfur nucleophile',
                    'Cyclization',
                    'Thiophene formation',
                    'Three-component reaction'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_518',
                name: 'Hantzsch Dihydropyridine Synthesis',
                reactants: ['Aldehyde', 'Beta-keto ester', 'Ammonia'],
                reagents: [],
                products: ['Dihydropyridine'],
                mechanism: [
                    'Three-component reaction',
                    'Enamine formation',
                    'Michael addition',
                    'Cyclization',
                    'Dihydropyridine'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_519',
                name: 'Feist-Benary Furan Synthesis',
                reactants: ['Beta-dicarbonyl', 'Alpha-halo carbonyl'],
                reagents: ['Base'],
                products: ['Furan'],
                mechanism: [
                    'Knoevenagel condensation',
                    'Cyclization',
                    'Dehydration',
                    'Furan formation',
                    'Base-catalyzed'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_520',
                name: 'Pictet-Spengler Reaction',
                reactants: ['Tryptamine', 'Aldehyde'],
                reagents: ['Acid'],
                products: ['Tetrahydroisoquinoline'],
                mechanism: [
                    'Imine formation',
                    'Electrophilic cyclization',
                    'Carbocation intermediate',
                    'Tetrahydroisoquinoline',
                    'Alkaloid synthesis'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_521',
                name: 'Bischler-Napieralski Reaction',
                reactants: ['Beta-arylethylamide'],
                reagents: ['POCl3'],
                products: ['3,4-Dihydroisoquinoline'],
                mechanism: [
                    'Imine formation',
                    'Electrophilic cyclization',
                    'Dehydrogenation',
                    'Dihydroisoquinoline',
                    'Isoquinoline precursor'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_522',
                name: 'Skraup Quinoline Synthesis',
                reactants: ['Aniline', 'Glycerol', 'Sulfuric acid'],
                reagents: ['FeSO4'],
                products: ['Quinoline'],
                mechanism: [
                    'Glycerol dehydration',
                    'Acrolein formation',
                    'Condensation with aniline',
                    'Cyclization',
                    'Quinoline'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '78',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_523',
                name: 'Pechmann Coumarin Synthesis',
                reactants: ['Phenol', 'Beta-keto ester'],
                reagents: ['H2SO4'],
                products: ['Coumarin'],
                mechanism: [
                    'Ester condensation',
                    'Electrophilic substitution',
                    'Cyclization',
                    'Lactone formation',
                    'Coumarin'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_524',
                name: 'Kostanecki-Robinson Flavone Synthesis',
                reactants: ['2-Hydroxyacetophenone', 'Benzoyl chloride'],
                reagents: ['Base'],
                products: ['Flavone'],
                mechanism: [
                    'O-acylation',
                    'C-acylation',
                    'Cyclization',
                    'Dehydration',
                    'Flavone'
                ],
                conditions: {
                    temperature: '180',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '75',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_525',
                name: 'Allan-Robinson Flavone Synthesis',
                reactants: ['2-Hydroxyacetophenone', 'Benzoic anhydride'],
                reagents: ['Base'],
                products: ['Flavone'],
                mechanism: [
                    'Mixed anhydride',
                    'O-acylation',
                    'C-acylation',
                    'Cyclization',
                    'Flavone'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Pyridine',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_526',
                name: 'Baker-Venkataraman Rearrangement',
                reactants: ['2-Acylphenoxy ketone'],
                reagents: ['Base'],
                products: ['Flavanone'],
                mechanism: [
                    'O-acyl migration',
                    'Intramolecular transesterification',
                    'Cyclization',
                    'Flavanone',
                    'Flavonoid synthesis'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Pyridine',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_527',
                name: 'Doebner Reaction',
                reactants: ['Aldehyde', 'Malonic acid'],
                reagents: ['Pyridine'],
                products: ['Cinnamic acid'],
                mechanism: [
                    'Knoevenagel condensation',
                    'Decarboxylation',
                    'Alpha,beta-unsaturated acid',
                    'Cinnamic acid derivative',
                    'One-pot reaction'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Pyridine',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Condensation Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_528',
                name: 'Pomeranz-Fritsch Isoquinoline Synthesis',
                reactants: ['Benzylamine', 'Formaldehyde', 'Acetaldehyde'],
                reagents: ['Acid'],
                products: ['Isoquinoline'],
                mechanism: [
                    'Bis-aminal formation',
                    'Cyclization',
                    'Dehydrogenation',
                    'Isoquinoline',
                    'Three-component reaction'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '78',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_529',
                name: 'Combes Quinoline Synthesis',
                reactants: ['Aniline', 'Acetylacetone'],
                reagents: ['H2SO4'],
                products: ['Quinoline'],
                mechanism: [
                    'Enamine formation',
                    'Electrophilic cyclization',
                    'Dehydration',
                    'Quinoline',
                    'Two-component reaction'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_530',
                name: 'Fischer Indole Synthesis',
                reactants: ['Phenylhydrazine', 'Ketone'],
                reagents: ['Acid'],
                products: ['Indole'],
                mechanism: [
                    'Hydrazone formation',
                    'Sigmatropic rearrangement',
                    'Electrophilic cyclization',
                    'Indole',
                    'Classic method'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ethanol',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_531',
                name: 'Reissert Indole Synthesis',
                reactants: ['Indole', 'Acid chloride'],
                reagents: ['DMF'],
                products: ['3-Acylindole'],
                mechanism: [
                    'Vilsmeier-Haack complex',
                    'Electrophilic substitution',
                    '3-Position attack',
                    'Acylindole',
                    'Regioselective'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_532',
                name: 'Madelung Indole Synthesis',
                reactants: ['o-Tolylamide'],
                reagents: ['NaOH'],
                products: ['Indole'],
                mechanism: [
                    'Strong base',
                    'Carbanion formation',
                    'Cyclization',
                    'Indole',
                    'Harsh conditions'
                ],
                conditions: {
                    temperature: '300',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '50',
                    atomEconomy: '100',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_533',
                name: 'Bucherer Carbazole Synthesis',
                reactants: ['Naphthylamine', 'Acetone'],
                reagents: ['H2SO4'],
                products: ['Carbazole'],
                mechanism: [
                    'Condensation',
                    'Cyclization',
                    'Dehydrogenation',
                    'Carbazole',
                    'Tricyclic system'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '85',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_534',
                name: 'Graebe-Ullmann Carbazole Synthesis',
                reactants: ['Diphenylamine derivative'],
                reagents: ['Cu'],
                products: ['Carbazole'],
                mechanism: [
                    'Cyclization',
                    'Copper catalysis',
                    'Dehydrogenation',
                    'Carbazole formation',
                    'High temperature'
                ],
                conditions: {
                    temperature: '250',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '55',
                    atomEconomy: '100',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_535',
                name: 'Pschorr Cyclization',
                reactants: ['Diazonium salt'],
                reagents: ['CuCl2'],
                products: ['Phenanthrene'],
                mechanism: [
                    'Radical cyclization',
                    'Copper catalysis',
                    'Phenanthrene formation',
                    'Biaryl synthesis',
                    'Intramolecular'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cyclization',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_536',
                name: 'Niementowski Quinazoline Synthesis',
                reactants: ['Anthranilic acid', 'Formamide'],
                reagents: [],
                products: ['Quinazolinone'],
                mechanism: [
                    'Condensation',
                    'Cyclization',
                    'Quinazolinone formation',
                    'Fused heterocycle',
                    'One-pot reaction'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Formamide',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_537',
                name: 'Traube Purine Synthesis',
                reactants: ['4-Amino-5-imidazolecarboxamide', 'Formic acid'],
                reagents: ['Heat'],
                products: ['Purine'],
                mechanism: [
                    'Condensation',
                    'Cyclization',
                    'Purine formation',
                    'Nucleic acid base',
                    'Biochemical importance'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '60',
                    atomEconomy: '85',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_538',
                name: 'Conrad-Limpach Quinoline Synthesis',
                reactants: ['Acetoacetic ester', 'Aromatic amine'],
                reagents: ['HCl'],
                products: ['Quinoline'],
                mechanism: [
                    'Condensation',
                    'Cyclization',
                    'Quinoline formation',
                    'Beta-keto ester',
                    'Acid-catalyzed'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_539',
                name: 'Piloty-Robinson Indole Synthesis',
                reactants: ['Pyrrole', 'Formaldehyde', 'Nitromethane'],
                reagents: ['NaOH'],
                products: ['Indole'],
                mechanism: [
                    'Condensation',
                    'Cyclization',
                    'Indole formation',
                    'Three-component',
                    'Base-catalyzed'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '55',
                    atomEconomy: '78',
                    energyEfficiency: 'Low'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_540',
                name: 'Bartoli Indole Synthesis',
                reactants: ['Nitroarene', 'Vinyl Grignard'],
                reagents: [],
                products: ['Indole'],
                mechanism: [
                    'Nucleophilic addition',
                    'Cyclization',
                    'Indole formation',
                    'Grignard reagent',
                    'Reductive conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Heterocycle Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_541',
                name: 'Fukuyama Reduction',
                reactants: ['Thioester'],
                reagents: ['Pd catalyst', 'H2'],
                products: ['Aldehyde'],
                mechanism: [
                    'Catalytic hydrogenation',
                    'Selective reduction',
                    'Aldehyde formation',
                    'Thioester cleavage',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Reduction Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_542',
                name: 'Luche Reduction',
                reactants: ['Alpha,beta-unsaturated ketone'],
                reagents: ['NaBH4', 'CeCl3'],
                products: ['Allylic alcohol'],
                mechanism: [
                    'Cerium modification',
                    '1,2-reduction',
                    'Allylic alcohol',
                    'Stereoselective',
                    'Chelation control'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Reduction Reactions',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_543',
                name: 'Denmark Aldol Reaction',
                reactants: ['Silyl enol ether', 'Aldehyde'],
                reagents: ['Chiral phosphoramide'],
                products: ['Aldol product'],
                mechanism: [
                    'Lewis base catalysis',
                    'Silyl transfer',
                    'Asymmetric aldol',
                    'High enantioselectivity',
                    'Organocatalytic'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_544',
                name: 'Aza-Baylis-Hillman Reaction',
                reactants: ['Imines', 'Activated alkenes'],
                reagents: ['DABCO'],
                products: ['Aza-MBH adduct'],
                mechanism: [
                    'Nucleophilic catalysis',
                    'Imine activation',
                    'Morita-Baylis-Hillman',
                    'Nitrogen-containing',
                    'Slow reaction'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMSO',
                    time: '48',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_545',
                name: 'Vinylogous Aldol Reaction',
                reactants: ['Silyloxy diene', 'Aldehyde'],
                reagents: ['Lewis acid'],
                products: ['Delta,epsilon-unsaturated carbonyl'],
                mechanism: [
                    'Extended enolate',
                    'Gamma-position attack',
                    'Conjugated system',
                    'Vinylogous addition',
                    'Lewis acid catalysis'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Carbonyl Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_546',
                name: 'Mukaiyama Michael Addition',
                reactants: ['Silyl enol ether', 'Alpha,beta-unsaturated carbonyl'],
                reagents: ['TiCl4'],
                products: ['1,5-Dicarbonyl'],
                mechanism: [
                    'Lewis acid activation',
                    'Michael addition',
                    'Silyl enol ether',
                    '1,5-Dicarbonyl product',
                    'Carbon-carbon bond'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Michael Addition',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_547',
                name: 'Organocatalytic Michael Addition',
                reactants: ['Nucleophile', 'Michael acceptor'],
                reagents: ['Proline derivative'],
                products: ['Michael adduct'],
                mechanism: [
                    'Enamine catalysis',
                    'Iminium activation',
                    'Asymmetric addition',
                    'Stereocontrol',
                    'Organocatalyst'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_548',
                name: 'Asymmetric Michael Addition',
                reactants: ['Nucleophile', 'Michael acceptor'],
                reagents: ['Chiral catalyst'],
                products: ['Chiral Michael adduct'],
                mechanism: [
                    'Chiral metal complex',
                    'Asymmetric catalysis',
                    'Enantioselective',
                    'Stereocontrol',
                    'High selectivity'
                ],
                conditions: {
                    temperature: '-20',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_549',
                name: 'Vinylcyclopropane Rearrangement',
                reactants: ['Vinylcyclopropane'],
                reagents: ['Heat'],
                products: ['Cyclopentene'],
                mechanism: [
                    'Thermal rearrangement',
                    'Cyclopropane opening',
                    'Sigmatropic shift',
                    'Cyclopentene formation',
                    'Concerted process'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Gas phase',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_550',
                name: 'Oxy-Cope Rearrangement',
                reactants: ['1,5-Dien-3-ol'],
                reagents: ['Heat'],
                products: ['Delta,epsilon-unsaturated carbonyl'],
                mechanism: [
                    'Sigmatropic rearrangement',
                    'Chair transition state',
                    'Oxygen acceleration',
                    'Carbonyl formation',
                    '[3,3]-Sigmatropic'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_551',
                name: 'Aza-Cope Rearrangement',
                reactants: ['1,5-Dien-3-amine'],
                reagents: ['Heat'],
                products: ['Rearranged imine'],
                mechanism: [
                    'Sigmatropic rearrangement',
                    'Nitrogen substituent',
                    'Imine formation',
                    'Aza variant',
                    'Thermal process'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_552',
                name: 'Anionic Oxy-Cope Rearrangement',
                reactants: ['Allylic alkoxide'],
                reagents: ['Base'],
                products: ['Rearranged carbonyl'],
                mechanism: [
                    'Alkoxide acceleration',
                    'Lower temperature',
                    'Anionic variant',
                    'Enhanced rate',
                    'Base-catalyzed'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_553',
                name: 'Zwitterionic Aza-Claisen Rearrangement',
                reactants: ['Allyl imidate'],
                reagents: ['Heat'],
                products: ['Rearranged amide'],
                mechanism: [
                    'Imidate tautomer',
                    'Zwitterionic intermediate',
                    'Sigmatropic shift',
                    'Amide product',
                    'Thermal rearrangement'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_554',
                name: 'Thia-Claisen Rearrangement',
                reactants: ['Allyl aryl sulfide'],
                reagents: ['Heat'],
                products: ['Rearranged sulfide'],
                mechanism: [
                    'Sulfur analog',
                    'Sigmatropic rearrangement',
                    'Thia variant',
                    'Sulfur migration',
                    'Thermal process'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_555',
                name: 'Aza-Claisen Rearrangement',
                reactants: ['N-Allyl enamine'],
                reagents: ['Heat'],
                products: ['Gamma,delta-unsaturated carbonyl'],
                mechanism: [
                    'Nitrogen analog',
                    'Sigmatropic rearrangement',
                    'Aza variant',
                    'Carbonyl product',
                    'Enamine system'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_556',
                name: 'Carroll Rearrangement',
                reactants: ['Allyl acetoacetate'],
                reagents: ['Heat'],
                products: ['Gamma,delta-unsaturated ketone'],
                mechanism: [
                    'Decarboxylative rearrangement',
                    'Sigmatropic shift',
                    'Ketone formation',
                    'Elimination of CO2',
                    'Thermal process'
                ],
                conditions: {
                    temperature: '180',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_557',
                name: 'Eschenmoser-Claisen Rearrangement',
                reactants: ['Allyl alpha-thioacetamide'],
                reagents: ['HgCl2'],
                products: ['Gamma,delta-unsaturated thioamide'],
                mechanism: [
                    'Thioamide variant',
                    'Sigmatropic rearrangement',
                    'Mild conditions',
                    'Thioamide product',
                    'Mercury catalysis'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_558',
                name: 'Johnson-Claisen Rearrangement',
                reactants: ['Allyl alcohol', 'Triethyl orthoacetate'],
                reagents: ['Acid'],
                products: ['Gamma,delta-unsaturated ester'],
                mechanism: [
                    'Orthoester variant',
                    'Sigmatropic rearrangement',
                    'Ester formation',
                    'Johnson modification',
                    'Acid-catalyzed'
                ],
                conditions: {
                    temperature: '140',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_559',
                name: 'Orthoester Claisen Rearrangement',
                reactants: ['Allyl orthoester'],
                reagents: ['Heat'],
                products: ['Rearranged ester'],
                mechanism: [
                    'Orthoester rearrangement',
                    'Sigmatropic shift',
                    'Ester product',
                    'Claisen variant',
                    'Thermal process'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_560',
                name: 'Allyl Vinyl Ether Claisen Rearrangement',
                reactants: ['Allyl vinyl ether'],
                reagents: ['Heat'],
                products: ['Gamma,delta-unsaturated carbonyl'],
                mechanism: [
                    'Vinyl ether variant',
                    'Sigmatropic rearrangement',
                    'Carbonyl formation',
                    'Classic Claisen',
                    'Thermal reaction'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_561',
                name: 'Silyl Ketene Acetal Claisen Rearrangement',
                reactants: ['Silyl ketene acetal'],
                reagents: ['Heat'],
                products: ['Silylated gamma,delta-unsaturated ester'],
                mechanism: [
                    'Ireland variant',
                    'Silyl stabilization',
                    'Sigmatropic rearrangement',
                    'Ester product',
                    'Stereocontrol'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_562',
                name: '1,3-Sigmatropic Rearrangement',
                reactants: ['Allyl system'],
                reagents: ['Heat'],
                products: ['Rearranged product'],
                mechanism: [
                    'Sigmatropic shift',
                    '1,3-migration',
                    'Suprafacial process',
                    'Stereospecific',
                    'Thermal reaction'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Pericyclic Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_563',
                name: '1,5-Sigmatropic Rearrangement',
                reactants: ['Cyclopentadiene system'],
                reagents: ['Heat'],
                products: ['Rearranged diene'],
                mechanism: [
                    'Sigmatropic shift',
                    '1,5-migration',
                    'Aromatic system',
                    'Rapid equilibrium',
                    'Degenerate rearrangement'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '0.1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '100',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Pericyclic Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_564',
                name: 'Electrocyclic Ring Opening',
                reactants: ['Cyclobutene'],
                reagents: ['Heat'],
                products: ['Butadiene'],
                mechanism: [
                    'Conrotatory or disrotatory',
                    'Ring opening',
                    'Conjugated system',
                    'Woodward-Hoffmann rules',
                    'Stereospecific'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Pericyclic Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_565',
                name: 'Electrocyclic Ring Closing',
                reactants: ['Hexatriene'],
                reagents: ['Heat'],
                products: ['Cyclohexadiene'],
                mechanism: [
                    'Conrotatory or disrotatory',
                    'Ring closing',
                    'Cyclic product',
                    'Stereospecific',
                    'Pericyclic reaction'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Pericyclic Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_566',
                name: 'Nazarov Cyclization',
                reactants: ['Divinyl ketone'],
                reagents: ['Acid'],
                products: ['Cyclopentenone'],
                mechanism: [
                    'Conjugated system',
                    'Protonation',
                    'Electrocyclic closure',
                    'Cyclopentenone formation',
                    'Acid-catalyzed'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_567',
                name: 'Oxyallyl Cation Cyclization',
                reactants: ['Alpha,alpha\'-dihaloketone'],
                reagents: ['Base'],
                products: ['Cyclopentanone'],
                mechanism: [
                    'Oxyallyl cation',
                    'Electrophilic cyclization',
                    'Cyclopentanone formation',
                    'Three-carbon synthon',
                    'Base-induced'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_568',
                name: 'Bergman Cyclization',
                reactants: ['Enediyne'],
                reagents: ['Heat'],
                products: ['Benzenoid diradical'],
                mechanism: [
                    'Enediyne system',
                    'Cycloaromatization',
                    'Diradical formation',
                    'DNA cleavage',
                    'Antitumor activity'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '24',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_569',
                name: 'Myers-Saito Cyclization',
                reactants: ['Enyne allene'],
                reagents: ['Heat'],
                products: ['Benzenoid diradical'],
                mechanism: [
                    'Enyne allene system',
                    'Cycloaromatization',
                    'Diradical formation',
                    'Anticancer activity',
                    'DNA damage'
                ],
                conditions: {
                    temperature: '37',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_570',
                name: 'Schmittel Cyclization',
                reactants: ['Triyne'],
                reagents: ['Heat'],
                products: ['Benzene derivative'],
                mechanism: [
                    'Triyne system',
                    'Cyclization',
                    'Aromatic product',
                    'Multiple pathways',
                    'High temperature'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '65',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_571',
                name: 'Schreiner Cyclization',
                reactants: ['Enyne'],
                reagents: ['Heat'],
                products: ['Cyclopentene'],
                mechanism: [
                    'Enyne metathesis-like',
                    'Thermal cyclization',
                    'Cyclopentene formation',
                    'No catalyst needed',
                    'High temperature'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Cyclizations',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_572',
                name: 'Nicholas Reaction',
                reactants: ['Propargylic alcohol', 'Co2(CO)8'],
                reagents: [],
                products: ['Stabilized carbocation'],
                mechanism: [
                    'Cobalt complexation',
                    'Carbocation stabilization',
                    'Electrophilic reactions',
                    'Alkyne protection',
                    'Cobalt carbonyl'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Organometallic Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_573',
                name: 'Petasis Olefination',
                reactants: ['Alpha-halo sulfone', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Sulfone anion formation',
                    'Addition to aldehyde',
                    'Elimination',
                    'Stereoselective',
                    'Julia-type reaction'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_574',
                name: 'Julia-Lythgoe Olefination',
                reactants: ['Beta-keto sulfone', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Sulfone anion',
                    'Aldol-type addition',
                    'Elimination',
                    'E/Z selectivity',
                    'Stereocontrol'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_575',
                name: 'Ando Olefination',
                reactants: ['Epoxide', 'Phosphorus ylide'],
                reagents: [],
                products: ['Allyl alcohol'],
                mechanism: [
                    'Epoxide opening',
                    'Ylide addition',
                    'Wittig-like reaction',
                    'Allyl alcohol formation',
                    'Ring opening'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '95',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_576',
                name: 'Takai Olefination',
                reactants: ['Aldehyde', 'Geminal dibromide'],
                reagents: ['CrCl2'],
                products: ['Alkene'],
                mechanism: [
                    'Chromium(II) reduction',
                    'Geminal dihalide',
                    'Alkene formation',
                    'E/Z mixture',
                    'No phosphorus'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_577',
                name: 'Fukuyama Olefination',
                reactants: ['Thioacetal', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Thioacetal anion',
                    'Addition-elimination',
                    'Stereoselective',
                    'Mild conditions',
                    'Functional group tolerant'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_578',
                name: 'Still-Wittig Olefination',
                reactants: ['Phosphine oxide', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Phosphine oxide anion',
                    'Addition-elimination',
                    'Z-selective',
                    'Modified Wittig',
                    'Stereocontrol'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_579',
                name: 'Schlosser Olefination',
                reactants: ['Phosphorus ylide', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Modified Wittig',
                    'Schlosser conditions',
                    'E/Z control',
                    'Stereoselective',
                    'Base modification'
                ],
                conditions: {
                    temperature: '-100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_580',
                name: 'Corey-Winter Olefination',
                reactants: ['1,2-Diol', 'Thiophosgene'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Cyclic thionocarbonate',
                    'Elimination',
                    'Alkene formation',
                    'Syn elimination',
                    'Stereospecific'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Toluene',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '78',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_581',
                name: 'Johnson Olefination',
                reactants: ['Beta-keto sulfoxide', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Sulfoxide anion',
                    'Addition to aldehyde',
                    'Syn elimination',
                    'E/Z control',
                    'Stereoselective'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_582',
                name: 'Nysted Reagent',
                reactants: ['Aldehyde'],
                reagents: ['Zn', 'CH2Br2'],
                products: ['Alkene'],
                mechanism: [
                    'Geminal dibromide formation',
                    'Zinc reduction',
                    'Alkene formation',
                    'Methylene addition',
                    'Simmons-Smith variant'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '85',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_583',
                name: 'Seyferth-Gilbert Homologation',
                reactants: ['Aldehyde', 'Dimethyl diazomethylphosphonate'],
                reagents: ['Base'],
                products: ['Alkyne'],
                mechanism: [
                    'Phosphonate anion',
                    'Addition to aldehyde',
                    'Elimination',
                    'Terminal alkyne',
                    'One-carbon homologation'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '78',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_584',
                name: 'Ohira-Bestmann Reaction',
                reactants: ['Aldehyde', 'Bestmann-Ohira reagent'],
                reagents: ['Base'],
                products: ['Alkyne'],
                mechanism: [
                    'Diazo phosphonate',
                    'Base deprotonation',
                    'Addition-elimination',
                    'Terminal alkyne',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Methanol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '75',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_585',
                name: 'Corey-Fuchs Reaction',
                reactants: ['Aldehyde', 'CBr4', 'PPh3'],
                reagents: [],
                products: ['Dibromoalkene'],
                mechanism: [
                    'Phosphorus ylide formation',
                    'Addition to aldehyde',
                    'Elimination',
                    'Geminal dibromide',
                    'Alkyne precursor'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Homologation',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_586',
                name: 'Shapiro Reaction',
                reactants: ['Tosylhydrazone', 'Base'],
                reagents: ['Strong base'],
                products: ['Alkene'],
                mechanism: [
                    'Diazene formation',
                    'Nitrogen elimination',
                    'Carbanion intermediate',
                    'Protonation',
                    'Less substituted alkene'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Ether',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_587',
                name: 'Bamford-Stevens Reaction',
                reactants: ['Tosylhydrazone', 'Base'],
                reagents: ['Collidine'],
                products: ['Alkene'],
                mechanism: [
                    'Carbene or carbanion',
                    'Depending on conditions',
                    'Alkene formation',
                    'Mixture possible',
                    'Thermal reaction'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Glycol',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Elimination Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_588',
                name: 'McMurry Coupling',
                reactants: ['Aldehyde', 'Aldehyde'],
                reagents: ['TiCl3', 'Zn(Cu)'],
                products: ['Alkene'],
                mechanism: [
                    'Low-valent titanium',
                    'Pinacol intermediate',
                    'Deoxygenation',
                    'Alkene formation',
                    'Reductive coupling'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '8',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '67',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Carbonyl Coupling',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_589',
                name: 'Julia Olefination',
                reactants: ['Sulfone', 'Aldehyde'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Sulfone anion formation',
                    'Addition to aldehyde',
                    'Elimination',
                    'Stereoselective',
                    'E/Z control'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_590',
                name: 'Peterson Olefination',
                reactants: ['Alpha-silyl alcohol', 'Electrophile'],
                reagents: ['Base'],
                products: ['Alkene'],
                mechanism: [
                    'Beta-elimination',
                    'Silicon beta-effect',
                    'Alkene formation',
                    'Stereoselective',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_591',
                name: 'Tebbe Olefination',
                reactants: ['Carbonyl compound'],
                reagents: ['Cp2TiCH2ClAlMe2'],
                products: ['Alkene'],
                mechanism: [
                    'Titanocene methylidene',
                    'Wittig-like reaction',
                    'Methylenation',
                    'Terminal alkenes',
                    'Schrock-type'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '89',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_592',
                name: 'Lombardo Olefination',
                reactants: ['Aldehyde', 'CHBr3'],
                reagents: ['CrCl2'],
                products: ['Dibromoalkene'],
                mechanism: [
                    'Chromium(II) reagent',
                    'Geminal tribromide',
                    'Dibromoalkene formation',
                    'Corey-Fuchs variant',
                    'Alkyne precursor'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '80',
                    atomEconomy: '75',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Olefination',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_593',
                name: 'Stork Enamine Reaction',
                reactants: ['Enamine', 'Electrophile'],
                reagents: [],
                products: ['Alkylated carbonyl'],
                mechanism: [
                    'Enamine formation',
                    'Nucleophilic addition',
                    'Hydrolysis',
                    'Regioselective alkylation',
                    'Carbonyl protection'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Enamine Chemistry',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_594',
                name: 'Mukaiyama Aldol Reaction',
                reactants: ['Silyl enol ether', 'Aldehyde'],
                reagents: ['TiCl4'],
                products: ['Beta-hydroxy carbonyl'],
                mechanism: [
                    'Lewis acid activation',
                    'Mukaiyama reagent',
                    'Carbonyl addition',
                    'Stereocontrol possible',
                    'Mild conditions'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '1',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Aldol Reactions',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_595',
                name: 'Evans Aldol Reaction',
                reactants: ['Boron enolate', 'Aldehyde'],
                reagents: ['Chiral auxiliary'],
                products: ['Aldol product'],
                mechanism: [
                    'Chiral boron reagent',
                    'Asymmetric induction',
                    'High diastereoselectivity',
                    'Auxiliary removal',
                    'Stereocontrolled synthesis'
                ],
                conditions: {
                    temperature: '-78',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Asymmetric Synthesis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_596',
                name: 'MacMillan Aldol Reaction',
                reactants: ['Enal', 'Aldehyde'],
                reagents: ['Imidazolidinone catalyst'],
                products: ['Beta-hydroxy aldehyde'],
                mechanism: [
                    'Organocatalytic activation',
                    'Enamine catalysis',
                    'Asymmetric aldol',
                    'High enantioselectivity',
                    'Secondary amine catalyst'
                ],
                conditions: {
                    temperature: '0',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DCM',
                    time: '12',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_597',
                name: 'Hajos-Parrish Reaction',
                reactants: ['Triketone'],
                reagents: ['Proline'],
                products: ['Wieland-Miescher ketone'],
                mechanism: [
                    'Proline catalysis',
                    'Intramolecular aldol',
                    'Enantioselective',
                    'Robinson annulation',
                    'Bicyclic product'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '48',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Organocatalysis',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_598',
                name: 'Cornforth Rearrangement',
                reactants: ['Allyl alcohol'],
                reagents: ['Base'],
                products: ['Rearranged carbonyl'],
                mechanism: [
                    'Enolate forms',
                    'Sigmatropic rearrangement',
                    'Carbonyl migrates',
                    'Thermodynamic product',
                    'Base-catalyzed'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMSO',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_599',
                name: 'Smiles Rearrangement',
                reactants: ['Aryl alkyl ether'],
                reagents: ['Base'],
                products: ['Rearranged product'],
                mechanism: [
                    'Nucleophilic aromatic substitution',
                    'Intramolecular attack',
                    'Rearrangement occurs',
                    'Ring substitution',
                    'Base-catalyzed'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'DMF',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_600',
                name: 'Truce-Smiles Rearrangement',
                reactants: ['Aryl sulfide'],
                reagents: ['Base'],
                products: ['Rearranged sulfide'],
                mechanism: [
                    'Carbanion attacks ring',
                    'Rearrangement occurs',
                    'Sulfur migrates',
                    'New substitution pattern',
                    'Base-catalyzed'
                ],
                conditions: {
                    temperature: '25',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'THF',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '75',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_601',
                name: 'Newman-Kwart Rearrangement',
                reactants: ['O-Aryl thiocarbamate'],
                reagents: ['Heat'],
                products: ['S-Aryl thiocarbamate'],
                mechanism: [
                    'Thiocarbonyl migrates',
                    'Rearrangement occurs',
                    'S-Aryl product forms',
                    'Thermal reaction',
                    'High temperature'
                ],
                conditions: {
                    temperature: '250',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_602',
                name: 'Meisenheimer Rearrangement',
                reactants: ['Quaternary ammonium salt'],
                reagents: ['Heat'],
                products: ['Rearranged amine'],
                mechanism: [
                    'Ylide forms',
                    'Stevens-type rearrangement',
                    'Alkyl migration',
                    'Tertiary amine',
                    'Thermal process'
                ],
                conditions: {
                    temperature: '150',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '3',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_603',
                name: 'Dienone-Phenol Rearrangement',
                reactants: ['2,4-Cyclohexadienone'],
                reagents: ['Acid'],
                products: ['Phenol'],
                mechanism: [
                    'Protonation occurs',
                    'Rearrangement to phenol',
                    'Aromatic ring forms',
                    'Acid-catalyzed',
                    'Phenolic product'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Acetic acid',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Rearrangements',
                difficulty: 'Advanced',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_604',
                name: 'Aromatization Reactions',
                reactants: ['Cyclic compound'],
                reagents: ['Oxidant'],
                products: ['Aromatic compound'],
                mechanism: [
                    'Dehydrogenation occurs',
                    'Double bonds form',
                    'Aromatic system',
                    'Oxidative process',
                    'Stabilization'
                ],
                conditions: {
                    temperature: '200',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'None',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '70',
                    atomEconomy: '89',
                    energyEfficiency: 'Medium'
                },
                alternatePathways: [],
                category: 'Aromatization',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_605',
                name: 'Transesterification',
                reactants: ['Ester', 'Alcohol'],
                reagents: ['Acid or Base'],
                products: ['New ester', 'Alcohol'],
                mechanism: [
                    'Nucleophilic attack',
                    'Tetrahedral intermediate',
                    'Leaving group departs',
                    'Equilibrium reaction',
                    'Catalyst required'
                ],
                conditions: {
                    temperature: '80',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Alcohol',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Ester Chemistry',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_606',
                name: 'Saponification',
                reactants: ['Ester', 'Base'],
                reagents: ['NaOH or KOH'],
                products: ['Carboxylate', 'Alcohol'],
                mechanism: [
                    'Hydroxide attacks carbonyl',
                    'Tetrahedral intermediate',
                    'Alkoxide leaves',
                    'Carboxylate forms',
                    'Irreversible with base'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '2',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '95',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Hydrolysis',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_607',
                name: 'Acid-Catalyzed Hydrolysis',
                reactants: ['Ester', 'Water'],
                reagents: ['HCl or H2SO4'],
                products: ['Carboxylic acid', 'Alcohol'],
                mechanism: [
                    'Protonation of carbonyl',
                    'Water attacks',
                    'Tetrahedral intermediate',
                    'Protonated alcohol leaves',
                    'Acid catalyst'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '4',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '90',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Hydrolysis',
                difficulty: 'Beginner',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'rxn_608',
                name: 'Amide Hydrolysis',
                reactants: ['Amide', 'Water'],
                reagents: ['Acid or Base'],
                products: ['Carboxylic acid', 'Amine'],
                mechanism: [
                    'Nucleophilic attack on carbonyl',
                    'Tetrahedral intermediate',
                    'Leaving group departs',
                    'Carboxylic acid and amine',
                    'Harsh conditions'
                ],
                conditions: {
                    temperature: '100',
                    temperatureUnit: '°C',
                    pressure: '1',
                    pressureUnit: 'atm',
                    solvent: 'Water',
                    time: '6',
                    timeUnit: 'hours'
                },
                metrics: {
                    yield: '85',
                    atomEconomy: '100',
                    energyEfficiency: 'High'
                },
                alternatePathways: [],
                category: 'Hydrolysis',
                difficulty: 'Intermediate',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
    }

    // Get all reactions
    getAllReactions() {
        return this.reactions;
    }

    // Get reaction by ID
    getReactionById(id) {
        return this.reactions.find(reaction => reaction.id === id);
    }

    // Search reactions by various criteria
    searchReactions(query) {
        const searchTerm = query.toLowerCase();
        return this.reactions.filter(reaction =>
            reaction.name.toLowerCase().includes(searchTerm) ||
            reaction.reactants.some(r => r.toLowerCase().includes(searchTerm)) ||
            reaction.products.some(p => p.toLowerCase().includes(searchTerm)) ||
            reaction.category.toLowerCase().includes(searchTerm)
        );
    }

    // Add new reaction
    addReaction(reactionData) {
        // Check for duplicate names
        const existingReaction = this.reactions.find(r => r.name.toLowerCase() === reactionData.name.toLowerCase());
        if (existingReaction) {
            throw new Error('A reaction with this name already exists');
        }

        const newReaction = {
            id: this.generateId(),
            ...reactionData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.reactions.push(newReaction);
        this.saveReactions();
        return newReaction;
    }

    // Update existing reaction
    updateReaction(id, updateData) {
        const index = this.reactions.findIndex(reaction => reaction.id === id);
        if (index !== -1) {
            this.reactions[index] = {
                ...this.reactions[index],
                ...updateData,
                updatedAt: new Date().toISOString()
            };
            this.saveReactions();
            return this.reactions[index];
        }
        return null;
    }

    // Delete reaction
    deleteReaction(id) {
        const index = this.reactions.findIndex(reaction => reaction.id === id);
        if (index !== -1) {
            const deleted = this.reactions.splice(index, 1)[0];
            this.saveReactions();
            return deleted;
        }
        return null;
    }

    // Generate unique ID
    generateId() {
        return 'rxn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get reactions by category
    getReactionsByCategory(category) {
        return this.reactions.filter(reaction => reaction.category === category);
    }

    // Get reaction statistics
    getStatistics() {
        const categories = {};
        const difficulties = { Beginner: 0, Intermediate: 0, Advanced: 0 };

        this.reactions.forEach(reaction => {
            categories[reaction.category] = (categories[reaction.category] || 0) + 1;
            difficulties[reaction.difficulty] = (difficulties[reaction.difficulty] || 0) + 1;
        });

        return {
            total: this.reactions.length,
            categories,
            difficulties
        };
    }

    // Export reactions as JSON
    exportReactions() {
        return JSON.stringify(this.reactions, null, 2);
    }

    // Import reactions from JSON
    importReactions(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            if (Array.isArray(imported)) {
                this.reactions = imported;
                this.saveReactions();
                return true;
            }
        } catch (error) {
            console.error('Error importing reactions:', error);
        }
        return false;
    }
}

// Initialize global reaction database instance
window.reactionDatabase = new ReactionDatabase();
