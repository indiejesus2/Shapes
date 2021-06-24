class Toys {
    static container = document.getElementById('canvas_container')
    static canvas = document.getElementById("canvas")


    constructor(toys) {
        this.toys = toys;
        this.ctx = canvas.getContext('2d')
        this.draw()
        this.attachClickEventListener()
        this.attachMouseHoverListener()
        this.attachMouseDownListener()
    }

    attachColorChange(toy) {
        let colors = document.getElementsByName("color");
        colors.forEach(color => {
            if (color.parentElement.id == toy.id) {
                color.addEventListener("input", this.handleColor);
            }
        })
    }

    handleColor = (e) => {
        this.toys.forEach(function(toy) {
            if (toy.id === parseInt(e.target.parentElement.id)) {
                toy.color = e.target.value
            }
        })
        this.draw()
    }

    handleMouseMove = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.toys.forEach(toy => {
            if (this.isMouseInShape(e.offsetX, e.offsetY, toy)) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = `gold`
                this.ctx.arc(toy.x, toy.y, toy.r*2, toy.sAngle, toy.eAngle, true)
                this.ctx.closePath()
                this.ctx.fill()
            }
        })
    }

    handleMove = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.toys.forEach(toy => {
            if (this.isMouseInShape(e.offsetX, e.offSetY, toy)) {
                debugger
            }
        })
    }

    attachMouseHoverListener() {
        canvas.addEventListener('mouseover', this.handleMouseMove);
    }
    
    attachMouseDownListener() {
        canvas.addEventListener('mousedown', this.handleMove);
    }

    attachClickEventListener() {
        canvas.addEventListener("click", this.handleOnClick);
    }

    isMouseInShape(mx, my, toy){
        if (toy.r) {
            var dx = mx-toy.x;
            var dy = my-toy.y;
            if(dx**2+dy**2<toy.r*toy.r) {
                return true
            }
        } else {
            var rLeft = toy.x
            var rRight=toy.x+toy.width;
            var rTop=toy.y
            var rBott=rTop+toy.height
            if(mx>rLeft && mx<rRight && my>rTop && my<rBott) {
                return true
            }
        }
    }

    handleOnClick = (e) => {
        this.toys.forEach(toy => {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toy)) {
                if (!document.getElementById(toy.id)) {
                    new Forms(toy)
                    this.attachColorChange(toy)
                }
            }
        })
    }
    
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)        
        this.toys.forEach(toy => {
            if (toy.r) {
                this.ctx.beginPath();
                this.ctx.fillStyle = `${toy.color}`
                this.ctx.arc(toy.x, toy.y, toy.r, toy.sAngle, toy.eAngle, true)
                this.ctx.closePath()
                this.ctx.fill()
            } else {
                this.ctx.fillStyle = `${toy.color}`
                this.ctx.fillRect(toy.x, toy.y, toy.width, toy.height)
            }
        })
        
    }

}
