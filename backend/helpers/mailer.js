const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH_TOKEN } =
  process.env;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);
exports.sendVerificationEmail = async (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH_TOKEN,
  });
  const accessToken = await auth.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook Email Verification Link",
    html: `
            <body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f9f9f9;margin:0;padding:0"><div style="max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border:1px solid #ddd;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.05)"><div style="text-align:center;padding:20px 0;border-bottom:1px solid #eee"><img src="https://res.cloudinary.com/dbcopekhr/image/upload/v1716362233/facebook_i8p0zu.svg" alt="Your Logo" style="width:150px"></div><div style="padding:30px;text-align:center"><h1 style="color:#333;font-size:24px;margin-bottom:20px">Email Verification</h1><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Hi ${name},</p><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Thank you for registering with us. Please click the button below to verify your email address and complete your registration.</p><a href=${url} style="display:inline-block;margin-top:20px;padding:15px 30px;background-color:#007bff;color:#fff;text-decoration:none;font-size:16px;border-radius:5px;transition:background-color .3s ease">Verify Email</a></div><div style="margin-top:30px;padding:20px;background-color:#f4f4f4;text-align:center;color:#888;font-size:14px"><p style="margin:5px 0">If you did not create an account, no further action is required.</p><p style="margin:5px 0">&copy; 2024 Your Company Name. All rights reserved.</p><div style="margin-top:10px"><a href="https://facebook.com/yourcompany" style="margin:0 5px"><img src="https://res.cloudinary.com/dbcopekhr/image/upload/v1716362233/facebook_i8p0zu.svg" alt="Facebook" style="width:32px"></a><a href="https://twitter.com/yourcompany" style="margin:0 5px"><img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716249600&semt=ais_user" alt="Twitter" style="width:32px"></a><a href="https://instagram.com/yourcompany" style="margin:0 5px"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7-0xfKFBqt9MIsyKA3el52qEj9htrawhjM6ppqNIuQ&s" alt="Instagram" style="width:32px"></a></div></div></div></body>
        `,
  };
  const result = await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    }
    return info;
  });
};
