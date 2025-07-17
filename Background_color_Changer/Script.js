
    const buttons=document.querySelectorAll(".btn button")
    
    buttons.forEach(button => {
        button.addEventListener('click',function(){
            document.body.style.backgroundColor=this.className;
        })
    })
