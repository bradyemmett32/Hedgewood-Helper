/**
 * Hedgewood Character Sheet PDF Export Module
 * Generates a professional PDF character sheet based on the current character data
 */

class CharacterSheetPDF {
    constructor() {
        this.pageWidth = 210; // A4 width in mm
        this.pageHeight = 297; // A4 height in mm
        this.margin = 15;
        this.currentY = this.margin;
        this.lineHeight = 5;
        this.sectionSpacing = 8;

        // Colors
        this.colors = {
            primary: [41, 128, 185],      // Blue
            secondary: [52, 73, 94],      // Dark blue-gray
            accent: [231, 76, 60],        // Red for bloodied
            text: [0, 0, 0],              // Black
            lightGray: [236, 240, 241],   // Light gray backgrounds
            darkGray: [149, 165, 166]     // Dark gray
        };
    }

    /**
     * Main export function
     */
    async exportToPDF(characterData) {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            throw new Error('jsPDF library not loaded');
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        this.doc = doc;
        this.currentY = this.margin;

        try {
            // Header
            this.addHeader(characterData);

            // Character Identity
            this.addCharacterIdentity(characterData);

            // The Big Four (Attributes)
            this.addAttributes(characterData);

            // Hit Points
            this.addHitPoints(characterData);

            // Combat & Skills
            this.addCombatAndSkills(characterData);

            // Check if we need a new page before equipment
            if (this.currentY > this.pageHeight - 80) {
                this.addNewPage();
            }

            // Equipment
            this.addEquipment(characterData);

            // Features & Abilities (new page)
            this.addNewPage();
            this.addFeatures(characterData);

            // Footer
            this.addFooter();

            // Generate filename
            const characterName = characterData.characterInfo?.characterName || 'Character';
            const sanitizedName = characterName.replace(/[^a-z0-9]/gi, '_');
            const filename = `${sanitizedName}_CharacterSheet.pdf`;

            // Save the PDF
            doc.save(filename);

            return true;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    }

    /**
     * Add a new page and reset Y position
     */
    addNewPage() {
        this.doc.addPage();
        this.currentY = this.margin;
    }

    /**
     * Add header with character name and title
     */
    addHeader(characterData) {
        const doc = this.doc;
        const characterName = characterData.characterInfo?.characterName || 'Unnamed Character';

        // Title background
        doc.setFillColor(...this.colors.primary);
        doc.rect(0, 0, this.pageWidth, 25, 'F');

        // Title
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('⚔ HEDGEWOOD CHARACTER SHEET ⚔', this.pageWidth / 2, 10, { align: 'center' });

        // Character name
        doc.setFontSize(16);
        doc.text(characterName, this.pageWidth / 2, 18, { align: 'center' });

        this.currentY = 30;
    }

    /**
     * Add character identity section
     */
    addCharacterIdentity(characterData) {
        const info = characterData.characterInfo || {};

        this.addSectionTitle('Character Identity');

        const identityData = [
            ['Player Name:', info.playerName || 'N/A'],
            ['Multi-class:', info.multiClassName || 'N/A'],
            ['Species:', info.species || 'N/A'],
            ['Trade:', info.trade || 'N/A'],
            ['Class 1:', info.class1 || 'N/A'],
            ['Class 2:', info.class2 || 'N/A'],
            ['Level:', info.level || '1'],
            ['Size:', info.size || 'N/A'],
            ['Experience Points:', `${info.experiencePoints || 0}`]
        ];

        this.addKeyValueGrid(identityData, 3);
        this.currentY += this.sectionSpacing;
    }

    /**
     * Add attributes section
     */
    addAttributes(characterData) {
        const attributes = characterData.attributes || {};

        this.addSectionTitle('The Big Four');

        const startY = this.currentY;
        const boxWidth = (this.pageWidth - 2 * this.margin - 15) / 4;
        const boxHeight = 25;
        let xPos = this.margin;

        const attrList = ['toughness', 'reflexes', 'intellect', 'willpower'];
        const attrNames = ['Toughness', 'Reflexes', 'Intellect', 'Willpower'];

        attrList.forEach((attr, index) => {
            const data = attributes[attr] || { score: 10, modifier: 0, defense: 10 };

            // Box background
            this.doc.setFillColor(...this.colors.lightGray);
            this.doc.rect(xPos, startY, boxWidth, boxHeight, 'FD');

            // Attribute name
            this.doc.setFontSize(10);
            this.doc.setFont(undefined, 'bold');
            this.doc.setTextColor(...this.colors.secondary);
            this.doc.text(attrNames[index], xPos + boxWidth / 2, startY + 5, { align: 'center' });

            // Score
            this.doc.setFontSize(14);
            this.doc.setTextColor(...this.colors.text);
            this.doc.text(`Score: ${data.score}`, xPos + boxWidth / 2, startY + 12, { align: 'center' });

            // Modifier
            this.doc.setFontSize(10);
            const modStr = data.modifier >= 0 ? `+${data.modifier}` : `${data.modifier}`;
            this.doc.text(`Mod: ${modStr}`, xPos + boxWidth / 2, startY + 18, { align: 'center' });

            // Defense
            this.doc.text(`Def: ${data.defense}`, xPos + boxWidth / 2, startY + 23, { align: 'center' });

            xPos += boxWidth + 5;
        });

        this.currentY = startY + boxHeight + this.sectionSpacing;
    }

    /**
     * Add hit points section
     */
    addHitPoints(characterData) {
        const hp = characterData.hitPoints || {};
        const hitDice = characterData.hitDice || {};
        const mp = characterData.magickPoints || {};

        this.addSectionTitle('Hit Points & Resources');

        const startY = this.currentY;
        const boxWidth = (this.pageWidth - 2 * this.margin - 10) / 3;

        // Hit Points Box
        this.doc.setFillColor(...this.colors.lightGray);
        this.doc.rect(this.margin, startY, boxWidth, 20, 'FD');

        this.doc.setFontSize(10);
        this.doc.setFont(undefined, 'bold');
        this.doc.setTextColor(...this.colors.secondary);
        this.doc.text('Hit Points', this.margin + boxWidth / 2, startY + 5, { align: 'center' });

        this.doc.setFontSize(12);
        this.doc.setTextColor(...this.colors.text);
        this.doc.setFont(undefined, 'normal');
        this.doc.text(`Current: ${hp.current || 0} / ${hp.maximum || 0}`, this.margin + boxWidth / 2, startY + 11, { align: 'center' });
        this.doc.text(`Temp: ${hp.temporary || 0}`, this.margin + boxWidth / 2, startY + 16, { align: 'center' });

        // Hit Dice Box
        const hdX = this.margin + boxWidth + 5;
        this.doc.setFillColor(...this.colors.lightGray);
        this.doc.rect(hdX, startY, boxWidth, 20, 'FD');

        this.doc.setFontSize(10);
        this.doc.setFont(undefined, 'bold');
        this.doc.setTextColor(...this.colors.secondary);
        this.doc.text('Hit Dice', hdX + boxWidth / 2, startY + 5, { align: 'center' });

        this.doc.setFontSize(9);
        this.doc.setFont(undefined, 'normal');
        this.doc.setTextColor(...this.colors.text);
        if (hitDice.class1) {
            this.doc.text(`Class 1: ${hitDice.class1.current || 0}/${hitDice.class1.total || 0} ${hitDice.class1.dieType || 'd8'}`,
                hdX + boxWidth / 2, startY + 11, { align: 'center' });
        }
        if (hitDice.class2) {
            this.doc.text(`Class 2: ${hitDice.class2.current || 0}/${hitDice.class2.total || 0} ${hitDice.class2.dieType || 'd8'}`,
                hdX + boxWidth / 2, startY + 16, { align: 'center' });
        }

        // Magick Points Box
        const mpX = hdX + boxWidth + 5;
        this.doc.setFillColor(...this.colors.lightGray);
        this.doc.rect(mpX, startY, boxWidth, 20, 'FD');

        this.doc.setFontSize(10);
        this.doc.setFont(undefined, 'bold');
        this.doc.setTextColor(...this.colors.secondary);
        this.doc.text('Magick Points', mpX + boxWidth / 2, startY + 5, { align: 'center' });

        this.doc.setFontSize(9);
        this.doc.setFont(undefined, 'normal');
        this.doc.setTextColor(...this.colors.text);

        let mpY = startY + 11;
        if (mp.class1?.hasSpellcasting) {
            this.doc.text(`Class 1: ${mp.class1.current || 0}/${mp.class1.maximum || 0}`,
                mpX + boxWidth / 2, mpY, { align: 'center' });
            mpY += 5;
        }
        if (mp.class2?.hasSpellcasting) {
            this.doc.text(`Class 2: ${mp.class2.current || 0}/${mp.class2.maximum || 0}`,
                mpX + boxWidth / 2, mpY, { align: 'center' });
        }
        if (!mp.class1?.hasSpellcasting && !mp.class2?.hasSpellcasting) {
            this.doc.text('N/A', mpX + boxWidth / 2, startY + 13, { align: 'center' });
        }

        this.currentY = startY + 20 + this.sectionSpacing;
    }

    /**
     * Add combat and skills section
     */
    addCombatAndSkills(characterData) {
        const combat = characterData.combat || {};
        const generalSkills = characterData.generalSkills || {};

        this.addSectionTitle('Combat & Skills');

        // Combat stats
        const combatData = [
            ['Armor Class:', combat.armorClass || 10],
            ['Speed:', `${combat.speed || 5} squares`]
        ];
        this.addKeyValueGrid(combatData, 2);
        this.currentY += 3;

        // Combat Skills
        this.doc.setFontSize(9);
        this.doc.setFont(undefined, 'bold');
        this.doc.setTextColor(...this.colors.secondary);
        this.doc.text('Combat Skills:', this.margin, this.currentY);
        this.currentY += 5;

        const combatSkills = combat.combatSkills || {};
        const combatSkillData = [
            ['Melee:', `Rank ${combatSkills.melee?.rank || 0} | +${combatSkills.melee?.bonus || 0} (${combatSkills.melee?.primaryAttribute || 'TOU'})`],
            ['Ranged:', `Rank ${combatSkills.ranged?.rank || 0} | +${combatSkills.ranged?.bonus || 0} (${combatSkills.ranged?.primaryAttribute || 'REF'})`],
            ['Spellcraft:', `Rank ${combatSkills.spellcraft?.rank || 0} | +${combatSkills.spellcraft?.bonus || 0} (${combatSkills.spellcraft?.primaryAttribute || 'INT'})`]
        ];
        this.addKeyValueGrid(combatSkillData, 3);
        this.currentY += 3;

        // General Skills
        this.doc.setFontSize(9);
        this.doc.setFont(undefined, 'bold');
        this.doc.setTextColor(...this.colors.secondary);
        this.doc.text('General Skills:', this.margin, this.currentY);
        this.currentY += 5;

        const skillNames = ['maneuver', 'sneak', 'study', 'craft', 'barter', 'endure', 'deceive'];
        const skillLabels = ['Maneuver', 'Sneak', 'Study', 'Craft', 'Barter', 'Endure', 'Deceive'];

        const generalSkillData = skillNames.map((skill, index) => {
            const data = generalSkills[skill] || { rank: 0, bonus: 0, primaryAttribute: 'TOU' };
            return [
                `${skillLabels[index]}:`,
                `Rank ${data.rank} | +${data.bonus} (${data.primaryAttribute})`
            ];
        });

        this.addKeyValueGrid(generalSkillData, 2);
        this.currentY += this.sectionSpacing;
    }

    /**
     * Add equipment section
     */
    addEquipment(characterData) {
        const equipment = characterData.equipment || {};

        this.addSectionTitle('Equipment');

        // Weapons
        if (equipment.weapons && equipment.weapons.length > 0) {
            this.doc.setFontSize(9);
            this.doc.setFont(undefined, 'bold');
            this.doc.setTextColor(...this.colors.secondary);
            this.doc.text('Weapons:', this.margin, this.currentY);
            this.currentY += 5;

            this.doc.setFont(undefined, 'normal');
            this.doc.setFontSize(8);
            equipment.weapons.forEach(weapon => {
                const weaponStr = `• ${weapon.name} - Range: ${weapon.range}, Damage: ${weapon.damage}, Size: ${weapon.size}`;
                this.doc.text(weaponStr, this.margin + 3, this.currentY);
                this.currentY += 4;
            });
            this.currentY += 2;
        }

        // Armor
        if (equipment.armor && equipment.armor.length > 0) {
            this.doc.setFontSize(9);
            this.doc.setFont(undefined, 'bold');
            this.doc.setTextColor(...this.colors.secondary);
            this.doc.text('Armor:', this.margin, this.currentY);
            this.currentY += 5;

            this.doc.setFont(undefined, 'normal');
            this.doc.setFontSize(8);
            equipment.armor.forEach(armor => {
                const armorStr = `• ${armor.name} - AC Bonus: ${armor.acBonus}, Speed Reduction: ${armor.speedReduction}`;
                this.doc.text(armorStr, this.margin + 3, this.currentY);
                this.currentY += 4;
            });
            this.currentY += 2;
        }

        // Other Effects
        if (equipment.otherEffects && equipment.otherEffects.length > 0) {
            this.doc.setFontSize(9);
            this.doc.setFont(undefined, 'bold');
            this.doc.setTextColor(...this.colors.secondary);
            this.doc.text('Other Effects:', this.margin, this.currentY);
            this.currentY += 5;

            this.doc.setFont(undefined, 'normal');
            this.doc.setFontSize(8);
            equipment.otherEffects.forEach(effect => {
                this.doc.text(`• ${effect.name}`, this.margin + 3, this.currentY);
                this.currentY += 4;
                if (effect.description) {
                    const descLines = this.wrapText(effect.description, this.pageWidth - 2 * this.margin - 8);
                    descLines.forEach(line => {
                        this.doc.text(line, this.margin + 6, this.currentY);
                        this.currentY += 3.5;
                    });
                }
            });
            this.currentY += 2;
        }

        // Inventory
        if (equipment.inventory && equipment.inventory.length > 0) {
            this.doc.setFontSize(9);
            this.doc.setFont(undefined, 'bold');
            this.doc.setTextColor(...this.colors.secondary);
            this.doc.text('Inventory:', this.margin, this.currentY);
            this.currentY += 5;

            this.doc.setFont(undefined, 'normal');
            this.doc.setFontSize(8);
            equipment.inventory.forEach(item => {
                const itemStr = `• ${item.name} x${item.quantity} (${item.weight} lbs)`;
                this.doc.text(itemStr, this.margin + 3, this.currentY);
                this.currentY += 4;
            });
            this.currentY += 2;
        }

        // Currency
        const currency = equipment.currency?.shells || 0;
        this.doc.setFontSize(9);
        this.doc.setFont(undefined, 'bold');
        this.doc.setTextColor(...this.colors.secondary);
        this.doc.text(`Currency: ${currency} shells`, this.margin, this.currentY);
        this.currentY += this.sectionSpacing;
    }

    /**
     * Add features and abilities section
     */
    addFeatures(characterData) {
        const features = characterData.features || {};
        const bloodied = characterData.bloodiedStatus || {};

        this.addSectionTitle('Features & Abilities');

        // Bloodied Status
        if (bloodied.activeBloodiedEffect) {
            this.doc.setFontSize(9);
            this.doc.setFont(undefined, 'bold');
            this.doc.setTextColor(...this.colors.accent);
            this.doc.text('⚠ Bloodied Effect:', this.margin, this.currentY);
            this.currentY += 5;

            this.doc.setFont(undefined, 'normal');
            this.doc.setFontSize(8);
            this.doc.setTextColor(...this.colors.text);

            const effect = bloodied.activeBloodiedEffect;
            this.doc.text(`${effect.name}`, this.margin + 3, this.currentY);
            this.currentY += 4;

            if (effect.description) {
                const descLines = this.wrapText(effect.description, this.pageWidth - 2 * this.margin - 6);
                descLines.forEach(line => {
                    this.doc.text(line, this.margin + 6, this.currentY);
                    this.currentY += 3.5;
                });
            }
            this.currentY += 4;
        }

        // Class 1 Features
        if (features.classFeatures?.class1Features) {
            this.addFeatureBlock('Class 1 Features', features.classFeatures.class1Features);
        }

        // Class 2 Features
        if (features.classFeatures?.class2Features) {
            this.addFeatureBlock('Class 2 Features', features.classFeatures.class2Features);
        }

        // Species Features
        if (features.speciesFeatures) {
            this.addFeatureBlock('Species Features', features.speciesFeatures);
        }

        // Trade Features
        if (features.tradeFeatures) {
            this.addFeatureBlock('Trade Features', features.tradeFeatures);
        }
    }

    /**
     * Add a feature block
     */
    addFeatureBlock(title, content) {
        // Check if we need a new page
        if (this.currentY > this.pageHeight - 40) {
            this.addNewPage();
        }

        this.doc.setFontSize(9);
        this.doc.setFont(undefined, 'bold');
        this.doc.setTextColor(...this.colors.secondary);
        this.doc.text(title + ':', this.margin, this.currentY);
        this.currentY += 5;

        this.doc.setFont(undefined, 'normal');
        this.doc.setFontSize(8);
        this.doc.setTextColor(...this.colors.text);

        const lines = this.wrapText(content, this.pageWidth - 2 * this.margin - 3);
        lines.forEach(line => {
            // Check if we need a new page mid-content
            if (this.currentY > this.pageHeight - this.margin - 10) {
                this.addNewPage();
            }

            this.doc.text(line, this.margin + 3, this.currentY);
            this.currentY += 3.5;
        });

        this.currentY += 4;
    }

    /**
     * Add section title
     */
    addSectionTitle(title) {
        this.doc.setFillColor(...this.colors.secondary);
        this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 7, 'F');

        this.doc.setTextColor(255, 255, 255);
        this.doc.setFontSize(11);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(title, this.margin + 2, this.currentY + 5);

        this.currentY += 10;
        this.doc.setTextColor(...this.colors.text);
        this.doc.setFont(undefined, 'normal');
    }

