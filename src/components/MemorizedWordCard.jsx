import { Stack, Typography } from '@mui/material'
import React from 'react'
import { CardBox } from '../StyledComponents/CardBox'
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { StyledIconButton } from '../StyledComponents/StyledIconButton';
import axios from 'axios';

function MemorizedWordCard({ word, onClick, isClicked, update }) {
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const deleteWord = async () => {
        await axios.delete('http://localhost:5000/word/memorized/' + word._id)
        update()
    }
    return (
        <CardBox onClick={onClick} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction='row' spacing={5}>
                <Typography variant='h5' color='primary'>{word.word}</Typography>
                <Typography variant='h5'>:</Typography>
                <Typography variant='h5'>{word.definition}</Typography>
                {
                    isClicked &&
                    <Stack direction='row' spacing={2}>
                        <StyledIconButton onClick={(event) => {
                            event.stopPropagation()
                            openInNewTab('https://www.google.com/search?q=' + word.word + '+meaning')
                        }} >
                            <InfoIcon color='primary' />
                        </StyledIconButton>
                        <StyledIconButton onClick={(event) => {
                            event.stopPropagation()
                            deleteWord()
                        }} >
                            <RemoveCircleIcon color='primary' />
                        </StyledIconButton>
                    </Stack>
                }
            </Stack>
        </CardBox>
    )
}

export default MemorizedWordCard