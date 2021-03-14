 import { Movies} from "./Movies.js";
 import { Light} from "./LightController.js";
 import { PanelController} from "./PanelController.js";
 import { Cooker} from "./Cooker.js";   

 class Application{

   constructor({inputWrapper, cubeWrapper, outputWrapper, ledDisplayWrapper}){

        this.inputWrapper = inputWrapper;
        this.cubeWrapper = cubeWrapper;
        this.outputWrapper = outputWrapper;
        this.ledDisplayWrapper = ledDisplayWrapper;        
        this.controlPanel = new PanelController();
        this.movie = new Movies();            
        this.title = this.movie.properties.title;
        this.category = this.movie.properties.category;
        this.emojis = this.movie.properties.emojis;
        this.light = new Light(this.title.length, this.ledDisplayWrapper);
        this.door = new Cooker();        
        this.ketboardLock = false;
        this.categoryWrapper = document.getElementById("category");
        this.emojisWrapper = document.getElementById("emojis");
        this.isGameOver = false;
        this.step = 1;            
    };    

    createButtons(){

        for(let i = 0; i < 26; i++)
            {
                const btn = document.createElement("button");
                const label = (i+10).toString(36);
                btn.innerText = label;
                btn.classList.add("button");                
                btn.addEventListener("click", () =>{
                    if(this.door.dropped && !this.isGameOver)
                    
                        this.checkLetter(label, i);                            
                });
                this.inputWrapper.appendChild(btn);                             
            }; 
    };

    createCubes()
    {
        for (let i =0; i < this.title.length - 1; i++ )
        this.outputWrapper.appendChild(this.cubeWrapper.cloneNode(true));         
    };

    loadTileToQubes()
    {
        for (let i =0 ; i < this.title.length; i++)
        {
            if(this.title[i] == " ")
            {
                this.outputWrapper.querySelectorAll(".question-mark")[i].innerText = " ";
                this.outputWrapper.querySelectorAll(".cube")[i].classList.add("rotate-cube");              
                this.outputWrapper.querySelectorAll(".letter-mark")[i].innerText = " ";
                
            } else
            {
                this.outputWrapper.querySelectorAll(".question-mark")[i].innerText = "?";
                this.outputWrapper.querySelectorAll(".letter-mark")[i].innerText = this.title[i];
                this.outputWrapper.querySelectorAll(".letter-mark")[i].classList.add("light-on");           
            }
        }
    };   

    checkLetter(key, i)
    {  
            this.inputWrapper.querySelectorAll("button")[i].classList.add("active");
            if(this.title.toUpperCase().includes(key.toUpperCase())){
            
            this.movie.getLetterIndexes(key.toUpperCase(), this.title.toUpperCase());
            this.movie.indexes.forEach((index, i) => {
                setTimeout(() => {this.outputWrapper.querySelectorAll(".cube")[index].classList.add("rotate-cube") }, i *50) 
                this.winGame();   
            });
        }
        else
        {
            this.controlPanel.heatKnobProgress(this.step, this.movie.limit);
            this.controlPanel.heatLightProgress(this.step);
            this.door.fishAnimationLose(this.step);
            this.door.smokeAnimationLose(this.step);
            this.loseGame();
            this.step++;
        }
    };

    winGame()
    {
        if(this.movie.lettersArr.length == this.movie.indexes.length)
        {
            console.log("wygrales")
            console.log("tablica znakow : " + this.movie.lettersArr.length)
            console.log("tablica indexow : " + this.movie.indexes.length)
            this.door.finalWinAniamtion();
            return this.isGameOver = true;
        }
    };

    loseGame()
    {
        if(this.step === this.movie.limit)
        {
            this.door.finalLoseAniamtion();
            return this.isGameOver = true;      
        }
    };

    showTips()
    {
        this.categoryWrapper.innerHTML = this.category;
        this.emojisWrapper.innerHTML = this.emojis;
    };

    load(){        
        this.createCubes();
        this.loadTileToQubes();
        this.createButtons();        
        this.light.generateLed();
        this.showTips();
        this.door.setMouseDown()
        this.door.setMouseMove();
        this.door.setMouseUp()
        this.door.mouseLeave()
        this.door.getOutLineGeomProperties()       
        this.door.bowlOnDragLeave()
        this.door.bowlDragEnter() 
        this.door.smokeDivsSeparate()
    };
};

     const application = new Application({
     inputWrapper: document.getElementById("input"),
     cubeWrapper: document.querySelector(".cube"),
     outputWrapper: document.querySelector(".output"),
     ledDisplayWrapper: document.querySelector("#led-display")        
    });

    application.load();




