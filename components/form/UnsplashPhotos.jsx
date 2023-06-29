import { useState, useEffect } from "react";

export const UnsplashPhotos = ({ postData, setPostData, pickedImg, setPickedImg }) => {
    const [img, setImg] = useState("");
    const [res, setRes] = useState([]);

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
   

  const fetchRequest = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${`frmqlCx2yivc5RryJ4GzzueIytBMtsSCjJqrYq4sc4A`}&per_page=20`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    console.log('UNSPLASH', result);
    setRes(result);
    setLoading(false)
  };

  const Submit = () => {
    setLoading(true)
    fetchRequest();
    setImg("");
  };
  
  const selectImage = (selected, picked) => {
    setPostData({...postData, selectedFile: selected})
    setShow(false)
    setPickedImg(picked)
  }
  return (
    <div>
   
    <div onClick={()=>setShow(true)}
    className="p-3 rounded-lg border-2 border-blue-500 cursor-pointer hover:border-blue-900 duration-300 " ><p> {pickedImg ? `> ${pickedImg}` : null}</p> <p>{!pickedImg ? `Find images online` : `Click to choose another image`}</p>
    </div>

    { show ? 
        <div className="flex justify-center items-center absolute z-50 top-0 left-0 p-4 h-full w-full  bg-gradient-to-r from-zinc-500">

            <div className="h-[80vh] w-[80vw] grid gap-3 p-4 bg-zinc-200 overflow-auto">

            {/* input data */}
            <div className=" flex flex-col sm:flex-row gap-2 sm:justify-center">
                
                <input
                className="p-1 h-10 sm:w-[500px] border overflow-hidden border-zinc-300 focus:outline-none"
                type="text"
                placeholder="Search Anything..."
                value={img}
                onChange={(e) => setImg(e.target.value)}
                />
                    <div className="flex gap-2 w-full">
                        <div
                        onClick={Submit}
                        className="bg-blue-500 h-10 w-full text-center sm:w-auto flex items-center text-white p-2 cursor-pointer"
                        >
                        Search
                        </div>
                        <div
                        onClick={()=>setShow(false)}
                        className="bg-red-500 text-white w-full items-center h-10 sm:w-auto text-center flex p-2 cursor-pointer"
                        >
                        Cancel
                        </div>
                    </div>
                   
            </div>

            {/* display images */}
            {
                loading ? (<div className="flex justify-center w-full">Loading data ... </div>) :
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                
                    {res?.map((val) => {
                    return (
                        <div  key={val?.id} className="h-60 w-full overflow-hidden cursor-pointer"
                        onClick={() => selectImage(val?.urls?.small, val?.alt_description)}>
                        <img
                            className="w-full h-full object-cover "
                            src={val?.urls?.small}
                            alt={val?.alt_description}
                        />
                        </div>
                    );
                    })}
             
            </div>
            }

                
            </div>
        </div> : null
    }
        
    </div>
    
  );
};
