import React, { useState, useEffect } from 'react';
import { Search, Library, Loader2, TrendingUp } from 'lucide-react';
import { AmazonBook } from './types';
import { BookCard } from './components/BookCard';
import { BookDetails } from './components/BookDetails';
import { fetchBooks } from './lib/books';
import { Helmet } from 'react-helmet-async';

function App() {
  const [books, setBooks] = useState<AmazonBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<AmazonBook | null>(null);
  const [readingList, setReadingList] = useState<AmazonBook[]>([]);
  const [showReadingList, setShowReadingList] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const books = await fetchBooks();
      setBooks(books);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleReadingList = (book: AmazonBook) => {
    setReadingList(current =>
      current.some((b) => b.ASIN === book.ASIN)
        ? current.filter((b) => b.ASIN !== book.ASIN)
        : [...current, book]
    );
  };

  const resetView = () => {
    setSelectedBook(null);
    setShowReadingList(false);
  };

  const displayBooks = showReadingList ? readingList : books;
  const pageTitle = showReadingList 
    ? 'My Reading List | Book Discovery | books.is' 
    : 'Trending Books | Book Discovery | books.is';
  const pageDescription = showReadingList 
    ? 'Manage your personal reading list and track books you want to read on books.is - your ultimate book discovery platform.'
    : 'Discover trending books and find your next great read with our curated recommendations on books.is - your ultimate book discovery platform.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`https://books.is${showReadingList ? '/reading-list' : ''}`} />
        <meta property="og:image" content="https://books.is/vite.svg" />
        <meta property="twitter:image" content="https://books.is/vite.svg" />
        {selectedBook && (
          <>
            <title>{`${selectedBook.ItemInfo.Title.DisplayValue} | Book Discovery | books.is`}</title>
            <meta name="title" content={`${selectedBook.ItemInfo.Title.DisplayValue} | Book Discovery | books.is`} />
            <meta name="description" content={selectedBook.ItemInfo.Description || 'Discover more about this book on books.is - your ultimate book discovery platform.'} />
            <meta property="og:title" content={`${selectedBook.ItemInfo.Title.DisplayValue} | Book Discovery | books.is`} />
            <meta property="og:description" content={selectedBook.ItemInfo.Description || 'Discover more about this book on books.is - your ultimate book discovery platform.'} />
            <link rel="canonical" href={`https://books.is/book/${selectedBook.ASIN}`} />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Book",
                "name": selectedBook.ItemInfo.Title.DisplayValue,
                "description": selectedBook.ItemInfo.Description,
                "image": selectedBook.Images?.Primary?.Large?.URL || "https://books.is/vite.svg",
                "url": `https://books.is/book/${selectedBook.ASIN}`,
                "publisher": {
                  "@type": "Organization",
                  "name": "books.is",
                  "url": "https://books.is",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://books.is/vite.svg"
                  }
                }
              })}
            </script>
          </>
        )}
      </Helmet>

      <div className="min-h-screen bg-neutral-50">
        <header className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              <button 
                onClick={resetView}
                className="text-2xl font-normal tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors flex items-center gap-3"
              >
                <img src="/vite.svg" alt="Book Discovery Logo" className="w-8 h-8" />
                <h1>Book Discovery</h1>
              </button>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setShowReadingList(!showReadingList)}
                  className={`btn flex items-center gap-2 ${showReadingList ? 'btn-primary' : ''}`}
                  aria-label={showReadingList ? 'View Reading List' : 'View Trending Books'}
                >
                  <Library className="w-5 h-5" />
                  <span className="hidden sm:inline">Reading List</span>
                  {readingList.length > 0 && (
                    <span className="bg-white text-neutral-900 px-2 py-0.5 text-sm" role="status">
                      {readingList.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-neutral-900" aria-hidden="true" />
            <h2 className="text-2xl font-normal text-neutral-900">
              {showReadingList ? 'My Reading List' : 'Trending Now'}
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64" role="status" aria-label="Loading books">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-900" />
            </div>
          ) : error ? (
            <div className="text-center py-16" role="alert">
              <h2 className="text-xl text-red-600">{error}</h2>
              <button 
                onClick={loadBooks}
                className="mt-4 btn btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : displayBooks.length > 0 ? (
            <div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
              role="list"
              aria-label={showReadingList ? 'Reading List Books' : 'Trending Books'}
            >
              {displayBooks.map((book) => (
                <BookCard
                  key={book.ASIN}
                  book={book}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl text-neutral-600">
                {showReadingList
                  ? 'Your reading list is empty'
                  : 'No books available'}
              </h2>
            </div>
          )}
        </main>

        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onToggleReadingList={toggleReadingList}
            isInReadingList={readingList.some((b) => b.ASIN === selectedBook.ASIN)}
          />
        )}
      </div>
    </>
  );
}

export default App;