import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const subjects = [
  {
    name: 'SCIENCE',
    description:
      'Covers fundamental concepts in Physics, Chemistry, and Biology as per the national curriculum for Class 10 and +2 science streams.'
  },
  {
    name: 'MANAGEMENT',
    description:
      'Focuses on Business Studies, Economics, and Accountancy aligned with the national +2 management stream, preparing students for further business education.'
  },
  {
    name: 'LANGUAGE CLASSES',
    description:
      'Enhances proficiency in languages, primarily Nepali and English, as required by the national education standards across secondary levels.'
  },
  {
    name: 'BASIC COMPUTER CLASS',
    description:
      'Introduces essential computer literacy, including operating systems and basic software applications, in line with modern curriculum needs.'
  },
  {
    name: 'OFFICE PACKAGE COMPUTER CLASS',
    description:
      'Provides training on Microsoft Office tools such as Word, Excel, and PowerPoint to build skills necessary for academic and professional success.'
  },
  {
    name: 'WEB DEVELOPMENT',
    description:
      'Teaches website design and development using HTML, CSS, and JavaScript, equipping students with digital skills applicable in modern workplaces.'
  },
  {
    name: 'APP DEVELOPMENT',
    description:
      'Offers an introduction to mobile application development for Android and iOS platforms, emphasizing practical programming skills and problem-solving.'
  },
  {
    name: 'HA',
    description:
      'Delivers comprehensive training for Health Assistants, covering basic healthcare, community health, and first aid as outlined in national standards.'
  },
  {
    name: 'LAB',
    description:
      'Provides hands-on laboratory training in science and technology subjects to reinforce theoretical concepts with practical experiments.'
  },
  {
    name: 'STAFF NURSE PREPARATION',
    description:
      'Prepares students for nursing careers with a focus on clinical skills, patient care, and healthcare theory in accordance with national certification standards.'
  }
]

const seed = async () => {
  try {
    for (const subject of subjects) {
      await prisma.subject.upsert({
        where: { name: subject.name },
        update: {},
        create: subject
      })
    }

    console.log('Subjects seeded successfully.')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
