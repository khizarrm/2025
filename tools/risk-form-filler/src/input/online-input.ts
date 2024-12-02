import type { ScheduleOnlineParams } from './schedule-online-params'
import { exit, stdout } from 'node:process'
import { chromium } from '@playwright/test'
import { getUserConfirmation } from '../../helpers/get-user-confirmation'
import { scheduleOnline } from '../online'
import { FormsLayout } from '../pom'

(async function getInputAndRunPlaywright() {
  const params: ScheduleOnlineParams = {
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
      date: '2024/11/23',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      description: 'cuHacking Event Description',
      expectedAttendees: 100,
    },
    onlineInformation: {
      platform: 'Discord',
      topics: 'cuHacking Tech Stack',
      location: 'Ottawa',
      numberOfOrganizers: 5,
      organizersAttendingOnline: 3,
    },
    speakerAndResources: {
      topics: 'Technology Trends',
      speakers: 'Raef Sarofiem, Ajaan Nalliah',
      speakerSites: 'https://cuhacking.ca/',
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
  Expected Attendees:               ${params.eventDetails.expectedAttendees}

  Event Platform:                   ${params.onlineInformation.platform}
  Online Event Topics:              ${params.onlineInformation.topics}
  Online Event Location:            ${params.onlineInformation.location}
  Number of Organizers:             ${params.onlineInformation.numberOfOrganizers}
  Number of Organizers Attending:   ${params.onlineInformation.organizersAttendingOnline}

  Speaker Topics:                   ${params.speakerAndResources.topics} 
  Speakers List:                    ${params.speakerAndResources.speakers} 
  Speaker Sites:                    ${params.speakerAndResources.speakerSites} 
  Additional Remarks:               ${params.speakerAndResources.additionalRemarks} 
  =========================================================

  `
  stdout.write(output)

  const isConfirmed = await getUserConfirmation('Is this information correct? Otherwise change the input file... (yes/y to proceed): ')

  if (isConfirmed) {
    try {
      const browser = await chromium.launch({ headless: false })
      const page = await browser.newPage()
      const formLayout = new FormsLayout(page)
      await scheduleOnline(params, formLayout)
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
