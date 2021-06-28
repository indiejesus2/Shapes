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
            <p>${shape.name}</p>
            <p>Center X - ${shape.x}</p>
            <p>Center Y - ${shape.y}</p>
            <p>Height - 
            <input type="range" name="height" id="height" min='10' max="200" value="${shape.height}" />
            </p>            
            <p>Width
            <input type="range" name="width" id="width" min='10' max="200" value="${shape.width}" />
            </p>
            <p>Color
            <input type="color" name="color" id="color" value='${shape.color}' />
            </p>
        `
    }
    renderArcHTML = (shape) => {
        return `
            <button>Delete</button>
            <p>${shape.name}</p>
            <p>Center X - ${shape.x}</p>
            <p>Center Y - ${shape.y}</p>
            <p>Radius - 
            <input type="range" name="radius" id="radius" min='10' max="100" value="${shape.r}" />
            </p>            
            <p>Color
            <input type="color" name="color" id="color" value='${shape.color}' />
            </p>
        `
    }

    clear() {
        let forms = document.getElementsByClassName('edit-shape')
        while(forms.length > 0) {
            forms[0].remove()
        }
    }

}