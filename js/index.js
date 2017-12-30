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
    container.get(0).innerHTML = data.map((item) => {
        let trans = ""
        let pron = ""

        if (item.trans) {
            trans = item.trans.map((t) => t.join(", ")).join("<hr>")
        }
        if (item.audio) {
            pron = `
            <button type="button" class="btn btn-outline-info" data-target="${item.audio}">${item.pron}</button>
            <audio preload="none" data-source="${item.audio}">
                <source type="audio/ogg" src="audio/${item.audio}">
            </audio>`
        } else {
            pron = `
            <span class="btn btn-outline-secondary">${item.pron}</span>`
        }

        return `<div class="row">
            <div class="col-sm"><b>${item.word}</b><br>${pron}</div>
            <div class="col-sm">${trans}</div>
        </div>`
    }).join('')
}

$.getJSON("words.json")
    .done((data) => {
        const $container = $("#container")

        $container.on("click", "button", (element) => {
            try {
                const target = $(element.target).data("target")
                const audio = $container.find(`audio[data-source="${target}"]`)
                if (audio) {
                    audio.get(0).play()
                }
            } catch (e) {
                alert(e)
            }
        })

        const $head = $("head")
        const items = shuffle(data).slice(0, 10)

        items.filter(item => !!item.audio)
            .forEach((item) => $head.append(`<link rel="preload" href="audio/${item.audio}" as="audio">`))

        renderTable($container, items)

    })
    .fail(alert)