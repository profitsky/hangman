 import { Movies } from "./Movies.js";

 class Application
 {

   constructor({inputWrapper,cubeWrapper,outputWrapper})
    {
        this.inputWrapper = inputWrapper;
        this.cubeWrapper = cubeWrapper;
        this.outputWrapper = outputWrapper;
        this.movie = new Movies();
        
                
       
        
        
    }

    selectMovie()
    {
        console.log(this.movie.properties.title);
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

    createCubes()
    {
        
        for (let i =0; i < this.movie.properties.title.length - 1; i++ )
        this.outputWrapper.appendChild(this.cubeWrapper.cloneNode(true));

        console.log(this.cubeWrapper)
       
    }



    load()
    {       
        this.createButtons();
        this.selectMovie();
        this.createCubes();
            
    };
 };



 const application = new Application({
     inputWrapper: document.getElementById("input"),
     cubeWrapper: document.querySelector(".cube"),
     outputWrapper: document.querySelector(".output")
    
 });

 application.load();




