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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const magazines = await fetchMagazines(user, token);
          setMagazines(magazines);
        } catch (error) {
          console.error('Error fetching threads:', error);
        }
      };
  
      if (token) {
        fetchData();
      }
    }, [user, token]);

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

    function updateAboutLength() {
        const textarea = document.getElementById('new_link_title'); // Obtener el textarea para el about
        const maxLength = textarea.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = textarea.value.length; // Obtener la longitud actual del valor del textarea
        const indicator = document.getElementById('new_link_title_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }

    function updateCosLength() {
      const textarea = document.getElementById('new_link_content'); // Obtener el textarea para el about
      const maxLength = textarea.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
      const currentLength = textarea.value.length; // Obtener la longitud actual del valor del textarea
      const indicator = document.getElementById('new_link_content_max_length'); // Obtener el elemento donde se mostrará el conteo
    
      // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
      indicator.textContent = `${currentLength}/${maxLength}`;
  }

    async function handleSubmit(e) {
        e.preventDefault();

        const form = document.querySelector('form[name="new_link"]');
        const formDataTEMP = new FormData(form);
      
        // Obtener los valores de username, description, avatar y cover del formData
        const title = formDataTEMP.get('new_link[title]');
        const content = formDataTEMP.get('new_link[content]');
        const magazine = formDataTEMP.get('new_link[magazine]');
        const isLink = false

        const formData = new FormData();
      
        // Modificar el formData para incluir estos valores
        formData.set('titol', title);
        formData.set('cos', content);
        formData.set('isLink', isLink);
        formData.set('magazine', selectedMagazine);

        const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/`, {
            method: 'POST',
            headers: {
            'Authorization': `Token ${token}`,
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error posting link');
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
              <h1 hidden="">New Thread</h1>
              <form
                name="new_link"
                method="post"
                encType="multipart/form-data"
              >
                <label htmlFor="new_link_title">Title</label>
                <div>
                  <textarea
                    id="new_link_title"
                    name="new_link[title]"
                    placeholder="About"
                    data-controller="input-length rich-textarea autogrow"
                    data-entry-link-create-target="user_about"
                    data-action="input-length#updateDisplay"
                    data-input-length-max-value="255"
                    style={{ overflow: "hidden", height: "68px" }}
                    maxLength="255"
                    onInput={updateAboutLength}
                  ></textarea>
                  <div
                    id="new_link_title_max_length"
                    className="length-indicator"
                  >
                    {`0/255`}
                  </div>
                </div>
                <label htmlFor="new_link_content">Content</label>
                <div>
                  <textarea
                    id="new_link_content"
                    name="new_link[content]"
                    placeholder="About"
                    data-controller="input-length rich-textarea autogrow"
                    data-entry-link-create-target="user_about"
                    data-action="input-length#updateDisplay"
                    data-input-length-max-value="35000"
                    maxLength="35000"
                    style={{ overflow: "hidden", height: "68px" }}
                    onInput={updateCosLength}
                  ></textarea>
                  <div
                    id="new_link_content_max_length"
                    className="length-indicator"
                  >
                    {`0/35000`}
                  </div>
                </div>
                <div>
                  <label htmlFor="new_link_magazine">Selecciona una revista</label>
                  <select
                    id="new_link_magazine"
                    name="new_link_magazine"
                    value={selectedMagazine}
                    onChange={handleMagazineChange}
                    className="form-control"
                  >
                    <option value="">Selecciona una revista</option>
                    {magazines.map((magazine) => (
                      <option key={magazine.id} value={magazine.nom}>
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
                      name="new_link[submit]"
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
