// modal-----
$('#reg_btn,#login_btn').on('click', () => {
  $('body,#navbar').css({
    overflow: 'auto',
    'padding-right': 0
  })
})

// Section03 生物種族 -----------------------------------------------------
$('#race a').on('click', function () {
  $('#race a').removeClass('active')
  $(this).addClass('active')
})

//  section05 文學作品 -----------------
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  speed: 1000,
  spaceBetween: 15,
  centeredSlides: true,
  // autoplay: {
  //   delay: 5000
  // },
  slidesPerView: 'auto',
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  breakpoints: {
    576: {
      slidesPerView: '2'
    },
    768: {
      slidesPerView: '3'
    },
    920: {
      slidesPerView: '3'
    },
    1200: {
      slidesPerView: '4'
    }
  },

  pagination: {
    el: '.swiper-pagination'
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})

// gsap------------------------

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText)

// 要把 scss_bs 的 _variables.scss 裡
// $enable-smooth-scroll: false !default;
// 改成 false

// ScrollToPlugin 滑動效果--------------------
$('#navbar .main-link, .backtop a').each(function (index, link) {
  $(this).on('click', function (e) {
    e.preventDefault()
    if ($(this).attr('href') === '#section04' || $(this).attr('href') === '#section05') {
      gsap.to($(window), {
        scrollTo: {
          y: `#section0${index + 1}`
        },
        duration: 1.5,
        ease: 'back.inOut'
      })
    } else {
      gsap.to($(window), {
        scrollTo: {
          y: `#section0${index + 1}`,
          offsetY: 200
        },
        duration: 1.5,
        ease: 'back.inOut'
      })
    }
  })
})

// 導覽列滾動收盒------------------
gsap.from('#navbar', {
  yPercent: -100,
  paused: false,
  duration: 0.5,
  scrollTrigger: {
    start: 'top 60',
    end: () => '+=' + document.documentElement.scrollHeight, //end 為整份文件高度
    onEnter(self) {
      self.animation.play()
    },

    onUpdate(self) {
      // self.direction -1 捲動軸往上
      self.direction === -1 ? self.animation.play() : self.animation.reverse()
    },
    markers: false
  }
})

// scrollTrigger----------------------

// backtop 回頂端顯示隱藏
gsap.to('.backtop', {
  scrollTrigger: {
    trigger: '#footer',
    start: 'top bottom',
    end: '100% bottom',
    toggleActions: 'play none none reverse'
    // markers: true
  },
  display: 'block',
  opacity: 1,
  duration: 1
})

// 導覽列
$('.main-link').each(function (index, link) {
  let href = $(link).attr('href') //抓連結href的值
  // console.log(href)
  gsap.to(link, {
    scrollTrigger: {
      trigger: `${href}`,
      start: 'top center',
      end: 'bottom center',
      toggleClass: {
        targets: link,
        className: 'active'
      }
      // markers: true
    }
  })
})

// 流星
// 1.流星數目
function createStar(starNumber) {
  for (let i = 0; i < starNumber; i++) {
    $('.shooting_star').append('<div class="star"></div>')
  }
  const stars = gsap.utils.toArray('.star')

  return stars
}
// 2.設定流星補間動畫
function setStarTween(stars) {
  gsap.set('.shooting_star', {
    perspective: 800
  })
  stars.forEach(function (star, index) {
    gsap.set(star, {
      transformOrigin: '0 50%',
      position: 'absolute',
      left: gsap.utils.random($(window).width() / 2, $(window).width() * 2),
      top: gsap.utils.random(-100, -200),
      rotation: -50
    })
  })
  console.log(stars)
  return stars
}

// 3.播放流星動畫

function playStarTimelines(stars) {
  const tl = gsap.timeline({
    repeat: -1
  })

  tl.to(stars, {
    x: `-=${$(window).width() * 1.2}`, //流星往左
    y: `+=${$(window).height() * 1.5}`, //流星往下
    z: `random(-100,500)`,

    stagger: function (index, star, stars) {
      return gsap.utils.random(index + 5, (index + 5) * 2, 1)
    },
    duration: 'random(0.5,3,0.1)',
    ease: 'none'
  })
}

// 執行管道流程，按照設定的步驟去跑
const playStar = gsap.utils.pipe(createStar, setStarTween, playStarTimelines)
playStar(30)

// 視差效果-----------------------------------
// 星空背景
gsap.to('body', {
  scrollTrigger: {
    trigger: 'body',
    start: 'top 0',
    end: 'bottom 0',
    scrub: 5
    // markers: true
  },
  backgroundPosition: '50% 100%',
  ease: 'none'
})

// 浮空島
const float_tl = gsap.timeline({
  scrollTrigger: {
    trigger: 'body',
    start: 'top 100%',
    end: 'bottom 100%',
    scrub: 5
    // markers: true
  },
  ease: 'none'
})

// 1.使用 timeline操作進場位置
float_tl
  .from('.float-wrap-01', {
    left: '-30%'
  })
  .from(
    '.float-wrap-02',
    {
      right: '-30%'
    },
    '<'
  ) //,'<' 這樣是跟第一個一起進場
  .from(
    '.float-wrap-03',
    {
      bottom: '-100%'
    },
    '<'
  )
// 2.自身上下浮動的動畫

$('.float-island').each(function (index, island) {
  gsap.to(island, {
    y: 50 * (index + 1),
    duration: 10 * (index + 1),
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })
})

// 霧
$('.fog').each(function (index, fog) {
  // gsap.set() 設定 duration 為0的fog補間動畫，為他們設定css屬性
  gsap.set(fog, {
    width: '100%',
    height: '100%',
    background: `url(./images/fog.png) no-repeat center/80%`,
    opacity: 0.8,
    position: 'absolute',
    top: 'random(0,100)' + '%',
    x: function () {
      return index % 2 == 0 ? -$(window).width() : $(window).width()
    }
  })
  // 動畫
  gsap.to(fog, {
    x: function () {
      return index % 2 == 0 ? $(window).width() : -$(window).width()
    },
    repeat: -1,
    duration: 30,
    ease: 'none',
    onRepeat() {
      $(fog).css({
        top: gsap.utils.random(0, 100) + '%'
      })
    }
  })
})

// splitText------------------
gsap.set('#splitText', {
  perspective: 400
})

const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 8
})

// 將段落轉成陣列
const paragraphs = gsap.utils.toArray('#splitText p')
// 再將陣列切割文字
const splitTexts = paragraphs.map(function (p) {
  return new SplitText(p, {
    charsClass: 'charBg'
  })
})
console.log(splitTexts)

splitTexts.forEach(splitText => {
  const chars = splitText.chars
  tl.from(
    chars,
    {
      y: 80,
      rotationX: 0,
      rotationY: 180,
      scale: 2,
      transformOrigin: '0% 50% -100',
      opacity: 0,
      duration: 2,
      ease: 'back',
      stagger: 0.1,
      onComplete() {
        gsap.to(chars, {
          delay: 3,
          duration: 2,
          opacity: 0,
          y: 80,
          rotationX: 150,
          rotationY: 0,
          scale: 2,
          transformOrigin: '0% 50% -100',
          ease: 'back',
          stagger: 0.1
        })
      }
    },
    '+=3'
  )
})
