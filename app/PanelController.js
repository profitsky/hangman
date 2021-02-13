export class PanelController
{
    
    dotsNumber = 12;
    heatRange = 180;
    radius = 60;
    dotPositionX;
    dotPositionY;
    constructor()
    {
        this.buttonWrapper = document.querySelectorAll(".knob");
        this.heatDotWrapper = document.querySelector("#heat-label");
        this.heatDotsArray = this.generateHeatDots();
    }

    prrintElement()
    {
            this.buttonWrapper.forEach(knob => {
            knob.addEventListener("click", () =>
            {
                knob.classList.toggle("unpressed");
            })            
        });        
    };

    generateHeatDots()    
    {
        for (let i =0; i < this.dotsNumber; i++)
        {
            this.dotPositionX = (-((Math.cos(i*(this.heatRange/(this.dotsNumber-1))*Math.PI/180))*this.radius) + "px");
            this.dotPositionY = (-((Math.sin(i*(this.heatRange/(this.dotsNumber-1))*Math.PI/180))*this.radius) + "px");            

            const dot = document.createElement("div");
            dot.classList.add("heat-dot");
            dot.style.transform = `translate(${this.dotPositionX},${this.dotPositionY})`         
            this.heatDotWrapper.appendChild(dot);           
        };      
    };
};