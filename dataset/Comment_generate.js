const Chance = require("chance");
const chanceObj = new Chance();

const generatePerson = () => {
    return {
        "price" : chanceObj.floating({ min: 0, max: 10000, fixed: 2 }),
        "sentence" : chanceObj.sentence(),
        "user" : chanceObj.integer({ min: 1000, max: 1999 }),
        "rate" : chanceObj.integer({ min: 0, max: 5 }),
        "product" : chanceObj.integer({ min: 1, max: 1000 }),
        "year" : chanceObj.integer({ min: 2019, max: 2021 }),
        "month" : chanceObj.integer({ min: 1, max: 9 }),
        "date" : chanceObj.integer({ min: 10, max: 28 }),
        "first" : chanceObj.integer({ min: 0, max: 1 }),
        "second" : chanceObj.integer({ min: 0, max: 9 }),
        "first2" : chanceObj.integer({ min: 0, max: 5 }),
        "second2" : chanceObj.integer({ min: 0, max: 9 }),
        "first3" : chanceObj.integer({ min: 0, max: 5 }),
        "second3" : chanceObj.integer({ min: 0, max: 9 })
        }
};

// const dom = generatePerson();

// console.log(dom);

const item = Array.from({ length: 5000 }, generatePerson);
var j = 1000;
    for (var i = 100; i <= 4500; i++) {
        console.log(i+"\t"+item[i].rate+"\t"+item[i].year+"-0"+item[i].month+"-"+item[i].date+" "+
        item[i].first+item[i].second+":"+
        item[i].first2+item[i].second2+":"+
        item[i].first3+item[i].second3
        +"\t"+item[i].sentence+"\t"+j+"\t"+item[i].product);
       j++;
        }
    