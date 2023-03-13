import calculateCharges from "./rentCalculator";

async function test() {
    // Test case 1: Customer with no rentals
    let totalCharges = await calculateCharges(1);
    console.assert(totalCharges === 0, "Test case 1 passed");

    // Test case 2: Customer with 1 rental for 5 days
    totalCharges = await calculateCharges(2);
    console.assert(totalCharges === 5, "Test case 2 passed");

    // Test case 3: Customer with 2 rentals for 5 days each
    totalCharges = await calculateCharges(3);
    console.assert(totalCharges === 10, "Test case 3 passed");
}

test();