import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next)=>{
    // auth Headers
    const authHeader = req.headers['authorization']

    // chect if heaader exists, and extract token by spliting

    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(400).json({message:'Access denied No token Provided'})
    }
    try {
        // verify token
        const verifiedData = jwt.verify(token, process.env.JWT_SECRET);

        // attact the verified user to the request body
        req.user = verifiedData;

        // to allow the next controller or next middleware to run
        next()
    } catch (error) {
        return res.status(403).json({message:"Invalid or Expired Token"})
    }
}

export const authorizeRoles = (...allowedRoles)=>{
    return (req, res, next)=>{
        // to ensure userexists and has a role;
        if (!req.user || !req.user.role) {
            return res.status(403).json({
                message:"Access Forbidden:Provide a role First"
            })
        }
        //to check  if role can access this route
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message:"Access Forbidden: Invalid Roles"
            })
        }
        next()
    }
}