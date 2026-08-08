import jwt from "jsonwebtoken"

// export const authenticateToken = (req, res, next)=>{
//     // auth Headers
//     const authHeader = req.headers['authorization']

//     // chect if heaader exists, and extract token by spliting

//     const token = authHeader && authHeader.split(' ')[1]
//     if (!token) {
//         return res.status(400).json({message:'Access denied No token Provided'})
//     }
//     try {
//         console.log("1. authentication reached");
//         // verify token
//         const verifiedData = jwt.verify(token, process.env.JWT_SECRET);

//         // attact the verified user to the request body
//         req.user = verifiedData;

//         // to allow the next controller or next middleware to run
//         next()
//     } catch (error) {
//         return res.status(403).json({message:"Invalid or Expired Token"})
//     }
// }

export const authenticateToken = (req, res, next) => {

    console.log("1. authentication reached");

    const authHeader = req.headers["authorization"];

    console.log("Authorization header:", authHeader);

    const token = authHeader && authHeader.split(" ")[1];

    console.log("Token exists:", !!token);

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {

        console.log("About to verify JWT");

        const verifiedData = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("JWT verified successfully");
        console.log("Verified data:", verifiedData);

        req.user = verifiedData;

        console.log("Calling next()");

        next();

    } catch (error) {

        console.error("JWT ERROR:", error);

        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
};


export const authorizeRoles = (...allowedRoles)=>{
    
    return (req, res, next)=>{
        console.log("2. authorization reached");
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