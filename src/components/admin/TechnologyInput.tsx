import { useState, useRef, useEffect, useMemo } from 'react';
import { getAllTechnologies, searchTechnologies } from '@/utils/technologies';
import { cn } from '@/utils/classnames';

interface TechnologyInputProps {
  value: string[];
  onChange: (technologies: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function TechnologyInput({
  value,
  onChange,
  placeholder = 'Buscar o agregar tecnología...',
  className,
}: TechnologyInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Memoizar las tecnologías para evitar recálculos innecesarios
  const allTechnologies = useMemo(() => getAllTechnologies(), []);

  // Filtrar sugerencias basadas en el input
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = searchTechnologies(inputValue, allTechnologies).filter(
        (tech) => !value.includes(tech)
      );
      setSuggestions(filtered.slice(0, 10)); // Limitar a 10 sugerencias
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setHighlightedIndex(-1);
  }, [inputValue, value, allTechnologies]);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectTechnology = (tech: string) => {
    if (!value.includes(tech)) {
      onChange([...value, tech]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleAddNewTechnology = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    onChange(value.filter((t) => t !== tech));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSelectTechnology(suggestions[highlightedIndex]);
      } else if (inputValue.trim()) {
        handleAddNewTechnology();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const handleInputFocus = () => {
    if (inputValue.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <div className="flex gap-2 mb-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          {/* Dropdown de sugerencias */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 w-full mt-1 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((tech, index) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleSelectTechnology(tech)}
                  className={cn(
                    'w-full text-left px-4 py-2 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors',
                    index === highlightedIndex && 'bg-secondary-100 dark:bg-secondary-700'
                  )}
                >
                  <span className="text-secondary-900 dark:text-secondary-100">{tech}</span>
                  <span className="ml-2 text-xs text-secondary-500 dark:text-secondary-400">
                    (existente)
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Indicador de nueva tecnología */}
          {inputValue.trim() &&
            !suggestions.some((s) => s.toLowerCase() === inputValue.trim().toLowerCase()) &&
            !value.includes(inputValue.trim()) && (
              <div className="absolute z-40 w-full mt-1 bg-white dark:bg-secondary-800 border border-primary-300 dark:border-primary-600 rounded-lg shadow-lg">
                <button
                  type="button"
                  onClick={handleAddNewTechnology}
                  className="w-full text-left px-4 py-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <span className="text-primary-700 dark:text-primary-400 font-medium">
                    + Agregar "{inputValue.trim()}"
                  </span>
                  <span className="ml-2 text-xs text-primary-500 dark:text-primary-400">(nueva)</span>
                </button>
              </div>
            )}
        </div>
        <button
          type="button"
          onClick={handleAddNewTechnology}
          disabled={!inputValue.trim()}
          className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 disabled:bg-secondary-300 dark:disabled:bg-secondary-700 disabled:cursor-not-allowed transition-colors"
        >
          Agregar
        </button>
      </div>

      {/* Tecnologías seleccionadas */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-full text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTechnology(tech)}
                className="text-secondary-500 dark:text-secondary-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                aria-label={`Eliminar ${tech}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Información de ayuda */}
      {value.length === 0 && (
        <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
          Escribe para buscar tecnologías existentes o crea una nueva
        </p>
      )}
    </div>
  );
}
