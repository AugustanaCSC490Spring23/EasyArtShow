// const nodemailer = require('nodemailer');

// const contactForm = async (name, email, message) => {
//   try {
//     // Create a transporter object with your email service credentials
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'easyartshow01@gmail.com',
//         pass: 'Easyartshow'
//       }
//     });

//     // Define the email options
//     const mailOptions = {
//       from: 'your-email-address@gmail.com',
//       to: 'easyartshow01@gmail.com',
//       subject: 'New message from Contact Us form',
//       html: `
//         <p>Name: ${name}</p>
//         <p>Email: ${email}</p>
//         <p>Message: ${message}</p>
//       `
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent');
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = contactForm;