import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';

export default function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        setAnchorEl(null);
        window.location.href = '/account/login';
    }

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={
                        {
                                color: 'black',                           
                        }
                }
            >
                <PersonOutlineIcon color="black" size="large" sx={{ width: '35px'}}/>
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleLogin}>
                    <LockOpenIcon sx={{ mr: 1 }} />
                    Login
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ReceiptIcon sx={{ mr: 1 }} />
                    Manage Order
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <HistoryIcon sx={{ mr: 1 }} />
                    Transaction History
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <MonetizationOnIcon sx={{ mr: 1 }} />
                    Wallet
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <SettingsIcon sx={{ mr: 1 }} />
                    Account Setting
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <HelpIcon sx={{ mr: 1 }} />
                    Help
                </MenuItem>
            </Menu>
        </div>
    );
}