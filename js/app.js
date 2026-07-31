let currentBill = {};

window.addEventListener("load", async () => {

    // Load tariff and settings
    const tariffData = await getTariffs();
    loadTariffs(tariffData);

    const settingData = await getSettings();
    loadSettings(settingData);

    // Default month = current month
    const today = new Date();
    document.getElementById("month").value =
        today.toISOString().slice(0, 7);

    // Live calculation
    document.getElementById("units").addEventListener("input", () => {

        const units =
            document.getElementById("units").value;

        currentBill = calculateBill(units);

        updateUI(currentBill);

    });

    // Save button
    document.getElementById("saveBtn").addEventListener("click", async () => {

        const units =
            Number(document.getElementById("units").value);

        if (!units) {

            alert("Please enter units.");

            return;

        }

        const data = {

            month:
                document.getElementById("month").value,

            units,

            ...currentBill

        };

        const result = await saveBill(data);

        if (result.success) {

            alert("Bill saved successfully!");

            document.getElementById("units").value = "";

            currentBill = calculateBill(0);

            updateUI(currentBill);

        }

    });

});
