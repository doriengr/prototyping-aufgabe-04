import Player from './components/player.js';
import Enemies from "./components/enemies.js";

let player = new Player();
let enemies = new Enemies();

init();

function checkCollisions() {
    const playerLight = player.light;
    const playerRect = player.element.getBoundingClientRect();

    const playerLightPolygon = [
        [playerLight.getBoundingClientRect().right, playerLight.getBoundingClientRect().top],
        [playerLight.getBoundingClientRect().right, playerLight.getBoundingClientRect().bottom],
        [playerLight.getBoundingClientRect().left, (playerLight.getBoundingClientRect().top) + (playerLight.getBoundingClientRect().height / 2 )]
    ];

    drawPolygon(playerLightPolygon);

    enemies.enemies.forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();
        const enemyX = (enemyRect.left + enemyRect.right) / 2;
        const enemyY = (enemyRect.top + enemyRect.bottom) / 2;

        isPointInPolygon(enemyX, enemyY, playerLightPolygon)
            ? enemy.classList.remove('enemy--hidden')
            : enemy.classList.add('enemy--hidden');

        if (
            playerRect.right > enemyRect.left &&
            playerRect.left < enemyRect.right &&
            playerRect.bottom > enemyRect.top &&
            playerRect.top < enemyRect.bottom
        ) {
            handleCollision();
        }
    });
}

function drawPolygon(polygon) {
    const canvas = document.getElementById('polygonCanvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(polygon[0][0], polygon[0][1]);

    for (let i = 1; i < polygon.length; i++) {
        context.lineTo(polygon[i][0], polygon[i][1]);
    }

    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = 'red';
    context.fillStyle = 'rgba(255, 0, 0, 0.2)';
    context.stroke();
    context.fill();
}

function isPointInPolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0];
        const yi = polygon[i][1];
        const xj = polygon[j][0];
        const yj = polygon[j][1];
        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
}

function handleCollision() {
    console.log("Collision detected!");
}

function gameLoop() {
    checkCollisions();
    requestAnimationFrame(gameLoop);
}

function init() {
    player.initPlayer();
    enemies.initEnemies();
    gameLoop();
}