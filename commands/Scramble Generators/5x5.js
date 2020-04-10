const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: '5x5',
            runIn: ['text'],
            cooldown: 7,
            aliases: ["five-by-five", "5x5x5"],
            usage: "[Count:number]", 
            description: "Generates 1-8 5x5 scrambles."
        });
    }

    async run(message, [...params]) {
        // console.log(params);
        let scrambles = parseInt(params[0]);
        scrambles = scrambles ? scrambles > 8 ? 8 : scrambles < 0 ? 1 : scrambles : 1;
        // console.log(cube);
        let msgArr = [];
        for(let x = 0; x < scrambles; x++) {
            let wides = ["Rw", "Uw", "Lw", "Dw", "Fw", "Bw"];
            let nonWides = ["R", "U", "L", "D", "F", "B"];
            let scramble = [];
            let i = 0;
            while(scramble.length < 60) {
                let move = Math.random() > 0.3 ? nonWides[Math.floor(Math.random() * nonWides.length)] : wides[Math.floor(Math.random() * wides.length)];
                if(i > 0 && (scramble[i - 1] === move)) {
                    continue;
                } else {
                    scramble.push(move);
                    i++;
                }
            }
            msgArr.push(scramble.map(index => Math.random() < 0.5 ? index += "2" : index += "\'").join(" "));
        }
        let scrambleStr = "";
        for (let i = 0; i < msgArr.length; i++)
            scrambleStr += `${i + 1}: ${msgArr[i]}\n\n`;
        return message.send(scrambleStr);
    }


};