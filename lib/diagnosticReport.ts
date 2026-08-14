import { systemDescriptions, systemNextSteps, type SystemKey } from './systemMeta'

export interface DiagnosticReportContent {
  reportId: string
  timestamp: string
  name: string
  recommendedSystem: SystemKey
  systemDescription: string
  secondarySignals: SystemKey[]
  nextSteps: string[]
}

export function generateDiagnosticReport(
  name: string,
  answers: SystemKey[]
): DiagnosticReportContent {
  const counts = answers.reduce<Record<string, number>>((acc, s) => {
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const recommendedSystem = sorted[0][0] as SystemKey
  const secondarySignals = sorted
    .slice(1)
    .filter(([, count]) => count > 0)
    .map(([system]) => system as SystemKey)

  const reportId = `DR-${Date.now().toString(36).toUpperCase()}`

  return {
    reportId,
    timestamp: new Date().toISOString(),
    name,
    recommendedSystem,
    systemDescription: systemDescriptions[recommendedSystem],
    secondarySignals,
    nextSteps: systemNextSteps[recommendedSystem],
  }
}

export function diagnosticReportEmailHtml(content: DiagnosticReportContent): string {
  const nextStepsHtml = content.nextSteps
    .map((step) => `<li style="margin-bottom:8px;">${step}</li>`)
    .join('')

  const secondaryHtml =
    content.secondarySignals.length > 0
      ? `<p style="color:#737373;font-size:13px;margin-top:24px;">Secondary signals detected: ${content.secondarySignals.join(', ')}</p>`
      : ''

  return `
  <div style="font-family:'Courier New',monospace;background:#0a0a0a;color:#ffffff;padding:40px;max-width:560px;margin:0 auto;">
    <p style="font-size:11px;text-transform:uppercase;color:#9a9a9a;letter-spacing:1px;">Live Document Transmission</p>
    <h1 style="font-size:24px;margin:8px 0 0;">Diagnostic Report: ${content.name}</h1>
    <p style="font-size:11px;color:#9a9a9a;margin-top:8px;">
      Report ID: ${content.reportId} &nbsp;·&nbsp; ${new Date(content.timestamp).toLocaleDateString()}
    </p>

    <div style="border-top:1px solid #2a2a2a;margin-top:24px;padding-top:24px;">
      <p style="font-size:11px;text-transform:uppercase;color:#9a9a9a;">Recommended System</p>
      <h2 style="font-size:20px;margin:8px 0;">${content.recommendedSystem}</h2>
      <p style="color:#b3b3b3;line-height:1.6;">${content.systemDescription}</p>
    </div>

    <div style="border-top:1px solid #2a2a2a;margin-top:24px;padding-top:24px;">
      <p style="font-size:11px;text-transform:uppercase;color:#9a9a9a;">Recommended Next Steps</p>
      <ul style="color:#b3b3b3;line-height:1.6;padding-left:20px;margin-top:8px;">
        ${nextStepsHtml}
      </ul>
    </div>

    ${secondaryHtml}

    <div style="border-top:1px solid #2a2a2a;margin-top:32px;padding-top:24px;">
      <p style="color:#b3b3b3;font-size:13px;">
        Reply directly to this email, or reach us at
        <a href="mailto:algorythmshq@gmail.com" style="color:#ffffff;">algorythmshq@gmail.com</a>
        to start on this.
      </p>
    </div>
  </div>
  `
}