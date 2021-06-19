class Buttons {
    static canvas = document.getElementById("canvas")

    constructor() {
        this.attachClickEventListener()
    }

    attachClickEventListener() {
        document.addEventListener("click", this.handleOnClick);
    }

    handleOnClick = (e) => {
        if (e.target.id == "add_rectangle") {
            new Rectangles()
        } else if (e.target.id == "add_circle") {
            new Circles()
        }
    }
}