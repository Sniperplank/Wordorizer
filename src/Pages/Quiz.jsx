import { Box, Checkbox, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import WhatDefinition from '../components/quiz/WhatDefinition'
import WhatWord from '../components/quiz/WhatWord'
import { useAuth } from '../contexts/AuthContext'
import { StyledButton } from '../StyledComponents/StyledButton'
import { StyledInput } from '../StyledComponents/StyledInput'

function Quiz() {
    const { user, setUser } = useAuth()
    const [words, setWords] = useState({})
    const [update, setUpdate] = useState(0)
    const [startQuiz, setStartQuiz] = useState(false)
    const [randomBool, setRandomBool] = useState(Math.random() < 0.5)
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
    const [score, setScore] = useState(0)
    const [error, setError] = useState('')
    const location = useLocation()

    const submitAnswer = event => {
        if (event.keyCode === 13) {
            if (isCorrectAnswer) {
                setError('')
                setScore(prev => prev + 1)
                handleRandomize()
            } else {
                setError('Wrong Answer')
            }
        }
    }

    const buttonSubmitAnswer = event => {
        if (isCorrectAnswer) {
            setError('')
            setScore(prev => prev + 1)
            handleRandomize()
        } else {
            setError('Wrong Answer')
        }
    }

    const handleAnswerCorrectness = (isCorrect) => {
        setIsCorrectAnswer(isCorrect)
    }

    const handleRandomize = () => {
        setRandomBool(Math.random() < 0.5);
    };

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
        <Box p={{ xs: 1, sm: 10 }}>
            {
                !startQuiz &&
                <Stack spacing={5} sx={{ alignItems: 'center' }}>
                    <Stack direction='row' spacing={3}>
                        <Typography variant='h4'>Number of words in quiz:</Typography>
                        <StyledInput type='number' variant='outlined' />
                    </Stack>
                    <Stack direction='row' spacing={3}>
                        <Typography variant='h4'>Include all memorized words:</Typography>
                        <Checkbox sx={{ color: '#b6b4b4' }} />
                    </Stack>
                    <StyledButton variant='contained' onClick={() => {
                        setStartQuiz(true)
                        handleRandomize()
                    }}>Start quiz</StyledButton>
                </Stack>
            }
            {
                startQuiz &&
                <Stack spacing={5}>
                    <Typography variant='h5'>{score}</Typography>
                    {randomBool ? <WhatWord word={words[1]} onWordCorrectnessChange={handleAnswerCorrectness} submitAnswer={submitAnswer} /> : <WhatDefinition word={words[1]} onDefinitionCorrectnessChange={handleAnswerCorrectness} submitAnswer={submitAnswer} />}
                    <Typography variant='h5' color='error'>{error}</Typography>
                    <StyledButton variant='contained' onClick={() => buttonSubmitAnswer()} sx={{ width: '20%', alignSelf: 'center' }}>Submit</StyledButton>
                    <StyledButton variant='contained' onClick={() => setStartQuiz(false)} sx={{ width: '20%', alignSelf: 'center' }}>Back</StyledButton>
                </Stack>
            }
        </Box>
    )
}

export default Quiz
