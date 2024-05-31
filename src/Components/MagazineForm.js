import React from "react";
import { useToken} from '../Logic/UserContext';
import { useNavigate } from "react-router-dom";
import Header from './Header';

function MagazineForm() {
    const token = useToken();
    const navigate = useNavigate();

    function updatenameLength() {
        const input = document.getElementById('magazine_name'); // Obtener el input del username
        const maxLength = input.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = input.value.length; // Obtener la longitud actual del valor del input
        const indicator = document.getElementById('magazine_name_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }
    function updatetitleLength() {
        const input = document.getElementById('magazine_title'); // Obtener el input del username
        const maxLength = input.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = input.value.length; // Obtener la longitud actual del valor del input
        const indicator = document.getElementById('magazine_title_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }
    function updateDescriptionLength() {
        const textarea = document.getElementById('magazine_description'); // Obtener el textarea para el about
        const maxLength = textarea.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = textarea.value.length; // Obtener la longitud actual del valor del textarea
        const indicator = document.getElementById('magazine_description_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }
    function updateRulesLength() {
        const textarea = document.getElementById('magazine_rules'); // Obtener el textarea para el about
        const maxLength = textarea.getAttribute('data-input-length-max-value'); // Obtener el valor máximo permitido de caracteres
        const currentLength = textarea.value.length; // Obtener la longitud actual del valor del textarea
        const indicator = document.getElementById('magazine_rules_max_length'); // Obtener el elemento donde se mostrará el conteo
      
        // Actualizar el contenido del elemento indicador con la longitud actual y el máximo permitido
        indicator.textContent = `${currentLength}/${maxLength}`;
    }
    async function handleSubmit(e) {
        e.preventDefault();

        const form = document.querySelector('form[name="magazine"]');
        const formDataTEMP = new FormData(form);
      
        // Obtener los valores de username, description, avatar y cover del formData
        const name = formDataTEMP.get('magazine[name]');
        const title = formDataTEMP.get('magazine[title]');
        const description = formDataTEMP.get('magazine[description]');
        const rules = formDataTEMP.get('magazine[rules]');

        const formData = new FormData();
      
        // Modificar el formData para incluir estos valores
        formData.set('nom', name);
        formData.set('description', description);
        formData.set('title', title);
        formData.set('rules', rules);

        const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines/`, {
            method: 'POST',
            headers: {
            'Authorization': `Token ${token}`,
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error creating magazine');
        }
        const mag =await response.json()
        navigate(`/magazines/${mag.id}`);
    }

  return (
    <div className="theme--dark">
        <Header/>
    <div className='section'>
          <form name="magazine" method="post" encType="multipart/form-data">
              <div>
                <label htmlFor="magazine_name" className="required">Name</label>
                <input type="text" id="magazine_name"
                        name="magazine[name]" required="required" data-controller="input-length autogrow"
                        data-action="input-length#updateDisplay" data-input-length-max-value="25" style={{ overflow: "hidden", height: "50px" }}
                        onInput={updatenameLength} maxLength= "25"/>
                    <div id="magazine_name_max_length" className="length-indicator"> {`0/25`}</div>
                </div>
              <div><label htmlFor="magazine_title" className="required">Title</label>
              <input type="text" id="magazine_title"
                      name="magazine[title]" required="required" data-controller="input-length autogrow"
                      data-action="input-length#updateDisplay" data-input-length-max-value="50"
                      style={{overflow: "hidden",height: "50px"}} onInput={updatetitleLength} maxLength="50"></input>
                  <div id="magazine_title_max_length" className="length-indicator">{`0/50`}</div>
              </div>
              <div><textarea id="magazine_description" name="magazine[description]" placeholder="Description"
                      data-controller="input-length rich-textarea autogrow" data-action="input-length#updateDisplay"
                      data-input-length-max-value="10000" style={{overflow: "hidden", height: "68px"}} maxLength ="10000" onInput={updateDescriptionLength}></textarea>
                  <div id="magazine_description_max_length" className="length-indicator">{`0/10000`}</div>
              </div>
              <div><textarea id="magazine_rules" name="magazine[rules]" placeholder="Rules"
                      data-controller="input-length rich-textarea autogrow" data-action="input-length#updateDisplay"
                      data-input-length-max-value="10000" style={{overflow: "hidden", height: "68px"}} onInput={updateRulesLength} maxLength ="10000"></textarea>
                  <div id="magazine_rules_max_length" className="length-indicator">{`0/10000`}</div>
              </div>

              <div className="row actions">
                  <div className="float-end"><button type="submit" id="magazine_submit" name="magazine[submit]"
                          className="btn btn__primary" onClick={handleSubmit}>Create new magazine</button></div>
              </div>
          </form>
      </div>
  </div>);
}

export default MagazineForm;
