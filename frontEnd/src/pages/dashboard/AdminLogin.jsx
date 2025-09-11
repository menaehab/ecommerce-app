import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../features/dashboard/auth/AdminAuthThunk';
import { setError } from '../../features/dashboard/auth/AdminAuthSlice'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminAuth = useSelector((state) => state.adminAuth);
  const errors = useSelector((state) => state.adminAuth.error);

  React.useEffect(() => {
    if (adminAuth.admin) {
      navigate("/dashboard");
    }
  }, [adminAuth, navigate]);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = React.useState(false);

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
    const result = await dispatch(loginAdmin(formData));
    if (result?.success) {
      navigate("/dashboard");
    }
    setLoading(false);

  };

  return (
    <Container className="my-6" maxWidth="xl">
      <Container 
        maxWidth="sm" 
        className="h-[calc(100vh-48px)] flex items-center justify-center"
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
              Dashboard Login
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
                  helperText={errors?.email ? errors?.email[0] : ""}
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
                  helperText={errors?.password ? errors?.password[0] : ""}
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
          </CardContent>
        </Card>
      </Container>
    </Container>
  )
}
