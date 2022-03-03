
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();

let today = new Date().toLocaleDateString()

const dateArray = today.split('/')
console.log(dateArray);
// [ '01', '03', '2022' ]
console.log(dateArray[1].split('')[1] - 1);
const mapDateIndexToMonthNames = dateArray[1].split('')[1] - 1

const todayWithMonthName = `${dateArray[0]} ${monthNames[dateArray[1].split('')[1] - 1]} ${dateArray[2]}`
console.log(todayWithMonthName);