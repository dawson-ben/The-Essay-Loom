with open('src/types.ts', 'r') as f:
    content = f.read()

content = content.replace("  content: string;\n  draftText?: string;\n  icon: string;", "  content: string;\n  icon: string;")

with open('src/types.ts', 'w') as f:
    f.write(content)
