/**
 * GameModeUIPanel.js - Modern game mode selection UI panel
 * Provides an enhanced, responsive interface for selecting game modes and difficulty
 */

import { ModernUIEnhancer } from "./ModernUIEnhancer.js";

export class GameModeUIPanel {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.container = null;
    this.isVisible = false;
    this.isDraggable = options.isDraggable !== false;
    this.onModeSelect = options.onModeSelect || null;
    this.onDifficultySelect = options.onDifficultySelect || null;
    this.gameModes = options.gameModes || [];
    this.difficulties = options.difficulties || [
      { value: "EASY", label: "Dễ" },
      { value: "MEDIUM", label: "Trung bình" },
      { value: "HARD", label: "Khó" }
    ];
    this.selectedMode = options.selectedMode || null;
    this.selectedDifficulty = options.selectedDifficulty || "MEDIUM";

    this.init();
  }

  init() {
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;

    // Calculate responsive panel size
    const panelWidth = Math.min(900, w * 0.9);
    const panelHeight = 480;

    // Create main container
    this.container = this.scene.add.container(w * 0.5, h * 0.5);
    this.container.setDepth(1000);
    this.container.setVisible(false);

    // Background with blur effect
    const bg = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x0f1a2b, 0.98);
    bg.setStrokeStyle(3, 0x00d4ff, 1);
    this.container.add(bg);

    // Add shadow effect
    bg.setShadow(0, 0, 0x000000, 0.8, 0, 0, true);

    // Title
    const title = this.scene.add.text(0, -panelHeight * 0.4, "Chế Độ Chơi", {
      fontFamily: "Trebuchet MS",
      fontSize: "32px",
      color: "#ffeab0",
      fontStyle: "bold",
      align: "center"
    }).setOrigin(0.5, 0);
    this.container.add(title);

    // Content container
    const contentContainer = this.scene.add.container(0, -panelHeight * 0.3);
    this.container.add(contentContainer);

    // Left side: Game modes
    const leftX = -panelWidth * 0.35;
    const modeTitle = this.scene.add.text(leftX, 0, "Chế Độ", {
      fontFamily: "Consolas",
      fontSize: "18px",
      color: "#ffebb0",
      fontStyle: "bold"
    }).setOrigin(0, 0);
    contentContainer.add(modeTitle);

    const modeContainer = this.scene.add.container(leftX, 40);
    contentContainer.add(modeContainer);

    this.gameModes.forEach((mode, index) => {
      const modeY = index * 50;
      const modeBg = this.scene.add.rectangle(0, modeY, 320, 42, 0x233850, 0.7);
      modeBg.setOrigin(0, 0);
      modeBg.setStrokeStyle(1, 0x7fb8ff, 0.8);
      modeBg.setInteractive({ useHandCursor: true });

      const modeLabel = this.scene.add.text(16, modeY + 21, mode.label, {
        fontFamily: "Consolas",
        fontSize: "16px",
        color: "#e7f4ff"
      }).setOrigin(0, 0.5);

      // Radio button
      const radio = this.scene.add.circle(300, modeY + 21, 6, 0x0c1522, 1);
      radio.setStrokeStyle(2, 0x8fc7ff, 1);

      const innerCircle = this.scene.add.circle(300, modeY + 21, 3, 0x00d4ff, 1);
      innerCircle.setVisible(this.selectedMode === mode.value);

      modeBg.on("pointerdown", () => {
        this.selectMode(mode.value);
      });

      modeBg.on("pointerover", () => {
        if (this.selectedMode !== mode.value) {
          modeBg.setFillStyle(0x2f4d6a, 0.86);
        }
      });

      modeBg.on("pointerout", () => {
        if (this.selectedMode !== mode.value) {
          modeBg.setFillStyle(0x233850, 0.7);
        }
      });

      modeContainer.add([modeBg, modeLabel, radio, innerCircle]);
    });

    // Right side: Difficulty and description
    const rightX = panelWidth * 0.15;
    const diffTitle = this.scene.add.text(rightX, 0, "Độ Khó AI", {
      fontFamily: "Consolas",
      fontSize: "18px",
      color: "#ffebb0",
      fontStyle: "bold"
    }).setOrigin(0, 0);
    contentContainer.add(diffTitle);

    const diffContainer = this.scene.add.container(rightX, 40);
    contentContainer.add(diffContainer);

    this.difficulties.forEach((diff, index) => {
      const diffY = index * 50;
      const diffBg = this.scene.add.rectangle(0, diffY, 280, 42, 0x1f4d6f, 0.7);
      diffBg.setOrigin(0, 0);
      diffBg.setStrokeStyle(1, 0x5d96d1, 0.8);
      diffBg.setInteractive({ useHandCursor: true });

      const diffLabel = this.scene.add.text(16, diffY + 21, diff.label, {
        fontFamily: "Consolas",
        fontSize: "16px",
        color: "#e7f4ff"
      }).setOrigin(0, 0.5);

      const radio = this.scene.add.circle(250, diffY + 21, 6, 0x0c1522, 1);
      radio.setStrokeStyle(2, 0x5d96d1, 1);

      const innerCircle = this.scene.add.circle(250, diffY + 21, 3, 0x5d96d1, 1);
      innerCircle.setVisible(this.selectedDifficulty === diff.value);

      diffBg.on("pointerdown", () => {
        this.selectDifficulty(diff.value);
      });

      diffBg.on("pointerover", () => {
        if (this.selectedDifficulty !== diff.value) {
          diffBg.setFillStyle(0x2a5a85, 0.86);
        }
      });

      diffBg.on("pointerout", () => {
        if (this.selectedDifficulty !== diff.value) {
          diffBg.setFillStyle(0x1f4d6f, 0.7);
        }
      });

      diffContainer.add([diffBg, diffLabel, radio, innerCircle]);
    });

    // Bottom action buttons
    const buttonY = panelHeight * 0.35;
    const startBtn = ModernUIEnhancer.createButton(
      this.scene,
      -120,
      buttonY,
      220,
      50,
      "Bắt Đầu",
      () => this.onStart?.(),
      { isAccent: true }
    );
    this.container.add([startBtn.bg, startBtn.text]);

    const cancelBtn = ModernUIEnhancer.createButton(
      this.scene,
      120,
      buttonY,
      220,
      50,
      "Hủy",
      () => this.hide(),
      {}
    );
    this.container.add([cancelBtn.bg, cancelBtn.text]);

    this.startBtn = startBtn;
    this.cancelBtn = cancelBtn;
  }

  selectMode(modeValue) {
    this.selectedMode = modeValue;
    this.onModeSelect?.(modeValue);
    this.updateUI();
  }

  selectDifficulty(diffValue) {
    this.selectedDifficulty = diffValue;
    this.onDifficultySelect?.(diffValue);
    this.updateUI();
  }

  updateUI() {
    // Update visual indicators (radio buttons, highlights, etc)
    // This will be called whenever selections change
  }

  show() {
    this.container.setVisible(true);
    this.isVisible = true;

    // Animate in
    this.scene.tweens.add({
      targets: this.container,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      duration: 300,
      ease: "Cubic.easeOut",
      onStart: () => {
        this.container.setScale(0.8);
        this.container.setAlpha(0);
      }
    });
  }

  hide() {
    this.scene.tweens.add({
      targets: this.container,
      scaleX: 0.8,
      scaleY: 0.8,
      alpha: 0,
      duration: 200,
      ease: "Cubic.easeIn",
      onComplete: () => {
        this.container.setVisible(false);
        this.isVisible = false;
      }
    });
  }

  toggle() {
    this.isVisible ? this.hide() : this.show();
  }

  destroy() {
    this.container?.destroy();
  }
}
