import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUsers } from "../../services/api";
import toast from "react-hot-toast";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const navigate = useNavigate();
  const { user,isAdmin } = useSelector((st) => st.auth); // Assume auth store has user
  const usersPerPage = 10;

  useEffect(() => {
   if(!isAdmin){
    navigate("/")
   }

    fetchUsers();
    return () => {
      // Cleanup
      setUsers([]);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getUsers();
      setUsers(res.data.users);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch users";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";
    if (sortConfig.key === "balance") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (sortConfig.key === "kycVerified") {
      return sortConfig.direction === "asc"
        ? aValue === bValue
          ? 0
          : aValue
          ? -1
          : 1
        : aValue === bValue
        ? 0
        : aValue
        ? 1
        : -1;
    }
    return sortConfig.direction === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gray-900"
      >
        <div className="text-center space-y-4">
          <svg
            className="animate-spin h-8 w-8 text-indigo-400 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-300 text-lg">Loading users...</p>
          {/* Skeleton UI */}
          <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl p-6 space-y-4">
            <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gray-900"
      >
        <div className="text-center space-y-4 bg-gray-800 p-6 rounded-xl border border-red-600/50">
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={fetchUsers}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 
            rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 
            font-semibold shadow-md hover:shadow-lg"
          >
            Retry
          </button>
          <p className="text-gray-300">
            <Link
              to="/dashboard"
              className="text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              Return to Dashboard
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-900 py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-indigo-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle absolute rounded-full bg-indigo-400 opacity-30"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto bg-gray-800 shadow-xl rounded-xl border border-indigo-600/50 relative z-10">
        {/* Header */}
        <div
          className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6"
        >
          <h2 className="text-2xl font-bold text-white text-center">All Users</h2>
          <p className="text-gray-300 text-center mt-2">
            Total Users: {users.length} | Filtered: {filteredUsers.length}
          </p>
        </div>

        {/* Search Bar and Refresh */}
        <div className="p-6 flex flex-col sm:flex-row gap-4"  data-aos-delay="100">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="flex-1 p-3 bg-gray-700 text-gray-200 rounded-lg border-y border-gray-600 
            focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400 
            transition-all duration-300 hover:bg-gray-600"
          />
          <button
            onClick={fetchUsers}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 px-4 
            rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 
            font-semibold shadow-md hover:shadow-lg"
          >
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-6 pb-6"  data-aos-delay="200">
          <table className="w-full border-\">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                {[
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "balance", label: "Balance" },
                  { key: "kycVerified", label: "KYC" },
                  { key: null, label: "Actions" },
                  { key: null, label: "Details" },
                ].map((col) => (
                  <th
                    key={col.label}
                    className={`p-3 text-left font-semibold cursor-${
                      col.key ? "pointer" : "default"
                    }`}
                    onClick={() => col.key && handleSort(col.key)}
                  >
                    <div className="flex items-center">
                      {col.label}
                      {col.key && sortConfig.key === col.key && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-y hover:bg-gray-600 transition-colors"
                  >
                    <td className="p-3 whitespace-nowrap text-gray-200">{user.name || "N/A"}</td>
                    <td className="p-3 break-words max-w-xs text-gray-200">{user.email}</td>
                    <td className="p-3 text-gray-200">₹{user.balance.toLocaleString()}</td>
                    <td className="p-3 relative group">
                      {user.kycVerified ? (
                        <span className="text-green-400">✅ Verified</span>
                      ) : (
                        <span className="text-red-400">❌ Not Verified</span>
                      )}
                      <span
                        className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                        text-xs rounded p-2 -mt-10 w-48"
                      >
                        Indicates if the user has completed KYC verification.
                      </span>
                    </td>
                    <td className="p-3 relative group">
                      <button
                        onClick={() => navigate(`/admin/user/${user._id}`)}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                        px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 
                        transition-all duration-300 focus:outline-none focus:ring-4 
                        focus:ring-indigo-400 focus:ring-offset-2 shadow-md hover:shadow-lg 
                        transform hover:scale-105"
                      >
                        Update
                      </button>
                      <span
                        className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                        text-xs rounded p-2 -mt-10 w-48"
                      >
                        Edit user details (admin only).
                      </span>
                    </td>
                    <td className="p-3 relative group">
                      <Link to={`/profile/${user._id}`}>
                        <button
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white 
                          px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 
                          transition-all duration-300 focus:outline-none focus:ring-4 
                          focus:ring-teal-400 focus:ring-offset-2 shadow-md hover:shadow-lg 
                          transform hover:scale-105"
                        >
                          See Details
                        </button>
                      </Link>
                      <span
                        className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                        text-xs rounded p-2 -mt-10 w-48"
                      >
                        View detailed user profile.
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-400">
                    No users found
                    {search && (
                      <button
                        onClick={() => {
                          setSearch("");
                          setCurrentPage(1);
                        }}
                        className="ml-2 text-indigo-400 hover:text-indigo-300 hover:underline"
                      >
                        Clear Search
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="p-6 flex justify-between items-center"
            
            data-aos-delay="300"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg 
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 
              transition-all duration-300"
            >
              Previous
            </button>
            <p className="text-gray-300">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg 
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 
              transition-all duration-300"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Custom CSS for animations, tooltips, and particles */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(${Math.random() * 30 - 15}px); opacity: 0.2; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
        .animate-spin { animation: spin 1s linear infinite; }
        .particle { animation: float linear infinite; pointer-events: none; }
        .group-hover:block { display: none; }
        .group:hover .group-hover:block { display: block; }
        @media (max-width: 640px) {
          table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
          thead {
            display: none;
          }
          tbody tr {
            display: block;
            margin-bottom: 1rem;
            border: 1px solid #4b5563;
            border-radius: 0.5rem;
            padding: 1rem;
          }
          tbody td {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border: none;
          }
          tbody td:before {
            content: attr(data-label);
            font-weight: 600;
            color: #9ca3af;
            margin-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UsersList;