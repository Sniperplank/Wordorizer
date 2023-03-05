import { Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useAuth } from '../contexts/AuthContext'
import { ModalContent } from '../StyledComponents/ModalContent'
import { ModalOverlay } from '../StyledComponents/ModalOverlay'
import { StyledInput } from '../StyledComponents/StyledInput'

function NewWordModal({ open, onClose, update }) {
    const { user } = useAuth()
    const [wordData, setWordData] = useState({ word: '', definition: '', userId: user?.result._id })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const addWord = async () => {
        try {
            await axios.post('https://wordorizor-api.vercel.app/word', wordData)
            setError('')
            setSuccess('Word added')
            update()
        } catch (error) {
            console.log(error)
            setSuccess('')
            setError(error.response.data.message)
        }
    }

    const handleChange = (e) => {
        setWordData({ ...wordData, [e.target.name]: e.target.value })
    }

    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContent sx={{ width: '50%' }}>
                <Typography variant='h4'>New Word</Typography>
                <Stack spacing={3} direction='row' marginTop={2} marginBottom={2}>
                    <StyledInput variant='outlined' name='word' label='Word' onChange={handleChange} inputProps={{ autoComplete: 'off' }} sx={{ width: '20%' }} />
                    <StyledInput variant='outlined' name='definition' label='Definition' onChange={handleChange} inputProps={{ autoComplete: 'off' }} sx={{ width: '80%' }} />
                </Stack>
                <Stack direction='row' spacing={2} marginTop={3} justifyContent='right'>
                    <Button variant='contained' color='primary' onClick={() => {
                        addWord()
                    }}>Add</Button>
                    <Button variant='contained' color='error' onClick={() => {
                        onClose()
                        setSuccess('')
                        setError('')
                    }}>Close</Button>
                </Stack>
                <Typography variant='h6' color='green'>{success}</Typography>
                <Typography variant='h6' color='error'>{error}</Typography>
            </ModalContent>
        </>,
        document.getElementById('portal')
    )
}

export default NewWordModal