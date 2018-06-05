const inputField = document.querySelector("input[type='search']");
const convertBtn = document.querySelector('.btn');
const result = document.querySelector('.result p');

const getHundredsValue = (str) => {
    let num = Number(str);
    let result = '';

    let oneDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    let multiplesOfTen = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    let twoDigitsLessThan20 = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

    if (num >= 100) {
        result += oneDigits[Math.trunc(num / 100)] + " Hundred";
        num %= 100;
        if (num > 0) result += " and ";
    }
    if (num >= 20) {
        result += multiplesOfTen[Math.trunc(num / 10)];
        num %= 10;
        if (num > 0) result += "-";
    } else if (num >= 10) {
        result += twoDigitsLessThan20[num % 10];
        num = 0;
    }
    if(num != 0) result += oneDigits[num];

    return result;
}


const toWords = (str) => {
    let num = str.trim().replace(/,/g, '');
    if (num.length == 0) return 'Enter a number in the field above.';
    if (!num.match(/^[0-9]+$/)) return 'Input contain non-numeric Character(s)';

    num = num.replace(/^0+/, '');

    if (!num) return 'Zero';
    if (num.length > 66) return "Opps! Sorry, I can't handle numbers this high";

    let result = '';
    let formattedNumber = '';

    let bigNumbers = ["", " Thousand", " Million", " Billion", " Trillion", " Quadrillion", " Quintillion", " Sextillion", " Septillion",
        " Octillion", " Nonillion", " Decillion", " Undecillion", " Duodecillion", " Trecillion", " Quattuordecillion", " Quindecillion",
        " Sexdecillion", " Septdecillion", " Octodecillion", " Novendecillion", " Vigindecillion"];


    while (num.length > 3) {
        if (num.length % 3 != 0) {
            result += getHundredsValue(num.slice(0, num.length % 3))+ bigNumbers[Math.trunc((num.length - 1) / 3)];
            num = num.slice(num.length % 3).replace(/^0+/, '');
        } else {
            result += getHundredsValue(num.slice(0, 3))+ bigNumbers[Math.trunc((num.length - 1) / 3)];
            num = num.slice(3).replace(/^0+/, '');
        }

        result += num.length ? num.length > 2 ? ', ' : ' and ' : '';
    }

    result += getHundredsValue(num);

    return result;
}


const convertToWords = (event) => {
    result.innerText = toWords(inputField.value);
    event.preventDefault();
};

inputField.addEventListener('keyup', (event) => {
    
    if(event.key === 'Enter') convertBtn.click();
});

convertBtn.addEventListener('click', convertToWords);
