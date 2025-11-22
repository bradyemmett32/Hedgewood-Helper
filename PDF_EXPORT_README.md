# Character Sheet PDF Export Feature

## Overview
The Hedgewood Helper now includes a comprehensive PDF export feature that generates a printer-friendly, 2-page character sheet optimized for quick reference at the table.

## How to Use
1. Fill out your character information in the web interface
2. Click the **"Export PDF"** button (next to the regular Export button)
3. The PDF will automatically download to your device
4. Print or save for use during game sessions

## PDF Layout

### Page 1: Quick Reference Stats & Equipment

**Character Identity**
- Character Name, Player Name, Level
- Class (with multi-class name), Species, Trade

**Attributes**
- All four attributes (Toughness, Reflexes, Intellect, Willpower)
- Score, Modifier, and Defense values clearly displayed

**Hit Points & Resources**
- Current HP, Max HP, Temporary HP, Bloodied threshold
- Hit Dice for both classes shown separately with die type
- Armor Class and Speed

**Combat Skills**
- Melee, Ranged, and Spellcraft
- Format: `Skill Name +Ranks | +Score1 | +Score2`
- Example: `Melee +3 | +5 | +4` for a character with 3 ranks in Melee, Toughness modifier +2, and Reflexes modifier +1
- Shows which attributes apply to each skill

**General Skills**
- All 7 general skills (Maneuver, Sneak, Study, Craft, Barter, Endure, Deceive)
- Same format as combat skills: `+Ranks | +Score1 | +Score2`
- Calculation: Ranks + Attribute Modifier + Bonus

**Magick Points**
- Displayed as checkable boxes/circles
- Separate tracker for each spellcasting class
- Number of boxes equals maximum Magick Points at current level

**Weapons**
- All weapons from inventory
- Format: `Weapon Name | Range | Damage: [dice] (size) | properties`
- Shows damage dice and other weapon details

**Armor**
- All armor from inventory
- Shows AC bonus, speed reduction, and damage reduction

**Key Features**
- First 3 levels of features for quick reference during play

**Notes Section**
- Blank lined area for player notes

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
*Version 1.1.0 - Added 2025-11-22*
