// Middleware to check if the user is not authenticated
export function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next(); 
    }
    return res.redirect("/home");
};

// Middleware to check if the user is authenticated
export function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); 
    }
    return res.redirect("/login");
};