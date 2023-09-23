const jwt=require('jsonwebtoken');
const SECRET='sup3rs3cret';
const authenticateJwt=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                res.sendStatus(403).json({message:"Authentication failed"});
            }
            req.user=user;
            next();
        });
    }
    else{
        res.sendStatus(401).json({message:"Session expired"});
    }
}

module.exports={SECRET,authenticateJwt};