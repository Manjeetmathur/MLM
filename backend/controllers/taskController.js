import fetch from "node-fetch";
import Plan from "../model/plan.js";
import User from "../model/User.js";

const getNetworkUTCDate = async () => {
       const res = await fetch("https://firebase.google.com");
       const dateHeader = res.headers.get('date');
       const serverDate = new Date(dateHeader);
       return serverDate.toISOString().split("T")[0];
};

export const completeTask = async (req, res) => {
       try {
              const { planId } = req.body;
              const user = await User.findById(req.user.userId);
              const plan = await Plan.findById(planId);
              if (!plan) throw new Error("Plan doesn't exist anymore");

              const todayStr = await getNetworkUTCDate();
              // console.log(todayStr)
              const yesterdayDate = new Date(todayStr);
              // console.log(yesterdayDate)
              yesterdayDate.setDate(yesterdayDate.getDate() - 1);
              const yesterdayStr = yesterdayDate.toISOString().split("T")[0];
              // console.log(yesterdayStr)

              const lastTaskStr = plan.lastTaskDate
                     ? plan.lastTaskDate.toISOString().split("T")[0]
                     : null;
              // console.log(lastTaskStr)

              if (lastTaskStr === todayStr) {
                     throw new Error("Task already completed today!");
              }

              if (lastTaskStr === yesterdayStr) {
                     plan.streak += 1;
                     plan.dailyDeposit += 1;
              } else {
                     plan.streak = 1;
                     plan.dailyDeposit += 1;
              }

              plan.lastTaskDate = new Date(); // store system time (OK, we validated already)

              const bonusRewards = { 3: 10, 7: 50, 14: 150, 20: 500 };
              if (bonusRewards[plan.streak]) {
                     user.balance += bonusRewards[plan.streak];
              }

              if (plan.dailyDeposit <= 20) {
                     user.balance += plan.dailyIncome;
                     await user.save();
                     await plan.save();
                     res.json({
                            message: "Task completed!",
                            streak: plan.streak,
                            balance: user.balance,
                            success: true,
                     });
              } else {
                     await Plan.findByIdAndDelete(plan._id);
                     user.plans = user.plans.filter(p => p._id.toString() !== planId);
                     await user.save();
                     res.json({ message: "Your Plan Expires", planDeleted: true });
              }

       } catch (error) {
              res.json({ message: error.message, error: error.message });
       }
};
