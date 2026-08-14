import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message, system } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Algorythm Labs <onboarding@resend.dev>', // swap once your domain is verified in Resend
      to: 'algorythmshq@gmail.com',
      replyTo: email,
      subject: `New inquiry from ${name}${system ? ` — ${system}` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nRecommended System: ${system || 'N/A'}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}