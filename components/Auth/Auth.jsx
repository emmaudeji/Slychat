import {useState, } from 'react'
// import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth.js';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export const Auth = () => {
  const dispatch = useDispatch()
  const navigateTo = useRouter()

  const [input, setInput] = useState({
    fName: '', lName: '', email: '', password: '', repassword: '',
  })
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    try {
      if (isSignup) {
        
        if(input.password !== input.repassword) {
          toast.error('Password does not match')
        } else {
          dispatch(signup(input, navigateTo));
        }

      } else {
        try {
          dispatch(signin(input, navigateTo));
        } catch (error) {
          // console.log('ERRRRRRRRRR', error);
        }
        // console.log('signIn', input)
      }
      
    } catch (error) {
      // console.log('ERRRRRRRRRR', error);
    }

  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInput(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }
  })
  }

  const switchHandle = () => {
    setIsSignup(prev => !prev)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    // console.log(res)
    try {
      dispatch({ type: AUTH, data: { result, token } });
      // console.log('result', result, 'token--', token)
      history.push('/');
    } catch (error) {
      console.log('GOOOOLE ERRORR', error);
    }
  };

  const googleError = (error) => console.log(error, 'Google Sign In was unsuccessful. Try again'  ) 

  return (
    <div className='section-padding flex min-h-[80vh] justify-center items-center'>

      <div className='py-10'>
        <h3 className='text-xl font-semibold pb-4 text-center'>{isSignup ? 'Signup' : 'Login'}</h3>
             

      <div className='border border-zinc-300 max-w-[450px] rounded p-3'>
        
      <Toaster/>
       <form onSubmit={handleSubmit} className='grid gap-2 pb-4'>
        {isSignup && <div className='flex gap-2
        '> 
          <AuthInput type='text' handleChange={handleChange} name={'fName'} value={input.fName} title={'Firstname'} placeholder={''}/>
          <AuthInput  type='text' handleChange={handleChange} name={'lName'} value={input.lName} title={'Lastname'} placeholder={''}/>
        </div>}
        <div className='grid gap-2'>
          <AuthInput  type='email' handleChange={handleChange} name={'email'} value={input.email} title={'Email'} placeholder={''}/>
          <AuthInput  type='password' handleChange={handleChange} name={'password'} value={input.password} title={'Password'} placeholder={''} showPassword={showPassword} setShowPassword={setShowPassword}/>
          {isSignup && <AuthInput  type='password' handleChange={handleChange} name={'repassword'} value={input.repassword} title={'Repeat Password'} placeholder={''} howPassword={showPassword} setShowPassword={setShowPassword}/>}
        </div>

      
        <button type='submit' className='w-full bg-blue-500 p-2  cursor-pointer text-center text-white hover:bg-blue-800 duration-300 rounded'>
          {'Submit'}
        </button>
        
        </form>
        
        {/* <div className='w-full text-center bg-red-500 hover:bg-red-700 cursor-pointer duration-300 rounded p-2 text-white'>
        <GoogleLogin
            clientId={process.env.GOOGLE_ID}
            render={(renderProps) => (
              <button className='' 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled} >
                 {'Continue with Google'}
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
         
        </div> */}
        
        </div>

       <button onClick={switchHandle}
        className='w-full p-2 text-center rounded hover:scale-110 duration-300'>
          {isSignup ? 'Alredy registered? Sign in' : 'Not registered? Register Here'}
        </button>
      </div>
    </div>
  )
}


export const AuthInput = ({handleChange, type, value, name, title, placeholder, showPassword, setShowPassword}) => {
  return (
    <div className="flex-1 rounded">
          <p className="text-zinc-700 capitalize">{title}</p>
          <div className=" bg-white w-full overflow-hidden p-2 border border-zinc-300 flex items-center">
            <input type={name==='password' ? (showPassword ? 'text' : type) : type} name={name} value={value} placeholder={placeholder} 
            onChange={handleChange}
            className="w-full focus:outline-none"/>
            {name==='password'  ? <div className="font-bold text-sm" onClick={() => setShowPassword(!showPassword)}>
              <p className='cursor-pointer text-zinc-500'>{showPassword ?<FaEyeSlash /> : <FaEye />}</p>
            </div> : null}
          </div>
        </div>
  )
}