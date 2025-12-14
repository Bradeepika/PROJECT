window.onload = () => {
  document.getElementById("quoteDate").valueAsDate = new Date();
};

function addRow() {
  const table = document.getElementById("itemTable");
  const row = table.insertRow(-1);

  row.insertCell(0).innerText = table.rows.length - 1;
  row.insertCell(1).innerHTML = `<input type="text">`;
  row.insertCell(2).innerHTML = `<input type="number" min="0">`;
  row.insertCell(3).innerHTML = `<input type="number" min="0">`;
  row.insertCell(4).innerHTML = `<button onclick="removeRow(this)">Remove</button>`;
}

function removeRow(btn) {
  btn.closest("tr").remove();
  updateSerial();
}

function updateSerial() {
  const table = document.getElementById("itemTable");
  for (let i = 1; i < table.rows.length; i++) {
    table.rows[i].cells[0].innerText = i;
  }
}

function calculate() {
  const table = document.getElementById("itemTable");
  let subtotal = 0;

  for (let i = 1; i < table.rows.length; i++) {
    const qty = table.rows[i].cells[2].querySelector("input").value || 0;
    const rate = table.rows[i].cells[3].querySelector("input").value || 0;
    subtotal += qty * rate;
  }

  const gst = subtotal * 0.18;
  const grand = subtotal + gst;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("gst").innerText = gst.toFixed(2);
  document.getElementById("grand").innerText = grand.toFixed(2);
  document.getElementById("words").innerText = numberToWords(Math.round(grand));
}

function numberToWords(num) {
  const a = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
  "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const b = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

  if (num === 0) return "Zero Rupees Only";

  function convert(n) {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n/10)] + " " + a[n%10];
    if (n < 1000) return a[Math.floor(n/100)] + " Hundred " + convert(n%100);
    if (n < 100000) return convert(Math.floor(n/1000)) + " Thousand " + convert(n%1000);
    return convert(Math.floor(n/100000)) + " Lakh " + convert(n%100000);
  }

  return convert(num) + " Rupees Only";
}