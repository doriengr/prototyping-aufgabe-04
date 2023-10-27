export default class Player {

    constructor() {
        this.wrapper = document.querySelector(".player");
        this.element = document.querySelector('.player__element');
        this.light = document.querySelector('.player__light');
        this.playerPositionY = window.innerHeight / 2;
    }

    initPlayer() {
        this.wrapper.style.top = this.playerPositionY + "px";
        this.addEventListener();
    }

    addEventListener() {
        window.addEventListener("wheel", (e) => {
            this.playerPositionY += e.deltaY;

            const maxPosition = window.innerHeight - (this.wrapper.clientHeight - 100);
            this.playerPositionY = Math.min(maxPosition, Math.max(0, this.playerPositionY));
            if (this.playerPositionY <= 40) return;

            this.wrapper.style.top = this.playerPositionY + "px";
        });
    }
}