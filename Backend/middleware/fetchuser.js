var jwt = require("jsonwebtoken");
const jwt_word = "thisisjwttoken";

const fetchuser=async (req,res,next)=>{
    try {
        let token=req.header("auth-token")
        if(!token){
            return res.send("Token Is Not Correct");
        }
        const data = jwt.verify(token,jwt_word);
        // console.log(data);
        // { user: { id: '64b0873ba5029152669bd531' }, iat: 1689290555 }
        req.user = data.user;
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports=fetchuser;