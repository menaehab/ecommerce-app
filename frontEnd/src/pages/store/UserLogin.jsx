import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/store/auth/UserAuthThunk';
import { setError } from '../../features/store/auth/UserAuthSlice'
import { useNavigate } from 'react-router-dom'

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userAuth.user);
  const errors = useSelector((state) => state.userAuth.error);

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user,navigate]);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setError(null));
    if (!formData.email.includes("@")) {
      dispatch(setError({ email: "Email must be a valid email address" }));
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      dispatch(setError({ password: "Password must be at least 8 characters" }));
      setLoading(false);
      return;
    }
    const result = await dispatch(loginUser(formData));
    if (result?.success) {
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <Container className="my-6" maxWidth="xl">
      {/* <Breadcrumb paths={[]} pageName="Login" /> */}

      <Container 
        maxWidth="sm" 
        className="h-[calc(100vh-173px)] flex items-center justify-center"
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
              Login
            </Typography>
            <Typography 
              variant="body2" 
              align="center" 
              color="text.secondary" 
              gutterBottom
            >
              Please fill in the form to login
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5} mt={3}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors?.email}
                  helperText={errors?.email}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors?.password}
                  helperText={errors?.password}
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
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </Stack>
            </form>
            <Typography 
              variant="body2" 
              align="center" 
              color="text.secondary" 
              gutterBottom
              sx={{ mt: 2 }}
            >
              Do have an account? <Link color='primary' underline='hover' component={RouterLink} to="/register">Register</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Container>
  )
}
