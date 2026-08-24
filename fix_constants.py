import re

with open('src/constants.ts', 'r') as f:
    content = f.read()

# The injected string looks like this (with label: because of our sed):
injected_regex = r'\s*\{\s*id: "hj-post-mortem",\s*label: "The Post-Mortem.*?\]\s*\}\s*\];'

# Find all occurrences of the injected text
occurrences = len(re.findall(injected_regex, content, flags=re.DOTALL))
print(f"Found {occurrences} occurrences of the injected patterns.")

# We want to keep it ONLY at the end of NARRATIVE_PATTERNS. 
# NARRATIVE_PATTERNS is the first array in the file? Let's check.
