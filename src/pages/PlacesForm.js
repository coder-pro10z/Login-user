import PhotoUploader from "../PhotoUploader";
import Perks from "../Perks";
import { useState ,useEffect} from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate ,useParams } from "react-router-dom";
export default function PlacesForm(){


    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIN, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect,setRedirect]=useState(false);
    const [price,setPrice]=useState(400);

    useEffect(()=>{
        if(!id){
            return;
        }
   
        axios.get('/places/' + id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address)
        setAddedPhotos(data.photos)
        setDescription(data.description)
        setPerks(data.perks)
        setExtraInfo(data.extraInfo)
        setCheckOut(data.checkOut)
        setCheckIn(data.checkIN)
        setMaxGuests(data.maxGuests)
        setPrice(data.price)

    })
    },[id])



    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4" >{text}</h2>
        )
    }


    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }


    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData ={title ,address ,addedPhotos ,
                         description ,perks ,extraInfo ,
                            checkIN ,checkOut ,maxGuests,price ,}
                            //we might add try catch error in this block so that error might resolve
        if(id){
            //update
            try{

                await axios.put('/places',{id, ...placeData});
            }
            catch(err){
                console.log( err);
            }
            setRedirect(true);
             }
        else{
            //new place
            await axios.post('/places',placeData);
            setRedirect(true);
             }
        
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }


    return(
        <div>
            <AccountNav/>
        <form onSubmit={savePlace}>
            {preInput('Title', 'Title for Your Place. should be short and precise for advertisement')}
            <input className="inline-flex border-2 border-gray-300 rounded-md w-100 min-w-full mt-1 p-1" type="text" value={title}
                onChange={ev => setTitle(ev.target.value)} placeholder=" Title, For Example: My Lovely Apartment" />

            {preInput('Address', 'Address to your Place that is going on rent ')}


            <input type="text" className='inline-flex border-2 border-gray-300 rounded-md w-100 min-w-full mt-1 p-1'
                value={address}
                onChange={ev => setAddress(ev.target.value)} placeholder=" Address" />
            
            
            {preInput('Photos', 'The more the better')}

{/*there was thge photo grid section later to transfer in the later parts*/}
<PhotoUploader addedPhotos={addedPhotos
} onChange={setAddedPhotos}/>

            {preInput('Description', 'Description for Your Place. should be short and precise for advertisement ')}


            <textarea className="border-2 border-gray-300 rounded-md p-8 w-80 mt-2" value={description}
                onChange={ev => setDescription(ev.target.value)}></textarea>

            {/* Perks */}

            {preInput('Perks', 'Select all the perks of your place')}

            <div className="grid  grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks selected={perks} onChange={setPerks} />
            </div>
            {/* Extra Info  */}
            {preInput('Extra Info', 'House Rules, etc')}

            <textarea className="border-2 border-gray-300 rounded-md w-80 p-8 " value={extraInfo}
                onChange={ev => setExtraInfo(ev.target.value)} />
            {preInput('Check IN & Out times ', 'Select all the perks of your place')}


            <div className="mt-2 grid sm:grid-cols-3 items-center text-center ">
                <div >
                    <h3>Check in time</h3>
                    <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='text' value={checkIN}
                        onChange={ev => setCheckIn(ev.target.value)}
                        placeholder="14:00"></input>
                </div>

                <div>
                    <h3>Check out time</h3>
        
                    <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='text' value={checkOut}
                        onChange={ev => setCheckOut(ev.target.value)}
                        placeholder="18:00"></input>
                </div>

                <div>
                    <h3>Max no. of Guests</h3>
                    <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='number'
                        value={maxGuests}
                        onChange={ev => setMaxGuests(ev.target.value)} placeholder="2"></input>
                </div>
                <div>
                    <h3>Price per night</h3>
                    <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='number'
                        value={price}
                        onChange={ev => setPrice(ev.target.value)} ></input>
                </div>

            </div>

            <div>
                <button className="primary mt-4">Save</button>
            </div>

  
        </form>
    </div>

    );
}