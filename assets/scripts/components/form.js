import {Storage} from "./storage";
import {AddItem, EditItem} from "./updateItem";
import {ViewMode} from "./viewMode";
import sanitizeHtml from 'sanitize-html';

let sinitizeOptions = {
    allowedTags: ['h5', 'p', 'b', 'strong', 'em', 'img', 'a'],
    transformTags: {
        h1: 'h5',
        h2: 'h5',
        h3: 'h5',
        h4: 'h5',
        a: (tagName, attribs) => {
            let isOnclick = (attribs.href).toString().toLowerCase().indexOf('onclick(') < 0 ? 0 : 1;
            return {
                tagName: (isOnclick ? 'em' : 'a'),
                attribs: {
                    href: (isOnclick ? '' : attribs.href)
                }
            }
        }
    },
    allowedSchemesByTag: {
        a: ['http', 'https'],
    },
    allowedAttributes: {
        a: ['href'],
        img: ['src']
    },
    parser: {
        lowerCaseTags: true
    }
};

const Form = (() => {
    let form = document.querySelector('.formbox');
    let title = form.querySelector('[name=title]');
    let content = form.querySelector('[name=content]');
    let saveBtn = form.querySelector('#saveForm');
    let cancelBtn = form.querySelector('#cancelForm');

    const Check = el => {
        let type = el.id === 'title' ? 'title': 'content';
        let msg = el.parentNode.querySelector('.msg');
        let msgText = 'Type something';
        if (el.value) {
            if (type === 'title') {
                el.value = el.value.replace(/[^A-Za-zА-Яа-я0-9\s]/g, '');
                msgText = el.value.toString().length > 30 ? 30 - el.value.length : 'No more 30 symbols';
            }
            msg.textContent = msgText;
            msg.classList.add('visible');
            return true;
        } else {
            msg.textContent = 'Type something';
            msg.classList.add('visible');
            return false;
        }
    }

    const Clear = () => {
        title.value = content.value = '';
        form.querySelectorAll('.msg').forEach( msg => msg.classList.remove('visible'));
        form.dataset.id = '';
    }
    const Fill = el => {
        title.value = el.title;
        content.value = el.content;
        form.dataset.id = el.id;
    };

    [title, content].forEach( field => {
        field.addEventListener('input', () => {
            Check(field);
        }, {passive: true});
    });


    saveBtn.addEventListener('click', () => {
        let errors = false;
        [title, content].forEach( field => {
            !errors && (errors = !Check(field));
        });
        if (!errors) {
            let el = {
                title: sanitizeHtml(title.value, {allowedTags: []}),
                content: sanitizeHtml(content.value, sinitizeOptions)
            };
            if ( !form.dataset.id || form.dataset.id === '') {
                el.id = Storage.add(el);
                AddItem(el);
            } else {
                el.id = form.dataset.id;
                EditItem(el);
            }
            ViewMode('add');
            Clear();
        }
    }, {passive: true});

    cancelBtn.addEventListener('click', () => {
        ViewMode('add');
        Clear();
    }, {passive: true});

    return {
        clear: () => Clear(),
        fill: el => Fill(el)
    }
})();

export {Form};
