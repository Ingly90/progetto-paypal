const container = document.getElementById("numbers-container");
const paypalLink = "http://paypal.me/Giuseppeinglima";

const loadNumbers = async () => {
    const response = await fetch("/api/numbers");
    const numbers = await response.json();

    numbers.forEach(num => {
        const btn = document.createElement("a");
        btn.className = `number-btn ${num.available ? "" : "unavailable"}`;
        btn.innerText = `Numero ${num.number}`;
        if (num.available) {
            btn.href = `${paypalLink}?amount=10&item_name=Numero+${num.number}`;
            btn.onclick = async (e) => {
                e.preventDefault();
                const res = await fetch("/api/block", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ number: num.number })
                });
                if (res.ok) {
                    alert("Numero bloccato! Procedi al pagamento.");
                    window.location.href = btn.href;
                } else {
                    alert("Numero non disponibile");
                }
            };
        } else {
            btn.style.pointerEvents = "none";
        }
        container.appendChild(btn);
    });
};

loadNumbers();