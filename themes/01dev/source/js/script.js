if(document.querySelectorAll('#masonry').length > 0) {
    const macy = Macy.init({
        container: '#masonry',
        margin: 30,
        columns: 4,
        breakAt: {
            460: {
                columns: 1,
            },
            860: {
                columns: 2,
            },
            1100: {
                columns: 3,
            },
        }
    });

    window.onload = function() {
        macy.recalculate(true);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });