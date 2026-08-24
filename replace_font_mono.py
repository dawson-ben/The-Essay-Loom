import os
import re

files_to_update = [
    'src/components/Editor.tsx',
    'src/components/AssemblyBoard.tsx',
    'src/components/GuidebookManual.tsx',
    'src/components/Handbook.tsx',
    'src/components/Workbook.tsx',
    'src/components/Scratchpad.tsx',
    'src/components/StoryArcVisualizer.tsx',
    'src/components/InteractiveGuidebook.tsx'
]

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Replace font-mono with font-sans
    new_content = re.sub(r'\bfont-mono\b', 'font-sans', content)
    
    with open(file_path, 'w') as f:
        f.write(new_content)

# Update index.css to remove JetBrains Mono
with open('src/index.css', 'r') as f:
    css_content = f.read()

# Replace the @import line
old_import = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');"
new_import = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap');"
css_content = css_content.replace(old_import, new_import)

# Replace the --font-mono line just in case, though maybe not strictly necessary to delete it if it falls back to monospace
# I'll just change it to point to a system font or remove it
css_content = re.sub(r'\s*--font-mono: "JetBrains Mono", monospace;', '\n  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;', css_content)

with open('src/index.css', 'w') as f:
    f.write(css_content)

