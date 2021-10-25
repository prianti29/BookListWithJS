//(2)
//GET THE UI ELEMENT
let form = document.querySelector("#book-form");
//(10)
//FOR DELETE ITEM
let booklist = document.querySelector("#book-list");

//BOOK CLASS
//(1)
class Book {
    /*  
    CONSTRUCTOR IS TO CREATE AN OBJECT AND SET 
     VALUES IF THERE ARE ANY OBJECT PROPERTIES PRESENT 
     */
    constructor(title, author, isbn) {
        //THESE PROPERTIES ARE ADDING IN BOOK CLASS
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//CREATING UI CLASS
//(5)
//FOR ADDING BOOK IN MAIN PAGE ON THE TABLE
class UI {
    static addToBooklist(book) {
        let list = document.querySelector("#book-list"); //take whole table
        let row = document.createElement("tr");

        //PASSING INFORMATION OF TABLE
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class = "delete">X</a></td>`;
        list.appendChild(row);
    }
    //(7)
    //TO CALL CLEAR FUNCTION
    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }

    //(9)
    //IF WE GET ANY ERROR
    static showAlert(message, className) {
        let div = document.createElement("div");
        div.className = `alert ${className}`;
        //PASS MESSAGES
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector(".container");
        let form = document.querySelector("#book-form");
        //ADD DIV INTO CONTAINER BEFORE FORM
        container.insertBefore(div, form);

        //TIMEOUT FUNCTION ABOUT 3s
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 3000);
    }
    static deleteFromBook(target) {
        if (target.hasAttribute("href")) {
            target.parentElement.parentElement.remove();
            store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert("Book Removed", "success");
        }
    }
}
//STORE IN LOCAL STORAGE
class store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books = store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }
    //DISPLAY BOOKS UFTER RELOADED
    static displayBooks() {
        let books = store.getBooks();
        books.forEach(book =>{ 
            UI.addToBooklist(book);
        });
    }
    //REMOVE BOOKS UFTER RELOADED
    static removeBook(isbn) {
        let books = store.getBooks();
        books.forEach((book,index) =>{ 
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//ADD EVENT LISTENER

/* 
 EVENT LISTENER ARE USED FOR WHEN THE USER CLICK A BUTTON 
THEN EVENT LISTENER CALL A FUNCTION AND TAKES THE EVENT TO LISTEN AND 2ND ARGUMENT
TO BE CALLED EHWNEVER THE DISCRIBED EVENT GETS FIRED 
*/
//(3)
form.addEventListener("submit", newBook);
//(11)
booklist.addEventListener("click", removeBook);

//FUNCTION CALLING TO DISPLAY BOOK AFTER RELOADED

document.addEventListener('DOMContentLoaded',store.displayBooks());
//DEFINE FUNCTION

//DEFINE FUNCTION FOR newBook FROM EVENTLISTENER
//(4)
function newBook(e) {
    //UFTER SUBMISSION COLLECT INFORMANTION
    let title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value;

    //CALL THE FUNCTION UI
    // WHEN WE USE STATIC THEN WE CANNOT TAKE ANY ONTHER CLASS
    //    let ui = new UI();
    //TO CHECK ANY FIELDS ARE EMPTY
    //(8)
    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill all the fields", "error");
    } else {
        //TO CREATING OBJECT FOR TABLE
        let book = new Book(title, author, isbn);

        UI.addToBooklist(book);

        //(6)
        //TO CLEAR TASK UFTER ADDED ONE
        UI.clearFields();
        UI.showAlert("Book Added", "success");

        store.addBook(book);
    }
    e.preventDefault();
}

//(11)
//FOR DELETING
function removeBook(e) {
    UI.deleteFromBook(e.target);

    e.preventDefault();
}
