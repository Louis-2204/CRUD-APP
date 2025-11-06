'use client';

import { createBook, updateBook } from '@/app/actions/bookActions';
import { useState } from 'react';
import AutocompleteInput from './AutocompleteInput';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  year: number | null;
  genre: string | null;
  rating: number | null;
}

interface BookFormProps {
  editingBook?: Book | null;
  onCancel?: () => void;
  authors: string[];
  genres: string[];
}

export default function BookForm({ editingBook, onCancel, authors, genres }: BookFormProps) {
  const [resetKey, setResetKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (editingBook) {
      await updateBook(editingBook.id, formData);
      onCancel?.();
    } else {
      await createBook(formData);
      form.reset();
      setResetKey(prev => prev + 1); // Force la réinitialisation des composants AutocompleteInput
    }
  };

  return (
    <form 
      key={editingBook?.id || `new-${resetKey}`}
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingBook ? 'Modifier le livre' : 'Ajouter un nouveau livre'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Titre *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={editingBook?.title || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <AutocompleteInput
          key={`author-${editingBook?.id || 'new'}`}
          id="author"
          name="author"
          label="Auteur"
          suggestions={authors}
          defaultValue={editingBook?.author || ''}
          required
        />

        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            defaultValue={editingBook?.isbn || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Année de publication
          </label>
          <input
            type="number"
            id="year"
            name="year"
            defaultValue={editingBook?.year ?? ''}
            step={1}
            inputMode="numeric"
            pattern="-?\d*"
            onInput={(e) => {
              const input = e.currentTarget as HTMLInputElement;
              const raw = input.value;
              const negative = raw.startsWith('-');
              const digits = raw.replace(/[^0-9]/g, '');
              input.value = negative ? `-${digits}` : digits;
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <AutocompleteInput
          key={`genre-${editingBook?.id || 'new'}`}
          id="genre"
          name="genre"
          label="Genre"
          suggestions={genres}
          defaultValue={editingBook?.genre || ''}
        />

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Note (0-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            defaultValue={editingBook?.rating || ''}
            step="0.1"
            min="0"
            max="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {editingBook ? 'Mettre à jour' : 'Ajouter'}
        </button>
        {editingBook && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors font-medium"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
