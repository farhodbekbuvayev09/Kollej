import re

def main():
    with open('register.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Navbar text
    content = content.replace('>Biz Haqimizda<', '>Biz haqimizda<')
    content = content.replace('>O\'quvchilar Hayoti<', '>O\'quvchilar hayoti<')

    # 2. Stats
    content = content.replace('<div class="reg-stat-num">390</div>', '<div class="reg-stat-num">720</div>')
    content = content.replace('<div class="reg-stat-label">Ta\'lim o\'rni</div>', '<div class="reg-stat-label">Quvvati</div>')
    content = content.replace('<div class="reg-stat-num">7</div>\n      <div class="reg-stat-label">Yo\'nalish</div>', '<div class="reg-stat-num">11</div>\n      <div class="reg-stat-label">Yo\'nalish</div>')
    
    # Also stats section below
    content = content.replace('Jami 390 ta o\'rin · 9-sinf bitiruvchilari negizida', 'Jami 720 ta o\'rin · 9 va 11-sinf bitiruvchilari negizida')

    # 3. Direction Grid
    new_grid = """<div class="direction-grid" id="dir-grid">
        <!-- 1 -->
        <div class="dir-card dir-teal" data-dir="Avtomobillarni taʼmirlash va ularga xizmat koʻrsatish" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg></div>
          <div class="dir-name">Avtomobillarni taʼmirlash va xizmat koʻrsatish</div>
          <div class="dir-code">Kasb kodi: 30711601</div>
          <div class="dir-badges"><span class="dir-badge">Kunduzgi</span></div>
          <div class="dir-kvota-tag">9-sinf negizida</div>
        </div>
        <!-- 2 -->
        <div class="dir-card dir-blue" data-dir="Axborot vositalari mashinalari va kompyuter tarmoqlari" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
          <div class="dir-name">Axborot vositalari va kompyuter tarmoqlari</div>
          <div class="dir-code">Kasb kodi: 30610401</div>
          <div class="dir-badges"><span class="dir-badge">Kunduzgi</span></div>
          <div class="dir-kvota-tag">9-sinf negizida</div>
        </div>
        <!-- 3 -->
        <div class="dir-card dir-red" data-dir="Tikuvchi (Kunduzgi)" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>
          <div class="dir-name">Tikuvchi</div>
          <div class="dir-code">Kasb kodi: 30720417</div>
          <div class="dir-badges"><span class="dir-badge">Kunduzgi</span></div>
          <div class="dir-kvota-tag">9-sinf negizida</div>
        </div>
        <!-- 4 -->
        <div class="dir-card dir-orange" data-dir="Payvandlovchi" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
          <div class="dir-name">Payvandlovchi</div>
          <div class="dir-code">Kasb kodi: 30720212</div>
          <div class="dir-badges"><span class="dir-badge">Kunduzgi</span></div>
          <div class="dir-kvota-tag">9-sinf negizida</div>
        </div>
        <!-- 5 -->
        <div class="dir-card dir-purple" data-dir="Poyabzal ishlari" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z"/><path d="M6 11V7"/><path d="M10 9V7"/></svg></div>
          <div class="dir-name">Poyabzal ishlari</div>
          <div class="dir-code">Kasb kodi: 30720414</div>
          <div class="dir-badges"><span class="dir-badge">Dual</span></div>
          <div class="dir-kvota-tag">9-sinf negizida</div>
        </div>
        <!-- 6 -->
        <div class="dir-card dir-teal" data-dir="Tikuvchi (Dual)" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>
          <div class="dir-name">Tikuvchi</div>
          <div class="dir-code">Kasb kodi: 30720417</div>
          <div class="dir-badges"><span class="dir-badge">Dual</span></div>
          <div class="dir-kvota-tag">9-sinf negizida</div>
        </div>
        <!-- 7 -->
        <div class="dir-card dir-indigo" data-dir="Elektromontyor" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
          <div class="dir-name">Elektromontyor</div>
          <div class="dir-code">Kasb kodi: 30710310</div>
          <div class="dir-badges"><span class="dir-badge">Dual</span></div>
          <div class="dir-kvota-tag">9-sinf negizida</div>
        </div>
        <!-- 8 -->
        <div class="dir-card dir-orange" data-dir="Avtomobil transportiga texnik xizmat koʻrsatish va taʼmirlash" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg></div>
          <div class="dir-name">Avtomobil transportiga xizmat koʻrsatish</div>
          <div class="dir-code">Kasb kodi: 50711604</div>
          <div class="dir-badges"><span class="dir-badge">Kunduzgi</span></div>
          <div class="dir-kvota-tag">11-sinf negizida</div>
        </div>
        <!-- 9 -->
        <div class="dir-card dir-green" data-dir="Buxgalteriya hisobi va audit" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="2" y1="12" x2="22" y2="12"/></svg></div>
          <div class="dir-name">Buxgalteriya hisobi va audit</div>
          <div class="dir-code">Kasb kodi: 50410101</div>
          <div class="dir-badges"><span class="dir-badge">Kunduzgi</span></div>
          <div class="dir-kvota-tag">11-sinf negizida</div>
        </div>
        <!-- 10 -->
        <div class="dir-card dir-blue" data-dir="Kompyuter injiniring" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
          <div class="dir-name">Kompyuter injiniring</div>
          <div class="dir-code">Kasb kodi: 50610401</div>
          <div class="dir-badges"><span class="dir-badge">Kunduzgi</span></div>
          <div class="dir-kvota-tag">11-sinf negizida</div>
        </div>
        <!-- 11 -->
        <div class="dir-card dir-red" data-dir="Yengil sanoat buyumlari konstruksiyasi" tabindex="0" role="button" aria-pressed="false">
          <div class="dir-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="dir-icon-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>
          <div class="dir-name">Yengil sanoat buyumlari konstruksiyasi</div>
          <div class="dir-code">Kasb kodi: 50720402</div>
          <div class="dir-badges"><span class="dir-badge">Kunduzgi</span></div>
          <div class="dir-kvota-tag">11-sinf negizida</div>
        </div>
      </div><!-- /direction-grid -->"""
    
    content = re.sub(r'<div class="direction-grid" id="dir-grid">.*?</div><!-- /direction-grid -->', new_grid, content, flags=re.DOTALL)

    # 4. Replace Gallery Images
    gallery = """<div class="reg-gallery">
        <img src="Images/rasm1.jpg" alt="Texnikum ustozlari" loading="lazy">
        <img src="Images/rasm2.jpg" alt="Amaliy mashg'ulotlar" loading="lazy">
        <img src="Images/rasm3.jpg" alt="Xalqaro va mahalliy sertifikat sohiblari" loading="lazy">
        <img src="Images/rasm4.jpg" alt="Yutuqlarimiz va sertifikatlarimiz" loading="lazy">
      </div>"""
    content = re.sub(r'<div class="reg-gallery">.*?</div>', gallery, content, flags=re.DOTALL)

    # 5. Table rows
    tbody = """<tbody>
            <tr>
              <td>1</td><td>Avtomobillarni taʼmirlash va xizmat koʻrsatish</td><td style="color:rgba(255,255,255,0.4);">30711601</td><td><span class="badge-kunduzgi">Kunduzgi</span></td><td><strong>60</strong></td>
            </tr>
            <tr>
              <td>2</td><td>Axborot vositalari mashinalari va kompyuter tarmoqlari</td><td style="color:rgba(255,255,255,0.4);">30610401</td><td><span class="badge-kunduzgi">Kunduzgi</span></td><td><strong>60</strong></td>
            </tr>
            <tr>
              <td>3</td><td>Tikuvchi</td><td style="color:rgba(255,255,255,0.4);">30720417</td><td><span class="badge-kunduzgi">Kunduzgi</span></td><td><strong>60</strong></td>
            </tr>
            <tr>
              <td>4</td><td>Payvandlovchi</td><td style="color:rgba(255,255,255,0.4);">30720212</td><td><span class="badge-kunduzgi">Kunduzgi</span></td><td><strong>60</strong></td>
            </tr>
            <tr>
              <td>5</td><td>Poyabzal ishlari</td><td style="color:rgba(255,255,255,0.4);">30720414</td><td><span class="badge-dual">Dual</span></td><td><strong>60</strong></td>
            </tr>
            <tr>
              <td>6</td><td>Tikuvchi</td><td style="color:rgba(255,255,255,0.4);">30720417</td><td><span class="badge-dual">Dual</span></td><td><strong>90</strong></td>
            </tr>
            <tr>
              <td>7</td><td>Elektromontyor</td><td style="color:rgba(255,255,255,0.4);">30710310</td><td><span class="badge-dual">Dual</span></td><td><strong>60</strong></td>
            </tr>
            <tr>
              <td>8</td><td>Avtomobil transportiga texnik xizmat koʻrsatish va taʼmirlash</td><td style="color:rgba(255,255,255,0.4);">50711604</td><td><span class="badge-kunduzgi">Kunduzgi</span></td><td><strong>60</strong></td>
            </tr>
            <tr>
              <td>9</td><td>Buxgalteriya hisobi va audit</td><td style="color:rgba(255,255,255,0.4);">50410101</td><td><span class="badge-kunduzgi">Kunduzgi</span></td><td><strong>60</strong></td>
            </tr>
            <tr>
              <td>10</td><td>Kompyuter injiniring</td><td style="color:rgba(255,255,255,0.4);">50610401</td><td><span class="badge-kunduzgi">Kunduzgi</span></td><td><strong>60</strong></td>
            </tr>
            <tr>
              <td>11</td><td>Yengil sanoat buyumlari konstruksiyasi va texnologiyasi</td><td style="color:rgba(255,255,255,0.4);">50720402</td><td><span class="badge-kunduzgi">Kunduzgi</span></td><td><strong>90</strong></td>
            </tr>
            <tr class="total-row">
              <td colspan="4">JAMI</td>
              <td><strong>720</strong></td>
            </tr>
          </tbody>"""
    content = re.sub(r'<tbody>.*?</tbody>', tbody, content, flags=re.DOTALL)

    # 6. Footer fixes
    content = content.replace('<h2 class="footer-logo">1-son<br>texnikumi</h2>', '<h2 class="footer-logo">Shahrixon tuman 1-son<br>texnikumi</h2>')
    content = content.replace('<p>Tel: <a href="tel:+998741234567">+998 (74) 123-45-67</a></p>', '<p>Tel: <a href="tel:+998905255007">+998 90 525 50 07</a><br>\n                  <a href="tel:+998950902983">+998 95 090 29 83</a><br>\n                  <a href="tel:+998331309696">+998 33 130 96 96</a></p>\n          <p>Email: <a href="mailto:info@shahrixon-texnikum.uz">info@shahrixon-texnikum.uz</a></p>')

    with open('register.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    main()
