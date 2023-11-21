// Middleware to check if the user is not authenticated
export function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next(); 
    }
    return res.status(405).json({message: "Currently Authenticated"});
};

// Middleware to check if the user is authenticated
export function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); 
    }
    return res.status(401).json({message: "Not Authenticated"});
};