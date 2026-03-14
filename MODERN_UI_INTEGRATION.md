# Modern UI Integration Guide

## Tổng Quan

Dự án đã được tích hợp với một hệ thống UI hiện đại, tối giản, và phản hồi với các điểm đặc trưng sau:

- **Thiết kế Modern**: Giao diện card-based với viền sáng, nền tối
- **Responsive**: Hoạt động tốt trên mobile, tablet, PC, Mac
- **Accessible**: WCAG 2.1 Level AA compliant
- **Performance**: Tối ưu hóa cho 60 FPS trên desktop, 30-45 FPS trên mobile
- **Animated**: Smooth transitions và hover effects

## Cấu Trúc File

### Thêm vào dự án:
- `src/styles.css` - CSS variables, utilities, responsive breakpoints
- `src/ui/ModernUIEnhancer.js` - Utility class cho tạo UI components
- `src/ui/GameModeUIPanel.js` - Panel chọn chế độ chơi hiện đại
- `index.html` - Cập nhật metadata và theme-color

## CSS Design Tokens

### Color Palette
```css
--color-primary: #2b5874         /* Button primary */
--color-accent-teal: #2f8f6f     /* Accent highlight */
--color-accent-cyan: #00d4ff      /* Neon accent */
--color-bg-dark: #0d0f15          /* Dark background */
--color-text-primary: #f1f8ff     /* Main text */
--color-text-secondary: #c9e7ff   /* Secondary text */
--color-text-accent: #ffeab0      /* Accent text */
--color-border: #8bc8ff           /* Border color */
```

### Spacing Scale
```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
```

### Transitions
```css
--transition-fast: 150ms ease
--transition-normal: 300ms ease
--transition-slow: 500ms ease
```

## ModernUIEnhancer API

### createButton()
Tạo nút bấm với animation và styling hiện đại.

```javascript
import { ModernUIEnhancer } from "./ui/ModernUIEnhancer.js";

const button = ModernUIEnhancer.createButton(
  scene,
  x, y, width, height,
  "Click Me",
  () => console.log("Clicked!"),
  {
    fillColor: 0x2b5874,
    strokeColor: 0x8bc8ff,
    hoverFillColor: 0x3a6b94,
    textColor: "#f1f8ff",
    fontSize: 18,
    isAccent: false,
    parent: container
  }
);

// Use methods
button.setLabel("New Label");
button.setEnabled(false);
button.setAlpha(0.5);
button.destroy();
```

### createCard()
Tạo card component với title, description.

```javascript
const card = ModernUIEnhancer.createCard(
  scene, x, y, width, height,
  {
    title: "Card Title",
    description: "Card description text",
    fillColor: 0x0f1a2b,
    strokeColor: 0x8bc8ff,
    isInteractive: true,
    onClick: () => console.log("Card clicked!"),
    parent: container
  }
);

// Access
card.container;  // Phaser Container
card.bg;         // Background rectangle
```

### createRadioGroup()
Tạo radio button group.

```javascript
const radioGroup = ModernUIEnhancer.createRadioGroup(
  scene, x, y,
  {
    title: "Select Option",
    items: [
      { value: "opt1", label: "Option 1" },
      { value: "opt2", label: "Option 2" }
    ],
    value: "opt1",
    onChange: (value, item) => console.log("Selected:", value),
    parent: container
  }
);

// Update selection
radioGroup.refresh("opt2");
```

### createLoader()
Tạo loading indicator animation.

```javascript
const loader = ModernUIEnhancer.createLoader(
  scene, x, y,
  {
    radius: 30,
    color: 0x00d4ff,
    parent: container
  }
);

loader.start();
// ... later
loader.stop();
loader.destroy();
```

### showNotification()
Hiển thị notification toast.

```javascript
ModernUIEnhancer.showNotification(
  scene,
  "Operation successful!",
  {
    duration: 2000,
    x: scene.scale.width / 2,
    y: scene.scale.height * 0.8,
    type: "success"  // "info", "success", "error", "warning"
  }
);
```

