import User from "../model/User.js";
import PaymentScreenShot from "../model/paymentScreenShot.js";

// Get all users
export const getAllUsers = async (req, res) => {

       try {
              const users = await User.find();
              res.json({ users, success: true });
       } catch (error) {
              res.json({ msg: "Server Error" });
       }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
       try {
              const user = await User.findById(req.params.userId);
              if (!user) throw new Error("User not found");
              // const sst = await PaymentScreenShot.findById(user)
              await user.populate('paymentScreenshots')
              await user.populate('plans')
              res.json({ user, success: true });
       } catch (error) {
              res.json({ msg: "Server Error", error: error.message });
       }
};

// Update any user’s information
export const updateUser = async (req, res) => {
       try {
              let { formdata } = req.body;
              const user = await User.findById(formdata.userId);
              if (!user) throw new Error("User not found");
              if (formdata?.balance) {
                     let balance = Number(formdata?.balance)
                     user.balance = balance !== undefined ? balance : user.balance;

              }
              user.name = formdata.name || user.name;
              user.email = formdata.email || user.email;
              user.kycVerified = formdata.kycVerified !== undefined ? formdata.kycVerified : user.kycVerified;

              await user.save();
              res.json({ msg: "User updated successfully", user, success: true });
       } catch (error) {
              res.json({ msg: error.message });
       }
};

// Delete a user
export const deleteUser = async (req, res) => {
       try {
              await User.findByIdAndDelete(req.params.userId);
              res.json({ msg: "User deleted successfully", success: true });
       } catch (error) {
              res.json({ msg: "Server Error" });
       }
};
