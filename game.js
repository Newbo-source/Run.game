const canvas = document.getElementById('gameCanvas'); const ctx = canvas.getContext('2d');

const player = { x: 50, y: 150, width: 30, height: 30, speed: 5, lives: 3 };

const obstacles = []; const coins = []; let gameOver = false; let score = 0;

const keys = {}; document.addEventListener('keydown', (e) => keys[e.key] = true); document.addEventListener('keyup', (e) => keys[e.key] = false);

function update() { if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed; if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;


for (let i = 0; i < obstacles.length; i++) {
    if (player.x < obstacles[i].x + obstacles[i].width &&
        player.x + player.width > obstacles[i].x &&
        player.y < obstacles[i].y + obstacles[i].height &&
        player.y + player.height > obstacles[i].y) {
            obstacles.splice(i, 1);
            player.lives -= 1;
            if (player.lives <= 0) {
                gameOver = true;
            }
    }
}

// 코인 충돌 검사
for (let i = 0; i < coins.length; i++) {
    if (player.x < coins[i].x + coins[i].width &&
        player.x + player.width > coins[i].x &&
        player.y < coins[i].y + coins[i].height &&
        player.y + player.height > coins[i].y) {
            coins.splice(i, 1);
            score += 10;
    }
}

}

function draw() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = 'blue'; ctx.fillRect(player.x, player.y, player.width, player.height);

ctx.fillStyle = 'red';
obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height));

ctx.fillStyle = 'gold';
coins.forEach(coin => ctx.fillRect(coin.x, coin.y, coin.width, coin.height));

ctx.fillStyle = 'black';
ctx.fillText(`Score: ${score}`, 10, 20);
ctx.fillText(`Lives: ${player.lives}`, 10, 40);

}

function gameLoop() { if (!gameOver) { update(); draw(); requestAnimationFrame(gameLoop); } else { ctx.fillStyle = 'black'; ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2); } }

gameLoop();

