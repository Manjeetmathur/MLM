import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProfile, getReferrals, levelIncome } from '../services/api';
import InvestmentPackages from './homeHelper/InvestmentPage';
import D1 from './DeshBoardHelper/D1';
import D2 from './DeshBoardHelper/D2';

export default function Dashboard() {
       const [referrals, setReferrals] = useState([]);
       const [profile, setProfile] = useState('');
       const [balance, setBalance] = useState(0);
       const [level, setLevel] = useState(0);
       const [progress, setProgress] = useState(20);
       const navigate = useNavigate();
       const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
       const user = useSelector((state) => state.auth.user);

       const getUserProfile = async () => {
              try {
                     const response = await getProfile();
                     setProfile(response.data.user);
              } catch (err) {
                     console.error(err);
                     if (err.response?.status === 401) {
                            navigate('/login');
                     }
              }
       };

       useEffect(() => {
              if (!isAuthenticated) {
                     navigate('/login');
                     return;
              }
              getUserProfile();

              const fetchData = async () => {
                     try {
                            const response = await getReferrals();
                            setReferrals(response.data);
                            setBalance(1500.75); // Replace with real API data
                            setLevel(calculateLevel(response.data?.referrals?.length || 0));
                            setProgress(calculateProgress(response.data?.referrals?.length || 0));
                     } catch (err) {
                            console.error(err);
                            if (err.response?.status === 401) {
                                   navigate('/login');
                            }
                     }
              };
              fetchData();
       }, [isAuthenticated, navigate]);

       useEffect(() => {
              const fetchLevelIncome = async () => {
                     try {
                            await levelIncome({ userId: user._id, level: 2 });
                     } catch (error) {
                            console.error('Error fetching level income:', error);
                     }
              };
              fetchLevelIncome();
       }, [level, user._id]);

       const calculateLevel = (referralCount) => {
              if (referralCount >= 20) return 5;
              if (referralCount >= 15) return 4;
              if (referralCount >= 10) return 3;
              if (referralCount >= 5) return 2;
              return 1;
       };

       const calculateProgress = (referralCount) => {
              if (referralCount >= 10) return 100;
              if (referralCount >= 5) return 60;
              return referralCount * 10;
       };

       return (
              <div className="min-h-screen bg-gray-100 py-28 px-4 sm:px-6 lg:px-12">
                     <div className="max-w-7xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10">
                                   Your Dashboard
                            </h1>

                            {/* Overview Section */}
                            <D2 profile={profile} level={level} progress={progress} referrals={referrals} />

                            {/* Referrals and Transactions */}
                            <div className="space-y-8 my-8">
                                   {/* Your Plans */}
                                   <div className="bg-white rounded-xl shadow-lg p-6">
                                          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Plans</h2>
                                          {user?.plans?.length ? (
                                                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                        {user.plans.map((item, idx) => (
                                                               <div
                                                                      key={idx}
                                                                      className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center"
                                                               >
                                                                      <p className="text-lg font-medium text-gray-700">
                                                                             Package Amount:{' '}
                                                                             <span className="text-indigo-600">₹{item?.packageAmount}</span>
                                                                      </p>
                                                                      <p className="text-lg font-medium text-gray-700">
                                                                             Daily Income:{' '}
                                                                             <span className="text-green-600">₹{item?.dailyIncome}</span>
                                                                      </p>
                                                                      <Link
                                                                             to={`/plans/${idx}`}
                                                                             className=" bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors duration-300 place-content-center my-4 flex justify-center"
                                                                      >
                                                                             See Details
                                                                      </Link>
                                                               </div>
                                                        ))}
                                                 </div>
                                          ) : (
                                                 <p className="text-gray-500 text-center">No plans yet.</p>
                                          )}
                                   </div>

                                   {/* Referrals */}
                                   <div className="bg-white rounded-xl shadow-lg p-6">
                                          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Referrals</h2>
                                          {referrals?.referrals?.length > 0 ? (
                                                 <ul className="space-y-3 max-h-64 overflow-y-auto">
                                                        {referrals.referrals.map((ref) => (
                                                               <li
                                                                      key={ref._id}
                                                                      className="flex justify-between items-center border-b border-gray-200 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                                                               >
                                                                      <span className="font-medium">{ref.name}</span>
                                                                      <span className="text-sm text-gray-500">{ref._id.slice(15)}</span>
                                                               </li>
                                                        ))}
                                                 </ul>
                                          ) : (
                                                 <p className="text-gray-500 text-center">No referrals yet.</p>
                                          )}
                                   </div>

                                   {/* Recent Transactions */}
                                   <div className="bg-white rounded-xl shadow-lg p-6">
                                          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                                                 Recent Transactions
                                          </h2>
                                          {user?.paymentScreenshots?.length || user?.withdrawMoney?.length ? (
                                                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                        {user?.paymentScreenshots?.map((item, idx) => (
                                                               <D1 transaction={item} deposite={true} key={idx} />
                                                        ))}
                                                        {user?.withdrawMoney?.map((item, idx) => (
                                                               <D1 transaction={item} deposite={false} key={idx} />
                                                        ))}
                                                 </div>
                                          ) : (
                                                 <p className="text-gray-500 text-center">No recent transactions yet.</p>
                                          )}
                                   </div>
                            </div>

                            {/* Investment Packages */}
                            <div className="mt-8">
                                   <InvestmentPackages />
                            </div>
                     </div>
              </div>
       );
}