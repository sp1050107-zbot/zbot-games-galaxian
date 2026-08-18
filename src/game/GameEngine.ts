/**
 * GameEngine - Core game loop and state management
 */

import { GameState, CANVAS_WIDTH, CANVAS_HEIGHT, GAME_FRAME_TIME } from "@game/constants";

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: GameState = GameState.MENU;
  private frameTime: number = 0;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get 2D context from canvas");
    }
    this.ctx = ctx;

    this.setupCanvas();
    this.setupEventListeners();
  }

  /**
   * Setup canvas properties
   */
  private setupCanvas(): void {
    // Set canvas size
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    // Setup context
    this.ctx.imageSmoothingEnabled = false;
  }

  /**
   * Setup keyboard and input event listeners
   */
  private setupEventListeners(): void {
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    document.addEventListener("keyup", (e) => this.handleKeyUp(e));
  }

  /**
   * Handle keyboard key down events
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "p" || event.key === "P") {
      this.togglePause();
    }
    if (event.key === "r" || event.key === "R") {
      this.restart();
    }
  }

  /**
   * Handle keyboard key up events
   */
  private handleKeyUp(_event: KeyboardEvent): void {
    // TODO: implement specific key up handlers if needed
  }

  /**
   * Start the game
   */
  public start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.state = GameState.PLAYING;
    this.gameLoop();
  }

  /**
   * Stop the game
   */
  public stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Pause the game
   */
  public pause(): void {
    if (this.state === GameState.PLAYING) {
      this.state = GameState.PAUSED;
    }
  }

  /**
   * Resume the game
   */
  public resume(): void {
    if (this.state === GameState.PAUSED) {
      this.state = GameState.PLAYING;
    }
  }

  /**
   * Toggle pause state
   */
  public togglePause(): void {
    if (this.state === GameState.PLAYING) {
      this.pause();
    } else if (this.state === GameState.PAUSED) {
      this.resume();
    }
  }

  /**
   * Restart the game
   */
  public restart(): void {
    this.state = GameState.PLAYING;
    // TODO: Reset game state
  }

  /**
   * Check if game is paused
   */
  public isPaused(): boolean {
    return this.state === GameState.PAUSED;
  }

  /**
   * Get current game state
   */
  public getState(): GameState {
    return this.state;
  }

  /**
   * Main game loop
   */
  private gameLoop = (): void => {
    this.frameTime += 1;

    // Update game state
    if (this.state === GameState.PLAYING) {
      this.update();
    }

    // Render
    this.render();

    // Request next frame
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  /**
   * Update game logic
   */
  private update(): void {
    // TODO: Update game entities
    // - Update player position
    // - Update enemies
    // - Update bullets
    // - Check collisions
    // - Update score
  }

  /**
   * Render game frame
   */
  private render(): void {
    // Clear canvas
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw game state
    if (this.state === GameState.PLAYING) {
      this.renderGame();
    } else if (this.state === GameState.PAUSED) {
      this.renderGame();
      this.renderPauseOverlay();
    } else if (this.state === GameState.MENU) {
      this.renderMenu();
    }

    // FPS debug info (optional)
    this.renderDebugInfo();
  }

  /**
   * Render game elements
   */
  private renderGame(): void {
    // TODO: Render all game entities
    // - Player
    // - Enemies
    // - Bullets
    // - Effects
  }

  /**
   * Render pause overlay
   */
  private renderPauseOverlay(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.ctx.fillStyle = "#FFFF00";
    this.ctx.font = "bold 48px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("PAUSED", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "#00FF00";
    this.ctx.fillText("Press P to Resume", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
  }

  /**
   * Render main menu
   */
  private renderMenu(): void {
    this.ctx.fillStyle = "#00FF00";
    this.ctx.font = "bold 64px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("GALAXIAN", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 100);

    this.ctx.font = "32px Arial";
    this.ctx.fillStyle = "#FFFF00";
    this.ctx.fillText("Press SPACE to Start", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);

    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#FF00FF";
    this.ctx.fillText("Arrow Keys to Move", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 100);
    this.ctx.fillText("Spacebar to Fire", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 130);
  }

  /**
   * Render debug information (FPS counter)
   */
  private renderDebugInfo(): void {
    if (import.meta.env.DEV) {
      this.ctx.fillStyle = "#00FF00";
      this.ctx.font = "12px monospace";
      this.ctx.textAlign = "left";
      const fps = Math.round(1000 / GAME_FRAME_TIME);
      this.ctx.fillText(`FPS: ${fps}`, 10, 20);
      this.ctx.fillText(`State: ${this.state}`, 10, 35);
      this.ctx.fillText(`Frame: ${this.frameTime}`, 10, 50);
    }
  }
}
