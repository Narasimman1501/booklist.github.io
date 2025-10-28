const searchInput = document.getElementById('search');
const listContainer = document.getElementById('bookList');
const loadingMessage = document.createElement('p');
loadingMessage.id = 'loading';
loadingMessage.textContent = 'Loading books...';
loadingMessage.style.display = 'none';
document.body.insertBefore(loadingMessage, listContainer);

// Function to fetch books from Open Library API
async function fetchBooks(query = 'fiction') {
  loadingMessage.style.display = 'block';
  listContainer.innerHTML = '';
  
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`);
    const data = await response.json();
    
    loadingMessage.style.display = 'none';
    
    if (data.docs && data.docs.length > 0) {
      renderBooks(data.docs);
    } else {
      listContainer.innerHTML = '<p>No books found. Try a different search term.</p>';
    }
  } catch (error) {
    loadingMessage.style.display = 'none';
    listContainer.innerHTML = '<p>Error loading books. Please try again later.</p>';
    console.error('Error fetching books:', error);
  }
}

// Function to render books
function renderBooks(books) {
  listContainer.innerHTML = '';
  
  books.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book-card';
    
    const title = book.title || 'Unknown Title';
    const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
    const publishYear = book.first_publish_year || 'N/A';
    const isbn = book.isbn ? book.isbn[0] : null;
    const coverUrl = isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg` : 'https://via.placeholder.com/128x193?text=No+Cover';
    
    div.innerHTML = `
      <img src="${coverUrl}" alt="${title} cover" onerror="this.src='https://via.placeholder.com/128x193?text=No+Cover'">
      <h3>${title}</h3>
      <p>by ${author}</p>
      <p>First Published: ${publishYear}</p>
    `;
    
    listContainer.appendChild(div);
  });
}

// Search functionality with debounce
let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  const query = searchInput.value.trim();
  
  if (query.length > 2) {
    searchTimeout = setTimeout(() => {
      fetchBooks(query);
    }, 500); // Wait 500ms after user stops typing
  } else if (query.length === 0) {
    fetchBooks('fiction'); // Default search
  }
});

// Load default books on page load
fetchBooks('fiction');
