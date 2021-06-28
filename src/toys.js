class Toys {
    static radius = document.getElementsByName('radius')
    static height = document.getElementsByName("height")
    static width = document.getElementsByName("width")

    
    constructor() {
        this.startX
        this.startY
        this.draw()
        this.attachClickEventListener()
        this.attachMouseDownListener()
        this.attachMouseMoveListener()
        this.attachMouseUpListener()
    }

    randomColor() {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        return (`#${randomColor}`)
    }
  
    attachColorChange(toy) {
        let colors = document.getElementsByName("color");
        colors.forEach(color => {
            if (color.form.id == toy.id) {
                color.addEventListener("input", this.handleColor);
            }
        })
    }
    
    handleColor = (e) => {
        for (let i = 0; i<toys.length;i++) {
            if (toys[i].id === parseInt(e.target.form.id)) {
                toys[i].color = e.target.value
            }
        }
        this.draw()
    }

    attachChange(toy) {
        if (toy.selected == true) {
            if (toy.name == 'Rectangle' && !!height) {
                if (height.length > 1) {
                    for (let i=0;i<height.length;i++) {
                        height[i].addEventListener("input", this.handleHeight)
                        width[i].addEventListener("input", this.handleWidth)
                    }
                } else {
                    height.addEventListener("input", this.handleHeight)
                    width.addEventListener("input", this.handleWidth)
                }
            } else if (!!radius) {
                if (radius.length > 1) {
                    for (let i = 0; i<radius.length;i++) {
                        radius[i].addEventListener("input", this.handleRadius)
                    }
                } else {
                    radius.addEventListener("input", this.handleRadius)
                }
            }
        }
    }

    handleHeight = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.form.id)) {
                toy.height = parseInt(e.target.value)
            }
        })
        this.draw()
    }

    handleWidth = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.form.id)) {
                debugger
                toy.width = parseInt(e.target.value)
            }
        })
        this.draw()
    }

    handleRadius = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.form.id)) {
                toy.r = parseInt(e.target.value)
            }
        })
        this.draw()
    }

    mouseOver = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        let mouseX=e.clientX-e.offsetX
        let mouseY=e.clientY-e.offsetY
        for (let i = 0; i<toys.length;i++) {
            // debugger
            if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                console.log("hey")
            }
        }
    }

    mouseDown = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        var mx = e.clientX - e.offsetX
        var my = e.clientY - e.offsetY
        for (let i = 0; i<toys.length;i++) {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                toys[i].dragging = true
            } else if (toys[i].selected == true) {
                toys[i].dragging = true
            } else {
                toys[i].selected = false
        }
        this.startX=e.offsetX
        this.startY=e.offsetY
        new Forms()
        }
    }
    
    mouseMove = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation() 
        let dx = e.offsetX - this.startX
        let dy = e.offsetY - this.startY
        for (let i=0;i<toys.length;i++) {
            let toy = toys[i]
            if (toy.dragging == true) {
                toy.x+=dx
                toy.y+=dy
                toy.hover = true
                new Forms()
            } else if (this.isMouseInShape(e.offsetX, e.offsetY, toy)) {
                toy.hover = true
            } else {
                toy.hover = false
                new Forms()

            }
        }
        this.draw()
        this.startX=e.offsetX
        this.startY=e.offsetY
    }
    
    attachClickEventListener() {
        canvas.addEventListener("click", this.handleOnClick);
    }

    attachMouseDownListener() {
        canvas.addEventListener('mousedown', this.mouseDown);
    }
    
    attachMouseUpListener() {
        canvas.addEventListener('mouseup', function() {
            toys.forEach(toy => toy.dragging = false)
        });
    }

    attachMouseMoveListener() {
        canvas.addEventListener('mousemove', this.mouseMove);
    }


    isMouseInShape(mx, my, toy){
        if (toy.name == "Circle") {
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
        e.preventDefault()
        e.stopImmediatePropagation()
        for (let i = 0; i<toys.length;i++) {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                toys[i].selected = toys[i].selected == false ? true : false
            } else if (toys[i].selected == true && e.shiftKey == true) {
                toys[i].selected = true
            } else {
                toys[i].selected = false
            }
            new Forms()
            this.draw()
        }
    }

    draw() {   
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        toys.forEach(toy => {
            if (toy.r) {
                ctx.beginPath();
                ctx.fillStyle = `${toy.color}`
                ctx.arc(toy.x, toy.y, toy.r, toy.sAngle, toy.eAngle, true)
                ctx.closePath()
                ctx.fill()
                if (toy.hover == true) {
                    ctx.lineWidth = 6;
                    ctx.strokeStyle = 'rgba(0,0,255,0.5)'
                    ctx.stroke()
                }
                if (toy.selected == true) {
                    ctx.beginPath()
                    ctx.arc(toy.x, toy.y, toy.r*1.25, toy.sAngle, toy.eAngle, true)
                    ctx.strokeStyle = "gold"
                    ctx.stroke()
                }
            } else {
                ctx.fillStyle = `${toy.color}`
                ctx.fillRect(toy.x, toy.y, toy.width, toy.height)
                if (toy.hover == true) {
                    ctx.lineWidth = 6;
                    ctx.strokeStyle = 'rgba(0,0,255,0.5)'
                    ctx.strokeRect(toy.x, toy.y, toy.width, toy.height)
                }
                if (toy.selected == true) {
                    ctx.lineWidth = 4
                    ctx.strokeStyle = "gold"
                    debugger
                    ctx.strokeRect(toy.x-5, toy.y-5, toy.width+10, toy.height+10)

                }
            }
        })
        
    }

}
