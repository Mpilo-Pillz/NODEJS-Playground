
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();

let today = new Date().toLocaleDateString()

const dateArray = today.split('/')
console.log(dateArray);
console.log(dateArray);

const todayWithMonthName = `${dateArray[0]} ${monthNames[dateArray[1].split()[1]]} ${dateArray[2]}`
console.log(todayWithMonthName);