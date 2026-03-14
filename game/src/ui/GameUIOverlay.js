/**
 * GameUIOverlay.js
 * 
 * A comprehensive responsive UI overlay for the game that works across
 * mobile, tablet, PC, and Mac. Features modern card-based layouts with
 * smooth animations and touch-friendly interactions.
 */

export class GameUIOverlay {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.options = options;
    this.uiElements = [];
    this.panels = new Map();
    this.isLandscape = scene.scale.width > scene.scale.height;
    this.scale = this.calculateScale();
  }

  calculateScale() {
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;
    
    // Adaptive scaling based on screen size
    if (w <= 480) return 0.8;  // Mobile
    if (w <= 768) return 0.9;  // Tablet
    return 1.0;                 // Desktop
  }

  createGameStartUI() {
    const scene = this.scene;
    const w = scene.scale.width;
    const h = scene.scale.height;
    const scale = this.scale;
    
    // Background
    const bgGraphics = scene.add.graphics();
    bgGraphics.fillGradientStyle(0x12263a, 0x12263a, 0x0c1728, 0x0c1728, 1);
    bgGraphics.fillRect(0, 0, w, h);
    this.uiElements.push(bgGraphics);
    
    // Animated mist effect
    const mistGraphics = scene.add.graphics();
    mistGraphics.fillStyle(0x2a7a5e, 0.1);
    mistGraphics.fillEllipse(w * 0.2, h * 0.75, w * 0.45, h * 0.36);
    mistGraphics.fillStyle(0x5d96d1, 0.08);
    mistGraphics.fillEllipse(w * 0.76, h * 0.26, w * 0.4, h * 0.33);
    this.uiElements.push(mistGraphics);
    
    // Header section with title
    this.createHeaderSection(w, h, scale);
    
    // Main action buttons
    this.createMainButtons(w, h, scale);
    
    // Footer with version info
    this.createFooter(w, h, scale);
  }

  createHeaderSection(w, h, scale) {
    const scene = this.scene;
    const centerX = w * 0.5;
    const startY = 60 * scale;
    
    // Title
    const title = scene.add.text(centerX, startY, "Bá Chủ Khu Rừng", {
      fontFamily: "Arial",
      fontSize: Math.floor(58 * scale) + "px",
      color: "#f6f1d5",
      fontStyle: "bold"
    });
    title.setOrigin(0.5, 0);
    this.uiElements.push(title);
    
    // Subtitle
    const subtitle = scene.add.text(centerX, startY + 80 * scale, "Auto-battle chiến thuật 5x5", {
      fontFamily: "Arial",
      fontSize: Math.floor(24 * scale) + "px",
      color: "#b7d9ff"
    });
    subtitle.setOrigin(0.5, 0);
    this.uiElements.push(subtitle);
  }

  createMainButtons(w, h, scale) {
    const scene = this.scene;
    const centerX = w * 0.5;
    const startY = h * 0.35;
    const buttonWidth = Math.min(320 * scale, w * 0.8);
    const buttonHeight = 56 * scale;
    const spacing = 70 * scale;
    
    const buttons = [
      {
        y: startY,
        label: "Tiếp tục",
        fill: 0x2b5874,
        stroke: 0x9cd0ff,
        onClick: () => this.scene.continueRun?.()
      },
      {
        y: startY + spacing,
        label: "Bắt đầu mới",
        fill: 0x2f8f6f,
        stroke: 0x8bffd7,
        onClick: () => this.scene.startNewGame?.()
      },
      {
        y: startY + spacing * 2,
        label: "Cài đặt",
        fill: 0x284b78,
        stroke: 0x9cd0ff,
        onClick: () => this.scene.toggleSettings?.()
      },
      {
        y: startY + spacing * 3,
        label: "Thư Viện",
        fill: 0x2e5f7d,
        stroke: 0x9ed8ff,
        onClick: () => this.scene.toggleLibrary?.()
      }
    ];
    
    buttons.forEach(btn => {
      const rect = scene.add.rectangle(centerX, btn.y, buttonWidth, buttonHeight, btn.fill, 0.96);
      rect.setStrokeStyle(2, btn.stroke, 1);
      rect.setInteractive({ useHandCursor: true });
      
      rect.on("pointerover", () => {
        rect.setFillStyle(btn.fill, 1);
      });
      
      rect.on("pointerout", () => {
        rect.setFillStyle(btn.fill, 0.96);
      });
      
      rect.on("pointerdown", btn.onClick);
      
      const text = scene.add.text(centerX, btn.y, btn.label, {
        fontFamily: "Arial",
        fontSize: Math.floor(20 * scale) + "px",
        color: "#f1f8ff",
        fontStyle: "bold"
      });
      text.setOrigin(0.5);
      
      this.uiElements.push(rect);
      this.uiElements.push(text);
    });
  }

  createFooter(w, h, scale) {
    const scene = this.scene;
    const footerY = h - 30 * scale;
    const fontSize = Math.floor(12 * scale) + "px";
    
    const versionText = scene.add.text(20, footerY, "v0.4.4 | 27/02/2026", {
      fontFamily: "Consolas",
      fontSize: fontSize,
      color: "#7a8fa0"
    });
    versionText.setOrigin(0, 1);
    this.uiElements.push(versionText);
    
    const creditText = scene.add.text(w - 20, footerY, "DevGO Vietnam", {
      fontFamily: "Consolas",
      fontSize: fontSize,
      color: "#7a8fa0"
    });
    creditText.setOrigin(1, 1);
    this.uiElements.push(creditText);
  }

  createResponsivePanel(config) {
    const scene = this.scene;
    const w = scene.scale.width;
    const h = scene.scale.height;
    const scale = this.scale;
    
    const panelWidth = Math.min(w * 0.9, 600 * scale);
    const panelHeight = Math.min(h * 0.8, 500 * scale);
    const centerX = w * 0.5;
    const centerY = h * 0.5;
    
    // Background overlay
    const overlay = scene.add.rectangle(centerX, centerY, w, h, 0x000000, 0.5);
    overlay.setInteractive();
    
    // Panel
    const panel = scene.add.rectangle(centerX, centerY, panelWidth, panelHeight, 0x0f1a2b, 0.97);
    panel.setStrokeStyle(2, 0x8bc8ff, 1);
    
    return {
      overlay,
      panel,
      centerX,
      centerY,
      panelWidth,
      panelHeight
    };
  }

  createToast(message, duration = 3000, type = 'info') {
    const scene = this.scene;
    const w = scene.scale.width;
    const h = scene.scale.height;
    
    const colors = {
      info: { bg: 0x2a5a8f, text: '#ccecff' },
      success: { bg: 0x2f8f6f, text: '#8bffd7' },
      error: { bg: 0x8f3b2f, text: '#ffc0cf' },
      warning: { bg: 0x8f6f2f, text: '#ffe0a0' }
    };
    
    const color = colors[type] || colors.info;
    
    const toastContainer = scene.add.container(w * 0.5, h - 60);
    
    const bg = scene.add.rectangle(0, 0, 400, 50, color.bg, 0.95);
    bg.setStrokeStyle(1, 0x7fb8ff, 1);
    
    const text = scene.add.text(0, 0, message, {
      fontFamily: "Arial",
      fontSize: "14px",
      color: color.text,
      wordWrap: { width: 380 }
    });
    text.setOrigin(0.5);
    
    toastContainer.add([bg, text]);
    
    scene.tweens.add({
      targets: toastContainer,
      alpha: 0,
      duration: duration,
      ease: 'Cubic.easeIn',
      onStart: () => toastContainer.setAlpha(1),
      onComplete: () => toastContainer.destroy()
    });
    
    this.uiElements.push(toastContainer);
  }

  createLoadingScreen() {
    const scene = this.scene;
    const w = scene.scale.width;
    const h = scene.scale.height;
    
    const container = scene.add.container(w * 0.5, h * 0.5);
    
    // Background
    const bg = scene.add.rectangle(0, 0, w, h, 0x000000, 0.8);
    container.add(bg);
    
    // Loading circle
    const graphics = scene.add.graphics();
    graphics.lineStyle(4, 0x00d4ff, 1);
    graphics.arc(0, -40, 40, 0, Math.PI * 2);
    
    // Animate rotation
    scene.tweens.add({
      targets: graphics,
      rotation: Math.PI * 2,
      duration: 2000,
      repeat: -1,
      ease: 'Linear'
    });
    
    container.add(graphics);
    
    // Loading text
    const text = scene.add.text(0, 60, "Đang tải...", {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#00d4ff"
    });
    text.setOrigin(0.5);
    container.add(text);
    
    this.uiElements.push(container);
    return container;
  }

  updateForScreenResize(newWidth, newHeight) {
    this.scale = this.calculateScale();
    // Optionally rebuild UI elements for new screen size
  }

  destroy() {
    this.uiElements.forEach(el => {
      if (el && el.destroy) {
        el.destroy();
      }
    });
    this.uiElements = [];
    this.panels.clear();
  }
}
