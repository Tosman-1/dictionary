let word = document.getElementById('sInput')
const searchBtn = document.getElementById('search')
let keyword = document.getElementById('word')
let phonetic = document.getElementById('phone')
const meaning = document.getElementById('meanings')
const meanDiv = document.createElement('div')
const bgToggle = document.getElementById('bgcChk')
const font = document.getElementById('fonts')
let light = document.getElementById('light')
let dark = document.getElementById('dark')



document.body.style.fontFamily = `${font.value}`

font.addEventListener('change', () => {
  document.body.style.fontFamily = `${font.value}`
})

checkSysMode()

function checkSysMode() {
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ?
    (bgToggle.checked = true,
    Toggle())
   : 
   ( bgToggle.checked = false,
    Toggle())
}

function Toggle() {
  !bgToggle.checked?
    mode('white','#222','block','none')
  :
    mode('#222',"white",'none','block')
}

function mode(bl,w,n,b) {
  document.body.style.backgroundColor = bl;
  document.body.style.color = w;
  light.style.display = n
  dark.style.display = b
}

bgToggle.addEventListener('click', Toggle)

searchBtn.addEventListener('click', getSearchedWord )

word.addEventListener('keypress', (ev)=> {
  if (ev.key === "Enter") {
    getSearchedWord()
  }
})

function getSearchedWord() {
  keyword.innerText = ''
  phonetic.innerText = ''
  meaning.innerHTML = ''
if (word.value.trim() == '') {
  alert('input a word to search')
  return
}
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`)
    .then((res) => res.json())
     .then((data) => {
      console.log(data);
    
      if (data.message) {
        console.log(data.message);
        let errdiv = document.createElement('div')
        errdiv.innerText = data.message
        errdiv.classList.add('err')
        meaning.appendChild(errdiv)
      } else {
       
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
                  syndiv.classList.add('syncl')
  
                  syndiv.innerHTML = `<span class="synh"> Synonyms</span> 
                                      <span class="syntx">${def.synonyms.join(',')}</span>`
  
                  meaning.appendChild(syndiv)
                }
                  
            })
        });
      }
     })
     .catch((err) => {
      console.log(err);
     })
}