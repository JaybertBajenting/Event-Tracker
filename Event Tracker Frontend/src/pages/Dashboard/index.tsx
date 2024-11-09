import { useAuth } from "@/context/Auth";
import AdminView from "@/pages/AdminView";
import OrganizerView from "@/pages/OrganizerView";
import UserView from "@/pages/UserView";

const Dashboard = () => {
  const { user,logout } = useAuth();
  return (
    <div className="flex justify-center">
      {user?.userRole === "Student" && <UserView initialView={"HomePage"} />}
      {user?.userRole === "Organizer" && <OrganizerView initialView={"HomePage"} />}
      {user?.userRole === "Admin" && <AdminView initialView={"HomePage"} />}
    </div>
  );
};


export default Dashboard;
