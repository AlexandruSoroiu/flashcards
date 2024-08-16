'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles'


const theme = createTheme({
  typography: {
    fontFamily: 'Kanit:ital',
    fontWeightLight: 200,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#A9A9A9'
    }
  }
})


export default function Home() {
  const router = useRouter()

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'https://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

  const handleGetStartedClick = () => {
    router.push('/generate')
  }

  return (
    <ThemeProvider theme={theme} >
      <Container maxWidth="100vw"
      >
        <Head>
          <title>Flashcard SaaS</title>
          <meta name="description" content="Create flashcards from your text" />
        </Head>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" fontWeightBold style={{ flexGrow: 1 }}>
              Flashcard SaaS
            </Typography>
            <SignedOut>
              <Button color="inherit" fontWeightBold href="/sign-in">
                {''}
                Log In
              </Button>
              <Button color="inherit" fontWeightBold href="sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            textAlign: 'center',
            my: 4,
          }}
        >
          <Typography variant="h2" fontFamily='Kanit:ital' fontWeight={700} gutterBottom>CleverCards AI</Typography>
          <Typography variant="h5" fontWeight={300} gutterBottom>
            {''}
            Smart Flashcards for Smart Learning
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fontWeight='200'
            sx={{ mt: 2 }}
            onClick={handleGetStartedClick}
          >
            Get started
          </Button>
        </Box>
        <Box sx={{ my: 6 }}>
          <Typography textAlign="center" variant="h4" gutterBottom>Features</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ border: '1px solid #000000', borderRadius: 2, padding: 2, alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
                <Typography fontWeight='300'>
                  {''}
                  Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ border: '1px solid #000000', borderRadius: 2, padding: 2, alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom >Smart Flashcards</Typography>
                <Typography fontWeight='300'>
                  {''}
                  Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ border: '1px solid #000000', borderRadius: 2, padding: 2, alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom >Accessible Anywhere</Typography>
                <Typography fontWeight='300'>
                  {''}
                  Access your flashcards from any device, at any time. Study on the go with ease.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>Pricing</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                bgcolor: 'secondary.main'
              }}
              >
                <Typography variant="h5" gutterBottom>Basic</Typography>
                <Typography variant="h6" gutterBottom>$5 / month</Typography>
                <Typography>
                  {''}
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                bgcolor: 'secondary.main'
              }}
              >
                <Typography variant="h5" gutterBottom>Pro</Typography>
                <Typography variant="h6" gutterBottom>$10 / month</Typography>
                <Typography>
                  {''}
                  Unlimited flashcards and storage, with priority support.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Choose Pro</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

