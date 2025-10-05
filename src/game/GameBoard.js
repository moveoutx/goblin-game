export class GameBoard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.cells = [];
        this.element = document.getElementById('game-board');
    }

    create() {
        this.element.innerHTML = '';
        this.cells = [];

        for (let i = 0; i < this.rows * this.cols; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            this.element.append(cell);
            this.cells.push(cell);
        }
    }

    getRandomCell() {
        const randomIndex = Math.floor(Math.random() * this.cells.length);
        return this.cells[randomIndex];
    }

    clearAllGoblins() {
        const allGoblins = this.element.querySelectorAll('.goblin');
        allGoblins.forEach(goblin => {
            goblin.remove();
        });
    }

    clearGoblin() {
        const goblin = this.element.querySelector('.goblin');
        if (goblin) {
            goblin.remove();
        }
    }
}
