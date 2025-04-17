import router from "../router/index.js";

export function fillDaysWithoutData(from, to, data) {
  let labels= []
  let newData=[]

  const dateMove = new Date(from);
  let strDate = from;
  let dataEntry

  while (strDate < to ?? new Date()) {
    strDate = dateMove.toISOString().slice(0, 10);
    labels.push(strDate);
    dateMove.setDate(dateMove.getDate() + 1);
    dataEntry = data.find((entry) => entry.day === strDate)
    newData.push(dataEntry ? dataEntry.amount : 0) 
  };
  return {data: newData, labels: labels}
}

export function totalFromPeriod(data){
  let total = 0
  data.forEach((day)=>{
    total += day.amount
  })
  return total
}

export function randomColor(){
  return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

export function logout(){
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  router().replace({name:'index'})
}

