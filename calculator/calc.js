const args = process.argv.slice(2);

const num_1 = parseInt(args[0]);
const num_2 = parseInt(args[2]);
const operation = args[1];
let answer;

switch (operation) {
  case "+":
    answer = num_1 + num_2;
    break;
  case "*":
    answer = num_1 * num_2;
    break;
  case "/":
    answer = num_1 / num_2;
    break;
  case "-":
    answer = num_1 - num_2;
    break;
}

if (!isNaN(num_1) && !isNaN(num_2) && (answer || answer === 0)) {
  console.log(`${num_1} ${operation} ${num_2} = ${answer}`);
} else {
  console.log("wrong input");
}
