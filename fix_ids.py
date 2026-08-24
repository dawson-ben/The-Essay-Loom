import re

with open('src/components/InteractiveGuidebook.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '{/* Chapter 2: Comparing Narrative Arcs */}\n                    {currentChapter.id === 2 && (\n                      <div className="space-y-8 animate-fade-in" id="expanded_chapter_3_view">',
    '{/* Chapter 2: Comparing Narrative Arcs */}\n                    {currentChapter.id === 2 && (\n                      <div className="space-y-8 animate-fade-in" id="expanded_chapter_2_view">'
)

content = content.replace(
    '{/* Chapter 3: Cinematic Techniques */}\n                    {currentChapter.id === 6 && (\n                      <div className="space-y-6" id="expanded_chapter_3_view">',
    '{/* Chapter 4: Cinematic Techniques */}\n                    {currentChapter.id === 4 && (\n                      <div className="space-y-6" id="expanded_chapter_4_view">'
)

content = content.replace(
    '{/* Chapter 4: Breaking the Rules */}',
    '{/* Chapter 5: Breaking the Rules */}'
)
content = content.replace(
    '{currentChapter.id === 4 && (',
    '{currentChapter.id === 5 && ('
)
content = content.replace(
    'id="expanded_chapter_4_view"',
    'id="expanded_chapter_5_view"'
)

with open('src/components/InteractiveGuidebook.tsx', 'w') as f:
    f.write(content)
