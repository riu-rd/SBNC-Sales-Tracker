import nodemailer from "nodemailer";

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

export async function verifyEmail(email, link) {
    try {
        let transporter = nodemailer.createTransport({
            service:"Gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            }
        });
        // Send Email
        await transporter.sendMail({
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "SBNC Account Verification", 
            text: "Welcome",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2 style="color: #0c2075;">SBNC Account Verification</h2>
                <p>Welcome to SBNC! To activate your account, please click the link below:</p>
                <p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Activate Account</a>
                </p>
                <p>If the button above does not work, you can also copy and paste the following link into your browser:</p>
                <p>${link}</p>
            </div>
            `
        });
        console.log("Verification Email sent Successfully");
    } catch (err) {
        console.error(err.message);
    }
}

// Function to send edit details to admin
export async function sendAdminEditUpdate(adminEmail, emailSubject, emailHTML) {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.AUTH_EMAIL,
            to: adminEmail,
            subject: emailSubject,
            text: "Transaction Edit",
            html: emailHTML
        });
        console.log("Transaction Edit email sent to admin Successfully");
    } catch (err) {
        console.error(err.message);
    }
}