class Circles extends Toys {

    constructor() {
        super()
        this.render()
        this.draw()
    }

    render() {
        toys.push({
            id: toys.length + 1,
            x: parseInt(Math.random() * 250) + 25,
            y: parseInt(Math.random() * 250) + 25,
            r: 25,
            sAngle: 0,
            eAngle: 2 * Math.PI,
            color: this.randomColor(),
            name: "Circle",
            dragging: false,
            hover: false,
            selected: false
        })
    }
       
}