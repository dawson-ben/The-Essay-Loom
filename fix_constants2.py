import re

with open('src/constants.ts', 'r') as f:
    content = f.read()

# 1. Remove ALL injected patterns and just put back the `  }\n];`
injected_regex = r',\s*\{\s*id: "hj-post-mortem",\s*label: "The Post-Mortem.*?\]\s*\}\s*\];'
content = re.sub(injected_regex, '\n  }\n];', content, flags=re.DOTALL)

# Let's double check if there are any remaining injected stuff (maybe they didn't have comma?)
injected_regex_no_comma = r'\s*\{\s*id: "hj-post-mortem",\s*label: "The Post-Mortem.*?\]\s*\}\s*\];'
content = re.sub(injected_regex_no_comma, '\n];', content, flags=re.DOTALL)

# 2. Fix the `label:` back to `name:` for the NARRATIVE_PATTERNS elements.
# The two original elements have id "hj-chronological" and "hj-in-media-res"
content = re.sub(r'(id:\s*"hj-chronological",\s*)label:', r'\1name:', content)
content = re.sub(r'(id:\s*"hj-in-media-res",\s*)label:', r'\1name:', content)

with open('src/constants.ts', 'w') as f:
    f.write(content)
