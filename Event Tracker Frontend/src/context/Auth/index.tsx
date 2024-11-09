import React, { createContext, useContext, useEffect, useState } from "react";
import { useModalState } from "../Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "@/Api";
import { Alert, LinearProgress, Snackbar } from "@mui/material";
import ConfirmModal from "@/modals/Confirmation";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (userData: LoginUserData) => void;
  logout: () => void;
  signup: (userData: SignUpUserData) => void;
  updateUser: (userData: UserData) => void;
  uploadPicture: (userProfile: File) => void;
  deleteUser: () => void;
  setErrorMessage: (message: string) => void;
  user: UserData | null;
}


interface UserData {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  idNumber?: string;
  password: string;
  userRole?: string;
  profilePicture?: string;
}

interface SignUpUserData {
  email: string;
  idNumber: string;
  password: string;
  confirmpassword: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { closeModal } = useModalState();
  const navigate = useNavigate();

  const setErrorMessage = (message: string) => {
    setAlertMessage(message);
    handleClick();
  };

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleConfirm = async () => {
    if (user) {
      try {
        await axios.delete(`${API_ENDPOINTS.DELETE_ACCOUNTBYID}${user.id}`);

        logout();
      } catch (error) {
        console.error(error);
      }
    }
    setConfirmModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUser(parsedUserData);

      axios
        .get(`${API_ENDPOINTS.GET_ACCOUNTBYID}?id=${parsedUserData.id}`)
        .then((response) => {
          const latestUserData = response.data;
          setUser(latestUserData);
        })
        .catch((error) => {
          console.error("Error fetching latest user data:", error);
        });
    }
  }, [setIsLoggedIn, setUser]);

  const login = async (userData: LoginUserData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, userData);

      const loggedInUser = response.data;
      if (loggedInUser) {
        setUser(loggedInUser);
        setIsLoggedIn(true);

        localStorage.setItem("userData", JSON.stringify(loggedInUser));
        
        closeModal();

        navigate("/dashboard");
      } else {
        setErrorMessage("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("activeComponent");
  };

  const signup = async (userData: SignUpUserData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userData.email)) {
      setErrorMessage("Invalid email address!");
      return;
    }
    
    

    try {
      const accountsResponse = await axios.get(API_ENDPOINTS.GET_ACCOUNTS);
      const existingAccounts = accountsResponse.data;

      const emailExists = existingAccounts.some(
        (account: any) => account.email === userData.email
      );

      if (emailExists) {
        setErrorMessage("Email is already in use!");
        return;
      }

      if (userData.password === null || userData.password.trim() === "") {
        setErrorMessage("Password shouldn't be empty!");
        return;
      }
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(userData.password)) {
        setErrorMessage(
          "Password requires at least 8+ characters, uppercase/lowercase mix, 1 special character required"
        );
        return;
      }

      if (userData.password === userData.confirmpassword) {
        try {
          const response = await axios.post(
            API_ENDPOINTS.CREATE_ACCOUNT,
            userData
          );
          const newUser = response.data;

          login({
            email: newUser.email,
            password: newUser.password,
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        setErrorMessage("Passwords do not match!");
      }
    } catch (error) {
      console.error("Error fetching existing accounts:", error);
    }
  };

  const updateUser = async (userData: UserData) => {
    if (user) {
      try {
        const response = await axios.put(
          `${API_ENDPOINTS.UPDATE_ACCOUNT}?id=${user.id}`,
          userData
        );

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const uploadPicture = async (userProfile: File) => {
    if (user) {
      try {
        const formData = new FormData();
        formData.append("id", String(user.id));
        formData.append("file", userProfile);

        await axios.post(API_ENDPOINTS.UPLOAD_PROFILE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const response = await axios.get(
          `${API_ENDPOINTS.GET_ACCOUNTBYID}?id=${user.id}`
        );
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem("userData", JSON.stringify(updatedUser));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteUser = () => {
    setConfirmModalOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const [alertKey, setAlertKey] = React.useState<number | null>(null);
  const handleClick = () => {
    setOpen(true);
    setAlertKey(Date.now());
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        signup,
        updateUser,
        uploadPicture,
        deleteUser,
        setErrorMessage,
        user,
      }}
    >
      {children}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message="Are you sure you want to delete account?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Snackbar
        key={alertKey}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </div>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


