function Snake(head, body, tail) {
    this.arr = [
            { row: 4, col: 7 },
            { row: 4, col: 6 },
            { row: 4, col: 5 },
            { row: 4, col: 4 },

        ]
        // 默认移动方向
    this.direction = 39;
    // 存储图片
    this.head = head;
    this.tail = tail;
    // 图片在head数组中是按照左上右下的顺序排列
    this.headImage = head[this.direction - 37];
    this.bodyImage = body;
    // 我们吧tail数组中的图片按照左上右下的顺序储存
    this.tailImage = tail[this.direction - 37];
}
// 移动方法
Snake.prototype.move = function() {
        // 原理：将尾巴元素插入到数组前面
        // 获取尾巴元素
        var tail = this.arr.pop();
        // 让尾巴的坐标与当前头部坐标相同
        tail.row = this.arr[0].row;
        tail.col = this.arr[0].col;
        // 将尾巴元素插入到数组最前面
        this.arr.unshift(tail);
        // 根据方向修改坐标
        switch (this.direction) {
            // 左
            case 37:
                // 向左移动一列
                tail.col--;
                break;
                // 上
            case 38:
                // 想上移动一行
                tail.row--;
                break;
                // 右
            case 39:
                // 向右移动一列
                tail.col++;
                break;
                // 下
            case 40:
                // 向下移动一行
                tail.row++;
                break;
            default:
                ;
        }
        // 蛇移动的时候要考虑尾巴的方向
        // 获取尾巴和前一个身体
        var tail = this.arr[this.arr.length - 1];
        var body = this.arr[this.arr.length - 2];
        // 比较，在同一行或者同一列上要改变
        // 同一行
        if (tail.row === body.row) {
            // 判断尾巴在左还是右
            // 尾巴在左
            if (tail.col < body.col) {
                this.tailImage = this.tail[2];
                // 尾巴在右
            } else {
                this.tailImage = this.tail[0];
            }
            // 同一列
        } else if (tail.col === body.col) {
            // 判断尾巴在上还是在下
            // 尾巴在上
            if (tail.row < body.row) {
                this.tailImage = this.tail[3];
                // 尾巴在下
            } else {
                this.tailImage = this.tail[1];
            }
        }
    }
    // 改变方向
Snake.prototype.changeDirection = function(e) {
    // 不能向反方向移动
    if (Math.abs(this.direction - e) === 2) {
        return;
    }
    // 改变方向
    this.direction = e;
    // 更改头部图片
    this.headImage = this.head[e - 37];
}
Snake.prototype.grow = function() {
    // 获取尾巴坐标
    var tail = this.arr[this.arr.length - 1];
    // 在数组末尾添加一个尾巴位置的对象
    var obj = {
        row: tail.row,
        col: tail.col
    };
    // 添加到数组中
    this.arr.push(obj);

}