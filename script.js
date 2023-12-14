document.addEventListener('DOMContentLoaded', () => {
  const quoteContainer = document.getElementById('quote-container');
  const quoteContent = document.getElementById('quote-content');
  const quoteAuthor = document.getElementById('quote-author');
  const generateBtn = document.getElementById('generate-btn');
  const bookmarkBtn = document.getElementById('bookmark-btn');

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      quoteContent.textContent = data.content;
      quoteAuthor.textContent = `- ${data.author}`;
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const saveToBookmarks = () => {
    const savedQuotes = JSON.parse(localStorage.getItem('bookmarkedQuotes')) || [];
    const currentQuote = {
      content: quoteContent.textContent,
      author: quoteAuthor.textContent.slice(2), 
    };

    if (!savedQuotes.some((quote) => quote.content === currentQuote.content && quote.author === currentQuote.author)) {
      savedQuotes.push(currentQuote);
      localStorage.setItem('bookmarkedQuotes', JSON.stringify(savedQuotes));
      alert('Quote saved to bookmarks!');
    } else {
      alert('Quote already saved to bookmarks!');
    }
  };

  const loadFromBookmarks = () => {
    const savedQuotes = JSON.parse(localStorage.getItem('bookmarkedQuotes')) || [];
    if (savedQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * savedQuotes.length);
      const randomBookmark = savedQuotes[randomIndex];
      quoteContent.textContent = randomBookmark.content;
      quoteAuthor.textContent = `- ${randomBookmark.author}`;
    } else {
      alert('No saved quotes in bookmarks!');
    }
  };

  generateBtn.addEventListener('click', fetchRandomQuote);
  bookmarkBtn.addEventListener('click', saveToBookmarks);

  fetchRandomQuote();
});


// tagDrop dpwn Script 


document.addEventListener("DOMContentLoaded", function () {
  const tagDropdown = document.getElementById("tagDropdown");
  const quoteContainer = document.getElementById("quoteContainer");

  loadTags();

  tagDropdown.addEventListener("change", function () {
    const selectedTag = this.value;
    getRandomQuote(selectedTag);
  });

  function loadTags() {
    fetch("GET /authors/:id")
      .then((response) => response.json())
      .then((tags) => {
        tags.forEach((tag) => {
          const option = document.createElement("option");
          option.value = tag;
          option.text = tag;
          tagDropdown.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }

  function getRandomQuote(selectedTag) {
    fetch(`/random?tag=${selectedTag}`)
      .then((response) => response.json())
      .then((quote) => {
      
        quoteContainer.innerHTML = `<p>${quote}</p>`;
      })
      .catch((error) => {
        console.error("Error fetching random quote:", error);
      });
  }
});


