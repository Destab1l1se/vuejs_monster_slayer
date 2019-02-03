var app = new Vue({
    el: '#app',
    data: {
        gameRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        logValues: []
    },
    methods: {
        attack() {
            let playerAttack = this.getRandomIntValue(7, 15),
                monsterAttack = this.getRandomIntValue(7, 15);

            this.attackCommon(playerAttack, monsterAttack);
        },
        specialAttack() {
            let playerAttack = this.getRandomIntValue(10, 20),
                monsterAttack = this.getRandomIntValue(7, 15);

            this.attackCommon(playerAttack, monsterAttack);
        },
        heal() {
            let playerHeal = this.getRandomIntValue(7, 15),
                monsterAttack = this.getRandomIntValue(7, 15);

            this.playerHealth += playerHeal;
            this.playerHealth -= monsterAttack;

            this.logValues.push({
                playerHeal: playerHeal,
                monsterAttack: monsterAttack
            });
        },
        attackCommon(playerAttack, monsterAttack) {
            this.monsterHealth -= playerAttack;
            this.playerHealth -= monsterAttack;

            this.logValues.push({
                playerAttack: playerAttack,
                monsterAttack: monsterAttack
            });
        },
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logValues = [];
            this.gameRunning = true;
        },
        getRandomIntValue(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        finishOrRestart(message) {
            this.gameRunning = false;
            if (confirm(message)) {
                this.startNewGame();
            }
        },
        getHealthBarWidth(characterHealth) {
            return (characterHealth * parseInt(getComputedStyle(document.querySelector('.health-bar')).width) / 100) + 'px';
        }
    },
    computed: {
        playerHealthBarWidth() {
            return this.getHealthBarWidth(this.playerHealth);
        },
        monsterHealthBarWidth() {
            return this.getHealthBarWidth(this.monsterHealth);
        }
    },
    watch: {
        playerHealth(newHealth, oldHealth) {
            if (newHealth <= 0 && this.gameRunning) {
                this.finishOrRestart('You lost, would you like to start new game');
            }
        },
        monsterHealth(newHealth, oldHealth) {
            if (newHealth <= 0 && this.gameRunning) {
                this.finishOrRestart('Congratulations, you won! Would you like to start new game');
            }
        }
    }
});