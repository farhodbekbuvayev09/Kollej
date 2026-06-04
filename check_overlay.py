import os, re

base = r'C:\Users\buvay\Desktop\Kollej'

# Check what is currently in news.html and life.html
for fname in ['news.html', 'life.html']:
    fpath = os.path.join(base, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find mobile-overlay section
    m = re.search(r'mobile-overlay.*?(?=<section|<div class="news-page|<main)', content, re.DOTALL)
    if m:
        print(f"=== {fname} ===")
        print(m.group(0)[:300])
        print()
