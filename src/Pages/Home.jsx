import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WordCard from '../components/WordCard'
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../contexts/AuthContext'
import { StyledButton } from '../StyledComponents/StyledButton'
import { StyledInput } from '../StyledComponents/StyledInput';
import NewWordModal from '../components/NewWordModal';
import { useLocation } from 'react-router-dom';

function Home() {
    const [isNWModalOpen, setIsNWModalOpen] = useState(false)
    const { user, setUser } = useAuth()
    const [words, setWords] = useState({})
    const [update, setUpdate] = useState(0)
    const [wordStates, setWordStates] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation()

    function handleClick(key) {
        setWordStates(prevWordStates => {
            const isClicked = prevWordStates[key];
            // Toggle the isClicked value for the clicked key
            const newState = {
                ...prevWordStates,
                [key]: !isClicked
            };
            // Set all values to false except for the clicked key if it was just clicked
            if (!isClicked) {
                Object.keys(newState).forEach(k => {
                    if (k !== key) {
                        newState[k] = false;
                    }
                });
            }
            return newState;
        })
    }

    const filteredWords = Object.entries(words).filter(word => {
        return (
            word[1].word.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    const updatePage = () => {
        setUpdate(prev => prev + 1)
    }

    useEffect(() => {
        async function getWords() {
            const wordsData = await axios.get('https://wordorizor-api.vercel.app/word?userId=' + user?.result._id)
            setWords(wordsData.data)
        }
        getWords()
    }, [update, location])

    return (
        <Box p={{ xs: 1, sm: 10 }} >
            {
                user ?
                    <>
                        <Stack direction='row' justifyContent='space-evenly'>
                            <StyledInput variant='outlined' label='Search' type='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: '50%' }} inputProps={{ autoComplete: 'off' }} />
                            <StyledButton onClick={() => setIsNWModalOpen(true)} variant='contained' color='primary' startIcon={<AddIcon />} sx={{ height: 50, textTransform: 'none' }}>New Word</StyledButton>
                        </Stack>
                        <NewWordModal open={isNWModalOpen} onClose={() => setIsNWModalOpen(false)} update={updatePage} />
                        {
                            !words.length ?
                                <CircularProgress size={50} sx={{ m: 10 }} />
                                : (
                                    <Stack spacing={5} sx={{ mt: 10 }}>
                                        {
                                            filteredWords.map(([key, value]) => {
                                                return (
                                                    <WordCard key={key} word={value} onClick={() => handleClick(key)} isClicked={wordStates[key]} update={updatePage} />
                                                )
                                            })
                                        }
                                    </Stack>
                                )
                        }
                    </>
                    : <Typography variant='h1'>Sign in to see words</Typography>
            }
        </Box>
    )
}

export default Home