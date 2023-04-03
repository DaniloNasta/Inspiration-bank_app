fetch("./MOCK_DATA.json")
.then((response) => response.json())
.then((json) => {
    const jsonClone = structuredClone(json)
    
    let valoriSomma= []
    jsonClone.forEach(el => {
        valoriSomma.push(el.amount)
    });
    
    let totale = 0;
    for (let i = 0; i < valoriSomma.length; i++) {
        totale += valoriSomma[i];       
    }
    
    let showTotale = document.querySelector('#showTotale')
    let p = document.createElement('p')
    p.classList.add('text-start', 'card-text', 'fw-bold')
    p.innerHTML = `${totale.toFixed(2)}$`;
    showTotale.appendChild(p)
    
    const sumNegative = valoriSomma.filter(element => element<0).reduce((acc, el) => acc+el)
        
    let showUscite = document.querySelector('#showUscite')
    let p2 = document.createElement('p')
    p2.classList.add('text-start', 'card-text', 'text-danger', 'font-s')
    p2.innerHTML = `<i class="bi bi-graph-down-arrow text-danger"></i> ${sumNegative}$`;
    showUscite.appendChild(p2)
    
    const sumPositive = valoriSomma.filter(element => element>0).reduce((acc, el) => acc+el)
    
    let showEntrate = document.querySelector('#showEntrate')
    let p3 = document.createElement('p')
    p3.classList.add('text-start', 'card-text', 'text-success', 'font-s')
    p3.innerHTML = `<i class="bi bi-graph-up-arrow text-success"></i> +${sumPositive}$`;
    showEntrate.appendChild(p3)
    
        
    let showWrapper = document.querySelector('#showWrapper');

    let sortDate = jsonClone.sort(function(a, b) {
        var parseDate = function parseDate(dateAsString) {
            var dateParts = dateAsString.split("/");
            return new Date(parseInt(dateParts[2], 10), parseInt(dateParts[0], 10) - 1, parseInt(dateParts[1], 10));
        };
        
        return parseDate(b.operation_date) - parseDate(a.operation_date);
    }).slice(0,4);
    
    sortDate.forEach((dataCard) => {
        let div = document.createElement('div')
        let amount_state = (dataCard.amount >= 0) ? "text-success" : "text-danger";
        div.classList.add('col-12', 'px-3')
        div.innerHTML = `
        <h6 class="font-s">${dataCard.operation_name}</h6>
        <p class="small mb-0 font-s text-muted">Card: ${dataCard.bank_type_card}</p>
        <p class="small mb-0 font-s text-muted">Country: ${dataCard.country}</p>
        <p class="small mb-0 font-s text-muted">Category: ${dataCard.operation_category}</p>
        <div class="d-flex justify-content-between">
        <p class="small mb-0 font-s text-muted">Date: ${dataCard.operation_date}</p>
        <p class="small mb-0 font-s ${amount_state}">${dataCard.amount}$</p>
        </div>
        <hr>
        `;
        showWrapper.appendChild(div)
    })


})