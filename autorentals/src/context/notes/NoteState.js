import NoteContext from "./noteContext";
import { useState , useEffect } from "react";

const NoteState = (props) => {
  
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const bookinInitial = []
  const[bookings,setbookings] = useState(bookinInitial)
  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`http://localhost:5000/api/rent/fetchallcars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      }
    });
    const json = await response.json() 
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (name, description, cost , photo ) => {
    const response = await fetch(`http://localhost:5000/api/rent/addcar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({name, description, cost , photo })
    });

    const note = await response.json();
    console.log(note)
    setNotes(notes.concat(note))
    console.log(notes) 
  }

  // Delete a Note
  const deleteNote=async(id)=>{
    // //API CALLS - backend
        const response = await fetch(`http://localhost:5000/api/rent/deletecar/${id}`, {
            method: "DELETE", 
            headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
            },
            
        });
        const json = await response.json();
        console.log(json)

        
        console.log("Deleting the node with id"+id)
        //those element notes will stay whose id is not equal to the parameter id.
        const newNotes = notes.filter((note)=>{return note._id!==id})
        console.log(newNotes)
        setNotes(newNotes)
        console.log(notes)
   }
  // Edit a Note
  const editNote = async (id, name, description, cost, photo) => {
    // API Call 
    const response = await fetch(`http://localhost:5000/api/rent/updatecar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ name, description, cost, photo })
    });
    const json = await response.json();
  
    let newNotes = [...notes]; // Create a copy of the notes array
  
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      
      if (element._id === id) {
        newNotes[index].name = name;
        newNotes[index].description = description;
        newNotes[index].cost = cost;
        newNotes[index].photo = photo;
        break;
      }
    }
  
    setNotes(newNotes);
  }

  

  const getallbookings = async () => {
    const token = localStorage.getItem('token');
  
    const response = await fetch('http://localhost:5000/api/Bookingsroute/bookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
    });
    
    const json = await response.json();
    
    setbookings(json);
    
  };
  
  
  

  const getbookings = async(bookeduser,car_id,mobileNumber,startDate,  endDate , carname ,carcost,carphoto) => {
    const response = await fetch ('http://localhost:5000/api/Bookingsroute/bookcar', {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
           "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({bookeduser,car_id,mobileNumber,startDate,  endDate , carname ,carcost,carphoto})
    });
    const bookingcars = await response.json();
    setbookings(bookings.concat(bookingcars))
  }

  
  
  
  return (
    <NoteContext.Provider value={{ notes, bookings, addNote, deleteNote, editNote, getNotes , getbookings,  getallbookings}}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;