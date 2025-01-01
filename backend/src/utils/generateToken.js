import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({ userId },process.env.JWT_SECRET,{ expiresIn:"15d"});
    
    res.cookie("jwt",token,{
        httpOnly:true, //prevent XSS attacks 
        maxAge:15*24*60*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"  //cookie works only in https in production mode
    })

} 