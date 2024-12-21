import React from "react";
/* import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; */
function CustomInput({type, placeholder, name, value, onChange , /* togglePassword,showPassword */}){
    return(
        <div className="reltive">
            <input
        type ={type}
        placeholder={placeholder}
        name={name}
        value ={value}
        onChange ={onChange}
        className=" border-0 border-b-2 w-full px-0 
        py-2 text-[0.9rem] outline-none opacity-100 transition-all 
        duration-[0.2s] placeholder:text-gray-500 "
        />
        {/* {
            togglePassword && ( <span className="absolute top-96 right-96 cursor-pointer" onClick={showPassword}>
                {type === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
       
)
        } */}
        </div>
        
        
    )
}

export default CustomInput;