import re

with open('src/components/ColdOpen.tsx', 'r') as f:
    content = f.read()

# Reduce all WAIT delay values by 50%
def replace_wait(match):
    val = int(match.group(1))
    new_val = val // 2
    return f"ms: {new_val}"

content = re.sub(r"ms:\s*(\d+)", replace_wait, content)

with open('src/components/ColdOpen.tsx', 'w') as f:
    f.write(content)
