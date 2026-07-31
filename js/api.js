
const API_URL =
"https://script.google.com/macros/s/AKfycbzua5pEjkvDL7oyvQPHaqTvqBPaEhMmInQPraLbgxKq5MVxWIM-iKL2swuWYeFRdT1X/exec";

async function getTariffs() {
    const response = await fetch(`${API_URL}?action=tariffs`);
    return await response.json();
}

async function getSettings() {
    const response = await fetch(`${API_URL}?action=settings`);
    return await response.json();
}

async function getBills() {
    const response = await fetch(`${API_URL}?action=bills`);
    return await response.json();
}

async function saveBill(data) {

    const response = await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify(data)
    });

    return await response.json();

}
