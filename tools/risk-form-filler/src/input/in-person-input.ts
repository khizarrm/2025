import type { ScheduleInPersonParams } from './schedule-in-person-params'
import { exit, stdout } from 'node:process'
import { chromium } from '@playwright/test'
import { getUserConfirmation } from '../../helpers/get-user-confirmation'
import { scheduleInPerson } from '../in-person'
import { InPersonFormLayout } from '../pom'

(async function getInputAndRunPlaywright() {
  const params: ScheduleInPersonParams = {
    primaryOrganizer: {
      firstName: 'Raef',
      lastName: 'Sarofiem',
      studentID: 111101111,
      email: 'raefsarofiem@cmail.carleton.ca',
      phone: 'RAEF_PHONE_NUMBER',
    },
    secondaryOrganizer: {
      firstName: 'Ajaan',
      lastName: 'Nalliah',
      studentID: 111101112,
      email: 'ajaannalliah@cmail.carleton.ca',
      phone: 'AJAAN_PHONE_NUMBER',
    },
    eventDetails: {
      title: 'cuHacking Event Title',
      date: 'Today', // Format: 'YYYY/MM/DD'
      startTime: 'Right Now', // Format: 'HH:MM AM/PM'
      endTime: 'Right Now', // Format: 'HH:MM AM/PM'
      description: 'cuHacking Event Description',
      location: 'cuHacking Event Location',
      expectedAttendees: 'Number of Expected Attendees',
    },
    riskManagement: {
      speakerTopics: 'Speaker Topics',
      speakers: 'Raef Sarofiem, Ajaan Nalliah',
      speakerSites: 'https://cuhacking.ca/',
      specialCircumstances: 'None',
      risks: 'None',
      cleanUpCrew: 'The organizers',
      additionalRemarks: 'None',
    },
  }

  const output = `
  ===================== Event Details =====================
  Primary Organizer's First Name:   ${params.primaryOrganizer.firstName} 
  Primary Organizer's Last Name:    ${params.primaryOrganizer.lastName} 
  Primary Organizer's Student ID:   ${params.primaryOrganizer.studentID} 
  Primary Organizer's Email:        ${params.primaryOrganizer.email} 
  Primary Organizer's Phone:        ${params.primaryOrganizer.phone} 

  Secondary Organizer's First Name: ${params.secondaryOrganizer.firstName} 
  Secondary Organizer's Last Name:  ${params.secondaryOrganizer.lastName} 
  Secondary Organizer's Student ID: ${params.secondaryOrganizer.studentID} 
  Secondary Organizer's Email:      ${params.secondaryOrganizer.email} 
  Secondary Organizer's Phone:      ${params.secondaryOrganizer.phone} 

  Event Title:                      ${params.eventDetails.title} 
  Event Date:                       ${params.eventDetails.date} 
  Event Start Time:                 ${params.eventDetails.startTime} 
  Event End Time:                   ${params.eventDetails.endTime} 
  Event Description:                ${params.eventDetails.description} 
  Event Location:                   ${params.eventDetails.location} 
  Expected Attendees:               ${params.eventDetails.expectedAttendees} 

  Speaker Topics:                   ${params.riskManagement.speakerTopics} 
  Speakers List:                    ${params.riskManagement.speakers} 
  Speaker Sites:                    ${params.riskManagement.speakerSites} 
  Special Circumstances:            ${params.riskManagement.specialCircumstances} 
  Risks:                            ${params.riskManagement.risks} 
  Clean-Up Crew:                    ${params.riskManagement.cleanUpCrew} 
  Additional Remarks:               ${params.riskManagement.additionalRemarks} 
  =========================================================
`
  stdout.write(output)

  const isConfirmed = await getUserConfirmation('Is this information correct? Otherwise change the input file... (yes/y to proceed): ')

  if (isConfirmed) {
    try {
      const browser = await chromium.launch({ headless: false })
      const page = await browser.newPage()
      const formLayout = new InPersonFormLayout(page)
      await scheduleInPerson(params, formLayout)
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
