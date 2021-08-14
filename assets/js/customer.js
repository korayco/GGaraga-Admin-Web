var firebaseConfig = {
    apiKey: "AIzaSyD4fSVtqcA5O_1cQUdCUMYENVW4EVRR8-o",
    authDomain: "ggarage-e5e1c.firebaseapp.com",
    projectId: "ggarage-e5e1c",
    storageBucket: "ggarage-e5e1c.appspot.com",
    messagingSenderId: "1098830181579",
    appId: "1:1098830181579:web:f1364b20bd8059589c974e"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();


class Customer {
    constructor(name, mail, phoneNumber, car) {
        this.name = name;
        this.mail = mail;
        this.phoneNumber = phoneNumber;
        this.car = car
    }
}
// Firestore data converter
customerConverter = {
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Customer(
            data.name,
            data.mail,
            data.phoneNumber,
            data.car
        )
    }
}

function eventListeners() {
    getAllCustomers()
}

eventListeners();


function getAllCustomers(){
    let customers = ""
    let customer = new Customer();
    db.collection("customers").withConverter(customerConverter).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            customer = doc.data();
            customers+=
            `
            <tr>        
                <td>${customer.name}</td>
                <td>${customer.mail}</td>
                <td>${customer.phoneNumber}</td>
                <td>${customer.car}</td>
            </tr>
            `
        });
        document.getElementById("getAllCustomers").innerHTML = customers;
    });
    console.log(customers)


}