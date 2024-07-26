let word = document.getElementById('sInput')
const searchBtn = document.getElementById('search')
let keyword = document.getElementById('word')
let phonetic = document.getElementById('phone')
let meaning = document.getElementById('meanings')
const meanDiv = document.createElement('div')
const bgToggle = document.getElementById('bgcChk')
let light = document.getElementById('light')
let dark = document.getElementById('dark')

function toggle() {
  if (!bgToggle.checked) {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    dark.style.display = 'none'
    light.style.display = 'block'
  } else {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    light.style.display = 'none'
    dark.style.display ='block'
  }
}

bgToggle.addEventListener('click', toggle)

searchBtn.addEventListener('click', ()=>{
  meaning.innerHTML = ''
if (word.value.trim() == '') {
  alert('input a word to search')
  return
}
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`)
    .then((res) => res.json())
     .then((data) => {
      console.log(data)
      data.forEach(elem => {
        // meaning.innerText= ''
        console.log(elem.word)
        keyword.innerText = elem.word
        console.log(elem.phonetic);
        phonetic.innerText = elem.phonetic
        
          elem.meanings.forEach(def => {
          const meanP = document.createElement('p')
          const pos = document.createElement('div')

          pos.innerHTML = `<h3>${def.partOfSpeech}</h3> <hr />`
          pos.classList.add('pos')
          meanP.classList.add('meantxt')
          // const uList = document.createElement('ul')
          meaning.appendChild(pos)
          meaning.appendChild(meanP)

              def.definitions.forEach(defis => {
                const uList = document.createElement('ul')
                meanP.textContent = 'Meaning'
                uList.innerHTML += `<li>${defis.definition}</li>`
                uList.classList.add('ulist')
                meaning.appendChild(uList)

                if (defis.example) {
                  const exp = document.createElement('p')
                  exp.innerText = `"${defis.example}"`
                  exp.classList.add('exptxt')
                  console.log(defis.example);
                  meaning.appendChild(exp)
                }
        
              });

              if (def.synonyms.length !== 0) {
                let syndiv = document.createElement('div')

                syndiv.innerHTML = `<span class="synh"> Synonyms</span> 
                                    <span class="syntx">${def.synonyms.join(',')}</span>`

                meaning.appendChild(syndiv)
              }
                
          })
      });
     })
})