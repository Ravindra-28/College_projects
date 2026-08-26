const form=document.getElementById('form'),list=document.getElementById('list');
let data=JSON.parse(localStorage.getItem('expenses')||'[]');
function save(){localStorage.setItem('expenses',JSON.stringify(data));render()}
function render(){
 list.innerHTML='';let income=0,expense=0;
 data.forEach((x,i)=>{x.type==='income'?income+=x.amount:expense+=x.amount;
 const li=document.createElement('li');li.className=x.type;
 li.innerHTML=`<span><b>${escapeHtml(x.name)}</b><br>₹${x.amount.toFixed(2)}</span><button class="delete" onclick="removeItem(${i})">Delete</button>`;list.appendChild(li)});
 document.getElementById('income').textContent=`₹${income.toFixed(2)}`;
 document.getElementById('expense').textContent=`₹${expense.toFixed(2)}`;
 document.getElementById('balance').textContent=`₹${(income-expense).toFixed(2)}`;
}
function removeItem(i){data.splice(i,1);save()}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
form.addEventListener('submit',e=>{e.preventDefault();const amount=Number(document.getElementById('amount').value);data.push({name:document.getElementById('name').value,amount,type:document.getElementById('type').value});form.reset();save()});
render();