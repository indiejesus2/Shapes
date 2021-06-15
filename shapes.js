class Shapes {
    static container = document.getElementById('canvas_container')
    static canvas = document.getElementById("canvas")

    constructor() {
        // this.renderCanvas()
        // this.renderButtons()
        this.attachClickEventListener()
    }

    attachClickEventListener() {
        document.addEventListener("click", this.handleOnClick);
    }

    handleOnClick = (e) => {
        if (e.target.id == "add_rectangle") {
            // let canvas = document.getElementById("canvas")
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = "green";
            ctx.fillRect(10, 10, 150, 100)
        }
    }

    renderCanvas() {
        const canvas = document.createElement("canvas");
        // canvas.id = "canvas"
        debugger
        this.canvas = canvas
        this.constructor.container.append(canvas)
    }

    renderButtons() {
        const rectangle = document.createElement("button");
        rectangle.className = "add_rectangle"
        rectangle.innerText = "Add Rectangle"
        this.rectangle = rectangle
        this.constructor.container.append(rectangle)
    }



}
