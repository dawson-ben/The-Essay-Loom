import re

with open('src/types.ts', 'r') as f:
    content = f.read()

# Replace all occurrences of multiple subtitles with a single one in GuideChapter
content = re.sub(r'  subtitle\?: string;\n  subtitle: string;\n  subtitle\?: string;', '  subtitle: string;', content)

# I can just overwrite types.ts to be clean.
