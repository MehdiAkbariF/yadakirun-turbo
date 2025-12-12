"use client";
import React, { useRef, useState } from 'react';
import { UploadCloud, X, File as FileIcon } from 'lucide-react';
import { Label } from '../Label/Label';
import './FileUpload.scss';

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  onFileSelect?: (file: File | null) => void;
}

export const FileUpload = ({ label, error, onFileSelect, id, ...props }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFileName(null);
    if (inputRef.current) inputRef.current.value = '';
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className={`file-upload ${error ? 'file-upload--error' : ''}`}>
      {label && <Label size="sm" weight="medium" color="secondary">{label}</Label>}
      
      <div 
        className="file-upload__box" 
        onClick={() => inputRef.current?.click()}
      >
        <input 
          ref={inputRef}
          type="file" 
          id={id}
          className="hidden" 
          onChange={handleChange}
          {...props} 
        />
        
        {fileName ? (
          <div className="file-upload__preview">
            <div className="flex items-center gap-2 text-brand-primary truncate">
              <FileIcon size={20} />
              <span className="truncate dir-ltr">{fileName}</span>
            </div>
            <button onClick={clearFile} className="file-upload__remove">
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="file-upload__placeholder">
             <UploadCloud size={24} className="text-text-placeholder mb-1" />
             <span className="text-sm text-text-placeholder">انتخاب عکس یا فیلم (No file chosen)</span>
          </div>
        )}
      </div>
      
      {error && <Label size="xs" color="on-brand">{error}</Label>}
    </div>
  );
};