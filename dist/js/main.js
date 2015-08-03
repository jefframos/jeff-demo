/*! goyabpd 03-08-2015 */
function getRandomLevel(){var a=3;return ALL_LEVELS[a]}function testMobile(){return!1}function update(){requestAnimFrame(update);var a=window.innerHeight/windowHeight,b=a;windowWidthVar=windowWidth*b,windowHeightVar=windowHeight*b,renderer.view.style.width=windowWidthVar+"px",renderer.view.style.height=windowHeightVar+"px",APP.update(),renderer.render(APP.stage)}var ALL_LEVELS=[[[0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,1,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,1,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0]],[[2,0,0,0,3,0,0,3,0,0,0,2],[0,2,2,0,0,0,0,0,0,2,2,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,2,2,0,0,0,0,0,0,2,2,0],[2,0,0,0,0,0,0,0,0,0,0,2]],[[0,0,0,0,2,0,0,2,0,0,0,0],[0,3,0,0,2,0,0,2,0,0,3,0],[0,0,0,0,2,0,0,2,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,0,0,2,0,0,0,0],[0,3,0,0,2,0,0,2,0,0,3,0],[0,0,0,0,2,0,0,2,0,0,0,0]],[[3,0,0,0,0,0,0,0,0,0,0,0,3],[0,0,0,0,2,2,2,2,2,0,0,0,0],[0,0,2,0,0,0,0,0,0,0,2,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,2,0,0,0,0,0,0,0,2,0,0],[0,0,0,0,2,2,2,2,2,0,0,0,0],[3,0,0,0,0,0,0,0,0,0,0,0,3]],[[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]]],Application=AbstractApplication.extend({init:function(){this._super(windowWidth,windowHeight)},build:function(){this._super(),this.onAssetsLoaded()},onAssetsLoaded:function(){this.gameScreen=new GameScreen("Game"),this.homeScreen=new HomeScreen("Home"),this.screenManager.addScreen(this.gameScreen),this.screenManager.addScreen(this.homeScreen),this.screenManager.change("Home")}}),Ball=Class.extend({init:function(){this.entityContainer=new PIXI.DisplayObjectContainer,this.graphics=new PIXI.Graphics,this.graphics.beginFill(5583752),this.graphics.drawCircle(0,0,30),this.entityContainer.addChild(this.graphics),this.velocity={x:0,y:0},this.jumpForce=8},jump:function(){this.graphics.beginFill(16777215*Math.random()),this.graphics.drawCircle(0,0,30),this.velocity.y=-this.jumpForce},update:function(){this.entityContainer.position.x+=this.velocity.x,this.entityContainer.position.y+=this.velocity.y},getContent:function(){return this.entityContainer}}),Door=Entity.extend({init:function(a){this._super(!0),this.updateable=!1,this.deading=!1,this.side=a,this.range=APP.tileSize.x,this.width=APP.tileSize.x,this.height=APP.tileSize.y,this.centerPosition={x:-this.width/2,y:-this.height/2},this.type="door",this.node=null,this.updateable=!0},getBounds:function(){return this.bounds={x:this.getPosition().x-this.width/2,y:this.getPosition().y-this.height/2,w:this.width,h:this.height},this.collisionPoints={up:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y},down:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y+this.bounds.h},bottomLeft:{x:this.bounds.x,y:this.bounds.y+this.bounds.h},topLeft:{x:this.bounds.x,y:this.bounds.y},bottomRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y+this.bounds.h},topRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y}},this.polygon=new PIXI.Polygon(new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y)),this.bounds},debugPolygon:function(a,b){if(this.lastColorDebug!==a||b){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.lastColorDebug=a,this.gambAcum++,void 0!==this.debugGraphic?this.debugGraphic.clear():this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(a,.5),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.polygon.points[this.polygon.points.length-1].x,this.polygon.points[this.polygon.points.length-1].y);for(var c=this.polygon.points.length-2;c>=0;c--)this.debugGraphic.lineTo(this.polygon.points[c].x,this.polygon.points[c].y);this.debugGraphic.endFill()}},build:function(){this._super("dist/img/cubo2.png");this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill(),this.getContent().scale.x=.5,this.getContent().scale.y=.5,this.getContent().alpha=.5},update:function(){this._super(),this.getBounds(),this.debugPolygon(5596740,!0)},preKill:function(){this._super(),this.debugGraphic.parent&&this.debugGraphic.parent.removeChild(this.debugGraphic)},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)}}),Fire=Entity.extend({init:function(a){this._super(!0),this.updateable=!1,this.deading=!1,this.range=60,this.width=1,this.height=1,this.type="fire",this.node=null,this.velocity.x=a.x,this.velocity.y=a.y,this.timeLive=10,this.power=1,this.defaultVelocity=1},getBounds:function(){return this.bounds={x:this.getPosition().x-this.width/2,y:this.getPosition().y-this.height/2,w:this.width,h:this.height},this.centerPosition={x:this.width/2,y:this.height/2},this.collisionPoints={up:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y},down:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y+this.bounds.h},bottomLeft:{x:this.bounds.x,y:this.bounds.y+this.bounds.h},topLeft:{x:this.bounds.x,y:this.bounds.y},bottomRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y+this.bounds.h},topRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y}},this.polygon=new PIXI.Polygon(new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y)),this.bounds},debugPolygon:function(a,b){if(this.lastColorDebug!==a||b){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.lastColorDebug=a,this.gambAcum++,void 0!==this.debugGraphic?this.debugGraphic.clear():this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(a,.5),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.polygon.points[this.polygon.points.length-1].x,this.polygon.points[this.polygon.points.length-1].y);for(var c=this.polygon.points.length-2;c>=0;c--)this.debugGraphic.lineTo(this.polygon.points[c].x,this.polygon.points[c].y);this.debugGraphic.endFill()}},build:function(){this._super("dist/img/fireball.png"),this.updateable=!0,this.collidable=!0,this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(1127168),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill()},update:function(){this._super(),this.timeLive--,this.timeLive<=0&&this.preKill(),this.getContent()&&(this.width=this.getContent().width,this.height=this.getContent().height),this.getBounds(),this.range=this.width/2},collide:function(a){this.collidable&&"enemy"===a[0].type&&(this.getContent().tint=16711680,this.preKill(),a[0].hurt(this.power))},preKill:function(){if(this.collidable){var a=this;this.updateable=!1,this.collidable=!1,TweenLite.to(this.getContent().scale,.3,{x:.2,y:.2,onComplete:function(){a.kill=!0}}),this.debugGraphic.parent&&this.debugGraphic.parent.removeChild(this.debugGraphic)}},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)},touch:function(a){this.preKill()}}),Heart=SpritesheetEntity.extend({init:function(){this._super(!0),this.updateable=!1,this.deading=!1,this.range=60,this.width=142,this.height=142,this.type="heart",this.node=null,this.life=5},hurt:function(a){console.log("hurt"),this.life-=a,this.life<=0&&this.preKill()},collide:function(a){console.log("this.node",this.node),console.log("col enemy")},getBounds:function(){return this.bounds={x:this.getPosition().x,y:this.getPosition().y,w:this.width,h:this.height},this.centerPosition={x:this.width/2,y:this.height/2},this.collisionPoints={up:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y},down:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y+this.bounds.h},bottomLeft:{x:this.bounds.x,y:this.bounds.y+this.bounds.h},topLeft:{x:this.bounds.x,y:this.bounds.y},bottomRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y+this.bounds.h},topRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y}},this.polygon=new PIXI.Polygon(new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y)),this.bounds},debugPolygon:function(a,b){if(this.lastColorDebug!==a||b){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.lastColorDebug=a,this.gambAcum++,void 0!==this.debugGraphic?this.debugGraphic.clear():this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(a,.5),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.polygon.points[this.polygon.points.length-1].x,this.polygon.points[this.polygon.points.length-1].y);for(var c=this.polygon.points.length-2;c>=0;c--)this.debugGraphic.lineTo(this.polygon.points[c].x,this.polygon.points[c].y);this.debugGraphic.endFill()}},build:function(){var a=this.getFramesByRange("dragon10",0,14),b=new SpritesheetAnimation;b.build("idle",a,1,!0,null),this.spritesheet=new Spritesheet,this.spritesheet.addAnimation(b),this.spritesheet.play("idle"),this.respaw()},update:function(){this._super(),this.getBounds(),this.getTexture()&&(this.getContent().position.x=80,this.getContent().position.y=-20,this.range=this.bounds.w/2)},preKill:function(){var a=this;this.updateable=!1,this.collidable=!1,TweenLite.to(this.getContent(),.5,{alpha:0,onComplete:function(){a.kill=!0}})},respaw:function(){this.deading=!1;var a={x:142*Math.floor(12*Math.random()*142/142)+104,y:142*Math.floor(7*Math.random()*142/142)+177+142};this.pointDistance(a.x,a.y,windowWidth/2,windowHeight/2)<200&&this.respaw(),this.setPosition(7*Math.floor(a.x/7),7*Math.floor(a.y/7)),this.spritesheet.play("idle"),this.setVelocity(0,0),this.updateable=!0,this.collidable=!0},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)}}),Minimap=Class.extend({init:function(){this.collidable=!1},build:function(a){this.gen=a,this.background=new PIXI.Graphics,this.container=new PIXI.DisplayObjectContainer,this.roomsContainer=new PIXI.DisplayObjectContainer,this.mask=new PIXI.Graphics,this.container.addChild(this.background),this.container.addChild(this.roomsContainer),this.container.addChild(this.mask),this.arrayRooms=[],this.margin={x:15,y:15},this.sizeTile={x:80,y:50},this.sizeGraph={x:40,y:25};for(var b=9999,c=9999,d=-9999,e=-9999,f=0,g=0,h=0;h<this.gen.rooms.length;h++)for(var i=this.gen.rooms[h],j=0;j<i.length;j++)if(i[j].id>0){var k=new PIXI.Graphics,l=16777215;l=1===i[j].mode?5428328:2===i[j].mode?11447982:3===i[j].mode?16239929:4===i[j].mode?16202041:5===i[j].mode?13327104:6===i[j].mode?13324996:16777215,k.beginFill(l);var m;f=i[j].position[1]*this.sizeTile.x,g=i[j].position[0]*this.sizeTile.y,k.position.x=f,k.position.y=g,k.drawRect(0,0,this.sizeGraph.x,this.sizeGraph.y),k.endFill(),this.roomsContainer.addChild(k);for(var n=0;n<i[j].childrenSides.length;n++)i[j].childrenSides[n]&&(0===n?(m=new PIXI.Graphics,m.beginFill(l),m.drawRect(0,0,this.sizeGraph.x/2,this.sizeGraph.y/2),f=-this.sizeGraph.x/2,g=this.sizeGraph.y/4):1===n?(m=new PIXI.Graphics,m.beginFill(l),m.drawRect(0,0,this.sizeGraph.x/2,this.sizeGraph.y/2),f=this.sizeGraph.x,g=this.sizeGraph.y/4):2===n?(m=new PIXI.Graphics,m.beginFill(l),m.drawRect(0,0,this.sizeGraph.x/2,this.sizeGraph.y/2),f=this.sizeGraph.x/4,g=-this.sizeGraph.y/2):3===n&&(m=new PIXI.Graphics,m.beginFill(l),m.drawRect(0,0,this.sizeGraph.x/2,this.sizeGraph.y/2),f=this.sizeGraph.x/4,g=this.sizeGraph.y),m&&(m.position.x=f,m.position.y=g,k.addChild(m)),m=null);b>i[j].position[1]&&(b=i[j].position[1]),c>i[j].position[0]&&(c=i[j].position[0]),d<i[j].position[1]&&(d=i[j].position[1]),e<i[j].position[0]&&(e=i[j].position[0]),k.positionID={i:h,j:j},k.node=i[j],this.arrayRooms.push(k)}for(var o=0;o<this.arrayRooms.length;o++)this.arrayRooms[o].position.x-=b*this.sizeTile.x-this.margin.x-this.sizeGraph.x/2,this.arrayRooms[o].position.y-=c*this.sizeTile.y-this.margin.y-this.sizeGraph.y/2;this.mask.beginFill(0),this.mask.drawRect(0,0,200,200),this.container.addChild(this.mask),this.background.beginFill(0),this.background.drawRect(0,0,this.mask.width,this.mask.height),this.background.endFill(),this.background.alpha=.5,this.container.mask=this.mask},updatePlayerNode:function(a){for(var b=null,c=[],d=0;d<this.arrayRooms.length;d++)if(this.arrayRooms[d].alpha=.4,a&&a[0]===this.arrayRooms[d].positionID.i&&a[1]===this.arrayRooms[d].positionID.j){b=this.arrayRooms[d];for(var e=0;e<this.arrayRooms[d].node.childrenSides.length;e++)if(this.arrayRooms[d].node.childrenSides[e])for(var f=this.arrayRooms[d].node.childrenSides[e].position,g=0;g<this.arrayRooms.length;g++)this.arrayRooms[g].positionID.j===f[0]&&this.arrayRooms[g].positionID.i===f[1]&&c.push(this.arrayRooms[g])}console.log(c),this.showNode(b,16711680),TweenLite.to(this.roomsContainer,.5,{x:this.background.width/2-b.position.x-b.width/2,y:this.background.height/2-b.position.y-b.height/2})},showNode:function(a,b){a&&(a.alpha=1)},getContent:function(){return this.container},setPosition:function(a,b){this.container.position.x=a,this.container.position.y=b}}),Obstacle=Entity.extend({init:function(a){this._super(),this.updateable=!0,this.collidable=!0,this.arrayObstacles=["dist/img/2.png","dist/img/3.png","dist/img/2.png"],this.srcImg=this.arrayObstacles[a],this.type="environment",this.width=APP.tileSize.x,this.height=APP.tileSize.x,this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill(),this.range=0},preKill:function(){this._super(),this.debugGraphic.parent&&this.debugGraphic.parent.removeChild(this.debugGraphic)},getBounds:function(){return this.bounds={x:this.getPosition().x-this.width*this.sprite.anchor.x,y:this.getPosition().y-this.height*this.sprite.anchor.y,w:this.width,h:this.height},this.bounds},build:function(){this._super(this.srcImg);this.sprite.anchor.x=0,this.sprite.anchor.y=1},update:function(){this._super(),null===this.debugGraphic.parent&&null!==this.getContent().parent&&(this.getBounds(),this.debugGraphic.drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h),this.getContent().parent.addChild(this.debugGraphic))},respaw:function(){var a={x:142*Math.floor(12*Math.random()*142/142)+104,y:142*Math.floor(7*Math.random()*142/142)+177+142};this.pointDistance(a.x,a.y,windowWidth/2,windowHeight/2)<200&&this.respaw(),this.setPosition(a.x,a.y),this.collidable=!0},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)}}),Player=SpritesheetEntity.extend({init:function(){this._super(!0),this.updateable=!1,this.deading=!1,this.collidable=!0,this.range=APP.tileSize.x/2,this.width=.8*APP.tileSize.x,this.height=.8*APP.tileSize.y,this.type="player",this.collisionPointsMarginDivide=0,this.isTouch=!1,this.boundsCollision=!0,this.defaultVelocity=3,this.endLevel=!1,this.fireSpeed=10,this.fireFreq=5,this.fireFreqAcum=0,this.fireStepLive=20,this.firePower=20,this.touchCollection={up:!1,down:!1,left:!1,right:!1,middleUp:!1,middleDown:!1,bottomLeft:!1,bottomRight:!1,topLeft:!1,topRight:!1}},debug:function(){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.debugGraphic.clear(),this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.bounds.x,this.bounds.y),this.debugGraphic.lineTo(this.bounds.x+this.bounds.w,this.bounds.y),this.debugGraphic.lineTo(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),this.debugGraphic.lineTo(this.bounds.x,this.bounds.y+this.bounds.h),this.debugGraphic.endFill()},getBounds:function(){return this.bounds={x:this.getPosition().x,y:this.getPosition().y,w:this.width,h:this.height},this.collisionPoints={up:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y},down:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y+this.bounds.h},bottomLeft:{x:this.bounds.x,y:this.bounds.y+this.bounds.h},topLeft:{x:this.bounds.x,y:this.bounds.y},bottomRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y+this.bounds.h},topRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y}},this.polygon=new PIXI.Polygon(new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y)),this.bounds},build:function(){var a=this,b=this.getFramesByRange("chinesa10",0,8),c=new SpritesheetAnimation;c.build("idle",b,1,!0,null);var d=this.getFramesByRange("chinesa10",0,8),e=new SpritesheetAnimation;e.build("dead",d,2,!1,function(){TweenLite.to(a.spritesheet.scale,.2,{x:0,y:0})}),this.spritesheet=new Spritesheet,this.spritesheet.addAnimation(c),this.spritesheet.addAnimation(e),this.spritesheet.play("idle"),this.reset(),this.counter=0,this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill(),this.vecPositions=[]},update:function(){this.isTouch||(this.velocity=this.virtualVelocity),this.deading&&this.setVelocity(0,0),this.debugPolygon(5596740,!0),this.getTexture()&&(this.getContent().position.x=20),this._super()},preKill:function(){this._super(),this.debugGraphic.parent&&this.debugGraphic.parent.removeChild(this.debugGraphic)},reset:function(){this.deading=!1,this.setPosition(windowWidth/2,windowHeight/2),this.spritesheet.play("idle"),this.setVelocity(0,0),this.updateable=!0,this.vecPositions=[]},collide:function(a){"door"===a[0].type&&(console.log("door collider"),("up"===a[0].side&&this.virtualVelocity.y<0||"down"===a[0].side&&this.virtualVelocity.y>0||"left"===a[0].side&&this.virtualVelocity.x<0||"right"===a[0].side&&this.virtualVelocity.x>0)&&(this.endLevel=!0,this.nextNode=a[0].node,this.nextDoorSide=a[0].side)),"enemy"===a[0].type},touch:function(a){this.isTouch=!0,(a.left||a.right&&0!==this.virtualVelocity.x)&&(this.velocity.x=0),(a.up||a.down&&0!==this.virtualVelocity.y)&&(console.log("Y TOUCH"),this.velocity.y=0)},updatePlayerVel:function(a){if(console.log("UPDATE"),this&&a){var b=!1,c=!1;0===a.length&&(this.virtualVelocity.x=0,this.virtualVelocity.y=0);for(var d=a.length-1;d>=0;d--)"up"===a[d]?(this.virtualVelocity.y=-this.defaultVelocity,b=!0):"down"===a[d]&&(this.virtualVelocity.y=this.defaultVelocity,b=!0),"left"===a[d]?(this.virtualVelocity.x=-this.defaultVelocity,c=!0):"right"===a[d]&&(this.virtualVelocity.x=this.defaultVelocity,c=!0);0!==this.virtualVelocity.y&&0!==this.virtualVelocity.x&&(this.virtualVelocity.y/=1.5,this.virtualVelocity.x/=1.5),b||(this.virtualVelocity.y=0),c||(this.virtualVelocity.x=0)}}}),Enemy=SpritesheetEntity.extend({init:function(a){this._super(!0),this.updateable=!1,this.deading=!1,this.range=APP.tileSize.x/2,this.width=.9*APP.tileSize.x,this.height=.9*APP.tileSize.y,this.type="enemy",this.node=null,this.life=1e3,this.boundsCollision=!0,this.defaultVelocity=1,this.player=a,this.behaviour=new DefaultBehaviour(this,a)},hurt:function(a){console.log("hurt"),this.getTexture().tint=16711680,this.life-=a,this.life<=0&&this.preKill()},build:function(){var a=this.getFramesByRange("dragon10",0,14),b=new SpritesheetAnimation;b.build("idle",a,1,!0,null),this.spritesheet=new Spritesheet,this.spritesheet.addAnimation(b),this.spritesheet.play("idle"),this.centerPosition={x:this.width/2,y:this.height/2},this.updateable=!0,this.collidable=!0},update:function(){this.behaviour.update(),this.isTouch||(this.velocity=this.virtualVelocity),this._super(),this.getBounds(),this.getTexture()&&(this.getContent().position.x=20)},preKill:function(){var a=this;this.updateable=!1,this.collidable=!1,TweenLite.to(this.getContent(),.5,{alpha:0,onComplete:function(){a.kill=!0}})},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)},touch:function(a){this.isTouch=!0,(a.left||a.right&&0!==this.virtualVelocity.x)&&(this.velocity.x=0),(a.up||a.down&&0!==this.virtualVelocity.y)&&(this.velocity.y=0)}}),FlightEnemy=Enemy.extend({init:function(a){this._super(!0),this.updateable=!1,this.deading=!1,this.range=60,this.width=71,this.height=71,this.type="flight",this.node=null,this.life=5e4,this.radius=200,this.acumSimCos=0,this.setPosition(a.x,a.y),this.boundsCollision=!0},build:function(){var a=this.getFramesByRange("dragon10",0,14),b=new SpritesheetAnimation;b.build("idle",a,1,!0,null),this.spritesheet=new Spritesheet,this.spritesheet.addAnimation(b),this.spritesheet.play("idle"),this.centerPosition={x:this.width/2,y:this.height/2},this.updateable=!0,this.collidable=!0,this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill(),this.virtualVelocity.x=5,this.virtualVelocity.y=-5},debug:function(){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.debugGraphic.clear(),this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.bounds.x,this.bounds.y),this.debugGraphic.lineTo(this.bounds.x+this.bounds.w,this.bounds.y),this.debugGraphic.lineTo(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),this.debugGraphic.lineTo(this.bounds.x,this.bounds.y+this.bounds.h),this.debugGraphic.endFill()},update:function(){this._super(),this.getBounds(),this.acumSimCos+=.05,this.virtualVelocity.x=5*Math.sin(this.acumSimCos),this.virtualVelocity.y=5*Math.cos(this.acumSimCos)},preKill:function(){var a=this;this.updateable=!1,this.collidable=!1,TweenLite.to(this.getContent(),.5,{alpha:0,onComplete:function(){a.kill=!0}})},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)},touch:function(a){this.isTouch=!0,(a.left||a.right&&0!==this.virtualVelocity.x)&&(this.velocity.x=0),(a.up||a.down&&0!==this.virtualVelocity.y)&&(this.velocity.y=0)}}),DefaultBehaviour=Class.extend({init:function(a,b){this.player=b,this.entity=a,this.life=8,this.entity.setVelocity(-2,3*(Math.random()-.5)),this.sideAcum=0,this.sideMaxAcum=200,this.fireFreq=25,this.fireAcum=0,this.fireSpeed=6},update:function(){}}),AppModel=Class.extend({init:function(){this.isMobile=!1,this.action="default",this.id=0,this.position=0,this.angle=0,this.side=0},build:function(){},destroy:function(){},serialize:function(){}}),RainParticle=Class.extend({init:function(a,b,c,d,e){this.fallSpeed=a,this.windSpeed=b,this.dir=e,this.hArea=c,this.vArea=d,this.texture=new PIXI.Texture.fromImage("dist/img/drop.png"),this.content=new PIXI.Sprite(this.texture),this.content.position.x=Math.random()*c,this.content.position.y=Math.random()*d,this.gambAccum=0},update:function(){var a=1;switch(this.dir){case"left":this.content.rotation=15/180*3.14;break;case"right":a=-1,this.content.rotation=-15/180*3.14;break;default:console.log("There is some error dude...")}this.content.position.x-=this.windSpeed*a,this.content.position.y+=Math.random()*this.fallSpeed,this.content.position.y>this.vArea&&(this.content.position.x=Math.random()*this.hArea,this.content.position.y=-200)}}),GameScreen=AbstractScreen.extend({init:function(a){this._super(a)},destroy:function(){this._super()},build:function(){this._super(),this.gravity=1e-4*windowHeight,this.polygonRadius=.25*windowWidth,this.gameContainer=new PIXI.DisplayObjectContainer,this.addChild(this.gameContainer);var a=[];a.lenght<=0?(this.loader=new PIXI.AssetLoader(a),this.initLoad()):this.onAssetsLoaded()},onProgress:function(){},onAssetsLoaded:function(){this._super(),this.ball=new Ball,this.gameContainer.addChild(this.ball.getContent()),this.ball.getContent().position.x=windowWidth/2,this.ball.getContent().position.y=windowHeight/2,this.ball.jumpForce=70*this.gravity},update:function(){this.ball.velocity.y+=this.gravity,this.ball.getContent().position.y>windowHeight/2&&this.testCollision(),this.ball.update()},testCollision:function(){pointDistance(this.ball.getContent().position.x,this.ball.getContent().position.y,windowWidth/2,windowHeight/2)>this.polygonRadius&&this.ball.jump()}}),HomeScreen=AbstractScreen.extend({init:function(a){this._super(a)},destroy:function(){this._super()},build:function(){this._super(),this.screenContainer=new PIXI.DisplayObjectContainer,this.addChild(this.screenContainer);var a=this;this.graphics=new PIXI.Graphics,this.graphics.beginFill(5583752),this.graphics.drawRoundedRect(-120,-80,240,160,30),this.graphics.position.x=windowWidth/2,this.graphics.position.y=windowHeight/2,this.graphics.interactive=!0,this.graphics.buttonMode=!0,this.graphics.touchstart=this.graphics.mousedown=function(b){a.screenManager.change("Game")},this.screenContainer.addChild(this.graphics);var b=[];b.lenght<=0?(this.loader=new PIXI.AssetLoader(b),this.initLoad()):this.onAssetsLoaded()},onProgress:function(){},onAssetsLoaded:function(){console.log("what3"),this._super()},update:function(){}}),InputManager=Class.extend({init:function(a){var b=a,c=this;this.vecPositions=[],document.body.addEventListener("mouseup",function(a){b.player&&(b.mouseDown=!1)}),document.body.addEventListener("mousedown",function(a){b.player&&(b.mouseDown=!0)}),document.body.addEventListener("keyup",function(a){b.player&&(87===a.keyCode||38===a.keyCode?c.removePosition("up"):83===a.keyCode||40===a.keyCode?c.removePosition("down"):65===a.keyCode||37===a.keyCode?c.removePosition("left"):(68===a.keyCode||39===a.keyCode)&&c.removePosition("right"),b.player.updatePlayerVel(c.vecPositions))}),document.body.addEventListener("keydown",function(a){var d=!1;b.player&&(87===a.keyCode||38===a.keyCode?(c.removePosition("down"),d=c.addPosition("up")):83===a.keyCode||40===a.keyCode?(c.removePosition("up"),d=c.addPosition("down")):65===a.keyCode||37===a.keyCode?(c.removePosition("right"),d=c.addPosition("left")):(68===a.keyCode||39===a.keyCode)&&(c.removePosition("left"),d=c.addPosition("right")),b.player.updatePlayerVel(c.vecPositions))})},removePosition:function(a){for(var b=this.vecPositions.length-1;b>=0;b--)this.vecPositions[b]===a&&this.vecPositions.splice(b,1)},addPosition:function(a){for(var b=!1,c=this.vecPositions.length-1;c>=0;c--)this.vecPositions[c]===a&&(b=!0);return b||this.vecPositions.push(a),b}}),SOCKET=null,windowWidth=750,windowHeight=1334,renderer,windowWidthVar=window.innerWidth,windowHeightVar=window.innerHeight,retina=2,renderer=PIXI.autoDetectRecommendedRenderer(windowWidth,windowHeight,{antialias:!0,resolution:retina});document.body.appendChild(renderer.view);var APP;APP=new Application,APP.build();var initialize=function(){PIXI.BaseTexture.SCALE_MODE=2,requestAnimFrame(update)};!function(){var a={init:function(){initialize()}};$(a.init)}();var pointDistance=function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)};