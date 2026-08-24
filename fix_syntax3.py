import re

with open('src/constants.ts', 'r') as f:
    content = f.read()

# Replace "}\n  }\n];" with "}\n];"
content = re.sub(r'\}\n\s*\}\n\];', '}\n];', content)

with open('src/constants.ts', 'w') as f:
    f.write(content)
