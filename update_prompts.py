import re

with open('src/constants.ts', 'r') as f:
    text = f.read()

# We need to process each prompt definition in HEROS_JOURNEY_PROMPTS.
# A prompt starts with { id: '...', and ends with } before the next { or ];

def fix_prompt(match):
    block = match.group(0)
    
    # Extract label
    label_match = re.search(r"label:\s*'([^']+)'", block)
    if not label_match:
        return block
    label = label_match.group(1)
    
    # Some labels have questions in them, e.g. '1. How did you change?'
    # Some have both, e.g. '3. What is the Elixir? (Your Essential Belief)'
    # Some have just titles, e.g. '5. The Ordinary World'
    
    # We want to separate into label (Title) and subtitle (Question).
    subtitle = ""
    new_label = label
    
    # Hardcode mappings for Hero's Journey based on ID
    id_match = re.search(r"id:\s*'([^']+)'", block)
    if id_match:
        prompt_id = id_match.group(1)
        
        mapping = {
            'how_i_changed': ('The Transformation', 'How did you change?'),
            'essential_belief': ('The Elixir', 'What is your essential belief?'),
            'magic_elixir': ('Applying the Elixir', 'How will you apply this wisdom? (Optional)'),
            'ordinary_world': ('The Ordinary World', 'What was your life like before?'),
            'unfamiliar_world': ('The Unfamiliar World', 'What was the chaotic new world like?'),
            'inciting_incident': ('The Catalyst / Incident', 'What was the Inciting Incident?'),
            'hesitation_doubt': ('The Hesitation', 'How did you hesitate or doubt yourself?'),
            'crossing_threshold': ('The Commitment', 'When did you cross the threshold?'),
            'stakes_risk': ('The Stakes', 'What was at risk?'),
            'the_ordeal_flat': ('The Ordeal', 'What was the key complication?'),
            'the_catalyst': ('The Internal Catalyst', 'What realization helped you break through?'),
            'winning_action': ('The Winning Action', 'What specific action did you take to solve the problem?'),
            'immediate_payoff': ('The Immediate Payoff', 'What was the short-term result of your action?'),
        }
        
        if prompt_id in mapping:
            title, sub = mapping[prompt_id]
            # Replace label
            block = re.sub(r"label:\s*'[^']+',", f"label: '{title}',\n    subtitle: '{sub}',", block)
            
            # Remove tools if they don't apply
            if prompt_id == 'how_i_changed':
                block = re.sub(r"\s*tools:\s*\[[^\]]+\]\s*,", "", block)
            
            # Add examples to essential_belief if none
            if prompt_id == 'essential_belief':
                if 'examples:' not in block:
                    block += """
    examples: [
      { title: 'Pedagogical Shift', text: 'Messy, organic discovery sticks to the mind much longer than a polished, passive lecture.' },
      { title: 'The Value of Patience', text: 'True patience is not simply waiting; it is the active, isometric exertion of maintaining focus when there is no immediate reward.' }
    ]"""

    return block

# Just replace all prompts in HEROS_JOURNEY_PROMPTS
text = re.sub(r"{\s*id:\s*'[^']+',(?:[^{}]|{[^{}]*})*}", fix_prompt, text)

with open('src/constants.ts', 'w') as f:
    f.write(text)

