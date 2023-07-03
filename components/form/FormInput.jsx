
export const FormInput = ({handleChange, value, title, placeholder}) => {
    return (
      <div className="rounded">
            <p className="text-zinc-700 capitalize">{title}</p>
           
              <input type="text" name={title} value={value} placeholder={placeholder} 
              onChange={handleChange}
              className=" w-full flex bg-white overflow-hidden p-2  border border-zinc-300 "/>
         
          </div>
    )
  }