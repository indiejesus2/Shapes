class Circles extends Toys{

    constructor() {
        super()
        this.render()
        Toys.draw()
    }

    render() {
        toys.push({
            id: toys.length + 1,
            x: parseInt(Math.random() * 250) + 25,
            y: parseInt(Math.random() * 250) + 25,
            radius: 25,
            sAngle: 0,
            eAngle: 2 * Math.PI,
            color: "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)),
            name: "Circle",
            dragging: false,
            hover: false,
            selected: false
        })
    }
       
}