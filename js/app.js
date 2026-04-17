function markComplete(){
fetch("http://localhost:3000/progress",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({user_id:1,course:"SAP",lesson:"Intro",completed:1})
});
}
