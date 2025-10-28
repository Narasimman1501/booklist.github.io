const books = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
  { title: "Atomic Habits", author: "James Clear", genre: "Self-Improvement" },
  { title: "Dune", author: "Frank Herbert", genre: "Science Fiction" },
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance" }
];

const listContainer = document.getElementById('bookList');
const searchInput = document.getElementById('search');

function renderBooks(filteredBooks) {
  listContainer.innerHTML = "";
  filteredBooks.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book-card';
    div.innerHTML = `<h3>${book.title}</h3>
                     <p>by ${book.author}</p>
                     <p><strong>Genre:</strong> ${book.genre}</p>`;
    listContainer.appendChild(div);
  });
}

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = books.filter(b => 
    b.title.toLowerCase().includes(term) ||
    b.author.toLowerCase().includes(term) ||
    b.genre.toLowerCase().includes(term)
  );
  renderBooks(filtered);
});

renderBooks(books);
