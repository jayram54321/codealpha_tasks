let books = [
    {
        id: 1,
        title: "The White Tiger",
        author: "Aravind Adiga",
        category: "Fiction",
        borrowed: false
    },
    {
        id: 2,
        title: "India After Gandhi: The History of the World's Largest Democracy",
        author: "Ramachandra Guha",
        category: "Non-fiction",
        borrowed: false
    },
    {
        id: 3,
        title: "The Discovery of India",
        author: "Jawaharlal Nehru",
        category: "History",
        borrowed: false
    },
    {
        id: 4,
        title: "You Can Win",
        author: "Shiv Khera",
        category: "Motivational",
        borrowed: false
    },
    {
        id: 5,
        title: "Wings of Fire: An Autobiography",
        author: "Dr. A.P.J. Abdul Kalam",
        category: "Science/Engineering",
        borrowed: false
    }
];

let borrowHistory = [];

const bookListElement = document.getElementById('bookList');
const borrowHistoryElement = document.getElementById('borrowHistory');
const addBookForm = document.getElementById('addBookForm');

// Add a new book
addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const category = document.getElementById('bookCategory').value;

    const newBook = {
        id: books.length + 1,
        title,
        author,
        category,
        borrowed: false
    };

    books.push(newBook);
    renderBookList();
    addBookForm.reset();
});

// Render the list of books
function renderBookList() {
    bookListElement.innerHTML = '';
    
    books.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} | ${book.category}
            <button onclick="borrowBook(${book.id})">${book.borrowed ? 'Return' : 'Borrow'}</button>
        `;
        bookListElement.appendChild(bookItem);
    });
}

// Borrow or return a book
function borrowBook(bookId) {
    const book = books.find((book) => book.id === bookId);
    if (book) {
        if (!book.borrowed) {
            book.borrowed = true;
            borrowHistory.push(`Borrowed "${book.title}" by ${book.author} on ${new Date().toLocaleDateString()}`);
        } else {
            book.borrowed = false;
            borrowHistory.push(`Returned "${book.title}" by ${book.author} on ${new Date().toLocaleDateString()}`);
        }
        renderBookList();
        renderBorrowHistory();
    }
}

// Render borrowing history
function renderBorrowHistory() {
    borrowHistoryElement.innerHTML = '';
    borrowHistory.forEach((historyItem) => {
        const listItem = document.createElement('li');
        listItem.textContent = historyItem;
        borrowHistoryElement.appendChild(listItem);
    });
}

// Search functionality
function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(searchInput) || book.author.toLowerCase().includes(searchInput);
    });
    
    renderFilteredBooks(filteredBooks);
}

// Filter books by category
function filterBooks() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredBooks = selectedCategory ? books.filter((book) => book.category === selectedCategory) : books;
    
    renderFilteredBooks(filteredBooks);
}

// Render filtered books (for search and category filter)
function renderFilteredBooks(filteredBooks) {
    bookListElement.innerHTML = '';
    
    filteredBooks.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} | ${book.category}
            <button onclick="borrowBook(${book.id})">${book.borrowed ? 'Return' : 'Borrow'}</button>
        `;
        bookListElement.appendChild(bookItem);
    });
}

// Initial rendering of books
renderBookList();
