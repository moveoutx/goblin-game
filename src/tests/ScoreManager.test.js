import { ScoreManager } from '../game/ScoreManager.js';

describe('ScoreManager', () => {
    let scoreManager;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="score"></div>
      <div id="misses"></div>
      <div id="game-over"></div>
    `;
        scoreManager = new ScoreManager();
        scoreManager.init();
    });

    test('should initialize with zero score and misses', () => {
        expect(scoreManager.score).toBe(0);
        expect(scoreManager.misses).toBe(0);
    });

    test('should add score correctly', () => {
        scoreManager.addScore(1);
        expect(scoreManager.score).toBe(1);

        scoreManager.addScore(2);
        expect(scoreManager.score).toBe(3);
    });

    test('should update misses correctly', () => {
        scoreManager.updateMisses(3);
        expect(scoreManager.misses).toBe(3);
    });

    test('should reset score and misses', () => {
        scoreManager.addScore(5);
        scoreManager.updateMisses(2);

        scoreManager.reset();

        expect(scoreManager.score).toBe(0);
        expect(scoreManager.misses).toBe(0);
    });

    test('should update display elements', () => {
        scoreManager.addScore(3);
        scoreManager.updateMisses(2);

        expect(scoreManager.scoreElement.textContent).toBe('Score: 3');
        expect(scoreManager.missesElement.textContent).toBe('Misses: 2/5');
    });
});
