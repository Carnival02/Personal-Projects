const secondHand=document.querySelector('.second-hand');
const minsHand=document.querySelector('.mins-hand');
const hourHand=document.querySelector('.hour-hand');

function setDate(){
    const now =new Date();
    const seconds=now.getSeconds();   
    const secondDegrees=((seconds/60)*360)+90;
    secondHand.style.transform=`rotate(${secondDegrees}deg)`;

    // console.log(second);

    const mins=now.getMinutes();
    const minsDegrees=((mins/60)*360)+90;
    minsHand.style.transform=`rotate(${minsDegrees}deg)`;

    const hour=now.getHours();
    const hourDegrees=((hour%12)/12*360)+ ((mins / 60) * 30)+90;
    hourHand.style.transform=`rotate(${hourDegrees}deg)`;

    
}
setInterval(setDate,1000);