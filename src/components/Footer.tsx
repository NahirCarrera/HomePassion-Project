// src/components/Footer.js
import React from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#333',
                color: '#fff',
                py: 4,
                mt: 8,
                textAlign: 'center',
            }}
        >
            <Container maxWidth="md">
                <Typography variant="body1" sx={{ mb: 2 }}>
                    &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <IconButton
                        component="a"
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        component="a"
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                    >
                        <TwitterIcon />
                    </IconButton>
                    <IconButton
                        component="a"
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                    >
                        <InstagramIcon />
                    </IconButton>
                    <IconButton
                        component="a"
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
