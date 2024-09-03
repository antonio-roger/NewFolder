        const links = {
            waLink: "https://wa.link/fbnrwv",
            telegramLink: "https://t.me/a2802p",
            emailLink: "mailto:krithuudhayakumar24@gmail.com",
            youtubeLink: "https://tiny.cc/2428",
            chatLink: "Assets/chat/chat.html",
            instagramLink: "https://www.instagram.com/insane_retika"
        };

            const PRIVATE_KEY = "2428";

        
        function createElement(tag, attributes = {}, styles = {}, innerHTML = '') {
            const element = document.createElement(tag);
            Object.assign(element, attributes);
            Object.assign(element.style, styles);
            element.innerHTML = innerHTML;
            return element;
        }
        
        function showAuthPrompt(linkId) {
            if (document.getElementById('passwordPrompt')) return;

            const promptDiv = createElement('div', { id: 'passwordPrompt' }, {
                position: 'fixed',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '30px',
                border: '1px solid #ddd',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                zIndex: '1000',
                textAlign: 'center',
                width: '350px',
                boxSizing: 'border-box',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            });

            const inputField = createElement('input', {
                type: 'password',
                autocomplete: 'off',
                placeholder: 'Enter key'
            }, {
                marginBottom: '20px',
                width: '70%',
                padding: '12px 15px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            });

            const submitButton = createElement('button', {}, {
                padding: '12px 0',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                width: '80%',
                boxSizing: 'border-box',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
                marginTop: '10px'
            }, 'Submit');

            submitButton.addEventListener('mouseover', () => {
                submitButton.style.backgroundColor = '#0056b3';
            });
            submitButton.addEventListener('mouseout', () => {
                submitButton.style.backgroundColor = '#007bff';
            });

            const closeButton = createElement('button', {}, {
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#999',
                transition: 'color 0.3s ease'
            }, '✖');

            closeButton.addEventListener('mouseover', () => {
                closeButton.style.color = '#666';
            });
            closeButton.addEventListener('mouseout', () => {
                closeButton.style.color = '#999';
            });
            closeButton.addEventListener('click', () => {
                document.body.removeChild(promptDiv);
            });

            submitButton.addEventListener('click', () => {
                if (inputField.value === PRIVATE_KEY) {
                    const linkUrl = links[linkId];
                    window.open(linkUrl, '_blank');
                }
                document.body.removeChild(promptDiv);
            });

            promptDiv.appendChild(closeButton);
            promptDiv.appendChild(inputField);
            promptDiv.appendChild(submitButton);

            document.body.appendChild(promptDiv);
        }

       
        function handleQuickLinksMenu() {
            const quickLinksButton = document.getElementById('quickLinksButton');
            const quickLinksMenu = document.getElementById('quickLinksMenu');
            const closeQuickLinksMenu = document.getElementById('closeQuickLinksMenu');
            quickLinksMenu.style.display = 'none';
            let closeMenuTimeout;

            if (quickLinksButton && quickLinksMenu) {
                quickLinksButton.addEventListener('click', () => {
                    if (quickLinksMenu.style.display === 'none' || quickLinksMenu.style.display === '') {
                        quickLinksMenu.style.display = 'block';
                        closeMenuTimeout = setTimeout(() => {
                            quickLinksMenu.style.display = 'none';
                        }, 15000);
                    } else {
                        quickLinksMenu.style.display = 'none';
                        clearTimeout(closeMenuTimeout);
                    }
                });

                document.addEventListener('click', (event) => {
                    if (!quickLinksButton.contains(event.target) && !quickLinksMenu.contains(event.target)) {
                        quickLinksMenu.style.display = 'none';
                        clearTimeout(closeMenuTimeout);
                    }
                });

                quickLinksMenu.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            }

            if (closeQuickLinksMenu) {
                closeQuickLinksMenu.addEventListener('click', () => {
                    quickLinksMenu.style.display = 'none';
                    clearTimeout(closeMenuTimeout);
                });
            }
        }


        function handleFeedbackForm() {
            const feedbackForm = document.getElementById('feedback-form');
            if (feedbackForm) {
                feedbackForm.addEventListener('submit', function(event) {
                    event.preventDefault();  
        
                    const d = new Date();
                    let time = d.toLocaleTimeString();  
        
                    const formData = new FormData(feedbackForm);  
                    feedbackForm.reset();  
        
                    formData.append('Time', time);  
        
                    fetch('https://formsubmit.co/ajax/028c0178033f578a8d3a6d57b4d06376', {
                        method: 'POST',  
                        body: formData,  
                        headers: { 'Accept': 'application/json' } 
                    })
                    .then(response => response.json())  
                    .then(data => {
                        console.log('Submitted successfully!', data);  
                        alert('Done');  
                    })
                    .catch(error => {
                        console.error('Error (or)Too Many Requests', error); 
                        alert('Error ! Try after few Minutes');
                    });
                });
            }
        }
        
        
        document.addEventListener('DOMContentLoaded', () => {
            console.log("DOM fully loaded");
            handleQuickLinksMenu();
            document.querySelectorAll('#quickLinksMenu a').forEach(link => {
                link.addEventListener('click', event => {
                    const linkId = event.currentTarget.id;
                    showAuthPrompt(linkId);
                });
            });
            handleFeedbackForm();
        });

