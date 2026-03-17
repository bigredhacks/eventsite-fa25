import RegistrationLayout from "../components/layouts/RegistrationLayout";

const AdminPage = () => {
    return (
        <RegistrationLayout>
            <div className="h-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h1>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <p className="text-gray-600">
                        Admin functionality will be implemented here.
                    </p>
                </div>
            </div>
        </RegistrationLayout>
    );
};

export default AdminPage;