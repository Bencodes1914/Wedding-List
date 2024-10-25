let attendeeData;

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
    fetch('https://wedding-list-theta.vercel.app/attendance.json')
        .then(async (data) => {
            attendeeData = await data.json();
            loopResult(attendeeData);
        }).catch((err) => {
            console.log(err);
        });
}
getData();