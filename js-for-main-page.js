const FaLinks = document.querySelector('.nav-items')

FaLinks.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

// const link = document.querySelectorAll('.nav-link')
// link.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// })

const section1 = document.querySelector('.section-club')
const btnScoo = document.querySelector('.btn-scrool')

btnScoo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' })
})

///////////////////////////////////// (((((tabs))))) ///////////
const father = document.querySelector('.offer-tabs')
const childer = document.querySelectorAll('.offer-btn')
const contanier = document.querySelectorAll('.off-content')

father.addEventListener('click', function (e) {
  const click = e.target.closest('.offer-btn')
  console.log(click)

  // gured class
  if (!click) return

  //remove active class
  childer.forEach(function (e) {
    e.classList.remove('active-offer-btn')
  })

  contanier.forEach(function (e) {
    e.classList.remove('active-offer-content')
  })

  //add active to btn
  click.classList.add('active-offer-btn')

  //add to your content
  document
    .querySelector(`.operations__content--${click.dataset.tab}`)
    .classList.add('active-offer-content')
})

// menu fade anmation
const nav = document.querySelector('.nav-list')

const handleHover = function (e) {
  if (e.target.classList.contains('nav-link')) {
    const link = e.target
    // console.log(link)
    const sipling = link.closest('.nav-list').querySelectorAll('.nav-link')
    // console.log(sipling)
    const logo = link.closest('.nav-list').querySelector('img')
    // console.log(logo)
    sipling.forEach((el) => {
      if (el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

///////////////////////////// {(stiky nav)} /////////////////////////////

const header = document.querySelector('.header')
const heroSection = document.querySelector('.section-hero')
const headerHeight = header.getBoundingClientRect().height

const headercallBack = function (entris) {
  const [entry] = entris
  if (!entry.isIntersecting) {
    header.classList.add('sticky')
  } else {
    header.classList.remove('sticky')
  }
}

const headerObserver = new IntersectionObserver(headercallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
})

headerObserver.observe(heroSection)

////////////////////////////// (line-move) ///////////////////////////////
const line1 = document.querySelector('.line-1')
const lineCallBack = function (entris) {
  const [entry] = entris
  if (entry.isIntersecting === true) {
    line1.classList.add('moveLine')
  }
}
const lineObserver = new IntersectionObserver(lineCallBack, {
  root: null,
  threshold: 0,
})
lineObserver.observe(line1)

///////////////////////////////////////// ((fade in all section)) ////////////////////////////////////
const allSection = document.querySelectorAll('.section')

const allSectionObs = function (entris, observe) {
  const [entry] = entris
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observe.unobserve(entry.target)
}
const allSectionOption = {
  root: null,
  threshold: 0.15,
}

const sectionObserver = new IntersectionObserver(
  allSectionObs,
  allSectionOption
)

allSection.forEach((section) => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//////////////////////////////////////////// ((boxObserver)) /////////////////////////////
// const allTraining = document.querySelector('.train')
// const allTraining = document.querySelectorAll('.train')

// const trainingCallBack = function (entris) {
//   const [entry] = entris
//   console.log(entry)

//   if (!entry.isIntersecting) return
//   entry.target.classList.remove('train-move')
// }

// const trainingOption = {
//   root: null,
//   threshold: 0.1,
// }

// const trainingObserve = new IntersectionObserver(
//   trainingCallBack,
//   trainingOption
// )

// trainingObserve.observe(allTraining)
// allTraining.classList.add('.train-move')
// allTraining.forEach((train) => {
//   trainingObserve.observe(train)
//   train.classList.add('train-move')
// })

///////////////////////////////////////// (lazyimg for section) //////////////////////////////
const lazyImgForSection = document.querySelector('.section-external')
const lazyCallBack = function (entris, observe) {
  const [entry] = entris

  if (entry.isIntersecting) {
    entry.target.classList.remove('blur-img')
  }
}
const lazyImgObserver = new IntersectionObserver(lazyCallBack, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

lazyImgObserver.observe(lazyImgForSection)
lazyImgForSection.classList.add('blur-img')
///////////////////////////////////////////////// (lazy-img [2]) //////////////////////////////////
// const twoLazyImg = document.querySelectorAll('.lazy-img')
// const twoLazyImgObserver = new IntersectionObserver(
//   (entris) => {
//     const [entry] = entris
//     console.log(entry)

//     if (entry.isIntersecting) {
//       entry.target.classList.remove('blur-img2')
//     }
//   },
//   {
//     root: null,
//     threshold: 0,
//   }
// )
// twoLazyImg.forEach(function (img) {
//   img.classList.add('blur-img2')
//   twoLazyImgObserver.observe(img)
// })
///////////////////////////////////////////// (move-slides) /////////////////////////////
const informations = document.querySelectorAll('.informations')
const dotsContainer = document.querySelector('.dots')

let curSlide = 0
let maxSlide = informations.length

const createDots = function () {
  informations.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  })
}
createDots()
const activeDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach((dots) => dots.classList.remove('dots__dot--active'))
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active')
}
activeDots(0)

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset
    console.log(slide)
    goToSlide(slide)
    activeDots(slide)
  }
})

const goToSlide = function (slide) {
  informations.forEach(
    (s, i) => (s.style.transform = `translateX(${130 * (i - slide)}%)`)
  )
}
goToSlide(0)

const timer = function () {
  if (curSlide === maxSlide) {
    curSlide = 0
  } else {
    goToSlide(curSlide++)
    activeDots(curSlide - 1)
  }
}
setInterval(() => {
  timer()
}, 2000)

/////////////////////////////////////////////// ((last - img)) ///////////////////////////////////////////
const room = document.querySelectorAll('.last-img')

let curImg = 0
let maxImg = room.length

const goToImg = function (slide) {
  room.forEach(
    (s, i) => (s.style.transform = `translateX(${55 * (i - slide)}%)`)
  )
}
goToImg(0)

const timerImg = function () {
  if (curImg === maxImg) {
    curImg = 0
  } else {
    goToImg(curImg++)
  }
}
setInterval(() => {
  timerImg()
}, 2000)
