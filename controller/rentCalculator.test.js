import calculateCharges from "./rentCalculator";

async function test() {
    // Test case 1: Customer with no rentals
    let totalCharges = await calculateCharges(1);
    console.assert(totalCharges === 0, "Test case 1 passed");

    // Test case 2: Customer with 1 regular book for 1 day , 1 regular book for 6 days and 2 novels rental for 6 days
    totalCharges = await calculateCharges(2);
    console.assert(totalCharges === 25, "Test case 2 passed");

    // Test case 3: Customer with 2 novel books rentals for 2 days each
    totalCharges = await calculateCharges(3);
    console.assert(totalCharges === 18, "Test case 3 passed");
}

test();