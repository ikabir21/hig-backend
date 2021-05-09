import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  givenName: { type: String, required: true, min: 3, max: 20, trim: true},
  familyName: { type: String, required: true, min: 3, max: 20, trim: true},
  email: { type: String, required: true, min: 6, max: 255, trim: true},
  password: { type: String, required: true, min: 6, max: 1024 },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
}, {timestamps: true});

export default mongoose.model("User", userSchema);