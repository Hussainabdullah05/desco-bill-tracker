function updateUI(bill) {

    document.getElementById("totalBill").textContent =
        bill.totalBill.toFixed(2);

    document.getElementById("energyCharge").textContent =
        "৳ " + bill.energyCharge.toFixed(2);

    document.getElementById("vat").textContent =
        "৳ " + bill.vat.toFixed(2);

    document.getElementById("meterRent").textContent =
        "৳ " + bill.meterRent.toFixed(2);

    document.getElementById("otherCharges").textContent =
        "৳ " + bill.otherCharges.toFixed(2);

}
