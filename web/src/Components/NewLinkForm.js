import React from "react";
import { useToken, useUser } from '../Logic/UserContext';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function NewLinkForm() {
    const token = useToken();
    const user = useUser();
    const navigate = useNavigate();
    const [magazines, setMagazines] = useState([]);
    const [selectedMagazine, setSelectedMagazine] = useState('');

    async function fetchMagazines(user, token) {
      const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error fetching threads');
      }
      return response.json();
  }

    const handleMagazineChange = (event) => {
      setSelectedMagazine(event.target.value);
    };

    function updateUsernameLength() {
        const input = document.getElementById('user_basic_username'); // Obtener el input del username
        const maxLength = input.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = input.value.length; // Obtener la longitud actual del valor del input
        const indicator = document.getElementById('user_basic_username_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }

    function updateAboutLength() {
        const textarea = document.getElementById('user_basic_about'); // Obtener el textarea para el about
        const maxLength = textarea.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = textarea.value.length; // Obtener la longitud actual del valor del textarea
        const indicator = document.getElementById('user_basic_about_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const form = document.querySelector('form[name="user_basic"]');
        const formDataTEMP = new FormData(form);
      
        // Obtener los valores de username, description, avatar y cover del formData
        const username = formDataTEMP.get('user_basic[username]');
        const description = formDataTEMP.get('user_basic[about]');
        const avatar = formDataTEMP.get('user_basic[avatar]');
        const cover = formDataTEMP.get('user_basic[cover]');

        const formData = new FormData();
      
        // Modificar el formData para incluir estos valores
        formData.set('username', username);
        formData.set('description', description);
        formData.set('avatar', avatar);
        formData.set('cover', cover);

        const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/`, {
            method: 'POST',
            headers: {
            'Authorization': `Token ${token}`,
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error fetching comments');
        }
        navigate(`/`);
    }

  return (
    <div id="middle" className="page-settings page-settings-profile">
      <div className="kbin-container">
        <main
          id="main"
          data-controller="lightbox timeago"
          className="view-compact"
        >
          <div className="section">
            <div className="user-box">
              <div className="">
                <div className="user-main" id="content">
                  <div>
                    <div className="row">
      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="content" className="section">
            <div className="container">
              <h1 hidden="">New Link</h1>
              <form
                name="user_basic"
                method="post"
                encType="multipart/form-data"
              >
                <div>
                  <label htmlFor="user_basic_username">URL</label>
                  <input
                    type="text"
                    id="user_basic_username"
                    name="user_basic[username]"
                    data-controller="input-length autogrow"
                    data-entry-link-create-target="user_about"
                    data-action="input-length#updateDisplay"
                    data-input-length-max-value="30"
                    style={{ overflow: "hidden", height: "50px" }}
                    onInput={updateUsernameLength}
                  />
                </div>
                <label htmlFor="user_basic_username">Title</label>
                <div>
                  <textarea
                    id="user_basic_about"
                    name="user_basic[about]"
                    placeholder="About"
                    data-controller="input-length rich-textarea autogrow"
                    data-entry-link-create-target="user_about"
                    data-action="input-length#updateDisplay"
                    data-input-length-max-value="512"
                    style={{ overflow: "hidden", height: "68px" }}
                    onInput={updateAboutLength}
                  ></textarea>
                  <div
                    id="user_basic_about_max_length"
                    className="length-indicator"
                  >
                    {`0/512`}
                  </div>
                </div>
                <label htmlFor="user_basic_username">Content</label>
                <div>
                  <textarea
                    id="user_basic_about"
                    name="user_basic[about]"
                    placeholder="About"
                    data-controller="input-length rich-textarea autogrow"
                    data-entry-link-create-target="user_about"
                    data-action="input-length#updateDisplay"
                    data-input-length-max-value="512"
                    style={{ overflow: "hidden", height: "68px" }}
                    onInput={updateAboutLength}
                  ></textarea>
                  <div
                    id="user_basic_about_max_length"
                    className="length-indicator"
                  >
                    {`0/512`}
                  </div>
                </div>
                <div>
                  <label htmlFor="magazine">Selecciona una revista</label>
                  <select
                    id="magazine"
                    name="magazine"
                    value={selectedMagazine}
                    onChange={handleMagazineChange}
                    className="form-control"
                  >
                    <option value="">Selecciona una revista</option>
                    {magazines.map((magazine) => (
                      <option key={magazine.id} value={magazine.id}>
                        {magazine.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row actions">
                  <div>
                    <button
                      type="submit"
                      id="user_basic_submit"
                      name="user_basic[submit]"
                      className="btn btn__primary"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default NewLinkForm;
