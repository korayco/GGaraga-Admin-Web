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

class Appointment {
    constructor(mechanic, service, status, date, comments) {
        this.mechanic = mechanic;
        this.service = service;
        this.status = status;
        this.date = date;
        this.comments = comments;
    }
}
// Firestore data converter
appointmentConverter = {
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Appointment(
            data.mechanic,
            data.service,
            data.status,
            data.date,
            data.comments
        )
    }
}

function eventListeners() {
    getAllApointments()
}

eventListeners();



function getAllApointments(){
    let apps = ""
    let a = new Appointment();
    db.collection("appointments").withConverter(appointmentConverter).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            a = doc.data();
            apps+=
            `
            <tr>        
                <td>${a.service}</td>
                <td>${a.date}</td>
                <td>${a.status}</td>
                <td>${a.comments}</td>
            </tr>
            `
        });
        document.getElementById("getAllApointments").innerHTML = apps;
    });
    console.log(customers)
        
}