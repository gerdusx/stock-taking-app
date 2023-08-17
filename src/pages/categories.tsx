import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { Box, Button, Divider, Drawer, Fab, IconButton, SwipeableDrawer, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { tokens } from '@/theme';
import { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import { Formik } from 'formik';
import * as yup from "yup";
import { CategoryCreateRequest, createCategory, getCategories } from '@/services/categoryService';
import { ICategory } from '../../models/category';

const inter = Inter({ subsets: ['latin'] })

export default function Categories() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const initialValues: CategoryCreateRequest = {
        name: "",
    };

    useEffect(() => {
        (async () => {
            setCategories(await getCategories());
        })();
    }, []);

    useEffect(() => {
        console.log("categories", categories);
    }, [categories])

    const checkoutSchema = yup.object().shape({
        name: yup.string().required("This field is required"),
    });

    const handleFormSubmit = async (category: CategoryCreateRequest) => {
        console.log(category);
        const results = await createCategory(category);
        console.log("results", results);
        setIsPanelOpen(false);
        setCategories(await getCategories());
    };

    return (
        <>
            <Box m="20px">
                <Box>
                    <Header title='Categories' />
                    <Button color="secondary" startIcon={<AddIcon />} variant='outlined' size='small' onClick={() => setIsPanelOpen(true)}>
                        Add
                    </Button>
                </Box>

            </Box>
            <Drawer
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "24%" },
                }}
                anchor={'right'}
                open={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
            >

                <Toolbar sx={{ justifyContent: 'space-between', display: "flex", alignItems: "center" }}>
                    <Typography variant='h4' color={colors.grey[100]} fontWeight="bold">Add Category</Typography>
                    <IconButton onClick={() => setIsPanelOpen(false)}>
                        <Close />
                    </IconButton>
                </Toolbar>

                <Divider />

                <Box m="20px">
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Category name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained">
                                        Create Category
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Drawer>
        </>
    )
}
