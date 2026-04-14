import RegistrationLayout from "../../components/layouts/RegistrationLayout";
import arcade_device from "@/assets/arcade_device2.png";

const Dashboard = () => {
    const handleVerifyEmail = async () => {
        try {

        } catch(error) {
            console.error("Failed to verify email: ", error)
        }
    };
    return (
        <RegistrationLayout>
            <div className="flex flex-col h-full px-2 py-2">
                <h1 className="text-3xl font-medium text-red6 mb-4 pl-4">Dashboard</h1>
                <main className="flex flex-1 items-start justify-center mt-0">
                    <div className="w-[98%] h-full bg-red7 rounded-lg flex flex-col items-center pt-8 gap-4">
                        <div className="w-[95%] h-[15%] flex items-center justify-between bg-white rounded-lg px-6">
                            <h2 className="text-lg font-normal text-black">Verify your email</h2>
                            <button 
                                onClick={handleVerifyEmail}
                                className="ml-2 px-4 py-2 bg-red4 text-white rounded-lg hover:bg-red3 transition-colors"
                            >  Verify Email
                            </button>
                        </div>
                        <div className="w-[95%] h-[25%] flex flex-col justify-center bg-white rounded-lg px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-normal text-black">Big Red Hacks 2026 Hackathon</h2>
                                <button
                                    className="ml-2 px-4 py-2 bg-red5 text-white rounded-lg hover:bg-red3 transition-colors"
                                >
                                    Register Now!
                                </button>
                            </div>
                            <p className="text-sm font-normal text-black mt-6">
                                Join us at the largest student-run hackathon of the Northeast at Cornell University.
                                Big Red Hacks will take place mm/dd-mm/dd at Cornell. Any person over 18 years
                                old are eligible to attend our hackathon!
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center">
                                <img
                                src={arcade_device}
                                alt="arcade device"
                                className="mb-6 w-96"
                                />
                                <p className="text-9xl font-jersey10 text-purple9 mb-6">Hack <br /> On!</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </RegistrationLayout>
    );
};

export default Dashboard;
