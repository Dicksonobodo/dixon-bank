const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure Gmail (REPLACE WITH YOUR GMAIL AND APP PASSWORD)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'obododickson7@gmail.com',     // ← Replace this
    pass: 'tpil agmu hddf yawr'          // ← Replace this (16-character password from Gmail)
  }
});

// Function triggered when a new transaction is created
exports.sendTransactionEmail = functions.firestore
  .document('transactions/{transactionId}')
  .onCreate(async (snap, context) => {
    const transaction = snap.data();
    const transactionId = context.params.transactionId;

    console.log('New transaction created:', transactionId);

    try {
      // Get receiver's email
      const receiverDoc = await admin.firestore()
        .collection('users')
        .doc(transaction.receiverId)
        .get();

      if (!receiverDoc.exists) {
        console.error('Receiver not found');
        return null;
      }

      const receiver = receiverDoc.data();
      const receiverEmail = receiver.email;

      console.log('Sending email to:', receiverEmail);

      // Currency symbols
      const currencySymbols = {
        'USD': '$',
        'GBP': '£',
        'EUR': '€'
      };
      const symbol = currencySymbols[transaction.currency] || '$';

      // Email content
      const mailOptions = {
        from: 'PayBank <obododickson7@gmail.com>',  // ← Replace with your email
        to: receiverEmail,
        subject: `💰 You received ${symbol}${transaction.amount.toLocaleString()} from ${transaction.senderName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #2C2E2F;
                background-color: #F5F7FA;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #FFFFFF;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #0070BA;
                padding: 40px 24px;
                text-align: center;
                color: white;
              }
              .logo {
                width: 64px;
                height: 64px;
                background-color: #FFFFFF;
                border-radius: 12px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                font-weight: 700;
                color: #0070BA;
                margin-bottom: 16px;
              }
              .content {
                padding: 40px 24px;
              }
              .success-icon {
                text-align: center;
                font-size: 60px;
                margin-bottom: 20px;
              }
              .amount {
                text-align: center;
                margin: 30px 0;
              }
              .amount-value {
                color: #28A745;
                font-size: 36px;
                font-weight: 700;
                margin: 10px 0;
              }
              .details {
                background-color: #F5F7FA;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              }
              .detail-row {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                padding: 8px 0;
                border-bottom: 1px solid #E5E7EB;
              }
              .detail-label {
                color: #6C757D;
                font-weight: 500;
              }
              .detail-value {
                color: #2C2E2F;
                font-weight: 600;
              }
              .note {
                background-color: #E6F4FF;
                border-left: 4px solid #0070BA;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer {
                background-color: #F5F7FA;
                padding: 24px;
                text-align: center;
                border-top: 1px solid #E5E7EB;
                color: #6C757D;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">$</div>
                <h1>PayBank</h1>
              </div>

              <div class="content">
                <div class="success-icon">✅</div>
                <h2 style="text-align: center; color: #28A745;">Money Received!</h2>
                
                <div class="amount">
                  <p style="color: #6C757D; margin: 0;">Amount Received</p>
                  <div class="amount-value">+${symbol}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>

                <div class="details">
                  <h3 style="margin-top: 0;">Transaction Details</h3>
                  <div class="detail-row">
                    <span class="detail-label">From</span>
                    <span class="detail-value">${transaction.senderName}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${transaction.senderEmail}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Date</span>
                    <span class="detail-value">${new Date(transaction.timestamp).toLocaleString()}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Transaction ID</span>
                    <span class="detail-value">${transactionId.slice(0, 12)}...</span>
                  </div>
                </div>

                ${transaction.note ? `
                  <div class="note">
                    <strong>Note:</strong> "${transaction.note}"
                  </div>
                ` : ''}

                <p style="text-align: center; color: #6C757D; margin-top: 30px;">
                  Your balance has been updated in your PayBank account.
                </p>
              </div>

              <div class="footer">
                <p>This is an automated message from PayBank.</p>
                <p>© ${new Date().getFullYear()} PayBank. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully to:', receiverEmail);
      return null;

    } catch (error) {
      console.error('❌ Error sending email:', error);
      return null;
    }
  });