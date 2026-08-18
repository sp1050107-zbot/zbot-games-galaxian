/**
 * Galaxian Game Constants
 * Central location for all game configuration values
 */

// Canvas Configuration
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const CANVAS_BG_COLOR = "#000000";

// Player Configuration
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 30;
export const PLAYER_SPEED = 5;
export const PLAYER_FIRE_RATE = 200; // milliseconds
export const PLAYER_START_X = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
export const PLAYER_START_Y = CANVAS_HEIGHT - 80;
export const PLAYER_COLOR = "#00FF00";

// Player Bullet Configuration
export const PLAYER_BULLET_WIDTH = 4;
export const PLAYER_BULLET_HEIGHT = 12;
export const PLAYER_BULLET_SPEED = 7;
export const PLAYER_BULLET_COLOR = "#00FF00";
export const MAX_PLAYER_BULLETS = 10;

// Enemy Configuration
export const ENEMY_ROWS = 2;
export const ENEMY_COLS = 5;
export const ENEMY_WIDTH = 40;
export const ENEMY_HEIGHT = 30;
export const ENEMY_SPEED = 2;
export const ENEMY_COLOR = "#FF0000";

// Enemy Dive Configuration
export const ENEMY_DIVE_PROBABILITY = 0.001; // Probability per frame
export const ENEMY_DIVE_SPEED = 5;
export const ENEMY_DIVE_BULLET_SPEED = 4;
export const ENEMY_DIVE_BULLET_COLOR = "#FF0000";
export const MAX_DIVE_BULLETS = 20;

// Formation Configuration
export const FORMATION_PADDING = 60;
export const FORMATION_START_X = 100;
export const FORMATION_START_Y = 50;
export const FORMATION_SPACING_X = ENEMY_WIDTH + 20;
export const FORMATION_SPACING_Y = ENEMY_HEIGHT + 20;

// Game Flow
export const GAME_FPS = 60;
export const GAME_FRAME_TIME = 1000 / GAME_FPS; // milliseconds

// Scoring
export const SCORE_BASIC_ENEMY = 10;
export const SCORE_MEDIUM_ENEMY = 20;
export const SCORE_BOSS_ENEMY = 50;

// Game States
export enum GameState {
  MENU = "menu",
  PLAYING = "playing",
  PAUSED = "paused",
  GAME_OVER = "gameOver",
  LEVEL_COMPLETE = "levelComplete",
}

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  EASY: { enemySpeed: 1.5, diveProb: 0.0005 },
  NORMAL: { enemySpeed: 2, diveProb: 0.001 },
  HARD: { enemySpeed: 2.5, diveProb: 0.002 },
  EXTREME: { enemySpeed: 3.5, diveProb: 0.0035 },
} as const;

// Input Keys
export const INPUT_KEYS = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  FIRE: " ", // Spacebar
  PAUSE: "p",
  RESTART: "r",
} as const;

// Physics
export const GRAVITY = 0.1;
export const COLLISION_THRESHOLD = 5; // pixels

// Animation
export const PLAYER_DEATH_DURATION = 1000; // milliseconds
export const FLASH_DURATION = 100; // milliseconds
