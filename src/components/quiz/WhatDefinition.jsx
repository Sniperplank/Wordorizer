import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { StyledInput } from '../../StyledComponents/StyledInput'

function WhatDefinition({ word, onDefinitionInputChange, submitAnswer }) {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onDefinitionInputChange(event.target.value);
    }
    return (
        <Stack spacing={10}>
            <Typography variant='h5'>What is the definition of the following word?</Typography>
            <Stack direction='row' spacing={3} sx={{ width: '100%', alignSelf: 'center' }}>
                <Typography variant='h4'>{word.word} :</Typography>
                <StyledInput variant='outlined' type='text' sx={{ width: '70%' }} autoFocus value={inputValue} onChange={handleInputChange} onKeyDown={submitAnswer} inputProps={{ style: { fontSize: 20 }, autoComplete: 'off' }} />
            </Stack>
        </Stack>
    )
}

export default WhatDefinition