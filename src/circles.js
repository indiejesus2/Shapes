class Circles {
    static container = document.getElementById('canvas_container')
    static canvas = document.getElementById('canvas')

    constructor() {
        this.circles = [];
        this.render()
        this.draw()
        this.attachClickEventListener()
    }
    
}