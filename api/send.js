export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { name, subject, message } = req.body;

    const recipient = process.env.CONTACT_EMAIL; // your email

    // send email logic here
    // e.g., using Resend, Nodemailer, or other service

    res.status(200).json({ success: true });
}
