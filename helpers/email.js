var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // true for 465, false for other ports
    auth: {
        // user: 'matt@moonello.com',
        // pass: '#Vmoca987'
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD // generated ethereal password
    }
})

module.exports = {
    sendFeedbackEmail(data) {
        transporter.sendMail({
            from: 'Virginia Moca <vmoca.org>', // sender address
            to: 'jayesh203.jp@gmail.com', // list of receivers
            subject: "Feedback Email", // Subject line
            html: ` 
            <h3>Is Member of VMOCA ? : ${data.member}</h3> <h3>Any Children below 18 ? : ${data.childrean}</h3>` // html body

        })
    },
    sendTicketEmail(user, eventDetail, noOfTickets) {
        transporter.sendMail({
            from: 'Virginia Moca <vmoca.org>', // sender address
            to: user['Email 1'], // list of receivers
            subject: "Ticket Confirmed!", // Subject line
            html: `<!doctype html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Simple Transactional Email</title>
                <style>
                /* -------------------------------------
                    INLINED WITH htmlemail.io/inline
                ------------------------------------- */
                /* -------------------------------------
                    RESPONSIVE AND MOBILE FRIENDLY STYLES
                ------------------------------------- */
                @media only screen and (max-width: 620px) {
                  table[class=body] h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important;
                  }
                  table[class=body] p,
                        table[class=body] ul,
                        table[class=body] ol,
                        table[class=body] td,
                        table[class=body] span,
                        table[class=body] a {
                    font-size: 16px !important;
                  }
                  table[class=body] .wrapper,
                        table[class=body] .article {
                    padding: 10px !important;
                  }
                  table[class=body] .content {
                    padding: 0 !important;
                  }
                  table[class=body] .container {
                    padding: 0 !important;
                    width: 100% !important;
                  }
                  table[class=body] .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                  }
                  table[class=body] .btn table {
                    width: 100% !important;
                  }
                  table[class=body] .btn a {
                    width: 100% !important;
                  }
                  table[class=body] .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important;
                  }
                }
        
                /* -------------------------------------
                    PRESERVE THESE STYLES IN THE HEAD
                ------------------------------------- */
                @media all {
                  .ExternalClass {
                    width: 100%;
                  }
                  .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                    line-height: 100%;
                  }
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                  }
                  #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                  }
                  .btn-primary table td:hover {
                    background-color: #34495e !important;
                  }
                  .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important;
                  }
                }
                </style>
              </head>
              <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
                  <tr>
                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                    <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                      <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
        
                        <!-- START CENTERED WHITE CONTAINER -->
                        <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
        
                          <!-- START MAIN CONTENT AREA -->
                          <tr>
                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                <tr>
                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi ${user['First Name']},</p>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Congratulations, You ticket for Event ${eventDetail.name} is confirmed. Here are the details of Event.</p>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Event Start Date : ${eventDetail.eventDates.startDate}</p>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Event End Date : ${eventDetail.eventDates.endDate}<v/p>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Time Zone : ${eventDetail.eventDates.timeZone.name}<v/p>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Number of Tickets : ${noOfTickets}<v/p>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Good luck! Hope it works.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
        
                        <!-- END MAIN CONTENT AREA -->
                        </table>
                      <!-- END CENTERED WHITE CONTAINER -->
                      </div>
                    </td>
                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                  </tr>
                </table>
              </body>
            </html>` // html body
        })
    }
}