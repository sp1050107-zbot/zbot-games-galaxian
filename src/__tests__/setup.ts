/**
 * Vitest Setup File
 * Global test configuration and utilities
 */

import { expect, afterEach } from "vitest";

// Mock canvas
HTMLCanvasElement.prototype.getContext = (function () {
  return {
    fillStyle: "",
    fillRect: () => {},
    fillText: () => {},
    clearRect: () => {},
    getImageData: () => ({
      data: new Uint8ClampedArray(4),
    }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    fill: () => {},
    rect: () => {},
    arc: () => {},
    scale: () => {},
    rotate: () => {},
    translate: () => {},
    transform: () => {},
    resetTransform: () => {},
    font: "",
    textAlign: "",
    textBaseline: "",
    strokeStyle: "",
    lineWidth: 0,
    imageSmoothingEnabled: true,
  };
})() as never;

// Global test utilities
export const createMockCanvas = (width = 800, height = 600): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

// Cleanup after each test
afterEach(() => {
  // Clear any global state if needed
  jest.clearAllMocks();
});

// Custom matchers
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});
