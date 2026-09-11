const cfg=MN_getConfig();
const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function apply(c){
 document.documentElement.dataset.theme=c.tema||'light';
 document.documentElement.style.setProperty('--accent',c.corPrincipal);document.documentElement.style.setProperty('--accent-dark',c.corEscura);document.documentElement.style.setProperty('--bg',c.corFundo);document.documentElement.style.setProperty('--ink',c.corTexto);document.documentElement.style.setProperty('--display',`"${c.fonteTitulo}"`);document.documentElement.style.setProperty('--body',`"${c.fonteTexto}"`);document.body.dataset.borders=c.bordas;document.body.dataset.motion=c.animacoes;
 qa('[data-config]').forEach(el=>{const k=el.dataset.config;if(c[k]!=null)el.textContent=k==='rodapeTexto'?c[k].replace('{ano}',new Date().getFullYear()):c[k]});qa('[data-config-link]').forEach(el=>{const v=c[el.dataset.configLink];if(v){el.href=v;el.hidden=false}else el.hidden=true});
 document.title=`${c.nomeMarca} — Design de sobrancelhas`;q('#metaDescription').content=c.seoDescricao;
 const nav=[['#experiencia',c.menuExperiencia],['#servicos',c.menuServicos],['#resultados',c.menuResultados],['#galeria',c.menuGaleria],['#sobre',c.menuSobre],['#faq',c.menuFaq],['#contato',c.menuContato],['#agendamento',c.menuAgendar]];q('#desktopNav').innerHTML=nav.slice(0,7).map(x=>`<a href="${x[0]}">${esc(x[1])}</a>`).join('');q('#mobileNav').innerHTML=nav.map(x=>`<a href="${x[0]}">${esc(x[1])}</a>`).join('');
 renderMethods(c);renderServices(c);renderStats(c);renderGallery(c);renderTestimonials(c);renderFaq(c);renderHours(c);renderSocials(c);applyImages(c);
}
function renderMethods(c){q('#methodGrid').innerHTML=(c.metodo||[]).map((x,i)=>`<article><span>0${i+1}</span><h3>${esc(x.titulo)}</h3><p>${esc(x.texto)}</p></article>`).join('')}
function renderServices(c){q('#serviceGrid').innerHTML=(c.servicos||[]).map((x,i)=>`<article class="service-card ${x.destaque?'featured':''}">${x.imagem?`<img src="${x.imagem}" alt="${esc(x.nome)}">`:''}<div><small>${esc(x.categoria)}</small><h3>${esc(x.nome)}</h3><p>${esc(x.descricao)}</p></div><footer><span>${esc(x.preco||'Consulte')}</span><b>${esc(x.duracao||'')}</b></footer></article>`).join('')}
function renderStats(c){q('#statsGrid').innerHTML=(c.estatisticas||[]).map(x=>`<div><strong>${esc(x.valor)}</strong><span>${esc(x.rotulo)}</span></div>`).join('')}
function renderGallery(c){let a=c.galeria||[];q('#galleryGrid').innerHTML=a.length?a.map((x,i)=>`<button data-gallery="${i}"><img src="${x.imagem}" alt="${esc(x.legenda||'Resultado de sobrancelhas')}"><span>${esc(x.legenda||'Ver resultado')}</span></button>`).join(''):`<div class="empty-gallery">Adicione fotos pelo editor para montar seu portfólio.</div>`;qa('[data-gallery]').forEach(b=>b.onclick=()=>openLightbox(a[+b.dataset.gallery].imagem))}
function renderTestimonials(c){q('#testimonialTrack').innerHTML=(c.depoimentos||[]).map(x=>`<article><div class="stars">${'★'.repeat(Number(x.estrelas)||5)}</div><blockquote>“${esc(x.texto)}”</blockquote><p>${esc(x.nome)}</p></article>`).join('')}
function renderFaq(c){q('#faqList').innerHTML=(c.faq||[]).map((x,i)=>`<details ${i===0?'open':''}><summary>${esc(x.pergunta)}<span>+</span></summary><p>${esc(x.resposta)}</p></details>`).join('')}
function renderHours(c){q('#hoursList').innerHTML=(c.horarios||[]).map(x=>`<div><span>${esc(x.dia)}</span><strong>${esc(x.hora)}</strong></div>`).join('')}
function renderSocials(c){const a=[['Instagram',c.instagram],['TikTok',c.tiktok],['Facebook',c.facebook],['Pinterest',c.pinterest],['Threads',c.threads]].filter(x=>x[1]);q('#socialLinks').innerHTML=a.map(x=>`<a href="${x[1]}" target="_blank" rel="noopener">${x[0]}</a>`).join('')}
function applyImages(c){qa('[data-image-slot]').forEach(el=>{const src=c[el.dataset.imageSlot];if(src){el.style.backgroundImage=`linear-gradient(rgba(20,12,14,.05),rgba(20,12,14,.2)),url("${src}")`;el.classList.add('has-image');const span=q(':scope>span',el);if(span)span.style.display='none'}})}
function openLightbox(src){const d=q('#lightbox');q('img',d).src=src;d.showModal()}
q('#lightbox button').onclick=()=>q('#lightbox').close();q('#lightbox').onclick=e=>{if(e.target===q('#lightbox'))q('#lightbox').close()};
q('#menuButton').onclick=()=>{const m=q('#mobileMenu'),open=!m.classList.contains('open');m.classList.toggle('open',open);m.setAttribute('aria-hidden',!open);q('#menuButton').setAttribute('aria-expanded',open)};q('#mobileNav').onclick=()=>q('#menuButton').click();
window.addEventListener('scroll',()=>q('.site-header').classList.toggle('scrolled',scrollY>18),{passive:true});
const ba=q('#beforeAfter');q('input',ba).oninput=e=>ba.style.setProperty('--pos',e.target.value+'%');
window.addEventListener('message',e=>{if(e.data?.type==='MN_PREVIEW')apply({...MN_DEFAULTS,...e.data.config})});window.addEventListener('storage',()=>apply(MN_getConfig()));apply(cfg);
