import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Icon } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

import $ from 'jquery';


export default function App() {
  const form = useRef();

  // const success = <p>thank you for sending us a message</p>;

  useEffect(() => {
    toast.success('responda a pergunta a seguir!', {
      position: toast.POSITION.TOP_RIGHT
    });
  },[]);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          alert(`message sent successfully... ${result.text}`);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>

        <header id="header">aaa
            <img src="/logo-igua.png" alt="Logo Iguá Saneamento"/>
        </header>

        <form className='cf' ref={form} onSubmit={sendEmail}>
            <div className='half left cf'>
                <input type='text' placeholder='Name' name='user_name' />
                <input type='email' placeholder='Email address' name='user_email' />
            </div>
            <div className='half right cf'>
            <textarea name='message' type='text' placeholder='Message'></textarea>
            </div>
            <input type='submit' value='Submit' id='input-submit' />
        </form>

        <ToastContainer
            autoClose={2000}
            limit={2}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
        />

    </div>
  );
}