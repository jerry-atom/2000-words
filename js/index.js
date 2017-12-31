function shuffle(array) {
    let counter = array.length
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--
        let temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
    }
    return array;
}

function renderTable(container, data) {  
    const list = data.map((item, i) => {
        let trans = ""

        if (item.trans) {
            trans = item.trans.map((t) => `<li>${t.join(", ")}</li>`).join("")
        }

        const pron = item.audio
            ? `<button type="button" class="btn btn-outline-info play" data-target="#pron-${i}">
                <i class="icon icon-megaphone"></i>
                ${item.pron}
            </button>
            <audio preload="none" id="pron-${i}">
                <source type="audio/ogg" src="audio/${item.audio}">
            </audio>`
            : `<span class="btn btn-outline-secondary">${item.pron}</span>`

        return `<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#trans-${i}" aria-expanded="false" aria-controls="trans-${i}">${item.word}</button>
                ${pron}
                <div class="collapse" id="trans-${i}"> 
                    <div class="card card-body"> 
                        <ul>${trans}</ul>
                    </div>
                </div>`
    })
        .map((x) => `<li class="list-group-item">${x}</li>`)
        
    
    container.get(0).innerHTML = `${list.join('')}`
}

function randomize($container, data) {
    const $head = $("head")

    items = shuffle(data).slice(0, 10)

    items.filter(item => !!item.audio)
        .forEach((item) => $head.append(`<link rel="preload" href="audio/${item.audio}" as="audio">`))

    renderTable($container, items)
}

$.getJSON("words.json")
    .done((data) => {
        const $container = $("#container")

        $container.on("click", "button.play, button.play *", (element) => {
            try {
                const target = $(element.target).closest("button").data("target")
                const audio = $container.find(target)
                if (audio) {
                    audio.get(0).play()
                }
            } catch (e) {
                alert(e)
            }
        })

        $("#randomize").on("click", () => randomize($container, data))

        randomize($container, data)
    })
    .fail(alert)
