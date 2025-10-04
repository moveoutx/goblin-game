import { Game } from '../game/Game.js';

describe('Game Integration', () => {
    let game;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="game-board"></div>
      <div id="score"></div>
      <div id="misses"></div>
      <div id="game-over"></div>
    `;

        game = new Game();
        game.init();
    });

    afterEach(() => {
        if (game.gameInterval) {
            clearInterval(game.gameInterval);
        }
    });

    test('should handle goblin hit correctly', () => {
        // Симулируем появление гоблина
        const testCell = game.board.cells[0];
        game.goblin.showInCell(testCell);

        // Симулируем клик по гоблину
        game.onGoblinHit();

        expect(game.scoreManager.score).toBe(1);
        expect(game.missedCount).toBe(0);
    });

    test('should handle misses correctly', () => {
        game.onMiss();
        expect(game.missedCount).toBe(1);

        game.onMiss();
        game.onMiss();
        game.onMiss();
        game.onMiss(); // 5-й промах

        expect(game.isRunning).toBe(false);
    });
});
