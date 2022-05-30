const express = require('express')
require('dotenv').config()
const xlsx = require('xlsx')
const fs = require('fs')
const mongoose = require('mongoose')
const cors = require('cors')
const https = require('https')
const path = require('path')


const DB = PROCESS.ENV.DB
const LoginRoutes = require('./Routes/LoginRoutes')
const session = require('express-session')
 mongoose.connect(db,{useNewUrlParser: true,
useUnifiedTopology: true }, ()=>console.log('successfully connected to db...'))

const MasterScheduleRoutes = require('./Routes/MasterScheduleRoutes')
const UserRoutes = require('./Routes/UserRoutes')
const { Cookie } = require('express-session')
const DegreeAuditRoutes = require('./Routes/DegreeAuditRoutes')

const CourseRoutes = require('./Routes/CourseRoutes')
const ClassRoutes = require('./Routes/ClassRoutes')
const HoldRoutes = require('./Routes/HoldRoutes')
const TimeSlotsRoutes = require('./Routes/TimeslotsRoutes')
const AdvisorRoutes = require('./Routes/AdvisorRoutes')
const TimeSlotModel = require('./Models/Timeslots')

const MasterScheduleModel = require('./Models/MasterScheduleModel')
const StudentMajorRoutes = require('./Routes/StudentMajorRoutes')
const studentmajors = require('./data/StudentMajorsdata.json')
const StudentMajorsModel = require('./Models/Student_Majors')
const StudentHistoryModel = require('./Models/StudentHistoryModel')
const studenthistory = require('./data/Student_History.json')
const EnrollementRoutes = require('./Routes/EnrollmentRoutes')
const { application } = require('express')
const HoldsModel = require('./Models/HoldsModel')
const ScheduleClassRoutes = require('./Routes/ScheduleClassRoutes')
const MajorReqRoutes = require('./Routes/MajorReqRoutes')
const GradeRoutes = require('./Routes/GradeRoutes')
const departments = require('./data/Departments.json')
const departmentModel= require('./Models/DepartmentModel')
const AttendanceRoutes = require('./Routes/AttendanceRoutes')
const scheduleClassModel = require('./Models/ScheduleClassModel')
const advisorModel = require('./Models/AdvisorModel')
const advisors = require('./data/Advisors.json')

const gradesModel = require('./Models/GradesModel')



var app = express()

app.use(express.json(),cors())

app.use(session({
    secret:"secret key",
    resave:false,
    saveUninitialized : false,
    cookie:{
httpOnly:false,
maxAge : 3600000
    }
}))
const FacultyClassRoutes = require('./Routes/FacultyClassRoutes')
app.use('/api/masterschedule', MasterScheduleRoutes)
app.use('/api/users',UserRoutes)
app.use('/api/login', LoginRoutes)
app.use('/api/degree-audit', DegreeAuditRoutes)
app.use('/api/courses', CourseRoutes)
app.use('/api/classes', ClassRoutes)
app.use('/api/holds',HoldRoutes)
app.use('/api/enrollment', EnrollementRoutes)
app.use('/api/studentmajors',StudentMajorRoutes)
app.use('/api/majorrequirements',MajorReqRoutes)
app.use('/api/scheduleclass',ScheduleClassRoutes)
app.use('/api/faculty-class',FacultyClassRoutes)
app.use('/api/advisor',AdvisorRoutes)
app.use('/api/grades',GradeRoutes)
app.use('/api/attendance', AttendanceRoutes)
const majors = require('./data/Majors.json')
const MajorModel = require('./Models/MajorModel')
const masterschedule= require('./data/Master_Schedule_Updated.json')
const HoldObjModel = require('./Models/HoldObjModel')
const holds = require('./data/StudentHolds.json')
const majorrequirements = require("./data/Major_Requirements.json")
var PORT = process.env.PORT
const majorReqModel = require('./Models/MajorReqModel')
const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
  )
  sslServer.listen(PORT, () => console.log('Secure server on port 5001'))




