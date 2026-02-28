class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.gameRunning = true;
        
        // 游戏世界
        this.camera = { x: 0, y: 0 };
        this.worldWidth = 2400;
        
        // 初始化游戏对象
        this.player = new Player(100, 300);
        this.platforms = this.createPlatforms();
        this.enemies = this.createEnemies();
        this.coins = this.createCoins();
        this.particles = [];
        
        // 输入处理
        this.keys = {};
        this.setupInput();
        
        // 开始游戏循环
        this.gameLoop();
    }
    
    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space') e.preventDefault();
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }
    
    createPlatforms() {
        return [
            // 地面平台
            new Platform(0, 350, 800, 50, '#8B4513'),
            new Platform(800, 350, 400, 50, '#8B4513'),
            new Platform(1400, 350, 600, 50, '#8B4513'),
            new Platform(2200, 350, 200, 50, '#8B4513'),
            
            // 浮动平台
            new Platform(300, 280, 120, 20, '#228B22'),
            new Platform(500, 220, 120, 20, '#228B22'),
            new Platform(700, 160, 120, 20, '#228B22'),
            new Platform(1000, 280, 120, 20, '#228B22'),
            new Platform(1200, 200, 120, 20, '#228B22'),
            new Platform(1600, 250, 120, 20, '#228B22'),
            new Platform(1800, 180, 120, 20, '#228B22'),
            new Platform(2000, 220, 120, 20, '#228B22'),
        ];
    }
    
    createEnemies() {
        return [
            new Enemy(400, 320, 300, 500),
            new Enemy(800, 320, 750, 950),
            new Enemy(1200, 320, 1150, 1350),
            new Enemy(1600, 320, 1550, 1750),
            new Enemy(2000, 320, 1950, 2150),
        ];
    }
    
    createCoins() {
        return [
            new Coin(350, 250),
            new Coin(550, 190),
            new Coin(750, 130),
            new Coin(1050, 250),
            new Coin(1250, 170),
            new Coin(1650, 220),
            new Coin(1850, 150),
            new Coin(2050, 190),
            new Coin(2300, 320),
        ];
    }
    
    updateCamera() {
        // 相机跟随玩家
        this.camera.x = this.player.x - this.canvas.width / 2;
        this.camera.x = Math.max(0, Math.min(this.camera.x, this.worldWidth - this.canvas.width));
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // 更新玩家
        this.player.update(this.keys, this.platforms);
        
        // 更新敌人
        this.enemies.forEach(enemy => enemy.update(this.platforms));
        
        // 更新粒子效果
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.life > 0;
        });
        
        // 检查碰撞
        this.checkCollisions();
        
        // 更新相机
        this.updateCamera();
        
        // 检查游戏结束条件
        if (this.player.y > 500) {
            this.gameOver();
        }
        
        // 检查胜利条件
        if (this.player.x > this.worldWidth - 100) {
            this.victory();
        }
    }
    
    checkCollisions() {
        // 检查金币碰撞
        this.coins = this.coins.filter(coin => {
            if (this.player.collidesWith(coin)) {
                this.score += 100;
                this.updateScore();
                this.createCoinEffect(coin.x, coin.y);
                return false;
            }
            return true;
        });
        
        // 检查敌人碰撞
        this.enemies.forEach(enemy => {
            if (this.player.collidesWith(enemy)) {
                if (this.player.vy > 0 && this.player.y < enemy.y) {
                    // 玩家从上方踩到敌人
                    enemy.defeated = true;
                    this.player.vy = -15;
                    this.score += 200;
                    this.updateScore();
                    this.createEnemyEffect(enemy.x, enemy.y);
                } else if (!enemy.defeated) {
                    // 玩家被敌人击中
                    this.gameOver();
                }
            }
        });
        
        // 移除被击败的敌人
        this.enemies = this.enemies.filter(enemy => !enemy.defeated);
    }
    
    createCoinEffect(x, y) {
        for (let i = 0; i < 8; i++) {
            this.particles.push(new Particle(x, y, '#FFD700'));
        }
    }
    
    createEnemyEffect(x, y) {
        for (let i = 0; i < 12; i++) {
            this.particles.push(new Particle(x, y, '#FF6B6B'));
        }
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
    
    gameOver() {
        this.gameRunning = false;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#FF6B6B';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('游戏结束!', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillText(`最终得分: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 30);
        
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.font = '18px Arial';
        this.ctx.fillText('刷新页面重新开始', this.canvas.width / 2, this.canvas.height / 2 + 70);
    }
    
    victory() {
        this.gameRunning = false;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#32CD32';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('恭喜通关!', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillText(`最终得分: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 30);
        
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.font = '18px Arial';
        this.ctx.fillText('刷新页面重新开始', this.canvas.width / 2, this.canvas.height / 2 + 70);
    }
    
    render() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 保存上下文状态
        this.ctx.save();
        
        // 应用相机变换
        this.ctx.translate(-this.camera.x, -this.camera.y);
        
        // 绘制背景云朵
        this.drawClouds();
        
        // 绘制平台
        this.platforms.forEach(platform => platform.render(this.ctx));
        
        // 绘制金币
        this.coins.forEach(coin => coin.render(this.ctx));
        
        // 绘制敌人
        this.enemies.forEach(enemy => enemy.render(this.ctx));
        
        // 绘制玩家
        this.player.render(this.ctx);
        
        // 绘制粒子效果
        this.particles.forEach(particle => particle.render(this.ctx));
        
        // 恢复上下文状态
        this.ctx.restore();
    }
    
    drawClouds() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        // 绘制几朵云
        const clouds = [
            { x: 200, y: 50, size: 30 },
            { x: 600, y: 80, size: 25 },
            { x: 1000, y: 60, size: 35 },
            { x: 1400, y: 40, size: 28 },
            { x: 1800, y: 70, size: 32 },
        ];
        
        clouds.forEach(cloud => {
            this.drawCloud(cloud.x, cloud.y, cloud.size);
        });
    }
    
    drawCloud(x, y, size) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.8, y, size * 0.8, 0, Math.PI * 2);
        this.ctx.arc(x + size * 1.6, y, size, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.4, y - size * 0.5, size * 0.7, 0, Math.PI * 2);
        this.ctx.arc(x + size * 1.2, y - size * 0.5, size * 0.7, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.jumpPower = 16;
        this.onGround = false;
        this.direction = 1; // 1 = 右, -1 = 左
    }
    
    update(keys, platforms) {
        // 水平移动
        this.vx = 0;
        if (keys['KeyA'] || keys['ArrowLeft']) {
            this.vx = -this.speed;
            this.direction = -1;
        }
        if (keys['KeyD'] || keys['ArrowRight']) {
            this.vx = this.speed;
            this.direction = 1;
        }
        
        // 跳跃
        if ((keys['KeyW'] || keys['ArrowUp'] || keys['Space']) && this.onGround) {
            this.vy = -this.jumpPower;
            this.onGround = false;
        }
        
        // 重力
        this.vy += 0.8;
        
        // 更新位置
        this.x += this.vx;
        this.y += this.vy;
        
        // 平台碰撞检测
        this.onGround = false;
        platforms.forEach(platform => {
            if (this.collidesWith(platform)) {
                // 从上方落到平台上
                if (this.vy > 0 && this.y - this.height < platform.y) {
                    this.y = platform.y - this.height;
                    this.vy = 0;
                    this.onGround = true;
                }
                // 从下方撞到平台
                else if (this.vy < 0 && this.y > platform.y + platform.height) {
                    this.y = platform.y + platform.height;
                    this.vy = 0;
                }
                // 从左侧撞到平台
                else if (this.vx > 0 && this.x - this.width < platform.x) {
                    this.x = platform.x - this.width;
                }
                // 从右侧撞到平台
                else if (this.vx < 0 && this.x > platform.x + platform.width) {
                    this.x = platform.x + platform.width;
                }
            }
        });
        
        // 限制在世界边界内
        this.x = Math.max(0, Math.min(this.x, 2400 - this.width));
    }
    
    collidesWith(obj) {
        return this.x < obj.x + obj.width &&
               this.x + this.width > obj.x &&
               this.y < obj.y + obj.height &&
               this.y + this.height > obj.y;
    }
    
    render(ctx) {
        // 绘制玛丽的身体
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(this.x + 5, this.y + 15, this.width - 10, this.height - 15);
        
        // 绘制帽子
        ctx.fillStyle = '#DC143C';
        ctx.fillRect(this.x + 3, this.y, this.width - 6, 18);
        
        // 绘制帽子上的M标志
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('M', this.x + this.width / 2, this.y + 12);
        
        // 绘制眼睛
        ctx.fillStyle = '#000000';
        if (this.direction === 1) {
            ctx.fillRect(this.x + 18, this.y + 20, 3, 3);
        } else {
            ctx.fillRect(this.x + 9, this.y + 20, 3, 3);
        }
        
        // 绘制胡子
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x + 8, this.y + 25, 14, 2);
        
        // 绘制手臂
        ctx.fillStyle = '#FFE4B5';
        if (this.direction === 1) {
            ctx.fillRect(this.x - 3, this.y + 20, 8, 15);
            ctx.fillRect(this.x + 25, this.y + 20, 8, 15);
        } else {
            ctx.fillRect(this.x - 3, this.y + 20, 8, 15);
            ctx.fillRect(this.x + 25, this.y + 20, 8, 15);
        }
        
        // 绘制腿
        ctx.fillStyle = '#0000FF';
        ctx.fillRect(this.x + 8, this.y + 35, 6, 5);
        ctx.fillRect(this.x + 16, this.y + 35, 6, 5);
    }
}

