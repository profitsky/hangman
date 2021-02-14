export class PanelController
{
    
    dotsNumber = 12;
    heatRange = 180;
    radius = 60;
    dotPositionX;
    dotPositionY;
    isLeftPressed = true;
    isRightPressed = true;
    knobMousePressed = false;
    isAngleValueReadable = false;
    angleStartValue = 0;
    knobAngle = 0;
    rotation = 0;
    radianToDeg = 180/Math.PI;
    angleValue =0;
    rotation = 0;
    angle = 0;
    lastNotedAngleValue = 0;

    objectGeomProperties = {

        knobOutline: undefined,
        outlinePositionX: undefined,       
        outlinePositionY: undefined,
        outlineWidth: undefined, 
        outlineHeight: undefined, 
        centerX: undefined,
        centerY: undefined
    }


       


    constructor()
    {
        this.buttonWrapper = document.querySelectorAll(".knob");
        this.heatDotWrapper = document.querySelector("#heat-label");
        this.loadFunctionality = this.loadPanelController();
    }

    knobsActve()    {       
       
            this.buttonWrapper.forEach(knob => {
            knob.addEventListener("dblclick", (e) =>
            {  if(this.knobMousePressed === true){
                e.preventDefault();
            }
               this.pressKnobs(knob);
            })            
        });            
    };

    pressKnobs(knob)
    {
        if (knob.classList.contains("power-knob") && this.isLeftPressed) {
             
            this.isLeftPressed = false;
            this.rotateKnob(knob);  
            knob.classList.add("unpressed");
               
        } else 
        
        if (knob.classList.contains("heat-knob") && this.isRightPressed) {
            knob.classList.add("unpressed");
            this.isRightPressed = false; 

        } else

        if (knob.classList.contains("power-knob") && !this.isLeftPressed) {
            knob.classList.remove("unpressed");
            this.isLeftPressed = true;
            console.log("lewy przycisl jest wcisnie ty : " + this.isLeftPressed)                 
        } else

        if (knob.classList.contains("heat-knob") && !this.isRightPressed) {
            knob.classList.remove("unpressed");
            this.isRightPressed = true;         
        }  
    };

  

  

    setMouseDown(knob)
    {       
        
            if(!this.isAngleValueReadable && this.isLeftPressed === false && !this.knobMousePressed){
            knob.addEventListener("mousedown", (e) => {
                 e.preventDefault();  
            let x = e.clientX - this.objectGeomProperties.centerX;
            let y = e.clientY - this.objectGeomProperties.centerY;
            this.angleStartValue = (this.radianToDeg * Math.atan2(y, x)) +180;
            console.log("poczatkowy kat po nacisnieu przycsku :" + this.angleStartValue)
            this.isAngleValueReadable = true;
            this.knobMousePressed = true;
             }, false);
        };              
    };

    setMouseMove(knob)
    {       
            knob.addEventListener("mousemove",(e) => { 
                
                if(this.isLeftPressed == false && this.knobMousePressed == true && this.isAngleValueReadable == true){ 
                  e.preventDefault();               
            let x = e.clientX - this.objectGeomProperties.centerX;
            let y = e.clientY - this.objectGeomProperties.centerY;
            this.angleValue = (this.radianToDeg * Math.atan2(y, x)) +180;
            console.log(this.angleValue)
            
            
            // this.rotation = this.angleValue - this.angleStartValue;
            knob.style.transform =  "rotate(" + ((this.angleValue - this.angleStartValue)+ this.angle ) + "deg)";
            // console.log("to jest wywolane z metody mousse move " + this.angleValue)                
            };
        }, false);                   
    };   

    setMouseUp(knob)
    {           
            knob.addEventListener("mouseup", (e) => {
               
                if(!this.isLeftPressed){
             e.preventDefault();
            
            this.lastNotedAngleValue += this.angleValue;
            console.log(" to jet wartosc konta zapisana po podniesieniu myszki" + this.lastNotedAngleValue) 
            this.isAngleValueReadable = false;
            this.knobMousePressed = false;
            this.angle += (this.angleValue - this.angleStartValue)   }      
            });
          
    }; 

      rotateKnob(knob)
    {   
        this.getOutLineGeomProperties(knob);
        this.setMouseDown(knob);      
        this.setMouseMove(knob);        
        this.setMouseUp(knob);       
    }

    

    





      getOutLineGeomProperties(knob)
    {
        
        this.objectGeomProperties.knobOutline = knob.getBoundingClientRect();        
        this.objectGeomProperties.outlinePositionX = this.objectGeomProperties.knobOutline.left;
        this.objectGeomProperties.outlinePositionY = this.objectGeomProperties.knobOutline.top;
        this.objectGeomProperties.outlineWidth = this.objectGeomProperties.knobOutline.width;
        this.objectGeomProperties.outlineHeight = this.objectGeomProperties.knobOutline.height;
        this.objectGeomProperties.centerX = this.objectGeomProperties.outlinePositionX + (this.objectGeomProperties.outlineWidth / 2);
        this.objectGeomProperties.centerY = this.objectGeomProperties.outlinePositionY + (this.objectGeomProperties.outlineHeight / 2);        
    }

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

    loadPanelController()
    {
        this.generateHeatDots();
        this.knobsActve();


    }
};