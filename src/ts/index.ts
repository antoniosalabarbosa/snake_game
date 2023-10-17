class Box
{
    
}

class Snake
{

    private element: Element | null;
    private topPosition: number;
    private leftPosition: number;
    private step: number;

    private direction: string;

    constructor(
        element: Element | null, 
        topPosition: number, 
        leftPosition: number,
        step: number,
        direction: string = "ArrowRight"
    ){
        this.element = element;
        this.topPosition = topPosition;
        this.leftPosition = leftPosition;
        this.step = step;
        this.direction = direction;
    }

    move = (direction: string) => {
        if(this.element instanceof HTMLDivElement){
            switch (direction) {
                case "ArrowUp":
                    this.direction = "ArrowUp";
                    clearInterval(this.moveInterval());

                    this.topPosition = this.topPosition - this.step;
                    this.element.style.top = this.topPosition + "px";
                break;
        
                case "ArrowDown":
                    this.direction = "ArrowDown";
                    clearInterval(this.moveInterval());

                    this.topPosition = this.topPosition + this.step;
                    this.element.style.top = this.topPosition + "px";
                break;

                case "ArrowLeft":
                    this.direction = "ArrowLeft";
                    clearInterval(this.moveInterval());

                    this.leftPosition = this.leftPosition - this.step;
                    this.element.style.left = this.leftPosition + "px";
                break;
        
                case "ArrowRight":
                    this.direction = "ArrowRight";
                    clearInterval(this.moveInterval());

                    this.leftPosition = this.leftPosition + this.step;
                    this.element.style.left = this.leftPosition + "px";
                break;
    
                default:
                    break;
            }
        }

        if(
            this.topPosition === 0 || 
            this.leftPosition === 0 ||
            this.topPosition === 560 || 
            this.leftPosition === 560
        ){
            this.over();
        }
    }

    moveInterval = ()=>{
        return setInterval(()=>{
            this.move(this.direction);
        }, 500)
    };

    over = ()=>{
        if(this.element instanceof HTMLDivElement){
            this.topPosition = 290;
            this.leftPosition = 290;

            this.element.style.top = this.topPosition + "px";
            this.element.style.left = this.leftPosition + "px";
        }
    }

    getTopPosition = () => this.topPosition;
    
    getLeftPosition = () => this.leftPosition;
}

const snake = new Snake(
    document.querySelector("#snake"), 290, 290, 10
);

document.addEventListener("keydown", ( event )=>{
    snake.move(event.code);
});

window.onload = ()=>{
    snake.moveInterval();
};