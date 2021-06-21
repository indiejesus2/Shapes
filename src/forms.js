class Forms {
    static container = document.getElementById('form')

    constructor(shape) {
        this.shape = shape
        this.render()
    }

    render() {
        const form = document.createElement('form');
        form.className = 'edit-shape';
        form.innerHTML = this.renderInnerHTML(this.shape);
        this.form = form
        this.constructor.container.append(form)
    }

    renderInnerHTML = (shape) => {
        return `
            <button>Delete</button>
            <button>${shape.name}</button>
            <input type="range" name="width" id="width" min='1' max="500" value="${shape.width}" />
            <input type="range" name="height" id="height" min='1' max="500" value="${shape.height}" />
            <input type="color" name="color" id="color" value='#${shape.color}' />
        `
    }

}