// Import the email service
const { sendEmail } = require('../services/EmailService');

const sendBookingConfirmationEmail = async (req, res) => {
    const { userEmail, userName, tourName, seats, totalAmount } = req.body;

    try {
        // Compose the email content
        const subject = 'Booking Confirmation - Tour Booked Successfully!';
        const text = `Hello ${userName},\n\nThank you for booking the ${tourName} tour. You have booked ${seats} seats, and the total cost is $${totalAmount}.\n\nSafe Travels!\nTravel Company`;
        const html = `
            <h3>Hello ${userName},</h3>
            <p>Thank you for booking the <strong>${tourName}</strong> tour.</p>
            <p>You have booked <strong>${seats}</strong> seats, and the total cost is <strong>$${totalAmount}</strong>.</p>
            <p>Safe Travels!</p>
            <p><strong>Travel With Awais</strong></p>
        `;

        await sendEmail(userEmail, subject, text, html);

        // Return success response
        res.status(200).json({ message: 'Booking confirmation email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

module.exports = {
    sendBookingConfirmationEmail,
};
