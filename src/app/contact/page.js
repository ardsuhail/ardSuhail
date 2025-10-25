"use client";
import React from "react";
import { FiMail, FiSend } from "react-icons/fi";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

const Contact = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    message: ""
  })
 const [loading, setLoading] = useState(false)
 const [message, setmessage] = useState(null)
 const [error, seterror] = useState(null)
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name":form.name ,
      "email":form.email ,
      "message": form.message
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/contact", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.success){
          setLoading(false)
          setform({
            name:"",
            email:"",
            message:""
          })
          setmessage(result.message)

        }else{
          setLoading(false)
          seterror(result.message)
        }
        console.log(result)
      })
      .catch((error) => {
        setLoading(false)
        console.error(error)
        seterror(error.message)
      });
  }


  return (
    <div className="min-h-screen  mt-6 bg-gradient-to-br from-[#f8f9ff] via-[#eef2ff] to-white flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-16 gap-10">

      
      <div
               className="flex justify-center relative bottom-0 md:bottom-40 w-full md:w-1/2"
      >
        <Image
          src="/Contact-us.gif"
          width={100}
          height={100}
          alt="Suhail"
          unoptimized
          className="rounded-3xl  shadow-2xl w-[240px] md:w-[300px] lg:w-[340px] h-[280px] md:h-[380px] object-cover object-top  hover:scale-105 transition-all duration-300"
        />
      </div>

   
      <div
               className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 w-full md:w-1/2"
      >
        <h2 className="text-4xl font-bold text-purple-700 mb-6 text-center md:text-left">
          Get in Touch
        </h2>

        <p className="text-gray-600 mb-8 text-center md:text-left">
          Feel free to reach out for collaborations, freelance work, or just a friendly hello 👋
        </p>

        <form className="space-y-6" method="POST" onSubmit={handleSubmit} >
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange}
              name="name"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              placeholder="Write your message here..."
              value={form.message}
              name="message"
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
                       className="w-full  cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading?<div className="flex gap-2 justify-center items-center" ><LoaderCircle className="animate-spin w-7 h-7 text-white" /><span>Loading</span></div>:<div className="flex gap-3 justify-center items-center" ><FiSend className="text-lg" /> Send Message</div>}
          </button>
        </form>

       
        <div className="mt-10 space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <FiMail className="text-purple-600 text-xl" />
            <span>support@ardsuhail.com</span>
          </div>
      
         
        </div>
      </div>
    </div>
  );
};

export default Contact;
