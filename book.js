document.addEventListener('DOMContentLoaded', () => {
  const bookmarksList = document.getElementById('bookmarks-list');

  const loadBookmarks = () => {
    const savedQuotes = JSON.parse(localStorage.getItem('bookmarkedQuotes')) || [];

    if (savedQuotes.length > 0) {
      savedQuotes.forEach((quote) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${quote.content} - ${quote.author}`;
        bookmarksList.appendChild(listItem);
      });
    } else {
      const message = document.createElement('p');
      message.textContent = 'No saved quotes in bookmarks.';
      bookmarksList.appendChild(message);
    }
  };

  loadBookmarks();
});
