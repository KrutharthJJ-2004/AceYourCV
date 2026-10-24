
    const $ = (id) => document.getElementById(id);
    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const entryCounts = { experience: 0, education: 0, language: 0, certification: 0 };
    function addEntry(kind) {
      const isWork = kind === 'experience', isEducation = kind === 'education';
      const labels = { experience: 'Role', education: 'Education', language: 'Language', certification: 'Certification' };
      const list = $(`${kind === 'certification' ? 'certifications' : kind === 'language' ? 'languages' : kind}-list`);
      const index = ++entryCounts[kind], label = labels[kind];
      const entry = document.createElement('div'); entry.className = 'entry'; entry.dataset.kind = kind;
      let fields;
      if (isWork || isEducation) {
        fields = `<div class="field"><label>${isWork?'Job title':'Degree / qualification'}</label><input data-key="title" placeholder="${isWork?'e.g. Product Designer':'e.g. B.Des, Communication Design'}"></div><div class="field"><label>${isWork?'Company':'School / institution'}</label><input data-key="org" placeholder="${isWork?'Company name':'Institution name'}"></div><div class="field"><label>Dates</label><input data-key="dates" placeholder="e.g. 2022 – 2025"></div>${isWork?'<div class="field full"><label>Achievements (one per line)</label><textarea data-key="details" placeholder="Led a project that improved...&#10;Collaborated with... "></textarea></div>':'<div class="field"><label>Location (optional)</label><input data-key="details" placeholder="City, Country"></div>'}`;
      } else if (kind === 'language') {
        fields = '<div class="field"><label>Language</label><input data-key="title" placeholder="e.g. Hindi"></div><div class="field"><label>Proficiency</label><input data-key="proficiency" placeholder="e.g. Native, Fluent"></div>';
      } else {
        fields = '<div class="field full"><label>Certification</label><input data-key="title" placeholder="e.g. AWS Certified Solutions Architect"></div><div class="field"><label>Issuer</label><input data-key="org" placeholder="e.g. Amazon Web Services"></div><div class="field"><label>Date (optional)</label><input data-key="dates" placeholder="e.g. 2025"></div>';
      }
      entry.innerHTML = `<div class="entry-title"><span>${label} ${index}</span><button class="remove" type="button">Remove</button></div><div class="fields">${fields}</div>`;
      list.appendChild(entry); entry.querySelector('.remove').addEventListener('click', () => { entry.remove(); render(); });
      entry.querySelectorAll('input,textarea').forEach(el => el.addEventListener('input', render)); render();
    }
    function value(id) { return $(id).value.trim(); }
    function renderEntries(kind, targetId) {
      const entries = [...document.querySelectorAll(`.entry[data-kind="${kind}"]`)];
      const target = $(targetId);
      if (!entries.length) {
        const emptyText = { experience: 'Add your recent roles and accomplishments.', education: 'Add your education if you’d like.', language: 'Add languages you speak.', certification: 'Add relevant certifications.' };
        target.innerHTML = `<p class="empty">${emptyText[kind]}</p>`; return;
      }
      target.innerHTML = entries.map(item => {
        const get = key => item.querySelector(`[data-key="${key}"]`)?.value.trim() || '';
        const title=get('title'), org=get('org') || '', dates=get('dates') || '', details=get('details') || '';
        if (kind === 'language') return `<div class="resume-entry"><div class="resume-entry-head"><span>${escapeHtml(title || 'Language')}</span><span>${escapeHtml(get('proficiency'))}</span></div></div>`;
        if (kind === 'certification') return `<div class="resume-entry"><div class="resume-entry-head"><span>${escapeHtml(title || 'Certification')}</span><span>${escapeHtml(dates)}</span></div>${org?`<div class="resume-entry-sub">${escapeHtml(org)}</div>`:''}</div>`;
        return `<div class="resume-entry"><div class="resume-entry-head"><span>${escapeHtml(title || (kind==='experience'?'Job title':'Degree / qualification'))}</span><span>${escapeHtml(dates)}</span></div><div class="resume-entry-sub">${escapeHtml(org)}${details && kind==='education'?' · '+escapeHtml(details):''}</div>${details && kind==='experience'?'<ul>'+details.split('\n').filter(Boolean).map(line=>`<li>${escapeHtml(line.replace(/^[-•]\s*/,''))}</li>`).join('')+'</ul>':''}</div>`;
      }).join('');
    }
    function render() {
      $('out-name').textContent = value('name') || 'Your Name'; $('out-role').textContent = value('role') || 'Your Target Role';
      const contact=[value('email'),value('phone'),value('location')].filter(Boolean); $('out-contact').textContent=contact.length?contact.join('  ·  '):'Email  ·  Phone  ·  Location / portfolio';
      $('out-summary').textContent=value('summary')||'Your professional summary will appear here.'; $('out-summary').classList.toggle('empty',!value('summary'));
      const skills=value('skills'); $('out-skills').textContent=skills||'Your skills will appear here.'; $('out-skills').classList.toggle('empty',!skills);
      renderEntries('experience','out-experience'); renderEntries('education','out-education');
      renderEntries('language','out-languages'); renderEntries('certification','out-certifications');
    }
    document.querySelectorAll('.editor-form input,.editor-form textarea').forEach(el=>el.addEventListener('input',render));
    $('add-experience').addEventListener('click',()=>addEntry('experience')); $('add-education').addEventListener('click',()=>addEntry('education'));
    $('add-language').addEventListener('click',()=>addEntry('language')); $('add-certification').addEventListener('click',()=>addEntry('certification'));
    $('download').addEventListener('click',()=>window.print());
    $('clear').addEventListener('click',()=>{ if(!confirm('Clear all resume details?')) return; document.querySelectorAll('.editor-form input,.editor-form textarea').forEach(el=>el.value=''); document.querySelectorAll('.editor-form .entry').forEach(entry=>entry.remove()); render(); });
    const templateScreen = $('template-screen'), editorScreen = $('editor-screen'), paper = $('paper');
    function chooseTemplate(name) {
      paper.classList.remove('template-modern','template-classic','template-compact');
      paper.classList.add(`template-${name}`);
      document.querySelectorAll('[data-template]').forEach(button => button.classList.toggle('selected',button.dataset.template===name));
      templateScreen.hidden = true; editorScreen.hidden = false;
    }
    document.querySelectorAll('[data-template]').forEach(button=>button.addEventListener('click',()=>chooseTemplate(button.dataset.template)));
    $('back-to-templates').addEventListener('click',()=>{editorScreen.hidden=true;templateScreen.hidden=false;window.scrollTo(0,0)});
    document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{
      document.querySelectorAll('.tab').forEach(tab=>tab.classList.toggle('active',tab===button));
      $('content-panel').classList.toggle('active',button.dataset.tab==='content'); $('design-panel').classList.toggle('active',button.dataset.tab==='design');
    }));
    document.querySelectorAll('.swatch').forEach(button=>button.addEventListener('click',()=>{
      document.documentElement.style.setProperty('--accent',button.dataset.color);
      document.querySelectorAll('.swatch').forEach(swatch=>swatch.classList.toggle('selected',swatch===button));
    }));
    $('font-choice').addEventListener('change',event=>paper.classList.toggle('font-classic',event.target.value==='classic'));
    $('font-choice').addEventListener('change',event=>paper.classList.toggle('font-modern',event.target.value==='modern'));
    document.querySelectorAll('[data-density]').forEach(button=>button.addEventListener('click',()=>{
      paper.classList.toggle('density-compact',button.dataset.density==='compact');
      document.querySelectorAll('[data-density]').forEach(item=>item.classList.toggle('selected',item===button));
    }));
    let zoom = 1;
    function setZoom(next){zoom=Math.min(1.25,Math.max(.55,next));paper.style.transform=`scale(${zoom})`;paper.style.marginBottom=`${(zoom-1)*842}px`;$('zoom-label').textContent=`${Math.round(zoom*100)}%`}
    $('zoom-in').addEventListener('click',()=>setZoom(zoom+.1)); $('zoom-out').addEventListener('click',()=>setZoom(zoom-.1));
    $('fit-page').addEventListener('click',()=>{paper.style.removeProperty('transform');paper.style.removeProperty('margin-bottom');zoom=1;$('zoom-label').textContent='Fit'});
    addEntry('experience'); render();
  
