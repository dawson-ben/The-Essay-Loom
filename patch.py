import sys

with open("src/components/InteractiveGuidebook.tsx", "r") as f:
    content = f.read()

old_string = "In 1949, Literature professor Joseph Campbell identified a pattern in great stories that spans cultures and centuries. This summary of he Hero's Journey will suffice for our purposes:"

new_string = """In 1949, Literature professor Joseph Campbell identified a pattern in great stories that spans cultures and centuries.

When you hear "The Hero's Journey," you might think of classic fantasy novels or other stories with a lot of dramatic action. But this exact same pattern applies perfectly to the quiet, "everyday" stories of our lives, too—the small moments of personal growth, the overcoming of a fear, or the shift in a perspective. You don't need to have gone on some long journey or fought a dragon to use this roadmap.

This summary of the Hero's Journey will suffice for our purposes:"""

content = content.replace(old_string, new_string.replace('\n', '\\n'))

with open("src/components/InteractiveGuidebook.tsx", "w") as f:
    f.write(content)

