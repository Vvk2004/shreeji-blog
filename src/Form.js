import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link, Paper } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const [heading, setHeading] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("heading", heading);
        formData.append("thumbnail-url", thumbnail);

        axios.post("https://shreeji-be.onrender.com/api/blog", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => console.log(err));
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, maxWidth: 700, width: '100%' }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 600, textAlign: 'center', mb: 2 }}>
                        Create New Blog
                    </Typography>

                    {/* File Upload Section */}
                    <Box
                        sx={{
                            border: "2px dashed #ddd",
                            borderRadius: "8px",
                            padding: 4,
                            textAlign: "center",
                            bgcolor: "#fafafa",
                            transition: "all 0.3s",
                            "&:hover": {
                                borderColor: "#7b61ff",
                                bgcolor: "#f4f1ff",
                            }
                        }}
                    >
                        <Button
                            variant="contained"
                            component="label"
                            sx={{
                                textTransform: "none",
                                backgroundColor: "#7b61ff",
                                fontSize: "16px",
                                padding: "10px 20px",
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <CloudUploadIcon />
                            Upload Thumbnail
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>
                        <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                            Max file size 1GB. <Link href="#" underline="hover">Sign Up</Link> for more.
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            By proceeding, you agree to our <Link href="#" underline="hover">Terms of Use</Link>.
                        </Typography>
                    </Box>

                    {/* Thumbnail Preview */}
                    {thumbnailPreview && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                            <Box
                                component="img"
                                src={thumbnailPreview}
                                alt="Thumbnail Preview"
                                sx={{
                                    width: "50%",
                                    height: "auto",
                                    borderRadius: 2,
                                    boxShadow: 1,
                                }}
                            />
                        </Box>
                    )}

                    {/* Heading Input */}
                    <TextField
                        label="Blog Heading"
                        variant="outlined"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        fullWidth
                        required
                        InputLabelProps={{
                            sx: {
                                fontSize: 18,
                                fontWeight: 500,
                            }
                        }}
                        inputProps={{
                            sx: {
                                padding: 2,
                            }
                        }}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            padding: "12px 0",
                            fontSize: 18,
                            fontWeight: "bold",
                            textTransform: "none",
                            backgroundColor: "#7b61ff",
                            "&:hover": {
                                backgroundColor: "#634de2",
                            }
                        }}
                    >
                        Publish Blog
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Form;
