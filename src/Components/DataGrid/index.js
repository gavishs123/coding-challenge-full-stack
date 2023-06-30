import * as React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from "axios";
import './style.css'

const DataTable=()=> {
    const [images,setImages]=React.useState([])    
    const [searchData,setSearchData]=React.useState('')    
    const [typingTimeout, setTypingTimeout] = React.useState(0);

    // Create function for api call
    const ImageData = async() =>{
        let baseURL= "http://localhost:3001/api/list" ;
        try {
            let response = await axios.get(`${baseURL}?tags=${searchData}`);
            setImages(response?.data?.data)
        } catch (error) {
            console.log(error); 
        }
    }

    // It will call the api on searchData
    React.useEffect(()=>{
        ImageData()
    },[searchData])

    // Create for the debounced api
    const sendToParent = (searchText) => {
        setSearchData(searchText)
    };

    // Set the search input value
    const handleChange = (e) =>{
       let filterData= e.target.value;
       if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingTimeout(setTimeout(() => sendToParent(filterData), 500));
    }

    return (
    <>
    <Box className='searchBox'>
        <TextField 
        id="standard-basic" 
        label="Search by tag" 
        variant="standard"
        onChange={(e)=>handleChange(e)}
        />
    </Box>        
    <Box className='datatable'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>  
            <TableCell>Description</TableCell>  
            <TableCell>Feed Images</TableCell>  
          </TableRow>
        </TableHead>
        <TableBody>
        {images.length>0 ? // Set condition for no data found.
          // Iterates the data from array got from API
          images.map((data,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data?.title!==' ' ? data?.title: 'N/A'}
              </TableCell>
              <TableCell component="th" scope="row">
                <Box 
                dangerouslySetInnerHTML={{__html: data?.description}}
                />
              </TableCell>
              <TableCell component="th" scope="row">
              <img className='feed_image' src={`${data?.media?.m}`} alt={"No Image"} />                
              </TableCell>
            </TableRow>
          ))
        : 
         <TableCell className='no_data'>No Data Found!</TableCell>}
        </TableBody>
          </Table>
        </TableContainer>
    </Box>
    </>
  );
}

export default DataTable