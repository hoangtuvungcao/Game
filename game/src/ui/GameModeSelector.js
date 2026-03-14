/**
 * GameModeSelector.js
 * 
 * A modern, responsive UI component for selecting game modes and difficulty.
 * This component provides a clean, card-based interface with smooth animations
 * and full responsive support for mobile, tablet, PC, and Mac.
 */

export class GameModeSelector {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.options = options;
    this.isVisible = false;
    this.selectedMode = options.selectedMode || "EndlessPvEClassic";
    this.selectedDifficulty = options.selectedDifficulty || "MEDIUM";
    this.onModeSelected = options.onModeSelected || (() => {});
    this.onDifficultySelected = options.onDifficultySelected || (() => {});
    this.onStartGame = options.onStartGame || (() => {});
    this.modes = options.modes || [];
    this.difficulties = [
      { id: "EASY", label: "Dễ", color: "#2b5874" },
      { id: "MEDIUM", label: "Trung bình", color: "#2f8f6f" },
      { id: "HARD", label: "Khó", color: "#8f3b2f" }
    ];
    
    this.modeCards = [];
    this.difficultyButtons = [];
    this.container = null;
  }

  create() {
    const scene = this.scene;
    const w = scene.scale.width;
    const h = scene.scale.height;
    
    // Main container
    this.container = scene.add.container(0, 0);
    this.container.setDepth(1000);
    this.container.setVisible(false);
    
    // Semi-transparent background
    const bg = scene.add.rectangle(0, 0, w, h, 0x000000, 0.6);
    bg.setInteractive();
    bg.on("pointerdown", (pointer) => {
      // Prevent closing on background click
    });
    this.container.add(bg);
    
    // Main panel container
    const panelX = w * 0.5;
    const panelY = h * 0.5;
    const panelWidth = Math.min(w * 0.9, 1000);
    const panelHeight = Math.min(h * 0.85, 700);
    
    const panel = scene.add.rectangle(panelX, panelY, panelWidth, panelHeight, 0x0f1a2b, 0.98);
    panel.setStrokeStyle(2, 0x00d4ff, 1);
    this.container.add(panel);
    
    // Create content with proper spacing
    const contentStartY = panelY - panelHeight * 0.5 + 40;
    
    // Title
    const title = scene.add.text(panelX, contentStartY, "Chọn Chế Độ Chơi", {
      fontFamily: "Arial",
      fontSize: "36px",
      color: "#ffffff",
      fontStyle: "bold"
    });
    title.setOrigin(0.5, 0);
    this.container.add(title);
    
    // Subtitle
    const subtitle = scene.add.text(panelX, contentStartY + 50, "Lựa chọn cách bạn muốn chơi trò chơi chiến thuật của chúng tôi", {
      fontFamily: "Arial",
      fontSize: "16px",
      color: "#b0d4ff"
    });
    subtitle.setOrigin(0.5, 0);
    this.container.add(subtitle);
    
    // Game modes section
    const modesStartY = contentStartY + 110;
    const modeLabel = scene.add.text(panelX - panelWidth * 0.4, modesStartY, "Chế độ", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#7dd3fc",
      fontStyle: "bold"
    });
    modeLabel.setOrigin(0, 0);
    this.container.add(modeLabel);
    
    // Create mode cards
    this.createModeCards(panelX, modesStartY + 40, panelWidth - 80);
    
    // Difficulty section
    const difficultyStartY = modesStartY + this.getModeCardsHeight() + 60;
    const diffLabel = scene.add.text(panelX - panelWidth * 0.4, difficultyStartY, "Độ khó", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#7dd3fc",
      fontStyle: "bold"
    });
    diffLabel.setOrigin(0, 0);
    this.container.add(diffLabel);
    
    // Create difficulty buttons
    this.createDifficultyButtons(panelX, difficultyStartY + 40, panelWidth - 80);
    
    // Action buttons
    const actionButtonsY = panelY + panelHeight * 0.5 - 50;
    this.createActionButtons(panelX, actionButtonsY, panelWidth);
    
    // Add all to container
    this.modeCards.forEach(card => this.container.add(card));
    this.difficultyButtons.forEach(btn => this.container.add(btn));
  }

  createModeCards(centerX, startY, availableWidth) {
    const cardWidth = Math.min(280, (availableWidth - 20) / 2);
    const cardHeight = 140;
    const cardsPerRow = Math.floor(availableWidth / (cardWidth + 20));
    
    this.modes.forEach((mode, index) => {
      const row = Math.floor(index / cardsPerRow);
      const col = index % cardsPerRow;
      const x = centerX - (cardsPerRow - 1) * (cardWidth + 20) / 2 + col * (cardWidth + 20);
      const y = startY + row * (cardHeight + 20);
      
      const isSelected = mode.id === this.selectedMode;
      const cardBg = this.scene.add.rectangle(x, y, cardWidth, cardHeight, 
        isSelected ? 0x1a4d5f : 0x1a2a3a, 0.95);
      
      cardBg.setStrokeStyle(2, isSelected ? 0x00ffff : 0x4a7a8f, 1);
      cardBg.setInteractive({ useHandCursor: true });
      
      cardBg.on("pointerover", () => {
        if (!isSelected) {
          cardBg.setFillStyle(0x2a3a4a, 0.95);
          cardBg.setStrokeStyle(2, 0x00d4ff, 1);
        }
      });
      
      cardBg.on("pointerout", () => {
        if (!isSelected) {
          cardBg.setFillStyle(0x1a2a3a, 0.95);
          cardBg.setStrokeStyle(2, 0x4a7a8f, 1);
        }
      });
      
      cardBg.on("pointerdown", () => {
        this.selectMode(mode.id);
      });
      
      // Mode name
      const modeNameText = this.scene.add.text(x - cardWidth * 0.4, y - cardHeight * 0.4, 
        mode.name, {
          fontFamily: "Arial",
          fontSize: "16px",
          color: "#ffffff",
          fontStyle: "bold"
        });
      modeNameText.setOrigin(0, 0);
      
      // Mode description
      const descText = this.scene.add.text(x - cardWidth * 0.4, y - cardHeight * 0.15, 
        mode.description.substring(0, 60) + "...", {
          fontFamily: "Arial",
          fontSize: "12px",
          color: "#a0d4ff",
          wordWrap: { width: cardWidth - 20 }
        });
      descText.setOrigin(0, 0);
      
      this.modeCards.push(cardBg);
      this.modeCards.push(modeNameText);
      this.modeCards.push(descText);
    });
  }

  createDifficultyButtons(centerX, startY, availableWidth) {
    const buttonWidth = Math.min(200, (availableWidth - 20) / 3);
    
    this.difficulties.forEach((diff, index) => {
      const x = centerX - (this.difficulties.length - 1) * (buttonWidth + 20) / 2 + index * (buttonWidth + 20);
      const y = startY;
      
      const isSelected = diff.id === this.selectedDifficulty;
      const btnBg = this.scene.add.rectangle(x, y, buttonWidth, 50, 
        isSelected ? diff.color : 0x1a2a3a, 0.9);
      
      btnBg.setStrokeStyle(2, isSelected ? "#00ffff" : "#4a7a8f", 1);
      btnBg.setInteractive({ useHandCursor: true });
      
      btnBg.on("pointerover", () => {
        if (!isSelected) {
          btnBg.setFillStyle(0x2a3a4a, 0.9);
        }
      });
      
      btnBg.on("pointerout", () => {
        if (!isSelected) {
          btnBg.setFillStyle(0x1a2a3a, 0.9);
        }
      });
      
      btnBg.on("pointerdown", () => {
        this.selectDifficulty(diff.id);
      });
      
      const btnText = this.scene.add.text(x, y, diff.label, {
        fontFamily: "Arial",
        fontSize: "16px",
        color: isSelected ? "#ffffff" : "#a0d4ff",
        fontStyle: "bold"
      });
      btnText.setOrigin(0.5);
      
      this.difficultyButtons.push(btnBg);
      this.difficultyButtons.push(btnText);
    });
  }

  createActionButtons(centerX, y, panelWidth) {
    const btnWidth = 200;
    const btnHeight = 50;
    
    // Start Game button
    const startBtn = this.scene.add.rectangle(centerX - 120, y, btnWidth, btnHeight, 0x2f8f6f, 0.95);
    startBtn.setStrokeStyle(2, 0x8bffd7, 1);
    startBtn.setInteractive({ useHandCursor: true });
    
    startBtn.on("pointerover", () => {
      startBtn.setFillStyle(0x3fa585, 0.95);
    });
    
    startBtn.on("pointerout", () => {
      startBtn.setFillStyle(0x2f8f6f, 0.95);
    });
    
    startBtn.on("pointerdown", () => {
      this.onStartGame();
    });
    
    const startText = this.scene.add.text(centerX - 120, y, "Bắt đầu", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#ffffff",
      fontStyle: "bold"
    });
    startText.setOrigin(0.5);
    
    this.container.add(startBtn);
    this.container.add(startText);
    
    // Close button
    const closeBtn = this.scene.add.rectangle(centerX + 120, y, btnWidth, btnHeight, 0x3b4e66, 0.95);
    closeBtn.setStrokeStyle(2, 0xb6d3ff, 1);
    closeBtn.setInteractive({ useHandCursor: true });
    
    closeBtn.on("pointerover", () => {
      closeBtn.setFillStyle(0x4a5d75, 0.95);
    });
    
    closeBtn.on("pointerout", () => {
      closeBtn.setFillStyle(0x3b4e66, 0.95);
    });
    
    closeBtn.on("pointerdown", () => {
      this.hide();
    });
    
    const closeText = this.scene.add.text(centerX + 120, y, "Đóng", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#ffffff",
      fontStyle: "bold"
    });
    closeText.setOrigin(0.5);
    
    this.container.add(closeBtn);
    this.container.add(closeText);
  }

  selectMode(modeId) {
    this.selectedMode = modeId;
    this.onModeSelected(modeId);
    // Update UI to show selection
    this.refresh();
  }

  selectDifficulty(diffId) {
    this.selectedDifficulty = diffId;
    this.onDifficultySelected(diffId);
    // Update UI to show selection
    this.refresh();
  }

  getModeCardsHeight() {
    const cardsPerRow = Math.max(1, Math.floor(900 / 300));
    const rowCount = Math.ceil(this.modes.length / cardsPerRow);
    return rowCount * 160;
  }

  refresh() {
    // Rebuild the UI to reflect current selections
    if (this.container) {
      this.container.removeAll(true);
      this.modeCards = [];
      this.difficultyButtons = [];
      this.create();
    }
  }

  show() {
    if (this.container) {
      this.isVisible = true;
      this.container.setVisible(true);
    }
  }

  hide() {
    if (this.container) {
      this.isVisible = false;
      this.container.setVisible(false);
    }
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  destroy() {
    if (this.container) {
      this.container.destroy();
    }
  }
}
