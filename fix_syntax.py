import re

with open('src/constants.ts', 'r') as f:
    content = f.read()

content = content.replace("  }\n  }];", "  }\n];")
content = content.replace("  }\n];;", "  }\n];")

with open('src/constants.ts', 'w') as f:
    f.write(content)
