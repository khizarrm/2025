import { exit, stdout } from 'node:process'
import readline from 'node:readline'
import { scheduleInPerson } from '../in-person';

(async function getInputAndRunPlaywright() {
  // PRIMARY ORGANIZER
  const organizer1FirstName = 'Raef'
  const organizer1LastName = 'Sarofiem'
  const organizer1StudentID = '101266475'
  const organizer1Email = 'raefsarofiem@cmail.carleton.ca'
  const organizer1Phone = 'RAEF_PHONE_NUMBER'

  // SECONDARY ORGANIZER
  const organizer2FirstName = 'Ajaan'
  const organizer2LastName = 'Nalliah'
  const organizer2StudentID = '101325463'
  const organizer2Email = 'ajaannalliah@cmail.carleton.ca'
  const organizer2Phone = '6478773250'

  // EVENT DETAILS
  const eventTitle = 'cuHacking Event Title'
  const eventDate = 'Today' // Format: 'YYYY/MM/DD'
  const eventStartTime = 'Right Now' // Format: 'HH:MM AM/PM'
  const eventEndTime = 'Right Now' // Format: 'HH:MM AM/PM'
  const eventDescription = 'cuHacking Event Description'
  const eventLocation = 'cuHacking Event Location'
  const expectedAttendees = 'Number of Expected Attendees'

  // SPEAKER AND RESOURCES
  const speakerTopics = 'Speaker Topics'
  const speakersList = 'Raef Sarofiem, Ajaan Nalliah'
  const speakerSites = 'https://cuhacking.ca/'
  const specialCircumstances = 'None'
  const risks = 'None'
  const cleanUpCrew = 'The organizers'
  const additionalRemarks = 'None'

  const output = `
   ===================== Event Details =====================
   Primary Organizer's First Name:   ${organizer1FirstName} 
   Primary Organizer's Last Name:    ${organizer1LastName} 
   Primary Organizer's Student ID:   ${organizer1StudentID} 
   Primary Organizer's Email:        ${organizer1Email} 
   Primary Organizer's Phone:        ${organizer1Phone} 

   Secondary Organizer's First Name: ${organizer2FirstName} 
   Secondary Organizer's Last Name:  ${organizer2LastName} 
   Secondary Organizer's Student ID: ${organizer2StudentID} 
   Secondary Organizer's Email:      ${organizer2Email} 
   Secondary Organizer's Phone:      ${organizer2Phone} 

   Event Title:                      ${eventTitle} 
   Event Date:                       ${eventDate} 
   Event Start Time:                 ${eventStartTime} 
   Event End Time:                   ${eventEndTime} 
   Event Description:                ${eventDescription} 
   Event Location:                   ${eventLocation} 
   Expected Attendees:               ${expectedAttendees} 

   Speaker Topics:                   ${speakerTopics} 
   Speakers List:                    ${speakersList} 
   Speaker Sites:                    ${speakerSites} 
   Special Circumstances:            ${specialCircumstances} 
   Risks:                            ${risks} 
   Clean-Up Crew:                    ${cleanUpCrew} 
   Additional Remarks:               ${additionalRemarks} 
   =========================================================

  `
  stdout.write(output)

  const confirmation = await new Promise<string>((resolve) => {
    const rl = readline.createInterface({
      // eslint-disable-next-line node/prefer-global/process
      input: process.stdin,
      // eslint-disable-next-line node/prefer-global/process
      output: process.stdout,
    })
    rl.question('Is this information correct? Otherwise change the input file... (yes/y to proceed): ', (answer) => {
      stdout.write('\n')
      rl.close()
      resolve(answer.trim().toLowerCase())
    })
  })

  if (confirmation === 'yes' || confirmation === 'y') {
    try {
      await scheduleInPerson(
        organizer1FirstName,
        organizer1LastName,
        organizer1StudentID,
        organizer1Email,
        organizer1Phone,
        organizer2FirstName,
        organizer2LastName,
        organizer2StudentID,
        organizer2Email,
        organizer2Phone,
        eventTitle,
        eventDate,
        eventStartTime,
        eventEndTime,
        eventDescription,
        eventLocation,
        expectedAttendees,
        speakerTopics,
        speakersList,
        speakerSites,
        specialCircumstances,
        risks,
        cleanUpCrew,
        additionalRemarks,
      )
      stdout.write('Form filled successfully!\n')
    }
    catch (error) {
      stdout.write(`Error filling the form: ${error.message}\n`)
      exit(1)
    }
  }
  else {
    stdout.write('Operation cancelled.\n')
    exit(1)
  }
})()
