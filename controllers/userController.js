const  asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

//@desc Register a User
//@route GET /api/users/register
//@access public

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields Are Mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Registered");
    }

    // Hash Password
    const hashPassword=await bcrypt.hash(password,10);
    console.log("Hashed password",hashPassword);
    const user=await User.create({
        username,
        email,
        password:hashPassword,
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email
        });
    }else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({message:"the user is registered"});
    res.json(user);

    
});

//@desc login user
//@route GET /api/login
//@access public

const loginUser = asyncHandler(async (req,res)=>{

    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All Fields are Mandatory!")
    }
    const user =await User.findOne({email});
    // compare password with Hashpassword we use again the bcrypt 
    if (user && (await bcrypt.compare(password,user.password))){

        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1h"}
    );

        res.status(200).json({
            accessToken
        })
    }else{
        res.status(400);
        throw new Error("email or password is not valid");
    }
    res.json({message:"login user"});
});

//@descCurrent user info
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user)
});

module.exports={registerUser,loginUser,currentUser};