 import { Movies} from "./Movies.js";
 import { Light} from "./LightController.js";
 import { PanelController} from "./PanelController.js";

 class Application{

   constructor({inputWrapper, cubeWrapper, outputWrapper, ledDisplayWrapper}){

        this.inputWrapper = inputWrapper;
        this.cubeWrapper = cubeWrapper;
        this.outputWrapper = outputWrapper;
        this.ledDisplayWrapper = ledDisplayWrapper;        
        this.controlPanel = new PanelController();
        this.movie = new Movies();        
        this.title = this.movie.properties.title;
        this.light = new Light(this.title.length, this.ledDisplayWrapper);
        this.indexes = this.movie.indexes;
        this.ketboardLock = false;      
    };    

    createButtons(){

        for(let i = 0; i < 26; i++)
            {
                const btn = document.createElement("button");
                const label = (i+10).toString(36);
                btn.innerText = label;
                btn.classList.add("button");
                btn.addEventListener("click", () =>{
                            this.checkLetter(label, i);
                });
                this.inputWrapper.appendChild(btn);                             
            }; 
    };

    createCubes(){

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
         this.movie.getLetterIndexes(key.toUpperCase(), this.title.toUpperCase());

         this.inputWrapper.querySelectorAll("button")[i].classList.add("active");

         this.movie.indexes.forEach((index, i) => {
            setTimeout(() => {this.outputWrapper.querySelectorAll(".cube")[index].classList.add("rotate-cube") }, i *50)             
         }); 
        
         this.indexes =[]
    };    

    load(){

        this.createCubes();
        this.loadTileToQubes();
        // this.createButtons(); 
        // this.rotateCube();
        this.light.generateLed();
        this.controlPanel.prrintElement();
        // this.controlPanel.generateHeatDots();
    };
 };

     const application = new Application({
     inputWrapper: document.getElementById("input"),
     cubeWrapper: document.querySelector(".cube"),
     outputWrapper: document.querySelector(".output"),
     ledDisplayWrapper: document.querySelector("#led-display")        
 });

 application.load();




