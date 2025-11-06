'use client';

import { useMemo, useState } from 'react';
import BookForm from './BookForm';
import BookList from './BookList';
import FilterBar from './FilterBar';
import Pagination from './Pagination';

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

interface BookPageClientProps {
  initialBooks: Book[];
  authors: string[];
  genres: string[];
  years: number[];
}

export default function BookPageClient({ initialBooks, authors, genres, years }: BookPageClientProps) {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 15;

  // Filtrage des livres
  const filteredBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesGenre = !selectedGenre || book.genre === selectedGenre;
      const matchesYear = !selectedYear || book.year?.toString() === selectedYear;
      
      return matchesSearch && matchesGenre && matchesYear;
    });
  }, [initialBooks, searchTerm, selectedGenre, selectedYear]);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  
  // Ajuster la page actuelle si elle dépasse le nombre total de pages
  const validCurrentPage = currentPage > totalPages && totalPages > 0 ? totalPages : currentPage;
  
  const paginatedBooks = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * booksPerPage;
    return filteredBooks.slice(startIndex, startIndex + booksPerPage);
  }, [filteredBooks, validCurrentPage, booksPerPage]);

  // Reset à la page 1 quand on change les filtres
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    setCurrentPage(1);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    setCurrentPage(1);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            📚 Ma Bibliothèque
          </h1>
          <p className="text-gray-600 text-lg">
            Gérez votre collection de livres
          </p>
        </header>

        <BookForm 
          editingBook={editingBook} 
          onCancel={handleCancelEdit} 
          authors={authors}
          genres={genres}
        />

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Mes livres
          </h2>
          
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            genres={genres}
            years={years}
            totalBooks={initialBooks.length}
            filteredCount={filteredBooks.length}
          />

          <BookList books={paginatedBooks} onEdit={handleEdit} />
          
          <Pagination
            currentPage={validCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
