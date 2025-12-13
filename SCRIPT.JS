function addRow() {
  const table = document.getElementById("itemTable");
  const rowCount = table.rows.length;
  const row = table.insertRow(rowCount);

  row.insertCell(0).innerText = rowCount;

  row.insertCell(1).innerHTML = `<input type="text">`;
  row.insertCell(2).innerHTML = `<input type="number" min="0">`;
  row.insertCell(3).innerHTML = `<input type="number" min="0" class="price">`;
}

function calculate() {
  const table = document.getElementById("itemTable");
  let subtotal = 0;

  for (let i = 1; i < table.rows.length; i++) {
    const qty = table.rows[i].cells[2].querySelector("input").value || 0;
    const price = table.rows[i].cells[3].querySelector("input").value || 0;

    subtotal += Number(qty) * Number(price);
  }

  const gst = subtotal * 0.18;
  const grand = subtotal + gst;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("gst").innerText = gst.toFixed(2);
  document.getElementById("grand").innerText = grand.toFixed(2);
}
