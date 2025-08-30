// components/emails/setPasswordEmail.js

const generateSetPasswordEmail = (name, link, role) => {
  return {
    subject: "Set Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f7f9fc; padding: 20px; border-radius: 8px; border: 1px solid #e1e4e8;">
        <h2 style="color: #1e3a8a;">Welcome, ${name}!</h2>
        
        <p style="font-size: 16px; color: #374151;">
          You've been registered as <strong>${role}</strong>. 
          <br />
          To activate your account, please set your password by clicking the button below.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" 
            style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
            Set Your Password
          </a>
        </div>

        <p style="font-size: 14px; color: #6b7280;">
          If the button doesn't work, copy and paste the following link into your browser:
        </p>
        <p style="word-break: break-all; font-size: 14px; color: #2563eb;">${link}</p>

        <p style="font-size: 14px; color: #6b7280;">
          This link will expire in 15 minutes.
        </p>

        <p style="font-size: 14px; color: #9ca3af; margin-top: 30px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `
  };
};

module.exports = generateSetPasswordEmail;
