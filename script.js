let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

Book.prototype.toggle = function(bol){
    if(this.read == true){
        this.read = false;
    }
    else if(this.read == false){
        this.read = true;
    }
}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read));
}

let book1 = new Book("The Hobbit", "Tolkien", 300, true);
myLibrary.push(book1);

let book2 = new Book("silmarillion", "Tolkien", 300, false);
myLibrary.push(book2);

addBookToLibrary("Lord of the Rings", "Tolkien", 300, true)



const container = document.querySelector('.container')
const bookContainer = document.querySelector('.book-container');
const btnAddBook = document.querySelector('#btnAddBook');


function render(){
    myLibrary.forEach(function(book, index) {
        let row = document.createElement('div');
        row.classList = 'row';
        bookContainer.appendChild(row);

        for(let properties in book){
            if(book.hasOwnProperty(properties)){
                let propertiesDiv = document.createElement('div');
                propertiesDiv.classList = 'properties';
                propertiesDiv.innerText = book[properties];
                row.appendChild(propertiesDiv); 
            }
        }

        //Create div, append del button to it.
        let deleteDiv = document.createElement('div');
        deleteDiv.classList = 'properties';
        row.appendChild(deleteDiv); 

        let btnDelete = document.createElement('button');
        btnDelete.classList = "btn-delete";
        btnDelete.id = index;
        btnDelete.innerText = 'Del'
        deleteDiv.appendChild(btnDelete);

        btnDelete.addEventListener('click', function(e){
            console.log(btnDelete.id)
            myLibrary.splice(btnDelete.id, 1);
            let btnRow = btnDelete.parentNode.parentNode;
            deleteAllBooks()
            render()
        })

        let btnToggle = document.createElement('button');
        btnToggle.classList = 'btn-toggle';
        btnToggle.id = index;
        btnToggle.innerText = 'T';

        deleteDiv.appendChild(btnToggle);

        btnToggle.addEventListener('click', function(e){
            myLibrary[btnToggle.id].toggle();
            deleteAllBooks()
            render()
        })
    })
}

function deleteAllBooks(){
    while(bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    }
}


function hideForm() {
    formDiv.style.display = 'none';
}

const form = document.getElementById('form');
const titleForm = document.getElementById('title');
const authorForm = document.getElementById('author');
const pagesForm= document.getElementById('pages');
const statuForm = document.getElementById('status');
const btnSubmit = document.getElementById('btn-submit');
const btnAdd = document.getElementById('btnAddBook');
const formDiv = document.querySelector('.bg-form-add');

btnAdd.addEventListener('click', function(e){
    formDiv.style.display = 'flex';
})

render()

form.addEventListener('submit', function(e){
    e.preventDefault();
    const titleFormValue = titleForm.value;
    const authorFormValue = authorForm.value;
    const pagesFormValue = pagesForm.value;
    const statusFormValue = titleForm.value;
    addBookToLibrary(titleFormValue,authorFormValue, pagesFormValue,statusFormValue);
    deleteAllBooks();
    render();
    hideForm();
})



// document.querySelectorAll('.btn-delete').forEach(btn => {
//     btn.addEventListener('click', function(e){
//         myLibrary.splice(btn.id, 1);
//         deleteAllBooks();
//         render();
//      })
// })




