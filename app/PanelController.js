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
    indicatorAngle = 0;

    objectGeomProperties = {

        knobOutline: undefined,
        outlinePositionX: undefined,       
        outlinePositionY: undefined,
        outlineWidth: undefined, 
        outlineHeight: undefined, 
        centerX: undefined,
        centerY: undefined
    };      


    constructor()
    {
        this.buttonWrapper = document.querySelectorAll(".knob");
        this.heatDotWrapper = document.querySelector("#heat-label");
        this.loadFunctionality = this.loadPanelController();        
    };

    knobsActve()    {       
       
            this.buttonWrapper.forEach(knob => {
            knob.addEventListener("dblclick", (e) =>
            {  
               this.pressKnobs(knob);
            })            
        });            
    };

    pressKnobs(knob)
    {
        if (knob.classList.contains("power-knob") && this.isLeftPressed) {
             
            this.isLeftPressed = false;            
            knob.classList.add("unpressed");
               
        } else 
        
        if (knob.classList.contains("heat-knob") && this.isRightPressed) {
            knob.classList.add("unpressed");
            this.isRightPressed = false; 

        } else

        if (knob.classList.contains("power-knob") && !this.isLeftPressed) {
            knob.classList.remove("unpressed");
            this.isLeftPressed = true;                            
        } else

        if (knob.classList.contains("heat-knob") && !this.isRightPressed) {
            knob.classList.remove("unpressed");
            this.isRightPressed = true;         
        }  
    };    
  

    setMouseDown()
    {           
        this.buttonWrapper.forEach(knob =>{
        knob.addEventListener("mousedown", (e) => {
            
            if(!this.isAngleValueReadable && !this.isLeftPressed && !this.knobMousePressed && knob.classList.contains("power-knob"))
            {                
                this.getOutLineGeomProperties(knob);
                let x = e.clientX - this.objectGeomProperties.centerX;
                let y = e.clientY - this.objectGeomProperties.centerY;
                this.angleStartValue = (this.radianToDeg * Math.atan2(y, x)) + 180;
                console.log("poczatkowy kat po nacisnieu przycsku :" + this.angleStartValue)
                this.isAngleValueReadable = true;
                this.knobMousePressed = true;                
            }
            });
        });                 
    };

    setMouseMove()
    {       
        this.buttonWrapper.forEach(knob =>{
        knob.addEventListener("mousemove", (e) => {                           
                
            if(this.isLeftPressed == false && this.knobMousePressed == true && this.isAngleValueReadable == true && knob.classList.contains("power-knob"))
            {
                let x = e.clientX - this.objectGeomProperties.centerX;
                let y = e.clientY - this.objectGeomProperties.centerY;
                this.angleValue = (this.radianToDeg * Math.atan2(y, x)) + 180;
                this.indicatorAngle = (this.angleValue - this.angleStartValue)

                   
                    
                       
                        knob.style.transform =  "rotate(" + (this.indicatorAngle + this.angle) + "deg)";
                        console.log("to jest faktyczy kat indykatora :    " + this.angleValue)
                    

                
                // knob.style.transform =  "rotate(" + ((this.angleValue - this.angleStartValue)+ this.angle ) + "deg)";                   
                
                
                         
                } 
            });
        });
    };

    setMouseUp()
    {           
            this.buttonWrapper.forEach(knob =>{
                knob.addEventListener("mouseup", (e) => {                         
                if(!this.isLeftPressed && knob.classList.contains("power-knob") && this.isAngleValueReadable == true){           
                this.lastNotedAngleValue = this.angleValue;
                // console.log("to jest ostatni zapisany kat : " + this.lastNotedAngleValue)
                this.isAngleValueReadable = false;
                this.knobMousePressed = false;
                this.angle += this.indicatorAngle;
                console.log(" to jest wartosc kato zbiorczego " + this.angle)
                } 
            });
        });
    };
      getOutLineGeomProperties(knob)
    {
        
        this.objectGeomProperties.knobOutline = knob.getBoundingClientRect();        
        this.objectGeomProperties.outlinePositionX = this.objectGeomProperties.knobOutline.left;
        this.objectGeomProperties.outlinePositionY = this.objectGeomProperties.knobOutline.top;
        this.objectGeomProperties.outlineWidth = this.objectGeomProperties.knobOutline.width;
        this.objectGeomProperties.outlineHeight = this.objectGeomProperties.knobOutline.height;
        this.objectGeomProperties.centerX = this.objectGeomProperties.outlinePositionX + (this.objectGeomProperties.outlineWidth / 2);
        this.objectGeomProperties.centerY = this.objectGeomProperties.outlinePositionY + (this.objectGeomProperties.outlineHeight / 2);        
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

    loadPanelController()
    {
        this.generateHeatDots();
        this.knobsActve();
        this.setMouseDown();
        this.setMouseMove()
        this.setMouseUp();
   };
};