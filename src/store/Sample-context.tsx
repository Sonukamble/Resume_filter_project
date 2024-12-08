import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the type for the FileContext
interface FileContextType {
    fileId: number | null; // Assuming fileId can be a number or null
    setFileId: React.Dispatch<React.SetStateAction<number | null>>; // Function to set the fileId
}

// Create the context with an initial value
export const FileContext = createContext<FileContextType | undefined>(undefined);

// Define the provider component
export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [fileId, setFileId] = useState<number | null>(null); // Initialize fileId as number or null

    return (
        <FileContext.Provider value={{ fileId, setFileId }}>
            {children}
        </FileContext.Provider>
    );
};

// Custom hook to use the FileContext
export const useFileContext = () => {
    const context = useContext(FileContext);
    if (context === undefined) {
        throw new Error("useFileContext must be used within a FileProvider");
    }
    return context;
};

