class Forms {
    static container = document.getElementById('form')

    constructor() {
        this.render()
    }

    render() {
        const form = document.createElement('form');
        form.className = 'edit-shape';
        form.innerHTML = this.renderInnerHTML();
        this.form = form
        this.constructor.container.append(form)
    }

    renderInnerHTML = () => {
        return `
            <button>Delete</button>
            <button>Shape</button>
        `
    }

}