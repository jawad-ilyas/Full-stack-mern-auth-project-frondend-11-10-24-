import { ConsoleValue } from "../utilis/ConsoleValues.utilis.js";
import Container from "../wrapper/Container"

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../features/Auth.Slice.js";
const Profile = () => {
  const dispatch = useDispatch();


  const { error, loading, currentUser
  } = useSelector(state => state.auth)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    ConsoleValue(data)

  }

  useEffect(() => {
    setValue("email", currentUser?.rest?.email)
    setValue("name", currentUser?.rest?.name)
  }, [])


  const handleSignOut = () => {
    dispatch(logout())
  }
  return (
    <Container >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-center py-4">Profile </h1>
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {
            currentUser?.rest?.photoURL ? (
              <>
                <img className="size-16 mx-auto mb-4 rounded-full" src={currentUser?.rest?.photoURL} alt="User Profile" />
              </>
            ) : (
              "Profile"
            )
          }


          <div className="mb-4">

            <input
              className={`w-full rounded py-2 px-2 outline-none border  focus:border-blue-500 transition-all duration-200`}
              type="text"
              {...register('name', {
                required: 'Name is a required field',
              })}
              placeholder="Enter Your Name"
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

          <button disabled={loading} className="bg-slate-700 w-full rounded-md py-3 text-white font-bold text-xl"> {loading ? "loading " : "UPDATE"} </button>

        </form>
        <div className="flex flex-row justify-between">
          <p className="text-red-600 text-center mt-6 font-medium">Delete Account</p>
          <p className="text-red-600 text-center mt-6 font-medium cursor-grab" onClick={handleSignOut}>Sign Out</p>
        </div>
        <p className="text-red-600 text-center mt-6 font-medium">{error && error}</p>
      </div>
    </Container>
  )
}

export default Profile