import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.EMAIL_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message, mobileNumber } = await request.json();

        // Validate required fields
        if (!name || !email || !message || !mobileNumber) {
            throw new Error('Missing required details: name, mobileNumber, email, or message.');
        }

        // Admin Email Template
        const adminEmailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                h1 {
                    color: #000000;
                    text-align: center;
                }
                .detail {
                    margin-bottom: 10px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>New Contact Form Submission</h1>
                <p class="detail"><strong>Name:</strong> ${name}</p>
                <p class="detail"><strong>Email:</strong> ${email}</p>
                <p class="detail"><strong>Mobile Number:</strong> ${mobileNumber}</p>
                <p class="detail"><strong>Message:</strong> ${message}</p>
                <div class="footer">
                    <p>This email was sent via your website contact form.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Send Admin Email
        const adminResponse = await resend.emails.send({
            from: 'Jagath Travels <noreply@jagathtravels.com>',
            to: 'info@srilankajagathtours.com',
            subject: 'New Contact Form Submission',
            html: adminEmailHtml,
        });

        if (adminResponse.error) throw new Error(adminResponse.error.message);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json({ error: 'Failed to send email', details: (error as Error).message }, { status: 500 });
    }
}
