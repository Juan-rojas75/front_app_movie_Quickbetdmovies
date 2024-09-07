"use client";
import Image from "next/image";
import React, { useState, FormEvent, useRef } from "react";
// import { useRouter } from 'next/router'
import { setToken, setUser } from "../../lib/store/store";
import { useDispatch } from "react-redux";

const urlApi_ = "https://backend-app-movie-quickbetdmovies.onrender.com"
// const urlApi_ = "http://localhost:4000"

export default function Loginmodal({ isOpen, onClose }) {
  const [selected, setSelected] = useState("login"); 
  // const router = useRouter()
  const dispatch = useDispatch();

  const formSignup = useRef(null);
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState(''); 

  // Método para enviar el formulario de login
  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`${urlApi_}/api/v1/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });
    
    // Manejar la respuesta de la API
    if (response.ok) {
      const data = await response.json();
       // Despachar el token a Redux
      dispatch(setToken(data.access_token)); // Usa el token recibido
      dispatch(setUser(formData.get("username")));
      // router.push('/home/populares')
      window.location.href = '/home/populares'
    } else {
      console.error("Login failed");
      // Mostrar un mensaje de error al usuario
    }
  }

  // Método para enviar el formulario de registro
  async function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch(`${urlApi_}/api/v1/auth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("usernameSign"),
        email: formData.get("emailSign"),
        password: formData.get("passwordSign"),
        status:"ACTIVE"
      }),
    });

    // Manejar la respuesta de la API
    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful:", data);
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
      formSignup.current.reset();
      setMessage('Registration successful!'); // Mensaje de éxito
      setMessageType('success'); // Tipo de mensaje
    } else {
      console.error("Registration failed");
      // Mostrar un mensaje de error al usuario
      setMessage('Registration failed. Please try again.'); // Mensaje de error
      setMessageType('error'); // Tipo de mensaje
    }
  }
  if (!isOpen) return null;
  return (
    <>
      <section className="fixed z-50 w-full flex flex-row mx-10 justify-center">
        <article className="flex flex-row gap-1 justify-between w-lg h-max backdrop-blur-xl pt-2">
          <div className="py-5 px-16">
            <div className="w-full text-white">
              <button onClick={onClose} className="flex flex-row justify-center items-center gap-1">
                <div className="rounded-full border border-white w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"
                    />
                  </svg>
                </div>
                <span className="font-semibold">Back</span>
              </button>
            </div>
            {/* Selector */}
            <div className="flex flex-row justify-center w-full my-20">
              <div className="flex space-x-2 bg-gray-800 rounded-xl">
                <button
                  onClick={() => setSelected("signup")}
                  className={`px-4 py-2 rounded-xl font-semibold ${
                    selected === "signup"
                      ? "bg-[#F0B90B] text-white"
                      : "bg-transparent text-white"
                  }`}
                >
                  Sign up
                </button>
                <button
                  onClick={() => setSelected("login")}
                  className={`px-4 py-2 rounded-xl font-semibold ${
                    selected === "login"
                      ? "bg-[#F0B90B] text-white"
                      : "bg-transparent text-white"
                  }`}
                >
                  Log In
                </button>
              </div>
            </div>
            {/* Forms */}
            {selected === "login" ? (
              <form onSubmit={submitLogin} className="flex flex-col gap-5 my-10 w-sm">
                <h1 className="text-sm text-white w-full text-center">We love having you back</h1>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="outline-none w-full px-4 py-2"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="outline-none w-full px-4 py-2"
                />
                <button type="submit" className="bg-[#F0B90B] w-full px-4 py-2">
                  Continue
                </button>
                <span className="text-xs text-white w-full text-center">
                  For any questions, reach out to support@Quickbetdmovies.com
                </span>
              </form>
            ) : (
              <form ref={formSignup} onSubmit={submitRegister} className="flex flex-col gap-5 my-10 w-sm">
                <input
                  type="text"
                  name="usernameSign"
                  id="usernameSign"
                  placeholder="Username"
                  className="outline-none w-full px-4 py-2"
                />
                <input
                  type="text"
                  name="emailSign"
                  id="emailSign"
                  placeholder="Email"
                  className="outline-none w-full px-4 py-2"
                />
                <input
                  type="password"
                  name="passwordSign"
                  id="passwordSign"
                  placeholder="Password"
                  className="outline-none w-full px-4 py-2"
                />
                <button type="submit" className="bg-[#F0B90B] w-full px-4 py-2">
                  Register
                </button>
                {message && (
                  <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" style={{ 
                    marginTop: '10px', 
                    color: messageType === 'success' ? 'white' : 'white',
                    background: messageType === 'success' ? 'green' : 'red' 
                  }}>
                    {message}
                  </div>
                )}
              </form>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-4 pt-8 px-10 bg-[#1C1C1C] text-white rounded-lg ">
            <h1 className="font-bold text-2xl max-w-sm text-wrap">
              {selected === "login"
                ? "Welcome back to Quickbet Movies!"
                : "Welcome to Quickbet Movies!"}
            </h1>
            <p className="font-light text-xl max-w-md text-wrap">
              {selected === "login"
                ? "🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!"
                : "🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!"}
            </p>
            {selected === "login" ? (
              <Image
                src={"/images/Login.png"}
                alt="Login"
                width={400}
                height={609}
              />
            ) : (
              <Image
                src={"/images/SignUp.png"}
                alt="SignUp"
                width={400}
                height={609}
              />
            )}
          </div>
        </article>
      </section>
    </>
  );
}
