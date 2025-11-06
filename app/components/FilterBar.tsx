'use client';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  selectedYear: string;
  onYearChange: (value: string) => void;
  genres: string[];
  years: number[];
  totalBooks: number;
  filteredCount: number;
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedYear,
  onYearChange,
  genres,
  years,
  totalBooks,
  filteredCount,
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="🔍 Rechercher par titre, auteur ou ISBN..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:flex-1">
            <select
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Tous les genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:flex-1">
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Toutes les années</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600 whitespace-nowrap">
            {filteredCount} / {totalBooks} livres
          </div>
        </div>
      </div>
    </div>
  );
}
