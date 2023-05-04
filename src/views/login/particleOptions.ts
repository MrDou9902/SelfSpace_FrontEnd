export default {
  // background: {
  //   image: 'url(http://localhost:8000/cat&fish.webp)',
  //   repeat: 'no-repeat',
  //   size: 'cover'
  // },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'repulse'
      },
      onHover: {
        enable: true,
        mode: 'grab'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#bac4cc7a',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 2,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: ['line', 'circle']
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}
