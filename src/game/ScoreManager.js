export class ScoreManager {
    constructor() {
        this.score = 0;
        this.misses = 0;
        this.scoreElement = null;
        this.missesElement = null;
        this.gameOverElement = null;
    }

    init() {
        this.scoreElement = document.getElementById('score');
        this.missesElement = document.getElementById('misses');
        this.gameOverElement = document.getElementById('game-over');

        this.updateDisplay();
    }

    addScore(points) {
        this.score += points;
        this.updateDisplay();
    }

    updateMisses(misses) {
        this.misses = misses;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.scoreElement) {
            this.scoreElement.textContent = `Score: ${this.score}`;
        }
        if (this.missesElement) {
            this.missesElement.textContent = `Misses: ${this.misses}/5`;
        }
    }

    showGameOver() {
        if (this.gameOverElement) {
            this.gameOverElement.style.display = 'block';
            this.gameOverElement.innerHTML = `
        <h2>Game Over!</h2>
        <p>Final Score: ${this.score}</p>
        <button id="restart-btn">Play Again</button>
      `;

            document.getElementById('restart-btn').addEventListener('click', () => {
                window.location.reload();
            });
        }
    }

    reset() {
        this.score = 0;
        this.misses = 0;
        this.updateDisplay();

        if (this.gameOverElement) {
            this.gameOverElement.style.display = 'none';
        }
    }
}
