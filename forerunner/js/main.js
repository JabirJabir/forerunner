var fdb = new ForerunnerDB();
var db = fdb.db("school");

$(document).ready(function() {
	studentCollection.load(dataLoad);
	$("#table-tb").on("click",".dataID",colIDClick);
	$("#table-tb").on("click",".btn-danger",btnDeleteClick);
	// $("#table-tb").on("click","dataID",colIDClick);
})

var studentCollection = db.collection("students");
// var newStudent = {
    // name: "Koding",
    // age: 18
// };
// studentCollection.insert(newStudent);
console.log(studentCollection.load());
function dataLoad() {
	// console.log("data loaded")
	console.log(studentCollection.find());
	// cb();
	updateTable(studentCollection.find());
}

function cb() {
	createData();
	// update(studentCollection.find());
}
function dataSave() {
	// console.log("data saved");
	updateTable(studentCollection.find());
}

function createData() {
	console.log("create data")
	for(i = 0;i < 20;i++){
		studentCollection.insert({
		name : String.fromCharCode(Math.floor((Math.random()*26) + 65),
			Math.floor((Math.random()*26)+97),
			Math.floor((Math.random()*26) + 97)),
		age : Math.floor((Math.random()*4) + 8)
		});
	}
	studentCollection.save(dataSave);
}

function updateTable(datas) {
	$("#table-tb").remove("tr")
	for (var i = 0; i < datas.length; i++) {
		$("#table-tb").append(
			"<tr class = 'col'>" +
			"<td>" + (i+1) + "</td>"+
			"<td class = 'dataID'>" + datas[i]._id + "</td>"+
			"<td>" + datas[i].name + "</td>"+
			"<td><button class = 'btn btn-warning'>修改</button>" + "	" +
			"<button class = 'btn btn-danger'>刪除</button></td>" +
			"</tr>"
		);
	}
}

function colIDClick() {
	$("#modal-body").find("p").remove(); 
	console.log("colIDClick");
	var ID = $(this).text();
	var query = {
	    _id: ID
	};
	var studentData = studentCollection.find(query);
	$("#modal-body").append(
		"<p>ID : " + studentData[0]._id + "</p>" +
		"<p>Name : " + studentData[0].name + "</p>" +
		"<p>Age : " + studentData[0].age + "</p>"
		);
	$("#modal").modal("show");
}

function btnDeleteClick(){
	if (confirm("確定要刪除嗎?") == false) {
		return;
	}
	var di = $(this).closest("tr").find(".dataID").text();
	studentCollection.remove({
	    _id: di
	});
	studentCollection.save(dataSave);
}








