const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{
    try{
        const token = req.header("authorization")
        if(!token)
        {
            res.status(400).json({
                message: "loging to access the content..."
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user.decode()
        next()


    }catch(err)
    {
        res.status(500).json({
            message: err,
        })
    }
}
module.exports = auth
