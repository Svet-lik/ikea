const PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['name', 'description', 'category', 'subcategory'],
};

const getData = {
    url: 'database/dataBase.json',
    // запрос на сервер с помощью fetch на url 'database/dataBase.json'
    get(process) {
        fetch(this.url) // обработка данных перевод из json в массив
            .then(response => response.json())
            .then(process);
    },
    wishList(list, callback) {
        this.get((data) => {
            // фильтруем список/массив dataBase.json и возвращаем те которые содержат id из списка wishList
            const result = data.filter((item) => list.includes(item.id));
            callback(result);
        })
    },
    item(value, callback) {
        this.get((data) => {
            const result = data.find((item) => item.id === value)
            callback(result);
        });
    },
    cart(list, callback) {
        this.get((data) => {
            const result = data.filter(item => list
                .some(obj => obj.id === item.id))
            callback(result);
        })
    },
    category(prop, value, callback) {
        this.get((data) => {
            const result = data.filter(item => 
                item[PARAM[prop]].toLowerCase() === value.toLowerCase());
            callback(result);
        })
    },
    //осуществляем поик товаров по заданному слову
    search(value, callback) { 
        this.get((data) => {
            const result = data.filter(item => {
                for (const prop in item) {
                    if (PARAM.search.includes(prop) && 
                    item[prop].toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
                }
            });
            callback(result);
        })
    },
    //все категории
    catalog(callback) { 
        this.get((data) => {
            const result = data.reduce((arr, item) => {
                if (!arr.includes(item.category)) {
                    arr.push(item.category);
                }
                return arr;
            }, [])
            callback(result);
        })
    },
    //создаёт список подкатегорий для меню
    subCatalog(value, callback) { 
        this.get((data) => {
            const result =  data
            .reduce((arr,item) => {
                if (!arr.includes(item.subcategory) && 
                item.category === value) {
                    arr.push(item.subcategory);
                }
                return arr;
            }, []);
            callback(result);
        })
    },
};

export default getData;