import Header from "../Components/Header";
//import OptionBar from "../Components/OptionBar";
import SearchThreads from "../Components/SearchThreads";
//import ThreadContent from "../Components/SearchThreads"


function Search() {
  console.log(`App`)

  /*async function getUserData(token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads?order_by=recent&filter_by=all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }
    return response.json();
  }*/

  return (
    <div className="theme--dark" data-controller="kbin notifications" data-turbo="false">
      <Header/>
      <SearchThreads/>
    </div>
  );
}

export default Search;