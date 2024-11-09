import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/Api";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Pencil from "@/assets/pencil.svg";
import ConfirmModal from "@/modals/Confirmation";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  idNumber?: string;
  password: string;
  userRole?: string;
  profilePicture?: string;
}

const UserTable: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [IsPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const paginate = (pageNumber: number) => {
    const totalPages = Math.ceil(userData.length / usersPerPage);

    const newPageNumber = Math.min(Math.max(pageNumber, 1), totalPages);

    setCurrentPage(newPageNumber);
  };
  const [modalPurpose, setmodalPurpose] = useState("");

  const organizerRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      organizerRef.current &&
      !organizerRef.current.contains(target) &&
      !(target as Element)?.classList.contains("edit-button")
    ) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    paginate(currentPage);
  }, [userData, searchQuery]);

  useEffect(() => {
    if (IsPopupOpen) {
      document.addEventListener("click", handleDocumentClick);
    }
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [IsPopupOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_ACCOUNTS);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sortedData = [...userData].sort((a, b) => {
      const roleComparison = (a.userRole || "").localeCompare(b.userRole || "");
      if (roleComparison === 0) {
        return (a.firstName || "").localeCompare(b.firstName || "");
      }
      return roleComparison;
    });

    if (!arraysAreEqual(sortedData, userData)) {
      setUserData(sortedData);
    }
  }, [userData]);

  const arraysAreEqual = (arr1: any[], arr2: any[]) =>
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index]);

  const handleEdit = (id: number) => {
    setIsPopupOpen(true);
    setSelectedUserId(id);
  };
  const handleDelete = async (
    id: number,
    firstName: String,
    lastName: String
  ) => {
    setmodalPurpose("Delete");
    setUpdateRoleMessage(
      `Are you sure you want to delete ${firstName} ${lastName}'s account?`
    );
    setSelectedUserId(id);
    setConfirmModalOpen(true);
  };
  const toStudentClicked = async (
    id: number,
    firstName: String,
    lastName: String
  ) => {
    setmodalPurpose("Organizer");
    setUpdateRoleMessage(
      `Are you sure you want to make ${firstName} ${lastName} a Student?`
    );
    setSelectedUserId(id);
    setIsPopupOpen(false);
    setConfirmModalOpen(true);
  };

  const toOrganizerClicked = async (
    id: number,
    firstName: String,
    lastName: String
  ) => {
    setmodalPurpose("Student");
    setUpdateRoleMessage(
      `Are you sure you want to make ${firstName} ${lastName} an Organizer?`
    );
    setSelectedUserId(id);
    setIsPopupOpen(false);
    setConfirmModalOpen(true);
  };

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [updateRoleMessage, setUpdateRoleMessage] = useState("");

  const handleConfirm = async (
    id: number | undefined,
    modalPurpose: string
  ) => {
    console.log();
    if (modalPurpose === "Student") {
      try {
        await axios.put(
          `${API_ENDPOINTS.UPDATE_ROLEBYID}?id=${id}&userRole=Organizer`
        );
        setUserData((prevData) =>
          prevData.map((user) =>
            user.id === id ? { ...user, userRole: "Organizer" } : user
          )
        );
        setConfirmModalOpen(false);
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    } else if (modalPurpose === "Organizer") {
      try {
        await axios.put(
          `${API_ENDPOINTS.UPDATE_ROLEBYID}?id=${id}&userRole=Student`
        );
        setUserData((prevData) =>
          prevData.map((user) =>
            user.id === id ? { ...user, userRole: "Student" } : user
          )
        );
        setConfirmModalOpen(false);
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    } else if (modalPurpose === "Delete") {
      try {
        await axios.delete(`${API_ENDPOINTS.DELETE_ACCOUNTBYID}${id}`);
        setUserData((prevData) => prevData.filter((user) => user.id !== id));
        setConfirmModalOpen(false);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  const hasNextPage = indexOfLastUser < userData.length;
  const hasPreviousPage = currentPage > 1;

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const filteredUsers = userData.filter((user) => {
    const formatName = (firstName: string, lastName: string) =>
      `${firstName} ${lastName}`.toLowerCase();

    const searchWords = searchQuery.toLowerCase().split(" ");
    const userFullName = formatName(user.firstName, user.lastName);
    const reversedFullName = formatName(user.lastName, user.firstName);

    return searchWords.every(
      (word) => userFullName.includes(word) || reversedFullName.includes(word)
    );
  });

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalFilteredUsers = filteredUsers.length;
  const totalPagesFiltered = Math.ceil(totalFilteredUsers / usersPerPage);
  useEffect(() => {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage, totalPages));
  }, [filteredUsers, usersPerPage]);

  const printFuction = async () => {
    try {
     await axios.get(`${API_ENDPOINTS.GETALLDATA}`);
    } catch (error) {
      console.error("Error getting all data:", error);
    }
  }

  return (
    <div className="border-1 flex max-w-[1000px] flex-1 flex-col overflow-hidden rounded-[10px] border-gray bg-white text-center text-[15px] text-neutral-700 shadow-lg">
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message={updateRoleMessage}
        onConfirm={() => handleConfirm(selectedUserId, modalPurpose)}
        onCancel={handleCancel}
      />
      <div className="bg-maroon p-3 flex justify-center gap-10">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-[50px] w-8/12 rounded-full border border-gray indent-5 outline-none"
        />
        <button className="box-border rounded-md bg-gold px-[37px] py-[11px] text-black font-semibold" onClick={()=> printFuction()}>
          PRINT
        </button>
      </div>
      <table className="flex w-full flex-1 flex-col">
        <thead className="flex bg-gold">
          <tr className="flex flex-1">
            <th className="flex h-[40px] flex-1 items-center justify-center p-1">
              NAME
            </th>
            <th className="flex h-[40px] flex-1 items-center justify-center p-1">
              EMAIL
            </th>
            <th className="flex h-[40px] flex-1 items-center justify-center p-1">
              ROLE
            </th>
            <th className="flex h-[40px] flex-1 items-center justify-center p-1"></th>
          </tr>
        </thead>
        <tbody className="flex-1 flex-col">
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              className={`flex items-center border-b border-zinc-600 border-opacity-30 ${
                selectedUserId === user.id ? "bg-gray-200" : ""
              }`}
            >
              <td className="min-h-[40px] flex-1 p-1">
                {user.firstName} {user.lastName}
              </td>
              <td className="min-h-[40px] flex-1 p-1">{user.email}</td>
              <td className="min-h-[40px] flex-1 p-1 text-green-500">
                {user.userRole?.toUpperCase()}
              </td>

              <td className="flex min-h-[40px] flex-1 justify-center gap-10 p-1 ">
                {user.userRole !== "Admin" && (
                  <>
                    <button
                      onClick={() =>
                        handleDelete(user.id, user.firstName, user.lastName)
                      }
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(user.id);
                      }}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    {selectedUserId === user.id && IsPopupOpen && (
                      <div
                        ref={organizerRef}
                        className="z-1 absolute ml-[-200px] mt-[-3px] flex w-[200px] cursor-pointer justify-center gap-1 rounded-[5px] bg-white py-2 shadow"
                        onClick={() =>
                          user.userRole === "Organizer"
                            ? toStudentClicked(
                                user.id,
                                user.firstName,
                                user.lastName
                              )
                            : toOrganizerClicked(
                                user.id,
                                user.firstName,
                                user.lastName
                              )
                        }
                      >
                        <img src={Pencil} />
                        {user.userRole === "Organizer" && <p>Make Student</p>}
                        {user.userRole === "Student" && <p>Make Organizer</p>}
                      </div>
                    )}
                  </>
                )}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between py-5 px-20">
        <button
          className={`group relative flex h-[35px] w-[110px] items-center justify-center overflow-hidden rounded-[5px] border border-neutral-700 ${
            !hasPreviousPage ? "cursor-not-allowed" : ""
          }`}
          onClick={handlePreviousPage}
          disabled={!hasPreviousPage}
        >
          <span
            className={`ml-[10px] mr-[-10px] flex w-6 transform items-center justify-center transition-transform ${
              hasPreviousPage ? "group-hover:-translate-x-[10px] " : ""
            }`}
          >
            &larr;
          </span>
          <span className="flex-1">Previous</span>
        </button>
        <div className="flex items-center gap-2">
          {Array.from({
            length: totalPagesFiltered,
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-2 font-semibold text-gray ${
                currentPage === index + 1
                  ? "rounded-sm bg-zinc-300 bg-opacity-50 text-maroon"
                  : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className={`group relative flex h-[35px] w-[110px] items-center justify-center overflow-hidden rounded-[5px] border border-neutral-700 ${
            !hasNextPage ? "cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={!hasNextPage}
        >
          <span className="flex-1">Next</span>
          <span
            className={`mr-[10px] ml-[-10px] flex w-6 transform items-center justify-center transition-transform   ${
              hasNextPage ? "group-hover:translate-x-[10px] " : ""
            }`}
          >
            &rarr;
          </span>
        </button>
      </div>
    </div>
  );
};

export default UserTable;
