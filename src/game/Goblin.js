import goblinImage from '../assets/goblin.png';

export class Goblin {
    constructor() {
        this.currentCell = null;
        this.element = null;
        this.createElement();
    }

    createElement() {
        this.element = document.createElement('img');
        this.element.src = goblinImage;
        this.element.className = 'goblin';
        this.element.alt = 'Goblin';
    }

    showInCell(cell) {
        this.hide();

        this.currentCell = cell;
        cell.append(this.element);
        this.element.classList.add('visible');
    }

    hide() {
        if (this.currentCell && this.element.parentNode) {
            this.element.classList.remove('visible');
            this.element.remove();
            this.currentCell = null;
        }
    }

    isVisible() {
        return this.currentCell !== null;
    }
}
