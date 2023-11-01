export default class Enemies {
    constructor() {
        this.enemiesContainer = document.querySelector(".enemies-container");
        this.enemies = [];
        this.stop = false;
        this.duration = 4000;
        this.noOpacity = false;
    }

    initEnemies() {
        setInterval(() => this.createMovingElement(), 350);
    }

    createMovingElement() {
        if (this.stop) return;

        const element = document.createElement("div");
        const image = document.createElement('img');
        const random = Math.random();

        if (random < 0.8) {
            image.src = '/assets/fish.svg';

            this.noOpacity
                ? element.className = "enemy enemy--no-opacity enemy--hidden"
                : element.className = "enemy enemy--hidden";
        } else {
            image.src = '/assets/octupus.svg';

            this.noOpacity
                ? element.className = "enemy enemy--big enemy--no-opacity enemy--hidden"
                : element.className = "enemy enemy--big enemy--hidden";
        }

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