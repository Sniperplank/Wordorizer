import { Stack, Typography } from '@mui/material'
import React from 'react'
import { CardBox } from '../StyledComponents/CardBox'

function WordCard({ word }) {
    return (
        <CardBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction='row' spacing={5}>
                <Typography variant='h5' color='primary'>{word.word}</Typography>
                <Typography variant='h5'>:</Typography>
                <Typography variant='h5'>{word.definition}</Typography>
            </Stack>
        </CardBox>
    )
}

export default WordCard