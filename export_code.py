import os

files_to_export = [
    'package.json',
    'vite.config.ts',
    'tsconfig.json',
    'index.html',
]

for root, dirs, files in os.walk('src'):
    for f in files:
        if not f.endswith(('.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg')):
            files_to_export.append(os.path.join(root, f))

with open('code_export.txt', 'w', encoding='utf-8') as out:
    for filepath in files_to_export:
        if os.path.exists(filepath):
            out.write(f"\n\n{'='*80}\n")
            out.write(f"FILE: {filepath}\n")
            out.write(f"{'='*80}\n\n")
            try:
                with open(filepath, 'r', encoding='utf-8') as infile:
                    out.write(infile.read())
            except Exception as e:
                out.write(f"Error reading file: {e}\n")
