import { Injectable } from "@angular/core";
import { IPattern } from "../core/models/pattern.model";
import { UtilsService } from "../core/services/util.service";
import { style } from "../core/services/api.service";

@Injectable({
    providedIn: 'root'
 })
export class CodeService {

    constructor(private utils: UtilsService) {}

    generateCode(pattern: IPattern): style {
        let backgroundImageCode = "";
        let backgroundPosCode = "";
        let backgroundSizeCode = "";
        const posType = pattern.positioning;
        let sameBackgroundSize = true;
        let prevBackgroundSize = "";
        
    //LINEAR
        if(pattern.linears.length > 0)
        {
            pattern.linears.map( (linear, linearindex) =>
            {
                backgroundImageCode += "linear-gradient("+linear.direction+"deg, ";
                linear.lines.map( (line, lineIndex) => 
                {
                    const colorArray = this.utils.hexToRgb(line.color);
                    const rgbString = "rgba("+colorArray[0]+", "+colorArray[1]+", "+colorArray[2]+", "+line.opacity/100+")";
                    
                    const vacancyLeftPos = +line.position - +line.blur;
                    const vacancyLeft = (vacancyLeftPos <= 0) ? "" : "transparent "+vacancyLeftPos+posType+", ";
    
                    const colorLeftPos = line.position;
                    const colorLeft = (colorLeftPos <=0) ? "" : rgbString+" "+colorLeftPos+posType+", ";
    
                    const colorRightPos =  +line.position + +line.size
                    const colorRight = rgbString+" "+colorRightPos+posType+", ";
    
                    const vacancyRightPos = +line.position + +line.size + +line.blur;
                    const vacancyRight = "transparent "+vacancyRightPos+posType;
                    
                    backgroundImageCode += vacancyLeft+colorLeft+colorRight+vacancyRight;
                    if(lineIndex < (linear.lines.length-1))
                    {
                        backgroundImageCode += ", ";
                    }
                    else
                    {
                        backgroundImageCode += ") ";
                    }
    
                })
             
                backgroundPosCode += linear.vertical+"px "+linear.horizontal+"px";
                
                const backgroundSize = (linear.autoSize == true)? pattern.width+"px "+pattern.height+"px" : linear.width+"px "+linear.height+"px";
                backgroundSizeCode += backgroundSize;
    
                //background-size code optimization (if all values are the same the code will contain one position)
                if(sameBackgroundSize && prevBackgroundSize === "")
                {
                    prevBackgroundSize = backgroundSize;
                }
                else if(backgroundSize !== prevBackgroundSize) sameBackgroundSize = false;
    
                
                if(linearindex < (pattern.linears.length-1))
                {
                    backgroundImageCode += ", ";
                    backgroundPosCode += ", ";
                    backgroundSizeCode += ", ";
                }
    
            })
        }
        
    //RADIALS
        
        if(pattern.radials.length > 0)
        {
            if(backgroundImageCode != "") backgroundImageCode += ", ";
    
            pattern.radials.map( (radial, radialIndex) =>
            {
                backgroundImageCode += "radial-gradient("+radial.shape+" "+radial.size+" at "+radial.posx+posType+" "+radial.posy+posType+", ";       
    
                radial.rays.map( (radius, radiusIndex) => 
                {
    
                    const color = this.utils.hexToRgb(radius.color);
                    const rgbString = "rgba("+color[0]+", "+color[1]+", "+color[2]+", "+radius.opacity/100+")";
    
                    const vacancyLeftPos = +radius.position - +1 - +radius.blur
                    const vacancyLeft = (vacancyLeftPos <= 0) ? "" : "transparent "+vacancyLeftPos+posType+", ";
    
                    const colorLeftPos = radius.position;
                    const colorLeft = (colorLeftPos <= 0) ? "" : rgbString+" "+colorLeftPos+posType+", ";
    
                    const colorRightPos = +radius.position - +1 + +radius.size;
                    const colorRight =  rgbString+" "+colorRightPos+posType+", ";
    
                    const vacancyRightPos = +radius.position + +radius.size + +radius.blur 
                    const vacancyRight = "transparent "+vacancyRightPos+posType;
    
                    backgroundImageCode += vacancyLeft+colorLeft+colorRight+vacancyRight;
    
                    if(radiusIndex < (radial.rays.length-1))
                    {
                        backgroundImageCode += ", ";
                    }
                    else
                    {
                        backgroundImageCode += ") ";
                    }              
                })
                
                backgroundPosCode += radial.vertical+"px "+radial.horizontal+"px ";
                
                const backgroundSize = (radial.autoSize == true)? pattern.width+"px "+pattern.height+"px" : radial.width+"px "+radial.height+"px";
                backgroundSizeCode += backgroundSize;
    
                //background-size code optimization
                if(sameBackgroundSize && prevBackgroundSize === "")
                {
                    prevBackgroundSize = backgroundSize;
                }
                else if(backgroundSize !== prevBackgroundSize) sameBackgroundSize = false;
    
                if(radialIndex < (pattern.radials.length-1))
                {
                    backgroundImageCode += ", ";
                    backgroundPosCode += ", ";
                    backgroundSizeCode += ", ";
                }
    
            })
        }
        
        
        let repeat = 'repeat';
        
        if(pattern.repeat == false)
        {
            repeat = "no-repeat";
        }
    
        //background-size code optimization
        const tempBackgroundSizeCode = (sameBackgroundSize) ? prevBackgroundSize : backgroundSizeCode;

//         return `background-image: ${backgroundImageCode};
// background-position: ${backgroundPosCode};
// background-color: ${pattern.backgroundColor};
// background-size: ${tempBackgroundSizeCode};
// background-repeat: ${repeat};`
//     }

        return {
            "background-image": backgroundImageCode,
            "background-position": backgroundPosCode,
            "background-color": pattern.backgroundColor,
            "background-size": tempBackgroundSizeCode,
            "background-repeat": repeat
        }
    }

}