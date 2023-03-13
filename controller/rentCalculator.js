const pool = require('../config/db');


async function calculateRent(bookType, rentalDays) {
    let rentalCharge = 0;

    // Calculate the rental charge based on the book type
    switch (bookType.toLowerCase()) {
        case 'regular':
            if (rentalDays < 2) 
                rentalCharge = rentalDays * 1;
            else
                rentalCharge = 2 + (rentalDays - 2) * 1.5;
            break;
        case 'novel':
            if (rentalDays < 3) 
                rentalCharge = rentalDays * 4.5;
            else
                rentalCharge = 2 + (rentalDays - 2) * 1.5;
            break;
        case 'fiction':
            rentalCharge = rentalDays * 3;
            break;
        default:
            throw new Error('Invalid book type');
    }

    // Return the rental charge
    return rentalCharge;
}

const calculateCharges = async (customerId) => {
    try {
        // Get the customer's rental information from the database
        const rentalInfo = await pool.query(`SELECT book_id ,book_type, rental_date, return_date FROM rentals WHERE customer_id = ${customerId}`);

        let totalCharges = 0;


        // Calculate charges for each book rented
        for (let i = 0; i < rentalInfo.rows.length; i++) {
            const bookType = rentalInfo.rows[i].book_type;
            const rentalDate = rentalInfo.rows[i].rental_date;
            const returnDate = rentalInfo.rows[i].return_date;
            const daysRented = Math.ceil((new Date(returnDate) - new Date(rentalDate)) / (1000 * 60 * 60 * 24));

            //const bookCharge = daysRented * 1; // Rs 1 per day

            const bookCharge = calculateRent(bookType, daysRented);

            totalCharges += bookCharge;
        }

        // Print the total charges
        console.log(`Customer ${customerId}'s total charges are Rs ${totalCharges}`);

        return totalCharges;
    } catch (err) {
        console.error(err);
    }
}

module.exports = calculateCharges;