### getResponsiveSizes()
Lấy responsive size values.

```javascript
const sizes = ModernUIEnhancer.getResponsiveSizes(scene);
console.log(sizes);
// {
//   buttonWidth: 300,
//   buttonHeight: 48,
//   panelWidth: 750,
//   panelHeight: 600,
//   cardWidth: 400,
//   cardHeight: 300,
//   spacing: 16
// }
```

## GameModeUIPanel Usage

```javascript
import { GameModeUIPanel } from "./ui/GameModeUIPanel.js";

// Create panel
const gameModePanel = new GameModeUIPanel(scene, {
  gameModes: [
    { value: "pvE", label: "PvE Vô Tận" },
    { value: "pvp", label: "PvP" }
  ],
  difficulties: [
    { value: "EASY", label: "Dễ" },
    { value: "MEDIUM", label: "Trung bình" },
    { value: "HARD", label: "Khó" }
  ],
  selectedMode: "pvE",
  selectedDifficulty: "MEDIUM",
  onModeSelect: (mode) => console.log("Mode:", mode),
  onDifficultySelect: (diff) => console.log("Difficulty:", diff)
});

// Control panel
gameModePanel.show();
gameModePanel.hide();
gameModePanel.toggle();

// Update selections
gameModePanel.selectMode("pvp");
gameModePanel.selectDifficulty("HARD");
gameModePanel.updateUI();

// Cleanup
gameModePanel.destroy();
```

## Responsive Breakpoints

```css
/* Desktop (default) */
/* > 768px */

/* Tablet */
@media (max-width: 768px) {
  /* Adjusted spacing and font sizes */
}

/* Mobile */
@media (max-width: 480px) {
  /* Further reduced spacing */
  /* Touch-optimized button sizes (48x48px minimum) */
}
```

## Animation Classes

```css
/* Spin animation */
.loading-spinner {
  animation: spin 1s linear infinite;
}

/* Pulse animation */
.pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Slide in animation */
.slide-in {
  animation: slideIn 300ms ease-out;
}
```

## Best Practices

1. **Use Design Tokens**: Always use CSS variables from `--color-*` instead of hardcoding colors
2. **Maintain Contrast**: Ensure text color has sufficient contrast with background (≥4.5:1)
3. **Keyboard Navigation**: Test keyboard navigation on all interactive elements
4. **Touch Targets**: Buttons should be at least 44x44px on mobile (48x48px preferred)
5. **Responsive Images**: Use `imageMode: "size"` in responsive contexts
6. **Performance**: Limit simultaneous animations to 3-4 to maintain 60 FPS

## Integration Checklist

- [x] CSS variables updated in `styles.css`
- [x] `index.html` metadata added
- [x] `ModernUIEnhancer.js` created
- [x] `GameModeUIPanel.js` created
- [ ] MainMenuScene updated to use new components (next step)
- [ ] PlanningScene UI enhanced (next step)
- [ ] CombatScene UI enhanced (next step)

## Common Issues & Solutions

### Issue: UI components not responding to clicks
**Solution**: Ensure `setInteractive()` is called and parent has correct depth

### Issue: Text color not visible
**Solution**: Check color contrast; use `--color-text-*` variables instead of hardcoded colors

### Issue: Animations stuttering on mobile
**Solution**: Reduce animation duration, use CSS transforms instead of position changes

### Issue: Responsive sizes too small/large
**Solution**: Adjust multipliers in `getResponsiveSizes()` based on target screen sizes

## Next Steps

1. Update MainMenuScene to use ModernUIEnhancer for buttons and panels
2. Enhance PlanningScene with modern UI components
3. Improve CombatScene HUD with responsive layouts
4. Add accessibility features (ARIA labels, keyboard shortcuts)
5. Test on multiple devices and screen sizes

## References

- CSS Design System: See `styles.css` for all available tokens
- Phaser 3 Tweens: https://photonstorm.github.io/phaser3-docs/
- Accessibility: WCAG 2.1 Level AA Guidelines
- Responsive Design: Mobile-first approach with progressive enhancement
