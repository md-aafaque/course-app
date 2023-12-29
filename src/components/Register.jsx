import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../config.js";
import { userState } from "../store/atoms/user.js";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    const newRegister = () => {
        axios
            .post(`${BASE_URL}/admin/signup`, {
                username: email,
                password: password,
            })
            .then((response) => {
                setEmail("");
                setPassword("");
                localStorage.setItem("token", response.data.token);
                setUser({
                    userEmail: email,
                    isLoading: false,
                });
                useNavigate("/courses");
            });
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "#eeeeee",
                paddingTop: "20vh",
            }}
        >
            <center>
                <Typography variant="h5">
                    Welcome to COURZERO! Sign up here.
                </Typography>
                <br />
                <Card variant="outlined" style={{ width: 400, padding: "2%" }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type={"text"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type={"text"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button variant="contained" onClick={newRegister}>
                        Register
                    </Button>
                    <br />
                    <br />
                    <Typography fontSize={"caption"} variant="h6">
                        Already a user? <a href="/login">Login</a>
                    </Typography>
                </Card>
            </center>
        </div>
    );
}

export default Register;
