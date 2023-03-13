const pool = require('../config/db');


const calculateCharges = async(customerId) => {
    try {
        // Get the customer's rental information from the database
        const rentalInfo = await pool.query(`SELECT book_id, rental_date, return_date FROM rentals WHERE customer_id = ${customerId}`);

        let totalCharges = 0;

        
        // Calculate charges for each book rented
        for (let i = 0; i < rentalInfo.rows.length; i++) {
            const rentalDate = rentalInfo.rows[i].rental_date;
            const returnDate = rentalInfo.rows[i].return_date;
            const daysRented = Math.ceil((new Date(returnDate) - new Date(rentalDate)) / (1000 * 60 * 60 * 24));

            const bookCharge = daysRented * 1; // Rs 1 per day

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
