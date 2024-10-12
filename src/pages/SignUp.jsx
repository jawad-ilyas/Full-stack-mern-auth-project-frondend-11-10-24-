import { Link, useNavigate } from "react-router-dom";
import { ConsoleValue } from "../utilis/ConsoleValues.utilis.js";
import Container from "../wrapper/Container"

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../features/Auth.Slice.js";
import { useEffect } from "react";
const SignUp = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(state => state.auth)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    dispatch(signUp(data))
    ConsoleValue(data)

  }
  useEffect(() => {
    if (isAuthenticated) {
      naviagte("/")
    }
  }, [dispatch, isAuthenticated])
  return (
    <Container >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-center py-4">Sign Up</h1>
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">

            <input
              className={`w-full rounded py-2 px-2 outline-none border ${errors?.name ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 transition-all duration-200`}
              type="text"

              {...register('name', { required: 'Name is a required field' })}
              placeholder="Enter Your Name"
            />

            {errors?.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
          </div>
          <div className="mb-4">
            <input
              className={`w-full rounded py-2 px-2 outline-none border  focus:border-blue-500 transition-all duration-200`}
              type="password"
              {...register('password', {
                required: 'Password is a required field',
              })}
              placeholder="Enter Your password"
            />
            {errors?.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
          </div>


          <div className="mb-4">
            <div className="relative">
              <input
                className={`w-full rounded py-2 px-2 outline-none border ${errors?.email ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 transition-all duration-200`}
                type="email"
                {...register('email', { required: 'Email is a required field' })}
                placeholder="Enter Your Email"
              />

            </div>
            {errors?.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
          </div>

          <button disabled={loading} className="bg-slate-700 w-full rounded-md py-3 text-white font-bold text-xl"> {loading ? "loading " : "Submit"} </button>
        </form>
        <div className="flex flex-row space-x-3 mt-4">
          <p>Have an account ?</p>
          <Link to="/signin" className="text-blue-400">Sign In</Link>
        </div>
        <p className="text-red-600 text-center mt-6 font-medium">{error && error}</p>
      </div>
    </Container>
  )
}

export default SignUp