const Storage = (() => {
    let storage;

    const updateStorageItem = (el, mode = false) => {
        let key = mode ? el.id : (++storage.next);
        storage.items[key] = el;
        localStorage.setItem('Notelist', JSON.stringify(storage));

        return key;
    };

    return {
        init: () => {
            storage = "Notelist" in localStorage ? JSON.parse(localStorage.getItem('Notelist')) : { next: 0, items: {}};
        },
        getAll: () => storage.items,
        read: id => (id in storage.items ? storage.items[id] : false),
        remove: id => {
            delete storage.items[id];
            localStorage.setItem('Notelist', JSON.stringify(storage));
        },
        add: el => updateStorageItem(el),
        edit: el => updateStorageItem(el, 'edit'),
    }
})();

export {Storage};
