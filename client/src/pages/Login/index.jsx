import { Box, TextField, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { login } from "../../api/user/auth/login";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";


const Login = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if(formData.email !== "" || formData.password !== "") {
                const response = await login(formData);
                if(response.status === 200) {
                    Cookies.set("accessToken", response.data?.token);
                    localStorage.setItem("user", JSON.stringify(response.data?.profile));
                    navigate(`/profile/${response.data?.profile.user_id}`);
                }
            }
        } catch (error) {
            console.error("Error logging in: ", error);
        }
        setLoading(false);
    }

    return (
        <>
            <Box className={styles.loginContainer}>
                <Box className={styles.loginForm}>
                    <Typography variant="h1">Login</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            type="text" 
                            placeholder="Email" 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <TextField 
                            type="password" 
                            placeholder="Password"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <Button type="submit" loading={loading}>Login</Button>
                    </form>
                </Box>
            </Box>
        </>
    );
}

export default Login;