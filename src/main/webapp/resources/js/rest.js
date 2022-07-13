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
	html += `<td><span class="update">변경</span><span class="delete">삭제</span></td></tr>`;
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

	movePage();  
	$("#addBtn").on('click', function() {
		let form = this.closest("form").querySelectorAll("input");
		let item = {};
		for(let i = 0; i < form.length; i++){
			item[form[i].name] = form[i].value;
		}

		$.ajax(rest_url, {
			method: "post",
			contentType: "application/json",
			dataType: "json",
			data:  JSON.stringify(item),
			success: result => {
				const list = result;
				if(list) {
					const tbody = $("#tbody");
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
	
		$("#open").on('click', function() {
		 modal = document.getElementById("addModal");
		 modal.classList.toggle("hidden");
		});
		
		$("#close").on('click', function() {
		 modal = document.getElementById("addModal");
		 modal.classList.toggle("hidden");
		});


});