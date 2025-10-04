import './styles.css';
import { Game } from './game/Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});
