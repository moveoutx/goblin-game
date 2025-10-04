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
                if (this.isRunning && this.goblin.currentCell === cell) {
                    this.onGoblinHit();
                } else {
                    this.onMiss();
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

        setTimeout(() => {
            if (this.goblin.currentCell === randomCell && this.isRunning) {
                this.goblin.hide();
                this.onMiss();
            }
        }, 1000);
    }

    onGoblinHit() {
        this.scoreManager.addScore(1);
        this.goblin.hide();
        this.missedCount = 0;
        this.scoreManager.updateMisses(0);
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
        this.goblin.hide();
        this.scoreManager.showGameOver();
    }

    restart() {
        this.goblin.hide();
        clearInterval(this.gameInterval);
        this.start();
    }
}