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
    yPos += 10;

    // Define column widths for 3-column layout
    const leftColWidth = 50;  // Left column for AC and Attributes
    const midColWidth = 75;   // Middle column for skills and combat
    const rightColWidth = 70; // Right column for character info
    const colGap = 2;         // Gap between columns

    const leftColX = margin;
    const midColX = leftColX + leftColWidth + colGap;
    const rightColX = midColX + midColWidth + colGap;

    // Store some common data
    const charName = charData.characterInfo.characterName || '_______________';
    const playerName = charData.characterInfo.playerName || '_______________';
    const level = charData.characterInfo.level || 1;
    const className = charData.characterInfo.multiClassName || '_______________';
    const species = charData.characterInfo.species ? (SPECIES[charData.characterInfo.species]?.name || charData.characterInfo.species) : '__________';
    const trade = charData.characterInfo.trade ? (TRADES[charData.characterInfo.trade]?.name || charData.characterInfo.trade) : '__________';
    const ac = charData.combat.armorClass || 10;
    const speed = charData.combat.speed || 6;
    const class1Name = charData.characterInfo.class1 && CLASSES[charData.characterInfo.class1] ? CLASSES[charData.characterInfo.class1].name : 'Class 1';
    const class2Name = charData.characterInfo.class2 && CLASSES[charData.characterInfo.class2] ? CLASSES[charData.characterInfo.class2].name : 'Class 2';
    const class1Dice = charData.hitDice.class1;
    const class2Dice = charData.hitDice.class2;
    const hpCurrent = charData.hitPoints.current;
    const hpMax = charData.hitPoints.maximum;
    const hpTemp = charData.hitPoints.temporary || 0;
    const bloodiedThreshold = charData.hitPoints.bloodiedThreshold;

    // ==================== LEFT COLUMN ====================
    let leftY = yPos;

    // === ARMOR CLASS BOX ===
    drawBox(leftColX, leftY, leftColWidth, 12, 'ARMOR CLASS (AC)', ac.toString(), 14);
    leftY += 15;

    // === ATTRIBUTES SECTION (Stacked Vertically) ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('ATTRIBUTES', leftColX + leftColWidth / 2, leftY, { align: 'center' });
    leftY += 1;
    doc.setLineWidth(0.5);
    doc.line(leftColX, leftY, leftColX + leftColWidth, leftY);
    leftY += 5;

    const attrNames = ['Toughness', 'Reflexes', 'Intellect', 'Willpower'];
    attrNames.forEach((attrName) => {
        const attrKey = attrName.toLowerCase();
        const attrData = charData.attributes[attrKey];

        // Attribute name
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(attrName.toUpperCase(), leftColX + leftColWidth / 2, leftY, { align: 'center' });
        leftY += 4;

        // Score, Mod, Def boxes stacked horizontally
        const attrBoxW = leftColWidth / 3;
        drawBox(leftColX, leftY, attrBoxW - 1, 8, 'Score', attrData.score.toString(), 9);
        drawBox(leftColX + attrBoxW, leftY, attrBoxW - 1, 8, 'Mod', formatScore(attrData.modifier), 9);
        drawBox(leftColX + attrBoxW * 2, leftY, attrBoxW, 8, 'Def', attrData.defense.toString(), 9);
        leftY += 11;
    });

    // === SHELLS SECTION ===
    leftY += 5;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('SHELLS', leftColX, leftY);
    leftY += 1;
    doc.setLineWidth(0.3);
    doc.line(leftColX, leftY, leftColX + leftColWidth, leftY);
    leftY += 4;

    // Draw empty shells box for player to fill in
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.rect(leftColX, leftY, leftColWidth, 20);
    leftY += 22;

    // ==================== MIDDLE COLUMN ====================
    let midY = yPos;

    // === HP AND RESOURCES ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('HIT POINTS', midColX, midY);
    midY += 1;
    doc.setLineWidth(0.5);
    doc.line(midColX, midY, midColX + midColWidth, midY);
    midY += 4;

    const hpBoxW = midColWidth / 2;
    drawBox(midColX, midY, hpBoxW - 1, 8, 'Current HP', hpCurrent.toString(), 10);
    drawBox(midColX + hpBoxW, midY, hpBoxW, 8, 'Max HP', hpMax.toString(), 10);
    midY += 10;
    drawBox(midColX, midY, hpBoxW - 1, 8, 'Temp HP', hpTemp.toString(), 10);
    drawBox(midColX + hpBoxW, midY, hpBoxW, 8, 'Bloodied', bloodiedThreshold.toString(), 10);
    midY += 13;

    // === HIT DICE ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('HIT DICE', midColX, midY);
    midY += 1;
    doc.setLineWidth(0.5);
    doc.line(midColX, midY, midColX + midColWidth, midY);
    midY += 4;

    drawBox(midColX, midY, midColWidth, 8, `${class1Name} (${class1Dice.dieType})`, `${class1Dice.current} / ${class1Dice.total}`, 9);
    midY += 9;
    drawBox(midColX, midY, midColWidth, 8, `${class2Name} (${class2Dice.dieType})`, `${class2Dice.current} / ${class2Dice.total}`, 9);
    midY += 13;

    // === COMBAT SKILLS ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('COMBAT SKILLS', midColX, midY);
    midY += 1;
    doc.setLineWidth(0.5);
    doc.line(midColX, midY, midColX + midColWidth, midY);
    midY += 4;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    const combatSkills = ['melee', 'ranged', 'spellcraft'];
    combatSkills.forEach(skillName => {
        const scores = calculateSkillScores(skillName, false);
        const skillLabel = skillName.charAt(0).toUpperCase() + skillName.slice(1);

        doc.setFont('helvetica', 'bold');
        doc.text(skillLabel, midColX + 2, midY + 3);

        doc.setFont('helvetica', 'normal');
        const skillText = `Rnk: ${formatScore(scores.rank)} | ${scores.attr1.substring(0, 3)}: ${formatScore(scores.score1)} | ${scores.attr2.substring(0, 3)}: ${formatScore(scores.score2)}`;
        doc.text(skillText, midColX + 20, midY + 3);

        midY += 5;
    });
    doc.setTextColor(0);
    midY += 5;

    // === GENERAL SKILLS ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('GENERAL SKILLS', midColX, midY);
    midY += 1;
    doc.setLineWidth(0.5);
    doc.line(midColX, midY, midColX + midColWidth, midY);
    midY += 4;

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');

    const generalSkills = ['maneuver', 'sneak', 'study', 'craft', 'barter', 'endure', 'deceive'];
    generalSkills.forEach(skillName => {
        const scores = calculateSkillScores(skillName, true);
        const skillLabel = skillName.charAt(0).toUpperCase() + skillName.slice(1);

        doc.setFont('helvetica', 'bold');
        doc.text(skillLabel, midColX + 2, midY + 3);

        doc.setFont('helvetica', 'normal');
        const skillText = `${formatScore(scores.rank)} | ${formatScore(scores.score1)} | ${formatScore(scores.score2)}`;
        doc.text(skillText, midColX + 20, midY + 3);

        midY += 4;
    });
    doc.setTextColor(0);
    midY += 5;

    // === WEAPONS ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('WEAPONS', midColX, midY);
    midY += 1;
    doc.setLineWidth(0.5);
    doc.line(midColX, midY, midColX + midColWidth, midY);
    midY += 4;

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');

    if (charData.equipment.weapons.length > 0) {
        charData.equipment.weapons.forEach(weapon => {
            const weaponText = `${weapon.name} | ${weapon.range} | Dmg: ${weapon.damage}`;
            doc.text(weaponText, midColX + 2, midY + 2);
            midY += 4;
        });
    } else {
        doc.setTextColor(150);
        doc.text('No weapons equipped', midColX + 2, midY + 2);
        doc.setTextColor(0);
        midY += 4;
    }
    midY += 3;

    // === ARMOR ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('ARMOR', midColX, midY);
    midY += 1;
    doc.setLineWidth(0.5);
    doc.line(midColX, midY, midColX + midColWidth, midY);
    midY += 4;

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');

    if (charData.equipment.armor.length > 0) {
        charData.equipment.armor.forEach(armor => {
            const armorText = `${armor.name} | AC +${armor.acBonus} | Spd -${armor.speedReduction}`;
            doc.text(armorText, midColX + 2, midY + 2);
            midY += 4;
        });
    } else {
        doc.setTextColor(150);
        doc.text('No armor equipped', midColX + 2, midY + 2);
        doc.setTextColor(0);
        midY += 4;
    }
    midY += 3;

    // ==================== RIGHT COLUMN ====================
    let rightY = yPos;
    const maxYPage1 = pageHeight - 20;  // Max Y position for page 1

    // === CHARACTER INFO ===
    drawBox(rightColX, rightY, rightColWidth, 8, 'Character Name', charName, 9);
    rightY += 9;
    drawBox(rightColX, rightY, rightColWidth, 8, 'Player Name', playerName, 9);
    rightY += 9;
    drawBox(rightColX, rightY, rightColWidth / 2 - 1, 8, 'Level', level.toString(), 9);
    drawBox(rightColX + rightColWidth / 2, rightY, rightColWidth / 2, 8, 'Speed', speed.toString(), 9);
    rightY += 13;

    // === SPECIES & TRADE ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('SPECIES & TRADE', rightColX, rightY);
    rightY += 1;
    doc.setLineWidth(0.5);
    doc.line(rightColX, rightY, rightColX + rightColWidth, rightY);
    rightY += 4;

    drawBox(rightColX, rightY, rightColWidth, 8, 'Species', species, 9);
    rightY += 9;
    drawBox(rightColX, rightY, rightColWidth, 8, 'Trade', trade, 9);
    rightY += 13;

    // === CLASSES ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('CLASSES', rightColX, rightY);
    rightY += 1;
    doc.setLineWidth(0.5);
    doc.line(rightColX, rightY, rightColX + rightColWidth, rightY);
    rightY += 4;

    drawBox(rightColX, rightY, rightColWidth, 8, 'Class 1', class1Name, 9);
    rightY += 9;
    drawBox(rightColX, rightY, rightColWidth, 8, 'Class 2', class2Name, 9);
    rightY += 9;
    drawBox(rightColX, rightY, rightColWidth, 8, 'Multi-Class', className, 8);
    rightY += 13;

    // === MAGICK POINTS ===
    if (charData.magickPoints.class1.hasSpellcasting || charData.magickPoints.class2.hasSpellcasting) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('MAGICK POINTS', rightColX, rightY);
        rightY += 1;
        doc.setLineWidth(0.5);
        doc.line(rightColX, rightY, rightColX + rightColWidth, rightY);
        rightY += 4;

        doc.setFontSize(8);

        ['class1', 'class2'].forEach(classSlot => {
            const mpData = charData.magickPoints[classSlot];
            if (!mpData.hasSpellcasting) return;

            const className = classSlot === 'class1' ? class1Name : class2Name;
            const maxMP = mpData.maximum || 0;
            const currentMP = mpData.current || 0;

            doc.setFont('helvetica', 'bold');
            doc.text(`${className}:`, rightColX, rightY + 3);
            rightY += 5;
            doc.setFont('helvetica', 'normal');

            // Draw checkboxes
            let boxX = rightColX;
            const boxY = rightY;
            const boxesPerRow = Math.floor(rightColWidth / 4);
            for (let i = 0; i < maxMP; i++) {
                drawCheckbox(boxX, boxY, 3, i < (maxMP - currentMP));
                boxX += 4;

                // Wrap to next line if needed
                if ((i + 1) % boxesPerRow === 0 && i < maxMP - 1) {
                    boxX = rightColX;
                    rightY += 4;
                }
            }

            rightY += 6;
        });
        rightY += 3;
    }

    // === CLASS FEATURES (Compact) ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('CLASS FEATURES', rightColX, rightY);
    rightY += 1;
    doc.setLineWidth(0.5);
    doc.line(rightColX, rightY, rightColX + rightColWidth, rightY);
    rightY += 4;

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');

    // Extract first 3 levels of features from each class as "key features"
    if (charData.characterInfo.class1 && CLASSES[charData.characterInfo.class1]) {
        const classData = CLASSES[charData.characterInfo.class1];
        doc.setFont('helvetica', 'bold');
        doc.text(`${classData.name}:`, rightColX, rightY + 2);
        rightY += 4;
        doc.setFont('helvetica', 'normal');

        for (let i = 1; i <= Math.min(3, charData.characterInfo.level); i++) {
            if (classData.features[`level${i}`]) {
                const featureText = `Lvl ${i}: ${classData.features[`level${i}`]}`;
                const wrapped = wrapText(featureText, rightColWidth - 2);
                wrapped.forEach(line => {
                    if (rightY < maxYPage1) {
                        doc.text(line, rightColX + 2, rightY + 2);
                        rightY += 3;
                    }
                });
            }
        }
        rightY += 2;
    }

    // === CROSS-CLASS FEATURES (Compact) ===
    const class1Id = charData.characterInfo.class1;
    const class2Id = charData.characterInfo.class2;
    const crossClassKey = getCrossClassKey(class1Id, class2Id);
    const crossClassData = crossClassKey && CROSS_CLASS_FEATURES ? CROSS_CLASS_FEATURES[crossClassKey] : null;

    if (crossClassData && crossClassData.name !== 'TBD' && rightY < maxYPage1 - 15) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('CROSS-CLASS', rightColX, rightY);
        rightY += 1;
        doc.setLineWidth(0.5);
        doc.line(rightColX, rightY, rightColX + rightColWidth, rightY);
        rightY += 4;

        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.text(`${crossClassData.name}`, rightColX, rightY + 2);
        rightY += 4;
        doc.setFont('helvetica', 'normal');

        if (charData.characterInfo.level >= 3 && crossClassData.level3 && crossClassData.level3 !== 'TBD') {
            const wrapped = wrapText(`Lvl 3: ${crossClassData.level3}`, rightColWidth - 2);
            wrapped.forEach(line => {
                if (rightY < maxYPage1) {
                    doc.text(line, rightColX + 2, rightY + 2);
                    rightY += 3;
                }
            });
        }

        if (charData.characterInfo.level >= 8 && crossClassData.level8 && crossClassData.level8 !== 'TBD') {
            const wrapped = wrapText(`Lvl 8: ${crossClassData.level8}`, rightColWidth - 2);
            wrapped.forEach(line => {
                if (rightY < maxYPage1) {
                    doc.text(line, rightColX + 2, rightY + 2);
                    rightY += 3;
                }
            });
        }
        rightY += 2;
    }

    // === BLOODIED FEATURES (Compact) ===
    if (rightY < maxYPage1 - 15) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('BLOODIED FEATURES', rightColX, rightY);
        rightY += 1;
        doc.setLineWidth(0.5);
        doc.line(rightColX, rightY, rightColX + rightColWidth, rightY);
        rightY += 4;

        doc.setFontSize(7);

        const class1Bloodied = charData.features.classFeatures.class1Features.bloodiedEffect;
        if (class1Bloodied && class1Bloodied.name) {
            doc.setFont('helvetica', 'bold');
            doc.text(`${class1Name}:`, rightColX, rightY + 2);
            rightY += 4;
            doc.setFont('helvetica', 'normal');

            const bloodiedText = `${class1Bloodied.name}`;
            const wrapped = wrapText(bloodiedText, rightColWidth - 2);
            wrapped.forEach(line => {
                if (rightY < maxYPage1) {
                    doc.text(line, rightColX + 2, rightY + 2);
                    rightY += 3;
                }
            });
        }
    }

    // Reset yPos for any remaining single-column content
    yPos = Math.max(leftY, midY, rightY) + 5;

    // === NOTES SECTION (Full Width at Bottom of Page 1) ===
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
    // Reuse crossClassKey and crossClassData from lines 443-444

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
    // Check if button already exists to prevent duplicates
    if (document.querySelector('[data-action="export-pdf"]')) {
        console.log('PDF Export button already exists');
        return;
    }

    const exportBtn = document.querySelector('[data-action="export-character"]');
    if (!exportBtn) {
        console.error('Export character button not found - cannot add PDF export button');
        return;
    }

    const pdfBtn = document.createElement('button');
    pdfBtn.className = 'btn-export';
    pdfBtn.textContent = 'Export PDF';
    pdfBtn.setAttribute('data-action', 'export-pdf');
    pdfBtn.addEventListener('click', generateCharacterSheetPDF);

    exportBtn.parentNode.insertBefore(pdfBtn, exportBtn.nextSibling);
    console.log('PDF Export button added successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPDFExportButton);
} else {
    addPDFExportButton();
}
