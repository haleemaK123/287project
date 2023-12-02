window.onload = function() {
  retrieveLicenses();
};



function populateTableWithLicenses(licenses) {
  const availableLicenses = document.getElementById("licenseTable");

  // Clear previous entries
  availableLicenses.innerHTML = '';

  licenses.forEach(license => {
    const tr = document.createElement("tr");
    tr.setAttribute('data-license-number', license.Number); // Set a data attribute on the row

    // Create and append other td elements for license data
    const td1 = document.createElement("td");
    td1.textContent = license.Number;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.textContent = license.Provider;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.textContent = license.Rent;
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.textContent = license.Cost;
    tr.appendChild(td4);

    // Create the delete button
    const deleteTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn'; // You can use this class to style the button
    deleteButton.onclick = function() {
      deleteLicense(license.Number, tr); // Pass the table row along with the license number
    };
    deleteTd.appendChild(deleteButton);

    // Append the delete button cell at the end of the row
    tr.appendChild(deleteTd);

    // Append the row to the table
    availableLicenses.appendChild(tr);
  });
}

function deleteLicense(licenseNumber, tableRow) {
  // Call the server to delete the license
  fetch(`http://127.0.0.1:9000/deleteLicense/${licenseNumber}`, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === 'License deleted successfully') {
          // Remove the row from the table if deletion was successful
          tableRow.remove();
      } else {
          console.error('Failed to delete the license', data);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
