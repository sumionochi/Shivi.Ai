## Inspiration
The growing trend of people facing health issues globally highlights the need for a solution to effectively track and manage the combination of ailments a patient is experiencing.

## What it does
Shivi.Ai addresses the challenge of vague and incomplete information in medical histories. Our platform helps individuals present detailed and accurate accounts of their health issues, such as panic attacks, migraines, and blackouts. By combating memory fog, Shivi.Ai ensures a clearer picture for doctors, minimizing delays and enhancing the quality of medical diagnoses and support.

Inspired by the structure of Github for open source projects, Shivi.Ai incorporates a heatmap displaying a year's worth of crisis logs. The color variations on the heatmap indicate the intensity and frequency of reported health issues, enhancing visibility and comprehension.

![Heatmap and Logs inspired by Github and Google Notes](https://github.com/sumionochi/Shivi.Ai/assets/89721628/112ab41b-996f-46d3-9b5d-97bd5a1a7177)

The Crisis Log form design draws inspiration from Google Notes, prioritizing crucial details like duration of pain, pain levels, and date and time. These elements play pivotal roles in the medical diagnostic process.

![Log with duration of pain lasted, pain levels and date and time holding key roles in medical diagnosis](https://github.com/sumionochi/Shivi.Ai/assets/89721628/220d467b-151a-4795-873d-e317d3c5f83c)

To consolidate insights and guarantee the accuracy of information before going for a medical consultations, the health assistant queries details across all logs, builds vectors from contextual log information minimizing the risk of AI hallucination, to present a virtual AI consultation experience with Overall feedback and improvement details to help jog your mind to present accurate details to your doctor.

![Virtual AI consultation experience](https://github.com/sumionochi/Shivi.Ai/assets/89721628/00084b3a-6616-4595-b7e4-5f959a607961)

## How I built it
1. MongoDB: Utilized as the main database to store and manage Crisis Logs.
2. Pinecone: Implemented for AI agent metric, enabling efficient analysis of queries from all the Logs..
3. Prisma Studio: Used to manage multiple databases and streamline database operations.
4. Nextjs, TailwindCss, Typescript: As Frontend of The Platform.
5. Clerk Auth: For Authentication and Middleware security for separation of Data in different Accounts.

## Challenges I ran into
Creating a seamless and secure user experience, implementing effective AI for insights, and time constraints were thrilling to tackle.

1. Lot of Debugging 
2. AI agent should not hallucinate and provide precise answer. Solved it by using a vector storage database.
3. Heat Map should summarizes information in more human way like high instead of numeric 8 as pain level.

## Accomplishments that Imm proud of
Successfully integrating Github and Google Notes-inspired features into Shivi.Ai and overcoming challenges in designing an effective and user-friendly platform for health tracking and management.

## What Imm learned
Throughout the development process, I learned the importance of balancing user experience with technical complexity. I also gained insights into the nuances of health data interpretation and scoring within an AI framework.

## What's next for Shivi.Ai
The future for Shivi.Ai involves continuous improvement and expansion. A chat feature with multilingual feature for authorities to interact with patients of different language is on the way!
