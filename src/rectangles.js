class Rectangles extends Toys {

    constructor() {
        super()
        this.render()
        Toys.draw()
    }
   
    render() {
        toys.push({
            id: toys.length + 1,
            x: parseInt(Math.random() * (250) + 50),
            y: parseInt(Math.random() * (250) + 75),
            width: 50,
            height: 75,
            color: "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)),
            name: "Rectangle",
            dragging: false,
            hover: false,
            selected: false
        })
    }
    
}