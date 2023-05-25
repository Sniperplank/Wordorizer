import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { StyledInput } from '../StyledComponents/StyledInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MemorizedWordCard from '../components/MemorizedWordCard'
import { signin } from '../actions/auth';
import { StyledButton } from '../StyledComponents/StyledButton';

function MemorizedWords() {
    const { user, setUser } = useAuth()
    const [words, setWords] = useState({})
    const [update, setUpdate] = useState(0)
    const [wordStates, setWordStates] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation()
    const [error, setError] = useState('')
    const navigate = useNavigate()

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
            const wordsData = await axios.get('https://wordorizor-api.vercel.app/word/memorized?userId=' + user?.result._id)
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
                            <StyledInput variant='outlined' label={'Search ' + words.length + ' words'} type='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: '50%' }} inputProps={{ autoComplete: 'off' }} />
                        </Stack>
                        {
                            !words.length ?
                                <CircularProgress size={50} sx={{ m: 10 }} />
                                : (
                                    <Stack spacing={5} sx={{ mt: 10 }}>
                                        {
                                            filteredWords.map(([key, value]) => {
                                                return (
                                                    <MemorizedWordCard key={key} word={value} onClick={() => handleClick(key)} isClicked={wordStates[key]} update={updatePage} />
                                                )
                                            })
                                        }
                                    </Stack>
                                )
                        }
                    </>
                    :
                    <Stack spacing={10}>
                        <Typography variant='h1'>Sign in to see words</Typography>
                        <StyledButton variant='contained' component={Link} to='/signin' sx={{ width: '20%', alignSelf: 'center' }}>Sign In</StyledButton>
                        <StyledButton variant='contained' sx={{ width: '20%', alignSelf: 'center' }} onClick={() => { signin({ email: 'test@gmail.com', password: '1234' }, navigate, setError) }}>Dummy Account</StyledButton>
                        <Typography variant='h6' color='error'>{error}</Typography>
                    </Stack>
            }
        </Box>
    )
}

export default MemorizedWords