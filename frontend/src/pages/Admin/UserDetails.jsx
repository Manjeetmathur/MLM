import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser, VerifySst } from "../../services/api";
import toast from "react-hot-toast";

const UserDetails = () => {
       const { userId } = useParams();
       const [user, setUser] = useState(null);
       const [packageId, setPkgId] = useState("");
       const [sstId, setSstId] = useState("");
       const [verifyLoading, setverifyLoading] = useState(false);
       const [formData, setFormData] = useState({
              name: "",
              email: "",
              balance: "",
              kycVerified: false,
              userId: userId,
       });

       useEffect(() => {
              fetchUser();
       }, []);

       const fetchUser = async () => {
              try {
                     const res = await getUserById({ id: userId });
                     setUser(res.data.user);
                     setFormData(res.data.user);
              } catch (error) {
                     console.error("Error fetching user:", error);
              }
       };

       const verifysst = async () => {
              try {
                     setverifyLoading(true)
                     const res = await VerifySst({ userId, packageId, sstId });
                     if (res.data.success) {
                            toast.success("Verified successfully");
                            setPkgId('')
                            setSstId('')
                     } else {
                            toast.error(res.data.message)
                     }
              } catch (error) {
                     console.error("Error verifying screenshot:", error);
                     toast.error("Verification failed");
              }
              setverifyLoading(false)
       };

       const handleChange = (e) => {
              const { name, value, type, checked } = e.target;
              setFormData({
                     ...formData,
                     [name]: type === "checkbox" ? checked : value,
              });
       };

       const handleSubmit = async (e) => {
              e.preventDefault();
              try {
                     const res = await updateUser(formData);
                     fetchUser(); // Refresh data
                     toast.success("User updated successfully");
              } catch (error) {
                     console.error("Error updating user:", error);
                     toast.error("Failed to update user");
              }
       };

       if (!user)
              return (
                     <div className="flex items-center justify-center min-h-screen bg-gray-100">
                            <p className="text-lg font-medium text-gray-600 animate-pulse">Loading user details...</p>
                     </div>
              );

       return (
              <div className="min-h-screen bg-gray-100 py-28 px-4 sm:px-6 lg:px-8">
                     <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                                   <h2 className="text-2xl font-bold text-white text-center">User Details</h2>
                            </div>

                            {/* Form Section */}
                            <div className="p-6">
                                   <form onSubmit={handleSubmit} className="space-y-6">
                                          <div className="space-y-4">
                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                                        <input
                                                               type="text"
                                                               name="name"
                                                               value={formData.name}
                                                               onChange={handleChange}
                                                               className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                        />
                                                 </div>

                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                                        <input
                                                               type="email"
                                                               name="email"
                                                               value={formData.email}
                                                               onChange={handleChange}
                                                               className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                        />
                                                 </div>

                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700">Balance</label>
                                                        <input
                                                               type="text"
                                                               name="balance"
                                                               value={formData.balance}
                                                               onChange={handleChange}
                                                               className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                        />
                                                 </div>

                                                 <div className="flex items-center">
                                                        <input
                                                               type="checkbox"
                                                               name="kycVerified"
                                                               checked={formData.kycVerified}
                                                               onChange={handleChange}
                                                               className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                        />
                                                        <label className="ml-2 text-sm font-medium text-gray-700">KYC Verified</label>
                                                 </div>
                                          </div>

                                          <button
                                                 type="submit"
                                                 className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                          >
                                                 Update User
                                          </button>
                                   </form>

                                   {/* Verification Section */}
                                   <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Verify Screenshot</h3>
                                          <div className="space-y-4">
                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700">Package ID</label>
                                                        <input
                                                               type="text"
                                                               name="packageId"
                                                               value={packageId}
                                                               onChange={(e) => setPkgId(e.target.value)}
                                                               className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                        />
                                                 </div>

                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700">Screenshot ID</label>
                                                        <input
                                                               type="text"
                                                               name="sstId"
                                                               value={sstId}
                                                               onChange={(e) => setSstId(e.target.value)}
                                                               className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                        />
                                                 </div>
                                          </div>

                                          {verifyLoading ? 
                                          <button
                                                 onClick={verifysst}
                                                 className="mt-6 w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2  disabled:cursor-not-allowed "
                                                 disabled
                                          >
                                                 Please wait
                                          </button> : 
                                           <button
                                           onClick={verifysst}
                                           className="mt-6 w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 "
                                    >
                                          Verify Now
                                    </button> 
                                          }
                                   </div>
                            </div>
                     </div>
              </div>
       );
};

export default UserDetails;