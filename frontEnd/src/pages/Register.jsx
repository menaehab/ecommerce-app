import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function Register() {
  return (
    <Container className="my-6" maxWidth="xl">
      <Breadcrumb paths={[]} pageName="Register" />

      <Container 
        maxWidth="sm" 
        className="h-[calc(100vh-140px)] flex items-center justify-center"
      >
        <Card 
          elevation={4} 
          className="w-full rounded-3xl shadow-lg"
          sx={{ backgroundColor: "#f9fafb" }} 
        >
          <CardContent className="px-6 py-8">
            <Typography 
              variant="h4" 
              align="center" 
              gutterBottom 
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Create Account
            </Typography>
            <Typography 
              variant="body2" 
              align="center" 
              color="text.secondary" 
              gutterBottom
            >
              Please fill in the form to register
            </Typography>

            <form>
              <Stack spacing={2.5} mt={3}>
                <TextField
                  label="Full Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  sx={{ borderRadius: "12px", py: 1.2, fontWeight: "bold" }}
                >
                  Register
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Container>
  )
}
