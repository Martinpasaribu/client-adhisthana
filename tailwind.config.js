/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  // mode: "jit",

  darkMode: 'class',
  
  theme: {

    screens: {

      // Layar Hp ukuran minimum       (Potrait)
      'hp': '370px',
      
      // Layar Hp ukuran Umum          (Potrait)
      'hp1': '390px',
      
      // Layar Hp ukuran maximum       (Potrait)
      'hp2': '425px',

      'hp3': '500px',
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      
      // Layar Hp ukuran Minumum       (Landscape)
      'hp4': '740px',

      'hpDesktop': '980px',

      // Layar Tablet ukuran Minumum   (Potrait)
      'md': '768px',

      'md1': '870px',
      // Layar Tablet ukuran Umum      (Landscape)
      'md2': '1160px',

      // Layar Tablet ukuran maximum   (Landscape)
      'md3': '1440px',


      // Layar Laptop ukuran Minumum
      'xl': '1024px',
      
      
      'xl2': '1356px',

      // Layar Laptop ukuran Maximum
      'xl3': '1536px',

      
      // Layar PC ukuran Minumum
      'pc': '1706px',

      // Layar Tablet ukuran Medium
      'pc1': '1920px',


      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {


      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
      },

      keyframes: {
        bag: {
          '0%': {  opacity: '0' },
          '100%': {  opacity: '1' },
        },
        modal: {
          '0%': {  opacity: '0' },
          '100%': {  opacity: '1' },
        },
        source: {
          '0%': { transform: 'translateX(30%)', opacity:'0'},
          '100%': { transform: 'translateX(0%)', opacity:'1' },
        },
        fall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        spin_slow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        lompat: {
          '100%, 80%, 60%, 50%, 40%, 20%, 10%, 0%': {
            transform: 'translateY(0) scaleY(1)', // Posisi awal dan akhir, dan posisi tengah
          },
          '30%': {
            transform: 'translateY(-6px) scaleY(0.95)', // Posisi puncak lompatan, mengurangi tinggi elemen
          },
          '70%': {
            transform: 'translateY(-1px) scaleY(1.05)', // Kembali ke posisi normal sambil menambah tinggi elemen
          },
        },

        muncul: {
          '0%': { opacity: 0, transform: 'scale(0.5) translateY(-40px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },

        sidebar_in: {
          '-00%': { opacity:0 , transform: 'translateX(-10%)' }, /* Mulai dari di luar layar sebelah kanan */
          '100%': { opacity:1 , transform: 'translateX(0%)' }, /* Akhir di luar layar sebelah kiri */
        },
        sidebar_out: {
          ' 0%': { opacity:1 , transform: 'translateX(0)' }, /* Mulai dari di luar layar sebelah kanan */
          '100%': { opacity:0 , transform: 'translateX(-100%)' }, /* Akhir di luar layar sebelah kiri */
        },

        nav_in: {
          '0%': { transform: 'translateX(0%)' }, /* Mulai dari di luar layar sebelah kanan */
          '100%': {  transform: 'translateX(28%)' }, /* Akhir di luar layar sebelah kiri */
        },

      },
      animation: {
        bag: 'bag .7s ease-in-out forwards',
        modal: 'bag 1s ease-in-out forwards',
        source: 'source 1s ease-in-out ', 
        falls: 'fall 3s linear infinite',
        spin_slow: 'spin_slow 5s linear infinite',
        jumps:'lompat 2s ease-in-out infinite',
        sidebar_in: 'sidebar_in 1s ease-in-out forwards',
        sidebar_out: 'sidebar_out 1s ease-in-out forwards',
        nav_in: 'nav_in 1s ease-in-out forwards',

        muncul: 'muncul 1s ease-in-out forwards',
        jump1: 'lompat 2s ease-in-out infinite',
        jump2: 'lompat 2.2s ease-in-out infinite',
        jump3: 'lompat 2.3s ease-in-out infinite',
        jump4: 'lompat 2.4s ease-in-out infinite',
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        varela: ['Varela', 'sans-serif'],
        lora: ['Lora', 'sans-serif'],
        Twinkle: ['Twinkle Star','cursive'],

        
      },
      transitionProperty: {
        'opacity': 'opacity',
        'transform': 'transform',
      },     
       opacity: {
        '90': '0.9',
      },
      fontWeight: {
        'lora': '500',
        'varela': '700',
        'Twinkle': '400',
        '': '',
      },
      fontStyle: {
        'lora': 'SemiBold',
        'varela': 'Normal',
        'Twinkle': 'Semibold',
      },
      colors: {
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#1C6CB2",
          100: "#F5F8FF",
        },
        "reds": "#FF3C00FF",
        "primary1": "#E42727",
        "color1": "#C0562F",
        "color2": "#212636",
        "color3": "#EEEEEE",
        "color4": "#D9D9D9",
      
        
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
      backgroundImage: {
        
        'sepeda_bg': "url(/assets/background/sepeda.jpeg)",
        'room_bg': "url(/assets/background/rooms.jpeg)",
        'about_bg': "url(/assets/background/borobudur.jpeg)",
        'bottom_bg': "url(/assets/background/borobudur2.jpeg)",
      },
      listStyleImage: {
        pens: 'url("/assets/icons/pen.png")',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};