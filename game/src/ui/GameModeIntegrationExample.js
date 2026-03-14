/**
 * GameModeIntegrationExample.js
 * 
 * This file demonstrates how to integrate the new GameModeSelector
 * and GameUIOverlay components into an existing Phaser scene.
 * 
 * This is a reference implementation - copy relevant parts to your scene.
 */

import { GameModeSelector } from "./GameModeSelector.js";
import { GameUIOverlay } from "./GameUIOverlay.js";
import GameModeRegistry from "../gameModes/GameModeRegistry.js";

/**
 * Example integration in a Phaser scene
 */
export function integrateGameUIComponents(scene) {
  // Initialize overlay for utility methods
  const overlay = new GameUIOverlay(scene);
  
  // Store on scene for later access
  scene.gameUIOverlay = overlay;
  
  // Create the game mode selector
  const selector = new GameModeSelector(scene, {
    selectedMode: "EndlessPvEClassic",
    selectedDifficulty: "MEDIUM",
    modes: GameModeRegistry.getAll(),
    
    onModeSelected: (modeId) => {
      console.log("[GameUI] Mode selected:", modeId);
      // Update UI to show selection
    },
    
    onDifficultySelected: (diffId) => {
      console.log("[GameUI] Difficulty selected:", diffId);
      // Update settings
      scene.settings = scene.settings || {};
      scene.settings.aiMode = diffId;
    },
    
    onStartGame: () => {
      console.log("[GameUI] Starting game with mode:", selector.selectedMode);
      // Clear progress and start new game
      clearProgress?.();
      
      // Navigate to planning scene
      scene.scene.start("PlanningScene", {
        settings: scene.settings,
        mode: selector.selectedMode,
        forceNewRun: true
      });
    }
  });
  
  selector.create();
  scene.gameModeSelector = selector;
  
  return { selector, overlay };
}

/**
 * Example: Add keyboard shortcuts
 */
export function setupKeyboardShortcuts(scene) {
  const input = scene.input.keyboard;
  
  if (input) {
    // 'N' for new game
    input.on("keydown-N", () => {
      if (scene.gameModeSelector && !scene.gameModeSelector.isVisible) {
        scene.gameModeSelector.show();
      }
    });
    
    // 'ESC' to close
    input.on("keydown-ESC", () => {
      if (scene.gameModeSelector?.isVisible) {
        scene.gameModeSelector.hide();
      }
    });
    
    // 'S' for settings
    input.on("keydown-S", () => {
      scene.toggleSettings?.();
    });
    
    // 'L' for library
    input.on("keydown-L", () => {
      scene.toggleLibrary?.();
    });
  }
}

/**
 * Example: Handle screen resize
 */
export function setupResponsiveResize(scene) {
  scene.scale.on("resize", (gameSize) => {
    const { width, height } = gameSize;
    console.log("[GameUI] Screen resized to:", width, "x", height);
    
    // Update overlay scale
    if (scene.gameUIOverlay) {
      scene.gameUIOverlay.updateForScreenResize(width, height);
    }
    
    // Refresh selector if visible
    if (scene.gameModeSelector?.isVisible) {
      scene.gameModeSelector.refresh();
    }
  });
}

/**
 * Example: Show toast notifications
 */
export function showNotification(scene, message, type = 'info') {
  if (scene.gameUIOverlay) {
    scene.gameUIOverlay.createToast(message, 3000, type);
  }
}

/**
 * Example: Create a loading screen
 */
export function showLoadingScreen(scene) {
  if (scene.gameUIOverlay) {
    const loader = scene.gameUIOverlay.createLoadingScreen();
    
    // Simulate loading
    setTimeout(() => {
      if (loader) {
        loader.destroy();
      }
    }, 2000);
  }
}

/**
 * Integration pattern for MainMenuScene
 */
export class MainMenuSceneWithNewUI {
  /**
   * In your MainMenuScene.create(), add:
   */
  create() {
    // ... existing code ...
    
    // Initialize new UI components
    const { selector, overlay } = integrateGameUIComponents(this);
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts(this);
    
    // Setup responsive resize handler
    setupResponsiveResize(this);
    
    // Show mode selector when "Start New" button is clicked
    this.startNewGame = () => {
      clearProgress?.();
      this.savedRun = null;
      selector.show();
    };
    
    // Continue existing game
    this.continueRun = () => {
      const restored = this.savedRun ?? hydrateRunState(loadProgress());
      if (!restored) {
        showNotification(this, "Chưa có tiến trình lưu để tiếp tục.", 'warning');
        return;
      }
      
      this.scene.start("PlanningScene", {
        settings: this.settings,
        mode: restored.player?.gameMode ?? "EndlessPvEClassic",
        restoredState: restored
      });
    };
    
    // Toggle settings panel
    this.toggleSettings = () => {
      if (this.settingsPanel) {
        this.settingsPanel.setVisible(!this.settingsPanel.visible);
      }
    };
    
    // Toggle library modal
    this.toggleLibrary = () => {
      if (this.libraryModal) {
        this.libraryModal.toggle();
      }
    };
  }
}

/**
 * CSS Integration
 * 
 * Add this to your HTML before the game canvas:
 * 
 * <link rel="stylesheet" href="public/game-ui.css">
 * <div id="app"></div>
 * 
 * Or in your index.html:
 * 
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <meta charset="UTF-8">
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *   <title>Forest Master Game</title>
 *   <link rel="stylesheet" href="public/game-ui.css">
 *   <style>
 *     body { margin: 0; padding: 0; }
 *   </style>
 * </head>
 * <body>
 *   <div id="app"></div>
 *   <script type="module" src="src/main.js"></script>
 * </body>
 * </html>
 */

/**
 * Testing the components
 * 
 * Unit test example:
 * 
 * describe('GameModeSelector', () => {
 *   it('should select a mode', () => {
 *     const selector = new GameModeSelector(mockScene, {
 *       modes: [
 *         { id: 'MODE1', name: 'Mode 1', description: 'Desc' }
 *       ]
 *     });
 *     
 *     selector.selectMode('MODE1');
 *     expect(selector.selectedMode).toBe('MODE1');
 *   });
 * });
 * 
 * E2E test example:
 * 
 * describe('Game Mode Selection Flow', () => {
 *   it('should start a new game with selected mode', () => {
 *     cy.visit('/');
 *     cy.contains('Bắt đầu mới').click();
 *     cy.contains('PvE Vô tận').click();
 *     cy.contains('Khó').click();
 *     cy.contains('Bắt đầu').click();
 *     cy.url().should('include', 'PlanningScene');
 *   });
 * });
 */

/**
 * Troubleshooting Guide
 * 
 * Q: Components not showing?
 * A: Make sure:
 *    1. CSS file is loaded
 *    2. Components are created with scene.add.* methods
 *    3. Container has proper depth value
 * 
 * Q: Layout broken on mobile?
 * A: Check:
 *    1. Viewport meta tag is set
 *    2. Media queries are working
 *    3. Scale factor is calculated correctly
 * 
 * Q: Buttons not clickable?
 * A: Verify:
 *    1. Interactive flag is set to true
 *    2. Click handlers are bound correctly
 *    3. Container isn't blocking pointer events
 * 
 * Q: Text overlapping?
 * A: Adjust:
 *    1. Font sizes in CSS variables
 *    2. Container sizes
 *    3. Text origin points
 */

export default {
  integrateGameUIComponents,
  setupKeyboardShortcuts,
  setupResponsiveResize,
  showNotification,
  showLoadingScreen
};
