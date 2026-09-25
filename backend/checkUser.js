const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const User = require("./models/User");

async function checkUser() {
  try {
    await connectDB();

    const user = await User.findOne({
      email: "raniunsa24@gmail.com",
    }).select("name email role");

    console.log(user);

    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

checkUser();


