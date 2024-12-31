import React from 'react';

import SignupSignInComponent from "../components/SignupSignInComponent";

function SignupSignIn() {
  return (
    <div>
      <div className='flex justify-center items-center h-[80vh] w-[100vw] md:h-[90vh] pt-28 md:pt-0 '> 
        <SignupSignInComponent/>
      </div>
    </div>
  )
}

export default SignupSignIn