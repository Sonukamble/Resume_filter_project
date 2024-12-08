import { createContext, ReactNode, useEffect, useState, useMemo } from "react";

type UserInfo = {
    access_token: string,
};

type UserFile = {
    file_id: number, // Change to number
    file_name: string,
    file_url: string
};

type UserInformationContextType = {
    isAuthenticated: boolean,
    userInfoData: UserInfo | null,
    logInFunction: (token: string) => void,
    logOutFunction: () => void,
    userFileData: UserFile | null,
    addUserFile: (file_id: number, file_name: string, file_url: string) => void, // Change to number
    deleteUserFile: () => void,
};

export const UserInformationContext = createContext<UserInformationContextType | null>(null);

type UserInformationProviderProps = {
    children: ReactNode
};

const UserInformationProvider = ({ children }: UserInformationProviderProps) => {
    const [userInfoData, setUserInfo] = useState<UserInfo | null>(null);
    const [userFileData, setUserFileData] = useState<UserFile | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const fileId = localStorage.getItem('file_id');
        const fileName = localStorage.getItem('file_name'); // Retrieve file_name from localStorage
        const file_url = localStorage.getItem('file_url');

        if (token) {
            setUserInfo({ access_token: token });
            setIsAuthenticated(true);
        }

        if (fileId && fileName && file_url) {
            setUserFileData({ file_id: Number(fileId), file_name: fileName, file_url: file_url }); // Set both file_id and file_name
        }
    }, []);

    const addUserFile = (fileId: number, fileName: string, fileUrl: string) => {
        localStorage.setItem('file_id', fileId.toString()); // Store file_id as string
        localStorage.setItem('file_name', fileName); // Store file_name
        localStorage.setItem('file_Url', fileUrl);
        setUserFileData({ file_id: fileId, file_name: fileName, file_url: fileUrl }); // Update state
    };

    const deleteUserFile = () => {
        localStorage.removeItem('file_id');
        localStorage.removeItem('file_name'); // Remove file_name as well
        localStorage.removeItem('file_url'); // Remove file_name as well
        setUserFileData(null);
    };

    const logInFunction = (token: string) => {
        localStorage.setItem('access_token', token);
        setUserInfo({ access_token: token });
        setIsAuthenticated(true);
    };

    const logOutFunction = () => {
        localStorage.removeItem('access_token');
        deleteUserFile();
        setIsAuthenticated(false);
        setUserInfo(null);
    };

    const value = useMemo(() => ({
        isAuthenticated,
        userInfoData,
        logInFunction,
        logOutFunction,
        userFileData,
        addUserFile,
        deleteUserFile,
    }), [isAuthenticated, userInfoData, userFileData]);

    return (
        <UserInformationContext.Provider value={value}>
            {children}
        </UserInformationContext.Provider>
    );
};

export default UserInformationProvider;
