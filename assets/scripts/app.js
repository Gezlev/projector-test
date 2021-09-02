import {Storage} from './components/storage';
Storage.init();

import {AddItem} from "./components/updateItem";
let items = Storage.getAll();
let keys = Object.keys(items);

for (let key in items) {
    let el = Object.assign(items[key], { id: key});
    AddItem(el);
}
