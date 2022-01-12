
var reader = new FileReader;
const date= new Date()
date.setDate(1)
const daysnum = document.querySelector('.days');
const taskscrolbox = document.querySelector('.scrollbox');
const monthlen = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();
const firstday = date.getDay();
const lastday = new Date(date.getFullYear(),date.getMonth() + 1,0).getDay();
const prevlastday = new Date(date.getFullYear(),date.getMonth(),0).getDate();
const nextday = 7 - lastday - 1;
const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemeber",
    "October",
    "November",
    "December"
];
const rendercalendar = () => {
    console.log(nextday);
    
    
    document.querySelector(".date h1").innerHTML = months[date.getMonth()] + ', ' + date.getFullYear();
    document.querySelector('.date p').innerHTML= new Date().toDateString();
    let days = "";
    for(let x = firstday ; x>0 ; x--){
        days += `<div class ="pre-date">${prevlastday- x + 1}</div>`;
    }
    for(let i = 1; i<=monthlen ;i++){
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()){
            days+=`<div class = "today">${i}</div>`;
    
        }
        else{
    
            days += `<div>${i}</div>`;
        }
    }
    for(let o = 1 ; o <= nextday;o++){
        days += `<div class="next-date">${o}</div>`;
    }
    daysnum.innerHTML = days;
    
}
let mainObj ={};
let showjson = function(){
    for (let prop in mainObj){
        console.log(prop);
        console.log(mainObj[prop]);
    }
}
const rendertasks = () =>{
    const selecteddate = document.querySelector(".topboard h2");
    const day = document.querySelectorAll(".days").forEach(element=>{
        element.addEventListener('click', event=>{
            let seldate = event.target.innerHTML;
            selecteddate.innerHTML = (seldate + ', ' +months[date.getMonth()] + ', ' + date.getFullYear())
            document.getElementById("taskadder1").style.display = "flex";
            
            gettasks();
            async function gettasks(){
                taskscrolbox.innerHTML ="";
                const taskdate = (seldate + '-' +months[date.getMonth()] + '-' + date.getFullYear());
                console.log(taskdate);
                const taskurl = "./Calendar.json";
                const response = await fetch(taskurl);
                const thejsonfile = await response.json();
                
                
                let length = (thejsonfile.length);
                for(let x = 0; x <= length-1;x++){
                    const activity = thejsonfile[x].ActivitiyName;
                    const date = thejsonfile[x].Date;
                    let addtask = ""
                    if(date == taskdate){
                        addtask += `<div>${activity}</div>`;
                        taskscrolbox.innerHTML += addtask;
                    }     
                }  
                selecttasks(thejsonfile);
            }
            async function selecttasks(thejsonfile){
                let date = "";
                let DesiredTimeSpent = "0";
                let ActualTimeSpent = "0";
                let TimeEfficiency = "0"
                const selectedtaskbox = document.querySelector(".thetop");
                const selectedtaskboxdiv = document.querySelectorAll(".addedtask div");
                const selectedtask = document.querySelectorAll(".scrollbox div").forEach(element=>{
                    element.addEventListener('click', event=>{
                        selectedtaskboxdiv.innerHTML ="";
                        console.log("1");
                        const selectedactivity = event.target.innerHTML;
                        let length = thejsonfile.length;
                        for(x =0;x<= length-1;x++){
                            const activity = thejsonfile[x].ActivitiyName;

                            if(activity == selectedactivity){
                                date = thejsonfile[x].Date;
                                DesiredTimeSpent = thejsonfile[x].DesiredTimeSpent;
                                ActualTimeSpent = thejsonfile[x].ActualTimeSpent;
                                TimeEfficiency = thejsonfile[x].TimeEfficiency;
                                
                                aname = thejsonfile[x].ActivitiyName;
                            }
                        }
                        let text = ""
                        selectedtaskbox.innerHTML = "";
                        text = `<h1>Selected Activity</h1>`;
                        selectedtaskbox.innerHTML += text;
                        text = `<div>Date: ${date}</div>
                        
                        `;
                        selectedtaskbox.innerHTML += text;
                        text = `<div>Name: ${aname}</div>
                        
                        `;
                        selectedtaskbox.innerHTML += text;
                        text = `<div>Desired length off session: ${DesiredTimeSpent}</div>
                        
                        `;
                        selectedtaskbox.innerHTML += text;
                        text = `<div>Actual length off session : ${ActualTimeSpent}</div>
                        
                        `;
                        selectedtaskbox.innerHTML += text;
                        text = `<div>Efficiency off time spent : ${TimeEfficiency}</div>
                        
                        `;
                        selectedtaskbox.innerHTML += text;
                    });
                });
                

            }

        })
          
    })

}
async function Addtask(){
    const taskurl = "./Calendar.json";
    const response = await fetch(taskurl);
    const thejsonfile = await response.json();
    let jonse = JSON.stringify(thejsonfile);
    let blob = new Blob([jonse],{type:"application/json"})
    let url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = "test.json";
    a.textContent = "Download backup.json";
    document.getElementById('json').appendChild(a)
}
rendercalendar();
rendertasks();
Addtask();
document.querySelector(".days div").addEventListener('click',()=>{
    rendercalendar();
} )

document.querySelector('.prev').addEventListener('click',()=>{
    date.setMonth(date.getMonth() -1);
    rendercalendar();
});
document.querySelector('.next').addEventListener('click',()=>{
    date.setMonth(date.getMonth() +1);
    rendercalendar();
});
