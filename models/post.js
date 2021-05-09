import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: { type: String, required: true},
  profile_link: { type: String, required: true},
  location: String, 
  education: String,
  challenges_solved: Number,
  solution_submitted: Number,
  solution_accepted: Number,
  overall_rank: Number,
  followers: Number,
  following: Number,
  competetive_profile:{ 
    data_structures: Number ,
    algorithm: Number ,
    cpp: Number ,
    java: Number ,
    python: Number ,
    html: Number ,
    javascript: Number ,
  },
  vote_count: Number ,
  device_type: String,
  rating: Number,
}, {timestamps: true});


const Post = mongoose.model("Post", postSchema);
export default Post;