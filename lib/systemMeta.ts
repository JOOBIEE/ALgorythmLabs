export type SystemKey = 'GROWTH' | 'OPS' | 'IDENTITY' | 'PRESENCE'

export const systemDescriptions: Record<SystemKey, string> = {
  GROWTH: 'The iterative engine of customer acquisition and market capture.',
  OPS: 'The internal skeletal structure of process and task efficiency.',
  IDENTITY: 'The immutable core of brand definition and linguistic accuracy.',
  PRESENCE: 'Omnichannel digital footprint anchored in technical performance.',
}

export const systemNextSteps: Record<SystemKey, string[]> = {
  GROWTH: [
    'Audit current acquisition channels for leak points',
    'Build a repeatable, trackable acquisition pipeline',
    'Install measurement so every lead source is attributable',
  ],
  OPS: [
    'Map the current workflow end-to-end, no assumptions',
    'Identify the manual tasks quietly consuming the most time',
    'Deploy lightweight systems the team will actually use',
  ],
  IDENTITY: [
    'Define the core brand narrative and voice, in writing',
    'Audit visual and verbal consistency across every touchpoint',
    'Build a brand system that scales without diluting',
  ],
  PRESENCE: [
    'Audit site and product performance against real benchmarks',
    'Unify messaging across every channel it appears on',
    'Fix the single highest-leverage conversion leak first',
  ],
}