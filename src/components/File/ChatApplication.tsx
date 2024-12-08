import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Stack, Card, Tooltip, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AssistantIcon from '@mui/icons-material/Assistant';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../css/file/ChatApplication.css';
import { UserInformationContext } from '../../store/Login-context';
import { useFileContext } from '../../store/Sample-context';
import SnackBar from '../commons/SnackBar';

const ChatApplication = () => {
    const apiBaseUrl = import.meta.env.VITE_API_URL;


    const [chatHistory, setChatHistory] = useState<{ question: string, answers: string, qa_id: number }[]>([]);
    const inputMessageRef = useRef<HTMLInputElement | null>(null);
    const context = useContext(UserInformationContext);
    const accessToken = context?.userInfoData?.access_token;
    const fileIdData = Number(localStorage.getItem("file_id"));


    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | "warning" | "info">("info");
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const { fileId } = useFileContext();


    useEffect(() => {
        const fetchChatHistory = async () => {
            if (accessToken && fileIdData) {
                try {
                    let url = `${apiBaseUrl}/file/chat/history/${fileIdData}`;
                    const headers: HeadersInit = {};
                    if (accessToken) {
                        headers['access_token'] = accessToken; // Only set if defined
                    }
                    const response = await fetch(url, {
                        method: "GET",
                        headers
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const status_Code = data?.cIntResponseStatus;
                        if (status_Code === 200) {
                            let historyData = data?.cObjResponseData;
                            setChatHistory(historyData);
                        } else {
                            console.log("Status code is not found correct");
                        }

                    } else {
                        console.log("Error: Unable to fetch chat history");

                    }
                }
                catch (error) {
                    console.error("Error fetching chat history:", error);
                }
            }
        };
        fetchChatHistory();
    }, [accessToken, fileIdData]);

    const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Clear the input field after sending the message

        const message = inputMessageRef.current?.value;

        if (!message || message.trim() === '') return;

        const messagedata = { question: message };

        try {
            if (accessToken) {
                const response = await fetch(`${apiBaseUrl}/upload/question`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': accessToken
                    },
                    body: JSON.stringify(messagedata)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const finalResponse = responseData.cObjResponseData?.answers;
                    const qaID = responseData.cObjResponseData?.qa_id;

                    // Add the question and response to the chat history
                    setChatHistory(prev => [...prev, { question: message, answers: finalResponse, qa_id: qaID }]);
                } else {
                    console.log("Error: Unable to get the response");
                }
            }
            else {
                if (fileId) {
                    const messagedataSample = { question: message, file_id: fileId }
                    const response = await fetch(`${apiBaseUrl}/upload/question/sample`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(messagedataSample)
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                        const finalResponse = responseData.cObjResponseData?.answers;
                        const qaID = responseData.cObjResponseData?.qa_id;

                        // Add the question and response to the chat history
                        setChatHistory(prev => [...prev, { question: message, answers: finalResponse, qa_id: qaID }]);
                    } else {
                        console.log("Error: Unable to get the response");
                    }
                }
                else {
                    setAlertMessage('First upload file then ask question');
                    setAlertSeverity('error');
                    setSnackbarOpen(true);
                }


                console.log("Not found access_token");
            }
            if (inputMessageRef.current) {
                inputMessageRef.current.value = '';
            }

        } catch (error) {
            console.error("Error:", error);
        }


    };

    // Function to delete a specific chat
    const handleDeleteMessage = async (chatIds: number[]) => {
        try {
            if (accessToken) {
                const response = await fetch(`${apiBaseUrl}/delete/chat_ids/`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': accessToken
                    },
                    body: JSON.stringify(chatIds)
                });

                const result = await response.json();

                if (response.ok && result.cIntResponseStatus === 200) {
                    console.log("Chats deleted successfully");
                    setChatHistory(prev => prev.filter(chat => !chatIds.includes(chat.qa_id)));

                } else {
                    console.error("Failed to delete chats:", result.message || "Unknown error");
                }
            }
            else {
                setChatHistory(prev => prev.filter(chat => !chatIds.includes(chat.qa_id)));
                console.log("Not found access_token");
            }

        } catch (error) {
            console.error("Error:", error);
        }

    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };



    return (
        <Box className="chat-container">
            {/* Messages Display Area */}
            <Paper className="chat-messages-container">
                <Stack spacing={2} alignItems="flex-end" justifyContent="flex-end">
                    {chatHistory.length > 0 ? (
                        chatHistory.map((chat, index) => (
                            <Stack key={index} className="answer-withquestion-container">
                                {/* User message */}
                                <Stack direction="row" className="chat-message">
                                    <Box className="chat-message-icon-container">
                                        <Tooltip title="User">
                                            <IconButton>
                                                <PersonPinIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Card className="chat-card-text">
                                        <Typography>
                                            <strong>User:</strong> {chat.question}
                                        </Typography>
                                    </Card>
                                    {/* Delete button for specific message */}
                                    <IconButton onClick={() => handleDeleteMessage([chat.qa_id])}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>

                                {/* AI response */}
                                <Stack direction="row" className="chat-message-answer">
                                    <Box className="chat-message-icon-container">
                                        <Tooltip title="AI">
                                            <IconButton>
                                                <AssistantIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Card className="chat-card-text">
                                        <strong>AI Response:</strong>
                                        <Typography dangerouslySetInnerHTML={{ __html: chat.answers }} />
                                    </Card>
                                </Stack>
                            </Stack>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No messages yet.
                        </Typography>
                    )}
                </Stack>
            </Paper>

            {/* Message Input Area */}
            <Box>
                <form className="chat-input-container" onSubmit={handleSendMessage}>
                    <TextField
                        inputRef={inputMessageRef}
                        label="Type a message"
                        variant="outlined"
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        type="submit"
                    >
                        Send
                    </Button>
                </form>
            </Box>

            {/* Clear All Messages Button */}
            {/* {chatHistory.length > 0 && (
                <Box className="clear-all-button-container" mt={2}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<ClearAllIcon />}
                        onClick={handleClearAllMessages}
                    >
                        Clear All Chats
                    </Button>
                </Box>
            )} */}

            <SnackBar
                open={snackbarOpen}
                handleClose={handleSnackbarClose}
                severity={alertSeverity}
                message={alertMessage}
            />
        </Box>
    );
};

export default ChatApplication;
