import axios from 'axios';
const URL = "https://mlm-backend-8v8u.onrender.com/api"
// let URL = "http://localhost:5555/api"

const api = axios.create({
       baseURL: URL,
       headers: {
              'Content-Type': 'application/json',
       },
       withCredentials: true,
       withXSRFToken: true,
});

export const registerUser = async (data) => {
       const response = await api.post('/register', data);
       return response;
};


export const loginUser = async (data) => {
       const response = await api.post('/login', data);
       return response;
};

export const levelIncome = async ({userId,level}) => {
       const response = await api.post('/level-income', {userId,level});
       return response;
};

export const logoutUser = async () => {
       const response = await api.post('/logout');
       return response;
};

export const requestKYCOTP = async ({ AccountNo, AccountHolderName, email,ifscCode }) => {
       const response = await api.post('/kyc/request-otp', { AccountNo, AccountHolderName, email,ifscCode });
       return response;
};

export const verifyKYCOTP = async ({ email, otp }) => {
       const response = await api.post('/kyc/verify-otp', { email, otp });
       return response;
};

export const getReferrals = async () => {
       const response = await api.get('/referrals');
       return response;
};
export const getProfile = async () => {
       const response = await api.get('/profile');
       return response;
};

export const makeDeposit = async (data) => {
       const response = await api.post('/deposit', data);
       return response;
};

export const makeWithdrawal = async (data) => {
       const response = await api.post('/withdraw', data);
       return response;
};

export const getUsers = async () => {
       const response = await api.get('/users');
       return response;
};
export const completeStreak = async ({planId}) => {
       const response = await api.post('/streak',{planId});
       return response;
};
export const getUserById = async ({ id }) => {
       const response = await api.get(`/user/${id}`);
       return response;
};
export const getPlanById = async ({ planId }) => {
       const response = await api.get(`/plan/${planId}`);
       return response;
};
export const updateUser = async (formdata) => {
       const response = await api.put(`/user`, {formdata});
       return response;
};
export const withdrawMoney = async ({money,userId}) => {
       
       const response = await api.post(`/withdraw-money/${userId}`, {money});
       return response;
};
export const addPlan = async ({packageId,userId,image}) => {
       const formData = new FormData()
       formData.append('image', image)
       formData.append('packageId', packageId)
       formData.append('userId', userId)
       const response = await api.post(`/upload-sst`,
              formData,
              {
                     headers : {"Content-Type" : "multipart/formdata"},
                     withCredentials:true,
                     withXSRFToken:true
              }
       );
       return response;
       
};
export const VerifySst = async ({packageId,userId,sstId}) => {
       const response = await api.post(`/verify-sst`,{packageId,userId,sstId});
       console.log(response)
       return response;
       
};