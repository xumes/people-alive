var _ = require('lodash')

function calculate(people){
    let arrYearAlive = []
    let highQtd = 0
    let mostFreqYear = 0

    for(let x=0;x<people.length;x++){
        //first, check the years every person was alive
        arrYearAlive = checkYearAlive(arrYearAlive, people[x])
    }

    //now, filter by the most frequently years
    highQtd = _.maxBy(arrYearAlive, 'qtd').qtd;
    mostFreqYear = _.filter(arrYearAlive, {qtd: highQtd})

    return mostFreqYear
}

function checkYearAlive(arr, item){
    const born = item.born
    const death = item.death

    for(let x=born; x<=death; x++){
        if(_.find(arr, {'year': x})){
            var index = _.indexOf(arr, _.find(arr, {'year': x}));
            arr.splice(index, 1, {year: x, qtd: arr[index].qtd+1})
        } else {
            arr.push({year: x, qtd: 1})
        }
    }
    return arr
}

function formatResult(res){

    const peopleCount = res[0].qtd
    const years = _.map(res, 'year')

    return `${peopleCount} people lived on the years ${years}`
}


//define each person
const p1={born:1977, death:2052}
const p2={born:2010, death:2052}
const p3={born:1972, death:2052}
const p4={born:1977, death:2052}
const p5={born:1977, death:2052}
const p6={born:2010, death:2052}
const p7={born:2018, death:2019}
const p8={born:1930, death:1958}

//define the result object
let result = {}
let message = ''
//group people in an array
const people = [p1, p2, p3, p4, p5, p6, p7, p8]

//calls the main function
result = calculate(people)
message = formatResult(result)


console.log(result)  //object
console.log(message)  //string