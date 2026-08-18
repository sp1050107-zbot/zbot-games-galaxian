/**
 * Galaxian Game - Main Entry Point
 * Initializes the game engine and manages the main game loop
 */

import { GameEngine } from "@game/GameEngine";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@game/constants";

// Game instance
let gameEngine: GameEngine | null = null;

/**
 * Initialize the game when DOM is ready
 */
function initializeGame(): void {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  // Create game engine
  gameEngine = new GameEngine(canvas);

  // Setup UI event listeners
  setupUIEventListeners();

  // Start the game
  gameEngine.start();

  console.warn("🎮 Galaxian game initialized successfully");
  console.warn(`Canvas: ${CANVAS_WIDTH}x${CANVAS_HEIGHT}`);
}

/**
 * Setup UI event listeners (buttons, controls)
 */
function setupUIEventListeners(): void {
  // Pause/Resume button
  const pauseBtn = document.getElementById("pauseBtn") as HTMLButtonElement;
  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      if (gameEngine) {
        if (gameEngine.isPaused()) {
          gameEngine.resume();
          pauseBtn.textContent = "Pause";
        } else {
          gameEngine.pause();
          pauseBtn.textContent = "Resume";
        }
      }
    });
  }

  // Restart button
  const restartBtn = document.getElementById("restartBtn") as HTMLButtonElement;
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      if (gameEngine) {
        gameEngine.restart();
        pauseBtn.textContent = "Pause";
      }
    });
  }

  // Settings button (placeholder)
  const settingsBtn = document.getElementById(
    "settingsBtn"
  ) as HTMLButtonElement;
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      // TODO: implement settings UI
      if (gameEngine) {
        console.warn("Settings UI not yet implemented");
      }
    });
  }
}

/**
 * Update UI displays
 */
export function updateUIDisplay(score: number, highScore: number, lives: number): void {
  const scoreDisplay = document.getElementById("score");
  const highScoreDisplay = document.getElementById("highScore");
  const livesDisplay = document.getElementById("lives");

  if (scoreDisplay) scoreDisplay.textContent = score.toString();
  if (highScoreDisplay) highScoreDisplay.textContent = highScore.toString();
  if (livesDisplay) livesDisplay.textContent = lives.toString();
}

/**
 * Update game status display
 */
export function updateGameStatus(status: string): void {
  const gameStatusDisplay = document.getElementById("gameStatus");
  if (gameStatusDisplay) {
    gameStatusDisplay.textContent = status;
    gameStatusDisplay.className = `game-status status-${status.toLowerCase().replace(" ", "")}`;
  }
}

/**
 * Initialize game when DOM is loaded
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame);
} else {
  initializeGame();
}

// Export for debugging
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gameEngine = gameEngine;
}
