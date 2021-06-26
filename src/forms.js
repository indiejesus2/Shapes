class Forms extends Toys{
    static container = document.getElementById('toy-form')
    
    constructor() {
        super()
        this.clear()
        toys.forEach(toy => {
            if (toy.selected == true) {
                this.shape = toy
                this.render()
                this.attachColorChange(toy)
                this.attachChange(toy)
                this.attachDeleteEventListener()
            }
        })
    }

    attachDeleteEventListener = (e) => {
        let form = document.getElementById(this.shape.id)
        let remove = form.firstElementChild
        remove.addEventListener("click", this.handleDeleteShape)
    }
    
    handleDeleteShape = (e) => {
        e.preventDefault()
        const newToys = toys.filter(toy => {
            if (toy.id != parseInt(this.form.id)) {
                return toy
            }
        })
        toys = newToys
        this.draw()
        new Forms()
    }

    render() {
        const form = document.createElement('form');
        // if (exist.length > 0 && parseInt(exist[0].id == this.shape.id)) {
        //     if (this.shape.name == "Rectangle") {
        //         form.innerHTML = this.renderRectHTML(this.shape);
        //     } else {
        //         form.innerHTML = this.renderArcHTML(this.shape);
        //     }
        // } else {
            form.className = 'edit-shape';
            form.id = this.shape.id
            if (this.shape.name == "Rectangle") {
                form.innerHTML = this.renderRectHTML(this.shape);
            } else {
                form.innerHTML = this.renderArcHTML(this.shape);
            }
            this.form = form
            this.constructor.container.append(form)
        // }
    }

    renderRectHTML = (shape) => {
        return `
            <button>Delete</button>
            <p>${shape.name}</p>
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
            <p>${shape.name}</p>
            <label>Center X</label>
            <p>${parseInt(shape.x)}</p>
            <label>Center Y</label>
            <p>${shape.y}</p>
            <label>Radius</label>
            <input type="range" name="radius" id="radius" min='1' max="500" value="${shape.r}" />
            <label>Color</label>
            <input type="color" name="color" id="color" value='${shape.color}' />
        `
    }

    clear() {
        let forms = document.getElementsByClassName('edit-shape')
        while(forms.length > 0) {
            forms[0].remove()
        }
    }

}