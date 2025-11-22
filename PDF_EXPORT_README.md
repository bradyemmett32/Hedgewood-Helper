# Character Sheet PDF Export Feature

## Overview
The Hedgewood Helper now includes a comprehensive PDF export feature that generates a printer-friendly, 2-page character sheet optimized for quick reference at the table.

## How to Use
1. Fill out your character information in the web interface
2. Click the **"Export PDF"** button (next to the regular Export button)
3. The PDF will automatically download to your device
4. Print or save for use during game sessions

## PDF Layout

### Page 1: Quick Reference Stats & Equipment (3-Column Layout)

The new layout uses a D&D-style 3-column design for better organization and visual appeal:

**LEFT COLUMN** (Narrow - Core Combat Stats)
- **Armor Class**: Large, prominent AC box at top
- **Attributes** (Stacked Vertically):
  - Toughness (Score, Mod, Def)
  - Reflexes (Score, Mod, Def)
  - Intellect (Score, Mod, Def)
  - Willpower (Score, Mod, Def)
- **Shells**: Empty box for tracking

**MIDDLE COLUMN** (Skills & Equipment)
- **Hit Points**: Current HP, Max HP, Temp HP, Bloodied threshold
- **Hit Dice**: Separate trackers for Class 1 and Class 2 with die types
- **Combat Skills**: Melee, Ranged, and Spellcraft
  - Format: `Skill Name | Rnk: +X | Attr1: +Y | Attr2: +Z`
- **General Skills**: All 7 skills (Maneuver, Sneak, Study, Craft, Barter, Endure, Deceive)
  - Compact format showing ranks and both attribute scores
- **Weapons**: Name, Range, Damage in compact format
- **Armor**: Name, AC bonus, Speed reduction

**RIGHT COLUMN** (Character Info & Features)
- **Character Identity**:
  - Character Name
  - Player Name
  - Level & Speed
- **Species & Trade**: Species and Trade info
- **Classes**: Class 1, Class 2, Multi-class name
- **Magick Points**: Checkbox trackers for each spellcasting class
- **Class Features**: First 3 levels of features for quick reference
- **Cross-Class Features**: Special abilities from class combinations
- **Bloodied Features**: Compact listing of bloodied effects

**FULL WIDTH** (Bottom of Page)
- **Notes Section**: Blank lined area for player notes

### Page 2: Detailed Features & Abilities

**Species Features**
- All racial abilities and traits

**Trade Features**
- All trade-specific abilities and bonuses

**Class Features (Full)**
- Complete listing of all class features up to current level
- Separated by class for easy reference

**Bloodied Features**
- Shows bloodied effects from BOTH classes
- Includes trigger conditions, effects, and mechanics
- Labeled clearly by class name

**Cross-Class Features**
- Special abilities gained from specific class combinations
- Shows features available at player's current level (levels 3 and 8)
- Only appears if character has a valid cross-class combination

**Inventory**
- Complete list of inventory items
- Shows item name, quantity, and weight

**Additional Notes**
- More blank lined space for player notes and session tracking

## Design Philosophy

**Printer-Friendly**
- Clean black and white design
- Efficient ink usage
- Clear borders and sections

**Quick Reference**
- Key combat stats on page 1 for fast access during encounters
- Detailed abilities on page 2 for reference between turns
- Logical grouping of related information

**Complete Information**
- All character data included
- No need to reference the web app during play
- Read-only values for stability

## Technical Details

- Generated using jsPDF library
- Letter-sized format (8.5" x 11")
- Portrait orientation
- All calculations performed automatically based on character data
- File naming: `[CharacterName]_sheet.pdf`

## Future Enhancements
Potential improvements for future versions:
- Editable PDF fields for tracking HP/MP changes
- Optional condensed single-page layout
- Custom styling options
- Spell list integration for spellcasters

## Support
For issues or feature requests, please check the character sheet web interface or consult the game master.

---
*Version 2.0.0 - Redesigned with 3-column layout - 2025-11-22*
