/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PromptField, AntiPatternCard, GuideChapter, NarrativePattern } from './types';

export const NARRATIVE_PATTERNS: NarrativePattern[] = [
  {
    id: "hj-chronological",
    name: "Chronological",
    description: "The classic timeline. You start in your comfort zone, get pulled into a new challenge, and face your ordeal at the climax.",
    compatibleTrackId: "heros_journey",
    layout: [
      { promptId: "ordinary_world", label: "The Ordinary World", targetRangePercentage: [5, 10] },
      { promptId: "inciting_incident", label: "The Inciting Incident", targetRangePercentage: [5, 8] },
      { promptId: "hesitation_doubt", label: "The Hesitation", targetRangePercentage: [5, 8] },
      { promptId: "crossing_threshold", label: "The Commitment", targetRangePercentage: [5, 8] },
      { promptId: "special_world", label: "The Unfamiliar World", targetRangePercentage: [10, 14] },
      { promptId: "stakes_risk", label: "The Stakes", targetRangePercentage: [5, 7] },
      { promptId: "the_ordeal", label: "The Ordeal", targetRangePercentage: [15, 18] },
      { promptId: "the_catalyst", label: "The Internal Catalyst", targetRangePercentage: [5, 8] },
      { promptId: "winning_action", label: "The Winning Action", targetRangePercentage: [10, 14] },
      { promptId: "the_payoff", label: "The Payoff", targetRangePercentage: [5, 7] },
      { promptId: "essential_belief", label: "The Elixir", targetRangePercentage: [5, 10] },
      { promptId: "magic_elixir", label: "Applying the Elixir", targetRangePercentage: [5, 8] }
    ]
  },
  {
    id: "hj-in-media-res",
    name: "In Media Res",
    description: "Start right in the middle of the chaos. Open with your biggest complication, then flash back to how you got there.",
    compatibleTrackId: "heros_journey",
    layout: [
      { promptId: "the_ordeal", label: "The Hook (The Ordeal)", targetRangePercentage: [15, 18] },
      { promptId: "ordinary_world", label: "Flashback: The Ordinary World", targetRangePercentage: [5, 10] },
      { promptId: "inciting_incident", label: "The Inciting Incident", targetRangePercentage: [5, 8] },
      { promptId: "hesitation_doubt", label: "The Hesitation", targetRangePercentage: [5, 8] },
      { promptId: "crossing_threshold", label: "The Commitment", targetRangePercentage: [5, 8] },
      { promptId: "special_world", label: "The Unfamiliar World", targetRangePercentage: [10, 14] },
      { promptId: "stakes_risk", label: "The Stakes", targetRangePercentage: [5, 7] },
      { promptId: "the_catalyst", label: "The Internal Catalyst", targetRangePercentage: [5, 8] },
      { promptId: "winning_action", label: "The Winning Action", targetRangePercentage: [10, 14] },
      { promptId: "the_payoff", label: "The Payoff", targetRangePercentage: [5, 7] },
      { promptId: "essential_belief", label: "The Elixir", targetRangePercentage: [5, 10] },
      { promptId: "magic_elixir", label: "Applying the Elixir", targetRangePercentage: [5, 8] }
    ]
  },
  {
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
];

export const HEROS_JOURNEY_PROMPTS: PromptField[] = [
  // Phase 1: The Heart
  { 
    id: 'story_selection', 
    label: 'Working Title', 
    subtitle: 'What is your story about?', 
    description: 'Give your story a quick, memorable title or a short tagline just to remind yourself what you\'re writing about.', 
    placeholder: 'e.g., The "Camp Counselor" Story, or "The three-day syntax error panic"...', 
    tip: 'Avoid trying to write everything yet. Focus on a single slice of time where something interesting happened.', 
    tools: ['excavator']
  },
  { 
    id: 'transformation_formula', 
    label: 'Your Transformation', 
    subtitle: 'How did you change?', 
    description: 'Fill in the core equation of your growth: "I used to be [blank], but after [this story], I became [blank]."', 
    placeholder: 'I used to be a shy perfectionist... I became an engaged, resilient leader...', 
    tip: 'Focus on transformations of character, self-identity, or mindset rather than external awards.', 
    pitfallWarning: 'Avoid the "Kuzco trap" (going from selfish to marginally less selfish).'
  },
  { 
    id: 'essential_belief', 
    label: 'The Elixir', // Updated as discussed previously
    subtitle: 'What is your essential belief?', 
    description: 'The Elixir is the deeper lesson, mindset, or new worldview that you now carry with you.', 
    placeholder: 'e.g. "Messy discovery is stickier than a tidy lecture..."', 
    tip: 'This is the guiding philosophy of your essay. It represents the inner values that dictate your choices.'
  },
  { 
    id: 'magic_elixir', 
    label: 'Applying the Elixir', 
    subtitle: 'How will you apply this wisdom?', 
    description: 'How do you or will you apply this earned wisdom to benefit your classmates, family, community, or the world?', 
    placeholder: 'e.g., "I bring this experimental, Saturday-engineering mindset to your materials research labs..."', 
    tip: 'Connect your internal change to how you live today and your future actions at college. Frame it as an active promise of character.', 
    tools: ['montage'] 
  },

  // Phase 2: The Setup
  { 
    id: 'ordinary_world', 
    label: 'The Ordinary World', 
    subtitle: 'What was your life like before?', 
    description: 'Describe where you started (your safe, familiar comfort zone, routine, or mindset).', 
    placeholder: 'e.g. Quiet supply room with structured list inventories...',
    tip: 'Define the "before" state so the reader can measure your psychological transformation.', 
    tools: ['montage'] 
  },
  { 
    id: 'special_world', // Fixed ID to match guides
    label: 'The Unfamiliar World', 
    subtitle: 'What was the chaotic new world like?', 
    description: 'Describe the chaotic, unpredictable, or challenging new world you were forced to navigate.', 
    placeholder: 'e.g. The muddy shore of Lake George with twenty screaming kids...', 
    tip: 'Show the visual and environmental contrast to emphasize the psychological distance you had to cross.', 
    tools: ['montage'] 
  },
  { 
    id: 'inciting_incident', 
    label: 'The Catalyst / Incident', 
    subtitle: 'What was the Inciting Incident?', 
    description: 'What broke your status quo and called you out of your comfort zone?', 
    placeholder: 'e.g., The head developer contracted flu, leaving the codebase in my hands...', 
    tip: 'In an essay, it is the unexpected change that forces a choice.', 
    tools: ['bullet_time'] // Fixed typo from 'bullet_time'
  },
  { 
    id: 'hesitation_doubt', 
    label: 'The Hesitation', 
    subtitle: 'How did you hesitate or doubt yourself?', 
    description: 'Explain your internal hesitation. Why did you want to cling to your Ordinary World?', 
    placeholder: 'e.g. I felt like an imposter. I secretly hoped they would cancel the class...', 
    tip: 'Action stars who go into battles without fear are boring. Admissions readers love hearing about your genuine doubts.', 
    tools: ['bullet_time'] // Fixed typo
  },
  { 
    id: 'crossing_threshold', 
    label: 'The Commitment', 
    subtitle: 'When did you cross the threshold?', 
    description: 'Describe the precise moment you made the commitment. You stepped through the door, with no turning back.', 
    placeholder: 'e.g. I unlocked the Science Shed, turned on the hum of the fluorescent bulb, and signed my name on the board.', 
    tip: 'This is the active crossing point. Make it physical!', 
    tools: ['bullet_time'] // Fixed typo
  },

  // Phase 3: The Climax
  { 
    id: 'stakes_risk', 
    label: 'The Stakes', 
    subtitle: 'What was at risk?', 
    description: 'What quiet, internal, or emotional stakes were on the line? Avoid life-or-death drama.', 
    placeholder: 'e.g. My credibility as an organizer, my ego as an all-powerful leader...', 
    tip: 'Pixar Rule: We admire a character more for trying than for succeeding. Keep risks completely grounded.'
  },
  { 
    id: 'the_ordeal', // Fixed ID to match guides
    label: 'The Ordeal', 
    subtitle: 'What was the key complication?', 
    description: 'Describe the pivot or unexpected complication of your story—the moment where things got particularly difficult or confusing.', 
    placeholder: 'e.g. Mid-lesson, everything descended into chaos. The chemical experiment bubbled over...', 
    tip: 'Do NOT inflate this into a life-or-death battlefield! Grounded honesty is far more compelling.', 
    tools: ['bullet_time'] // Fixed typo
  },
  { 
    id: 'the_catalyst', 
    label: 'The Internal Catalyst', 
    subtitle: 'What realization helped you break through?', 
    description: 'What internal realization, memory, piece of advice, or core value did you suddenly grasp when you were stuck?', 
    placeholder: 'e.g. I remembered my dad\'s Saturday challenges. I realized I didn\'t need to be professional...', 
    tip: 'Ensure this is an internal shift. The Catalyst is an idea you choose to embrace.'
  },
  { 
    id: 'winning_action', 
    label: 'The Winning Action', 
    subtitle: 'What specific action did you take to solve the problem?', 
    description: 'Describe the specific, agency-driven choice you made to overcome the complication.', 
    placeholder: 'e.g. I threw the lesson plan into the recycling bin and asked who wanted to launch water-bottle rockets.', 
    tip: 'Use active verbs. Show us the messy work of fixing the issue rather than skipping straight to the victory.', 
    tools: ['bullet_time'] // Fixed typo
  },
  { 
    id: 'the_payoff', // Removed '14.'
    label: 'The Payoff', 
    subtitle: 'What was the immediate result?', // Added missing subtitle
    description: 'What was the immediate, short-term result of your action?', 
    placeholder: 'e.g. The campers stopped yelling, sat in a circle in the mud, and successfully guessed the density of five different fruits.', 
    tip: 'Keep this brief. The scoreboard victory is just the bridge to your real transformation.'
  }
];

export const DIFFERENT_BUT_TRUTHFUL_PROMPTS: PromptField[] = [
  {
    id: 'authenticity_declaration',
    label: 'The Silent Admission',
    subtitle: 'What is your quiet trait?',
    description: 'Break down the polished, flawless applicant facade. Introduce yourself with an honest, striking moment of absolute vulnerability—focusing on a quiet, underrepresented trait.',
    placeholder: 'e.g., "I am not the roaring captain of the debate team..."',
    tip: 'Start with a humble, distinctive admission that breaks free from typical bragging and displays comfortable self-acceptance.',
    tools: ['montage', 'excavator']
  },
  {
    id: 'dt_tipping_point',
    label: 'The Tipping Point',
    subtitle: 'Where was this trait tested?',
    description: 'Pinpoint a specific scene where this under-the-radar trait was tested by friction or reality. Note: A quiet, unexpected complication is far more honest than a melodramatic life-or-death crisis.',
    placeholder: 'e.g., "During the annual food drive, the primary logistics software crashed..."',
    tip: 'Set the physical scene.',
    tools: ['bullet_time']
  },
  {
    id: 'real_stories_triumph',
    label: 'The Unseen Labor',
    subtitle: 'How did you handle the friction?',
    description: 'Detail the precise, messy, hands-on steps you took to handle this friction. Avoid grand savior speeches; show us the work.',
    placeholder: 'e.g., "I realized leadership did not require a megaphone..."',
    tip: 'Focus heavily on verbs.',
    tools: ['bullet_time']
  },
  {
    id: 'reflection_lessons',
    label: 'The Messy Spectrum Reflection',
    subtitle: 'How did this redefine your contribution?',
    description: 'Analyze how this event redefined your sense of contribution. Why does modern human growth happen on a continuous, messy spectrum of effort rather than clean storybook beats?',
    placeholder: 'e.g., "Watching that watermelon bob on the lake as twenty kids screamed in wonder taught me..."',
    tools: ['montage']
  },
  {
    id: 'authenticity_promise',
    label: 'The Quiet Integration',
    subtitle: 'How will you apply this on campus?',
    description: 'Connect your humble, tested trait directly to how you will support or enrich your future college campus, academic lab, or dorm circle.',
    placeholder: 'e.g., "I promise to bring this quiet, detail-focused engineering philosophy..."',
    tip: 'Frame this as a modest promise. Avoid sounding like a savior.',
    tools: ['montage']
  }
];

export const INTELLECTUAL_JOURNEY_PROMPTS: PromptField[] = [
  {
    id: 'ij_obsession',
    label: 'The Intellectual Spark',
    subtitle: 'What puzzle keeps you up at night?',
    description: 'What specific puzzle, idea, paradox, historical question, or scientific loop keeps you up at night? Do not write a generic summary of "loving biology"—show us the specific "itchy" question or contradiction you had to explore.',
    placeholder: 'e.g. Why do some systems thrive on entropy? Trying to reconcile dual-aspect monism...',
    tip: 'Focus on the organic curiosity. Let us hear your human voice.',
    tools: ['montage', 'excavator']
  },
  {
    id: 'ij_dissonance',
    label: 'Complicating the Theory',
    subtitle: 'What disrupted your initial view?',
    description: 'As you pursued this obsession, what unexpected counter-evidence, philosophical tension, or societal paradox emerged that disrupted your initial simplistic view?',
    placeholder: 'e.g. The data completely contradicted my assumption...',
    tip: 'Intellectual maturity is shown when you accept that your favorite theories are messy or incomplete.',
    tools: ['bullet_time']
  },
  {
    id: 'ij_pivot',
    label: 'The Synthesizing Pivot',
    subtitle: 'How did you reconcile the tension?',
    description: 'How did you reconcile this tension? Describe your logical thought process or analysis. What new mental model did you construct?',
    placeholder: 'e.g. I reconciled these opposing forces by synthesizing structural linguistics with sociology...',
    tip: 'Show us the step-by-step gears of your mind solving the complication. Avoid cinematic cliches like "suddenly I had a eureka moment!"',
    tools: ['bullet_time']
  },
  {
    id: 'ij_paradigm',
    label: 'The Intellectual Paradigm Shift',
    subtitle: 'What deeper truth do you now believe?',
    description: 'What deeper truth do you now believe about how knowledge is formed, or how human beings interact with complex ideas?',
    placeholder: 'e.g. Nuance is not hesitation; it is observation. Intellectual progress is not about finding clean answers...',
    tip: 'Formulate a genuine philosophical position. Avoid high-sounding academic fluff.',
    tools: ['montage']
  },
  {
    id: 'ij_promise',
    label: 'The Laboratory Promise',
    subtitle: 'How will you apply this mode of enquiry?',
    description: 'How will you apply this specific mode of enquiry and love of analytical complexity on our campus, in seminars, or in collaborative research labs?',
    placeholder: 'e.g. I bring this appetite for paradox to your critical theory seminars...',
    tip: 'Speak directly about academic dynamics. Frame your brain as a collaborative asset.',
    tools: ['montage']
  }
];

export const ANTI_PATTERNS: AntiPatternCard[] = [
  {
    id: 'resume_repeat',
    trap: 'The Resume Repeat',
    explanation: 'Listing accomplishments or extracurriculars in prose. This gives details but lacks a human soul.',
    fix: 'Choose a single slice of time. Select one specific moment that illustrates your values.',
    exampleBad: 'I have participated in Robotics for three years, serving as Secretary...',
    exampleGood: 'For three days, our robot, Barnaby, did nothing but spin in dizzying clockwise circles. As Secretary, I didn\'t build the wheels; instead, I stood over our lead programmer with a plate of lukewarm pizza...'
  },
  {
    id: 'voluntourism',
    trap: 'The "Voluntourism" Savior',
    explanation: 'Writing about traveling to a developing nation, helping residents, and realizing "I was the lucky one."',
    fix: 'Focus on a specific, micro-interaction where you personally failed, felt awkward, or were challenged. Make it about a relationship, not your own hollow virtue.',
    exampleBad: 'When I traveled to Guatemala to paint houses, I looked at the poor children... I realized how privileged I was...',
    exampleGood: 'Juana, aged nine, watched me paint her kitchen wall for ten minutes before snatching the roller. My expensive paint strokes were dripping badly; with three quick, practiced sweeps of her wrist, she smoothed my mess.'
  },
  {
    id: 'sports_highlight',
    trap: 'The Sports Highlight Reel',
    explanation: 'Describing the breathtaking final winning goal or winning the big championships.',
    fix: 'The physical scoreboard is boring. Read about the recovery, the hours spent on the bench, or the hard locker room leadership struggle.',
    exampleBad: 'The clock clicked down to five seconds. I took the ball, crossed over the defender... and floated the game-winning layup...',
    exampleGood: 'A torn ACL relegated me to a clipboard coordinator. From the bench, I didn\'t watch the ball; I watched our sophomore guard\'s shoulders. I learned to spot the exact moment her posture slumped...'
  },
  {
    id: 'trauma_dump',
    trap: 'The Trauma Dump',
    explanation: 'Sharing a highly painful event or raw tragedy and stopping there.',
    fix: 'Focus on the scar, not the wound. Devote 70% of your narrative to recovery, agency, and growth, and only 30% to the pain.',
    exampleBad: 'My leg was shattered in three places, and I spent six months in agonizing traction, crying every night...',
    exampleGood: 'The hospital traction rig became my library. Confined to a metal frame for six months, I couldn\'t walk, so I read. I taught myself intermediate Spanish using audiobook tapes...'
  },
  {
    id: 'passive_protagonist',
    trap: 'The Passive Protagonist',
    explanation: 'The student acts as a narrator of events that happened to them, rather than an active protagonist making choices. Things are solved by parents or luck.',
    fix: 'Make "I" the active grammatical subject of your sentences. Show yourself making hard decisions and actively picking up the pieces.',
    exampleBad: 'Eventually, the science instructor returned and showed us how to do the volcano experiment safely.',
    exampleGood: 'I threw the wet lectures into the bin. I grabbed a knife, cut a watermelon in half, and shouted, "We are going to see what floats!" I had to make the classroom up as I walked.'
  }
];

export const HANDBOOK_CHAPTERS: GuideChapter[] = [
  {
    id: 'blank_page',
    title: 'The Curse of the Blank Page',
    subtitle: 'Why starting with a plan is the secret to compelling writing',
    icon: 'Feather',
    tags: ['Introduction', 'The Blank Page', 'Planning'],
    content: `Writing college application essays is usually the most stressful part of the admissions process. It doesn't have to be. Students often make it harder–and their essays worse–by starting to type before they have a plan. The result? A rambling list of achievements or activities that isn't persuasive or memorable.

Admissions officers read thousands of files filled with impressive clubs, awards, and grades. These lists blur together because they provide data, not emotion. If you want to stand out, do what humans have done for millennia to connect with one another: tell a story. A resume tells them what you did. A story tells them who you are.`
  },
  {
    id: 'directors_chair',
    title: 'The Director’s Chair',
    subtitle: 'Structuring your essay like a screenplay',
    icon: 'Clapperboard',
    tags: ['Scriptwriting', 'Aesthetics', 'Storytelling'],
    content: `Think of writing your college application essays like making a movie. Most applicants try to be the director without a script, which is stressful and usually flops. They grab the camera and start filming random scenes—a trophy here, a club meeting there—hoping it magically makes sense in the editing room. They end up with a shaky, chaotic "highlight reel" that bores the audience.

A great director starts with a screenplay. She knows the ending before she films the beginning. She knows why a scene matters before she includes it.

### The Escalation Trap:
The most common trap for driven students is Forced Escalation—the belief that you need to make a mundane experience look like a life-or-death crisis. This leads to cartoonish melodrama. The external stakes aren’t nearly as interesting as the internal ones. You don’t need to fight a supervillain, save the world, or even save the day. Invulnerable superheroes are boring. If Superman doesn't have Kryptonite and the real possibility of losing, there's nothing to root for. What readers really want is to see your inner struggle and transformation. Keep your focus on your real, everyday feelings rather than exaggerated drama.`
  },
  {
    id: 'needs_a_story',
    title: 'Does the Prompt Need a Story?',
    subtitle: 'Triage your prompts to choose the right strategy',
    icon: 'Triage', // Using standard icon mapping maybe
    tags: ['Prompts', 'Strategy', 'Story vs. Logic'],
    content: `Not every college essay prompt requires a full narrative arc. You can categorize prompts into three different types to guide your approach:

* **Story-Driven Prompts (Narrative Essential):** These ask about identity, failure, growth, or a realization (e.g., "recount a time," "what did you learn"). This is where you use the Hero's Journey framework that we’ll cover next.
* **Analytical & Intellectual Prompts (Exposition Essential):** These are highly reflective, theoretical, or philosophical essays. They don't fit into standard "Once upon a time" story beats. Analytical thought and cognitive exploration should take priority over cinematic action. Use the Intellectual Journey track here.
* **Non-Story Prompts (Logic & Research Essential):** These require direct explanations of financial details, logistical updates, or specific academic theories. They demand facts, reasoning, and research rather than a narrative arc.`
  },
  {
    id: 'heros_journey_chapter',
    title: 'The Hero’s Journey',
    subtitle: 'Understanding the universal pattern of human psychology',
    icon: 'Compass',
    tags: ['Hero\'s Journey', 'Campbell', 'Narrative Beats'],
    content: `Joseph Campbell identified a pattern in great stories that spans cultures and centuries. In these stories, we see consistent "narrative beats" that resonate with human psychology:

1. **The Ordinary World:** We meet the hero in their normal, safe life. We get hints of how this comfort zone is quietly restrictive or flawed.
2. **The Inciting Incident:** The call to adventure. A problem or event disrupts the status quo, inviting or forcing the hero outside their comfort zone.
3. **Doubts & Hesitation:** The hero fears the unknown or is reluctant to change, often asking, "Why me?" Admitting your hesitation builds trust with the reader.
4. **The Commitment:** The hero commits to the journey and actively crosses the threshold into the unfamiliar world.
5. **The Unfamiliar World:** The hero faces challenges, handles everyday friction, fails a few times, and learns to work with allies.
6. **The Ordeal (Grounded Climax):** The moment of greatest vulnerability. This is a quiet moment of self-doubt or a simple mistake, not a life-or-death crisis.
7. **The Catalyst:** The specific insight, memory, piece of advice, or core value the hero remembers or embraces at their lowest point. This is the internal tool that unlocks their ability to move forward.
8. **The Winning Action:** The specific, agency-driven choice the hero makes to overcome the Ordeal. What did you actually do to solve the problem?
9. **The Payoff:** The immediate, short-term prize of your winning action (e.g., winning the game, getting the grade, fixing the car).
10. **The Elixir (The Return):** The long-term transformation and the real prize. The hero returns home with new power, perspective, or wisdom to benefit their community.

### Important: Beware the Melodrama Trap
Writers often feel pressure to turn the Ordeal into an action-movie explosion. But you don’t need a massive, fiery disaster to make a compelling story. Remember that internal stakes are always more important than external ones. Confronting or defying other people's perceptions of you isn’t nearly as transformative, or as courageous, as confronting your own limiting beliefs about yourself.`
  },
  {
    id: 'intellectual_journey_chapter',
    title: 'The Intellectual Journey',
    subtitle: 'For the analytical, philosophical, and scientific mind',
    icon: 'GraduationCap',
    tags: ['Scholarship', 'Philosophy', 'Paradox', 'Logic'],
    content: `Many brilliant, high-achieving applicants don't have a blockbuster "Hero's Journey" event—and forcing your love for coding or history into a dramatic, action-packed story, it ends up feeling fake and misses the real point of your growth. Real human growth frequently exists on a continuous, messy spectrum rather than in strictly discrete categories of "before" and "after". If you are writing about a book, a scientific curiosity, an artistic theory, or a philosophical concept, your progress is marked by growing analytical depth rather than physical, cinematic events.`
  },
  {
    id: 'pixar_rules',
    title: 'The Pixar Principles',
    subtitle: 'The physics of emotional resonance',
    icon: 'Sparkles',
    tags: ['Pixar', 'Stakes', 'Belief'],
    content: `* **Set Up the Stakes:** If nothing is at risk, your readers won't care whether you succeed or fail. The stakes don't need to be life-and-death, but we must understand why the outcome matters to you personally.
* **Admire the Struggle:** We admire a character vastly more for trying and struggling than for their effortless successes. Show us the sweat, the mistakes, and the dirty details. Perfection is alienating; struggle is relatable.
* **The Burning Belief:** What is the core belief burning inside you that this story illustrates? A story about a summer camp is just an anecdote. A story about your belief that "messy discovery is stickier than a tidy classroom" is a powerful statement of your values.`
  },
  {
    id: 'cinematic_writing',
    title: 'Cinematic Techniques',
    subtitle: 'Directing your essay with mechanical focus',
    icon: 'Tv',
    tags: ['Cinematography', 'Sensory Details', 'Montage'],
    content: `### Bullet Time (Slowing Down time)
When you reach key points in your story, like the climax or crossing the threshold, you can help the reader really sense the emotion by slowing things way, way down. Don't summarize by saying, "I got nervous." Instead, show rather than tell, zooming in on the sensory details—smells, skin temperature, ambient sounds, and the tightening of muscles. 

Think about "Bullet Time" in The Matrix or Spider-Man's "Spidey-Sense." When danger approaches, time freezes. The movie doesn't just show a wide shot of a cafeteria; it zooms in to show a single hair standing up on Peter's arm, the magnified sound of a fly buzzing, and a drop of sweat falling in slow motion. You can do the same thing with your words.

### The Montage (Speeding Up)
A montage efficiently strings together different time periods, events, images, or hobbies under one common theme. Montages usually rely on three or four quick examples to establish the pattern. This helps you cover years of accomplishments without boring the reader with dry chronological descriptions. You can also use it to capture the atmosphere of a single complex event.

**Important Note on Word Count:** Montages *feel* like they contain a lot of information, but they do not require high word counts! A good montage relies on brevity—striking, specific images separated by commas or short phrases, rather than full paragraphs of explanation.

*Example 1: The stillness of a practice field before dawn*
> "The 5:00 AM football field was entirely still: the frost-covered grass crunching under cold cleats, the electric hum of the solitary stadium light, and the quiet mist of breath hanging in the dark air before the first whistle."

*Example 2: The chaos of a debate team crunch time*
> "Our debate prep room was a hurricane of flying yellow highlighters, half-eaten pizza slices resting precariously on legislative binders, and three separate cross-examinations happening simultaneously at top volume."`
  },
  {
    id: 'breaking_rules',
    title: 'Knowing When to Break the Rules',
    subtitle: 'The art of narrative subversion',
    icon: 'Hammer',
    tags: ['Subversion', 'Advanced'],
    content: `The Hero's Journey is a structural framework, not a rigid, unchangeable algorithm. Once you understand how the baseline system operates, you can intentionally introduce edge cases and subvert expectations to make your essay more memorable. Admissions officers read thousands of highly predictable arcs. A well-placed subversion—where you lead the reader down a familiar path and then pull the rug out from under them—creates genuine surprise and demonstrates high-level self-awareness.

Here are a few ways to effectively bend the rules without breaking your story:
* **The "Failed" Ordeal:** You do not actually have to win the battle to get the prize. Sometimes the most powerful essays happen when you completely fail the Ordeal, but the deep reflection on that failure becomes your Elixir. Losing the tournament, breaking the prototype, or having your campers stage a mutiny can teach you vastly more about leadership and resilience than a flawless, easy victory.
* **The Unexpected Catalyst:** The realization that saves you doesn't have to be a profound quote from a mentor or a sudden stroke of genius. It can be a joke, a mundane observation, or even the realization that the advice you were given is actually completely wrong. Using a "broken" compass to find your way out of the woods shows deep, independent critical thinking.
* **The Wrong Dragon:** You spend the whole essay preparing for one specific challenge, but when you arrive at the Ordeal, the test is entirely different. You spent weeks memorizing the technical manual to pass a robotics inspection, but the real test ended up being navigating the interpersonal conflict of your stressed-out team.
* **The Commitment was the Ordeal:** Sometimes the hardest part of the journey isn't the final test, but simply taking the first step. You might find that crossing the threshold (e.g., finally standing up to speak, submitting the flawed design, or admitting you need help) was the true climax of your story, and everything that followed was just the falling action.

**The Golden Rule of Breaking Rules:** You can bend the plot, but you cannot bypass the transformation. You can fail the test, use the wrong tool, or fight the wrong battle, but you must still return with the Elixir. The internal growth is non-negotiable.`
  }
];

export const EXCAVATOR_PROMPTS = [
  // --- THE ONRAMP (Low stakes, tangible, gets them typing) ---
  {
    id: "excavator_1",
    question: "What is an obscure topic or 'useless' skill you could confidently teach a 10-minute masterclass on with zero preparation?"
  },
  {
    id: "excavator_2",
    question: "If you had to put one ordinary, physical object in a museum to represent your high school years, what would it be? Why is it scratched, dented, or worn out?"
  },
  {
    id: "excavator_3",
    question: "What is the hardest you've ever worked on something that wasn't for a grade, a trophy, or a resume?"
  },
  
  // --- THE SPIRAL (Interleaved contexts: Social, Quirky, Deep, Action) ---
  {
    id: "excavator_4",
    question: "What is a role you play in your family or friend group that has no official title, but everything falls apart if you stop doing it?"
  },
  {
    id: "excavator_5",
    question: "Describe a mundane, everyday inconvenience that you’ve engineered a ridiculously complex solution for."
  },
  {
    id: "excavator_6",
    question: "Describe a time you totally changed your mind about something you had been absolutely certain of."
  },
  {
    id: "excavator_7",
    question: "What was a disaster that happened during a live event, game, or performance. How did you adapt in the moment without the crowd noticing?"
  },
  {
    id: "excavator_8",
    question: "What was a system, rule, or piece of technology you encountered that was so inefficient it drove you crazy? How did you try to hack it, fix it, or work around it?"
  },
  {
    id: "excavator_9",
    question: "What is the most chaotic, overwhelming environment you’ve ever had to focus in?"
  },
  {
    id: "excavator_10",
    question: "What's a hard or scary choice you had to make where there was no obvious 'right' answer?"
  },
  {
    id: "excavator_11",
    question: "When were you the 'translator' between two people who were speaking the exact same language but completely misunderstanding each other?"
  },
  {
    id: "excavator_12",
    question: "When did you try to fix something and actually made it completely worse?"
  },
  {
    id: "excavator_13",
    question: "What is a personality trait you spent years trying to hide or fix, only to realize it's actually your secret weapon?"
  },
  {
    id: "excavator_14",
    question: "Describe a space—a garage, a stage wing, a kitchen, a specific desk—where you feel most like yourself. What specific ingredients of that room make you feel safe or powerful?"
  },
  {
    id: "excavator_15",
    question: "When was a group, team, or club you were in completely paralyzed? How did you break the gridlock and get people moving?"
  },
  {
    id: "excavator_16",
    question: "Think about a project, a piece of code, or a physical mechanism you were obsessively trying to fix. What, exactly, was the missing puzzle piece that finally made it work?"
  },
  {
    id: "excavator_17",
    question: "When did you realize an adult or authority figure was completely wrong? What did you do about it?"
  },
  {
    id: "excavator_18",
    question: "When did you have to passionately defend an idea, or research a position, that you personally disagreed with? Did it change how you see the other side?"
  },
  {
    id: "excavator_19",
    question: "What is a 'rule' you intentionally broke because you realized the rule itself didn't make any sense?"
  },
  {
    id: "excavator_20",
    question: "When did you work incredibly hard, do everything exactly right, and still lose or fail? What did you do the next morning?"
  },
  {
    id: "excavator_21",
    question: "What is one specific piece of advice you would give your new high school freshman self? What specific story does that advice come from?"
  },
  {
    id: "excavator_22",
    question: "When did you do the 'unglamorous' work in the background to ensure someone else could shine? Why did you do it, and what did you learn in the shadows?"
  },
  {
    id: "excavator_23",
    question: "Describe a moment when you realized the 'perfect plan' you spent weeks making was going to be completely useless in the real world."
  },
  {
    id: "excavator_24",
    question: "What is the most awkward, uncomfortable conversation you intentionally initiated? Why did you force yourself to have it?"
  },
  {
    id: "excavator_25",
    question: "Think about a physical motion or drill you've repeated thousands of times (a free throw, a dance step, a brushstroke). What exactly goes through your head in that split second?"
  },
  {
    id: "excavator_26",
    question: "What are two things you deeply care about that seem to completely contradict each other? How do you reconcile them in your own mind?"
  },
  {
    id: "excavator_27",
    question: "Describe a time you showed up to 'help' someone or fix a community problem, but quickly realized they didn't want or need your help at all. What did you change?"
  },
  {
    id: "excavator_28",
    question: "When was the last time a book, article, or documentary made you stare at the wall because it completely broke your mental model of the world?"
  },
  {
    id: "excavator_29",
    question: "When did you have to swallow your pride and publicly admit to a group that you were completely in over your head?"
  }
];
