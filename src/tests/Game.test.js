import { Game } from '../game/Game.js';

// Mock для DOM
beforeEach(() => {
    document.body.innerHTML = `
    <div id="game-board"></div>
    <div id="score"></div>
    <div id="misses"></div>
    <div id="game-over"></div>
  `;
});

describe('Game', () => {
    let game;

    beforeEach(() => {
        game = new Game();
        game.init();
    });

    afterEach(() => {
        if (game.gameInterval) {
            clearInterval(game.gameInterval);
        }
    });

    test('should initialize game with correct properties', () => {
        expect(game.isRunning).toBe(true);
        expect(game.missedCount).toBe(0);
        expect(game.maxMissed).toBe(5);
        expect(game.board).toBeDefined();
        expect(game.goblin).toBeDefined();
        expect(game.scoreManager).toBeDefined();
    });

    test('should create game board with 16 cells', () => {
        const cells = document.querySelectorAll('.cell');
        expect(cells.length).toBe(16);
    });

    test('should start and stop game', () => {
        game.start();
        expect(game.isRunning).toBe(true);

        game.gameOver();
        expect(game.isRunning).toBe(false);
    });
});
