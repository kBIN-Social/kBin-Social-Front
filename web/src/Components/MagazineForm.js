import React from "react";
import { useToken, useUser } from '../Logic/UserContext';
import { useNavigate } from "react-router-dom";

function MagazineForm() {
    const token = useToken();
    const user = useUser();
    const navigate = useNavigate();

    function updatenameLength() {
        const input = document.getElementById('user_basic_username'); // Obtener el input del username
        const maxLength = input.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = input.value.length; // Obtener la longitud actual del valor del input
        const indicator = document.getElementById('user_basic_username_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }
    function updatetitleLength() {
        const input = document.getElementById('user_basic_username'); // Obtener el input del username
        const maxLength = input.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = input.value.length; // Obtener la longitud actual del valor del input
        const indicator = document.getElementById('user_basic_username_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }
    function updateDescriptionLength() {
        const textarea = document.getElementById('user_basic_about'); // Obtener el textarea para el about
        const maxLength = textarea.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = textarea.value.length; // Obtener la longitud actual del valor del textarea
        const indicator = document.getElementById('user_basic_about_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }
    function updateRulesLength() {
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

        const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${user.id}`, {
            method: 'PUT',
            headers: {
            'Authorization': `Token ${token}`,
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error fetching comments');
        }
        navigate(`/profile/${user.id}`);
    }

  return (
  <div id="content" class="section">
      <div class="container">
          <form name="magazine" method="post" encType="multipart/form-data">
              <div><label htmlFor="magazine_name" class="required">Name</label>
              <input type="text" id="magazine_name"
                      name="magazine[name]" required="required" data-controller="input-length autogrow"
                      data-action="input-length#updateDisplay" data-input-length-max-value="25" style={{ overflow: "hidden", height: "50px" }}
                      onInput={updatenameLength}></input>
                  <div id="magazine_name_max_length" class="length-indicator"> {`0/25`}</div>
              </div>
              <div><label for="magazine_title" class="required">Title</label>
              <input type="text" id="magazine_title"
                      name="magazine[title]" required="required" data-controller="input-length autogrow"
                      data-action="input-length#updateDisplay" data-input-length-max-value="50"
                      style={{overflow: "hidden",height: "50px"}} onInput={updatetitleLength}></input>
                  <div id="magazine_title_max_length" class="length-indicator">{`0/50`}</div>
              </div>
              <div><textarea id="magazine_description" name="magazine[description]" placeholder="Description"
                      data-controller="input-length rich-textarea autogrow" data-action="input-length#updateDisplay"
                      data-input-length-max-value="10000" style={{overflow: "hidden", height: "68px"}} onInput={updateDescriptionLength}></textarea>
                  <div id="magazine_description_max_length" class="length-indicator">{`0/10000`}</div>
              </div>
              <div><textarea id="magazine_rules" name="magazine[rules]" placeholder="Rules"
                      data-controller="input-length rich-textarea autogrow" data-action="input-length#updateDisplay"
                      data-input-length-max-value="10000" style={{overflow: "hidden", height: "68px"}} onInput={updateRulesLength}></textarea>
                  <div id="magazine_rules_max_length" class="length-indicator">{`0/10000`}</div>
              </div>

              <div class="row actions">
                  <div class="float-end"><button type="submit" id="magazine_submit" name="magazine[submit]"
                          class="btn btn__primary">Create new magazine</button></div>
              </div>
          </form>
      </div>
  </div>);
}

export default MagazineForm;
