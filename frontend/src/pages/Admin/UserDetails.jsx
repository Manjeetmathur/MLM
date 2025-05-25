import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserById, updateUser, VerifySst } from "../../services/api";
import toast from "react-hot-toast";

const UserDetails = () => {
       const { userId } = useParams();
       const navigate = useNavigate();
       const { user: authUser } = useSelector((st) => st.auth);
       const [user, setUser] = useState(null);
       const [packageId, setPkgId] = useState("");
       const [sstId, setSstId] = useState("");
       const [verifyLoading, setVerifyLoading] = useState(false);
       const [formData, setFormData] = useState({
              name: "",
              email: "",
              balance: "",
              kycVerified: false,
              userId,
       });
       const [error, setError] = useState("");

       useEffect(() => {

              fetchUser();
       }, [userId]);

       const fetchUser = async () => {
              try {
                     setError("");
                     const res = await getUserById({ id: userId });
                     if (res.data.success) {
                            setUser(res.data.user);
                            setFormData({
                                   name: res.data.user.name || "",
                                   email: res.data.user.email,
                                   balance: res.data.user.balance.toString(),
                                   kycVerified: res.data.user.kycVerified,
                                   userId,
                            });
                     } else {
                            throw new Error(res.data.message || "User not found");
                     }
              } catch (error) {
                     setError(error.message);
                     toast.error(error.message);
              }
       };

       const validateForm = () => {
              if (!formData.name.trim()) return "Name is required";
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Valid email required";
              if (isNaN(formData.balance) || Number(formData.balance) < 0) return "Valid balance required";
              return "";
       };

       const handleChange = (e) => {
              const { name, value, type, checked } = e.target;
              setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
       };

       const handleSubmit = async (e) => {
              e.preventDefault();
              const validationError = validateForm();
              if (validationError) {
                     toast.error(validationError);
                     return;
              }
              try {
                     const res = await updateUser({ ...formData, balance: Number(formData.balance) });
                     if (res.data.success) {
                            fetchUser();
                            toast.success("User updated");
                     } else {
                            toast.error(res.data.message || "Update failed");
                     }
              } catch (error) {
                     toast.error(error.response?.data?.message || "Update failed");
              }
       };

       const verifysst = async () => {
              if (!packageId.trim() || !sstId.trim()) {
                     toast.error("Package and Screenshot IDs required");
                     return;
              }
              try {
                     setVerifyLoading(true);
                     const res = await VerifySst({ userId, packageId, sstId });
                     console.log(res)
                     if (res.data.success) {
                            toast.success("Verified");
                            setPkgId("");
                            setSstId("");
                            fetchUser();
                     } else {
                            toast.error(res.data.message);
                     }
              } catch (error) {
                     console.log()
                     toast.error(error.response?.data?.message || "Verification failed");
              } finally {
                     setVerifyLoading(false);
              }
       };

       if (!user) {
              return (
                     <div className="flex items-center justify-center min-h-screen bg-gray-900" >
                            <div className="text-center">
                                   <svg
                                          className="animate-spin h-8 w-8 text-indigo-400 mx-auto"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                   >
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                          <path
                                                 className="opacity-75"
                                                 fill="currentColor"
                                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                          />
                                   </svg>
                                   {error && <p className="mt-2 text-red-400">{error}</p>}
                            </div>
                     </div>
              );
       }

       return (
              <div className="min-h-screen mt-10 bg-gray-900 py-16 px-4 sm:px-6 lg:px-8" >
                     <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-lg border border-indigo-600/50">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                                   <h2 className="text-2xl font-bold text-white text-center">User Details</h2>
                            </div>

                            <div className="p-6 space-y-6">
                                   <form onSubmit={handleSubmit} className="space-y-4">
                                          <div>
                                                 <label className="block text-sm text-gray-300">Name</label>
                                                 <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="mt-1 p-2 w-full bg-gray-700 text-gray-200 rounded border border-gray-600 focus:ring-indigo-400 focus:border-indigo-400"
                                                 />
                                          </div>
                                          <div>
                                                 <label className="block text-sm text-gray-300">Email</label>
                                                 <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="mt-1 p-2 w-full bg-gray-700 text-gray-200 rounded border border-gray-600 focus:ring-indigo-400 focus:border-indigo-400"
                                                 />
                                          </div>
                                          <div>
                                                 <label className="block text-sm text-gray-300">Balance</label>
                                                 <input
                                                        type="number"
                                                        name="balance"
                                                        value={formData.balance}
                                                        onChange={handleChange}
                                                        min="0"
                                                        step="0.01"
                                                        className="mt-1 p-2 w-full bg-gray-700 text-gray-200 rounded border border-gray-600 focus:ring-indigo-400 focus:border-indigo-400"
                                                 />
                                          </div>
                                          <div className="flex items-center">
                                                 <input
                                                        type="checkbox"
                                                        name="kycVerified"
                                                        checked={formData.kycVerified}
                                                        onChange={handleChange}
                                                        className="h-4 w-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-400 bg-gray-700"
                                                 />
                                                 <label className="ml-2 text-sm text-gray-300">KYC Verified</label>
                                          </div>
                                          <button
                                                 type="submit"
                                                 className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded hover:from-indigo-700 hover:to-purple-700 transition-all"
                                          >
                                                 Update User
                                          </button>
                                   </form>

                                   <div className="p-4 bg-gray-700 rounded">
                                          <h3 className="text-lg font-semibold text-white mb-4">Verify Screenshot</h3>
                                          <div className="space-y-4">
                                                 <div>
                                                        <label className="block text-sm text-gray-300">Package ID</label>
                                                        <input
                                                               type="text"
                                                               value={packageId}
                                                               onChange={(e) => setPkgId(e.target.value)}
                                                               className="mt-1 p-2 w-full bg-gray-700 text-gray-200 rounded border border-gray-600 focus:ring-indigo-400 focus:border-indigo-400"
                                                        />
                                                 </div>
                                                 <div>
                                                        <label className="block text-sm text-gray-300">Screenshot ID</label>
                                                        <input
                                                               type="text"
                                                               value={sstId}
                                                               onChange={(e) => setSstId(e.target.value)}
                                                               className="mt-1 p-2 w-full bg-gray-700 text-gray-200 rounded border border-gray-600 focus:ring-indigo-400 focus:border-indigo-400"
                                                        />
                                                 </div>
                                          </div>
                                          <button
                                                 onClick={verifysst}
                                                 disabled={verifyLoading}
                                                 className={`mt-4 w-full flex justify-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded 
              hover:from-teal-600 hover:to-cyan-600 transition-all ${verifyLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                                          >
                                                 {verifyLoading ? (
                                                        <span className="flex items-center">
                                                               <svg
                                                                      className="animate-spin h-5 w-5 mr-2 text-white"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                      fill="none"
                                                                      viewBox="0 0 24 24"
                                                               >
                                                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                      <path
                                                                             className="opacity-75"
                                                                             fill="currentColor"
                                                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                      />
                                                               </svg>
                                                               Verifying...
                                                        </span>
                                                 ) : (
                                                        "Verify Now"
                                                 )}
                                          </button>
                                   </div>
                            </div>
                     </div>
              </div>
       );
};

export default UserDetails;