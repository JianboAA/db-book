function Game(map, snake, food, block) {
    // 蛇
    this.snake = snake;
    // 食物
    this.food = food;
    // 地图
    this.map = map;
    // 障碍物
    this.block = block;
    // 定时器
    this.timebar = null;
    // 速度
    this.looptime = 1000;

    this.state = false;
    // 累加器
    this.num = 0;
    // 定义锁，默认是没上锁
    this.lock = false;

}
Game.prototype.init = function() {
        // 执行地图初始化方法
        this.renderMap();
        // 绘制障碍物
        this.renderBlock();
        // 绘制食物
        this.renderFood();
        // 渲染蛇
        this.renderSnake();
        // 开始游戏
        this.startGame();
        // 绑定事件
        this.bindEvent();
    }
    // 封装函数
Game.prototype.renderMap = function() {
        // 初始化地图
        this.map.init();
    }
    // 初始化障碍物
Game.prototype.renderBlock = function() {
        // 遍历障碍物数组
        for (var i = 0; i < this.block.arr.length; i++) {
            // 获取每一个障碍物
            var block = this.block.arr[i];
            // 找到对应单元格设置背景
            this.map.arr[block.row][block.col].style.backgroundImage = this.block.img;
        }
    }
    // 初始化食物
Game.prototype.renderFood = function() {
        // 找到对应单元格设置背景
        this.map.arr[this.food.row][this.food.col].style.backgroundImage = this.food.img;

    }
    // 渲染蛇
Game.prototype.renderSnake = function() {
        // 渲染头部
        var head = this.snake.arr[0];
        // 设置背景
        this.map.arr[head.row][head.col].style.backgroundImage = 'url(' + this.snake.headImage + ')';
        // 渲染身体
        // 循环遍历身体
        for (var i = 1; i < this.snake.arr.length - 1; i++) {
            // 每个身体部位
            var body = this.snake.arr[i];
            // 找到对应单元格设置背景
            this.map.arr[body.row][body.col].style.backgroundImage = 'url(' + this.snake.bodyImage + ')';
        }
        // 渲染尾巴
        var tail = this.snake.arr[this.snake.arr.length - 1];
        // 找到对应单元格设置背景
        this.map.arr[tail.row][tail.col].style.backgroundImage = 'url(' + this.snake.tailImage + ')';
    }
    // 清除所有单元格背景
Game.prototype.clear = function() {
    // 清除每个单元格背景图片
    // 遍历行
    for (var i = 0; i < this.map.arr.length; i++) {
        // 遍历单元格
        for (var j = 0; j < this.map.arr[i].length; j++) {
            // 清除背景
            this.map.arr[i][j].style.backgroundImage = '';
        }
    }
}

// 开始游戏
Game.prototype.startGame = function() {
        // 缓存this
        var me = this;
        // 定义定时器
        this.timebar = setInterval(function() {
            // 让蛇移动
            me.snake.move();
            // 在第一次移动后开锁，可以执行下一次
            me.lock = false;
            // 判断是否结束
            me.checkGame();
            // 判断是否撞墙
            me.checkBlock();
            // 检测是否吃到食物
            me.checkFood();
            // 检测头部是否碰到身体
            me.checkBody();
            // 判断是否结束
            if (!me.state) {
                // 重新渲染前要清除画布
                me.clear();
                // 重新渲染障碍物
                me.renderBlock();
                // 重新渲染食物
                me.renderFood();
                // 重新渲染蛇
                me.renderSnake();
                // console.log(this.snake.arr);
            }
        }, this.looptime)
    }
    // 监听用户按键
