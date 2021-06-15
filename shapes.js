class Shapes {
    static container = document.getElementById('canvas_container')

    constructor() {
        this.renderCanvas()
        this.renderButtons()
        this.attachClickEventListener()
    }

    attachClickEventListener() {
        document.addEventListener("click", this.handleOnClick);
    }

    handleOnClick = (e) => {
        debugger
        if (e.target.id == "add_rectangle") {
            console.log("hey")
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = "green";
            ctx.fillRect(10, 10, 150, 100)
        }
    }

    renderCanvas() {
        debugger
        const canvas = document.createElement("canvas");
        canvas.className = "canvas"
        this.canvas = canvas
        this.constructor.container.append(canvas)
    }

    renderButtons() {
        const rectangle = document.createElement("rectangle");
        rectangle.className = "add_rectangle"
        this.rectangle = rectangle
        this.constructor.container.append(rectangle)
    }



}
