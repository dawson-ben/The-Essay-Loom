import re

with open('src/components/Workbook.tsx', 'r') as f:
    content = f.read()

# Remove <span className="text-2xl">{guide.emoji}</span>
content = re.sub(r'<span className="text-2xl">\{guide\.emoji\}</span>\s*', '', content)

# Remove <span className="text-xl">{guide.emoji}</span>
content = re.sub(r'<span className="text-xl">\{guide\.emoji\}</span>\s*', '', content)

with open('src/components/Workbook.tsx', 'w') as f:
    f.write(content)

