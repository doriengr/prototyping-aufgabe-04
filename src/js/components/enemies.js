export default class Enemies {
    constructor() {
        this.enemiesContainer = document.querySelector(".enemies-container");
        this.enemies = [];
    }

    initEnemies() {
        setInterval(() => this.createMovingElement(), 1000);
    }

    createMovingElement() {
        const element = document.createElement("div");
        element.className = "enemy"; // Add the 'enemy' class
        element.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
        this.enemiesContainer.appendChild(element);
        this.enemies.push(element);

        const animation = element.animate(
            [
                { right: "0" },
                { right: "100%" }
            ],
            {
                duration: Math.floor(Math.random() * 4000) + 1000,
                iterations: 1,
            }
        );

        animation.onfinish = () => {
            this.enemies.shift(); // Remove the first enemy from the array
            element.remove();
        };
    }
}