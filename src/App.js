import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Icon, Select, Input, TextArea } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

import $ from 'jquery';

const telMask = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d)(\d{4})$/, "$1-$2");
};

export default function App() {
  const form = useRef();
  const [txtTel, setTxtTel] = useState("");

  // const success = <p>thank you for sending us a message</p>;

  const countryOptions = [
    { key: 'Ensino Fundamental', value: 'Ensino Fundamental', text: 'Ensino Fundamental', name: 'user_grau' },
    { key: 'Ensino Médio', value: 'Ensino Médio', text: 'Ensino Médio', name: 'user_grau' },
    { key: 'Ensino Superior', value: 'Ensino Superior', text: 'Ensino Superior', name: 'user_grau' },
    { key: 'Pós-Graduação', value: 'Pós-Graduação', text: 'Pós-Graduação', name: 'user_grau' },
  ]

  function sendEmail (formulario) {
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          //alert(`message sent successfully... ${result.text}`);
          toast.success('Formulário enviado com sucesso, obrigado!', {
              position: toast.POSITION.TOP_RIGHT
          });

          setTimeout(function(){
            window.location.href = 'https://igua.com.br/';
          },2000);
        },
        (error) => {
          toast.error(error.text, {
              position: toast.POSITION.TOP_RIGHT
          });
          console.log(error.text);
        }
      );

      return false;
  };

  useEffect(() => {
    $('.etapa6').on('click', '.ui.dropdown .menu .item' ,function(){
      var _this = $(this);

      setTimeout(function(){
        var thisSelected = _this.parents('.ui.dropdown').find('.divider').html();
        console.log('thisSelected >> ',thisSelected);
        $('.etapa6.active input#user_grau').val(thisSelected);
      },200);
    });

    $('button.proximo').on('click',function(){
      if($(this).parents('.etapa.active').hasClass('etapa2')){

        if($('.etapa2.active div.wrap .opcao input[name="user_regime"]').is(':checked')){
          $(this).parents('.etapa.active').removeClass('active').next('.etapa').addClass('active');

          return false;
        }else{
          toast.error('Por favor, selecione uma das opções!', {
              position: toast.POSITION.TOP_RIGHT
          });

          return false;
        }
      }else if($(this).parents('.etapa.active').hasClass('etapa3')){
        if($('.etapa3.active textarea#nossaempresatextarea').val().length > 10){

          $(this).parents('.etapa.active').removeClass('active').next('.etapa').addClass('active');

          return false;
        }else{
          toast.error('Por favor, fale um pouco mais sobre a Iguá Saneamento!', {
              position: toast.POSITION.TOP_RIGHT
          });

          return false;
        }
      }else if($(this).parents('.etapa.active').hasClass('etapa4')){
        if($('.etapa4.active textarea#sobrevocetextarea').val().length > 10){

          $(this).parents('.etapa.active').removeClass('active').next('.etapa').addClass('active');

          return false;
        }else{
          toast.error('Por favor, fale um pouco mais sobre você!', {
              position: toast.POSITION.TOP_RIGHT
          });

          return false;
        }
      }else if($(this).parents('.etapa.active').hasClass('etapa5')){
        if($('.etapa5.active textarea#porquetextarea').val().length > 10){

          $(this).parents('.etapa.active').removeClass('active').next('.etapa').addClass('active');

          return false;
        }else{
          toast.error('Por favor, fale um o porque você merece uma oportunidade!', {
              position: toast.POSITION.TOP_RIGHT
          });

          return false;
        }
      }else if(!$(this).parents('.etapa.active').hasClass('etapa6')){
        
        $(this).parents('.etapa.active').removeClass('active').next('.etapa').addClass('active');

        return false; 
      }
    });

    $('button.salvar').on('click',function(){

      if($('.etapa6.active input[name="user_name"]').val() == ''){
        toast.error('Por favor, informe seu nome!', {
            position: toast.POSITION.TOP_RIGHT
        });

        return false;
      }

      var email = $('.etapa6.active input[name="user_email"]').val();
      var parte1Email = email.indexOf("@");
      var parte3Email = email.length;
      if(email == "" || !(parte1Email >= 3 && parte3Email >= 9)){
          toast.error('Por favor, preencha o e-mail válido!', {
              position: toast.POSITION.TOP_RIGHT
          });    

          return false;
      }

      var telefone = $('.etapa6.active input[name="user_telefone"]').val();
      if(telefone == "" || telefone.length < 11){
        toast.error('Por favor, preencha um telefone válido!', {
            position: toast.POSITION.TOP_RIGHT
        });

        return false;
      }

      if($('.etapa6.active input[name="user_name"]').val() == ''){
        toast.error('Por favor, informe seu nome!', {
            position: toast.POSITION.TOP_RIGHT
        });

        return false;
      }

      sendEmail();

      return false;
    });

    $('button.voltar').on('click',function(){
      $(this).parents('.etapa.active').removeClass('active').prev('.etapa').addClass('active');

      return false;
    });

  },[]);

  return (
    <div>

        <header id="header">
          <div className="topHeader">
            <div className="left">
              <p>Projeto Iguá Saneamento - Mostre o seu Talento</p>
            </div>

            <div className="right">
              <a href="https://www.linkedin.com/company/iguasaneamento/" target="_blank">
                <i className="icon linkedin"></i>
              </a>
              <a href="https://www.instagram.com/iguasaneamento/" target="_blank">
                <i className="icon instagram"></i>
              </a>
              <a href="https://www.facebook.com/iguasaneamento/" target="_blank">
                <i className="icon facebook"></i>
              </a>
              <a href="https://www.youtube.com/iguasaneamento/" target="_blank">
                <i className="icon youtube"></i>
              </a>
            </div>
          </div>

          <div className="middle">
            <img src="/logo-igua.png" alt="Logo Iguá Saneamento"/>
          </div>  
        </header>

        <div className="content">
          <form if="formulario" className='cf' ref={form}>
            {/*onSubmit={sendEmail}*/}

            <div className="etapa etapa1 saudacao active">
              <h1>MOSTRE O SEU TALENTO</h1>
              <h2>A <strong>Iguá Saneamento</strong> tem o prazer de conhecê-lo!</h2>

              <Button className="comecar proximo" content='Começar' icon='right arrow' labelPosition='right' />
            </div>

            <div className="etapa etapa2">
              <div className="pergunta">Qual o regime de contratação está em busca?</div>

              <div className="wrap">
                <div className="opcao">
                  <input type='radio' value="Estágio" name='user_regime' />
                  <label>ESTÁGIO</label>
                </div>

                <div className="opcao">
                  <input type='radio' value="CLT" name='user_regime' />
                  <label>CLT</label>
                </div>
              </div>

              <div className="wrap">
                <Button icon labelPosition='left' className="voltar">
                  <Icon name='left arrow' />
                  Voltar
                </Button>

                <Button icon labelPosition='right' className="proximo">
                  Próximo
                  <Icon name='right arrow' />
                </Button>
              </div>
            </div>

            <div className="etapa etapa3">
              <div className="pergunta">Fale um pouco o que sabe sobre a nossa empresa</div>

              <TextArea name='nossaempresa' id="nossaempresatextarea" type='text'/>

              <div className="wrap">
                <Button icon labelPosition='left' className="voltar">
                  <Icon name='left arrow' />
                  Voltar
                </Button>

                <Button icon labelPosition='right' className="proximo">
                  Próximo
                  <Icon name='right arrow' />
                </Button>
              </div>
            </div>

            <div className="etapa etapa4">
              <div className="pergunta">Fale um pouco sobre você, a Iguá quer te conhecer.</div>

              <TextArea name='sobrevoce' id="sobrevocetextarea" type='text'/>

              <div className="wrap">
                <Button icon labelPosition='left' className="voltar">
                  <Icon name='left arrow' />
                  Voltar
                </Button>

                <Button icon labelPosition='right' className="proximo">
                  Próximo
                  <Icon name='right arrow' />
                </Button>
              </div>
            </div>

            <div className="etapa etapa5">
              <div className="pergunta">Porque você merece uma oportunidade na Iguá Saneamento?</div>

              <TextArea name='porque' id="porquetextarea" type='text'/>

              <div className="wrap">
                <Button icon labelPosition='left' className="voltar">
                  <Icon name='left arrow' />
                  Voltar
                </Button>

                <Button icon labelPosition='right' className="proximo">
                  Próximo
                  <Icon name='right arrow' />
                </Button>
              </div>
            </div>

            <div className="etapa etapa6">
              <div className="pergunta">Informe seus dados para um possível contato</div>

              <div className="wrap">
                <Input type='text' placeholder='Nome' name='user_name' />
                <Input type='text' placeholder='E-mail' name='user_email' />
                <Input type='text' placeholder='Telefone' name='user_telefone'
                  value={txtTel ? telMask(txtTel) : ""}
                  maxLength="15" 
                  onChange={(input) => {
                      const value = input?.target?.value;
                      setTxtTel(telMask(value));
                  }}
                 />
                <Select placeholder='Grau de Ensino' options={countryOptions} />
                <Input type='text' placeholder='Grau de Ensino' name='user_grau' id="user_grau" />
              </div>

              <div className="wrap">
                <Button icon labelPosition='left' className="voltar">
                  <Icon name='left arrow' />
                  Voltar
                </Button>

                <Button icon labelPosition='right' className="salvar">
                  Enviar
                  <Icon name='save' />
                </Button>
              </div>
            </div>
              
              {/*<input type='text' placeholder='Name' name='user_name' />
              <input type='email' placeholder='Email address' name='user_email' />
              <textarea name='message' type='text' placeholder='Message'></textarea>
              <input type='submit' value='Submit' id='input-submit' />*/}
          </form>

        </div>

        <footer id="footer">
          <ul className="alunos">
            <li className="aluno faculdade">Universidade Augusto Motta - Unisuam - Administração de Empresas</li>
            <li className="aluno">Antonia Rodrigues</li>
            <li className="aluno">Benjamin de Souza </li>
            <li className="aluno">Breno Henrique</li>
            <li className="aluno">Cristiane Santana </li>
            <li className="aluno">Jenifer Machado</li>
            <li className="aluno">Tayná Oliveira</li>
            <li className="aluno">Yuri Aguiar</li> 

            <li className="aluno dev">
              <a href="https://www.linkedin.com/in/gustavoroma/" target="_blank">Analista de Sistemas: Gustavo Roma</a>
            </li>
          </ul>
        </footer>

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