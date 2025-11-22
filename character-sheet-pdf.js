// Character Sheet PDF Export Module
// Generates a printer-friendly 2-page character sheet for Hedgewood TTRPG

// Function to generate PDF character sheet
function generateCharacterSheetPDF() {
    // Load jsPDF from CDN
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter'
    });

    const charData = currentCharacter;
    const margin = 10;
    const pageWidth = 215.9; // Letter width in mm
    const pageHeight = 279.4; // Letter height in mm
    const contentWidth = pageWidth - (2 * margin);
    let yPos = margin;

    // Helper function to draw a box
    function drawBox(x, y, width, height, label = '', value = '', fontSize = 9) {
        doc.setDrawColor(0);
        doc.setLineWidth(0.3);
        doc.rect(x, y, width, height);

        if (label) {
            doc.setFontSize(7);
            doc.setTextColor(100);
            doc.text(label, x + 1, y + 3);
        }

        if (value) {
            doc.setFontSize(fontSize);
            doc.setTextColor(0);
            doc.text(value.toString(), x + 1, y + (label ? 7 : 4));
        }
    }

    // Helper function to draw checkbox
    function drawCheckbox(x, y, size = 3, checked = false) {
        doc.setDrawColor(0);
        doc.setLineWidth(0.3);
        doc.rect(x, y, size, size);

        if (checked) {
            doc.setLineWidth(0.5);
            doc.line(x + 0.5, y + 0.5, x + size - 0.5, y + size - 0.5);
            doc.line(x + size - 0.5, y + 0.5, x + 0.5, y + size - 0.5);
        }
    }

    // Helper function to wrap text
    function wrapText(text, maxWidth) {
        return doc.splitTextToSize(text.toString(), maxWidth);
    }

    // Calculate skill scores
    function calculateSkillScores(skillName, isGeneral = false) {
        const skillData = isGeneral ? charData.generalSkills[skillName] : charData.combat.combatSkills[skillName];
        const rank = skillData?.rank || 0;
        const bonus = isGeneral ? (skillData?.bonus || 0) : 0;

        const attributes = isGeneral ? SKILL_ATTRIBUTES.general[skillName] : SKILL_ATTRIBUTES.combat[skillName];

        const attr1Mod = charData.attributes[attributes[0]]?.modifier || 0;
        const attr2Mod = charData.attributes[attributes[1]]?.modifier || 0;

        const score1 = rank + attr1Mod + bonus;
        const score2 = rank + attr2Mod + bonus;

        return {
            rank: rank,
            score1: score1,
            score2: score2,
            attr1: attributes[0],
            attr2: attributes[1]
        };
    }

    // Format score with +/- sign
    function formatScore(score) {
        return score >= 0 ? `+${score}` : `${score}`;
    }

    // ==================== PAGE 1 ====================

    // Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('HEDGEWOOD CHARACTER SHEET', pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;

    // Character Info Row 1
    const charName = charData.characterInfo.characterName || '_______________';
    const playerName = charData.characterInfo.playerName || '_______________';
    const level = charData.characterInfo.level || 1;

    drawBox(margin, yPos, 80, 8, 'Character Name', charName, 10);
    drawBox(margin + 82, yPos, 60, 8, 'Player Name', playerName, 9);
    drawBox(margin + 144, yPos, 30, 8, 'Level', level.toString(), 10);
    yPos += 10;

    // Character Info Row 2
    const className = charData.characterInfo.multiClassName || '_______________';
    const species = charData.characterInfo.species ? (SPECIES[charData.characterInfo.species]?.name || charData.characterInfo.species) : '__________';
    const trade = charData.characterInfo.trade ? (TRADES[charData.characterInfo.trade]?.name || charData.characterInfo.trade) : '__________';

    drawBox(margin, yPos, 95, 8, 'Class', className, 9);
    drawBox(margin + 97, yPos, 45, 8, 'Species', species, 9);
    drawBox(margin + 144, yPos, 30, 8, 'Trade', trade, 8);
    yPos += 10;

    // === ATTRIBUTES SECTION ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('ATTRIBUTES', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    // Attributes in a row
    const attrBoxWidth = contentWidth / 4;
    const attrNames = ['Toughness', 'Reflexes', 'Intellect', 'Willpower'];
    let xPos = margin;

    attrNames.forEach((attrName, index) => {
        const attrKey = attrName.toLowerCase();
        const attrData = charData.attributes[attrKey];

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(attrName.toUpperCase(), xPos + (attrBoxWidth / 2), yPos, { align: 'center' });

        const scoreY = yPos + 2;
        drawBox(xPos, scoreY, attrBoxWidth * 0.3, 6, 'Score', attrData.score.toString(), 9);
        drawBox(xPos + (attrBoxWidth * 0.35), scoreY, attrBoxWidth * 0.3, 6, 'Mod', formatScore(attrData.modifier), 9);
        drawBox(xPos + (attrBoxWidth * 0.7), scoreY, attrBoxWidth * 0.28, 6, 'Def', attrData.defense.toString(), 9);

        xPos += attrBoxWidth + 0.5;
    });
    yPos += 10;

    // === HP AND RESOURCES ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('HIT POINTS & RESOURCES', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    // HP Bar
    const hpCurrent = charData.hitPoints.current;
    const hpMax = charData.hitPoints.maximum;
    const hpTemp = charData.hitPoints.temporary || 0;
    const bloodiedThreshold = charData.hitPoints.bloodiedThreshold;

    drawBox(margin, yPos, 35, 8, 'Current HP', hpCurrent.toString(), 10);
    drawBox(margin + 37, yPos, 35, 8, 'Max HP', hpMax.toString(), 10);
    drawBox(margin + 74, yPos, 35, 8, 'Temp HP', hpTemp.toString(), 10);
    drawBox(margin + 111, yPos, 35, 8, 'Bloodied', bloodiedThreshold.toString(), 10);
    yPos += 10;

    // === HIT DICE (Separate for each class) ===
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('HIT DICE', margin, yPos);
    yPos += 4;

    const class1Name = charData.characterInfo.class1 && CLASSES[charData.characterInfo.class1] ? CLASSES[charData.characterInfo.class1].name : 'Class 1';
    const class2Name = charData.characterInfo.class2 && CLASSES[charData.characterInfo.class2] ? CLASSES[charData.characterInfo.class2].name : 'Class 2';

    const class1Dice = charData.hitDice.class1;
    const class2Dice = charData.hitDice.class2;

    drawBox(margin, yPos, 85, 7, `${class1Name} (${class1Dice.dieType})`, `${class1Dice.current} / ${class1Dice.total}`, 9);
    drawBox(margin + 88, yPos, 85, 7, `${class2Name} (${class2Dice.dieType})`, `${class2Dice.current} / ${class2Dice.total}`, 9);
    yPos += 9;

    // === COMBAT STATS ===
    const ac = charData.combat.armorClass || 10;
    const speed = charData.combat.speed || 6;

    drawBox(margin, yPos, 35, 7, 'Armor Class', ac.toString(), 10);
    drawBox(margin + 37, yPos, 35, 7, 'Speed', speed.toString(), 10);
    yPos += 9;

    // === COMBAT SKILLS ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('COMBAT SKILLS', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    const combatSkills = ['melee', 'ranged', 'spellcraft'];
    combatSkills.forEach(skillName => {
        const scores = calculateSkillScores(skillName, false);
        const skillLabel = skillName.charAt(0).toUpperCase() + skillName.slice(1);

        doc.setFont('helvetica', 'bold');
        doc.text(skillLabel, margin + 2, yPos + 3);

        doc.setFont('helvetica', 'normal');
        const skillText = `${formatScore(scores.rank)} | ${formatScore(scores.score1)} | ${formatScore(scores.score2)}`;
        doc.text(skillText, margin + 35, yPos + 3);

        doc.setFontSize(7);
        doc.setTextColor(100);
        doc.text(`(${scores.attr1.substring(0, 4)}/${scores.attr2.substring(0, 4)})`, margin + 75, yPos + 3);
        doc.setFontSize(8);
        doc.setTextColor(0);

        yPos += 5;
    });
    yPos += 2;

    // === GENERAL SKILLS ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('GENERAL SKILLS', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    const generalSkills = ['maneuver', 'sneak', 'study', 'craft', 'barter', 'endure', 'deceive'];
    generalSkills.forEach(skillName => {
        const scores = calculateSkillScores(skillName, true);
        const skillLabel = skillName.charAt(0).toUpperCase() + skillName.slice(1);

        doc.setFont('helvetica', 'bold');
        doc.text(skillLabel, margin + 2, yPos + 3);

        doc.setFont('helvetica', 'normal');
        const skillText = `${formatScore(scores.rank)} | ${formatScore(scores.score1)} | ${formatScore(scores.score2)}`;
        doc.text(skillText, margin + 35, yPos + 3);

        doc.setFontSize(7);
        doc.setTextColor(100);
        doc.text(`(${scores.attr1.substring(0, 4)}/${scores.attr2.substring(0, 4)})`, margin + 75, yPos + 3);
        doc.setFontSize(8);
        doc.setTextColor(0);

        yPos += 5;
    });
    yPos += 2;

    // === MAGICK POINTS (as checkboxes) ===
    if (charData.magickPoints.class1.hasSpellcasting || charData.magickPoints.class2.hasSpellcasting) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('MAGICK POINTS', margin, yPos);
        yPos += 1;
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, margin + contentWidth, yPos);
        yPos += 4;

        doc.setFontSize(8);

        ['class1', 'class2'].forEach(classSlot => {
            const mpData = charData.magickPoints[classSlot];
            if (!mpData.hasSpellcasting) return;

            const className = classSlot === 'class1' ? class1Name : class2Name;
            const maxMP = mpData.maximum || 0;
            const currentMP = mpData.current || 0;

            doc.setFont('helvetica', 'bold');
            doc.text(`${className}:`, margin + 2, yPos + 3);
            doc.setFont('helvetica', 'normal');

            // Draw checkboxes
            let boxX = margin + 30;
            const boxY = yPos;
            for (let i = 0; i < maxMP; i++) {
                drawCheckbox(boxX, boxY, 3, i < (maxMP - currentMP));
                boxX += 4;

                // Wrap to next line if needed
                if (boxX > margin + contentWidth - 5 && i < maxMP - 1) {
                    boxX = margin + 30;
                    yPos += 4;
                }
            }

            yPos += 5;
        });
        yPos += 2;
    }

    // === WEAPONS & ARMOR ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('WEAPONS', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    if (charData.equipment.weapons.length > 0) {
        charData.equipment.weapons.forEach(weapon => {
            const weaponText = `${weapon.name} | ${weapon.range} | Damage: ${weapon.damage}${weapon.size ? ' (' + weapon.size + ')' : ''}${weapon.properties ? ' | ' + weapon.properties : ''}`;
            const wrapped = wrapText(weaponText, contentWidth - 4);
            wrapped.forEach(line => {
                doc.text(line, margin + 2, yPos + 2);
                yPos += 3.5;
            });
        });
    } else {
        doc.setTextColor(150);
        doc.text('No weapons equipped', margin + 2, yPos + 2);
        doc.setTextColor(0);
        yPos += 4;
    }
    yPos += 2;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('ARMOR', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    if (charData.equipment.armor.length > 0) {
        charData.equipment.armor.forEach(armor => {
            const armorText = `${armor.name} | AC +${armor.acBonus} | Speed -${armor.speedReduction} | DR: ${armor.damageReduction || 'None'}`;
            doc.text(armorText, margin + 2, yPos + 2);
            yPos += 4;
        });
    } else {
        doc.setTextColor(150);
        doc.text('No armor equipped', margin + 2, yPos + 2);
        doc.setTextColor(0);
        yPos += 4;
    }
    yPos += 2;

    // === KEY FEATURES (Page 1) ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('KEY FEATURES', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');

    // Extract first 3 levels of features from each class as "key features"
    const maxYPage1 = pageHeight - 20;
    let featuresText = '';

    if (charData.characterInfo.class1 && CLASSES[charData.characterInfo.class1]) {
        const classData = CLASSES[charData.characterInfo.class1];
        featuresText += `${classData.name}: `;
        for (let i = 1; i <= Math.min(3, charData.characterInfo.level); i++) {
            if (classData.features[`level${i}`]) {
                featuresText += classData.features[`level${i}`] + ' ';
            }
        }
        featuresText += '\n';
    }

    const wrappedFeatures = wrapText(featuresText, contentWidth - 4);
    wrappedFeatures.forEach(line => {
        if (yPos < maxYPage1) {
            doc.text(line, margin + 2, yPos + 2);
            yPos += 3;
        }
    });
    yPos += 2;

    // === NOTES SECTION (Page 1) ===
    if (yPos < maxYPage1 - 15) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('NOTES', margin, yPos);
        yPos += 1;
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, margin + contentWidth, yPos);
        yPos += 4;

        // Draw lines for notes
        const notesLines = Math.floor((maxYPage1 - yPos) / 5);
        for (let i = 0; i < notesLines; i++) {
            doc.setDrawColor(200);
            doc.setLineWidth(0.1);
            doc.line(margin, yPos, margin + contentWidth, yPos);
            yPos += 5;
        }
    }

    // ==================== PAGE 2 ====================
    doc.addPage();
    yPos = margin;

    // Page 2 Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('CHARACTER FEATURES & ABILITIES', pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;

    // Character name header on page 2
    doc.setFontSize(10);
    doc.text(`${charName} - Level ${level}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 6;

    // === SPECIES FEATURES ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('SPECIES FEATURES', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    const speciesFeatures = charData.features.speciesFeatures || 'None selected';
    const wrappedSpecies = wrapText(speciesFeatures, contentWidth - 4);
    wrappedSpecies.forEach(line => {
        doc.text(line, margin + 2, yPos + 2);
        yPos += 3.5;
    });
    yPos += 3;

    // === TRADE FEATURES ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('TRADE FEATURES', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    const tradeFeatures = charData.features.tradeFeatures || 'None selected';
    const wrappedTrade = wrapText(tradeFeatures, contentWidth - 4);
    wrappedTrade.forEach(line => {
        doc.text(line, margin + 2, yPos + 2);
        yPos += 3.5;
    });
    yPos += 3;

    // === CLASS FEATURES (Full) ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('CLASS FEATURES', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    // Class 1 Features
    if (charData.features.classFeatures.class1Features.generalFeatures) {
        doc.setFont('helvetica', 'bold');
        doc.text(`${class1Name}:`, margin + 2, yPos + 2);
        yPos += 4;
        doc.setFont('helvetica', 'normal');

        const class1Features = charData.features.classFeatures.class1Features.generalFeatures;
        const wrappedClass1 = wrapText(class1Features, contentWidth - 4);
        wrappedClass1.forEach(line => {
            doc.text(line, margin + 2, yPos + 2);
            yPos += 3.5;
        });
        yPos += 2;
    }

    // Class 2 Features
    if (charData.features.classFeatures.class2Features.generalFeatures) {
        doc.setFont('helvetica', 'bold');
        doc.text(`${class2Name}:`, margin + 2, yPos + 2);
        yPos += 4;
        doc.setFont('helvetica', 'normal');

        const class2Features = charData.features.classFeatures.class2Features.generalFeatures;
        const wrappedClass2 = wrapText(class2Features, contentWidth - 4);
        wrappedClass2.forEach(line => {
            doc.text(line, margin + 2, yPos + 2);
            yPos += 3.5;
        });
        yPos += 2;
    }

    // === BLOODIED FEATURES ===
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('BLOODIED FEATURES', margin, yPos);
    yPos += 1;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 4;

    doc.setFontSize(8);

    // Class 1 Bloodied
    const class1Bloodied = charData.features.classFeatures.class1Features.bloodiedEffect;
    if (class1Bloodied && class1Bloodied.name) {
        doc.setFont('helvetica', 'bold');
        doc.text(`${class1Name} - ${class1Bloodied.name}:`, margin + 2, yPos + 2);
        yPos += 4;
        doc.setFont('helvetica', 'normal');

        const bloodiedText = `${class1Bloodied.description} ${class1Bloodied.mechanics || ''}`;
        const wrappedBloodied1 = wrapText(bloodiedText, contentWidth - 4);
        wrappedBloodied1.forEach(line => {
            doc.text(line, margin + 2, yPos + 2);
            yPos += 3.5;
        });
        yPos += 2;
    }

    // Class 2 Bloodied
    const class2Bloodied = charData.features.classFeatures.class2Features.bloodiedEffect;
    if (class2Bloodied && class2Bloodied.name) {
        doc.setFont('helvetica', 'bold');
        doc.text(`${class2Name} - ${class2Bloodied.name}:`, margin + 2, yPos + 2);
        yPos += 4;
        doc.setFont('helvetica', 'normal');

        const bloodiedText = `${class2Bloodied.description} ${class2Bloodied.mechanics || ''}`;
        const wrappedBloodied2 = wrapText(bloodiedText, contentWidth - 4);
        wrappedBloodied2.forEach(line => {
            doc.text(line, margin + 2, yPos + 2);
            yPos += 3.5;
        });
        yPos += 2;
    }

    // === CROSS-CLASS FEATURES ===
    const class1Id = charData.characterInfo.class1;
    const class2Id = charData.characterInfo.class2;
    const crossClassKey = getCrossClassKey(class1Id, class2Id);
    const crossClassData = crossClassKey && CROSS_CLASS_FEATURES ? CROSS_CLASS_FEATURES[crossClassKey] : null;

    if (crossClassData && crossClassData.name !== 'TBD') {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('CROSS-CLASS FEATURES', margin, yPos);
        yPos += 1;
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, margin + contentWidth, yPos);
        yPos += 4;

        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(`${crossClassData.name}:`, margin + 2, yPos + 2);
        yPos += 4;
        doc.setFont('helvetica', 'normal');

        if (charData.characterInfo.level >= 3 && crossClassData.level3 && crossClassData.level3 !== 'TBD') {
            doc.text(`Level 3: ${crossClassData.level3}`, margin + 2, yPos + 2);
            yPos += 4;
        }

        if (charData.characterInfo.level >= 8 && crossClassData.level8 && crossClassData.level8 !== 'TBD') {
            doc.text(`Level 8: ${crossClassData.level8}`, margin + 2, yPos + 2);
            yPos += 4;
        }
        yPos += 2;
    }

    // === INVENTORY ===
    if (charData.equipment.inventory.length > 0) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('INVENTORY', margin, yPos);
        yPos += 1;
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, margin + contentWidth, yPos);
        yPos += 4;

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');

        charData.equipment.inventory.forEach(item => {
            const itemText = `${item.name} (x${item.quantity}) - ${item.weight} lbs`;
            doc.text(itemText, margin + 2, yPos + 2);
            yPos += 4;
        });
        yPos += 2;
    }

    // === NOTES SECTION (Page 2) ===
    const maxYPage2 = pageHeight - 10;
    if (yPos < maxYPage2 - 15) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('ADDITIONAL NOTES', margin, yPos);
        yPos += 1;
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, margin + contentWidth, yPos);
        yPos += 4;

        // Draw lines for notes
        const notesLines = Math.floor((maxYPage2 - yPos) / 5);
        for (let i = 0; i < notesLines; i++) {
            doc.setDrawColor(200);
            doc.setLineWidth(0.1);
            doc.line(margin, yPos, margin + contentWidth, yPos);
            yPos += 5;
        }
    }

    // Save the PDF
    const fileName = `${charData.characterInfo.characterName || 'character'}_sheet.pdf`;
    doc.save(fileName);

    showNotification('Character sheet PDF generated!', 'success');
}

// Add export button to the UI
function addPDFExportButton() {
    const exportBtn = document.querySelector('[data-action="export-character"]');
    if (!exportBtn) return;

    const pdfBtn = document.createElement('button');
    pdfBtn.className = 'btn-export';
    pdfBtn.textContent = 'Export PDF';
    pdfBtn.setAttribute('data-action', 'export-pdf');
    pdfBtn.addEventListener('click', generateCharacterSheetPDF);

    exportBtn.parentNode.insertBefore(pdfBtn, exportBtn.nextSibling);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPDFExportButton);
} else {
    addPDFExportButton();
}
