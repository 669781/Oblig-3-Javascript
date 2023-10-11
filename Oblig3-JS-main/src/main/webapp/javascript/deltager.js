class DeltagerManager {

    #regElm;
    #statElm;
    #finndeltagerElm;
    #deltagere
    
    
    
    // Deklarer resterende felt-variabler her

    //hei
    

    constructor(root) {
        this.registeredParticipants = [];
        this.#regElm = root.getElementsByClassName("registrering")[0];

        const regButton = this.#regElm.getElementsByTagName("button")[0];
        regButton.addEventListener("click", () => { this.#registrerdeltager() });

        this.#statElm = root.getElementsByClassName("statistikk")[0];
        const statButton = this.#statElm.getElementsByTagName("button")[0];
        statButton.addEventListener("click", () => { this.#beregnstatistikk() });

        this.#finndeltagerElm = root.getElementsByClassName("deltager")[0];
        const deltagerButton = this.#finndeltagerElm.getElementsByTagName("button")[0];
        deltagerButton.addEventListener("click", () => { this.#finndeltager() });
        
        this.#deltagere = [];
        
        // Fyll evt. inn mer kode
    }
 
    #finndeltager() {
        let mangler = document.getElementById("resman");
        let finnes = document.getElementById("fin");
        let elm = this.#finndeltagerElm.getElementsByTagName("input")[0].value;
        let funnet = 0;
        this.#deltagere.forEach(function (i) {
			console.log(i[0] + " " + elm);
			if(i[0] == elm) {
				console.log("True");
				let nr = document.getElementById("nr");
				nr.innerText="";
				nr.innerText+=" " + i[0];
				let navn = document.getElementById("navn");
				navn.innerText="";
				navn.innerText+=" " + i[1];
				let tid = document.getElementById("tid");
				tid.innerText="";
				tid.innerText+=" " + i[2];
				funnet = 1;
				finnes.classList.remove("hidden");
				mangler.classList.add("hidden");
			}
		});
		if (funnet == 0){
			console.log("False");
			mangler.classList.remove("hidden");
			finnes.classList.add("hidden");
		}
    }
    
    
    
 #beregnstatistikk() {
    let start = document.getElementById("nedregrense").value;
        const slutt = document.getElementById("ovregrense").value;
        let count = 0;
        
        this.#deltagere.forEach(function(i) {
			if (i[2] > start && i[2] < slutt) {
				count++;
			}
		})
		if (start < "0") {
			start = "00:00:00";
		}
		
		let fantclass = document.getElementById("fantclass");
		let fant = document.getElementById("fant");
		fantclass.classList.remove("hidden");
		fant.innerText = count;
		let fantstart = document.getElementById("fantstart");
		fantstart.innerText = start;
		let fantslutt = document.getElementById("fantslutt");
		fantslutt.innerText = slutt;
}



     
    #registrerdeltager() {
	    const tidReg = /\d{0,2}:\d{0,2}:\d{0,2}/;
	    const startnummerReg = /\d{1,3}/;
	    const navnReg = /\p{L}{2,}(?:-\p{L}{2,})?/gu;
	
	    let inputText = this.#regElm.getElementsByTagName("input")[0].value;
	
	    // Finn sluttid
	    const sluttidResult = inputText.match(tidReg);
	    let sluttid = sluttidResult[0];
	    sluttid = this.#FTS(sluttid);
	    if (sluttid == "00:00:00") {
			console.log("Sluttid må være større enn 0");
			return;
		}
	
	    // Fjern sluttid fra input
	    const inputWithoutSluttid = inputText.replace(sluttid, '');
	
	    // Finn de resterende dataene
	    const startnummerResult = inputWithoutSluttid.match(startnummerReg);
	    if (!startnummerResult) {
	        console.log('Feil format for startnummer.' + startnummerResult);
	        return;
	    }
	    const startnummer = startnummerResult[0];
	
	    const navnResult = inputWithoutSluttid.replace(startnummer, '').match(navnReg);
	    if (!navnResult) {
	        console.log("Feil format for navn.");
	        return;
	    }
	    let navn = navnResult[0];
	    for (let i = 1; i < navnResult.length; i++) {
			navn += " " + navnResult[i];
		}
	
	    const deltagerInfo = [startnummer, navn, sluttid]
	
	    // Her kan du gjøre hva du vil med deltagerInfo, for eksempel legge den til i en liste eller sende den til serveren.
	    console.log(deltagerInfo);
	    this.#deltagere.push(deltagerInfo)
		console.log(this.#deltagere);
		
		// Sette korteste tid
		let kortest = "99:99:99";
		this.#deltagere.forEach(function(i) {
			if (i[2] < kortest) {
				kortest = i[2];
			}
		})
		let regres = document.getElementById("regres").classList.remove("hidden");
		let res = document.getElementById("res");
		res.innerText = kortest;
	}


    // Fyll inn evt. hjelpemetoder
    #FTS(inp) {
	  	const deler = inp.split(':');
	
	  	while (deler.length < 3) {
	    	parts.unshift('00');
	  	}
	  	const formattertDeler = deler.map(del => del.padStart(2, '0'));
	  	const formattertTid = formattertDeler.join(':');
	  	return formattertTid;
	}
}




const rootelement = document.getElementById("root");
new DeltagerManager(rootelement);