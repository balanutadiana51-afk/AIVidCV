import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { CVData } from '../types';

interface CVUploaderProps {
  onUpload: (cvData: CVData) => void;
}

const CVUploader: React.FC<CVUploaderProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<CVData | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.docx'))) {
      processFile(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    const cvData: CVData = {
      file,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    };
    setUploadedFile(cvData);
    onUpload(cvData);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!uploadedFile ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
            isDragging
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-4 rounded-full ${isDragging ? 'bg-purple-100' : 'bg-gray-100'}`}>
              <Upload className={`w-12 h-12 ${isDragging ? 'text-purple-600' : 'text-gray-400'}`} />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Upload Your CV
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Drag and drop your CV here, or click to browse
              </p>
              <p className="text-xs text-gray-400">
                Supports PDF, DOCX, and TXT files
              </p>
            </div>

            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileInput}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium"
              >
                Choose File
              </motion.div>
            </label>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-lg">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{uploadedFile.fileName}</h4>
                <p className="text-sm text-gray-500">Ready to transform</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={removeFile}
              className="p-2 hover:bg-white rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CVUploader;
