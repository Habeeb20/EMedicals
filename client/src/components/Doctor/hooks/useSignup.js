import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const handleInputErrors = ({ username, email, password, confirmPassword }) => {
  if (!username || !email || !password || !confirmPassword) {
    toast.error("Please fill all the fields");
    return true;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return true;
  }

  return false;
};

const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ username, email, password, confirmPassword, profilePicture }) => {
    const checkError = handleInputErrors({
      username,
      email,
      password,
      confirmPassword,
    });

    if (checkError) return;

    try {
      setLoading(true);

      // Use FormData for file uploads
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      
      // Ensure profilePicture is a file, not a URL or undefined
      if (profilePicture instanceof File) {
        formData.append("profilePicture", profilePicture);
      } else {
        throw new Error("Profile picture is not a valid file");
      }

      const res = await fetch(`${import.meta.env.VITE_API_DC}/auth/signup`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await res.json();
      
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Signup successful!");
      navigate("/chatsignup");
    } catch (error) {
      toast.error(error.message);
      // Redirect after showing the error if required
      navigate("/chatsignup");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
