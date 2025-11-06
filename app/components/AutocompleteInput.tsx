'use client';

import { useEffect, useRef, useState } from 'react';

interface AutocompleteInputProps {
  id: string;
  name: string;
  label: string;
  suggestions: string[];
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}

export default function AutocompleteInput({
  id,
  name,
  label,
  suggestions,
  defaultValue = '',
  required = false,
  placeholder = '',
}: AutocompleteInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setValue(userInput);

    if (userInput) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleClick = (suggestion: string) => {
    setValue(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleClick(filteredSuggestions[activeSuggestionIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      <input
        ref={inputRef}
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (value && filteredSuggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClick(suggestion)}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-50 text-black ${
                index === activeSuggestionIndex ? 'bg-blue-100' : ''
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
