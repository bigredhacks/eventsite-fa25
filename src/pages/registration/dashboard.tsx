import Sidebar from "../../components/SideBar/SideBar";

const Dashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="ml-64 flex-1 p-8">
            </main>
        </div>
    );
};

export default Dashboard; 
