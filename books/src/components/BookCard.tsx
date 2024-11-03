import React from 'react';
import { AmazonBook } from '../types';
import { BookOpen } from 'lucide-react';

interface BookCardProps {
  book: AmazonBook;
  onClick: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer h-full flex flex-col"
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-neutral-100 mb-4 transition-transform duration-200 group-hover:translate-y-[-4px]">
        {book.Images?.Primary?.Large?.URL ? (
          <img
            src={book.Images.Primary.Large.URL}
            alt={book.ItemInfo.Title.DisplayValue}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen className="w-12 h-12 text-neutral-400" />
          </div>
        )}
      </div>
      <div className="mt-auto">
        <h3 className="font-normal text-base leading-tight line-clamp-2 group-hover:text-neutral-600">
          {book.ItemInfo.Title.DisplayValue}
        </h3>
      </div>
    </div>
  );
}