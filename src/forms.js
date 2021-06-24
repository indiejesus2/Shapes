class Forms {
    static container = document.getElementById('form')
    
    constructor(shape) {
        this.shape = shape
        this.render()
        // this.attachColorChange()
    }

    render() {
        const form = document.createElement('form');
        form.className = 'edit-shape';
        form.id = this.shape.id
        if (this.shape.name == "Rectangle") {
            form.innerHTML = this.renderRectHTML(this.shape);
        } else {
            form.innerHTML = this.renderArcHTML(this.shape);
        }
        this.form = form
        this.constructor.container.append(form)
    }

    renderRectHTML = (shape) => {
        return `
            <button>Delete</button>
            <button>${shape.name}</button>
            <label>Center X</label>
            <p>${shape.x}</p>
            <label>Center Y</label>
            <p>${shape.y}</p>
            <label>Height</label>            
            <input type="range" name="height" id="height" min='1' max="500" value="${shape.height}" />
            <label>Width</label>
            <input type="range" name="width" id="width" min='1' max="500" value="${shape.width}" />
            <label>Color</label>
            <input type="color" name="color" id="color" value='${shape.color}' />
        `
    }
    renderArcHTML = (shape) => {
        return `
            <button>Delete</button>
            <button>${shape.name}</button>
            <label>Center X</label>
            <p>${parseInt(shape.x)}</p>
            <label>Center Y</label>
            <p>${shape.y}</p>
            <label>Radius</label>
            <input type="range" name="height" id="height" min='1' max="500" value="${shape.r}" />
            <label>Color</label>
            <input type="color" name="color" id="color" value='${shape.color}' />
        `
    }

    static delete() {

    }

}