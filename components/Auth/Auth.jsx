import {useState, } from 'react'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth.js';
import { useRouter } from 'next/router';


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
          alert('Password does not match')
        } else {
          dispatch(signup(input, navigateTo));

        }

      } else {
        dispatch(signin(input, navigateTo));
        // console.log('signIn', input)
      }
      
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  const googleError = (error) => console.log(error, 'Google Sign In was unsuccessful. Try again'  ) 

  return (
    <div className='section-padding flex min-h-[80vh] justify-center items-center'>

      <div className='py-10'>
        <h3 className='text-xl font-semibold pb-4 text-center'>{isSignup ? 'Signup' : 'Login'}</h3>
             

      <div className='border border-zinc-300 max-w-[450px] rounded p-3'>
        
      
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

      
        <button type='submit' className='w-full bg-blue-500 p-2 text-center rounded'>
          {'Submit'}
        </button>
        
        </form>
        
        <div className='w-full text-center bg-red-500 rounded p-2'>
        <GoogleLogin
            clientId={process.env.GOOGLE_ID}
            render={(renderProps) => (
              <button className='' 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled} >
                 {isSignup ? 'Signup with Google' : 'Signin with Google'}
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
         
        </div>
        
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
          <div className="flex-1 bg-white w-full overflow-hidden py-3 px-4 border border-zinc-300 flex">
            <input type={name==='password' ? (showPassword ? 'text' : type) : type} name={name} value={value} placeholder={placeholder} 
            onChange={handleChange}
            className="w-full flex-1"/>
            {name==='password'  ? <div className="font-bold text-sm" onClick={() => setShowPassword(!showPassword)}>
              <p>{showPassword ? '<>' : 'x'}</p>
            </div> : null}
          </div>
        </div>
  )
}