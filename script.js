const myLibrary = [];
const body = document.querySelector('body');
const books = document.querySelector('.books');
const addBook = document.querySelector('#add-book');
const bookForm = document.querySelector('#book-form')

function Book(title, author, pages, read, id){
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = function(){
        return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`);
    }
}

function addBookToLibrary(name, author, pages, read){
    newBook = new Book(name, author, pages, read, crypto.randomUUID());
    myLibrary.push(newBook);
}

function displayBooks(){
    books.innerHTML = '';
    myLibrary.forEach(Book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book');
        bookItem.innerHTML = (`
            Title: ${Book.title}<br>
            Author: ${Book.author}<br>
            Pages: ${Book.pages}
        `)
        checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        bookItem.append(checkBox);

        deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', (e) =>{
            e.preventDefault();
            myLibrary.splice(myLibrary.indexOf(Book), 1);
            displayBooks();
        })
        deleteButton.classList.add('delete-book')
        deleteButton.textContent = 'Delete'
        bookItem.append(deleteButton);
        books.appendChild(bookItem);
    });
    addButton = document.createElement('button');
    addButton.addEventListener('click', (e) =>{
        e.preventDefault();
        bookForm.reset();
        if(bookForm.style.display === 'none'){
            bookForm.style.display = 'flex';
        }
        else{
            bookForm.style.display = 'none';
        }
    });
    
    addButton.id = 'add-book';
    addButton.textContent = 'Add Book';
    books.appendChild(addButton);
}

bookForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    addBookToLibrary(bookForm.title.value, bookForm.author.value, bookForm.pages.value, bookForm.read.value);
    bookForm.reset();
    bookForm.style.display = 'none';
    displayBooks();
})

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Frankenstein", "Mary Shelley", 280, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 384, false);
displayBooks();