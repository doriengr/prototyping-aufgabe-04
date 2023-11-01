export default class Waves {

    constructor() {
        this.wavesCount = 0;
        this.player = null;
        this.enemies = null;
        this.options = ['fast-enemies', 'no-torch', 'slow-scrolling', 'no-opacity'];
        this.timeDisplay = document.querySelector('.header__time-display');
        this.sound = new Audio('/assets/beep.wav');
        this.sound.loop = true;
        this.timer = null;
    }

    init(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.timer = setInterval(() => this.updateTimer(), 20000);
    }

    updateTimer() {
        this.wavesCount++;
        const randomIndex = Math.floor(Math.random() * this.options.length);
        const currentOption = this.options[randomIndex];
        const duration = 10000;

        console.log(currentOption);

        this.operateWave(duration, currentOption);
    }

    operateWave(duration, currentOption) {
        this.sound.play();

        switch (currentOption) {
            case 'fast-enemies':
                this.enemies.duration = 2000;
                this.timeDisplay.classList.add('header__time-display--wave');
                this.changeDurationAllFish(2000);

                setTimeout(() => {
                    this.enemies.duration = 4000;
                    this.timeDisplay.classList.remove('header__time-display--wave');
                    this.changeDurationAllFish(4000);
                    this.stopSound();
                }, duration);
                break;

            case 'no-torch':
                this.player.light.classList.add('player__light--no');
                this.timeDisplay.classList.add('header__time-display--wave');
                this.hideAllFishWithLess();

                setTimeout(() => {
                    this.player.light.classList.remove('player__light--no')
                    this.timeDisplay.classList.remove('header__time-display--wave');
                    this.stopSound();
                }, duration);
                break;

            case 'slow-scrolling':
                this.player.slowScrolling = true;
                this.timeDisplay.classList.add('header__time-display--wave');

                setTimeout(() => {
                    this.player.slowScrolling = false;
                    this.timeDisplay.classList.remove('header__time-display--wave');
                    this.stopSound();
                }, duration);
                break;

            case 'no-opacity':
                this.enemies.noOpacity = true;
                this.timeDisplay.classList.add('header__time-display--wave');
                this.hideAllFish();

                setTimeout(() => {
                    this.showAllFish();
                    this.enemies.noOpacity = false;
                    this.timeDisplay.classList.remove('header__time-display--wave');
                    this.stopSound();
                }, duration);
                break;
        }
    }

    hideAllFish() {
        this.enemies.enemies.forEach(enemy => {
            enemy.classList.add('enemy--no-opacity');
        })
    }

    showAllFish() {
        this.enemies.enemies.forEach(enemy => {
            enemy.classList.remove('enemy--no-opacity');
        })
    }

    hideAllFishWithLess() {
        this.enemies.enemies.forEach(enemy => {
            enemy.classList.add('enemy--hidden');
        })
    }

    changeDurationAllFish(duration) {
        this.enemies.enemies.forEach(enemy => {
            enemy.duration = duration;
        })
    }

    stopSound() {
        this.sound.pause();
        this.sound.currentTime = 0;
    }

    gameStop() {
        clearInterval(this.timer);
        this.stopSound();
    }
}