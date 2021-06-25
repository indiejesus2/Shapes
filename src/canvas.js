class Canvas {
    static container = document.getElementById('canvas_container')
    static canvas = document.getElementById("canvas")

    static context() {
        return this.ctx = canvas.getContext('2d')
    }

    static toys() {
        let toys = []
        return toys
    }

}