const header = [];

function makeItem(item) {

	let html = `<tr class="item" data-code="${item[rest_code]}">`;
	if (header.length < 1) 
		Array.prototype.push.apply(header, Object.keys(item));
	
	for (let i = 0; i < header.length; i++) {
		let value_ = "";
		if (item[header[i]])
			value_ = item[header[i]];
		html += `<td class="${header[i]}">${value_}</td>`;

	}
	html += `<td><button type="button" id="updateBtn">변경</button><button type="delete" id="deleteBtn">삭제</button></td></tr>`;
	
	return html;
}

function movePage() {

	$.ajax(rest_url, {
		method: "GET",
		contentType: "application/json",
		dataType: "json",
		success: result => {
			const list = result;
			if (list && list.length > 0) {
				const tbody = $("#tbody");
				tbody.children().remove();

				let html = "";
				for (let i = 0; i < list.length; i++) {
					html += makeItem(list[i]);
				}
				tbody.append(html);
			}
		},
		error: xhr => alert(`오류 발생: ${xhr.statusText}`)
	});
}

$(function() {
	const tbody = $("#tbody");
	movePage();  
	$("#addBtn").on('click', function() {

		let form = this.closest("#addForm").querySelectorAll("input");
		let item = {};
		for(let i = 0; i < form.length; i++)
			item[form[i].name] = form[i].value;
		
		if(document.getElementById("tbody").querySelectorAll(".item").length < 1)
			tbody.children().remove();

		$.ajax(rest_url, {
			method: "post",
			contentType: "application/json",
			dataType: "json",
			data:  JSON.stringify(item),
			success: result => {
				const list = result;
				if(list) {
					let html = "";
					html += makeItem(list);
					tbody.append(html);
					modal = document.getElementById("addModal");
		 			modal.classList.toggle("hidden");
					
					for(let i = 0; i < form.length; i++){
						form[i].value = "";
					}

				}
			},
			error: xhr => alert(`오류 발생: ${xhr.statusText}`)
		});
	});
	
	$("tbody").on('click','#deleteBtn', function() {
		let code = this.closest(".item").getAttribute("data-code");
		
			$.ajax(rest_url+`/${code}`, {
			method: "DELETE",
			contentType: "application/json",
			dataType: "json",
			success: result => {
				
				if(result) {
					let tr = this.closest("tr")
					tr.remove();
					if(document.getElementById("tbody").querySelectorAll(".item").length < 1){
						let html = rest_none;
						tbody.append(html);
					}


				}
			},
			error: xhr => alert(`오류 발생: ${xhr.statusText}`)
		});
	});
	
	$("#open").on('click', function() {
		modal = document.getElementById("addModal");
		modal.classList.toggle("hidden");
	});
		
	$("#close").on('click', function() {
		modal = document.getElementById("addModal");
		modal.classList.toggle("hidden");
	});


});