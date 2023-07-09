const Chance = require("chance");
const chanceObj = new Chance();

const generatePerson = () => {
    return {
        "name" : chanceObj.last(),
        "password" : chanceObj.word()
        }
};

// const dom = generatePerson();

// console.log(dom);

const item = Array.from({ length: 80000 }, generatePerson);

    for (var i = 1000; i <= 6000; i++) {
        console.log(i+"\t"+"\t"+item[i].name+"\t"+item[i].password);
        }
    