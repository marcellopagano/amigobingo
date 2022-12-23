const celle = document.querySelectorAll('.item')
const comboRange = document.getElementById('combo-range')
const genera = document.getElementById('genera')
const risultato = document.getElementById('risultato')
const btnClose = document.getElementById('btn-close')

const numeri = []
let numeriFissi = []

// genera i numeri da 1 a 28
void function creaNumeri() {
    for (let i = 1; i < 29; i++) {
        numeri.push(i)
    }
}()
// The Fisher-Yates algorith 
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        [array[i], array[j]] = [array[j], temp];
    }
}

// numero combinazioni
comboRange.addEventListener('input', function () {
    genera.textContent = `genera ${comboRange.value} combo`
})
// genera tot combinazioni di 7 numeri 
genera.addEventListener('click', () => {
    const combinazione = []
    let tmpNumeri = [...numeri]
    risultato.textContent = ''
    const n = 7 - numeriFissi.length
    tmpNumeri = tmpNumeri.filter(num => !numeriFissi.includes(num))

    for (let i = 0; i < comboRange.value; i++) {
        shuffleArray(tmpNumeri)
        const tmp = [...numeriFissi, ...tmpNumeri.slice(0, n)].sort((a, b) => a - b)
        combinazione.push(tmp)
        const p = document.createElement('p')

        combinazione[i].forEach(num => {
            const spanNumero = document.createElement('span')
            console.log(numeriFissi.every(n => n == num))
            if (numeriFissi.some(n => n == num)) {
                spanNumero.textContent = num
                spanNumero.classList.add('numero', 'numero-colore-fisso')
                p.appendChild(spanNumero)
            } else {
                spanNumero.textContent = num
                spanNumero.classList.add('numero', 'numero-colore')
                p.appendChild(spanNumero)
            }


        })

        risultato.appendChild(p)
    }
    risultato.style.display = 'block'
    btnClose.style.display = 'block'
})
// gestione celle - numeriFissi[]
celle.forEach(e => {
    e.addEventListener('click', function () {
        const value = this.textContent
        if (numeriFissi.includes(+value)) {
            numeriFissi = numeriFissi.filter(num => num != value)
        } else if (numeriFissi.length > 3) {
            return
        } else {
            numeriFissi.push(+value)
        }
        this.classList.toggle('numero-colore-fisso')
    })
})

btnClose.addEventListener('click', function () {
    risultato.style.display = 'none'
    this.style.display = 'none'
})

genera.textContent = `genera ${comboRange.value} combo`
