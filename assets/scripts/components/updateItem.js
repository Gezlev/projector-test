import {Storage} from "./storage";
import {List} from "./list";
import {ViewMode} from "./viewMode";
import sanitizeHtml from 'sanitize-html';

const AddItem = el => {
    let item = document.createElement('div');

    item.className = 'list-item';
    item.id = `li_${ el.id }`;
    item.insertAdjacentHTML('afterbegin', `
        <h3 class="list-item__title subtitle">${ el.title }</h3>
        <div class="list-item__content">${ sanitizeHtml(el.content, {allowedTags: []}).substr(0,100) }</div>
        <div class="btn btn_blue">Edit</div><div class="btn btn_red">Delete</div>
    `);
    List.add(item);

    const listener = evt => {
        let editBtn = item.querySelector('.btn_blue');
        let deleteBtn = item.querySelector('.btn_red');

        if (editBtn.contains(evt.target)) {
            // Click Edit Note
            List.clearActive();
            item.classList.add('active');
            ViewMode('edit', Storage.read(el.id));

        } else if (deleteBtn.contains(evt.target)) {
            // Click Delete Note
            item.removeEventListener('click', listener, {passive: true});
            List.remove(item);
            Storage.remove(el.id);
            ViewMode('add');
        } else {
            // Show Note
            List.clearActive();
            item.classList.add('active');
            ViewMode('read', Storage.read(el.id));
        }
    };
    item.addEventListener('click', listener, {passive: true});
};

const EditItem = el => {
    Storage.edit(el);
    List.update(el);
};

export {AddItem, EditItem};

