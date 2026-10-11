import re

with open('src/data/certifications.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('.PNG', '.webp')
content = re.sub(r'/logos/([^\"\']+)\.png', r'/logos/\1.webp', content)

with open('src/data/certifications.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated src/data/certifications.ts with .webp references')
