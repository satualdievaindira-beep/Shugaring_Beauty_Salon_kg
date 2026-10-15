const WA='996557520120';
const BRANCHES=[
 ['Тыналиева 100 (филиал Джал)','https://2gis.kg/bishkek/geo/70000001111131196'],
 ['Чуй 147/1, пер. Гоголя','https://2gis.kg/bishkek/geo/70000001102536590'],
 ['Абдрахманова 99/1, пер. Линейная','https://2gis.kg/bishkek/geo/70000001048674356'],
 ['5 мкр, 56а','https://2gis.kg/bishkek/geo/70000001032167051']];
const P={
sugar:{name:'Шугаринг',g:[['Зоны',[['Лицо',700],['Баки, усики',300],['Подмышки',300],['Руки до локтя',500],['Руки полностью',600],['Живот',500],['Спина',700],['Поясница',400],['Глубокое бикини',800],['Ноги до колена',600],['Ноги полностью',900],['Затылок',400]]],
 ['Комплексы',[['Глубокое бикини + подмышки',1000],['Глубокое бикини + ноги до колена + подмышки',1600],['Глубокое бикини + ноги до колена + руки до локтя',1900],['Глубокое бикини + подмышки + руки до локтей + ноги до колен',2100],['Глубокое бикини + подмышки + руки и ноги полностью',2500]]]]},
wax:{name:'Восковая депиляция',g:[['Лицо',[['Лицо',800],['Баки | усики',300],['Затылок',500]]],['Руки',[['Руки до локтя',600],['Руки полностью',700]]],['Ноги',[['Ноги до колен',700],['Ноги полностью',1000]]],['Бикини',[['Глубокое бикини',900]]],['Тело',[['Подмышки',300],['Поясница',500],['Живот',600],['Спина',800]]]]},
laser:{name:'Лазерная эпиляция',g:[['Лицо',[['Лицо',1500],['Баки',500],['Подбородок',500],['Усики',500],['Затылок',900]]],['Руки',[['Руки до локтя',1100],['Руки полностью',1500]]],['Ноги',[['Ноги до колен',1600],['Ноги полностью',2500]]],['Бикини',[['Классическое бикини',990],['Глубокое бикини',1500]]],['Тело',[['Подмышки',1000],['Грудь',1500],['Линия живота',500],['Живот',900],['Поясница',900],['Спина',2500]]]]},
men:{name:'Мужская депиляция',g:[['Мужские зоны',[['Усики',400,15],['Спина',1100,20],['Руки полностью',1000,20],['Руки до локтя',800,15],['Подмышки',400,10],['Ноги полностью',1500,30],['Ноги до колен',1000,20],['Лицо',1300,25],['Зона ягодицы',700,15],['Зона поясницы',600,15],['Зона груди',800,15],['Зона баки',400,10],['Затылок',500,15],['Живот',700,20],['Паховая зона',1400,30],['Лоб',400,20],['Борода',500,15],['Область попы',400,10],['Волосики в носу',400,10]]]]}};
const $=s=>document.querySelector(s);
const tabs=$('#tabs'),out=$('#price-out');
function show(k){
 [...tabs.children].forEach(b=>b.classList.toggle('on',b.dataset.k===k));
 out.innerHTML=P[k].g.map(([t,r])=>`<div class="group"><h4>${t}</h4>${r.map(x=>`<div class="row"><span>${x[0]}${x[2]?`<small>${x[2]} мин</small>`:''}</span><b>${x[1]} сом</b></div>`).join('')}</div>`).join('');
}
Object.keys(P).forEach(k=>{const b=document.createElement('button');b.textContent=P[k].name;b.dataset.k=k;b.onclick=()=>show(k);tabs.appendChild(b)});
show('sugar');
document.querySelectorAll('[data-tab]').forEach(a=>a.addEventListener('click',()=>show(a.dataset.tab)));
// форма
const svc=[];Object.values(P).forEach(p=>svc.push(p.name));
svc.push('Отбеливание зоны бикини и подмышек','SPA процедура для бикини');
$('#service').innerHTML=svc.map(s=>`<option>${s}</option>`).join('');
$('#branch').innerHTML=BRANCHES.map(b=>`<option>${b[0]}</option>`).join('');
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{$('#service').value=a.dataset.service}));
$('#branch-list').innerHTML=BRANCHES.map(b=>`<div class="card"><i>📍</i><h3>${b[0]}</h3><p>Бишкек. Маршрут и отзывы в 2ГИС</p><a href="${b[1]}" target="_blank" rel="noopener">Открыть в 2ГИС →</a></div>`).join('');
const d=$('#date');d.min=new Date().toISOString().split('T')[0];
$('#form').addEventListener('submit',e=>{
 e.preventDefault();
 const name=$('#name').value.trim(),phone=$('#phone').value.trim(),date=d.value,time=$('#time').value;
 if(!name||phone.replace(/\D/g,'').length<9||!date||!time){$('#err').textContent='Заполните имя, телефон, дату и время';return}
 $('#err').textContent='';
 const dt=date.split('-').reverse().join('.');
 const c=$('#comment').value.trim();
 const msg=`Здравствуйте! Хочу записаться 🌸\n\nИмя: ${name}\nТелефон: ${phone}\nУслуга: ${$('#service').value}\nФилиал: ${$('#branch').value}\nДата: ${dt}\nВремя: ${time}`+(c?`\nКомментарий: ${c}`:'')+`\n\nЗапись с сайта Shugaring_Beauty_Bishkek`;
 window.location.href=`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
});
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
document.querySelectorAll('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
$('#y').textContent=new Date().getFullYear();
// счётчик
const n=document.querySelector('[data-n]');
new IntersectionObserver((en,o)=>{if(en[0].isIntersecting){let i=0,t=+n.dataset.n;const s=setInterval(()=>{i+=t/50;if(i>=t){i=t;clearInterval(s)}n.textContent=Math.round(i).toLocaleString('ru')+'+'},30);o.disconnect()}}).observe(n);
