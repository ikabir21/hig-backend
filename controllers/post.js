import Post from "../models/post.js";
import { validatePost } from "../validation/validate.js";

const setRating = (cp, ac, sub) => {
  let sum = 0;
  let n = 0;
  for (const arr of Object.entries(cp)) {
    sum += arr[1];
    n++;
  }
  const score1 = Number((sum/n).toFixed(2));
  const score2 = Number((ac/sub).toFixed(2)) * 100;
  const rating = (score1 + score2)*0.5;
  return Number(rating.toFixed(2));
}

export const createPost = async(req, res) => {

  // const  { error }  = validatePost(req.body);
  // if(error) return res.status(400).json({message: error.details[0].message});
  const isHackerExist = await Post.findOne({profile_link: req.body.profile_link});
  if(isHackerExist) return res.status(400).json({message: "Hacker already exists"});

  const newPost = new Post({
    name: req.body.name,
    profile_link: req.body.profile_link,
    location: req.body.location,
    education: req.body.education,
    challenges_solved: req.body.challenges_solved || 0,
    solution_submitted: req.body.solution_submitted || 0,
    solution_accepted: req.body.solution_accepted || 0,
    overall_rank: req.body.overall_rank || 0,
    followers: req.body.followers || 0,
    following: req.body.following || 0,
    competetive_profile: { 
      data_structures: req.body.competetive_profile.data_structures || 0 ,
      algorithm: req.body.competetive_profile.algorithm || 0 ,
      cpp: req.body.competetive_profile.cpp || 0 ,
      java: req.body.competetive_profile.java || 0 ,
      python: req.body.competetive_profile.python || 0 ,
      html: req.body.competetive_profile.html || 0 ,
      javascript: req.body.competetive_profile.javascript || 0 
    },
    vote_count: req.body.vote_count || 0 ,
    device_type: req.body.device_type,
    rating: setRating(req.body.competetive_profile, req.body.solution_accepted, req.body.solution_submitted)
  });
  try {
    await newPost.save();
    return res.status(201).json({ newPost })
    // res.json({userID: newUser._id});
  } catch (error) {
    res.status(400).json(error);
  }
}

export const getPost = async (req, res) =>{
  try{
    const post = await Post.find();

    res.status(200).json(post);
  } catch(err){
    res.status(400).json({message: err.message});
  }
}

export const getSortedPost = async (req, res) => {
  await Post.find({})
    .sort({name: 1})
    .exec((error, post) => {
      if(error) return res.status(400).json({message: error});
      if(post) return res.status(200).json({ post })
    });
}

export const getRankedPost = async (req, res) =>{
  await Post.aggregate([
    { 
      "$sort": {
        "rating": -1
      }
    },
    {
      "$group": {
        "_id": false,
        "users": {
          "$push": {
            "_id": "$_id",
            "rating": "$rating",
          }
        }
      }
    },
    {
      "$unwind": {
        "path": "$users",
        "includeArrayIndex": "rank"
      }
    }
  ])
  .exec((error, post) => {
    if(error) return res.status(400).json({message: error});
    if(post) return res.status(200).json({ post })
  });
}

export const getTopThree = async (req, res) =>{
  await Post.aggregate([
    { 
      "$sort": {
        "rating": -1
      }
    },
    {
      "$group": {
        "_id": false,
        "users": {
          "$push": {
            "_id": "$_id",
            "rating": "$rating",
          }
        }
      }
    },
    {
      "$unwind": {
        "path": "$users",
        "includeArrayIndex": "rank"
      }
    },
    {
      $limit: 3
    }
  ])
  .exec((error, post) => {
    if(error) return res.status(400).json({message: error});
    if(post) return res.status(200).json({ post })
  });
}