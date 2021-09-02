import sanitizeHtml from "sanitize-html";

const List = (()=> {
    let list = document.getElementById('list');

    return {
        //add: item => list.appendChild(item),
        add: item => list.insertBefore(item, list.firstChild),
        update: el => {
            let item = list.querySelector(`#li_${ el.id }`);
            item.querySelector('.list-item__title').textContent = el.title;
            item.querySelector('.list-item__content').textContent = sanitizeHtml(el.content, {allowedTags: []}).substr(0,100);
        },
        remove: item => list.removeChild(item),
        clearActive: () => list.querySelectorAll('.active').forEach( active => active.classList.remove('active'))
    }
})();

export {List};
