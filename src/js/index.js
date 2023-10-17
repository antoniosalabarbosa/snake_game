"use strict";
class Snake {
    constructor(element, topPosition, leftPosition, step) {
        this.direction = "ArrowRight";
        this.timeStep = 70;
        this.oldStep = 0;
        this.move = (direction) => {
            if (this.element instanceof HTMLDivElement) {
                switch (direction) {
                    case "ArrowUp":
                        this.topPosition = this.topPosition - this.step;
                        this.element.style.top = this.topPosition + "px";
                        break;
                    case "ArrowDown":
                        this.topPosition = this.topPosition + this.step;
                        this.element.style.top = this.topPosition + "px";
                        break;
                    case "ArrowLeft":
                        this.leftPosition = this.leftPosition - this.step;
                        this.element.style.left = this.leftPosition + "px";
                        break;
                    case "ArrowRight":
                        this.leftPosition = this.leftPosition + this.step;
                        this.element.style.left = this.leftPosition + "px";
                        break;
                    default:
                        break;
                }
            }
            if (this.topPosition === -10 ||
                this.leftPosition === -10 ||
                this.topPosition === 570 ||
                this.leftPosition === 570) {
                this.over();
            }
        };
        this.over = () => {
            if (this.element instanceof HTMLDivElement) {
                this.topPosition = 290;
                this.leftPosition = 290;
                this.element.style.top = this.topPosition + "px";
                this.element.style.left = this.leftPosition + "px";
            }
        };
        this.stop = () => {
            this.oldStep = this.step;
            this.step = 0;
        };
        this.restart = () => {
            this.step = this.oldStep;
        };
        this.moveInterval = setInterval(() => {
            this.move(this.direction);
        }, this.timeStep);
        this.setMoveInterval = () => {
            this.moveInterval = setInterval(() => {
                this.move(this.direction);
            }, this.timeStep);
        };
        this.setDirection = (direction = "ArrowLeft") => {
            this.direction = direction;
        };
        this.getTopPosition = () => this.topPosition;
        this.getLeftPosition = () => this.leftPosition;
        this.getStep = () => this.step;
        this.element = element;
        this.topPosition = topPosition;
        this.leftPosition = leftPosition;
        this.step = step;
    }
}
const snake = new Snake(document.querySelector("#snake"), 290, 290, 10);
const btn_pause = document.querySelector("#btn_pause");
document.addEventListener("keydown", (event) => {
    snake.setDirection(event.code);
});
const startGame = () => {
    clearInterval(snake.moveInterval);
    snake.setMoveInterval();
};
if (btn_pause instanceof HTMLButtonElement) {
    btn_pause.addEventListener("click", () => {
        if (snake.getStep() === 0) {
            snake.restart();
            btn_pause.textContent = "=";
        }
        else {
            snake.stop();
            btn_pause.textContent = ">";
        }
    });
}
