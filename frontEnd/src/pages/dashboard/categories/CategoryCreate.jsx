import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryThunk } from "../../../features/dashboard/categories/AdminCategoryThunk";
import { setError } from "../../../features/dashboard/categories/AdminCategorySlice";

export default function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const errors = useSelector((state) => state.category.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      dispatch(setError({ name: "Name is required" }));
      setLoading(false);
      return;
    }
    setLoading(true);
    const response = await dispatch(createCategoryThunk({ name }));
    if (response?.success) {
      setLoading(false);
      navigate("/dashboard/categories");
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-5xl mb-10 text-center font-bold">Create Category</h1>
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
            {loading ? "Loading..." : "Create"}
          </Button>
        </div>
      </form>
    </>
  );
}
