import { Goblin } from '../game/Goblin.js';

describe('Goblin', () => {
    let goblin;
    let testCell;

    beforeEach(() => {
        document.body.innerHTML = '<div class="cell"></div>';
        testCell = document.querySelector('.cell');
        goblin = new Goblin();
    });

    test('should create goblin element', () => {
        expect(goblin.element).toBeDefined();
        expect(goblin.element.tagName).toBe('IMG');
        expect(goblin.element.className).toBe('goblin');
    });

    test('should show goblin in cell', () => {
        goblin.showInCell(testCell);

        expect(goblin.currentCell).toBe(testCell);
        expect(testCell.querySelector('.goblin')).toBe(goblin.element);
        expect(goblin.element.classList.contains('visible')).toBe(true);
    });

    test('should hide goblin', () => {
        goblin.showInCell(testCell);
        goblin.hide();

        expect(goblin.currentCell).toBeNull();
        expect(testCell.querySelector('.goblin')).toBeNull();
    });

    test('should check if goblin is visible', () => {
        expect(goblin.isVisible()).toBe(false);

        goblin.showInCell(testCell);
        expect(goblin.isVisible()).toBe(true);

        goblin.hide();
        expect(goblin.isVisible()).toBe(false);
    });
});
