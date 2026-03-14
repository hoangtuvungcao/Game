/**
 * ModernUIEnhancer.js - Utilities for enhancing the game UI with modern design elements
 * This module provides methods to add responsive, accessible UI components with animations
 */

export class ModernUIEnhancer {
  /**
   * Create an enhanced button with modern styling and animations
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} w - Button width
   * @param {number} h - Button height
   * @param {string} label - Button label text
   * @param {Function} onClick - Click callback
   * @param {Object} options - Additional options
   * @returns {Object} Button object with methods
   */
  static createButton(scene, x, y, w, h, label, onClick, options = {}) {
    const {
      fillColor = 0x2b5874,
      strokeColor = 0x8bc8ff,
      hoverFillColor = 0x3a6b94,
      textColor = "#f1f8ff",
      fontSize = 18,
      fontFamily = "Consolas",
      isAccent = false,
      parent = null
    } = options;

    const actualFill = isAccent ? 0x2f8f6f : fillColor;
    const actualStroke = isAccent ? 0x00d4ff : strokeColor;
    const actualHover = isAccent ? 0x3da47a : hoverFillColor;

    const bg = scene.add.rectangle(x, y, w, h, actualFill, 0.96);
    bg.setStrokeStyle(2, actualStroke, 1);
    bg.setInteractive({ useHandCursor: true });

    const text = scene.add.text(x, y, label, {
      fontFamily,
      fontSize: `${fontSize}px`,
      color: textColor,
      align: "center"
    }).setOrigin(0.5);

    const button = {
      bg,
      text,
      enabled: true,
      isHovered: false,
      baseFill: actualFill,
      baseStroke: actualStroke,
      hoverFill: actualHover,

      setLabel: (newLabel) => {
        text.setText(newLabel);
      },

      setEnabled: (enabled) => {
        button.enabled = !!enabled;
        if (enabled) {
          bg.setFillStyle(actualFill, 0.96);
          bg.setStrokeStyle(2, actualStroke, 1);
          text.setColor(textColor);
        } else {
          bg.setFillStyle(0x3a3a3a, 0.82);
          bg.setStrokeStyle(2, 0x6e6e6e, 1);
          text.setColor("#aeb5bd");
        }
      },

      setAlpha: (alpha) => {
        bg.setAlpha(alpha);
        text.setAlpha(alpha);
      },

      destroy: () => {
        bg.destroy();
        text.destroy();
      }
    };

    bg.on("pointerover", () => {
      if (!button.enabled) return;
      button.isHovered = true;
      bg.setFillStyle(actualHover, 1);
      scene.tweens.add({
        targets: bg,
        scaleX: 1.02,
        scaleY: 1.02,
        duration: 150,
        ease: "Quad.easeOut"
      });
    });

    bg.on("pointerout", () => {
      if (!button.enabled) return;
      button.isHovered = false;
      bg.setFillStyle(actualFill, 0.96);
      bg.setScale(1, 1);
    });

    bg.on("pointerdown", () => {
      if (!button.enabled) return;
      scene.tweens.add({
        targets: bg,
        scaleX: 0.98,
        scaleY: 0.98,
        duration: 100,
        ease: "Quad.easeIn"
      });
      onClick?.();
    });

    bg.on("pointerup", () => {
      if (!button.enabled) return;
      bg.setScale(1.02, 1.02);
    });

    if (parent) {
      parent.add(bg);
      parent.add(text);
    }

    return button;
  }

