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
        this.topDotsWrapper = document.getElementsByClassName(".dot");
        this.buttonWrapper = document.querySelectorAll(".knob");
        this.heatDotWrapper = document.getElementById("heat-label");
        this.divsCollection;
        this.topDotsOrderedCollection = this.orderTopDots();    
        this.shadowLeftWrapper = document.querySelector(".left-shadow");
        this.shadowRightWrapper = document.querySelector(".right-shadow");          
        this.sufler = new Sufler();
        this.sufler.timeStarter();     
        this.sufler.typeMessage(this.sufler.messagesForUser.welcome); 
        this.sufler.knobLabelWrapper[0].classList.add("power-on");
        this.isPowerOn = false;
        this.timeOutId;
        this.dotTimeId;        
        this.loadFunctionality = this.loadPanelController(); 
        console.log(this.topDotsWrapper)       
       
         
                   
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
          
            this.shadowLeftWrapper.classList.add("unpressed");            
            this.isLeftPressed = false;                         
        } 
        else if (knob.classList.contains("heat-knob") && this.isRightPressed) {

            this.shadowRightWrapper.classList.add("unpressed")  
            this.isRightPressed = false;
        } else if (knob.classList.contains("power-knob") && !this.isLeftPressed) {
           
            this.shadowLeftWrapper.classList.remove("unpressed");
            this.isLeftPressed = true; 
                                     
        } else if (knob.classList.contains("heat-knob") && !this.isRightPressed) {

            this.shadowRightWrapper.classList.remove("unpressed");
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
                    this.angValue(knob);
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

        this.divsCollection = this.heatDotWrapper.querySelectorAll(".heat-dot");              
    };

    angValue = function getKnobAngleValue(element)
    {
        const st = window.getComputedStyle(element, null);
        const tr = st.getPropertyValue("transform");
        let values = tr.split('(')[1];
            values = values.split(')')[0];
            values = values.split(',');            
        let a = values[0];
        let b = values[1];       
        let angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

        if (angle >= 176 || angle <= -176 && this.isPowerOn == false){   
            this.powerOnDetected();            
        } else if (this.isPowerOn == true){
            this.powerOfDetected();            
        }         
    };

    powerOnDetected()
    {
        if(this.isPowerOn == false){
            this.timeOutId = setTimeout(() => {
                this.sufler.infOutputWrapper.forEach((info) => {
                info.classList.add("power-on")});
                this.heatKnobLight();
                this.welcomeTopDots();
                this.orderTopDots();
                            
            }, 800);
        this.sufler.knobIndicatorWrapper.forEach((info) => {
            info.classList.add("pwr-on")});
        this.sufler.knobLabelWrapper[0].classList.remove("power-on");
        this.sufler.knobLabelWrapper[1].classList.add("power-on");
        this.isPowerOn = true;
             
        };                                
    };

    powerOfDetected()
    {        
        if(this.isPowerOn == true){
        clearTimeout(this.timeOutId)
        this.sufler.infOutputWrapper.forEach((info) => {
                info.classList.remove("power-on")})
        this.sufler.knobIndicatorWrapper.forEach((info) => {
                info.classList.remove("pwr-on")});
        this.sufler.knobLabelWrapper[0].classList.add("power-on");
        this.sufler.knobLabelWrapper[1].classList.remove("power-on");        
        this.isPowerOn = false;      
        };
        clearInterval(this.topDotsWrapper)  ;      
    };

    heatKnobLight()
    {
        let index = 0;
        let isGoDown = false;
        this.dotTimeId = setInterval(() => {

            if (index != this.divsCollection.length &&!isGoDown)
            {                
                this.divsCollection[index].classList.add("running");              
            }else if (index >= this.divsCollection.length && index < this.divsCollection.length * 2)
            {                
                this.divsCollection[index - this.divsCollection.length].classList.remove("running");
                isGoDown = true;
            }            
            else
            {
                index = 0;
                clearInterval(this.dotTimeId)
            }
            index++;             
        }, 35);        
    };

   

    welcomeTopDots()
    {
        const dots = document.querySelectorAll(".dot");
        let index = 0;
        let isGoDown = false;


        // setInterval(() => {
        //     if (index <= (dots.length/2)-3 &&!isGoDown)
        //     {                
        //         dots[index].classList.add("dot-welcome");              
        //     }else if (index >= dots.length/2  && index < dots.length)
        //     {                
        //         dots[index - dots.length/2].classList.remove("dot-welcome");
        //         isGoDown = true;
        //     }else if(index >= dots.length)
        //     {
        //         index = 0;
        //     }
        //     index++;       
                  
             
        // }, 105);    
        
        dots[dots.length/2-2].classList.add("dot-welcome")        
    }

   




    loadPanelController()
    {            
        this.generateHeatDots();        
        this.knobsActve();
        this.setMouseDown();
        this.setMouseMove()
        this.setMouseUp();        
         
    };
};