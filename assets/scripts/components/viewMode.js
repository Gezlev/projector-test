import {Form} from "./form";
import {List} from "./list";

const ViewMode = (mode, el) => {

    let form = document.querySelector('#form');
    let note = document.querySelector('#note');

    switch (mode) {
        case 'add':
            List.clearActive();
            Form.clear();
            form.querySelector('.title').textContent = 'Create new note';
            form.querySelector('.btn_blue').textContent = 'Create';
            form.classList.add('visible');
            note.classList.remove('visible');
            break;
        case 'edit':
            Form.fill(el);
            form.querySelector('.title').textContent = 'Edit note';
            form.querySelector('.btn_blue').textContent = 'Save';
            form.classList.add('visible');
            note.classList.remove('visible');
            break;
        case 'read':
            note.querySelector('.title').textContent = el.title.substr(0, 200);
            note.querySelector('.content').innerHTML = el.content;
            form.classList.remove('visible');
            note.classList.add('visible');
            break;
    }
};

const CreateBtn = document.querySelector('#createBtn');
CreateBtn.addEventListener('click', () => {
    ViewMode('add');
}, {passive:true});

note.addEventListener('click', evt => {
    let target = evt.target;
    let link = target.closest('a');
    if (link) {
        evt.preventDefault();
        if (confirm('Go to ' + link.href+ ' ?')) {
            window.location.href = link.href;
        }
    }
});

export {ViewMode};
