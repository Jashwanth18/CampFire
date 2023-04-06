const scrollTop = function () {
  // create HTML button element
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "&uarr;";
  scrollBtn.classList.add("noShow");
  scrollBtn.setAttribute("id", "scroll-btn");
  document.body.appendChild(scrollBtn);

  // hide/show button based on scroll distance
  const scrollBtnDisplay = function () {
    window.scrollY > window.innerHeight
      ? scrollBtn.classList.add("show")
      : scrollBtn.classList.remove("show");
  };
  window.addEventListener("scroll", scrollBtnDisplay);

  // scroll to top when button is clicked
  const scrollWindow = function () {
    if (window.scrollY != 0) {
      window.scrollTo(0, 0);
    }
  };
  scrollBtn.addEventListener("click", scrollWindow);
};

scrollTop();
