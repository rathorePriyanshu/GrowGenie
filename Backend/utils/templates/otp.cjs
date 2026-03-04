const otpTemplate = (otp) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="480" style="background:#ffffff;padding:40px;border-radius:8px;">
          <tr>
            <td align="center"><h2>Verify Your Email</h2></td>
          </tr>
          <tr>
            <td style="color:#444;font-size:16px;padding-bottom:20px;">
              Hi,<br/><br/>
              Use the verification code below:
            </td>
          </tr>
          <tr>
            <td align="center">
              <div style="font-size:32px;font-weight:bold;letter-spacing:8px;">
                ${otp}
              </div>
            </td>
          </tr>
          <tr>
            <td style="color:#666;font-size:14px;padding-top:20px;">
              This code expires in 10 minutes.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = otpTemplate;