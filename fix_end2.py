with open('src/data/characterGuides.ts', 'r') as f:
    content = f.read()

content = content.replace("    }\n}];", "    }\n  }\n];")

with open('src/data/characterGuides.ts', 'w') as f:
    f.write(content)
