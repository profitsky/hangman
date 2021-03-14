import { Items} from "./LeftSlider.js"; 
export class Cooker
{

      objectGeomProperties = {

        knobOutline: undefined,              
        outlinePositionY: undefined,        
        outlineHeight: undefined,        
        centerY: undefined
    };

    startTranslateValue = 0;
    translateValue = 0;
    angle = 0;
    readTranslatePosition = 0;
    isAngleValueReadable = false;
    isHandlePressed = false;    

    constructor()
    {
        this.doorCoverWrapper = document.querySelector(".cooker-door-cover");
        this.avatarWrapper = document.getElementById("avatar");
        this.shadowWrapper = document.getElementById("shadow");
        this.ovenCenterWall = document.querySelector(".oven-center")
        this.fishBowlWrapper = document.querySelector(".bowl");
        this.waterBowlWrapper = document.querySelector(".water");
        this.smokeWrapper = document.getElementById("smoke");
        this.bloodWrapper = document.getElementById("blood");
        this.fishWrapper = document.getElementById("fish");
        this.winMessageWrapper = document.getElementById("win-message");
        this.spansCollection = this.smokeWrapper.querySelectorAll("span");
        this.smokeWrapperEven = [];
        this.smokeWrapperOdd = [];
        this.cookerDoorAngle = this.callAngle();
        this.dropped = false;           
    };

    setMouseDown()
    {            
        this.doorCoverWrapper.addEventListener("mousedown", (e)=>
        {
            if(!this.isHandlePressed)
            {
                e.stopPropagation();
                this.startTranslateValue = e.clientY;                           
                this.isHandlePressed = true;
            };       
        })
    };

    setMouseMove()
    { 
       
        this.doorCoverWrapper.addEventListener("mousemove", (e)=>
        {
            if(this.isHandlePressed)
            { 
                e.stopPropagation();
                this.readTranslatePosition = e.clientY;
                this.translateValue = this.readTranslatePosition - this.startTranslateValue;
                let rotate = this.translateValue + this.angle;
                
                this.isHandlePressed = true; 
                this.doorCoverWrapper.style.transform =  "rotateX(" + (-rotate/(this.objectGeomProperties.outlineHeight * 0.012)) + "deg)";
                
                this.showAvatar(this.cookerDoorAngle());
                this.shadowPass(this.cookerDoorAngle())
                                
                
                if(this.cookerDoorAngle() >= 78)
                {                   
                    this.doorCoverWrapper.style.transform =  "rotateX(" + (-77.99) + "deg)";
                    this.bowlDragDrop();
                    
                }else if (this.cookerDoorAngle() <= 0)
                {
                    this.doorCoverWrapper.style.transform =  "rotateX(" + (-0.01) + "deg)";
                }
            };
        }) 
    };

    setMouseUp()
    {
        this.doorCoverWrapper.addEventListener("mouseup", (e) =>
        {
            if(this.isHandlePressed){
                e.stopPropagation(); 
                const translate = e.clientY;
                
                this.isHandlePressed = false;

                if(this.readTranslatePosition == translate)
                {
                    this.angle += this.translateValue;
                }
            };
        }) 
        this.isHandlePressed = false;        
    };

    mouseLeave()
    {
        this.doorCoverWrapper.addEventListener("mouseleave", () =>
        {
            this.setMouseUp();
        })
        this.isHandlePressed = false;
    };

    getOutLineGeomProperties()
    {        
        this.objectGeomProperties.doorOutline = this.doorCoverWrapper.getBoundingClientRect(); 
        this.objectGeomProperties.outlinePositionY = this.objectGeomProperties.doorOutline.top;
        this.objectGeomProperties.outlineHeight = this.objectGeomProperties.doorOutline.height;        
        this.objectGeomProperties.centerY = this.objectGeomProperties.outlinePositionY + (this.objectGeomProperties.outlineHeight / 2);        
    };
   

    calculateMatrix()
    {
        const st = window.getComputedStyle(this.doorCoverWrapper, null);
        const tr = st.getPropertyValue("transform");                      
        var values = tr.split('(')[1].split(')')[0].split(',');                                
        const pi = Math.PI,
        matrixVal10 = parseFloat(values[9]),
        a = Math.round(Math.asin(matrixVal10) * 180 / pi); 
        return a;
    };

    callAngle(element){
          return function()
        {
          return this.calculateMatrix(element);
        }
    };

    showAvatar(angle)
    {       
        if(!this.dropped)
        (angle >= 70) ? this.avatarWrapper.classList.add("activated") : this.avatarWrapper.classList.remove("activated"); 
    };

    finalLoseAniamtion()
    {
        this.bloodWrapper.classList.remove("hidden");
        this.fishBowlWrapper.classList.add("gone")
    }

    finalWinAniamtion()
    {
        this.fishWrapper.style.backgroundImage = "url(/assets/images/gold-fish-scared.png)";
        this.fishBowlWrapper.style.animation = "bowl-animation-step1 0s infinite linear";
        this.waterBowlWrapper.style.animation = "water-animation-step1 0s infinite linear";
        this.smokeAnimationLose(-3);
        this.winMessageWrapper.classList.add("win-act")
    }

    shadowPass(angle)
    {
        this.shadowWrapper.style.transform = `skewX(45deg) translateX(${-1.5*angle}%)`;             
    };

    fishAnimationLose(step)
    {   
        const initialSpeed = "5150";
        let counter = initialSpeed - ((step*1000));
        if(step <= 1){
        this.fishBowlWrapper.style.animation = `bowl-animation-step1 ${initialSpeed}ms infinite linear`;
        this.waterBowlWrapper.style.animation = `water-animation-step1 ${initialSpeed}ms infinite linear`;
        }
        else
        {
            this.fishBowlWrapper.style.animationDuration = `${counter}ms`;
            this.waterBowlWrapper.style.animationDuration = `${counter}ms`;
        }
    };   

    smokeDivsSeparate()
    {
        for(let i = 0; i < this.spansCollection.length; i++)
        {
            if(i % 2 == 0)
            {
               this.smokeWrapperEven.push(this.spansCollection[i])
            }
            else
            {
                this.smokeWrapperOdd.push(this.spansCollection[i])
            }
        }
    };

    smokeAnimationLose(step)
    {
        const initialSpeed = "6150";
        let counter = initialSpeed - ((step*1000));
        this.smokeWrapper.classList.remove("hide-smoke");
        this.smokeWrapperEven.forEach((even) => {
            even.style.animation = `animateEven ${counter}ms infinite linear`;
            even.style.animationDelay = Math.random() * (3) + "s";
        })
        this.smokeWrapperOdd.forEach((odd) => {
            odd.style.animation = `animateOdd ${counter}ms infinite linear`;
            odd.style.animationDelay = Math.random() * (3) + "s";
        })     
    };

    bowlDragEnter()
    {
        this.avatarWrapper.addEventListener("dragenter", (e) =>
        {
            this.avatarWrapper.classList.add("over")
        })
    };

    bowlOnDragLeave()
    {
        this.avatarWrapper.addEventListener("dragleave", (e) =>
        {
             this.avatarWrapper.classList.remove("over")
        })
    };

    bowlDragDrop()
    {
        this.fishBowlWrapper.addEventListener("dragend", (e) =>{
            e.preventDefault(); 
            this.dropped = true;
            this.avatarWrapper.appendChild(this.fishBowlWrapper);
            this.fishBowlWrapper.classList.remove("dragging");
            setTimeout(()=>{
                this.avatarWrapper.classList.remove("activated");
           },100)
        })
    };
};