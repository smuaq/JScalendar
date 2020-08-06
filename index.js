let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthAndYear = document.getElementById("monthAndYear");
this.selectedDates = [];
showCalendar(currentMonth, currentYear);

function setDate(date){
    this.selectedDates.push({"Value": date})
}

function isDuplicate(date){
    return this.selectedDates.find(d => d.Value === date);
}

function removeDate(date){
    this.selectedDates = this.selectedDates.filter(d => d.Value !== date);
}

function showSelectedDates(){
	console.log(this.selectedDates);
}

function highlightColumn(isChecked, index){
	let tbl = document.getElementById("calendar-body");
    let rows = tbl.getElementsByTagName("tr");
    let sz = rows.length;
	for(let n = 0; n < sz; ++n) {
        let cell = n == -1 ? rows[n].getElementsByTagName("th")[index] : rows[n].getElementsByTagName("td")[index];
		if(cell && cell.innerHTML !== ""){
			if(cell.classList.contains('unselectable')){
				continue;
			}
			if(isChecked){
				cell.classList.add('selectedDate');
				if(this.selectedDates.length > 0){
				    if(!isDuplicate(cell.dataset.numDate)){
                        setDate(cell.dataset.numDate);
                    }
                }
			} else {
				cell.classList.remove('selectedDate');
				removeDate(cell.dataset.numDate);
			}
		}
    }
}

function dateCompare(date1, date2){
	let future = new Date();
	future.setDate(future.getDate() + 30);
    return (new Date(date2) >= new Date(date1) && new Date(date2) <= new Date(future));
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
                let cell = document.createElement("td");
				let thisDate = `${year}-${(month+1) < 10 ? '0'+(month+1) : month+1}-${date < 10 ? '0'+date : date}`;
				let currentDate = new Date().toJSON().slice(0, 10);
				cell.setAttribute("data-num-date", thisDate);
				cell.addEventListener("click", function(e){
					if(cell.classList.contains('unselectable')){
						return;
					}
					if(cell.classList.contains('selectedDate')){
						cell.classList.remove('selectedDate');
                        removeDate(cell.dataset.numDate);
					} else {
						cell.classList.add("selectedDate");
						setDate(e.srcElement.dataset.numDate);	
					}
				});
                let cellText = document.createTextNode(date);
				if(!dateCompare(currentDate, thisDate)){
					cell.classList.add("unselectable");
				} else {
				    if(this.selectedDates.length > 0){
                        this.selectedDates.find((d)=>{
                            if(d.Value === thisDate){
                                cell.classList.add("selectedDate");
                            }
                        });
                    }
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}
