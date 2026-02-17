import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, subject, message } = req.body;

    try {
        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            // to: 'neverpayforadvertising@gmail.com',
            subject: `New message from ${name}`,
            html: `
                <p><strong>From:</strong> ${name}</p>
                // <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong><br/>${message}</p>
                `,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Email failed to send' });
    }
}
