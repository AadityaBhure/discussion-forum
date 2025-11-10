import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// User Model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model("User", userSchema);

// Message Model
const messageSchema = new mongoose.Schema({
    username: String,
    text: String,
    time: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", messageSchema);

// Signup
app.post("/signup", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({ username: req.body.username, password: hash });
    res.json({ message: "User Registered ✅" });
});

// Login
app.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json({ error: "User Not Found" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.json({ error: "Wrong Password" });

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.json({ message: "Login Success ✅", token });
});

// Post Message
app.post("/post", async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Message.create({ username: decoded.username, text: req.body.text });
    res.json({ message: "Message Posted ✅" });
});

// Get Messages
app.get("/messages", async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
