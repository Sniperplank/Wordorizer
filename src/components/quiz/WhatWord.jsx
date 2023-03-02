import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { StyledInput } from '../../StyledComponents/StyledInput'

function WhatWord({ word, onWordCorrectnessChange, submitAnswer }) {
    const [inputValue, setInputValue] = useState('')
    const [isCorrect, setIsCorrect] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setIsCorrect(event.target.value === word.word);
        onWordCorrectnessChange(event.target.value === word.word);
    }

    return (
        <Stack spacing={10}>
            <Typography variant='h5'>What word is defined as follows?</Typography>
            <Stack direction='row' sx={{ alignSelf: 'center' }}>
                <StyledInput variant='outlined' type='text' autoFocus value={inputValue} onChange={handleInputChange} onKeyDown={submitAnswer} inputProps={{ style: { fontSize: 20 }, autoComplete: 'off' }} />
                <Typography variant='h4'>:{word.definition}</Typography>
            </Stack>
        </Stack>
    )
}

export default WhatWord