class Platform {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 添加边框效果
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        // 添加草地效果（仅对绿色平台）
        if (this.color === '#228B22') {
            ctx.fillStyle = '#32CD32';
            for (let i = 0; i < this.width; i += 10) {
                ctx.fillRect(this.x + i, this.y - 3, 3, 3);
                ctx.fillRect(this.x + i + 5, this.y - 2, 2, 2);
            }
        }
    }
}

class Enemy {
    constructor(x, y, leftBound, rightBound) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.vx = 2;
        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.defeated = false;
    }
    
    update(platforms) {
        if (this.defeated) return;
        
        // 移动
        this.x += this.vx;
        
        // 边界检查
        if (this.x <= this.leftBound || this.x >= this.rightBound) {
            this.vx = -this.vx;
        }
        
        // 重力和平台碰撞
        this.y += 2;
        platforms.forEach(platform => {
            if (this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.y < platform.y + platform.height &&
                this.y + this.height > platform.y) {
                this.y = platform.y - this.height;
            }
        });
    }
    
    render(ctx) {
        if (this.defeated) return;
        
        // 绘制敌人身体
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 绘制眼睛
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x + 5, this.y + 5, 4, 4);
        ctx.fillRect(this.x + 16, this.y + 5, 4, 4);
        
        // 绘制嘴巴
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.x + 8, this.y + 15, 9, 2);
        
        // 绘制尖刺
        ctx.fillStyle = '#654321';
        for (let i = 0; i < this.width; i += 5) {
            ctx.fillRect(this.x + i, this.y - 3, 3, 3);
        }
    }
}

class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.rotation = 0;
    }
    
    render(ctx) {
        this.rotation += 0.1;
        
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // 绘制金币
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // 绘制金币边框
        ctx.strokeStyle = '#FFA500';
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // 绘制金币中心的符号
        ctx.fillStyle = '#FFA500';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('¥', 0, 4);
        
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10 - 5;
        this.color = color;
        this.life = 30;
        this.maxLife = 30;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.3;
        this.life--;
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.fillStyle = this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fillRect(this.x, this.y, 4, 4);
    }
}

// 启动游戏
window.addEventListener('load', () => {
    new Game();
});