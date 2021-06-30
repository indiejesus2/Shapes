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

    clear() {
        let forms = document.getElementsByClassName('edit-shape')
        while(forms.length > 0) {
            forms[0].remove()
        }
    }

    attachDeleteEventListener() {
        let trash = document.querySelector("header")
        let remove = trash.firstElementChild
        remove.addEventListener("click", this.handleDeleteShape)
    }
    
    handleDeleteShape = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        const newToys = toys.filter(toy => {
            if (toy.id != parseInt(this.form.id)) {
                return toy
            }
        })
        toys = newToys
        Toys.draw()
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
            <div class="shape-form">
            <header className="header">
            <button><i class="fa fa-trash-o"></i></button>
            <p>${shape.name}</p>
            </header>
            <div className="form-body">
            <p> Center X - ${shape.x}</p>
            <p> Center Y - ${shape.y}</p>
            <p> Height - 
            <input type="range" name="height" id="height" min='10' max="200" value="${shape.height}" />
            </p>            
            <p> Width - 
            <input type="range" name="width" id="width" min='10' max="200" value="${shape.width}" />
            </p>
            <p> Color
            <input type="color" name="color" id="color" value='${shape.color}' />
            </p>
            </div>
            </div>
        `
    }
    renderArcHTML = (shape) => {
        return `
            <div class="shape-form">
            <header className="header">
            <button><i class="fa fa-trash-o"></i></button>
            <p>${shape.name}</p>
            </header>
            <div className="form-body">
            <p> Center X - ${shape.x}</p>
            <p> Center Y - ${shape.y}</p>      
            <p>Radius - 
            <input type="range" name="radius" id="radius" min='10' max="100" value="${shape.radius}" />
            </p>  
            <p> Color
            <input type="color" name="color" id="color" value='${shape.color}' />
            </p>
            </div>
            </div>
        `
    }

}