import React from 'react';
import { AmazonBook } from '../types';
import { X, BookOpen, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface BookDetailsProps {
  book: AmazonBook;
  onClose: () => void;
  onToggleReadingList: (book: AmazonBook) => void;
  isInReadingList: boolean;
}

export function BookDetails({ book, onClose, onToggleReadingList, isInReadingList }: BookDetailsProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm" 
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-normal">Book Details</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="aspect-[2/3] bg-neutral-100 overflow-hidden relative">
                {book.Images?.Primary?.Large?.URL ? (
                  <>
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <LoadingSpinner size="md" />
                      </div>
                    )}
                    <img
                      src={book.Images.Primary.Large.URL}
                      alt={book.ItemInfo.Title.DisplayValue}
                      className="w-full h-full object-cover"
                      onLoad={() => setIsImageLoading(false)}
                      style={{ opacity: isImageLoading ? 0 : 1 }}
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="w-16 h-16 text-neutral-400" />
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-4">
                {book.DetailPageURL && (
                  <a
                    href={book.DetailPageURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Read More
                  </a>
                )}
                
                <button
                  onClick={() => onToggleReadingList(book)}
                  className="btn w-full flex items-center justify-center gap-2"
                >
                  {isInReadingList ? (
                    <>
                      <BookmarkCheck className="w-5 h-5" />
                      Remove from Reading List
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-5 h-5" />
                      Add to Reading List
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="hidden md:block w-px bg-neutral-200" />
            
            <div className="flex-1">
              <h1 className="text-2xl font-normal mb-6">{book.ItemInfo.Title.DisplayValue}</h1>
              
              {book.ItemInfo.Description ? (
                <div className="prose prose-neutral max-w-none">
                  <p className="text-neutral-600 leading-relaxed whitespace-pre-line text-left">
                    {book.ItemInfo.Description}
                  </p>
                </div>
              ) : (
                <p className="text-neutral-500 italic">No description available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}