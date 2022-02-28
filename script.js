//1. fetch 20 random user on page load
//2. filter user by gender
//3. filter user by name

const apiUrl = "https://randomuser.me/api/?";

//4
const listElm = document.querySelector("#user-list");
const courterElm = document.querySelector("#user-count");

//11
let usrArgs = []; //global array so we can use the data we already have

//3
const displayUsers = (users) => {
  let str = "";
  users.map((user) => {
    // console.log(user);
    str += `
    <div class="col-md-6 col-lg-3 py-2 ">
     <div class="card fs-5 ">
        <img src="${user.picture.large}" class="card-img-top" alt="..." />

        <h4 class="text-center mt-3 ">
        ${user.name.title} ${user.name.first} ${user.name.last}
        </h4>

        <div class="card-body">

        <div>
        <span><i class="fa-solid fa-mobile-screen-button"></i></span> ${user.cell}
        </div>

         <div>
        <span>
        <i class="fa-solid fa-location-dot"></i></span> ${user.location.city}, ${user.location.country}
        </div>

        <div>
        <span><i class="fa-solid fa-envelope"></i></span>${user.email}
        </div>

       

     </div>
     </div>
    </div>
`;
  });

  listElm.innerHTML = str;
  courterElm.innerHTML = users.length;
};

//1111
const fetchUser = (params = "results=20") => {
  //fetch from api
  fetch(apiUrl + params)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);

      //14 change users to the usrArgs
      usrArgs = data.results; //2 get users info
      //5

      displayUsers(usrArgs);
    })
    .catch((error) => console.log(error));
};
fetchUser();

// for dorpdown menu change
const handleOnChange = (e) => {
  //console.log(e.value);
  const params = `results=20&gender=${e.value}`;
  fetchUser(params);
};

//10?
const handleOnSearch = (e) => {
  //13
  const str = e.value.toLowerCase();
  //12
  const filteredArgs = usrArgs.filter((item) => {
    const userFullName = (item.name.first + "" + item.name.last).toLowerCase();
    if (userFullName.includes(str)) {
      return item;
    }
  });
  displayUsers(filteredArgs);
};
