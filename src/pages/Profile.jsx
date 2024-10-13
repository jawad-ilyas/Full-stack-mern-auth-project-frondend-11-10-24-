import { ConsoleValue } from "../utilis/ConsoleValues.utilis.js";
import Container from "../wrapper/Container"

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { logout } from "../features/Auth.Slice.js";
import { fireBaseapp } from "../firebase.js";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
const Profile = () => {
  const dispatch = useDispatch();

  const profileRef = useRef(null)
  const [imagePer, setImagePer] = useState(0);
  const { error, loading, currentUser } = useSelector(state => state.auth)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [imageUrl, setImageUrl] = useState();
  const onSubmit = async (data) => {
    ConsoleValue(data)

  }

  useEffect(() => {
    setValue("email", currentUser?.rest?.email)
    setValue("name", currentUser?.rest?.name)
  }, [])

  const [image, setImage] = useState(undefined)
  const handleSignOut = () => {
    dispatch(logout())
  }
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image])
  const handleFileUpload = async (image) => {
    console.log(image);

    const storage = getStorage(fireBaseapp);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImagePer(Math.round(progress)); // Update progress state
      },
      (error) => {
        // Handle unsuccessful uploads (error callback)
        console.log("Upload failed:", error);
      },
      () => {
        // Handle successful uploads on complete (complete callback)
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL, "downloadURL");
          setImageUrl(downloadURL); // Set the download URL in your state
        });
      }
    );
  };

  return (
    <Container >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-center py-4">Profile </h1>
        {
          currentUser?.rest?.photoURL ? (
            <>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" className="hidden" ref={profileRef} accept="image/*" />
              <img onClick={() => profileRef.current.click()} className="size-16 mx-auto mb-4 rounded-full object-cover" src={imageUrl ? imageUrl : currentUser?.rest?.photoURL} alt="User Profile" />
            </>
          ) : (
            "Profile"
          )
        }
        <p className={`${imagePer === 100 ? "hidden" : ""} text-center my-2`}>  {(imagePer !== 0) ? "image upload " + imagePer + "%" : ""} </p>
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>

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