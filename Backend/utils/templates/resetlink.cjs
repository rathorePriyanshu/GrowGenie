const resetPasswordTemplate = (resetLink) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="480" style="background:#ffffff;padding:40px;border-radius:8px;">
          <tr>
            <td align="center"><h2>Reset Your Password</h2></td>
          </tr>
          <tr>
            <td style="color:#444;font-size:16px;padding-bottom:20px;">
              Hi,<br/><br/>
              Click below to reset your password.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:30px 0;">
              <a href="${resetLink}" 
                 style="background:#111;color:#fff;text-decoration:none;
                        padding:14px 28px;border-radius:6px;">
                Reset Password
              </a>
            </td>
          </tr>
          <tr>
            <td style="color:#666;font-size:14px;">
              This link expires in 15 minutes.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = resetPasswordTemplate;