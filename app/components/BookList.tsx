'use client';

import { deleteBook } from '@/app/actions/bookActions';
import { useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  year: number | null;
  genre: string | null;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
}

export default function BookList({ books, onEdit }: BookListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      setDeletingId(id);
      await deleteBook(id);
      setDeletingId(null);
    }
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-lg">Aucun livre dans la bibliothèque</p>
        <p className="text-gray-400 text-sm mt-2">Ajoutez votre premier livre ci-dessus</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow justify-between flex flex-col"
        >
          <div>
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 flex-1">{book.title}</h3>
                {book.rating && (
                <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm font-semibold ml-2">
                    ★ {book.rating.toFixed(1)}
                </span>
                )}
            </div>

            <p className="text-gray-600 mb-2">
                <span className="font-medium">Auteur:</span> {book.author}
            </p>

            {book.genre && (
                <p className="text-gray-600 mb-2">
                <span className="font-medium">Genre:</span> {book.genre}
                </p>
            )}

            {book.year && (
                <p className="text-gray-600 mb-2">
                <span className="font-medium">Année:</span> {book.year}
                </p>
            )}

            {book.isbn && (
                <p className="text-gray-500 text-sm mb-4">
                <span className="font-medium">ISBN:</span> {book.isbn}
                </p>
            )}
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => onEdit(book)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-medium"
            >
              Modifier
            </button>
            <button
              onClick={() => handleDelete(book.id)}
              disabled={deletingId === book.id}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {deletingId === book.id ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