  /**
   * Create a modern card component
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} w - Card width
   * @param {number} h - Card height
   * @param {Object} options - Card configuration
   * @returns {Object} Card object
   */
  static createCard(scene, x, y, w, h, options = {}) {
    const {
      title = "",
      description = "",
      fillColor = 0x0f1a2b,
      strokeColor = 0x8bc8ff,
      isInteractive = false,
      onClick = null,
      parent = null
    } = options;

    const container = scene.add.container(x, y);

    const bg = scene.add.rectangle(0, 0, w, h, fillColor, 0.96);
    bg.setStrokeStyle(2, strokeColor, 1);
    container.add(bg);

    if (isInteractive) {
      bg.setInteractive({ useHandCursor: true });
      bg.on("pointerover", () => {
        scene.tweens.add({
          targets: bg,
          scaleX: 1.02,
          scaleY: 1.02,
          duration: 200,
          ease: "Quad.easeOut"
        });
        bg.setStrokeStyle(2, 0x00d4ff, 1);
      });

      bg.on("pointerout", () => {
        bg.setScale(1, 1);
        bg.setStrokeStyle(2, strokeColor, 1);
      });

      if (onClick) {
        bg.on("pointerdown", onClick);
      }
    }

    if (title) {
      const titleText = scene.add.text(0, -h * 0.35, title, {
        fontFamily: "Consolas",
        fontSize: "20px",
        color: "#ffeab0",
        align: "center"
      }).setOrigin(0.5);
      container.add(titleText);
    }

    if (description) {
      const descText = scene.add.text(0, 0, description, {
        fontFamily: "Consolas",
        fontSize: "16px",
        color: "#c9e7ff",
        align: "center",
        wordWrap: { width: w - 40 }
      }).setOrigin(0.5);
      container.add(descText);
    }

    if (parent) {
      parent.add(container);
    }

    return { container, bg };
  }

  /**
   * Create a radio group with modern styling
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {Object} options - Configuration
   * @returns {Object} Radio group object
   */
  static createRadioGroup(scene, x, y, options = {}) {
    const {
      title = "Options",
      items = [],
      value = null,
      onChange = null,
      parent = null
    } = options;

    const group = scene.add.container(x, y);

    // Title
    if (title) {
      const titleText = scene.add.text(0, 0, title, {
        fontFamily: "Consolas",
        fontSize: "18px",
        color: "#ffebb0",
        fontStyle: "bold"
      });
      group.add(titleText);
    }

    const rows = [];
    const itemHeight = 36;
    const itemSpacing = 8;

    items.forEach((item, index) => {
      const itemY = (title ? 40 : 0) + index * (itemHeight + itemSpacing);

      // Background
      const itemBg = scene.add.rectangle(0, itemY, 280, itemHeight, 0x233850, 0.7);
      itemBg.setOrigin(0, 0);
      itemBg.setStrokeStyle(1, 0x7fb8ff, 0.8);
      itemBg.setInteractive({ useHandCursor: true });

      // Radio indicator
      const radio = scene.add.circle(20, itemY + itemHeight * 0.5, 8, 0x0c1522, 1);
      radio.setStrokeStyle(2, 0x8fc7ff, 1);

      const innerCircle = scene.add.circle(20, itemY + itemHeight * 0.5, 4, 0x75ffd4, 1);
      innerCircle.setVisible(item.value === value);

      // Label
      const label = scene.add.text(40, itemY + itemHeight * 0.5, item.label, {
        fontFamily: "Consolas",
        fontSize: "15px",
        color: "#e7f4ff"
      }).setOrigin(0, 0.5);

      itemBg.on("pointerdown", () => {
        onChange?.(item.value, item);
      });

      itemBg.on("pointerover", () => {
        if (item.value !== value) {
          itemBg.setFillStyle(0x2f4d6a, 0.86);
        }
      });

      itemBg.on("pointerout", () => {
        if (item.value !== value) {
          itemBg.setFillStyle(0x233850, 0.7);
        }
      });

      group.add([itemBg, radio, innerCircle, label]);
      rows.push({ item, itemBg, innerCircle, label });
    });

    const refresh = (newValue) => {
      rows.forEach(({ item, innerCircle, itemBg, label }) => {
        const selected = item.value === newValue;
        innerCircle.setVisible(selected);
        itemBg.setFillStyle(selected ? 0x365b7d : 0x233850, selected ? 0.96 : 0.7);
        label.setColor(selected ? "#ffffff" : "#e7f4ff");
      });
    };

    if (parent) {
      parent.add(group);
    }

    return { group, refresh };
  }

