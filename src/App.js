
import './App.css';
 import { useState , useEffect ,useMemo} from  'react' ;

import ReactPaginate from 'react-paginate';



function App() {


  const [users, setusers] = useState([]);

  useEffect(()=>{

        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data=>{
            setusers(data)
        })
    }) ;

    
   
  const usersPerPage = 5 ;
  // We start with an empty list of users.
  const [currentusers, setCurrentusers] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch users from another resources.
    const endOffset = itemOffset + usersPerPage;
    console.log(`Loading users from ${itemOffset} to ${endOffset}`);
    { users && setCurrentusers(users.slice(itemOffset, endOffset));}
    setPageCount(Math.ceil(users.length / usersPerPage));
  }, [itemOffset, usersPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * usersPerPage) % users.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };  

    const [pageNumber, setPageNumber]= useState(1)
    const currentPageNumber = (pageNumber * usersPerPage) - usersPerPage 
    const paginatedPosts = users.splice(currentPageNumber, usersPerPage)

 
 const handlePrev =()=>{
        if(pageNumber === 1) return
        setPageNumber(pageNumber - 1)
    }
    const handleNext =()=>{
        setPageNumber(pageNumber + 1)
    }
 

  // Change page
  //const paginate = pageNumber => setCurrentPage(pageNumber);


    //const handlePrev =()=>{
    //   if(pageNumber === 1) return
     //   setPageNumber(pageNumber - 1)
    //}
    //const handleNext =()=>{
    //    setPageNumber(pageNumber + 1)
    //}

    
    return (
       
      <>
        <div>
           <div>
        
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
           {paginatedPosts && paginatedPosts.map(item => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.name}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
      <section className="pagination">
        <button className="first-page-btn">first</button>
        <button onClick={handlePrev}  className="previous-page-btn">previous</button>
        <button onClick={handleNext}  className="next-page-btn">next</button>
        <button className="last-page-btn">last</button>
      </section>
    </div>

      
      </>
      
    );
}export default App;
