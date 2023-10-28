export default class Player {

    constructor() {
        this.wrapper = document.querySelector(".player");
        this.element = document.querySelector('.player__element');
        this.light = document.querySelector('.player__light');
        this.playerPositionY = window.innerHeight / 4 - 45;
        this.stop = false;
        this.slowScrolling = false;
    }

    initPlayer() {
        this.wrapper.style.top = this.playerPositionY + "px";
        this.addEventListener();
    }

    addEventListener() {
        let currentScrollY = window.scrollY;
        window.addEventListener("wheel", (e) => {
            if (this.stop) return;

            const scrollSpeedFactor = this.slowScrolling ? 0.4 : 1;
            this.playerPositionY += e.deltaY * scrollSpeedFactor;

            const maxPosition = window.innerHeight - (this.wrapper.clientHeight - 200);
            this.playerPositionY = Math.min(maxPosition, Math.max(-200, this.playerPositionY));

            this.wrapper.style.top = this.playerPositionY + "px";

            let rotation = 0;

            if (e.deltaY < 0) {
                rotation = -4;
            } else if (e.deltaY > 0) {
                rotation = 4;
            }

            this.element.style.transform = `rotate(${rotation}deg)`;
            this.light.style.transform = `translate(0,12px) rotate(${rotation}deg)`;
            currentScrollY = window.scrollY;
        });
    }
}