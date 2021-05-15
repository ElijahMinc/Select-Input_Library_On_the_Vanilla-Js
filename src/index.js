import { Select } from './select/select';
import './select/style.scss';

const select = new Select('#select', {
   placeholder: "Выберите элемент",
   selected: null,
   data: [
      { id: '1', value: 'React' },
      { id: '2', value: 'Vue' },
      { id: '3', value: 'Angular' },
      { id: '4', value: 'React Native' },
      { id: '5', value: 'Next' },
   ],
   onSelect(item) {
      console.log(item)
   }
})// инициализация класса Селект

console.log(select)