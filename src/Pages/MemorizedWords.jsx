import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WordCard from '../components/WordCard'
import { useAuth } from '../contexts/AuthContext'
import { StyledInput } from '../StyledComponents/StyledInput';
import { useLocation } from 'react-router-dom';
import MemorizedWordCard from '../components/MemorizedWordCard'

function MemorizedWords() {
    const { user, setUser } = useAuth()
    const [words, setWords] = useState({})
    const [update, setUpdate] = useState(0)
    const [wordStates, setWordStates] = useState({});
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

    const updatePage = () => {
        setUpdate(prev => prev + 1)
    }

    useEffect(() => {
        async function getWords() {
            const wordsData = await axios.get('http://localhost:5000/word/memorized?userId=' + user?.result._id)
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
                            <StyledInput variant='outlined' label='Search' type='search' sx={{ width: '50%' }} />
                        </Stack>
                        {
                            !words.length ?
                                <CircularProgress size={50} sx={{ m: 10 }} />
                                : (
                                    <Stack spacing={5} sx={{ mt: 10 }}>
                                        {
                                            Object.entries(words).map(([key, value]) => {
                                                return (
                                                    <MemorizedWordCard key={key} word={value} onClick={() => handleClick(key)} isClicked={wordStates[key]} update={updatePage} />
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

export default MemorizedWords