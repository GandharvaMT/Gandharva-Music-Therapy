function showMore(feedbackId) {
    let element = document.getElementById(feedbackId + '-more');
    element.classList.toggle('d-none'); 

    let toggleElement = document.getElementById(feedbackId + '-more-toggle');
    toggleElement.style.display = element.classList.contains('d-none') ? 'inline' : 'none'; 
  }


  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();  
  
      const formData = new FormData(form);
      const params = new URLSearchParams();
      for (const [key, value] of formData) {
        params.append(key, value);
      }
  
      fetch(form.action, {
        method: 'POST',
        body: params
      })
      .then(response => response.text())
      .then(data => {
        alert(data);
  
        setTimeout(() => {
          form.reset();
        }, 2000);
      })
      .catch(error => console.error('Error:', error));
    });
  });
  