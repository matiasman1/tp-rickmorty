import './style.css'

// URL de la API
const API_URL = 'https://rickandmortyapi.com/api/character'

// Array para guardar todos los personajes
let allCharacters = []

// Función para traer todos los personajes de la API
async function fetchAllCharacters() {
  try {
    let allResults = []
    let nextUrl = API_URL
    
    // Iteramos por todas las páginas
    while (nextUrl) {
      const response = await fetch(nextUrl)
      const data = await response.json()
      allResults = [...allResults, ...data.results]
      nextUrl = data.info.next
    }
    
    return allResults
  } catch (error) {
    console.error('Error trayendo los personajes:', error)
    return []
  }
}

// Función para traer detalles de episodios
async function fetchEpisodeDetails(episodeUrls) {
  try {
    const episodePromises = episodeUrls.map(url => fetch(url).then(res => res.json()))
    const episodes = await Promise.all(episodePromises)
    return episodes
  } catch (error) {
    console.error('Error trayendo episodios:', error)
    return []
  }
}

// Función para filtrar personajes con regex
function filterCharacters(characters, searchTerm) {
  if (!searchTerm.trim()) return characters
  
  try {
    // Creamos una regex que ignore mayúsculas/minúsculas
    const regex = new RegExp(searchTerm.trim(), 'i')
    
    return characters.filter(character => {
      // Buscamos en nombre y especie
      return regex.test(character.name) || regex.test(character.species)
    })
  } catch (error) {
    // Si la regex es inválida, buscamos con string normal
    const lowerSearchTerm = searchTerm.toLowerCase()
    return characters.filter(character => {
      return character.name.toLowerCase().includes(lowerSearchTerm) || 
             character.species.toLowerCase().includes(lowerSearchTerm)
    })
  }
}

// Función para crear tarjeta de personaje
function createCharacterCard(character) {
  const card = document.createElement('div')
  card.className = 'character-card'
  
  const statusColors = {
    'Alive': '#4caf50',
    'Dead': '#f44336',
    'unknown': '#ff9800'
  }
  
  card.innerHTML = `
    <div class="character-image">
      <img src="${character.image}" alt="${character.name}" />
    </div>
    <div class="character-info">
      <h3 class="character-name">${character.name}</h3>
      <p class="character-species">${character.species}</p>
      <p class="character-status" style="color: ${statusColors[character.status] || '#666'}">
        <span class="status-dot" style="background-color: ${statusColors[character.status] || '#666'}"></span>
        ${character.status}
      </p>
      <button class="episodes-btn" data-character-id="${character.id}">
        Ver Episodios (${character.episode.length})
      </button>
    </div>
  `
  
  return card
}

// Función para crear modal de episodios
function createEpisodesModal(character, episodes) {
  const modal = document.createElement('div')
  modal.className = 'episodes-modal'
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Episodios de ${character.name}</h3>
        <button class="close-btn">&times;</button>
      </div>
      <div class="episodes-list">
        ${episodes.map(episode => `
          <div class="episode-item">
            <h4>${episode.name}</h4>
            <p><strong>Episodio:</strong> ${episode.episode}</p>
            <p><strong>Fecha:</strong> ${episode.air_date}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `
  
  // Funcionalidad para cerrar el modal
  const closeBtn = modal.querySelector('.close-btn')
  closeBtn.addEventListener('click', () => {
    modal.remove()
  })
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
  
  return modal
}

// Función para renderizar personajes en la grilla
function renderCharactersGrid(characters) {
  const grid = document.querySelector('.characters-grid')
  
  // Limpiamos la grilla
  grid.innerHTML = ''
  
  if (characters.length === 0) {
    grid.innerHTML = '<div class="no-results">No se encontraron personajes</div>'
    return
  }
  
  // Agregamos cada personaje a la grilla
  characters.forEach(character => {
    const card = createCharacterCard(character)
    grid.appendChild(card)
  })
  
  // Agregamos event listeners para los botones de episodios
  addEpisodesButtonListeners(characters)
}

// Función para agregar event listeners a los botones de episodios
function addEpisodesButtonListeners(characters) {
  const episodesBtns = document.querySelectorAll('.episodes-btn')
  episodesBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const characterId = e.target.dataset.characterId
      const character = characters.find(c => c.id == characterId)
      
      if (character) {
        btn.textContent = 'Cargando episodios...'
        btn.disabled = true
        
        const episodes = await fetchEpisodeDetails(character.episode)
        const modal = createEpisodesModal(character, episodes)
        document.body.appendChild(modal)
        
        btn.textContent = `Ver Episodios (${character.episode.length})`
        btn.disabled = false
      }
    })
  })
}

// Función principal para renderizar la aplicación
async function renderApp() {
  const app = document.querySelector('#app')
  app.innerHTML = `
    <div class="header">
      <h1>Personajes de Rick and Morty</h1>
      <p>Explore todos los personajes del universo de Rick and Morty</p>
      <div class="search-container">
        <input 
          type="text" 
          id="search-input" 
          placeholder="Buscar por nombre o especie (puede usar regex)..."
          class="search-input"
        />
        <div class="search-info">
          <span id="character-count">Cargando personajes...</span>
        </div>
      </div>
    </div>
    <div class="loading">Cargando todos los personajes...</div>
    <div class="characters-grid"></div>
  `
  
  // Traemos todos los personajes
  allCharacters = await fetchAllCharacters()
  const loadingEl = document.querySelector('.loading')
  const characterCount = document.querySelector('#character-count')
  
  if (allCharacters.length === 0) {
    loadingEl.textContent = 'Error cargando personajes. Intente nuevamente más tarde.'
    return
  }
  
  loadingEl.remove()
  characterCount.textContent = `${allCharacters.length} personajes encontrados`
  
  // Renderizamos todos los personajes inicialmente
  renderCharactersGrid(allCharacters)
  
  // Configuramos la búsqueda dinámica
  setupSearch()
}

// Función para configurar la búsqueda dinámica
function setupSearch() {
  const searchInput = document.querySelector('#search-input')
  const characterCount = document.querySelector('#character-count')
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value
    const filteredCharacters = filterCharacters(allCharacters, searchTerm)
    
    // Actualizamos el contador
    if (searchTerm.trim()) {
      characterCount.textContent = `${filteredCharacters.length} de ${allCharacters.length} personajes`
    } else {
      characterCount.textContent = `${allCharacters.length} personajes encontrados`
    }
    
    // Renderizamos los personajes filtrados
    renderCharactersGrid(filteredCharacters)
  })
}

// Inicializamos la aplicación
renderApp()
