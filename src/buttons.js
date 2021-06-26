class Buttons {

    constructor() {
        this.attachNewShapeListener()
    }

    attachNewShapeListener() {
        document.addEventListener("click", this.handleNewShape);
    }
    
    handleNewShape = (e) => {
        if (e.target.id == "add_rectangle") {
            new Rectangles()
        } else if (e.target.id == "add_circle") {
            new Circles()
        }
    }

}