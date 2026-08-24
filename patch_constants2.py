import re

with open('src/constants.ts', 'r') as f:
    content = f.read()

# the previous regex matched all '}];' and replaced them, which broke other arrays.
# let's restore from a backup if we can, or just re-download the file.
