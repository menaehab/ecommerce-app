import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryThunk } from "../../../features/dashboard/categories/AdminCategoryThunk";
import { setError } from "../../../features/dashboard/categories/AdminCategorySlice";
import { useParams } from "react-router-dom";
import { fetchCategoryThunk } from "../../../features/dashboard/categories/AdminCategoryThunk";

export default function CategoryUpdate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const errors = useSelector((state) => state.category.error);
  const category = useSelector((state) => state.category.category);
  const [name, setName] = React.useState('');
  const params = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategoryThunk(params.slug));
    };

    fetchData();
  }, [dispatch, params.slug]);

  React.useEffect(() => {
    if (category?.name) {
      setName(category.name || "");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      dispatch(setError({ name: "Name is required" }));
      return;
    }
    
    setLoading(true);
    const response = await dispatch(updateCategoryThunk({ 
      slug: params.slug,
      name: name 
    }));
    
    setLoading(false);
    
    if (response?.success) {
      navigate("/dashboard/categories");
    }
  };

  return (
    <>
      <h1 className="text-5xl mb-10 text-center font-bold">Update Category</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            size="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ shrink: true }} 
            error={Boolean(errors?.name)}
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& fieldset": {
                  borderColor: errors?.name ? "#d32f2f" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: errors?.name ? "#d32f2f" : "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors?.name ? "#d32f2f" : "#1976d2",
                  borderWidth: "2px",
                },
              },
            }}
          />
          {errors?.name && (
            <p
              style={{
                color: "#d32f2f",
                marginTop: "6px",
                fontSize: "0.85rem",
              }}
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => navigate("/dashboard/categories")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Loading..." : "Update"}
          </Button>
        </div>
      </form>
    </>
  );
}
