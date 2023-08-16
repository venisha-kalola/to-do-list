let todoList=[ ];

window.addEventListener('load', function () {
    const savedNames = localStorage.getItem('names');
    const savedDates = localStorage.getItem('dates');
    
    if (savedNames && savedDates) {
        const namesArray = savedNames.split(',');
        const datesArray = savedDates.split(',');
        
        // Reconstruct the todoList array from the saved data
        todoList = namesArray.map((name, index) => ({
            name: name,
            dueDate: datesArray[index]
        }));
        updateList(); 
    }
});

const nameEl = document.querySelector(".name-input");
let text=document.querySelector(".list");
const date=document.querySelector(".date");

const addEl = document.querySelector(".add");
addEl.addEventListener("click",function(){
    addTo();
})

document.addEventListener("keydown",function(event){
    if(event.key=="Enter"){
        addTo();
    }
})

function addTo(){
    todoList.push({
        name :nameEl.value,
        dueDate:date.value, //dueDate : dueDate
        completed : false
    });
   
    nameEl.value ="";
    date.value="";
    updateList();
}

function updateList(){
    let todoHtml ='';
    let n=[];
    let d=[];
    todoList.forEach((todoObj,index)=> {
        //const name=todoObj.name;
        // const dueDate=todoObj.dueDate;
        const {name,dueDate}=todoObj;
        const list = `
        <div> ${name}</div>
        <div> ${dueDate}</div>
        <button class="delete-btn">Delete</button>
        <div class="ch" ><input type="checkbox" class="check"></div>
        `;
        n.push(name);
        d.push(dueDate);
        todoHtml+=list;  
    }) 
localStorage.setItem('names',n.join(','));
localStorage.setItem('dates',d.join(','));
    text.innerHTML=todoHtml;
    document.querySelectorAll('.delete-btn').forEach((deleteB,index)=>{
        deleteB.addEventListener('click',()=>{
            todoList.splice(index,1);
            updateList();
        });
    });
}
