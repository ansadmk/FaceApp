import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { app } from './lib/firebaseConfig';
import axios from 'axios'
function App() {
  const [imageUpload, setImageUpload] = useState(null);
  console.log(imageUpload);
  const [data, saveData] = useState(null);
  console.log(data);
 const storage = getStorage(app);

  const uploadFile = (e) => {
e.preventDefault()
    if (imageUpload === null) {
      toastifyError("Please select an image");
      return;
    }
    const imageRef = storageRef(storage, `pics/${Date.now()}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async(imageurl) => {
           const res= await axios.post('http://localhost:8080/api/age',{imageurl})
           saveData(res.data.data)
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        toastifyError(error.message);
      });
  };
  return (
    <>
      <form action="" onSubmit={uploadFile} className='h-screen w-screen flex items-center flex-col gap-10 justify-center'>
      {/* <input
  label="Image"
  placeholder="Choose image"
  accept="image/png,image/jpeg"
  type="file"
  onChange={(e) => {
    setImageUpload(e.target.files[0]);
  }}
/>
<input type="submit" value="submit" /> */}

      
      <div className="input-div  flex items-center justify-center">
  <input 
  className="input" 
  label="Image"
  placeholder="Choose image"
  accept="image/png,image/jpeg"
  type="file"
  onChange={(e) => {
    setImageUpload(e.target.files[0]);
  }}
 />
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" className="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
</div>
<input type="submit" value="submit" className=' bg-black p-5 rounded-lg cursor-pointer'/>
{data ? <img src={data } alt="" height={256} width={256}/>: imageUpload ?
<img src={URL.createObjectURL(imageUpload) } alt="" height={256} width={256}/>:null} 
</form>
    </>
  )
}

export default App
