import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { CardBox } from '../StyledComponents/CardBox'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { StyledIconButton } from '../StyledComponents/StyledIconButton';

function WordCard({ word, onClick, isClicked }) {
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    return (
        <CardBox onClick={onClick} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction='row' spacing={5}>
                <Typography variant='h5' color='primary'>{word.word}</Typography>
                <Typography variant='h5'>:</Typography>
                <Typography variant='h5'>{word.definition}</Typography>
                {
                    isClicked &&
                    <Stack direction='row' spacing={2} sx={{ float: 'right' }}>
                        <StyledIconButton onClick={(event) => { event.stopPropagation(); }} >
                            <CheckCircleIcon color='primary' />
                        </StyledIconButton>
                        <StyledIconButton onClick={(event) => {
                            event.stopPropagation()
                            openInNewTab('https://www.google.com/search?q=' + word.word + '+meaning')
                        }} >
                            <InfoIcon color='primary' />
                        </StyledIconButton>
                        <StyledIconButton onClick={(event) => { event.stopPropagation(); }} >
                            <RemoveCircleIcon color='primary' />
                        </StyledIconButton>
                    </Stack>
                }
            </Stack>
        </CardBox>
    )
}

export default WordCard