export default class Player {

    constructor() {
        this.wrapper = document.querySelector(".player");
        this.element = document.querySelector('.player__element');
        this.light = document.querySelector('.player__light');
        this.playerPositionY = window.innerHeight / 2;
        this.stop = false;
    }

    initPlayer() {
        this.wrapper.style.top = this.playerPositionY + "px";
        this.addEventListener();
    }

    addEventListener() {
        window.addEventListener("wheel", (e) => {
            if (this.stop) return;
            this.playerPositionY += e.deltaY;

            const maxPosition =window.innerHeight - (this.wrapper.clientHeight - 200);
            this.playerPositionY = Math.min(maxPosition, Math.max(-200, this.playerPositionY));

            this.wrapper.style.top = this.playerPositionY + "px";
        });
    }
}