class Snake
{

    private element: Element | null;
    private topPosition: number;
    private leftPosition: number;
    private step: number;

    private direction: string = "ArrowRight";
    private timeStep: number = 70;

    private oldStep: number = 0;

    constructor(
        element: Element | null, 
        topPosition: number, 
        leftPosition: number,
        step: number
    ){
        this.element = element;
        this.topPosition = topPosition;
        this.leftPosition = leftPosition;
        this.step = step;
    }

    move = (direction: string) => {
        if(this.element instanceof HTMLDivElement){
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

        if(
            this.topPosition === -10 || 
            this.leftPosition === -10 ||
            this.topPosition === 570 || 
            this.leftPosition === 570
        ){
            this.over();
        }
    }

    over = ()=>{
        if(this.element instanceof HTMLDivElement){
            this.topPosition = 290;
            this.leftPosition = 290;

            this.element.style.top = this.topPosition + "px";
            this.element.style.left = this.leftPosition + "px";
        }
    }

    stop = ()=>{
        this.oldStep = this.step;
        this.step = 0;
    };

    restart = ()=>{
        this.step = this.oldStep;
    };

    moveInterval = setInterval(()=>{
        this.move(this.direction);
    }, this.timeStep);

    setMoveInterval = ()=>{
        this.moveInterval = setInterval(()=>{
            this.move(this.direction);
        }, this.timeStep);
    };

    setDirection = (direction: string = "ArrowLeft") => {
        this.direction = direction;
    };

    getTopPosition = () => this.topPosition;
    
    getLeftPosition = () => this.leftPosition;

    getStep = ()=> this.step;
}

const snake = new Snake(document.querySelector("#snake"), 290, 290, 10);
const btn_pause = document.querySelector("#btn_pause");

document.addEventListener("keydown", (event)=>{
    snake.setDirection(event.code);
});

const startGame = ()=>{
    clearInterval(snake.moveInterval);
    snake.setMoveInterval();
};

if(btn_pause instanceof HTMLButtonElement){
    btn_pause.addEventListener("click", ()=>{
        if(snake.getStep() === 0){
            snake.restart();
            btn_pause.textContent = "=";
        } else {
            snake.stop();
            btn_pause.textContent = ">";
        }
    });
}