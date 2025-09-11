import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteModal from "../../../components/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesThunk } from "../../../features/dashboard/categories/AdminCategoryThunk";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import { deleteCategoryThunk } from "../../../features/dashboard/categories/AdminCategoryThunk";

const columns = [
  { id: "index", label: "#", minWidth: 50, align: "left" },
  { id: "name", label: "Name", minWidth: 170, align: "left" },
  {
    id: "actions",
    label: "Actions",
    minWidth: 150,
    align: "center",
  },
];

export default function CategoryHome() {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.categories);
  const pagination = useSelector((state) => state.category.pagination);

  const handleChangePage = (event, newPage) => {
    dispatch(fetchCategoriesThunk(newPage + 1));
  };

  const handleDelete = (categoryData) => {
    dispatch(deleteCategoryThunk(categoryData));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategoriesThunk());
    };

    fetchData();
  }, [dispatch]);

  const handleOpen = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        record={selectedCategory}
        label="Category"
        onDelete={handleDelete}
      />

      <h1 className="text-5xl mb-10 text-center font-bold">Categories</h1>
      <Button to="create" component={RouterLink} sx={{ mb: 2 }} variant="contained">
        Add Category
      </Button>
      <Paper sx={{ width: "100%", overflow: "hidden"}}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((row, index) => (
                <TableRow hover tabIndex={-1} key={row.slug}>
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                          >
                            <Button
                              variant="contained"
                              size="small"
                              color="warning"
                              onClick={() => navigate(`/dashboard/categories/update/${row.slug}`)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              color="error"
                              onClick={() => handleOpen(row)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      );
                    }

                    if (column.id === "index") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {index + 1}
                        </TableCell>
                      );
                    }

                    if (column.id === "name") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {row.name}
                        </TableCell>
                      );
                    }

                    return null;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.current_page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.per_page}
          rowsPerPageOptions={[pagination.per_page]}
        />
      </Paper>
    </>
  );
}
