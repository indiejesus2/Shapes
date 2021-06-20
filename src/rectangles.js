class Rectangles {
    static container = document.getElementById('canvas_container')
    static canvas = document.getElementById("canvas")


    constructor() {
        this.shapes = [];
        this.render()
        this.draw()
        this.attachClickEventListener()
    }

    attachClickEventListener() {
        canvas.addEventListener("click", this.handleOnClick);
    }

    isMouseInShape(mx, my, shape){
        var rLeft = shape.x
        var rRight=shape.x+shape.width;
        var rTop=shape.y
        var rBott=rTop+shape.height
        if(mx>rLeft && mx<rRight && my>rTop && my<rBott) {
            return true
        }
    }

    handleOnClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const startX = parseInt(e.clientX-e.offsetX);
        const startY = parseInt(e.clientY - e.offsetY);
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.shapes.forEach(rect => {
            ctx.beginPath()
            ctx.rect(rect.x, rect.y, rect.width, rect.height)
            ctx.fill()
            ctx.fillStyle = 'green'
            if(this.isMouseInShape(startX, startY, rect)) {
                ctx.fillStyle = 'red'
            }
        })
    }
        // this.shapes.forEach(shape => {
        //     var x = e.pageX - (canvas.offsetLeft + canvas.clientLeft);
        //     var y = e.pageY - (canvas.offsetTop + canvas.clientTop);
        //     let mouseX = (e.clientX - canvas.offsetLeft)
        //     let mouseY = (e.clientY - canvas.offsetTop)
        //     let ctx = canvas.getContext('2d')
        //     ctx.clearRect(0, 0, canvas.width, canvas.height)
        //     ctx.beginPath()
        //     ctx.rect(shape.x, shape.y, shape.width, shape.height)
        //     ctx.fill()
        //     ctx.closePath()
        //     if (ctx.isPointInPath(e.clientX, e.clientY)) {
        //         console.log('hey')
        //     } else {
        //         console.log('nope', mouseX, mouseY)
        //     }
        // })
        // this.shapes.forEach(shape => {  
        //     if (y > shape.top && y < shape.top + shape.height && x > shape.left && x < shape.left + shape.width) {
        //         console.log("hey")
        //     }
        // })
    // }
    
    render() {
        this.shapes.push({
            x: 10,
            y: 10,
            width: 50,
            height: 75,
            name: "Rectangle"
        })
        // var canvasOffset=$("#canvas").offset();
        // var offsetX=canvasOffset.left;
        // var offsetY=canvasOffset.top;
        // var canvasWidth=canvas.width;
        // var canvasHeight=canvas.height;
        // var isDragging=false;
    }
    
    draw() {
    let ctx = canvas.getContext('2d')

        this.shapes.forEach(shape => {
            ctx.rect(shape.x, shape.y, shape.width, shape.height)
            ctx.fill()
        })
        
    }

}


// var canvas=document.getElementById("canvas");
// var ctx=canvas.getContext("2d");
// var BB=canvas.getBoundingClientRect();
// var offsetX=BB.left;
// var offsetY=BB.top;
// var WIDTH = canvas.width;
// var HEIGHT = canvas.height;

// // drag related variables
// var dragok = false;
// var startX;
// var startY;

// // an array of objects that define different rectangles
// var rects=[];


// // listen for mouse events
// canvas.onmousedown = myDown;
// canvas.onmouseup = myUp;
// canvas.onmousemove = myMove;

// // call to draw the scene
// draw();

// // draw a single rect
// function rect(x,y,w,h) {
//  ctx.beginPath();
//  ctx.rect(x,y,w,h);
//  ctx.closePath();
//  ctx.fill();
// }

// // clear the canvas
// function clear() {
//  ctx.clearRect(0, 0, WIDTH, HEIGHT);
// }

// // redraw the scene
// function draw() {
//     clear();
//     ctx.fillStyle = "#FAF7F8";
//     rect(0,0,WIDTH,HEIGHT);
//     // redraw each rect in the rects[] array
//     for(var i=0;i<rects.length;i++){
//         var r=rects[i];
//         ctx.fillStyle=r.fill;
//         rect(r.x,r.y,r.width,r.height);
//     }
// }


// // handle mousedown events
// function myDown(e){

//     // tell the browser we're handling this mouse event
//     e.preventDefault();
//     e.stopPropagation();

//     // get the current mouse position
//     var mx=parseInt(e.clientX-offsetX);
//     var my=parseInt(e.clientY-offsetY);

//     // test each rect to see if mouse is inside
//     dragok=false;
//     for(var i=0;i<rects.length;i++){
//         var r=rects[i];
//         if(mx>r.x && mx<r.x+r.width && my>r.y && my<r.y+r.height){
//             // if yes, set that rects isDragging=true
//             dragok=true;
//             r.isDragging=true;
//         }
//     }
//     // save the current mouse position
//     startX=mx;
//     startY=my;
// }


// // handle mouseup events
// function myUp(e){
//     // tell the browser we're handling this mouse event
//     e.preventDefault();
//     e.stopPropagation();

//     // clear all the dragging flags
//     dragok = false;
//     for(var i=0;i<rects.length;i++){
//         rects[i].isDragging=false;
//     }
// }


// // handle mouse moves
// function myMove(e){
//     // if we're dragging anything...
//     if (dragok){

//       // tell the browser we're handling this mouse event
//       e.preventDefault();
//       e.stopPropagation();

//       // get the current mouse position
//       var mx=parseInt(e.clientX-offsetX);
//       var my=parseInt(e.clientY-offsetY);

//       // calculate the distance the mouse has moved
//       // since the last mousemove
//       var dx=mx-startX;
//       var dy=my-startY;

//       // move each rect that isDragging 
//       // by the distance the mouse has moved
//       // since the last mousemove
//       for(var i=0;i<rects.length;i++){
//           var r=rects[i];
//           if(r.isDragging){
//               r.x+=dx;
//               r.y+=dy;
//           }
//       }

//       // redraw the scene with the new rect positions
//       draw();

//       // reset the starting mouse position for the next mousemove
//       startX=mx;
//       startY=my;

//     }
// }

// }