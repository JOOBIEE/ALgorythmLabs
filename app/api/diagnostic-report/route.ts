import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { generateDiagnosticReport, diagnosticReportEmailHtml } from '@/lib/diagnosticReport'
import type { SystemKey } from '@/lib/systemMeta'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, answers } = await request.json()

    if (!name || !email || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const report = generateDiagnosticReport(name, answers as SystemKey[])

    // Send the styled report to the visitor
    await resend.emails.send({
      from: 'Algorythm Labs <onboarding@resend.dev>',
      to: email,
      subject: `Your Diagnostic Report — ${report.recommendedSystem}`,
      html: diagnosticReportEmailHtml(report),
    })

    // Internal lead notification
    await resend.emails.send({
      from: 'Algorythm Labs <onboarding@resend.dev>',
      to: 'algorythmshq@gmail.com',
      replyTo: email,
      subject: `New diagnostic report generated — ${name} (${report.recommendedSystem})`,
      text: `Name: ${name}\nEmail: ${email}\nRecommended System: ${report.recommendedSystem}\nSecondary signals: ${report.secondarySignals.join(', ') || 'none'}\nReport ID: ${report.reportId}`,
    })

    return NextResponse.json({ success: true, report })
  } catch (err) {
    console.error('Diagnostic report error:', err)
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}