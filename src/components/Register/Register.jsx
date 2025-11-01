import { useContext, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../../contexts/AuthContext.jsx";

const Register = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const { setUser, createUser, updateUser } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;

        setSuccess("");
        setError("");

        createUser(email, password)
            .then((result) => {
                setUser(result.user);
                updateUser({
                    displayName: name, photoURL: photo
                })
                    .then(() => {
                        setSuccess("Registered successfully.");
                    })
                    .catch((error) => {
                        setError(error.message);
                    });
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <div className="hero min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <div className="text-center text-secondary">
                        <h1 className="text-[32px] font-semibold">Register now!</h1>
                        <p className="mt-2 mb-4">
                            Already have an account? <Link className="primary" to="/login">Login Now</Link>
                        </p>
                    </div>
                    <form onSubmit={handleRegister}>
                        <fieldset className="fieldset">
                            {/*name*/}
                            <label className="label text-secondary">Name</label>
                            <input name="name" type="text" className="input" placeholder="Your Name" />
                            {/*email*/}
                            <label className="label text-secondary">Email</label>
                            <input name="email" type="email" className="input" placeholder="Your Email" />
                            {/*photo*/}
                            <label className="label text-secondary">Image-URL</label>
                            <input name="photo" type="text" className="input" placeholder="Your Image URL" />
                            {/*password*/}
                            <label className="label text-secondary">Password</label>
                            <input name="password" type="password" className="input" placeholder="******" />
                            <div>
                                <a className="link link-hover text-secondary">Forgot password?</a>
                            </div>
                            <button className="btn bg-[linear-gradient(90deg,#632EE3_0%,#9F62F2_100%)] text-white font-semibold mt-4">Register</button>
                        </fieldset>
                    </form>
                    {
                        success && <p className="text-center text-green-500 text-semibold">{success}</p>
                    }
                    {
                        error && <p className="text-center text-red-500 text-semibold">{error}</p>
                    }
                    <div className="divider font-semibold text-secondary">OR</div>
                    {/* Google */}
                    <button className="btn bg-white text-secondary border-[#e5e5e5] font-semibold">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;