Game.prototype.bindEvent = function() {
    // 缓存this
    var me = this;
    // 绑定事件
    document.addEventListener('keydown', function(e) {
            // 判断按键
            // 判断（第一次是没有上锁，可以继续执行，如果在第一次没有执行完就按下第二次，锁是锁住的，按下第二次不能执行）
            if (me.lock) {
                return;
            }
            // 在第一次按下键盘后，锁住，不能再按第二次
            me.lock = true;
            switch (e.keyCode) {
                case 37:
                case 38:
                case 39:
                case 40:
                    // 合法的按键都可以让蛇改变方向
                    me.snake.changeDirection(e.keyCode);
                    break;
                default:
                    ;
            }
        })
        // 判断键盘按下时，有没有按shift键
        // document.addEventListener('keydown', function(e) {
        //         if (e.keyCode === 16) {
        //             // 改变速度
        //             me.looptime = this.looptime / 2;
        //             // 清除定时器
        //             clearInterval(me.timebar);
        //             // 开启定时器
        //             me.startGame();
        //         }
        //     })
        //     // 判断键盘弹起时，有没有按shift键
        // document.addEventListener('keyup', function(e) {
        //     if (e.keyCode === 16) {
        //         // 改变速度
        //         me.looptime = this.looptime;
        //         // 清除定时器
        //         clearInterval(me.timebar);
        //         // 开启定时器
        //         me.startGame();
        //     }
        // })

}


// 检测是否撞墙
Game.prototype.checkBlock = function() {
        // 获取头部
        var head = this.snake.arr[0];
        // 判断头部是否碰到障碍物
        for (var i = 0; i < this.block.arr.length; i++) {
            // 获取每一个障碍物
            var block = this.block.arr[i];
            // 如果头部坐标与障碍物坐标相同
            if (head.row === block.row && head.col === block.col) {
                this.gameOver();
            }
        }
    }
    // 检测是否撞到身体
Game.prototype.checkBody = function() {
        var head = this.snake.arr[0];
        for (var i = 1; i < this.snake.arr.length; i++) {
            var snake = this.snake.arr[i];
            if (head.row === snake.row && head.col === snake.col) {
                this.gameOver();
            }
        }
    }
    // 吃到食物长度增加，随机出新的食物
Game.prototype.checkFood = function() {
        var head = this.snake.arr[0];
        var score = document.getElementById('score');
        if (head.row === this.food.row && head.col === this.food.col) {
            // this.map.arr[this.food.row][this.food.col].style.backgroundImage = '';
            this.snake.grow();
            this.randomFood();
            this.num++;
            score.innerHTML = '你的分数为\n' + this.num;
            // 每吃五个食物随机一个障碍物
            if (this.num % 2 === 0) {
                this.randomBlock();
            }
            // 每吃十个食物加速一次
            if (this.num % 10 === 0) {
                this.quckily();
            }
        }
    }
    // 加速
Game.prototype.quckily = function() {
        this.looptime -= 200;
        clearInterval(this.timebar);
        this.startGame();
    }
    // 随机食物
Game.prototype.randomFood = function() {
        var row = parseInt(this.map.rows * Math.random());
        var col = parseInt(this.map.cols * Math.random());
        for (var i = 0; i < this.block.arr.length; i++) {
            var block = this.block.arr[i];
            if (block.row === row && block.col === col) {
                return this.randomFood();
            }
        }
        for (var i = 0; i < this.snake.arr.length; i++) {
            var snake = this.snake.arr[i];
            if (snake.row === row && snake.col === col) {
                return this.randomFood();
            }
        }
        this.food.reset(row, col);
    }
    // 随机障碍物
Game.prototype.randomBlock = function() {
        var row = parseInt(this.map.rows * Math.random());
        var col = parseInt(this.map.cols * Math.random());

        for (var i = 0; i < this.snake.arr.length; i++) {
            var snake = this.snake.arr[i];
            if (snake.row === row && snake.col === col) {
                return this.randomBlock();
            }
        }
        if (row === this.food.row && col === this.food.col) {
            return this.randomBlock();
        }
        this.block.reset(row, col);
    }
    // 检测游戏是否结束
Game.prototype.checkGame = function() {
        // 获取头部
        var head = this.snake.arr[0];
        // 判断头部是否碰到边界
        // 判断行和列
        if (head.row < 0 || head.row >= this.map.rows || head.col < 0 || head.col >= this.map.cols) {
            this.gameOver();
        }
    }
    // 游戏结束
Game.prototype.gameOver = function() {
    // 游戏结束
    this.state = true;
    // // 清除定时器
    clearInterval(this.timebar);
    // game over
    alert('game over');
}