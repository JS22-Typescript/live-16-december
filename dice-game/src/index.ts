let throws = 0; // Använder implicit typning här alltså throws blir typ number
let currentGoal = 1; // Nuvarande tärningsmål
let lastThrow = 1; // Vårt senaste tärningskast

interface Dice {
    sides: number,
    throw(): number // En metod som returnerar ett nummer
}

let dice: Dice = {
    sides: 6,
    throw() {
        return Math.ceil(Math.random() * this.sides); // Slumpar ett tal mellan 1 - 6
    }
}

const buttonElem = document.querySelector('button');
const diceElem = document.querySelector('#diceElem');

function resetUI(numberOfDices: number): void {
    for (let index = 1; index <= numberOfDices; index++) {
        document.querySelector(`.dots-${index}`)?.classList.add('faded');
    }
}

//if (buttonElem) {
buttonElem?.addEventListener('click', () => {
    // Kasta tärning och spara resultatet
    let result = dice.throw();

    // Visar tärningen i gränssnittet
    diceElem?.classList.remove(`dots-${lastThrow}`);
    diceElem?.classList.add('dice', `dots-${result}`);

    throws++;

    if (result === currentGoal && currentGoal < 6) {
        document.querySelector(`.dots-${result}`)?.classList.remove('faded');

        currentGoal++; // Öka målet med 1
    } else if (result === currentGoal && currentGoal === 6) {
        document.querySelector(`.dots-${result}`)?.classList.remove('faded');

        console.log(`Woho, du vann! Antal kast: ${throws}`);

        resetUI(6);
        throws = 0;
        currentGoal = 1;
    }

    lastThrow = result;
});
//}

interface Owner {
    lastname: string,
    name: string,
    phoneNumber: string
}

interface Dog {
    age: number,
    breed: string,
    chipNumber: string,
    img: string,
    name: string,
    owner: Owner,
    present: boolean,
    sex: string
}

async function getDogs() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/doggy-daycare-api/dogs');
        console.log(response);
        if (response.status === 200) {
            const data: Dog[] = await response.json();
            console.log(data);
        } else {
            throw Error('Något gick fel, försök igen senare');
        }
    } catch (error) {
        console.log(error);
    }
}

getDogs();