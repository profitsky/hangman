 import { Movies } from "./Movies.js";

 class Application{

   constructor({inputWrapper,cubeWrapper,outputWrapper}){

        this.inputWrapper = inputWrapper;
        this.cubeWrapper = cubeWrapper;
        this.outputWrapper = outputWrapper;
        this.movie = new Movies();           
    };

    selectMovie(){

        console.log(this.movie.properties.title);
    };

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

    createCubes(){

        for (let i =0; i < this.movie.properties.title.length - 1; i++ )
        this.outputWrapper.appendChild(this.cubeWrapper.cloneNode(true));         
    };

    loadTileToQubes()
    {
        for (let i =0 ; i < this.movie.properties.title.length; i++)
        {
            if(this.movie.properties.title[i] == " ")
            {
                this.outputWrapper.querySelectorAll(".question-mark")[i].innerText = " ";
                this.outputWrapper.querySelectorAll(".letter-mark")[i].innerText = " ";
            } else
            {
                this.outputWrapper.querySelectorAll(".question-mark")[i].innerText = "?";
                this.outputWrapper.querySelectorAll(".letter-mark")[i].innerText = this.movie.properties.title[i];
            }
        }
    };

    load(){
        this.createCubes();
        this.loadTileToQubes();
        this.createButtons();        
        
        // this.outputWrapper.querySelectorAll(".question-mark")[0].innerText = "C";
        // console.log(this.outputWrapper.querySelectorAll(".question-mark")[0])
    };
 };



 const application = new Application({
     inputWrapper: document.getElementById("input"),
     cubeWrapper: document.querySelector(".cube"),
     outputWrapper: document.querySelector(".output")
    
 });

 application.load();




