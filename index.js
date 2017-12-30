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