  /**
   * Create a loading indicator animation
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {Object} options - Configuration
   * @returns {Object} Loader object with methods
   */
  static createLoader(scene, x, y, options = {}) {
    const {
      radius = 30,
      color = 0x00d4ff,
      parent = null
    } = options;

    const graphics = scene.add.graphics();
    graphics.setPosition(x, y);

    let angle = 0;
    const loader = {
      graphics,
      isActive: false,

      start: () => {
        loader.isActive = true;
      },

      stop: () => {
        loader.isActive = false;
      },

      destroy: () => {
        graphics.destroy();
      }
    };

    scene.events.on("update", () => {
      if (!loader.isActive) return;

      graphics.clear();
      graphics.fillStyle(color, 0.8);

      const circumference = Math.PI * 2;
      const arcLength = circumference * 0.75;
      graphics.arc(0, 0, radius, angle, angle + arcLength, false);
      graphics.strokePath();

      angle += 0.05;
    });

    if (parent) {
      parent.add(graphics);
    }

    return loader;
  }

  /**
   * Create a notification/toast message
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {string} message - Message text
   * @param {Object} options - Configuration
   */
  static showNotification(scene, message, options = {}) {
    const {
      duration = 2000,
      x = scene.scale.width / 2,
      y = scene.scale.height * 0.8,
      type = "info" // "info", "success", "error", "warning"
    } = options;

    const colors = {
      info: { bg: 0x2b5874, border: 0x8bc8ff },
      success: { bg: 0x2f8f6f, border: 0x00d4ff },
      error: { bg: 0x5f2f3d, border: 0xffc0cf },
      warning: { bg: 0x8b6f47, border: 0xffeab0 }
    };

    const color = colors[type] || colors.info;

    const bg = scene.add.rectangle(x, y, 320, 60, color.bg, 0.95);
    bg.setStrokeStyle(2, color.border, 1);

    const text = scene.add.text(x, y, message, {
      fontFamily: "Consolas",
      fontSize: "16px",
      color: "#f1f8ff",
      align: "center",
      wordWrap: { width: 300 }
    }).setOrigin(0.5);

    scene.tweens.add({
      targets: [bg, text],
      alpha: 0,
      delay: duration,
      duration: 300,
      ease: "Cubic.easeIn",
      onComplete: () => {
        bg.destroy();
        text.destroy();
      }
    });
  }

  /**
   * Add a glow effect to a game object
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {Phaser.GameObjects.GameObject} target - Target object
   * @param {number} color - Glow color
   * @param {number} intensity - Glow intensity
   */
  static addGlowEffect(scene, target, color = 0x00d4ff, intensity = 0.5) {
    scene.tweens.add({
      targets: target,
      shadowColor: color,
      shadowBlur: intensity * 20,
      yoyo: true,
      loop: true,
      duration: 1500,
      ease: "Sine.easeInOut"
    });
  }

  /**
   * Calculate responsive sizes based on game scale
   * @param {Phaser.Scene} scene - The Phaser scene
   * @returns {Object} Responsive size values
   */
  static getResponsiveSizes(scene) {
    const w = scene.scale.width;
    const h = scene.scale.height;
    const baseSize = Math.min(w, h);

    return {
      buttonWidth: Math.max(200, w * 0.25),
      buttonHeight: Math.max(40, h * 0.08),
      panelWidth: Math.max(400, w * 0.85),
      panelHeight: Math.max(300, h * 0.75),
      cardWidth: Math.max(250, w * 0.3),
      cardHeight: Math.max(150, h * 0.35),
      spacing: Math.max(8, baseSize * 0.02)
    };
  }
}
