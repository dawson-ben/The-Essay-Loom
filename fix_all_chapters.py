import re

with open('src/components/InteractiveGuidebook.tsx', 'r') as f:
    content = f.read()

# Fix chapter 4
content = content.replace(
    '{/* Chapter 4: Cinematic Techniques */}\n                    {currentChapter.id === 5 && (\n                      <div className="space-y-6" id="expanded_chapter_5_view">',
    '{/* Chapter 4: Cinematic Techniques */}\n                    {currentChapter.id === 4 && (\n                      <div className="space-y-6" id="expanded_chapter_4_view">'
)

# Fix chapter 5
content = content.replace(
    '{/* Chapter 4: Knowing When to Break the Rules */}\n                    {currentChapter.id === 6 && (\n                      <div className="space-y-6" id="expanded_chapter_5_view">',
    '{/* Chapter 5: Knowing When to Break the Rules */}\n                    {currentChapter.id === 5 && (\n                      <div className="space-y-6" id="expanded_chapter_5_view">'
)

# Fix chapter 6
content = content.replace(
    '{/* Chapter 6: Assembly & Reordering Options */}\n                    {currentChapter.id === 6 && (\n                      <div className="space-y-6" id="expanded_chapter_5_view">',
    '{/* Chapter 6: Assembly & Reordering Options */}\n                    {currentChapter.id === 6 && (\n                      <div className="space-y-6" id="expanded_chapter_6_view">'
)

with open('src/components/InteractiveGuidebook.tsx', 'w') as f:
    f.write(content)
