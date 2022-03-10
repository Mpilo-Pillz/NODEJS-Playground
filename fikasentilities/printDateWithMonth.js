
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];



let today = new Date().toLocaleDateString()

const dateArray = today.split('/')
console.log(dateArray);
// [ '01', '03', '2022' ]
console.log(dateArray[1].split('')[1] - 1);
const mapDateIndexToMonthNames = () => {
    dateArray[1].split('')[1] - 1

    return 
}

const todayWithMonthName = `${dateArray[0]} ${monthNames[dateArray[1].split('')[1] - 1]} ${dateArray[2]}`
console.log(todayWithMonthName);

// cleaner
const d = new Date();
const month = d.getMonth();
const day = d.getDate();
const year = d.getFullYear()

const todayWithMonthNameDateFormat = `${day} ${monthNames[month]} ${year}`

console.log(month);
console.log(day);
console.log(year);

console.log(todayWithMonthNameDateFormat);