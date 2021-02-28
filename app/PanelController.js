import { Sufler} from "./Sufler.js"; 

export class PanelController
{
    
    dotsNumber = 12;
    heatRange = 180;
    radius = 55;
    dotPositionX;
    dotPositionY;
    isLeftPressed = true;
    isRightPressed = true;
    knobMousePressed = false;
    isAngleValueReadable = false;
    angleStartValue = 0;    
    radianToDeg = 180/Math.PI;
    angleValue =0; 
    angle = 0; 
    indicatorAngle = 0;
    transformedAngle; 
   

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
        this.shadowWrapper = document.querySelector(".knob-shadow");
        this.sufler = new Sufler();
        this.sufler.timeStarter();     
        this.sufler.typeMessage(this.sufler.messagesForUser.welcome);
                   
    };

    knobsActve()
    {     
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
            // this.shadowWrapper.classList.add("unpressed")                           
        } 
        else if (knob.classList.contains("heat-knob") && this.isRightPressed) {

            knob.classList.add("unpressed");
            this.isRightPressed = false;
        } else if (knob.classList.contains("power-knob") && !this.isLeftPressed) {

            knob.classList.remove("unpressed");
            // this.shadowWrapper.classList.remove("unpressed");
            this.isLeftPressed = true;                            
        } else if (knob.classList.contains("heat-knob") && !this.isRightPressed) {

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
                
            if(this.isLeftPressed == false && this.knobMousePressed == true && this.isAngleValueReadable === true && knob.classList.contains("power-knob"))
                {
                    let x = e.clientX - this.objectGeomProperties.centerX;
                    let y = e.clientY - this.objectGeomProperties.centerY;
                    this.angleValue = (this.radianToDeg * Math.atan2(y, x)) + 180;
                    this.indicatorAngle = (this.angleValue - this.angleStartValue)                    
                    knob.style.transform =  "rotate(" + (this.indicatorAngle + this.angle) + "deg)";
                    this.getKnobAngleValue(knob);             
                                                           
                }; 
            });
        });
    };

    setMouseUp()
    {           
            this.buttonWrapper.forEach(knob =>{
                knob.addEventListener("mouseup", (e) => {                         
                if(!this.isLeftPressed && knob.classList.contains("power-knob") && this.isAngleValueReadable == true &&  this.knobMousePressed == true){                    
                    let x = e.clientX - this.objectGeomProperties.centerX;
                    let y = e.clientY - this.objectGeomProperties.centerY;
                    const angleValue = (this.radianToDeg * Math.atan2(y, x)) + 180;               
                   this.knobMousePressed = false;                
                   this.isAngleValueReadable = false;               

                if(this.angleValue == angleValue)
                {
                    this.angle += this.indicatorAngle;                    
                }
                }; 
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

    getKnobAngleValue(knob)
    {
        const st = window.getComputedStyle(knob, null);
        const tr = st.getPropertyValue("transform") || "fail...";
        let values = tr.split('(')[1];
            values = values.split(')')[0];
            values = values.split(',');            
        let a = values[0];
        let b = values[1];
        
        let scale = Math.sqrt(a*a + b*b);        
        let sin = b/scale;
        let angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        return angle;
      
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