 class Application
 {
    constructor({inputWrapper})
    {
        this.inputWrapper = inputWrapper;
        
        
    }

    createButtons(){

        for(let i = 10; i < 36; i++)
            {
                const btn = document.createElement("button");
                const label = (i).toString(36);
                btn.innerText = label;
                btn.classList.add("button");
                this.inputWrapper.appendChild(btn);                             
            }; 
    };



    load()
    {
            this.createButtons();
    };
 };



 const application = new Application({
     inputWrapper: document.getElementById("input"),
    
 });

 application.load();




