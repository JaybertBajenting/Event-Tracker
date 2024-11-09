import { useAuth } from "@/context/Auth";
import PersonIcon from "@mui/icons-material/Person";
import { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ProfileCamera from "@/assets/upload_profile.svg";
import { Avatar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmModal from "@/modals/Confirmation";

const Profile = () => {
  const { user, updateUser, uploadPicture, setErrorMessage } = useAuth();

  const [updateFormData, setUpdateFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    idNumber: user?.idNumber || "",
    password: user?.password || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [uploadProfileClicked, setUploadProfileClicked] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState<
    string | undefined
  >(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleupdateFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target instanceof FileReader) {
        const dataURL = event.target.result as string;
        setUserProfilePicture(dataURL);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const uploadProfilePicture = () => {
    if (selectedFile) {
      uploadPicture(selectedFile);
      setUploadProfileClicked(false);
    } else {
      alert("Please set a picture before uploading!");
    }
  };

  const { firstName, lastName, email, idNumber, password } = updateFormData;
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleUpdateUser = () => {
    if (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      idNumber.trim() &&
      password.trim()
    ) {
      setConfirmModalOpen(true);
    } else {
      setErrorMessage("Some fields are blank!");
    }
  };
  const handleConfirm = () => {
    const formDataToUpdate = {
      firstName,
      lastName,
      email,
      idNumber,
      password,
    };
    updateUser(formDataToUpdate);
    setConfirmModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center  px-[4rem] py-[4rem]  ">
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message="Are you sure you want to update?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <div className=" w-full">
        <h1 className="text-[50px] font-medium text-neutral-700"> Profile </h1>
      </div>
      <div className="h-[300px] w-[100%] rounded-[10px] bg-maroon" />
      <div className="relative">
        <div
          onClick={() => setUploadProfileClicked(true)}
          className="-mt-[67.5px] flex h-[135px] w-[135px] cursor-pointer items-center justify-center rounded-[50%]"
        >
          <Avatar
            sx={{
              width: 135,
              height: 135,
              overflow: "hidden",
              position: "relative",
            }}
            className="border-4 border-white"
          >
            {user?.profilePicture === null ? (
              <PersonIcon
                sx={{
                  color: "gray",
                  width: "100%",
                  height: "100%",
                  objectFit: "scale-down",
                }}
              />
            ) : (
              <img
                src={`data:image;base64,${user?.profilePicture}`}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "scale-down",
                }}
              />
            )}
          </Avatar>
        </div>
        <div className=" absolute top-2 -right-3 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[50%] bg-gold ">
          <img
            src={ProfileCamera}
            onClick={() => setUploadProfileClicked(true)}
          />
        </div>
      </div>
      <div className="mt-10 mb-10 flex flex-col items-center">
        <p className="text-[15px] font-semibold text-zinc-600">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-xs text-zinc-600 text-opacity-80">{user?.email}</p>
      </div>

      <div className="relative flex h-[600px] w-[80%]">
        <div className="flex flex-1 flex-col gap-10 rounded-[10px] bg-white p-[40px] shadow">
          <div className="mb-10 text-[27px] font-medium text-neutral-700">
            Profile Information
          </div>
          <div className="flex w-[100%] flex-1 flex-col">
            <div className="grid flex-1 grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <p className="text-xl text-neutral-700 text-opacity-70 ">
                  First Name
                </p>
                <input
                  name="firstName"
                  value={updateFormData.firstName}
                  onChange={handleupdateFormChange}
                  className="h-[62.87px] max-w-[500px] rounded-md border border-zinc-600 border-opacity-70 indent-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl text-neutral-700 text-opacity-70 ">
                  Last Name
                </p>
                <input
                  name="lastName"
                  value={updateFormData.lastName}
                  onChange={handleupdateFormChange}
                  className="h-[62.87px] max-w-[500px] rounded-md border border-zinc-600 border-opacity-70 indent-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl text-neutral-700 text-opacity-70 ">
                  Username/Email address
                </p>
                <input
                  name="email"
                  value={updateFormData.email}
                  onChange={handleupdateFormChange}
                  className="h-[62.87px] max-w-[500px] rounded-md border border-zinc-600 border-opacity-70 indent-3 text-neutral-700"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl text-neutral-700 text-opacity-70 ">
                  Password
                </p>
                <div style={{ position: "relative" }} className="max-w-[500px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={updateFormData.password}
                    onChange={handleupdateFormChange}
                    className="h-[62.87px] w-full rounded-md border border-zinc-600 border-opacity-70 indent-3"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      zIndex: "1",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl  text-neutral-700 text-opacity-70 ">
                  Id Number
                </p>
                <input
                  name="idNumber"
                  value={updateFormData.idNumber}
                  onChange={handleupdateFormChange}
                  className="h-[62.87px] max-w-[500px] rounded-md border border-zinc-600 border-opacity-70 indent-3"
                />
              </div>
            </div>
            <div className=" self-end ">
              <button
                onClick={handleUpdateUser}
                className="box-border rounded-md bg-maroon px-[37px] py-[11px] text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {uploadProfileClicked && (
        <div className="absolute top-1/2 flex max-h-[80%] min-h-[500px] min-w-[500px] max-w-[80%] -translate-y-1/2 transform flex-col gap-4 border-4 border-black bg-white p-10 ">
          <div className="flex justify-end">
            <CloseIcon
              sx={{ fontSize: "32px" }}
              className="cursor-pointer"
              onClick={() => {
                setUploadProfileClicked(false),
                  setSelectedFile(null),
                  setUserProfilePicture(undefined);
              }}
            />
          </div>
          <h1 className="text-[30px] font-bold">Upload Profile</h1>
          <div className="relative">
            <img
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              src={userProfilePicture}
              className=" max-h-[500px] min-h-[250px]  min-w-[400px]   max-w-[500px] cursor-pointer shadow-2xl"
              onClick={handleImageClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {!userProfilePicture && (
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                <p className="text-gray-600">
                  Drag and drop picture or click to upload
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              style={{
                marginTop: "30px",
                textTransform: "none",
                textDecorationColor: "none",
                backgroundColor: "#A83332",
                color: "white",
                fontFamily: "Inter",
                borderRadius: "10px",
                opacity: 0.9,
              }}
              onClick={uploadProfilePicture}
            >
              Upload
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
