
window.onload = function() {
    retrieveLicenses();
};

async function retrieveLicenses() {
    try {
        const response = await fetch("http://127.0.0.1:9000/getLicenses");
        const data = await response.json();


    

        // Checking if 'data.licenses' is an array before proceeding
        if (!Array.isArray(data.licenses)) {
            console.error('Received data is not an array:', data.licenses);
            return; // Exit the function if data.licenses is not an array
        }

        const availableLicenses = document.getElementById("licenseTable");

        data.licenses.forEach(license => {
            const tr = document.createElement("tr");
            tr.className = 'tableRow';

            const td1 = document.createElement("td");
            td1.textContent = license.Number;

            const td2 = document.createElement("td");
            td2.textContent = license.Provider;

            const td3 = document.createElement("td");
            td3.textContent = license.Rent;

            const td4 = document.createElement("td");
            td4.textContent = license.Cost;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            availableLicenses.appendChild(tr);
            populateTableWithLicenses(data.licenses); // this is the line for the delete button 
        });
    } catch (error) {
        console.error('Error:', error);
    }

   
      
}
