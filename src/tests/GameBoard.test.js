import { GameBoard } from '../game/GameBoard.js';

describe('GameBoard', () => {
    let gameBoard;

    beforeEach(() => {
        document.body.innerHTML = '<div id="game-board"></div>';
        gameBoard = new GameBoard(4, 4);
        gameBoard.create();
    });

    test('should create correct number of cells', () => {
        expect(gameBoard.cells.length).toBe(16);
    });

    test('should get random cell', () => {
        const cell = gameBoard.getRandomCell();
        expect(cell).toBeDefined();
        expect(cell.className).toBe('cell');
    });

    test('should clear all goblins from cells', () => {
        // Добавляем тестового гоблина
        const testGoblin = document.createElement('div');
        testGoblin.className = 'goblin';
        gameBoard.cells[0].append(testGoblin);

        gameBoard.clearAllGoblins();

        const remainingGoblins = Array.from(gameBoard.cells)
            .filter(cell => cell.querySelector('.goblin'));

        expect(remainingGoblins.length).toBe(0);
    });
});
