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
import { registerUser } from '../../features/store/auth/UserAuthThunk';
import { setError } from '../../features/store/auth/UserAuthSlice'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.userAuth.error);
  const user = useSelector((state) => state.userAuth.user);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user,navigate]);


  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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
    if (formData.password !== formData.password_confirmation) {
      dispatch(setError({ password_confirmation: "Passwords do not match" }));
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      dispatch(setError({ password: "Password must be at least 8 characters" }));
      setLoading(false);
      return;
    }
    if (!formData.email.includes("@")) {
      dispatch(setError({ email: "Email must be a valid email address" }));
      setLoading(false);
      return;
    }
    if (formData.name.length < 3) {
      dispatch(setError({ name: "Name must be at least 3 characters" }));
      setLoading(false);
      return;
    }
    if (formData.name.length > 255) {
      dispatch(setError({ name: "Name must be at most 255 characters" }));
      setLoading(false);
      return;
    }
    if (formData.email.length > 255) {
      dispatch(setError({ email: "Email must be at most 255 characters" }));
      setLoading(false);
      return;
    }
    if (formData.password.length > 255) {
      dispatch(setError({ password: "Password must be at most 255 characters" }));
      setLoading(false);
      return;
    }
    if (formData.password_confirmation.length > 255) {
      dispatch(setError({ password_confirmation: "Password confirmation must be at most 255 characters" }));
      setLoading(false);
      return;
    }
    await dispatch(registerUser(formData));
    setLoading(false);
  };
  return (
    <Container className="my-6" maxWidth="xl">
      {/* <Breadcrumb paths={[]} pageName="Register" /> */}

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
            <form onSubmit={handleSubmit}>
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
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  error={!!errors?.name}
                  helperText={errors?.name ? errors?.name[0] : ""}
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
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  error={!!errors?.email}
                  helperText={errors?.email ? errors?.email[0] : ""}
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
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  error={!!errors?.password}
                  helperText={errors?.password ? errors?.password[0] : ""}
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
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  name="password_confirmation"
                  error={!!errors?.password_confirmation}
                  helperText={errors?.password_confirmation ? errors?.password_confirmation[0] : ""}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  sx={{ borderRadius: "12px", py: 1.2, fontWeight: "bold" }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Register"}
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
              Don't have an account? <Link color='primary' underline='hover' component={RouterLink} to="/login">Login</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Container>
  )
}