    /**
     * Add key-value grid
     */
    addKeyValueGrid(data, columns) {
        const colWidth = (this.pageWidth - 2 * this.margin) / columns;
        const rowsPerColumn = Math.ceil(data.length / columns);

        this.doc.setFontSize(8);

        let maxY = this.currentY;

        for (let col = 0; col < columns; col++) {
            let yPos = this.currentY;
            const xPos = this.margin + col * colWidth;

            for (let row = 0; row < rowsPerColumn; row++) {
                const index = col * rowsPerColumn + row;
                if (index >= data.length) break;

                const [key, value] = data[index];

                this.doc.setFont(undefined, 'bold');
                this.doc.setTextColor(...this.colors.secondary);
                this.doc.text(key, xPos, yPos);

                this.doc.setFont(undefined, 'normal');
                this.doc.setTextColor(...this.colors.text);
                this.doc.text(String(value), xPos + 35, yPos);

                yPos += 5;
            }

            maxY = Math.max(maxY, yPos);
        }

        this.currentY = maxY;
    }

    /**
     * Add footer with page numbers and date
     */
    addFooter() {
        const pageCount = this.doc.internal.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
            this.doc.setPage(i);
            this.doc.setFontSize(8);
            this.doc.setTextColor(...this.colors.darkGray);
            this.doc.text(
                `Page ${i} of ${pageCount}`,
                this.pageWidth / 2,
                this.pageHeight - 10,
                { align: 'center' }
            );
            this.doc.text(
                `Generated: ${new Date().toLocaleDateString()}`,
                this.pageWidth - this.margin,
                this.pageHeight - 10,
                { align: 'right' }
            );
        }
    }

    /**
     * Wrap text to fit within a given width
     */
    wrapText(text, maxWidth) {
        if (!text) return [];

        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const width = this.doc.getTextWidth(testLine);

            if (width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }
}

// Export for use in character-sheet.js
window.CharacterSheetPDF = CharacterSheetPDF;
