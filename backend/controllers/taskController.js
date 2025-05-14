import Plan from "../model/plan.js";
import User from "../model/User.js";

export const completeTask = async (req, res) => {
       try {

              const { planId } = req.body
              const user = await User.findById(req.user.userId);
              const today = new Date();
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const plan = await Plan.findById(planId)
              if(!plan){
                     throw new Error("Plan doesn't exist more")
              }
              if (plan.lastTaskDate && plan.lastTaskDate.toDateString() === today.toDateString()) {
                     throw new Error("Task already completed today!");
              }

              if (plan.lastTaskDate && plan.lastTaskDate.toDateString() === yesterday.toDateString()) {
                     plan.streak += 1;  
                     plan.dailyDeposit += 1;
              } else{
                     plan.streak=1;
                     plan.dailyDeposit += 1;
              }

              plan.lastTaskDate = today; // Update last task date

              // Bonus on streak milestones
              const bonusRewards = { 3: 10, 7: 50, 14: 150, 20: 500 };
              if (bonusRewards[plan.streak]) {
                     user.balance += bonusRewards[plan.streak]; // Add streak bonus
              }

              if (plan.dailyDeposit <= 20) {
                     user.balance += plan.dailyIncome;
                     await user.save()
                     await plan.save();
                     console.log(user, plan)
       
                     res.json({ message: "Task completed!", streak: plan.streak, balance: user.balance, success: true });
              }
              else{
                     
                    await Plan.findByIdAndDelete(plan._id)
                     user.plans = user.plans.filter(item => item._id.toString() !== planId)
                     await user.save()

                    res.json({ message: "Your Plan Expires",planDeleted:true });
              }
             
       } catch (error) {
              res.json({ message: error.message, error: error.message });
       }
};
