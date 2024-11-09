import { useAuth } from "@/context/Auth";
import UserTable from "./UserTable";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-[100%] flex-1 flex-col ">
      <div className="mb-[2rem] ml-[4rem]">
        <h1 className="text-[50px] font-bold"> Welcome, {user?.firstName}! </h1>
        <p className="text-xl text-zinc-600">
          Event Tracker, a portal to learn more about events in the university.
        </p>
      </div>
      <div className="flex-1 flex justify-center p-10 bg-zinc-600 bg-opacity-5 ">
      <UserTable />
      </div>
    </div>
  );
};
export default HomePage;
