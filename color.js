const optinData= document.getElementById("form").innerHTML=`
    <input class="colorpick" id="colorpick" type="color" value="#000000">
    <select name="schemes" id="schemes"  >
    <option value="monochrome">Monochrome</option>
    <option value="monochrome-dark">Monochrome-dark</option>
    <option value="monochrome-light">Monochrome-light</option>
    <option value="analogic">Analogic</option>
    <option value="complement">Complement</option>
    <option value="analogic-complement">Analogic-complement</option>
    <option value="triad">Triad</option>
    </select>
    <button id="btn">Get color scheme</button>
`
const selectedScheme = document.getElementById('schemes')
const colorPick = document.getElementById('colorpick')
const colorDiv = document.getElementById('colorDiv')

// Set the default color scheme on page load
window.onload = function() {
  colorPick.value = "#000000";
}

document.getElementById('btn').addEventListener('click', (e) => {
    e.preventDefault()
    const hexColor = colorPick.value.replace("#", '')
    const selectedSchemeType = selectedScheme.value

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${selectedSchemeType}&count=8`)
        .then(res => res.json())
        .then(data => {
        const colors = data.colors.map(color => color.hex.value)
      
      // Clear the colorDiv element before adding new color elements
      colorDiv.innerHTML = '';

      // Create a new color element for each color
      colors.forEach(color => {
            const colorElement = document.createElement('div')
            colorElement.style.backgroundColor = color
            colorElement.classList.add('color')
      
            const hexText = document.createTextNode(color)
            const hexElement = document.createElement('div')
            hexElement.appendChild(hexText)
            hexElement.classList.add('hex')
        
            colorElement.appendChild(hexElement)
            colorDiv.appendChild(colorElement)

        // Add event listener to copy hex code to clipboard
        colorElement.addEventListener('click', (e) => {
            e.stopPropagation()
            const hexCode = e.target.innerText
            navigator.clipboard.writeText(hexCode).then(() => {
                const copiedMessage = document.createElement('div')
                copiedMessage.classList.add('copied-message')
                copiedMessage.innerText = 'Copied!'
                colorElement.appendChild(copiedMessage)

                setTimeout(() => {
                colorElement.removeChild(copiedMessage)
            }, 400)
          })
        })
      })
    })
})









