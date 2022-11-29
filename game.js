// importing readline-sync module to get user inputs
const readline = require('readline-sync');

const guessNumber = () => {
    return new Promise((resolve, reject) => {
        const choice_number = Number(readline.question('Enter a number between 1 to 6: '));
        if (isNaN(choice_number) || choice_number > 6 || choice_number < 1) {
            reject(new Error("Invalid choice!"));
        }
        const random_number = Math.floor(Math.random() * 6 + 1);

        if (choice_number === random_number) {
            resolve({
                "point": 2,
                random_number,
            })
        } else if (random_number === choice_number + 1 || random_number === choice_number - 1) {
            resolve({
                "point": 1,
                random_number,
            })            
        } else {
            resolve({
                "point": 0,
                random_number,
            })
        }
    })
}

const continueGame = () => {
    return new Promise((resolve, reject) => {
        const your_decision = readline.question('Do you want to continue the game (Y/N)? ');
        if (your_decision.toLocaleLowerCase() === 'y') {
            resolve(true);
        } else if (your_decision.toLocaleLowerCase() === 'n') {
            resolve(false);
        } else {
            reject(new Error('Invalid choice!'));
        }
    })
}

const handleGuess = async () => {

    try {
        const result = await guessNumber();
        console.log(`You got ${result.point} point and the random number was ${result.random_number}`);
        const decision = await continueGame();
        if (!decision) {
            console.log('Game ends..');
        } else {
            start();
        }
    } catch (error) {
        console.log(error);
        const decision = await continueGame();
        if (!decision) {
            console.log('Game ends..');
        } else {
            start();
        }
    }
}

const start = () => {
    handleGuess();
}

start();