import React, { useState, useEffect } from 'react';
import { Search, Library, Loader2, TrendingUp } from 'lucide-react';
import { AmazonBook } from './types';
import { BookCard } from './components/BookCard';
import { BookDetails } from './components/BookDetails';
import { fetchBooks } from './lib/books';

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

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            <button 
              onClick={resetView}
              className="text-2xl font-normal tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors"
            >
              Books
            </button>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowReadingList(!showReadingList)}
                className={`btn flex items-center gap-2 ${showReadingList ? 'btn-primary' : ''}`}
              >
                <Library className="w-5 h-5" />
                <span className="hidden sm:inline">Reading List</span>
                {readingList.length > 0 && (
                  <span className="bg-white text-neutral-900 px-2 py-0.5 text-sm">
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
          <TrendingUp className="w-6 h-6 text-neutral-900" />
          <h2 className="text-2xl font-normal text-neutral-900">Trending Now</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-900" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <h2 className="text-xl text-red-600">{error}</h2>
            <button 
              onClick={loadBooks}
              className="mt-4 btn btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : displayBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
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
  );
}

export default App;