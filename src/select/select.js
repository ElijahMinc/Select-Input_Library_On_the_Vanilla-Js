const getTemplate = (data = [], placeholder, selectedId) => {
   const text = placeholder ?? 'Placeholder по умолчанию';
   const items = data.map(item => {
      if (item.id === selectedId) {
         text = item.value
      }
      return `
      <li class="select__item" data-type="item" data-id=${item.id}>${item.value}</li>
      `
   }).join('')
   return `
            <div class="select__backdrop" data-type="backdrop"></div>
            <div class="select__input" data-type="input">
                  <span data-type="value">${text}</span>
                  <i class="fas fa-chevron-down" data-type="arrow"></i>
               </div>
               <div class="select__dropdown">
                  <ul class="select__list">
                     ${items}
                  </ul>
            </div>
`
}

export class Select {
   constructor(selector, options) {
      this.element = document.querySelector(selector);
      this.options = options
      this.selectedId = this.options.selectedId // для трэкания, какой сейчас выбран элемент
      this.#render()
      this.#setup()
   };
   #render() { // приватный элемент доступен ТОЛЬКО внутри этого класса, но недопуступен извне его.
      const { placeholder, data } = this.options;
      this.element.classList.add('select');
      this.element.innerHTML = getTemplate(data, placeholder, this.selectedId);
   }
   #setup() {
      this.clickHandler = this.clickHandler.bind(this)
      this.element.addEventListener('click', this.clickHandler)
      this.$arrow = this.element.querySelector('[data-type="arrow"]');
      this.$value = this.element.querySelector('[data-type="value"]');
   }

   clickHandler(event) {
      const { type } = event.target.dataset;
      if (type === "input") {
         this.toggle()
      } else if (type === "item") {
         const id = event.target.dataset.id
         this.select(id)
      } else if (type === "backdrop") {
         this.close()
      }
   }
   get isOpen() { // get -ер читается, как переменная ( не как вызов функции)
      return this.element.classList.contains('open')
   }
   get current() {
      return this.options.data.find(item => item.id === this.selectedId)
   }
   select(id) {
      this.selectedId = id;
      this.$value.textContent = this.current.value;
      this.element.querySelectorAll('[data-type="item"]').forEach(el => el.classList.remove('selected'))
      this.element.querySelector(`[data-id="${id}"]`).classList.add('selected')
      this.options.onSelect ? this.options.onSelect(this.current) : null
      this.close()
   }
   toggle() {
      this.isOpen ? this.close() : this.open()
   }
   open() {
      this.element.classList.add('open');
      this.$arrow.classList.remove('fa-chevron-down')
      this.$arrow.classList.add('fa-chevron-up')
   };
   close() {
      this.element.classList.remove('open');
      this.$arrow.classList.add('fa-chevron-down')
      this.$arrow.classList.remove('fa-chevron-up')
   };
   destroy() {
      this.element.removeEventListener("click", this.clickHandler)
   }
};