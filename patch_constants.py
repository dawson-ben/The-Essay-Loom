import re

with open('src/constants.ts', 'r') as f:
    content = f.read()

new_patterns = """  {
    id: "hj-post-mortem",
    name: "The Post-Mortem (Failed Ordeal First)",
    description: "Opens with the aftermath of failure.",
    compatibleTrackId: "heros_journey",
    layout: [
      { promptId: "the_ordeal", label: "The Failed Ordeal", targetRangePercentage: [15, 20] },
      { promptId: "inciting_incident", label: "The Inciting Incident", targetRangePercentage: [10, 15] },
      { promptId: "crossing_threshold", label: "The Commitment", targetRangePercentage: [10, 15] },
      { promptId: "special_world", label: "The Unfamiliar World", targetRangePercentage: [15, 20] },
      { promptId: "winning_action", label: "The Winning Action", targetRangePercentage: [15, 20] },
      { promptId: "essential_belief", label: "The Essential Belief", targetRangePercentage: [10, 15] }
    ]
  },
  {
    id: "hj-catalyst-anchor",
    name: "The Catalyst Anchor (The Object Lesson)",
    description: "Opens with a hyper-focus on a specific object or memory.",
    compatibleTrackId: "heros_journey",
    layout: [
      { promptId: "the_catalyst", label: "The Internal Catalyst", targetRangePercentage: [10, 15] },
      { promptId: "ordinary_world", label: "The Ordinary World", targetRangePercentage: [10, 15] },
      { promptId: "inciting_incident", label: "The Inciting Incident", targetRangePercentage: [10, 15] },
      { promptId: "the_ordeal", label: "The Ordeal", targetRangePercentage: [15, 20] },
      { promptId: "winning_action", label: "The Winning Action", targetRangePercentage: [15, 20] },
      { promptId: "essential_belief", label: "The Essential Belief", targetRangePercentage: [10, 15] }
    ]
  },
  {
    id: "hj-reluctant-hook",
    name: "The Reluctant Hook (Starting with Hesitation)",
    description: "Starts at the moment of maximum internal resistance.",
    compatibleTrackId: "heros_journey",
    layout: [
      { promptId: "hesitation_doubt", label: "The Hesitation", targetRangePercentage: [10, 15] },
      { promptId: "ordinary_world", label: "The Ordinary World", targetRangePercentage: [10, 15] },
      { promptId: "inciting_incident", label: "The Inciting Incident", targetRangePercentage: [10, 15] },
      { promptId: "crossing_threshold", label: "The Commitment", targetRangePercentage: [10, 15] },
      { promptId: "the_ordeal", label: "The Ordeal", targetRangePercentage: [20, 25] },
      { promptId: "essential_belief", label: "The Essential Belief", targetRangePercentage: [10, 15] }
    ]
  },
  {
    id: "hj-parallel-track",
    name: "The Parallel Track (Dual Timeline)",
    description: "Alternates environments.",
    compatibleTrackId: "heros_journey",
    layout: [
      { promptId: "ordinary_world", label: "The Ordinary World", targetRangePercentage: [10, 15] },
      { promptId: "special_world", label: "The Unfamiliar World", targetRangePercentage: [15, 20] },
      { promptId: "inciting_incident", label: "The Inciting Incident", targetRangePercentage: [10, 15] },
      { promptId: "stakes_risk", label: "The Stakes", targetRangePercentage: [10, 15] },
      { promptId: "the_ordeal", label: "The Ordeal", targetRangePercentage: [15, 20] },
      { promptId: "winning_action", label: "The Winning Action", targetRangePercentage: [10, 15] },
      { promptId: "essential_belief", label: "The Essential Belief", targetRangePercentage: [10, 15] }
    ]
  },
  {
    id: "hj-sudden-setback",
    name: "Sudden Setback",
    description: "A character falls into a crisis and claws their way out.",
    compatibleTrackId: "heros_journey",
    layout: [
      { promptId: "ordinary_world", label: "The Ordinary World", targetRangePercentage: [10, 15] },
      { promptId: "inciting_incident", label: "The Inciting Incident", targetRangePercentage: [10, 15] },
      { promptId: "the_ordeal", label: "The Ordeal", targetRangePercentage: [20, 25] },
      { promptId: "the_catalyst", label: "The Internal Catalyst", targetRangePercentage: [10, 15] },
      { promptId: "winning_action", label: "The Winning Action", targetRangePercentage: [15, 20] },
      { promptId: "essential_belief", label: "The Essential Belief", targetRangePercentage: [10, 15] }
    ]
  },
  {
    id: "hj-student-passion",
    name: "Student Meets Passion",
    description: "Finding a passion, losing it to burnout/competition, and rebuilding.",
    compatibleTrackId: "heros_journey",
    layout: [
      { promptId: "inciting_incident", label: "The Inciting Incident", targetRangePercentage: [10, 15] },
      { promptId: "special_world", label: "The Unfamiliar World", targetRangePercentage: [15, 20] },
      { promptId: "the_ordeal", label: "The Ordeal", targetRangePercentage: [20, 25] },
      { promptId: "the_catalyst", label: "The Internal Catalyst", targetRangePercentage: [10, 15] },
      { promptId: "winning_action", label: "The Winning Action", targetRangePercentage: [15, 20] },
      { promptId: "essential_belief", label: "The Essential Belief", targetRangePercentage: [10, 15] }
    ]
  },
  {
    id: "hj-cinderella",
    name: "Cinderella (The False Peak)",
    description: "An initial unearned rise, a devastating fall to rock bottom, and a final earned rise.",
    compatibleTrackId: "heros_journey",
    layout: [
      { promptId: "ordinary_world", label: "The Ordinary World", targetRangePercentage: [5, 10] },
      { promptId: "special_world", label: "The Unfamiliar World", targetRangePercentage: [15, 20] },
      { promptId: "the_ordeal", label: "The Ordeal", targetRangePercentage: [20, 25] },
      { promptId: "the_catalyst", label: "The Internal Catalyst", targetRangePercentage: [10, 15] },
      { promptId: "winning_action", label: "The Winning Action", targetRangePercentage: [15, 20] },
      { promptId: "essential_belief", label: "The Essential Belief", targetRangePercentage: [10, 15] }
    ]
  }
];"""

content = re.sub(r'  \}\n\];', '  },\n' + new_patterns, content)

with open('src/constants.ts', 'w') as f:
    f.write(content)
