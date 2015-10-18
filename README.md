robot
=====
用程式操作機器人的遊戲

以前曾經玩過樂高機器人，覺得是很適合學寫程式的工具

不過樂高機器的價錢偏高，也不一定可以讓學校引進

所以有很多這類的網頁程式遊戲，例如 [Code.org](https://code.org/)、[CodeCombat](https://codecombat.com/)

變的只要有網路，就能使用，所以就試著寫一個＿

當然現在還有一些更先進的玩具，整合Arduino，操作搖控車、直升機...等，更有趣更好玩，例如 [Webduino](https://webduino.io/)、[Tickle](https://tickleapp.com/zh-tw/)

發揮 Maker 精神

# Demo Site
[Demo](http://ffbli.no-ip.org/works/robot/)

# Quick Start
```javascript
var robot = new Robot("robot 1", 0, 0);
robot.forward();
robot.run();
```
# Robot

###Constructor
```javascript
var robot = new Robot(name, x, y);
```
`name`: name of Robot

`x`: X-Coordinate, value is 0~4

`y`: Y-Coordinate, value is 0~4


### Function

`forward`：Robot forwards

`backward`：Robot backwards

`turnLeft`：Robot turns left

`turnRight`: Robot turns right

`run`: Robot starts run


# 關鍵技術

[globalEval](https://github.com/jquery/jquery/blob/master/src/core.js#L261)

[canvas](http://www.w3schools.com/tags/ref_canvas.asp)

# 相關網站
都是些有趣的網站，很適合邊學程式邊遊戲

[Code.org](https://code.org/)

[CodeCombat](https://codecombat.com/)

[CodeHunt](https://www.codehunt.com/)

[CodinGame](https://www.codingame.com/start)

[Screeps](https://screeps.com/)

[FightCode](http://fightcodegame.com/)

[Webduino](https://webduino.io/)

[Tickle](https://tickleapp.com/zh-tw/)
