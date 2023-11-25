import { Box, TextField, Typography, Paper } from '@mui/material'
import React, { useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(
        `${apiURL}/api/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      if (data.ok) {
        navigate('/')
      } else {
        console.log(data)
        console.log('somthing went wrong')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Paper
        sx={{
          marginTop: 3,
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          padding: 3,
          height: 'fit-content',
        }}
      >
        <Typography variant="h4">Log In Here:</Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onInput={(ev: React.FormEvent<HTMLDivElement>) => {
              const { target } = ev
              setEmail((target as HTMLInputElement).value)
            }}
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            onInput={(ev: React.FormEvent<HTMLDivElement>) => {
              const { target } = ev
              setPassword((target as HTMLInputElement).value)
            }}
          />
          <Button type="submit">LOG IN</Button>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
