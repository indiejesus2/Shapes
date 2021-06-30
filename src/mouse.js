class Mouse {
    
    constructor() {
        this.shift = false
        this.attachClickEventListener()
        this.attachMouseDownListener()
        this.attachMouseMoveListener()
        this.attachMouseUpListener()
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
    
    mouseDown = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        toys.forEach(toy => {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toy)) {
                toy.dragging = true
            } else if (toy.selected == true && this.shift == true) {
                toy.dragging = true
            } else if (toy.selected == true && e.shiftKey == true) {
                toy.dragging = true
            } else {
                toy.dragging = false
            }
        })
        this.startX=e.offsetX
        this.startY=e.offsetY
        new Forms()
    }
    
    mouseMove = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation() 
        let dx = e.offsetX - this.startX
        let dy = e.offsetY - this.startY
        toys.forEach(toy => {
            if (toy.dragging == true) {
                toy.x+=dx
                toy.y+=dy
                toy.hover = true
            } else if (this.isMouseInShape(e.offsetX, e.offsetY, toy)) {
                toy.hover = true
            } else {
                toy.hover = false
            }
            Toys.draw()
        })
        this.startX=e.offsetX
        this.startY=e.offsetY
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
        toys.forEach(toy => {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toy)) {
                toy.selected = toy.selected == false ? true : false
            } else if (toy.selected == true && e.shiftKey == true) {
                toy.selected = true
                this.shift = true
            } else {
                toy.selected = false
                this.shift = false
            }
            new Forms()
            Toys.draw()
            console.log(toy.selected)
        })
    }

}