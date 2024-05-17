import { useState } from "react";
import showToast from "../utils/toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const handleInputRegister = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const handlePostRegister = async (event) => {
        event.preventDefault();
        try {
            await axios({
                method: "post",
                url: import.meta.env.VITE_API_URL + `/users/register`,
                data: input,
            });
            console.log("Created");
            navigate("/login");
        } catch (error) {
            console.log(error);
            showToast(error.response.data.message);
        }
    };

    return (
        <>
            <div className="container">
                <div className="container mt-5">
                    <div classs="row">
                        <div className="col-md-5 mx-auto">
                            <h5 className="text-center">
                                Welcome, Please Register your Account
                            </h5>
                            <form onSubmit={handlePostRegister}>
                                <div className="mb-4">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Input Username..."
                                        name="username"
                                        value={input.username}
                                        onChange={handleInputRegister}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Example: user@email.com"
                                        name="email"
                                        value={input.email}
                                        onChange={handleInputRegister}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Example: MyPassword123"
                                        name="password"
                                        value={input.password}
                                        onChange={handleInputRegister}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter phone number...(optional)"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={handleInputRegister}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-4  rounded-4 w-100"
                                >
                                    Register
                                </button>
                                <p>
                                Already have an account ?
                                <Link to={"/login"}>Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
