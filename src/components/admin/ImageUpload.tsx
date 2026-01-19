import { useState } from 'react';
import { storageService } from '@/services/storageService';
import { cn } from '@/utils/classnames';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  multiple?: boolean;
  onMultipleChange?: (urls: string[]) => void;
  existingImages?: string[];
}

export default function ImageUpload({
  label,
  value,
  onChange,
  folder = 'projects',
  multiple = false,
  onMultipleChange,
  existingImages = [],
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setUploading(true);

    try {
      if (multiple && onMultipleChange) {
        // Subir múltiples imágenes
        const fileArray = Array.from(files);
        const basePath = folder.includes('/') ? folder : `${folder}/new`;
        
        const urls = await storageService.uploadImages(fileArray, basePath);
        onMultipleChange([...existingImages, ...urls]);
      } else {
        // Subir una sola imagen
        const file = files[0];
        if (!file) return;
        
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop() || 'jpg';
        const fileName = `image-${timestamp}.${fileExtension}`;
        const basePath = folder.includes('/') ? folder : `${folder}/new`;
        const path = `${basePath}/${fileName}`;
        
        const url = await storageService.uploadImage(file, path);
        onChange(url);
        setPreview(url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir imagen');
      console.error('Error uploading image:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index?: number) => {
    if (multiple && index !== undefined && onMultipleChange) {
      const newImages = existingImages.filter((_, i) => i !== index);
      onMultipleChange(newImages);
    } else {
      onChange('');
      setPreview(null);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">{label}</label>
      
      {!multiple ? (
        <div className="space-y-2">
          {preview && (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-secondary-200 dark:border-secondary-700"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage()}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
          
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
              id={`file-input-${label}`}
            />
            <label
              htmlFor={`file-input-${label}`}
              className={cn(
                'inline-flex items-center px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg cursor-pointer',
                'hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors',
                uploading && 'opacity-50 cursor-not-allowed'
              )}
            >
              {uploading ? 'Subiendo...' : preview ? 'Cambiar Imagen' : 'Subir Imagen'}
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {existingImages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {existingImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Screenshot ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border border-secondary-200 dark:border-secondary-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              multiple
              className="hidden"
              id={`file-input-multiple-${label}`}
            />
            <label
              htmlFor={`file-input-multiple-${label}`}
              className={cn(
                'inline-flex items-center px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg cursor-pointer',
                'hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors',
                uploading && 'opacity-50 cursor-not-allowed'
              )}
            >
              {uploading ? 'Subiendo...' : 'Agregar Screenshots'}
            </label>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      {value && !multiple && (
        <p className="text-xs text-secondary-500 dark:text-secondary-400">URL: {value.substring(0, 50)}...</p>
      )}
    </div>
  );
}
