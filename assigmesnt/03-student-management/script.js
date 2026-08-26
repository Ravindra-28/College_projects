const form=document.getElementById('form'),tbody=document.getElementById('tbody'),search=document.getElementById('search');
let students=JSON.parse(localStorage.getItem('students')||'[]');
function render(){
 const q=search.value.toLowerCase();tbody.innerHTML='';
 students.filter(s=>Object.values(s).some(v=>String(v).toLowerCase().includes(q))).forEach((s,i)=>{
 const tr=document.createElement('tr');tr.innerHTML=`<td>${esc(s.name)}</td><td>${esc(s.roll)}</td><td>${esc(s.course)}</td><td>${s.marks}</td><td><button class="delete" onclick="removeStudent(${students.indexOf(s)})">Delete</button></td>`;tbody.appendChild(tr)});
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function removeStudent(i){students.splice(i,1);localStorage.setItem('students',JSON.stringify(students));render()}
form.addEventListener('submit',e=>{e.preventDefault();students.push({name:name.value,roll:roll.value,course:course.value,marks:Number(marks.value)});localStorage.setItem('students',JSON.stringify(students));form.reset();render()});
search.addEventListener('input',render);render();