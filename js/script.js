document.addEventListener("DOMContentLoaded", function () {
  const images = [
    {
      src: "img/ws1.png",
      alt: "Image 1",
    },
    {
      src: "img/ws2.png",
      alt: "Image 2",
    },
    {
      src: "img/ws3.png",
      alt: "Image 3",
    },
    {
      src: "img/ws4.png",
      alt: "Image 4",
    },
  ];

  const slider = document.querySelector(".slider");
  const thumbnailsContainer = document.querySelector(".thumbnails-container");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentSlide = 0;
  const imageCount = images.length;

  images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;

    slide.appendChild(img);
    slider.appendChild(slide);

    const thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");
    if (index === 0) thumbnail.classList.add("active");

    const thumbImg = document.createElement("img");
    thumbImg.src = image.src;
    thumbImg.alt = `Thumbnail ${index + 1}`;

    thumbnail.appendChild(thumbImg);
    thumbnailsContainer.appendChild(thumbnail);

    thumbnail.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  const thumbnails = document.querySelectorAll(".thumbnail");

  function goToSlide(slideIndex) {
    if (slideIndex < 0) {
      slideIndex = imageCount - 1;
    } else if (slideIndex >= imageCount) {
      slideIndex = 0;
    }

    currentSlide = slideIndex;

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    thumbnails.forEach((thumbnail, index) => {
      if (index === currentSlide) {
        thumbnail.classList.add("active");
      } else {
        thumbnail.classList.remove("active");
      }
    });
  }

  prevBtn.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
  });

  let intervalId;

  function startAutoSlide() {
    intervalId = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  startAutoSlide();

  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);
  thumbnailsContainer.addEventListener("mouseenter", stopAutoSlide);
  thumbnailsContainer.addEventListener("mouseleave", startAutoSlide);
});
