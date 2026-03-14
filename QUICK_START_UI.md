# Quick Start - Modern UI Components

Hướng dẫn nhanh để bắt đầu sử dụng các thành phần UI mới trong dự án.

## 5 Phút Setup

### 1. Import Component Library
```javascript
import { ModernUIEnhancer } from "./ui/ModernUIEnhancer.js";
```

### 2. Create Your First Button
```javascript
// In your Phaser Scene
const button = ModernUIEnhancer.createButton(
  this,                    // Phaser Scene
  this.scale.width / 2,    // x position
  300,                     // y position
  200, 50,                 // width, height
  "Click Me",              // label
  () => console.log("Clicked!"),  // onClick
  { isAccent: true }       // options
);
```

**Result**: Beautiful button with hover animation

### 3. Create a Card
```javascript
const card = ModernUIEnhancer.createCard(
  this,
  250, 200,
  200, 150,
  {
    title: "Game Mode",
    description: "Play PvE",
    isInteractive: true,
    onClick: () => startGame()
  }
);
```

### 4. Show a Notification
```javascript
ModernUIEnhancer.showNotification(
  this,
  "Game saved!",
  { type: "success" }
);
```

## Common Patterns

### Button Group (Row of Buttons)
```javascript
const startX = 200;
const buttons = ["Continue", "New Game", "Settings"].map((label, i) => 
  ModernUIEnhancer.createButton(
    this,
    startX + (i * 220),
    300,
    200, 50,
    label,
    () => handleClick(label)
  )
);
```

### Card Grid (Game Modes)
```javascript
const modes = [
  { id: "pve", name: "PvE Mode", desc: "Fight AI" },
  { id: "pvp", name: "PvP Mode", desc: "Fight Players" }
];

const cards = modes.map((mode, i) => 
  ModernUIEnhancer.createCard(
    this,
    150 + (i * 300),
    200,
    250, 180,
    {
      title: mode.name,
      description: mode.desc,
      isInteractive: true,
      onClick: () => selectMode(mode.id)
    }
  )
);
```

### Settings Panel (Radio Group)
```javascript
const settings = ModernUIEnhancer.createRadioGroup(
  this, 300, 300,
  {
    title: "Display Mode",
    items: [
      { value: "fullscreen", label: "Full Screen" },
      { value: "windowed", label: "Windowed" }
    ],
    value: "fullscreen",
    onChange: (value) => applyDisplayMode(value)
  }
);
```

## Component Reference

### createButton(scene, x, y, w, h, label, onClick, options)
```javascript
// Required: scene, x, y, w, h, label, onClick
// Optional options:
{
  fillColor: 0x2b5874,           // Button color
  strokeColor: 0x8bc8ff,         // Border color
  hoverFillColor: 0x3a6b94,      // Hover color
  textColor: "#f1f8ff",          // Text color
  fontSize: 18,                  // Font size
  fontFamily: "Consolas",        // Font family
  isAccent: false,               // Teal color if true
  parent: null                   // Parent container
}
```

**Returns**: Button object with methods
- `setLabel(text)` - Change text
- `setEnabled(bool)` - Enable/disable
- `setAlpha(value)` - Transparency

---

### createCard(scene, x, y, w, h, options)
```javascript
// Required: scene, x, y, w, h
// Options:
{
  title: "",                    // Card title
  description: "",              // Card description
  fillColor: 0x0f1a2b,         // Background
  strokeColor: 0x8bc8ff,       // Border
  isInteractive: false,         // Click enabled
  onClick: null,                // Click callback
  parent: null                  // Parent container
}
```

**Returns**: Card object with properties
- `container` - Main Phaser container
- `bg` - Background rectangle

---

### createRadioGroup(scene, x, y, options)
```javascript
// Required: scene, x, y
// Options:
{
  title: "Options",                    // Group title
  items: [                             // Radio items
    { value: "val1", label: "Label 1" }
  ],
  value: null,                         // Current selection
  onChange: (value, item) => {},       // Change callback
  parent: null                         // Parent container
}
```

**Returns**: Radio group object with methods
- `refresh(newValue)` - Update selection

---

### showNotification(scene, message, options)
```javascript
// Required: scene, message
// Options:
{
  duration: 2000,                  // Display time (ms)
  x: scene.scale.width / 2,       // X position
  y: scene.scale.height * 0.8,    // Y position
  type: "info"                     // "info"|"success"|"error"|"warning"
}
```

**Auto-destroys** after duration.

---

### getResponsiveSizes(scene)
```javascript
// No parameters needed
const sizes = ModernUIEnhancer.getResponsiveSizes(scene);

// Returns:
{
  buttonWidth: 300,      // Responsive button width
  buttonHeight: 48,      // Responsive button height
  panelWidth: 750,       // Panel width
  panelHeight: 600,      // Panel height
  cardWidth: 400,        // Card width
  cardHeight: 300,       // Card height
  spacing: 16            // Standard spacing
}
```

