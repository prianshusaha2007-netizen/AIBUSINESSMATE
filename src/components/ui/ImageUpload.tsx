import React, { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (base64: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-slate-600 bg-slate-800/50 text-muted transition-colors hover:border-primary hover:text-primary"
        onClick={handleAreaClick}
      >
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="Logo Preview" className="h-full w-full rounded-full object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </>
        ) : (
          <div className="text-center">
            <UploadCloud className="mx-auto h-8 w-8" />
            <span className="mt-1 block text-xs">Upload Logo</span>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
    </div>
  );
};

export default ImageUpload;
