import re

with open('src/components/InteractiveGuidebook.tsx', 'r') as f:
    content = f.read()

# Let's see what the current ids are for the rest of the chapters.
# Cinematic Tools should be 4
# Breaking the rules should be 5
# Assembly should be 6

# I will just write a regex to find each comment and update the id below it.

# Fix Pixar rules
content = re.sub(
    r"\{\/\* Chapter 3: The Pixar Principles \*\/}\s*\{currentChapter\.id === \d+ && \(",
    "{/* Chapter 3: The Pixar Principles */}\n                    {currentChapter.id === 3 && (",
    content
)

content = re.sub(
    r"\{\/\* Chapter 4: Cinematic Tools \*\/}\s*\{currentChapter\.id === \d+ && \(",
    "{/* Chapter 4: Cinematic Tools */}\n                    {currentChapter.id === 4 && (",
    content
)

content = re.sub(
    r"\{\/\* Chapter 5: Breaking the Rules \*\/}\s*\{currentChapter\.id === \d+ && \(",
    "{/* Chapter 5: Breaking the Rules */}\n                    {currentChapter.id === 5 && (",
    content
)

content = re.sub(
    r"\{\/\* Chapter 6: Assembly & Reordering Options \*\/}\s*\{currentChapter\.id === \d+ && \(",
    "{/* Chapter 6: Assembly & Reordering Options */}\n                    {currentChapter.id === 6 && (",
    content
)

with open('src/components/InteractiveGuidebook.tsx', 'w') as f:
    f.write(content)

