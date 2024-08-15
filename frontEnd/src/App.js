import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, List, ListItem, ListItemText, CircularProgress, Grid } from '@mui/material';
import './App.css';
import foodImage from './mainpageimage.jpg';

function App() {
    const [question, setQuestion] = useState("");
    const [conversation, setConversation] = useState([
        { role: "assistant", content: "Hi there! What would you like to eat today? Here are some yummy categories to choose from:" }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [topics] = useState([
        "Appetizers",
        "Main Courses",
        "Desserts",
        "Beverages",
        "Salads",
        "Soups"
    ]);

    const [conversationStarted, setConversationStarted] = useState(false);

    const [selectedTopic, setSelectedTopic] = useState("");

    // Predefined Q&A data
    const recipeQA = {
        "What Kind of food do you want to eat": ``
    };


    useEffect(() => {
        const savedConversation = localStorage.getItem('conversation');
        if (savedConversation) {
            setConversation(JSON.parse(savedConversation));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('conversation', JSON.stringify(conversation));
    }, [conversation]);

    const askQuestion = async () => {
        setLoading(true);
        setError("");
        const newConversation = [...conversation, { role: "user", content: question }];
        setConversation(newConversation);

        setConversationStarted(true);

        // Delay response to simulate network or processing delay
        setTimeout(() => {
            const assistantResponse = recipeQA[question] || "Sorry, I could not find an answer to your question.";
            setConversation(prev => [...prev, { role: "assistant", content: assistantResponse }]);
            setLoading(false);
            setQuestion(""); // Clear input field after asking
        }, 3500); // Delay of 2000 milliseconds (2 seconds)
    };


    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
        const responseMessage = `You have selected ${topic}. Looking for delicious recipes...`;
        setConversation([...conversation, { role: "assistant", content: responseMessage }]);
    };

    return (
        <div className="App app-wrap-container">
            <div className="app-top-parts">
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={foodImage} alt="Delicious food" style={{width: '2rem', marginRight: '10px', height: '2rem', borderRadius: '50%'}}/>
                    <Typography variant="h4" gutterBottom>
                        FoodieBot
                    </Typography>
                </div>
                <List className="showing-list-wrap">
                    {conversation.map((entry, index) => (
                        <ListItem key={index} className={entry.role === "user" ? "user-message" : "assistant-message"}>
                            <ListItemText primary={entry.content} />
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className="app-bottom-parts">
                {selectedTopic === "" && (
                    <Grid container spacing={2} className="topics-grid">
                        {!conversationStarted && (topics.map((topic, index) => (
                            <Grid item xs={10} sm={5} key={index}>
                                <div className="topic-buttons" onClick={() => handleTopicSelect(topic)}>
                                    {topic}
                                </div>
                            </Grid>
                        )))}
                    </Grid>
                )}
                <Box display="flex" alignItems="center" mt={2} className="input-box">
                    <TextField
                        className="input-box-body"
                        label="Ask a question..."
                        variant="outlined"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={loading}
                    />
                    <div
                        className="input-submit-button"
                        onClick={askQuestion}
                        style={{ marginLeft: '16px' }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Ask"}
                    </div>
                </Box>
                {error && <Typography color="error" style={{ marginTop: '16px' }}>{error}</Typography>}
            </div>
        </div>
    );
}

export default App;
