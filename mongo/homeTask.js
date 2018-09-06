// Insert data into the created collections (using scripts from InsertsToDB.docx)
// 1 collection 

    db.users.insertMany(
[
	{
		"FirstName": "Ivan",
		"LastName" : "Petrovich",
		"MiddleName": "J",
		"DateOfBirth": ISODate("1973-12-29T00:00:00Z")
	},
	{
		"FirstName": "Pavel",
		"LastName" : "Pavlovich",
		"MiddleName": "Ivanovich",
		"DateOfBirth": ISODate("1972-12-29T00:00:00Z")
	},
	{
		"LastName" : "Dondarion"
	},
	{
		"FirstName": "Anastasiia",
		"LastName" : "Pavlovna",
		"MiddleName": "Polyakova"
	},
	{
		"FirstName": "Alexander",
		"LastName" : "Krutykov",
		"MiddleName": "Mot"
	},
	{
		"FirstName": "Bernard",
		"LastName" : "Westworld",
		"DateOfBirth": ISODate("1983-12-29T00:00:00Z")
	},
	{
		"FirstName": "Klim",
		"LastName" : "Lomovich",
		"DateOfBirth": ISODate("1993-12-29T00:00:00Z")
	}
]
)
// 2-nd collection
db.universities.insertMany([
    {
        "name":"MIT",
        "accreditation":"4",
        "address": {
           "address1" : "77 Massachusetts Ave",
           "city" : "Cambridge",
           "state" : "MA",
           "zipcode" : "02139",
           "coordinates" : [
            50.022547,
            36.22694] }
    },
{
        "name":"Oxford",
        "accreditation":"3",
        "address": {
           "address1" : "77 New states Ave",
           "city" : "Cambridge",
           "state" : "AN",
           "zipcode" : "7257"
}
    },
    {
        "name":"East Carolina University",
        "address": {
           "address1" : "E 5th St",
           "city" : "Greenville",
           "state" : "NC",
           "zipcode" : "27858",
          }
    }
])
// 3-rd collection    
    db.courses.insertMany([{
    "name" : "Course C1",
    "university_id:" : ObjectId("5841e50b08acf4a103c263a3"),
    "users" : [ 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c2639c"),
            "role" : "instructor"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c2639d"),
            "role" : "instructor"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c2639e"),
            "role" : "student"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c2639f"),
            "role" : "student"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c263a0"),
            "role" : "student"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c263a2"),
            "role" : "student"
        }
    ]
},
    
    {
    "name": "Course C2",
    "university_id:": ObjectId("5841e50b08acf4a103c263a4"),
    "users":[
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a1"),
        "role": "instructor"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a2"),
        "role": "admin"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639f"),
        "role": "student"
    }
    ]
    },
    
    {
    "name": "Course C3",
    "university_id:": ObjectId("5841e50b08acf4a103c263a4"),
    "users":[
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a1"),
        "role": "student"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a2"),
        "role": "student"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639f"),
        "role": "student"
    }
    ]
    },
    
    {
    "name": "Course C4",
    "university_id:": ObjectId("5841e50b08acf4a103c263a3"),
    "users":[
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639c"),
        "role": "student"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639d"),
        "role": "student"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639e"),
        "role": "instructor"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639f"),
        "role": "instructor"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a0"),
        "role": "instructor"
    },
    ]
    }
    ]
)
// Query to view the created columns
> show collections
// a.	Select all universities. Show name and accreditation 
 db.universities.find ({},{name: 1, accreditation: 1 })
//b.	Select university without coordinates. Show only Address information. 
 db.universities.find ({ 'address.coordinates': { $exists: false} },{address:1, _id:0})
//c.	Select university with State = “MA” and zipcode not equal to “27897”. Show id, name, state, zipcode 
 db.universities.find ({"address.zipcode": { $ne: "27897"},"address.state": "MA" }, {  name:1, "adress.zipcode":1,"address.state":1})
//d.	Select users with Date of Birth more than (>) 1980 year and less than current date. Show only Date of Birth 
 db.users.find({DateOfBirth:{$gt: ISODate("1980-12-31 00:00:00[.000]"), $lt: new Date()}}, {_id:0, DateOfBirth:1}) 
//e.	Change course name and delete all other information (university_id, users) for course, which contains only students.
//(I divided the assignment into two parts) 
// 1 part - update
db.courses.update( {"users.role":{$ne: "instructor"}}, {$set:{name: "CourseF1"}},{multi: true})
// 2 part - delete
db.courses.update( {"users.role":{$ne: "instructor"}}, {$unset:{university_id: 1, users:1}},{multi: true})
//Query to verify the completion of the assignment
db.courses.find({"users.role":{$ne: "instructor"}}, {name:1, "users.role":1})
//f.	Select courses with max number of users. Show course name, user roles, amount of users. 
db.courses.find({}, {name:1, "users.roles":1}).sort({"users":-1}).limit(1),({name:1,"users.role":1})
//g.	*Select user with the longest MiddleName. Show _id, MiddleName, length. 
db.users.find({}, {MiddleName:1}).sort({"MiddleName":-1}).limit(1)
//h.	Update only the course name, which contains every user role. 
db.courses.update({"users.role":"instructor"}, {$set:{name:"CoursF2"}},{multi: true})
//Query to verify the completion of the assignment
db.courses.find({"users.role":"instructor" })
//i.	Replace User document with Name = “Pavel” (insert your values and pay attention for the new structure. 
//Use .find() before replacement and compare values after)
db.users.update( {"FirstName":"Pavel"}, {$set:{FirstName: "Ihor", LastName: "Ihorev", MiddleName: "Ihorevich", DateOfBirth: "1990-01-01 01:00:00.000Z"}},{multi: true})
//Query to verify that such a user does not exist
db.users.find({"FirstName":"Pavel"})
//And query to verify the completion of the assignment
db.users.find({"FirstName":"Ihor"})
//j.	Delete user which has only LastName by 2 ways 
//(use delete()and remove() commands)(i.e. MiddleName, Date of Birth, First Name are null).
//I used a remove 
db.users.remove({MiddleName: null, DateOfBirth: null, FirstName: null}, {multi: true})
//Query to verify that such a user does not exist
db.users.find({MiddleName: null, DateOfBirth: null, FirstName: null})
