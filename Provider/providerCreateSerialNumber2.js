class Message {
    constructor(newSerialNumber, newProvider, newExpiryDate, newPrice) {
        this.newSerialNumber = newSerialNumber;
        this.newProvider = newProvider;
        this.newExpiryDate = newExpiryDate;
        this.newPrice = newPrice;
    }
}


function createNewLicense() {
    var newSerialNumber = document.getElementById("serialNumbertoBeCreated").value;
    var newProvider = document.getElementById("provider").value;
    var newExpiryDate = document.getElementById("rentLength").value;
    var newPrice = document.getElementById("price").value;
alert("worked");
    var url = "http://127.0.0.1:9000/license";
    
    
    var message = new Message(newSerialNumber, newProvider, newExpiryDate, newPrice);
console.log(JSON.stringify({ message: message }))
    fetch(url, {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // You can do something with the response data here
    })
    
    .catch(error => {
        console.error('Error', error);

       
    });



 
      
}
