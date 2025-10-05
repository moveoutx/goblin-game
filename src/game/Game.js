import { GameBoard } from './GameBoard.js';
import { Goblin } from './Goblin.js';
import { ScoreManager } from './ScoreManager.js';

export class Game {
    constructor() {
        this.board = new GameBoard(4, 4);
        this.goblin = new Goblin();
        this.scoreManager = new ScoreManager();
        this.isRunning = false;
        this.gameInterval = null;
        this.missedCount = 0;
        this.maxMissed = 5;
        this.currentGoblinTimeout = null;
        this.currentGoblinCell = null; // Добавляем для отслеживания текущей ячейки гоблина
    }

    init() {
        this.board.create();
        this.scoreManager.init();
        this.bindEvents();
        this.start();
    }

    bindEvents() {
        this.board.cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                if (!this.isRunning) return;

                if (this.goblin.currentCell === cell) {
                    this.onGoblinHit();
                } else {
                    this.onMiss(); // Промах при клике по пустой ячейке
                }
            });
        });
    }

    start() {
        this.isRunning = true;
        this.scoreManager.reset();
        this.missedCount = 0;
        this.startGameLoop();
    }

    startGameLoop() {
        this.gameInterval = setInterval(() => {
            this.spawnGoblin();
        }, 1000);
    }

    spawnGoblin() {
        const randomCell = this.board.getRandomCell();
        this.goblin.showInCell(randomCell);
        this.currentGoblinCell = randomCell; // Запоминаем ячейку где появился гоблин

        if (this.currentGoblinTimeout) {
            clearTimeout(this.currentGoblinTimeout);
        }

        this.currentGoblinTimeout = setTimeout(() => {
            // Проверяем, что гоблин все еще в той же ячейке (не был убит)
            if (this.goblin.currentCell === this.currentGoblinCell && this.isRunning) {
                this.goblin.hide();
                this.onMiss(); // Промах при автоматическом исчезновении гоблина
            }
        }, 1000);
    }

    onGoblinHit() {
        this.scoreManager.addScore(1);
        this.goblin.hide();
        this.missedCount = 0;
        this.scoreManager.updateMisses(this.missedCount);
        this.currentGoblinCell = null; // Сбрасываем ячейку при попадании

        if (this.currentGoblinTimeout) {
            clearTimeout(this.currentGoblinTimeout);
            this.currentGoblinTimeout = null;
        }
    }

    onMiss() {
        this.missedCount++;
        this.scoreManager.updateMisses(this.missedCount);

        if (this.missedCount >= this.maxMissed) {
            this.gameOver();
        }
    }

    gameOver() {
        this.isRunning = false;
        clearInterval(this.gameInterval);

        if (this.currentGoblinTimeout) {
            clearTimeout(this.currentGoblinTimeout);
            this.currentGoblinTimeout = null;
        }

        this.goblin.hide();
        this.scoreManager.showGameOver();
    }

    restart() {
        this.goblin.hide();
        clearInterval(this.gameInterval);
        this.currentGoblinCell = null;

        if (this.currentGoblinTimeout) {
            clearTimeout(this.currentGoblinTimeout);
            this.currentGoblinTimeout = null;
        }

        this.start();
    }
}
