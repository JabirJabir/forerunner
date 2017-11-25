var fdb = new ForerunnerDB();
var db = fdb.db("school");

$(document).ready(function() {
	studentCollection.load(dataLoad);
	$("#table-tb").on("click",".col",colClick);
})

var studentCollection = db.collection("students");
var newStudent = {
    name: "Koding",
    age: 18
};
studentCollection.insert(newStudent);
console.log(studentCollection.load());
function dataLoad() {
	console.log("data loaded")
	console.log(studentCollection.find());
	// cb();
	updateTable(studentCollection.find());
}

function cb() {
	createData();
	// update(studentCollection.find());
}
function dataSave() {
	console.log("data saved");
	studentCollection.save();
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
			"</tr>"
		);
	}
}

function colClick() {
	$("#modal-body").find("p").remove();
	console.log("colClick");
	var ID = $(this).find(".dataID").text();
	var query = {
	    _id: ID
	};
	var studentData = studentCollection.find(query);
	$("#modal-body").append(
		"<p>ID" + studentData[0]._id + "</p>" +
		"<p>Name" + studentData[0].name + "</p>" +
		"<p>Age" + studentData[0].age + "</p>"
		);
	$("#modal").modal("show");
}










