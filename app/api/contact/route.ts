import { Resend } from 'resend'
import { NextResponse } from 'next/server'

type ContactPayload = {
  name: string
  email: string
  message: string
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is missing RESEND_API_KEY' },
      { status: 500 }
    )
  }

  let payload: ContactPayload
  try {
    payload = (await req.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const name = payload.name?.trim()
  const email = payload.email?.trim()
  const message = payload.message?.trim()

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'name, email and message are required' },
      { status: 400 }
    )
  }

  const resend = new Resend(apiKey)

  // For production: set a verified sending domain in Resend.
  // For quick testing you can use the default onboarding sender.
  // If Resend rejects the sender, update FROM_EMAIL below accordingly.
  const FROM_EMAIL = 'AtlasKodo <onboarding@resend.dev>'

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: ['chalkhaachraf21@gmail.com'],
      replyTo: email,
      subject: `New message from AtlasKodo.dev — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ ok: true, id: result.data?.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
