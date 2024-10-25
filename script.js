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
                <td>${element.Number}.</td>
                <td>${element.methodOfInvitation}.</td>  
            </tr>
        `)
    });
    tableElement.innerHTML=`${tableHead}${tableDataMapped}`;
    console.log(tableDataMapped);
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