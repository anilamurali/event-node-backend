const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
var eventModel=Mongoose.model("events",
new Mongoose.Schema(
    {
        name:String,
        date:String,
        venue:String,
        organizer:String,
        contact:String
    }
))
Mongoose.connect("mongodb+srv://mzc:mzc@cluster0.m2f8m.mongodb.net/EventDb")
app.post("/api/addevent",(req,res)=>{
    var getName=req.body.name
    var getDate=req.body.date
    var getVenue=req.body.venue
    var getOrganizer=req.body.organizer
    var getContact=req.body.contact
    data={"name":getName,"date":getDate,"venue":getVenue,"organizer":getOrganizer,"contact":getContact}
    let event=new eventModel(data)
    event.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
})

app.listen(4500,()=>{
    console.log("server runnig")
})