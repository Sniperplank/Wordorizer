import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.main,
    '&:hover': {
        color: theme.palette.primary.main,
    },
    fontWeight: 'bold',
}));