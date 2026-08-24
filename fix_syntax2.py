import re

with open('src/constants.ts', 'r') as f:
    content = f.read()

# Replace any sequence like "}\n  }];" with "}\n];"
content = re.sub(r'\}\s*\}\];', '}\n];', content)

with open('src/constants.ts', 'w') as f:
    f.write(content)
