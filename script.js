let attendeeData;
const prodHostUrl = "https://wedding-list-theta.vercel.app";
const localHostUrl = "http://127.0.0.1:5501"


const tableElement = document.getElementById('attendee-table');

const tableHead = `
    <tr>
        <th>S/N.</th>
        <th scope="col">Names.</th>
        <th scope="col">Number.</th>
        <th scope="col">Method of Invitation.</th>
    </tr>
`

const loopResult = (data) => {
    const tableDataMapped = data.map((element, key) => {
        return (`
            <tr>
                <td scope="row">${key}.</td>
                <td>${element.name}.</td> 
                <td>${element.members}.</td>
                <td>${element.methodOfInvitation}.</td>  
            </tr>
        `)
    });

    let countedMember = 0;
    const totalMembers = data.map((element) =>{
       countedMember = countedMember + element.members
    });

    const countColumn = `
        <tr>
            <td scope="row">${data.length}</td>
            <td>Total:</td> 
            <td>${countedMember}</td>
            <td>-</td>  
        </tr>
    `
    tableElement.innerHTML=`${tableHead}${tableDataMapped}${countColumn}`;
    console.log(countedMember);
}

const getData = () => {
    fetch(`${localHostUrl}/attendance.json`)
        .then(async (data) => {
            attendeeData = await data.json();
            loopResult(attendeeData);
        }).catch((err) => {
            console.log(err);
        });
}
getData();git 
function inputFunction() {
    var userInput =
document.getElementById("input-field").value;
    console.log(userInput);
}