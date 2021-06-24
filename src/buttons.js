class Buttons {
    static canvas = document.getElementById("canvas")

    constructor() {
        this.attachClickEventListener()
        this.shapes = []
    }

    randomColor() {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        return (`#${randomColor}`)
    }

    attachClickEventListener() {
        document.addEventListener("click", this.handleOnClick);
    }

    handleOnClick = (e) => {
        if (e.target.id == "add_rectangle") {
            this.shapes.push({
                id: this.shapes.length + 1,
                x: (Math.random() * (canvas.width - 50)),
                y: (Math.random() * (canvas.height - 75)),
                width: 50,
                height: 75,
                color: this.randomColor(),
                name: "Rectangle"
            })
            new Toys(this.shapes)
        } else if (e.target.id == "add_circle") {
            this.shapes.push({
                id: this.shapes.length + 1,
                x: (Math.random() * (canvas.width - 25)),
                y: (Math.random() * (canvas.height - 25)),
                r: 25,
                sAngle: 0,
                eAngle: 2 * Math.PI,
                color: this.randomColor(),
                name: "Circle"
            })
            new Toys(this.shapes)
        }
    }
}