import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Typography, Box, TextField, Divider, Button, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UserInformationContext } from '../../store/Login-context';
import SnackBar from '../commons/SnackBar';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';

import pdfLogo from '../../assets/pdf-svgrepo-com.svg';


import '../../css/file/FileUpload.css';
import { useFileContext } from '../../store/Sample-context';

const FileUpload = () => {
    const apiBaseUrl = import.meta.env.VITE_API_URL;


    const [selectedFileHistory, setSelectedFileHistory] = useState<{ file_name: string, file_id: number, file_url: string } | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | "warning" | "info">("info");
    const context = useContext(UserInformationContext);
    const navigate = useNavigate();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const { setFileId } = useFileContext();


    useEffect(() => {
        if (!context?.isAuthenticated) {
            setAlertSeverity("warning");
            setAlertMessage("First Login to website, If you want to store your data");
            setSnackbarOpen(true);

        }
    }, [context?.isAuthenticated]);


    useEffect(() => {
        const fetchFileHistory = async () => {
            if (context?.userInfoData?.access_token) {
                try {
                    const url = `${apiBaseUrl}/file/history`;
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            'access_token': context.userInfoData.access_token,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const statusCode = data?.cIntResponseStatus;
                        if (statusCode === 200) {
                            const { file_id, name, file_location } = data?.cObjResponseData;
                            localStorage.setItem("file_id", String(file_id));
                            localStorage.setItem("file_url", file_location);
                            localStorage.setItem("file_name", name);

                            setSelectedFileHistory({ file_name: name, file_id, file_url: file_location });
                            context?.addUserFile(Number(file_id), name, file_location);
                        } else {
                            console.log("Status code is not correct");
                        }
                    } else {
                        console.log("Error: Unable to fetch file history");
                    }
                } catch (error) {
                    console.log("Error fetching file history:", error);
                }
            }
        };

        fetchFileHistory();
    }, [context?.userInfoData?.access_token]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setCurrentFile(file);
        }
    };


    const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!titleRef.current?.value || !currentFile) {
            setAlertMessage('Please select a file and enter a title.');
            setAlertSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        setUploading(true);
        setError(null);
        setAlertMessage(null); // Reset alert

        const formData = new FormData();
        const fileURL = URL.createObjectURL(currentFile);
        formData.append('file', currentFile);
        formData.append('title', titleRef.current.value);

        const accessToken = context?.userInfoData?.access_token;

        try {
            if (accessToken) {
                const response = await fetch(`${apiBaseUrl}/upload/file/`, {
                    method: 'POST',
                    headers: {
                        'access_token': accessToken,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }

                const result = await response.json();
                const statusCode = result.cIntResponseStatus;

                if (statusCode === 201) {
                    const messageData = result.cObjResponseData?.file_data;
                    context.addUserFile(messageData.file_id, messageData.name, fileURL);

                    setSelectedFileHistory({
                        file_name: messageData.name,
                        file_id: messageData.file_id, // Temporary ID
                        file_url: fileURL, // Placeholder
                    });

                    setSnackbarOpen(true);
                    setAlertMessage('File uploaded successfully!');
                    setAlertSeverity('success');
                } else if (statusCode === 401) {
                    setAlertMessage('You need to log in first.');
                    setAlertSeverity('warning');
                    setSnackbarOpen(true);
                    navigate("/login");
                } else {
                    setAlertMessage('File not uploaded. Try again.');
                    setAlertSeverity('error');
                    setSnackbarOpen(true);
                }
            } else {

                const response = await fetch(`${apiBaseUrl}/upload/file/Sample`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }

                const result = await response.json();
                const statusCode = result.cIntResponseStatus;

                if (statusCode === 201) {
                    const messageData = result.cObjResponseData?.file_data;
                    // context.addUserFile(messageData.file_id, messageData.name, messageData.file_location);

                    setSelectedFileHistory({
                        file_name: messageData.name,
                        file_id: messageData.file_id, // Temporary ID
                        file_url: fileURL, // Placeholder
                    });
                    setFileId(messageData.file_id);

                    setSnackbarOpen(true);
                    setAlertMessage('File uploaded successfully!');
                    setAlertSeverity('success');
                } else {
                    setAlertMessage('File not uploaded. Try again.');
                    setAlertSeverity('error');
                    setSnackbarOpen(true);
                }

            }
        } catch (error) {
            setAlertMessage('An unknown error occurred.');
            setAlertSeverity('error');
            setSnackbarOpen(true);
            setError(error instanceof Error ? `Error: ${error.message}` : 'An unknown error occurred.');
        } finally {
            setUploading(false);
        }
    };

    const handleDeletePdf = async () => {
        if (!selectedFileHistory) return;

        const currentFileData = selectedFileHistory;
        const accessToken = context?.userInfoData?.access_token;
        if (accessToken && currentFileData) {
            try {
                const response = await fetch(`${apiBaseUrl}/delete/files/${currentFileData.file_id}`, {
                    method: 'DELETE',
                    headers: {
                        'access_token': accessToken,
                    },
                });

                if (response.ok) {
                    const finalResponse = await response.json();
                    if (finalResponse?.cIntResponseStatus === 200) {
                        setSelectedFileHistory(null);
                        setAlertMessage('File deleted successfully!');
                        setAlertSeverity('success');
                        setSnackbarOpen(true);
                        context.deleteUserFile();

                    }
                    else {
                        console.log("Not found the correct status code");
                    }

                } else {
                    throw new Error('Failed to delete file');
                }
            } catch (error) {
                setAlertMessage('An error occurred while deleting the file.');
                setAlertSeverity('error');
                setSnackbarOpen(true);
            }
        }
        else {
            setSelectedFileHistory(null);
            setAlertMessage('File deleted successfully!');
            setAlertSeverity('success');
            setSnackbarOpen(true);
            setFileId(null);

            // try {
            //     const response = await fetch(`${apiBaseUrl}/delete/files/${currentFileData.file_id}`, {
            //         method: 'DELETE',
            //     });

            //     if (response.ok) {
            //         const finalResponse = await response.json();
            //         if (finalResponse?.cIntResponseStatus === 200) {
            //             setSelectedFileHistory(null);
            //             setAlertMessage('File deleted successfully!');
            //             setAlertSeverity('success');
            //             setSnackbarOpen(true);

            //         }
            //         else {
            //             console.log("Not found the correct status code");
            //         }

            //     } else {
            //         throw new Error('Failed to delete file');
            //     }
            // } catch (error) {
            //     setAlertMessage('An error occurred while deleting the file.');
            //     setAlertSeverity('error');
            //     setSnackbarOpen(true);
            // }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (snackbarOpen) {
            const timer = setTimeout(() => {
                setSnackbarOpen(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [snackbarOpen]);

    return (
        <Box>
            {!selectedFileHistory && (
                <form onSubmit={handleUpload} className="file-upload-container">
                    <h1>Upload File</h1>

                    <Divider />

                    <TextField
                        inputRef={titleRef}
                        label="Title"
                        variant="outlined"
                        className="file-upload-title-input"
                        fullWidth
                        required
                    />

                    <Box className="file-upload-area">
                        <input
                            accept=".pdf"
                            id="file-input"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            required
                        />
                        <label htmlFor="file-input" className="file-input-label">
                            <Box className="file-drop-zone">
                                <CloudUploadIcon className="upload-icon" />
                                <Typography variant="body1">Drag & Drop here or</Typography>
                                <Typography variant="body2" className="browse-files-link">
                                    Browse files
                                </Typography>
                                {selectedFileHistory && (
                                    <Typography variant="body2" className="file-name">
                                        Attached: {selectedFileHistory}
                                    </Typography>
                                )}
                            </Box>
                        </label>

                        {currentFile && (
                            <Stack direction="row" spacing={4} sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                color: "red",
                            }}>
                                <PictureAsPdfRoundedIcon />
                                <h4>{currentFile.name}</h4>
                            </Stack>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        className="file-upload-button"
                        type="submit"
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>

                    {error && (
                        <Typography variant="body2" color="error">
                            {error}
                        </Typography>
                    )}

                    <Typography variant="caption" className="file-upload-hint">
                        Accepted File Type: .pdf only
                    </Typography>
                </form>
            )}
            {selectedFileHistory && (
                <Box className="uploaded-file-container">
                    <Typography variant="h6" className="file-title">
                        Uploaded Document
                    </Typography>

                    <Divider />

                    <Box className="pdf-container">
                        {/* <AttachFileIcon style={{ marginRight: '8px' }} /> */}
                        <img src={pdfLogo} alt="React Logo" className='pdf-image' />
                        <embed type="application/pdf" src={selectedFileHistory.file_url} className="pdf-preview" />
                    </Box>
                    <h4>{selectedFileHistory.file_name}</h4>

                    <Button
                        variant="outlined"
                        color="secondary"
                        className="file-delete-button"
                        onClick={handleDeletePdf}
                    >
                        Delete PDF
                    </Button>
                </Box>
            )}
            <SnackBar
                open={snackbarOpen}
                handleClose={handleSnackbarClose}
                severity={alertSeverity}
                message={alertMessage}
            />
        </Box>
    );
};

export default FileUpload;
