import BookPageClient from './components/BookPageClient';
import { getBooks, getUniqueAuthors, getUniqueGenres, getUniqueYears } from './data/bookData';

export default async function Home() {
  const [books, authors, genres, years] = await Promise.all([
    getBooks(),
    getUniqueAuthors(),
    getUniqueGenres(),
    getUniqueYears(),
  ]);

  return <BookPageClient initialBooks={books} authors={authors} genres={genres} years={years} />;
}
