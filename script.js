const dot=document.querySelector('.cursor-dot');
document.addEventListener('mousemove',e=>{if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}});
const revealEls=document.querySelectorAll('.problem-card,.case,.service-list>div,.belief-list div,.timeline>div');
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in')}}),{threshold:.12});
revealEls.forEach(el=>{el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity .7s ease, transform .7s ease';io.observe(el)});
const style=document.createElement('style');style.textContent='.in{opacity:1!important;transform:none!important}';document.head.appendChild(style);
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
