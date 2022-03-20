
RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.Thermometer=function(conf)
{this.id=conf.id;this.canvas=document.getElementById(this.id);this.context=this.canvas.getContext?this.canvas.getContext('2d'):null;this.canvas.__object__=this;this.uid=RGraph.createUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.createUID();this.colorsParsed=false;this.type='thermometer';this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.min=RGraph.stringsToNumbers(conf.min);this.max=RGraph.stringsToNumbers(conf.max);this.value=RGraph.stringsToNumbers(conf.value);this.coords=[];this.graphArea=[];this.currentValue=null;this.coordsText=[];this.original_colors=[];this.firstDraw=true;this.properties={linewidth:1,backgroundColor:'white',colorsStroke:'black',colors:['red'],marginLeft:35,marginRight:35,marginTop:35,marginBottom:35,tickmarksSize:2,tickmarksCount:10,textColor:'black',textFont:'Arial, Verdana, sans-serif',textSize:12,textBold:false,textItalic:false,textAccessible:true,textAccessibleOverflow:'visible',textAccessiblePointerevents:false,text:null,scaleVisible:false,scaleUnitsPre:'',scaleUnitsPost:'',scaleDecimals:0,scaleThousand:',',scalePoint:'.',title:'',titleFont:null,titleSize:null,titleColor:null,titleBold:null,titleItalic:null,titleOffsetx:0,titleOffsety:0,titleSide:'',titleSideBold:null,titleSideFont:null,titleSideSize:null,titleSideColor:null,titleSideItalic:null,titleSideOffsetx:0,titleSideOffsety:0,shadow:true,shadowOffsetx:0,shadowOffsety:0,shadowBlur:15,shadowColor:'#ddd',resizable:false,resizableHandleBackground:null,contextmenu:null,adjustable:false,labelsValue:true,labelsValueColor:null,labelsValueFont:null,labelsValueSize:null,labelsValueBold:null,labelsValueItalic:null,labelsValueDecimals:null,labelsValueThousand:null,labelsValuePoint:null,labelsValueUnitsPre:null,labelsValueUnitsPost:null,labelsValueOffsetx:0,labelsValueOffsety:0,labelsCount:5,labelsDecimals:null,labelsUnitsPre:null,labelsUnitsPost:null,labelsPoint:null,labelsThousand:null,labelsColor:null,labelsFont:null,labelsSize:null,labelsBold:null,labelsItalic:null,labelsOffsetx:0,labelsOffsety:0,annotatable:false,annotatableColor:'black',annotatableLinewidth:1,tooltips:null,tooltipsHighlight:true,tooltipsEffect:'slide',tooltipsEvent:'click',tooltipsCssClass:'RGraph_tooltip',tooltipsCss:null,tooltipsFormattedThousand:',',tooltipsFormattedPoint:'.',tooltipsFormattedDecimals:0,tooltipsFormattedUnitsPre:'',tooltipsFormattedUnitsPost:'',tooltipsFormattedKeyColors:null,tooltipsFormattedKeyColorsShape:'square',tooltipsFormattedKeyLabels:[],tooltipsFormattedListType:'ul',tooltipsFormattedListItems:null,tooltipsFormattedTableHeaders:null,tooltipsFormattedTableData:null,tooltipsPointer:true,tooltipsPositionStatic:true,highlightStroke:'rgba(0,0,0,0)',highlightFill:'rgba(255,255,255,0.7)',clearto:'rgba(0,0,0,0)',bulbBottomRadiusAdjust:0,bulbBottomRadius:null}
if(!this.canvas){alert('[THERMOMETER] No canvas support');return;}
this.$0={};var properties=this.properties;this.path=RGraph.pathObjectFunction;if(RGraph.Effects&&typeof RGraph.Effects.decorate==='function'){RGraph.Effects.decorate(this);}
this.responsive=RGraph.responsive;this.set=function(name)
{var value=typeof arguments[1]==='undefined'?null:arguments[1];if(arguments.length===1&&typeof arguments[0]==='object'){for(i in arguments[0]){if(typeof i==='string'){this.set(i,arguments[0][i]);}}
return this;}
properties[name]=value;return this;};this.get=function(name)
{return properties[name];};this.draw=function()
{RGraph.fireCustomEvent(this,'onbeforedraw');if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
this.value=Math.min(this.max,this.value);this.value=Math.max(this.min,this.value);if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
this.currentValue=this.value;this.coordsText=[];this.marginLeft=properties.marginLeft;this.marginRight=properties.marginRight;this.marginTop=properties.marginTop;this.marginBottom=properties.marginBottom;this.scale2=RGraph.getScale({object:this,options:{'scale.max':this.max,'scale.min':this.min,'scale.strict':true,'scale.thousand':properties.scaleThousand,'scale.point':properties.scalePoint,'scale.decimals':properties.scaleDecimals,'ylabels.count':properties.labelsCount,'scale.round':properties.scaleRound,'scale.units.pre':properties.scaleUnitsPre,'scale.units.post':properties.scaleUnitsPost}});this.x=this.marginLeft;this.width=this.canvas.width-this.marginLeft-this.marginRight;this.y=this.marginTop+(this.width/2);this.halfWidth=this.width/2;this.bulbTopCenterx=this.marginLeft+(this.width/2);this.bulbTopCentery=this.marginTop+(this.width/2);this.bulbTopRadius=this.width/2;this.bulbBottomCenterx=this.marginLeft+(this.width/2);this.bulbBottomRadius=typeof properties.bulbBottomRadius==='number'?properties.bulbBottomRadius:this.width*0.75+properties.bulbBottomRadiusAdjust;this.bulbBottomCentery=this.canvas.height-this.marginBottom-this.bulbBottomRadius;this.scaleTopY=this.bulbTopCentery;this.scaleBottomY=this.bulbBottomCentery-this.bulbBottomRadius;this.scaleHeight=this.scaleBottomY-this.scaleTopY;this.height=this.getYCoord(this.min)-this.getYCoord(this.value);this.coords[0]=[this.x,this.getYCoord(this.value),this.width,this.height];this.drawBackground();this.drawBar();this.drawTickMarks();this.drawLabels();if(properties.title){this.drawTitle();}
if(properties.titleSide){this.drawSideTitle();}
if(properties.contextmenu){RGraph.showContext(this);}
RGraph.addCustomText(this);RGraph.installEventListeners(this);if(this.firstDraw){this.firstDraw=false;RGraph.fireCustomEvent(this,'onfirstdraw');this.firstDrawFunc();}
RGraph.fireCustomEvent(this,'ondraw');return this;};this.drawBackground=function()
{if(properties.shadow){RGraph.setShadow(this,properties.shadowColor,properties.shadowOffsetx,properties.shadowOffsety,properties.shadowBlur);}
this.pathBackground();this.context.strokeStyle=properties.colorsStroke;this.context.fillStyle=properties.backgroundColor;this.context.lineWidth=1+properties.linewidth;this.context.stroke();this.context.fill();this.context.lineWidth=1;};this.drawBar=function()
{this.pathBar();this.path('f %',properties.colors[0]);};this.pathBar=function()
{var barHeight=this.coords[0][3],y=(this.coords[0][1]+this.coords[0][3])-barHeight
RGraph.noShadow(this);this.path('b ss transparent r % % % %         m % %           a % % % 0 6.28 false',this.coords[0][0],y,this.coords[0][2],this.bulbBottomCentery-y,this.bulbBottomCenterx+this.bulbBottomRadius,this.bulbBottomCentery,this.bulbBottomCenterx,this.bulbBottomCentery,this.bulbBottomRadius);};this.pathBackground=function()
{this.path('b    r % % % %   a % % % 3.1415927 6.28 false   m % %   a % % % 0 6.2830 false c',this.x,this.scaleTopY,this.coords[0][2],this.bulbBottomCentery-this.scaleTopY,this.bulbTopCenterx,this.bulbTopCentery,this.bulbTopRadius,this.bulbBottomCenterx,this.bulbBottomCentery,this.bulbBottomCenterx,this.bulbBottomCentery,this.bulbBottomRadius);};this.drawTickMarks=function()
{if(properties.tickmarksCount){var ticksize=properties.tickmarksSize;this.context.strokeStyle=properties.colorsStroke;this.context.lineWidth=properties.linewidth/2;this.context.beginPath();for(var i=0;i<=properties.tickmarksCount;++i){var y=this.scaleBottomY-((this.scaleHeight/properties.tickmarksCount)*i);this.context.moveTo(this.marginLeft,Math.round(y));this.context.lineTo(this.marginLeft+ticksize,Math.round(y));this.context.moveTo(this.canvas.width-this.marginRight,Math.round(y));this.context.lineTo(this.canvas.width-this.marginRight-ticksize,Math.round(y));}
this.context.stroke();this.context.lineWidth=1;}};this.drawLabels=function()
{if(properties.labelsValue){var text=properties.scaleVisible?RGraph.numberFormat({object:this,number:this.value.toFixed(typeof properties.labelsValueDecimals==='number'?properties.labelsValueDecimals:properties.scaleDecimals),unitspre:typeof properties.labelsValueUnitsPre==='string'?properties.labelsValueUnitsPre:properties.scaleUnitsPre,unitspost:typeof properties.labelsValueUnitsPost==='string'?properties.labelsValueUnitsPost:properties.scaleUnitsPost,point:typeof properties.labelsValuePoint==='string'?properties.labelsValuePoint:properties.scalePoint,thousand:typeof properties.labelsValueThousand==='string'?properties.labelsValueThousand:properties.scaleThousand}):RGraph.numberFormat({object:this,number:this.value.toFixed(typeof properties.labelsValueDecimals==='number'?properties.labelsValueDecimals:properties.scaleDecimals),unitspre:typeof properties.labelsValueUnitsPre==='string'?properties.labelsValueUnitsPre:properties.scaleUnitsPre,unitspost:typeof properties.labelsValueUnitsPost==='string'?properties.labelsValueUnitsPost:properties.scaleUnitsPost,point:typeof properties.labelsValuePoint==='string'?properties.labelsValuePoint:properties.scalePoint,thousand:typeof properties.labelsValueThousand==='string'?properties.labelsValueThousand:properties.scaleThousand});var textConf=RGraph.getTextConf({object:this,prefix:'labelsValue'});RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:this.coords[0][0]+(this.coords[0][2]/2)+properties.labelsValueOffsetx,y:this.coords[0][1]+7+properties.labelsValueOffsety,text:text,valign:'top',halign:'center',bounding:true,boundingFill:'white',tag:'labels.value'});}
if(properties.scaleVisible){this.drawScale();}};this.drawTitle=function()
{var textConf=RGraph.getTextConf({object:this,prefix:'title'});RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:this.marginLeft+(this.width/2)+properties.titleOffsetx,y:this.marginTop-3+properties.titleOffsety,text:String(properties.title),valign:'bottom',halign:'center',bold:true,tag:'title'});};this.drawSideTitle=function()
{var textConf=RGraph.getTextConf({object:this,prefix:'titleSide'});var x=this.marginLeft-3;var y=(this.scaleHeight/2)+this.marginTop+this.bulbTopRadius;if(typeof properties.titleSideOffsetx==='number')x+=properties.titleSideOffsetx;if(typeof properties.titleSideOffsety==='number')y+=properties.titleSideOffsety;this.context.fillStyle=properties.textColor;RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:x,y:y,text:String(properties.titleSide),valign:'bottom',halign:'center',angle:270,tag:'title.side',accessible:false});};this.drawScale=function()
{this.context.fillStyle=properties.textColor;var units_pre=properties.scaleUnitsPre,units_post=properties.scaleUnitsPost,decimals=typeof properties.labelsDecimals==='number'?properties.labelsDecimals:properties.scaleDecimals,numLabels=properties.labelsCount,step=(this.max-this.min)/numLabels;for(var i=1;i<=numLabels;++i){var x=this.canvas.width-this.marginRight+(properties.linewidth/2),y=this.canvas.height-this.marginBottom-(2*this.bulbBottomRadius)-((this.scaleHeight/numLabels)*i),text=RGraph.numberFormat({object:this,number:String((this.min+(i*step)).toFixed(decimals)),unitspre:typeof properties.labelsUnitsPre==='string'?properties.labelsUnitsPre:properties.scaleUnitsPre,unitspost:typeof properties.labelsUnitsPost==='string'?properties.labelsUnitsPost:properties.scaleUnitsPost,point:typeof properties.labelsPoint==='string'?properties.labelsPoint:properties.scalePoint,thousand:typeof properties.labelsThousand==='string'?properties.labelsThousand:properties.scaleThousand});var textConf=RGraph.getTextConf({object:this,prefix:'labels'});RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:x+5+properties.labelsOffsetx,y:y+properties.labelsOffsety,text:text,valign:'center',tag:'scale'});}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:x+6+properties.labelsOffsetx,y:this.bulbBottomCentery-this.bulbBottomRadius+properties.labelsOffsety,text:RGraph.numberFormat({object:this,number:this.min.toFixed(decimals),unitspre:typeof properties.labelsUnitsPre==='string'?properties.labelsUnitsPre:properties.scaleUnitsPre,unitspost:typeof properties.labelsUnitsPost==='string'?properties.labelsUnitsPost:properties.scaleUnitsPost,point:typeof properties.labelsPoint==='string'?properties.labelsPoint:properties.scalePoint,thousand:typeof properties.labelsThousand==='string'?properties.labelsThousand:properties.scaleThousand}),valign:'center',tag:'scale'});};this.getShape=function(e)
{var mouseXY=RGraph.getMouseXY(e),mouseX=mouseXY[0],mouseY=mouseXY[1];for(var i=0;i<this.coords.length;i++){var coords=this.coords[i],left=coords[0],top=coords[1],width=coords[2],height=coords[3];this.pathBar();if(this.context.isPointInPath(mouseX,mouseY)){var tooltip=RGraph.parseTooltipText?RGraph.parseTooltipText(properties.tooltips,i):'';return{object:this,x:left,y:top,width:width,height:height,index:0,dataset:0,sequentialIndex:0,tooltip:typeof tooltip==='string'?tooltip:null};}}
return null;};this.getValue=function(arg)
{if(arg.length===2){var mouseX=arg[0],mouseY=arg[1];}else{var mouseXY=RGraph.getMouseXY(arg),mouseX=mouseXY[0],mouseY=mouseXY[1];}
var value=(this.scaleHeight-(mouseY-this.scaleTopY))/this.scaleHeight;value*=(this.max-this.min);value+=this.min;value=Math.max(value,this.min);value=Math.min(value,this.max);return value;};this.highlight=function(shape)
{if(properties.tooltipsHighlight){if(typeof properties.highlightStyle==='function'){(properties.highlightStyle)(shape);return;}
this.pathBar();this.path('s % f %',properties.highlightStroke,properties.highlightFill);}};this.getObjectByXY=function(e)
{var mouseXY=RGraph.getMouseXY(e),mouseX=mouseXY[0],mouseY=mouseXY[1]
this.pathBackground();if(this.context.isPointInPath(mouseX,mouseY)){return this;}};this.adjusting_mousemove=function(e)
{if(properties.adjustable&&RGraph.Registry.get('adjusting')&&RGraph.Registry.get('adjusting').uid==this.uid){var mouseXY=RGraph.getMouseXY(e),value=this.getValue(e);if(typeof value=='number'){RGraph.fireCustomEvent(this,'onadjust');this.value=Number(value.toFixed(properties.scaleDecimals));RGraph.redrawCanvas(this.canvas);}}};this.getYCoord=function(value)
{if(value>this.max||value<this.min){return null;}
var y=Math.abs(value-this.min)/Math.abs(this.max-this.min)
y=y*(this.scaleBottomY-this.scaleTopY);return this.scaleBottomY-y;};this.overChartArea=function(e)
{var mouseXY=RGraph.getMouseXY(e),mouseX=mouseXY[0],mouseY=mouseXY[1];this.pathBackground();return this.context.isPointInPath(mouseX,mouseY);};this.parseColors=function()
{if(this.original_colors.length===0){this.original_colors.colors=RGraph.arrayClone(properties.colors);}
var colors=properties.colors;for(var i=0;i<colors.length;++i){colors[i]=this.parseSingleColorForGradient(colors[i]);}};this.reset=function()
{};this.parseSingleColorForGradient=function(color)
{if(!color){return color;}
if(typeof color==='string'&&color.match(/^gradient\((.*)\)$/i)){if(color.match(/^gradient\(({.*})\)$/i)){return RGraph.parseJSONGradient({object:this,def:RegExp.$1});}
var parts=RegExp.$1.split(':');var grad=this.context.createLinearGradient(properties.marginLeft,0,this.canvas.width-properties.marginRight,0);var diff=1/(parts.length-1);grad.addColorStop(0,RGraph.trim(parts[0]));for(var j=1;j<parts.length;++j){grad.addColorStop(j*diff,RGraph.trim(parts[j]));}}
return grad?grad:color;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
if(typeof this[type]!=='function'){this[type]=func;}else{RGraph.addCustomEventListener(this,type,func);}
return this;};this.exec=function(func)
{func(this);return this;};this.firstDrawFunc=function()
{};this.grow=function()
{var obj=this,callback=arguments[1]||function(){},opt=arguments[0]||{},frames=opt.frames?opt.frames:30,origValue=Number(obj.currentValue),newValue=obj.value;newValue=Math.min(newValue,this.max);newValue=Math.max(newValue,this.min);var diff=newValue-origValue,step=(diff/frames),frame=0;function iterate()
{obj.value=(step*frame)+origValue;RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame<frames){frame++;RGraph.Effects.updateCanvas(iterate);}else{callback(obj);}}
iterate();return this;};this.tooltipSubstitutions=function(opt)
{return{index:0,dataset:0,sequentialIndex:0,value:this.value,values:[this.value]};};this.tooltipsFormattedCustom=function(specific,index)
{var color=(properties.tooltipsFormattedKeyColors&&properties.tooltipsFormattedKeyColors[0])?properties.tooltipsFormattedKeyColors[0]:properties.colors[0];var label=(properties.tooltipsFormattedKeyLabels&&properties.tooltipsFormattedKeyLabels[0])?properties.tooltipsFormattedKeyLabels[0]:'';return{label:label,color:color};};this.positionTooltipStatic=function(args)
{var obj=args.object,e=args.event,tooltip=args.tooltip,index=args.index,canvasXY=RGraph.getCanvasXY(obj.canvas)
coords=this.coords[args.index];args.tooltip.style.left=(canvasXY[0]
+coords[0]
+(coords[2]/2)
-(tooltip.offsetWidth/2)
+obj.properties.tooltipsOffsetx)+'px';args.tooltip.style.top=(canvasXY[1]
+coords[1]
-tooltip.offsetHeight
-10
+obj.properties.tooltipsOffsety)+'px';if(parseFloat(args.tooltip.style.top)<0){args.tooltip.style.top=parseFloat(args.tooltip.style.top)+(coords[3]/2)+5+'px';}};RGraph.register(this);RGraph.parseObjectStyleConfig(this,conf.options);};