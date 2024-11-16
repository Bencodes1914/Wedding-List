let attendeeData = [];
const prodHostUrl = 'https://wedding-list-theta.vercel.app';
const localHostUrl = 'http://127.0.0.1:5500';

const tableElement = document.getElementById('attendee-table');

const tableHead = `
    <tr>
        <th scope="col">Names.</th>
        <th scope="col">Number.</th>
        <th scope="col">Method of Invitation.</th>
        <th scope="col">Invite Sent.</th>
    </tr>
`;

const confirmSVG = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M20 6 9 17l-5-5"></path>
    </svg>
`;

const rejectSVG = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
    >
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
    </svg>
`;

const loopResult = (data) => {
  const tableDataMapped = data.map((element, key) => {
    return `
            <tr>
                <td>${element.name}</td> 
                <td>${element.members}</td>
                <td>${element.methodOfInvitation}</td>
                <td>${element.hasBeenInvited}</td>
            </tr>
        `;
  });

  let countedMember = 0;

  const totalMembers = data.map((element) => {
    countedMember = countedMember + element.members;
  });

  const totalInvited = data.filter(
    (invitees) => invitees.hasBeenInvited == true
  );

  const countColumn = `
        <tr>
            <td>Total:</td> 
            <td scope="row">${data.length} Families</td>
            <td>${countedMember} Individuals</td>
            <td>${totalInvited.length}</td>
        </tr>
    `;
  tableElement.innerHTML = `${tableHead}${tableDataMapped}${countColumn}`;
};

const getData = () => {
  fetch(`${prodHostUrl}/attendance.json`)
    .then(async (data) => {
      attendeeData = await data.json();
      loopResult(attendeeData);
    })
    .catch((err) => {
      console.log(err);
    });
};
getData();

const userInput = document.getElementById('input-field');

function inputFunction() {
  const inputValue = userInput.value;
  console.log(inputValue);
  const filteredData =
    inputValue.trim() == ''
      ? attendeeData
      : attendeeData.filter((invitee) =>
          invitee.name.toLowerCase().includes(inputValue.toLowerCase())
        );

  loopResult(filteredData);

  console.log(userInput.value);
}

userInput.addEventListener('change', inputFunction);
