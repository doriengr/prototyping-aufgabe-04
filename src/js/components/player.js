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
        window.addEventListener("wheel", (e) => {
            if (this.stop) return;

            const scrollSpeedFactor = this.slowScrolling ? 0.4 : 1;
            this.playerPositionY += e.deltaY * scrollSpeedFactor;

            const maxPosition = window.innerHeight - (this.wrapper.clientHeight - 200);
            this.playerPositionY = Math.min(maxPosition, Math.max(-200, this.playerPositionY));

            this.wrapper.style.top = this.playerPositionY + "px";
        });
    }
}