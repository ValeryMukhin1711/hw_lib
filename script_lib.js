// Задача: Создание интерактивной библиотеки книг
// Подзадачи:
// HTML структура. Создать HTML-форму с полями для ввода информации о книге: название, автор, год издания и количество страниц. Добавить кнопку для отправки формы.
// Отображение книг. 
// Сортировка книг. Добавить элемент select для выбора сортировки. Написать функцию, которая будет сортировать книги в списке в зависимости от выбранного варианта. (варианты придумайте сами).
// Хранение книг. Использовать localStorage для сохранения книг между сессиями браузера. Должны сохраняться все книги.Удаление книг. Добавить кнопку удаления рядом с каждой книгой. При нажатии на кнопку книга должна удаляться из списка и localStorage.



function setObject(key, obj){
    localStorage.setItem(key, JSON.stringify(obj));
}
function getObject(key){
    const object = localStorage.getItem(key);
    return JSON.parse(object);
}
let products = [];
function addProduct(name, price, count, author) {
    const id = Date.now();
    const newProduct = { id, name, price, count, author };
    products.push(newProduct);
}

const productForm = document.querySelector("form");
const nameInput = document.querySelector("#productName");
const authorInput = document.querySelector("#productAuthor");
const priceInput = document.querySelector("#productPrice");
const countInput = document.querySelector("#productCount");

productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const productName = nameInput.value;
    const productAuthor = authorInput.value;
    const productPrice = +priceInput.value;
    const productCount = +countInput.value;
    addProduct(productName, productPrice, productCount, productAuthor);
    setObject("products", products);
    renderProducts();
    productForm.reset();
});



const productList = document.querySelector("#productList");


function renderProducts(productsArray = products) {
    productList.innerHTML = "";
    productsArray.forEach((product) => {
        const item = document.createElement("li");
        const btn = document.createElement("button");
        item.innerText = `Название ${product.name} - Год издания ${product.price}, количество страниц ${product.count} автор ${product.author}`;
        productList.append(item);
        item.append(btn);
        btn.innerText = 'Delete this book';
        btn.setAttribute('book_id', product.id);
        const book_id = btn.getAttribute('book_id', product.id);
        // console.log("book_id =" + book_id);


        // console.log(`${product.name} - ${product.price}, количество: ${product.count} автор ${product.author}`);
        
        // btn.onclick() => (console.log('нажата эта кнопка'));
        
        
        btn.onclick = function() {
            const productList = getObject('products');
            console.log(productList);
            // const book_id = btn.getAttribute('book_id', product.id);
            
            productList.forEach((x, index) => {
                if (x.id == book_id) {
                    console.log("index= " + index);
                    productList.splice(index, 1);

                    console.log(productList);
                    console.log(x);

                    // console.log("x");
                    console.log("x" + x.id + " " + x.author);
                    // console.log('book');
                    console.log("book_id =" + book_id);
                    

                };
            
            });
            setObject('products', productList);
            products = productList;
            // products = getObject('products');
            renderProducts(products);
            console.log(btn.getAttribute('book_id'));
            // productList.push()
            
            // alert(book_id);
          };

    })
}





const savedProducts = getObject("products");
if(savedProducts)  {
    products = savedProducts;
    renderProducts();
}



const searchInput = document.querySelector("#searchInput");
// onchange oninput
// toLowerCase
// includes => true / false
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) => 
        product.name.toLowerCase().includes(searchValue)
    );
    renderProducts(filteredProducts);
})

// switch case

const sortSelect = document.querySelector('#sortSelect');

sortSelect.addEventListener('change', () => {
    switch (sortSelect.value) {
        case 'priceUp': 
            products.sort((a,b) => a.price - b.price);
            break;
        case "priceDown":
            products.sort((a,b) => b.price - a.price);
            break;
        case 'countUp':
            products.sort((a,b) => a.count - b.count);
            break;
        case 'countDown':
            products.sort((a,b) => b.count - a.count);
            break;

    }

    renderProducts();
});






