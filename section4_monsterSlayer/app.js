new Vue({
    el: '#app',
    data: {
        playerhealth: 100,
        monsterhealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerhealth = 100;
            this.monsterhealth = 100;
            this.turns = [];
        },
        attack: function(){
            var dmg = this.damage(10, 3);
            this.monsterhealth -= dmg;

            this.playerLog('Player hits Monster for ', dmg);
            //if(this.result()) return;
                
            this.monsterAttack();      
        },
        specialAttack: function(){
            var dmg = this.damage(20, 10);
            this.monsterhealth -= dmg;
            
            this.playerLog('Player hits Monster for ', dmg);

            //if(this.result()) return;
                
            this.monsterAttack();
        },
        heal: function(){
            if(this.playerhealth >= 100)
                return;
            else if(this.playerhealth > 90  && this.playerhealth < 100){
                this.playerhealth = 100;
                this.playerLog('Player heals for ', 10);
            }
            else{
                this.playerhealth += 10;
                this.playerLog('Player heals for ', 10);
            }
            this.monsterAttack();
        },
        giveUp: function(){
            if(confirm('Do you want to give up the game?')){
                this.gameIsRunning = false;
            }
        },
        damage: function(maxDamage, minDamage){
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage); 
        },
        result: function(){
            if(this.monsterhealth <= 0){
                this.monsterhealth  = 0;
                if(confirm('You win!! New game?'))
                    this.startGame();
                else
                    this.gameIsRunning = false;
                return true;
            }else if(this.playerhealth <= 0){
                this.playerhealth = 0;
                if(confirm('You lost!! New game?'))
                    this.startGame();
                else
                    this.gameIsRunning = false;
                return true;
            }
            return false;
        },
        monsterAttack: function(){
            var dmg = this.damage(12, 5);
            this.playerhealth -= dmg;

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + dmg
            })

            this.result();
        },
        playerLog: function(txt, dmg){
            this.turns.unshift({
                isPlayer: true,
                text: txt + dmg
            })
        }
    }
});