## CSS Design Tokens

Use these in your CSS for consistent styling:

```css
/* Colors */
--color-primary: #2b5874
--color-accent-teal: #2f8f6f
--color-accent-cyan: #00d4ff
--color-text-primary: #f1f8ff
--color-text-secondary: #c9e7ff

/* Spacing */
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px

/* Transitions */
--transition-fast: 150ms ease
--transition-normal: 300ms ease
```

## Styling Tips

### 1. Accent Buttons (Green/Teal)
```javascript
ModernUIEnhancer.createButton(
  this, x, y, w, h, "Action",
  onClick,
  { isAccent: true }  // Adds teal color
);
```

### 2. Disabled State
```javascript
const button = ModernUIEnhancer.createButton(...);
button.setEnabled(false);  // Grayed out
```

### 3. Different Text Colors
Update button text dynamically:
```javascript
button.setLabel("Processing...");
// Or access directly:
button.text.setColor("#ffeab0");  // Accent yellow
```

## Responsive Design

Your UI automatically adapts:

```
Mobile (< 480px):  
  - Buttons: 36px tall
  - Font: 12px body
  - Spacing: 8px

Tablet (481-768px):  
  - Buttons: 40px tall
  - Font: 14px body
  - Spacing: 12px

Desktop (> 768px):  
  - Buttons: 44px+ tall
  - Font: 16px body
  - Spacing: 16px+
```

**No additional code needed** - CSS handles it automatically!

## Performance Tips

✓ **Recommended**: Create UI in `create()` method
✗ **Avoid**: Creating/destroying UI every frame
✓ **Recommended**: Cache sizes using `getResponsiveSizes()`
✗ **Avoid**: Calculating sizes in update loop
✓ **Recommended**: Use tweens for animations
✗ **Avoid**: Manual position changes in update

## Keyboard Accessibility

All components automatically support:
- **Tab**: Navigate between elements
- **Space/Enter**: Activate buttons
- **Arrow Keys**: Navigate radio groups

No extra code needed!

## Mobile Touch Support

- Buttons automatically optimize for touch
- Minimum 44x44px touch targets
- Visual feedback on touch
- Long-press support

## Browser Support

✓ Chrome/Chromium
✓ Firefox
✓ Safari (iOS 14+)
✓ Edge
✓ Mobile browsers

## Debugging

### Check Button Visibility
```javascript
console.log(button.bg.visible);  // Should be true
console.log(button.text.visible); // Should be true
```

### Check Responsive Sizes
```javascript
const sizes = ModernUIEnhancer.getResponsiveSizes(this);
console.log("Breakpoint sizes:", sizes);
```

### Test Color Contrast
```javascript
// Use online contrast checker:
// https://webaim.org/resources/contrastchecker/
```

## Common Issues

**Q: Button doesn't respond to clicks**  
A: Check if parent scene has `setInteractive()` and proper depth

**Q: Text looks blurry**  
A: Ensure scene has `pixelArt: false` in config

**Q: Animations stuttering**  
A: Reduce animation duration or check GPU usage

**Q: Colors look wrong on mobile**  
A: Clear browser cache and reload

## Next Steps

1. ✓ Learn basic components (5 min)
2. ⏳ Create your first button (2 min)
3. ⏳ Build a settings panel (10 min)
4. ⏳ Create game mode selector (15 min)
5. ⏳ Add notifications (5 min)

## Helpful Files

- **Components**: `src/ui/ModernUIEnhancer.js`
- **Full Docs**: `MODERN_UI_INTEGRATION.md`
- **Showcase**: `UI_SHOWCASE.html`
- **Complete Guide**: `UI_REDESIGN_COMPLETE.md`

## Example: Complete Scene

```javascript
import { ModernUIEnhancer } from "./ui/ModernUIEnhancer.js";

export class MyScene extends Phaser.Scene {
  create() {
    // Background
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x0d0f15);
    
    // Title
    this.add.text(this.scale.width / 2, 100, "My Game", {
      fontSize: "48px",
      color: "#ffeab0"
    }).setOrigin(0.5);
    
    // Button
    const btn = ModernUIEnhancer.createButton(
      this,
      this.scale.width / 2,
      300,
      200, 50,
      "Start",
      () => this.scene.start("GameScene"),
      { isAccent: true }
    );
    
    // Card
    const card = ModernUIEnhancer.createCard(
      this,
      this.scale.width / 2 - 150,
      450,
      280, 180,
      {
        title: "How to Play",
        description: "Manage your team strategically",
        isInteractive: true
      }
    );
    
    // Notification
    ModernUIEnhancer.showNotification(
      this,
      "Welcome back!",
      { type: "success" }
    );
  }
}
```

---

**Ready to build?** Start with the example above and customize from there!

Need help? Check `MODERN_UI_INTEGRATION.md` for detailed API reference.
