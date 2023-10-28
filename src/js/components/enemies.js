export default class Enemies {
    constructor() {
        this.enemiesContainer = document.querySelector(".enemies-container");
        this.enemies = [];
        this.stop = false;
        this.duration = 4500;
        this.noOpacity = false;
    }

    initEnemies() {
        setInterval(() => this.createMovingElement(), 500);
    }

    createMovingElement() {
        if (this.stop) return;

        const element = document.createElement("div");
        const image = document.createElement('img');
        image.src = '/assets/fish.svg';

        this.noOpacity
            ? element.className = "enemy enemy--no-opacity enemy--hidden"
            : element.className = "enemy enemy--hidden";

        element.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
        this.enemiesContainer.appendChild(element);
        element.appendChild(image);
        this.enemies.push(element);

        const animation = element.animate(
            [
                { right: "0" },
                { right: "100%" }
            ],
            {
                duration: this.duration,
                iterations: 1,
            }
        );

        animation.onfinish = () => {
            this.enemies.shift();
            element.remove();
        };
    }

    gameStop() {
        this.stop = true;
        this.enemies.forEach(enemy => {
            enemy.remove();
        });
    }
}