import { Sufler} from "./Sufler.js";
import { Light} from "./LightController.js";
import { Items} from "./LeftSlider.js";
import { Keyboard} from "./RightSlider.js";
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
        this.barWrapper = document.querySelector(".oven-front");
        this.heatKnobWrapper = document.querySelector(".heat-knob");
        this.heatDotWrapper = document.getElementById("heat-label");
        this.topWallWrapper = document.getElementById("top-light");
        this.cookerWallsWrapper = document.querySelectorAll(".wall-light");
        this.cookerWindowWrapper = document.querySelector(".window-frame");
        this.divsCollection;
        this.topDotsOrderedCollection;   
        this.shadowLeftWrapper = document.querySelector(".left-shadow");
        this.shadowRightWrapper = document.querySelector(".right-shadow");          
        this.sufler = new Sufler();
        this.light = new Light();
        this.leftSlider = new Items();
        this.keyboard = new Keyboard();
        this.sufler.timeStarter();     
        this.sufler.typeMessage(this.sufler.messagesForUser.welcome); 
        this.sufler.knobLabelWrapper[0].classList.add("power-on");
        this.isPowerOn = false;
        this.timeOutId;
        this.dotTimeId;        
        this.loadFunctionality = this.loadPanelController();
        this.isBowlInside = false;
        this.classArr = ["set1", "set2", "set3", "set4", "set5", "set6"];
        this.gapCounter = 0;
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
                e.stopPropagation(); 
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
                
            if(this.isLeftPressed == false && this.knobMousePressed && this.isAngleValueReadable === true && knob.classList.contains("power-knob"))
                {
                    e.stopPropagation();
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
                    e.stopPropagation();                   
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
        this.sufler.stopMessage(this.sufler.idInterval)
        if(this.isPowerOn == false){
            this.timeOutId = setTimeout(() => {
                this.sufler.infOutputWrapper.forEach((info) => {
                info.classList.add("power-on")});
                this.heatKnobLight();
                this.light.welcomeDotsDisplay(this.light.dotArr());
                this.sufler.typeMessage(this.sufler.messagesForUser.rules);
                this.cookerLightOn(); 
            }, 800);
        this.sufler.knobIndicatorWrapper.forEach((info) => {
            info.classList.add("pwr-on")});
        this.sufler.knobLabelWrapper[0].classList.remove("power-on");
        this.sufler.knobLabelWrapper[1].classList.add("power-on");
        this.light.cubeLightsOn(document.querySelectorAll(".question-mark"));
        this.leftSlider.show();
        this.keyboard.show();        
        this.isPowerOn = true;             
        };                                
    };

    powerOfDetected()
    {   
        this.sufler.stopMessage(this.sufler.idInterval)     
        if(this.isPowerOn == true){
        clearTimeout(this.timeOutId)
        clearTimeout(this.light.timeoutId);
        this.sufler.infOutputWrapper.forEach((info) => {
                info.classList.remove("power-on")})
        this.sufler.knobIndicatorWrapper.forEach((info) => {
                info.classList.remove("pwr-on")});
        this.sufler.knobLabelWrapper[0].classList.add("power-on");
        this.sufler.knobLabelWrapper[1].classList.remove("power-on");
        this.light.clearWelcomeDots(this.light.timeoutId, this.light.dotArr()) ;
        this.light.cubeLightsOf(document.querySelectorAll(".question-mark"));
        this.sufler.typeMessage(this.sufler.messagesForUser.welcome);
        this.leftSlider.hide();
        this.keyboard.hide();
        this.cookerLightOff();        
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

    heatKnobProgress(steps, limit)
    {
        let rotate = steps *(this.heatRange/limit)
        this.heatKnobWrapper.style.transform =  "rotate(" + (rotate) + "deg)";
    };

    heatLightProgress(step)
    {
        
        for (let i = this.gapCounter; i < this.gapCounter + 2; i++){
        this.divsCollection[i].classList.add(this.classArr[step-1])
        console.log("iterator : " + i)
        console.log("style : " + (step-1))
        }

        this.gapCounter += 2;
        
        
        
    };

    cookerLightOn()
    {
        this.topWallWrapper.classList.add("prwed2");
        this.barWrapper.classList.add("pwrr");
        this.cookerWindowWrapper.classList.add("actv");
         this.cookerWallsWrapper.forEach((wall) =>
        {
            wall.classList.add("prwed");
        })
    };

    cookerLightOff()
    {
        this.topWallWrapper.classList.remove("prwed2");
        this.barWrapper.classList.remove("pwrr");
        this.cookerWindowWrapper.classList.remove("actv");
        this.cookerWallsWrapper.forEach((wall) =>
        {
            wall.classList.remove("prwed");
        })
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